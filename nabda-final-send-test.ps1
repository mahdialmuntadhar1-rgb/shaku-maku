$ErrorActionPreference = "Continue"

$NabdaEmail = Read-Host "Enter your Nabda login email"
$NabdaPasswordSecure = Read-Host "Enter your Nabda password" -AsSecureString
$NabdaPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($NabdaPasswordSecure)
)

$InstanceId = "4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
$Phone = "+9647704413300"
$Message = "Nabda OTP fixed instance token send test"

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

    $loginJson = $loginRes.Content | ConvertFrom-Json
    $LoginToken = $loginJson.data.accessToken

    if (!$LoginToken) {
        Write-Host "❌ No login data.accessToken found." -ForegroundColor Red
        Write-Host $loginRes.Content
        Read-Host "Press Enter to close"
        exit
    }

    Write-Host "✅ Login token found." -ForegroundColor Green
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
        Write-Host "❌ No select-instance data.accessToken found." -ForegroundColor Red
        Write-Host $selectRes.Content
        Read-Host "Press Enter to close"
        exit
    }

    Write-Host "✅ Instance token found from data.accessToken." -ForegroundColor Green
} catch {
    Write-Host "❌ Select instance failed." -ForegroundColor Red
    Show-ErrorBody $_
    Read-Host "Press Enter to close"
    exit
}

Write-Host "`nSTEP 3: Send message..." -ForegroundColor Cyan

$sendHeaders = @{
    "Authorization" = "Bearer $InstanceToken"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$sendBody = @{
    phone = $Phone
    message = $Message
} | ConvertTo-Json -Depth 10

Write-Host "Sending to $Phone" -ForegroundColor Cyan

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
    Write-Host "❌ Send failed." -ForegroundColor Red
    Show-ErrorBody $_

    Write-Host "`nTrying fallback body with phoneNumber..." -ForegroundColor Cyan

    $sendBody2 = @{
        phoneNumber = $Phone
        message = $Message
    } | ConvertTo-Json -Depth 10

    try {
        $sendRes2 = Invoke-WebRequest `
            -Uri $SendMessageUrl `
            -Method POST `
            -Headers $sendHeaders `
            -Body $sendBody2 `
            -UseBasicParsing `
            -TimeoutSec 30

        Write-Host "`n✅ MESSAGE SENT WITH phoneNumber HTTP $($sendRes2.StatusCode)" -ForegroundColor Green
        Write-Host $sendRes2.Content
    } catch {
        Write-Host "❌ Fallback also failed." -ForegroundColor Red
        Show-ErrorBody $_
    }
}

Read-Host "Press Enter to close"
