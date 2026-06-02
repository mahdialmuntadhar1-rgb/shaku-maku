$ErrorActionPreference = "Continue"

$AccountApiKey = "sk_7d376a7fa3fd4e87b8caf07f14a13bd7"
$InstanceId = "4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
$Phone = "+9647704413300"
$Message = "Nabda OTP final correct API test"

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

Write-Host "`nSTEP 1: Selecting instance..." -ForegroundColor Cyan

$selectHeaders = @{
    "Authorization" = "Bearer $AccountApiKey"
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

    $InstanceToken = $null

    if ($selectJson.accessToken) {
        $InstanceToken = $selectJson.accessToken
    } elseif ($selectJson.token) {
        $InstanceToken = $selectJson.token
    } elseif ($selectJson.data.accessToken) {
        $InstanceToken = $selectJson.data.accessToken
    } elseif ($selectJson.data.token) {
        $InstanceToken = $selectJson.data.token
    }

    if (!$InstanceToken) {
        Write-Host "❌ Could not find accessToken/token in response." -ForegroundColor Red
        Write-Host "Full response above."
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

Write-Host "`nSTEP 2: Sending WhatsApp message..." -ForegroundColor Cyan

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
