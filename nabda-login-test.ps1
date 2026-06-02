$ErrorActionPreference = "Continue"

$NabdaEmail = Read-Host "Enter your Nabda login email"
$NabdaPasswordSecure = Read-Host "Enter your Nabda password" -AsSecureString
$NabdaPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($NabdaPasswordSecure)
)

$InstanceId = "4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
$Phone = "+9647704413300"
$Message = "Nabda OTP login flow test"

$LoginUrl = "https://api.nabdaotp.com/api/v1/auth/login"
$SelectInstanceUrl = "https://api.nabdaotp.com/api/v1/auth/select-instance"
$SendMessageUrl = "https://api.nabdaotp.com/api/v1/messages/send"

function Get-TokenFromJson {
    param($json)

    if ($json.accessToken) { return $json.accessToken }
    if ($json.token) { return $json.token }
    if ($json.jwt) { return $json.jwt }
    if ($json.data.accessToken) { return $json.data.accessToken }
    if ($json.data.token) { return $json.data.token }
    if ($json.data.jwt) { return $json.data.jwt }
    if ($json.user.accessToken) { return $json.user.accessToken }
    if ($json.user.token) { return $json.user.token }

    return $null
}

function Show-ErrorBody {
    param($err)

    try {
        $status = $err.Exception.Response.StatusCode.value__
        Write-Host "HTTP $status" -ForegroundColor Yellow

        $reader = New-Object System.IO.StreamReader($err.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host $errorBody -ForegroundColor Yellow
    } catch {
        Write-Host $err.Exception.Message -ForegroundColor Yellow
    }
}

Write-Host "`nSTEP 1: Login to Nabda..." -ForegroundColor Cyan

$loginHeaders = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$loginBody = @{
    email = $NabdaEmail
    password = $NabdaPassword
} | ConvertTo-Json -Depth 10

try {
    $loginRes = Invoke-WebRequest `
        -Uri $LoginUrl `
        -Method POST `
        -Headers $loginHeaders `
        -Body $loginBody `
        -UseBasicParsing `
        -TimeoutSec 30

    Write-Host "✅ Login HTTP $($loginRes.StatusCode)" -ForegroundColor Green
    Write-Host $loginRes.Content

    $loginJson = $loginRes.Content | ConvertFrom-Json
    $LoginToken = Get-TokenFromJson $loginJson

    if (!$LoginToken) {
        Write-Host "❌ Could not find login token in response." -ForegroundColor Red
        Write-Host "Full login response was:"
        Write-Host $loginRes.Content
        Read-Host "Press Enter to close"
        exit
    }

    Write-Host "`n✅ Login token found." -ForegroundColor Green
} catch {
    Write-Host "❌ Login failed." -ForegroundColor Red
    Show-ErrorBody $_
    Read-Host "Press Enter to close"
    exit
}

Write-Host "`nSTEP 2: Select instance..." -ForegroundColor Cyan

$selectHeaders = @{
    "Authorization" = "Bearer $LoginToken"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$selectBody = @{
    instanceId = $InstanceId
} | ConvertTo-Json -Depth 10

try {
    $selectRes = Invoke-WebRequest `
        -Uri $SelectInstanceUrl `
        -Method POST `
        -Headers $selectHeaders `
        -Body $selectBody `
        -UseBasicParsing `
        -TimeoutSec 30

    Write-Host "✅ Select instance HTTP $($selectRes.StatusCode)" -ForegroundColor Green
    Write-Host $selectRes.Content

    $selectJson = $selectRes.Content | ConvertFrom-Json
    $InstanceToken = Get-TokenFromJson $selectJson

    if (!$InstanceToken) {
        Write-Host "❌ Could not find instance token in response." -ForegroundColor Red
        Write-Host "Full select-instance response was:"
        Write-Host $selectRes.Content
        Read-Host "Press Enter to close"
        exit
    }

    Write-Host "`n✅ Instance token found." -ForegroundColor Green
} catch {
    Write-Host "❌ Select instance failed." -ForegroundColor Red
    Show-ErrorBody $_
    Read-Host "Press Enter to close"
    exit
}

Write-Host "`nSTEP 3: Send WhatsApp message..." -ForegroundColor Cyan

$sendHeaders = @{
    "Authorization" = "Bearer $InstanceToken"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$sendBody = @{
    phone = $Phone
    message = $Message
} | ConvertTo-Json -Depth 10

try {
    $sendRes = Invoke-WebRequest `
        -Uri $SendMessageUrl `
        -Method POST `
        -Headers $sendHeaders `
        -Body $sendBody `
        -UseBasicParsing `
        -TimeoutSec 30

    Write-Host "`n✅ MESSAGE SENT HTTP $($sendRes.StatusCode)" -ForegroundColor Green
    Write-Host $sendRes.Content
} catch {
    Write-Host "❌ Send message failed." -ForegroundColor Red
    Show-ErrorBody $_
}

Read-Host "Press Enter to close"
