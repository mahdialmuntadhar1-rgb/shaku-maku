$ErrorActionPreference = "Continue"

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$PagesProject = "shakumaku"
$AppFile = ".\src\App.tsx"
$BackupDir = ".\backup-before-filter-fix-$Stamp"

function Pause-End {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host " FINISHED / STOPPED" -ForegroundColor Green
    Write-Host " This window will stay open." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Read-Host "Press Enter to close"
}

try {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host " SHAKU MAKU SAFE FILTER FIX" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    Write-Host "`n1) Current folder:" -ForegroundColor Cyan
    Get-Location

    if (!(Test-Path $AppFile)) {
        Write-Host "❌ Cannot find src\App.tsx. You are probably in the wrong folder." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n2) Creating backup..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Copy-Item $AppFile "$BackupDir\App.tsx" -Force
    Write-Host "✅ Backup created: $BackupDir" -ForegroundColor Green

    Write-Host "`n3) Updating LOCK_STATUS.md..." -ForegroundColor Cyan

@"
# SHAKU MAKU LOCK STATUS

Date: $Stamp

## Confirmed working

Frontend:
https://shakumaku.pages.dev/

Backend:
https://shaku-maku.mahdialmuntadhar1.workers.dev/

Database:
shaku_maku_db

Admin email:
safaribosafar@gmail.com

Auth:
Login was fixed by deploying Worker secret version to 100%.

Do not rotate Worker secrets again unless needed.

Nabda WhatsApp API:
POST https://api.nabdaotp.com/api/v1/messages/send

Nabda header:
Authorization: RAW_API_KEY

No Bearer.
"@ | Set-Content ".\LOCK_STATUS.md" -Encoding UTF8

    Write-Host "✅ LOCK_STATUS.md updated" -ForegroundColor Green

    Write-Host "`n4) Patching App.tsx..." -ForegroundColor Cyan

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

  return map[code] ?? String(value || '').trim() || null;
}

"@

    if ($text -notmatch "function toDatabaseGovernorateValue") {
        $text = $text.Replace($marker, $insert + $marker)
        Write-Host "✅ Added governorate database mapper" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Governorate mapper already exists" -ForegroundColor Yellow
    }

    $oldBlock = @"
        const params: { page: number; limit: number; governorate?: string; category?: string } = { page: 1, limit: 50 };
        if (selectedGov !== 'all') {
          const selectedGovMeta = GOVERNORATES.find((g) => g.code === selectedGov);
          params.governorate = selectedGovMeta?.englishLabel || selectedGovMeta?.name.en || selectedGov;
        }
        if (selectedCategory && selectedCategory !== 'other') {
          params.category = selectedCategory;
        }
"@

    $newBlock = @"
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

    if ($text.Contains($oldBlock)) {
        $text = $text.Replace($oldBlock, $newBlock)
        Write-Host "✅ Replaced exact params block" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Exact block not found. Trying regex patch..." -ForegroundColor Yellow

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
            Write-Host "✅ Regex patch worked" -ForegroundColor Green
        } else {
            Write-Host "❌ Could not patch params block automatically." -ForegroundColor Red
            Write-Host "Backup is here: $BackupDir" -ForegroundColor Yellow
            Pause-End
            exit
        }
    }

    $oldCatLine = "const catMatch = !selectedCategory || b.category === selectedCategory;"
    $newCatLine = "const catMatch = !selectedCategory || selectedCategory === 'other' || b.category === selectedCategory;"

    if ($text.Contains($oldCatLine)) {
        $text = $text.Replace($oldCatLine, $newCatLine)
        Write-Host "✅ Improved local category filter" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Category filter line already changed or not found" -ForegroundColor Yellow
    }

    Set-Content $AppFile $text -Encoding UTF8

    Write-Host "`n5) Build..." -ForegroundColor Cyan
    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed. Restoring backup..." -ForegroundColor Red
        Copy-Item "$BackupDir\App.tsx" $AppFile -Force
        Pause-End
        exit
    }

    Write-Host "✅ Build passed" -ForegroundColor Green

    Write-Host "`n6) Commit..." -ForegroundColor Cyan
    git add .\src\App.tsx .\LOCK_STATUS.md
    git commit -m "Fix governorate API filtering and local category filtering"

    Write-Host "`n7) Deploy..." -ForegroundColor Cyan
    npx wrangler pages deploy ".\dist" --project-name $PagesProject

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Deploy failed. Build passed but deploy failed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n✅ Deploy complete" -ForegroundColor Green
    Start-Process "https://shakumaku.pages.dev/?filter-fix=$Stamp"

    Pause-End
}
catch {
    Write-Host "`n❌ SCRIPT ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Pause-End
}
