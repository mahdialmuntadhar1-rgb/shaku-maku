$ErrorActionPreference = "Stop"

$BackendUrl = "https://shaku-maku.mahdialmuntadhar1.workers.dev"
$Email = Read-Host "Email"
$PasswordSecure = Read-Host "Password" -AsSecureString
$BSTR = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($PasswordSecure)
$Password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($BSTR)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

Write-Host "
1) Health..." -ForegroundColor Cyan
try {
    $health = Invoke-WebRequest -Uri "$BackendUrl/health" -Method GET -WebSession $session -UseBasicParsing -TimeoutSec 30
    Write-Host "✅ Health HTTP $($health.StatusCode)" -ForegroundColor Green
    Write-Host $health.Content
} catch {
    Write-Host "❌ Health failed" -ForegroundColor Red
    throw
}

Write-Host "
2) Login..." -ForegroundColor Cyan
$loginBody = @{
    email = $Email
    password = $Password
} | ConvertTo-Json -Depth 10

try {
    $login = Invoke-WebRequest 
        -Uri "$BackendUrl/api/auth/login" 
        -Method POST 
        -Headers @{
            "Content-Type" = "application/json"
            "Accept" = "application/json"
        } 
        -Body $loginBody 
        -WebSession $session 
        -UseBasicParsing 
        -TimeoutSec 30

    Write-Host "✅ Login HTTP $($login.StatusCode)" -ForegroundColor Green
    Write-Host $login.Content
} catch {
    Write-Host "❌ Login failed" -ForegroundColor Red
    try {
        $status = $_..Exception.Response.StatusCode.value__
        Write-Host "HTTP $status" -ForegroundColor Yellow
        $reader = New-Object System.IO.StreamReader($_..Exception.Response.GetResponseStream())
        Write-Host ($reader.ReadToEnd()) -ForegroundColor Yellow
    } catch {
        Write-Host $_..Exception.Message -ForegroundColor Yellow
    }
    exit 1
}

Write-Host "
3) Me..." -ForegroundColor Cyan
$meUrls = @(
    "$BackendUrl/api/auth/me",
    "$BackendUrl/api/users/me",
    "$BackendUrl/api/me"
)

$meWorked = $false

foreach ($url in $meUrls) {
    try {
        $me = Invoke-WebRequest 
            -Uri $url 
            -Method GET 
            -Headers @{ "Accept" = "application/json" } 
            -WebSession $session 
            -UseBasicParsing 
            -TimeoutSec 30

        Write-Host "✅ ME OK: $url HTTP $($me.StatusCode)" -ForegroundColor Green
        Write-Host $me.Content
        $meWorked = $true
        break
    } catch {
        Write-Host "⚠️ ME failed: $url" -ForegroundColor Yellow
    }
}

if (-not $meWorked) {
    Write-Host "❌ Login did not produce a reusable authenticated session." -ForegroundColor Red
    exit 1
}

Write-Host "
4) DONE" -ForegroundColor Green
