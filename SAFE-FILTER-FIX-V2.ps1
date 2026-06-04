$ErrorActionPreference = "Continue"

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$PagesProject = "shakumaku"
$AppFile = ".\src\App.tsx"
$BackupDir = ".\backup-before-filter-fix-v2-$Stamp"

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
    Write-Host " SHAKU MAKU FILTER FIX V2" -ForegroundColor Cyan
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
        Write-Host "✅ Added fixed governorate mapper" -ForegroundColor Green
    } else {
        $text = $text -replace "return map\[code\] \?\? String\(value \|\| ''\)\.trim\(\) \|\| null;", "return map[code] || String(value || '').trim() || null;"
        Write-Host "✅ Governorate mapper already exists / syntax fixed" -ForegroundColor Green
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
        Write-Host "✅ Replaced API params block" -ForegroundColor Green
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
            Write-Host "✅ Regex params patch worked" -ForegroundColor Green
        } else {
            Write-Host "❌ Could not patch params block." -ForegroundColor Red
            Copy-Item "$BackupDir\App.tsx" $AppFile -Force
            Pause-End
            exit
        }
    }

    $text = $text.Replace(
        "const catMatch = !selectedCategory || b.category === selectedCategory;",
        "const catMatch = !selectedCategory || selectedCategory === 'other' || b.category === selectedCategory;"
    )

    Set-Content $AppFile $text -Encoding UTF8

    Write-Host "`nChecking patched lines..." -ForegroundColor Cyan
    Select-String -Path $AppFile -Pattern "toDatabaseGovernorateValue|limit: 500|catMatch|return map\[code\]" -Context 1,1

    Write-Host "`nBuilding..." -ForegroundColor Cyan
    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed again. Restoring backup..." -ForegroundColor Red
        Copy-Item "$BackupDir\App.tsx" $AppFile -Force
        Pause-End
        exit
    }

    Write-Host "✅ Build passed" -ForegroundColor Green

    Write-Host "`nCommitting..." -ForegroundColor Cyan
    git add .\src\App.tsx .\LOCK_STATUS.md
    git commit -m "Fix governorate API filtering and local category filtering"

    Write-Host "`nDeploying..." -ForegroundColor Cyan
    npx wrangler pages deploy ".\dist" --project-name $PagesProject

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Deploy failed. Build passed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n✅ Deploy complete" -ForegroundColor Green
    Start-Process "https://shakumaku.pages.dev/?filter-fix-v2=$Stamp"

    Pause-End
}
catch {
    Write-Host "`n❌ SCRIPT ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Pause-End
}
