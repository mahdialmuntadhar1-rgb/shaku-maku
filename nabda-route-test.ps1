$ErrorActionPreference = "Continue"

$NabdaEmail = "shkar9441@gmail.com"
$NabdaPassword = Read-Host "Enter your Nabda password carefully"

$InstanceId = "4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
$Phone = "+9647704413300"
$Message = "Nabda OTP route test"

$LoginUrl = "https://api.nabdaotp.com/api/v1/auth/login"
$SelectInstanceUrl = "https://api.nabdaotp.com/api/v1/auth/select-instance"

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

$loginBody = @{
    email = $NabdaEmail
    password = $NabdaPassword
} | ConvertTo-Json -Depth 10

$loginRes = Invoke-WebRequest `
    -Uri $LoginUrl `
    -Method POST `
    -Headers @{
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    } `
    -Body $loginBody `
    -UseBasicParsing `
    -TimeoutSec 30

$loginJson = $loginRes.Content | ConvertFrom-Json
$LoginToken = $loginJson.data.accessToken

Write-Host "✅ Login OK" -ForegroundColor Green

$selectBody = @{
    instanceId = $InstanceId
} | ConvertTo-Json -Depth 10

$selectRes = Invoke-WebRequest `
    -Uri $SelectInstanceUrl `
    -Method POST `
    -Headers @{
        "Authorization" = "Bearer $LoginToken"
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    } `
    -Body $selectBody `
    -UseBasicParsing `
    -TimeoutSec 30

$selectJson = $selectRes.Content | ConvertFrom-Json
$InstanceToken = $selectJson.data.accessToken

Write-Host "✅ Instance selected OK" -ForegroundColor Green

$headers = @{
    "Authorization" = "Bearer $InstanceToken"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$body = @{
    phone = $Phone
    message = $Message
} | ConvertTo-Json -Depth 10

$urls = @(
    "https://api.nabdaotp.com/api/v1/messages/send",
    "https://api.nabdaotp.com/api/v1/message/send",
    "https://api.nabdaotp.com/api/v1/whatsapp/send",
    "https://api.nabdaotp.com/api/v1/instances/$InstanceId/messages/send",
    "https://api.nabdaotp.com/api/v1/instances/$InstanceId/message/send",
    "https://api.nabdaotp.com/inst/$InstanceId/api/v1/messages/send"
)

foreach ($url in $urls) {
    Write-Host "`nTesting: $url" -ForegroundColor Cyan

    try {
        $res = Invoke-WebRequest `
            -Uri $url `
            -Method POST `
            -Headers $headers `
            -Body $body `
            -UseBasicParsing `
            -TimeoutSec 30

        Write-Host "✅ SUCCESS HTTP $($res.StatusCode)" -ForegroundColor Green
        Write-Host $res.Content
        break
    } catch {
        Write-Host "❌ Failed" -ForegroundColor Red
        Show-ErrorBody $_
    }
}

Read-Host "Press Enter to close"
