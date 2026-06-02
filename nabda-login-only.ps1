$ErrorActionPreference = "Continue"

$NabdaEmail = "shkar9441@gmail.com"
$NabdaPasswordSecure = Read-Host "Enter your Nabda password carefully" -AsSecureString

$BSTR = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($NabdaPasswordSecure)
$NabdaPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($BSTR)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

$LoginUrl = "https://api.nabdaotp.com/api/v1/auth/login"

$loginHeaders = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$loginBody = @{
    email = $NabdaEmail
    password = $NabdaPassword
} | ConvertTo-Json -Depth 10

Write-Host "`nTesting Nabda login only..." -ForegroundColor Cyan
Write-Host "Email: $NabdaEmail" -ForegroundColor Cyan

try {
    $loginRes = Invoke-WebRequest `
        -Uri $LoginUrl `
        -Method POST `
        -Headers $loginHeaders `
        -Body $loginBody `
        -UseBasicParsing `
        -TimeoutSec 30

    Write-Host "`n✅ LOGIN WORKED HTTP $($loginRes.StatusCode)" -ForegroundColor Green
    Write-Host $loginRes.Content
} catch {
    Write-Host "`n❌ LOGIN FAILED" -ForegroundColor Red

    try {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "HTTP $status" -ForegroundColor Yellow

        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host $errorBody -ForegroundColor Yellow
    } catch {
        Write-Host $_.Exception.Message -ForegroundColor Yellow
    }
}

Read-Host "Press Enter to close"
