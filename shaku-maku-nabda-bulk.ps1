$ErrorActionPreference = "Continue"

# ============================================================
# SHAKU MAKU / NABDA OTP BULK WHATSAPP SENDER
# Works with Nabda verified format:
# POST https://api.nabdaotp.com/api/v1/messages/send
# Header: Authorization: API_KEY
# Body: { phone, message }
# ============================================================

$SendUrl = "https://api.nabdaotp.com/api/v1/messages/send"
$DefaultDelayMs = 1200
$ReportPath = ".\nabda-bulk-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').csv"

function Read-SecretText {
    param([string]$Prompt)

    $secure = Read-Host $Prompt -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    return $plain
}

function Normalize-Phone {
    param([string]$Phone)

    if (!$Phone) { return $null }

    $p = $Phone.Trim()
    $p = $p -replace '[^\d+]', ''

    if ($p.StartsWith("+")) {
        $p = $p.Substring(1)
    }

    if ($p.StartsWith("00")) {
        $p = $p.Substring(2)
    }

    # Local Iraqi number like 07701234567
    if ($p.StartsWith("0") -and $p.Length -eq 11) {
        $p = "964" + $p.Substring(1)
    }

    # Iraqi number without country code, like 7701234567
    if ($p.Length -eq 10 -and ($p.StartsWith("7"))) {
        $p = "964" + $p
    }

    if (!$p.StartsWith("964")) {
        return $null
    }

    if ($p.Length -lt 12 -or $p.Length -gt 13) {
        return $null
    }

    return "+" + $p
}

function Send-NabdaMessage {
    param(
        [string]$ApiKey,
        [string]$Phone,
        [string]$Message
    )

    $headers = @{
        "Authorization" = $ApiKey
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    }

    $body = @{
        phone = $Phone
        message = $Message
    } | ConvertTo-Json -Depth 10

    try {
        $res = Invoke-WebRequest `
            -Uri "https://api.nabdaotp.com/api/v1/messages/send" `
            -Method POST `
            -Headers $headers `
            -Body $body `
            -UseBasicParsing `
            -TimeoutSec 30

        return @{
            ok = $true
            status = $res.StatusCode
            response = $res.Content
        }
    } catch {
        $status = ""
        $errorBody = ""

        try {
            $status = $_.Exception.Response.StatusCode.value__
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $errorBody = $reader.ReadToEnd()
        } catch {
            $errorBody = $_.Exception.Message
        }

        return @{
            ok = $false
            status = $status
            response = $errorBody
        }
    }
}

function Pick-PhoneColumn {
    param($Rows)

    $possible = @(
        "phone",
        "Phone",
        "phone_number",
        "PhoneNumber",
        "mobile",
        "Mobile",
        "number",
        "Number",
        "whatsapp",
        "WhatsApp",
        "wa",
        "WA"
    )

    foreach ($col in $possible) {
        if ($Rows[0].PSObject.Properties.Name -contains $col) {
            return $col
        }
    }

    return $null
}

function Pick-GovernorateColumn {
    param($Rows)

    $possible = @(
        "governorate",
        "Governorate",
        "province",
        "Province",
        "city",
        "City",
        "محافظة",
        "المحافظة"
    )

    foreach ($col in $possible) {
        if ($Rows[0].PSObject.Properties.Name -contains $col) {
            return $col
        }
    }

    return $null
}

function Save-ReportRow {
    param(
        [int]$Index,
        [string]$Phone,
        [string]$Governorate,
        [string]$Status,
        [string]$HttpStatus,
        [string]$Note
    )

    $row = [PSCustomObject]@{
        Index = $Index
        Phone = $Phone
        Governorate = $Governorate
        Status = $Status
        HttpStatus = $HttpStatus
        Note = $Note
        Time = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    }

    if (!(Test-Path $ReportPath)) {
        $row | Export-Csv $ReportPath -NoTypeInformation -Encoding UTF8
    } else {
        $row | Export-Csv $ReportPath -NoTypeInformation -Encoding UTF8 -Append
    }
}

Clear-Host

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " SHAKU MAKU NABDA BULK WHATSAPP SENDER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nImportant:" -ForegroundColor Yellow
Write-Host "- Use only opted-in/allowed contacts." -ForegroundColor Yellow
Write-Host "- Recommended delay: 1200ms or more." -ForegroundColor Yellow
Write-Host "- Correct auth is Authorization: API_KEY, no Bearer." -ForegroundColor Yellow

$ApiKey = Read-SecretText "Paste Nabda API key"
$DelayMsInput = Read-Host "Delay between sends in ms [default 1200]"
if ([string]::IsNullOrWhiteSpace($DelayMsInput)) {
    $DelayMs = $DefaultDelayMs
} else {
    $DelayMs = [int]$DelayMsInput
}

if ($DelayMs -lt 1200) {
    Write-Host "Delay too low. Setting to 1200ms." -ForegroundColor Yellow
    $DelayMs = 1200
}

Write-Host "`nChoose mode:" -ForegroundColor Cyan
Write-Host "1 = Manual phone list"
Write-Host "2 = CSV by governorate"

$Mode = Read-Host "Mode"

$Message = Read-Host "Write the generic message to send"

if ([string]::IsNullOrWhiteSpace($Message)) {
    Write-Host "❌ Message is empty. Stop." -ForegroundColor Red
    exit
}

$Targets = @()

if ($Mode -eq "1") {
    Write-Host "`nPaste phone numbers, one per line." -ForegroundColor Cyan
    Write-Host "When done, type DONE and press Enter." -ForegroundColor Cyan

    while ($true) {
        $line = Read-Host "Phone"
        if ($line.Trim().ToUpper() -eq "DONE") { break }

        $normalized = Normalize-Phone $line

        if ($normalized) {
            $Targets += [PSCustomObject]@{
                Phone = $normalized
                Governorate = ""
            }
        } else {
            Write-Host "Invalid skipped: $line" -ForegroundColor Yellow
        }
    }
}
elseif ($Mode -eq "2") {
    $CsvPath = Read-Host "Enter CSV path, example C:\Users\...\numbers.csv"

    if (!(Test-Path $CsvPath)) {
        Write-Host "❌ CSV not found: $CsvPath" -ForegroundColor Red
        exit
    }

    $Rows = Import-Csv $CsvPath

    if (!$Rows -or $Rows.Count -eq 0) {
        Write-Host "❌ CSV is empty." -ForegroundColor Red
        exit
    }

    $PhoneCol = Pick-PhoneColumn $Rows
    $GovCol = Pick-GovernorateColumn $Rows

    if (!$PhoneCol) {
        Write-Host "❌ Could not find phone column." -ForegroundColor Red
        Write-Host "Use one of these column names: phone, phone_number, mobile, number, whatsapp" -ForegroundColor Yellow
        exit
    }

    if (!$GovCol) {
        Write-Host "⚠️ Could not find governorate column." -ForegroundColor Yellow
        Write-Host "Will send to all rows unless you stop." -ForegroundColor Yellow
        $SelectedGov = ""
    } else {
        $Govs = $Rows | ForEach-Object { $_.$GovCol } | Where-Object { $_ } | Sort-Object -Unique

        Write-Host "`nAvailable governorates:" -ForegroundColor Cyan
        $i = 1
        foreach ($g in $Govs) {
            Write-Host "$i. $g"
            $i++
        }

        $SelectedGov = Read-Host "Type governorate exactly, or type ALL"
    }

    foreach ($row in $Rows) {
        $gov = ""
        if ($GovCol) { $gov = $row.$GovCol }

        if ($GovCol -and $SelectedGov -ne "ALL" -and $gov -ne $SelectedGov) {
            continue
        }

        $normalized = Normalize-Phone $row.$PhoneCol

        if ($normalized) {
            $Targets += [PSCustomObject]@{
                Phone = $normalized
                Governorate = $gov
            }
        }
    }
}
else {
    Write-Host "❌ Invalid mode." -ForegroundColor Red
    exit
}

# Deduplicate
$Targets = $Targets | Group-Object Phone | ForEach-Object { $_.Group[0] }

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " Preview" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total valid unique targets: $($Targets.Count)"
Write-Host "Delay: $DelayMs ms"
Write-Host "Report: $ReportPath"
Write-Host "`nMessage:" -ForegroundColor Yellow
Write-Host $Message

if ($Targets.Count -eq 0) {
    Write-Host "❌ No valid targets." -ForegroundColor Red
    exit
}

Write-Host "`nFirst 10 numbers:" -ForegroundColor Cyan
$Targets | Select-Object -First 10 | Format-Table Phone, Governorate -AutoSize

Write-Host "`nChoose send option:" -ForegroundColor Cyan
Write-Host "1 = Test only my number +9647704413300"
Write-Host "2 = Send to previewed list"
Write-Host "3 = Cancel"

$SendChoice = Read-Host "Choice"

if ($SendChoice -eq "1") {
    $Targets = @(
        [PSCustomObject]@{
            Phone = "+9647704413300"
            Governorate = "TEST"
        }
    )
}
elseif ($SendChoice -eq "2") {
    $confirm = Read-Host "Type SEND to confirm"
    if ($confirm -ne "SEND") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit
    }
}
else {
    Write-Host "Cancelled." -ForegroundColor Yellow
    exit
}

Write-Host "`nStarting send..." -ForegroundColor Green

$index = 0
$sent = 0
$failed = 0

foreach ($target in $Targets) {
    $index++

    Write-Host "`n[$index/$($Targets.Count)] Sending to $($target.Phone)..." -ForegroundColor Cyan

    $result = Send-NabdaMessage -ApiKey $ApiKey -Phone $target.Phone -Message $Message

    if ($result.ok) {
        $sent++
        Write-Host "✅ SENT HTTP $($result.status)" -ForegroundColor Green
        Save-ReportRow -Index $index -Phone $target.Phone -Governorate $target.Governorate -Status "SENT" -HttpStatus $result.status -Note $result.response
    } else {
        $failed++
        Write-Host "❌ FAILED HTTP $($result.status)" -ForegroundColor Red
        Write-Host $result.response -ForegroundColor Yellow
        Save-ReportRow -Index $index -Phone $target.Phone -Governorate $target.Governorate -Status "FAILED" -HttpStatus $result.status -Note $result.response
    }

    Start-Sleep -Milliseconds $DelayMs
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host " DONE" -ForegroundColor Green
Write-Host " Sent: $sent" -ForegroundColor Green
Write-Host " Failed: $failed" -ForegroundColor Yellow
Write-Host " Report: $ReportPath" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green

Read-Host "Press Enter to close"
