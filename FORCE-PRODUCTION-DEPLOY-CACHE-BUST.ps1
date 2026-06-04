$ErrorActionPreference = "Continue"

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$PagesProject = "shakumaku"

function Pause-End {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host " FINISHED" -ForegroundColor Green
    Write-Host " Window stays open." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Read-Host "Press Enter to close"
}

try {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host " FORCE PRODUCTION DEPLOY + CACHE BUST" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    Write-Host "`n1) Confirm hasMore exists in App.tsx..." -ForegroundColor Cyan
    Select-String -Path ".\src\App.tsx" -Pattern "const hasMore|hasMore" -Context 2,2

    Write-Host "`n2) Build fresh dist..." -ForegroundColor Cyan
    if (Test-Path ".\dist") {
        Remove-Item ".\dist" -Recurse -Force
    }

    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "✅ Build passed" -ForegroundColor Green

    Write-Host "`n3) Deploy to Cloudflare Pages PRODUCTION branch main..." -ForegroundColor Cyan
    npx wrangler pages deploy ".\dist" --project-name $PagesProject --branch main

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Deploy failed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n✅ Production deploy complete" -ForegroundColor Green

    $Url = "https://shakumaku.pages.dev/?force-cache-bust=$Stamp"
    Write-Host "`nOpening fresh URL:" -ForegroundColor Cyan
    Write-Host $Url -ForegroundColor Yellow
    Start-Process $Url

    Write-Host "`nIMPORTANT IN BROWSER:" -ForegroundColor Yellow
    Write-Host "1. Press Ctrl + Shift + R" -ForegroundColor Yellow
    Write-Host "2. If still same error, open DevTools > Application > Service Workers > Unregister" -ForegroundColor Yellow
    Write-Host "3. Then Application > Storage > Clear site data" -ForegroundColor Yellow
    Write-Host "4. Open the URL again" -ForegroundColor Yellow

    Pause-End
}
catch {
    Write-Host "`n❌ SCRIPT ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Pause-End
}
