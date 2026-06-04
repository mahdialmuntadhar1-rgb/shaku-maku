$ErrorActionPreference = "Continue"

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$PagesProject = "shakumaku"
$AppFile = ".\src\App.tsx"
$ApiFile = ".\src\api.ts"
$AuthFile = ".\src\components\AuthModal.tsx"
$BackupDir = ".\backup-before-final-build-deploy-$Stamp"

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
    Write-Host " FINAL BUILD + DEPLOY AFTER CONFLICT FIX" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Copy-Item $AppFile "$BackupDir\App.tsx" -Force
    Copy-Item $ApiFile "$BackupDir\api.ts" -Force
    Copy-Item $AuthFile "$BackupDir\AuthModal.tsx" -Force
    Write-Host "✅ Backup created: $BackupDir" -ForegroundColor Green

    Write-Host "`n1) Restore clean api.ts and AuthModal.tsx from Git HEAD..." -ForegroundColor Cyan

    $cleanApi = git show HEAD:src/api.ts
    if ($LASTEXITCODE -eq 0 -and ![string]::IsNullOrWhiteSpace($cleanApi)) {
        $cleanApi | Set-Content $ApiFile -Encoding UTF8
        Write-Host "✅ api.ts restored clean" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not restore api.ts" -ForegroundColor Red
        Pause-End
        exit
    }

    $cleanAuth = git show HEAD:src/components/AuthModal.tsx
    if ($LASTEXITCODE -eq 0 -and ![string]::IsNullOrWhiteSpace($cleanAuth)) {
        $cleanAuth | Set-Content $AuthFile -Encoding UTF8
        Write-Host "✅ AuthModal.tsx restored clean" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not restore AuthModal.tsx" -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n2) Ensure App.tsx filter fix exists..." -ForegroundColor Cyan

    $text = Get-Content $AppFile -Raw -Encoding UTF8

    $marker = "function normalizeCategoryId(value: unknown): string {"

    $insert = @"
function toDatabaseGovernorateValue(value: unknown): string | null {
  const code = normalizeGovCode(value);
  const map: Record<string, string> = {
    all: '',
    baghdad: 'Baghdad',
    basra: 'Basra',
    erbil: 'Erbil',
    sulaymaniyah: 'Sulaymaniyah',
    duhok: 'Duhok',
    mosul: 'Nineveh',
    najaf: 'Najaf',
    karbala: 'Karbala',
    kirkuk: 'Kirkuk',
    anbar: 'Anbar',
    babil: 'Babil',
    diyala: 'Diyala',
    wasit: 'Wasit',
    saladin: 'Salahaddin',
    maysan: 'Maysan',
    dhiqar: 'Dhi Qar',
    muthanna: 'Muthanna',
    qadisiya: 'Qadisiyyah',
    halabja: 'Halabja'
  };

  return map[code] || String(value || '').trim() || null;
}

"@

    if ($text -notmatch "function toDatabaseGovernorateValue") {
        $text = $text.Replace($marker, $insert + $marker)
        Write-Host "✅ Added governorate DB mapper" -ForegroundColor Green
    } else {
        $text = $text -replace "return map\[code\] \?\? String\(value \|\| ''\)\.trim\(\) \|\| null;", "return map[code] || String(value || '').trim() || null;"
        Write-Host "✅ Governorate DB mapper already exists" -ForegroundColor Green
    }

    if ($text -match "limit: 500" -and $text -match "toDatabaseGovernorateValue\(selectedGov\)") {
        Write-Host "✅ API params block already patched" -ForegroundColor Green
    } else {
        Write-Host "⚠️ API params block not patched yet. Trying patch..." -ForegroundColor Yellow

        $pattern = "const params: \{ page: number; limit: number; governorate\?: string; category\?: string \} = \{ page: 1, limit: 50 \};[\s\S]*?if \(selectedCategory && selectedCategory !== 'other'\) \{[\s\S]*?params\.category = selectedCategory;[\s\S]*?\}"

        $replacement = @"
const params: { page: number; limit: number; governorate?: string } = { page: 1, limit: 500 };

        if (selectedGov !== 'all') {
          const dbGovernorate = toDatabaseGovernorateValue(selectedGov);
          if (dbGovernorate) {
            params.governorate = dbGovernorate;
          }
        }

        // Do not send category to backend here.
        // Fetch by governorate, normalize categories, then filter locally.
"@

        $newText = [regex]::Replace($text, $pattern, $replacement, 1)

        if ($newText -ne $text) {
            $text = $newText
            Write-Host "✅ API params block patched now" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Could not patch API params block, but continuing to build because it may already be modified differently." -ForegroundColor Yellow
        }
    }

    $text = $text.Replace(
        "const catMatch = !selectedCategory || b.category === selectedCategory;",
        "const catMatch = !selectedCategory || selectedCategory === 'other' || b.category === selectedCategory;"
    )

    Set-Content $AppFile $text -Encoding UTF8

    Write-Host "`n3) Conflict marker check..." -ForegroundColor Cyan

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
        Write-Host "❌ Build failed. Restoring backups..." -ForegroundColor Red
        Copy-Item "$BackupDir\App.tsx" $AppFile -Force
        Copy-Item "$BackupDir\api.ts" $ApiFile -Force
        Copy-Item "$BackupDir\AuthModal.tsx" $AuthFile -Force
        Pause-End
        exit
    }

    Write-Host "✅ Build passed" -ForegroundColor Green

    Write-Host "`n5) Clean backup folders from Git tracking..." -ForegroundColor Cyan

    $trackedBackups = git ls-files "backup-before-*"
    if ($trackedBackups) {
        $trackedBackups | ForEach-Object {
            git rm --cached "$_" 2>$null
        }
        Write-Host "✅ Backup files removed from Git index" -ForegroundColor Green
    } else {
        Write-Host "✅ No tracked backup folders found" -ForegroundColor Green
    }

    Write-Host "`n6) Commit..." -ForegroundColor Cyan
    git add .\src\App.tsx .\src\api.ts .\src\components\AuthModal.tsx .\LOCK_STATUS.md
    git commit -m "Fix auth conflicts and deploy business filters"

    Write-Host "`n7) Deploy frontend..." -ForegroundColor Cyan
    npx wrangler pages deploy ".\dist" --project-name $PagesProject

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Deploy failed, but build passed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n✅ Deploy complete" -ForegroundColor Green
    Start-Process "https://shakumaku.pages.dev/?final-filter-auth-fix=$Stamp"

    Write-Host "`nTEST NOW:" -ForegroundColor Cyan
    Write-Host "1. Login with safaribosafar@gmail.com" -ForegroundColor Yellow
    Write-Host "2. Select Baghdad" -ForegroundColor Yellow
    Write-Host "3. Select Restaurants" -ForegroundColor Yellow
    Write-Host "4. Change to Erbil" -ForegroundColor Yellow
    Write-Host "5. Confirm business cards load" -ForegroundColor Yellow

    Pause-End
}
catch {
    Write-Host "`n❌ SCRIPT ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Pause-End
}
