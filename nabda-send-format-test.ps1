$ErrorActionPreference = "Continue"

$NabdaEmail = "shkar9441@gmail.com"
$NabdaPasswordSecure = Read-Host "Enter your Nabda password carefully"

$InstanceId = "4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
$Phone = "+9647704413300"
$PhoneNoPlus = "9647704413300"
$Message = "Nabda OTP final send format test"

$LoginUrl = "https://api.nabdaotp.com/api/v1/auth/login"
$SelectInstanceUrl = "https://api.nabdaotp.com/api/v1/auth/select-instance"
$SendMessageUrl = "https://api.nabdaotp.com/api/v1/messages/send"

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

Write-Host "`nSTEP 1: Login..." -ForegroundColor Cyan

$loginHeaders = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$loginBody = @{
    email = $NabdaEmail
    password = $NabdaPasswordSecure
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

    $loginJson = $loginRes.Content | ConvertFrom-Json
    $LoginToken = $loginJson.data.accessToken

    if (!$LoginToken) {
        Write-Host "❌ No login token." -ForegroundColor Red
        Write-Host $loginRes.Content
        Read-Host "Press Enter to close"
        exit
    }

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

    $selectJson = $selectRes.Content | ConvertFrom-Json
    $InstanceToken = $selectJson.data.accessToken

    if (!$InstanceToken) {
        Write-Host "❌ No instance token." -ForegroundColor Red
        Write-Host $selectRes.Content
        Read-Host "Press Enter to close"
        exit
    }

    Write-Host "✅ Instance token found." -ForegroundColor Green

} catch {
    Write-Host "❌ Select instance failed." -ForegroundColor Red
    Show-ErrorBody $_
    Read-Host "Press Enter to close"
    exit
}

Write-Host "`nSTEP 3: Try send formats..." -ForegroundColor Cyan

$sendHeaders = @{
    "Authorization" = "Bearer $InstanceToken"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$bodies = @(
    @{
        Name = "phone_plus_message"
        Body = @{
            phone = $Phone
            message = $Message
        }
    },
    @{
        Name = "phone_no_plus_message"
        Body = @{
            phone = $PhoneNoPlus
            message = $Message
        }
    },
    @{
        Name = "to_plus_message"
        Body = @{
            to = $Phone
            message = $Message
        }
    },
    @{
        Name = "number_plus_message"
        Body = @{
            number = $Phone
            message = $Message
        }
    },
    @{
        Name = "recipient_plus_message"
        Body = @{
            recipient = $Phone
            message = $Message
        }
    },
    @{
        Name = "phone_plus_text"
        Body = @{
            phone = $Phone
            text = $Message
        }
    }
)

$sent = $false

foreach ($item in $bodies) {
    if ($sent) { break }

    $json = $item.Body | ConvertTo-Json -Depth 10

    Write-Host "`nTesting body: $($item.Name)" -ForegroundColor Cyan
    Write-Host $json

    try {
        $sendRes = Invoke-WebRequest `
            -Uri $SendMessageUrl `
            -Method POST `
            -Headers $sendHeaders `
            -Body $json `
            -UseBasicParsing `
            -TimeoutSec 30

        Write-Host "`n✅ MESSAGE SENT HTTP $($sendRes.StatusCode)" -ForegroundColor Green
        Write-Host $sendRes.Content

        Write-Host "`nUSE THIS BODY FORMAT IN APP:" -ForegroundColor Green
        Write-Host $item.Name -ForegroundColor Yellow
        Write-Host $json -ForegroundColor Yellow

        $sent = $true
        break
    } catch {
        Write-Host "❌ Failed body: $($item.Name)" -ForegroundColor Red
        Show-ErrorBody $_
    }
}

if (!$sent) {
    Write-Host "`n❌ Login and instance selection work, but all send body formats failed." -ForegroundColor Red
    Write-Host "Now we need the exact API Docs example for messages/send." -ForegroundColor Yellow
}

Read-Host "Press Enter to close"
