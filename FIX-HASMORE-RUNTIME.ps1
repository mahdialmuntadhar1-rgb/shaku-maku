$ErrorActionPreference = "Continue"

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$PagesProject = "shakumaku"
$AppFile = ".\src\App.tsx"
$BackupDir = ".\backup-before-hasmore-fix-$Stamp"

function Pause-End {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host " FINISHED / STOPPED" -ForegroundColor Green
    Write-Host " Window stays open." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Read-Host "Press Enter to close"
}

try {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host " FIX hasMore RUNTIME CRASH" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    if (!(Test-Path $AppFile)) {
        Write-Host "❌ Cannot find src\App.tsx. Wrong folder." -ForegroundColor Red
        Pause-End
        exit
    }

    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Copy-Item $AppFile "$BackupDir\App.tsx" -Force
    Write-Host "✅ Backup created: $BackupDir" -ForegroundColor Green

    $text = Get-Content $AppFile -Raw -Encoding UTF8

    Write-Host "`n1) Searching hasMore usage..." -ForegroundColor Cyan
    Select-String -Path $AppFile -Pattern "hasMore|loadMore|Load More|تحميل|المزيد" -Context 2,2

    if ($text -notmatch "const\s+hasMore\s*=" -and $text -notmatch "\[hasMore,\s*setHasMore\]") {
        Write-Host "`n2) hasMore is missing. Adding safe definition..." -ForegroundColor Cyan

        $anchor = "  }, [businesses, selectedGov, selectedCategory, searchQuery, currentLang]);"

        $insert = @"

  // Safe frontend pagination flags.
  // The app currently fetches a large filtered batch from the backend, so this prevents a runtime crash
  // when older JSX still references hasMore.
  const hasMore = false;
  const loadMoreBusinesses = () => {};
  const handleLoadMoreBusinesses = () => {};
"@

        if ($text.Contains($anchor)) {
            $text = $text.Replace($anchor, $anchor + $insert)
            Write-Host "✅ Added hasMore after filteredBusinesses" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Main anchor not found. Trying regex insert..." -ForegroundColor Yellow

            $pattern = "\}, \[businesses, selectedGov, selectedCategory, searchQuery, currentLang\]\);"
            $replacement = "}, [businesses, selectedGov, selectedCategory, searchQuery, currentLang]);$insert"

            $newText = [regex]::Replace($text, $pattern, $replacement, 1)

            if ($newText -ne $text) {
                $text = $newText
                Write-Host "✅ Regex insert worked" -ForegroundColor Green
            } else {
                Write-Host "❌ Could not insert hasMore automatically." -ForegroundColor Red
                Copy-Item "$BackupDir\App.tsx" $AppFile -Force
                Pause-End
                exit
            }
        }
    } else {
        Write-Host "✅ hasMore already defined" -ForegroundColor Green
    }

    Set-Content $AppFile $text -Encoding UTF8

    Write-Host "`n3) Checking conflict markers..." -ForegroundColor Cyan
    $ConflictFiles = Get-ChildItem -Path ".\src" -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx |
        Select-String -Pattern "<<<<<<<|=======|>>>>>>>" |
        Select-Object -ExpandProperty Path -Unique

    if ($ConflictFiles) {
        Write-Host "❌ Conflict markers still found:" -ForegroundColor Red
        $ConflictFiles | ForEach-Object { Write-Host $_ -ForegroundColor Red }
        Pause-End
        exit
    }

    Write-Host "✅ No conflict markers in src" -ForegroundColor Green

    Write-Host "`n4) Build..." -ForegroundColor Cyan
    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed. Restoring App.tsx backup..." -ForegroundColor Red
        Copy-Item "$BackupDir\App.tsx" $AppFile -Force
        Pause-End
        exit
    }

    Write-Host "✅ Build passed" -ForegroundColor Green

    Write-Host "`n5) Commit..." -ForegroundColor Cyan
    git add .\src\App.tsx
    git commit -m "Fix hasMore frontend runtime crash"

    Write-Host "`n6) Deploy frontend..." -ForegroundColor Cyan
    npx wrangler pages deploy ".\dist" --project-name $PagesProject

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Deploy failed, but build passed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n✅ Deploy complete" -ForegroundColor Green
    Start-Process "https://shakumaku.pages.dev/?hasmore-fix=$Stamp"

    Write-Host "`nTEST NOW:" -ForegroundColor Cyan
    Write-Host "1. Hard refresh with Ctrl+F5" -ForegroundColor Yellow
    Write-Host "2. Login" -ForegroundColor Yellow
    Write-Host "3. Test Baghdad + Restaurants" -ForegroundColor Yellow
    Write-Host "4. Confirm no hasMore console crash" -ForegroundColor Yellow

    Pause-End
}
catch {
    Write-Host "`n❌ SCRIPT ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Pause-End
}
