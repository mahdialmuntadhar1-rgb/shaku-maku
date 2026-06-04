$ErrorActionPreference = "Continue"

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$PagesProject = "shakumaku"
$AppFile = ".\src\App.tsx"
$ApiFile = ".\src\api.ts"
$BackupDir = ".\backup-before-api-conflict-filter-fix-$Stamp"

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
    Write-Host " FIX API CONFLICT + FILTERS + DEPLOY" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    if (!(Test-Path ".\package.json")) {
        Write-Host "❌ package.json not found. Wrong folder." -ForegroundColor Red
        Pause-End
        exit
    }

    if (!(Test-Path $AppFile)) {
        Write-Host "❌ src\App.tsx not found." -ForegroundColor Red
        Pause-End
        exit
    }

    if (!(Test-Path $ApiFile)) {
        Write-Host "❌ src\api.ts not found." -ForegroundColor Red
        Pause-End
        exit
    }

    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Copy-Item $AppFile "$BackupDir\App.tsx" -Force
    Copy-Item $ApiFile "$BackupDir\api.ts" -Force
    Write-Host "✅ Backup created: $BackupDir" -ForegroundColor Green

    Write-Host "`n1) Checking conflict markers..." -ForegroundColor Cyan

    $ConflictFiles = Get-ChildItem -Path ".\src" -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx |
        Select-String -Pattern "<<<<<<<|=======|>>>>>>>" |
        Select-Object -ExpandProperty Path -Unique

    if ($ConflictFiles) {
        Write-Host "⚠️ Conflict markers found in:" -ForegroundColor Yellow
        $ConflictFiles | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    } else {
        Write-Host "✅ No conflict markers found in src files" -ForegroundColor Green
    }

    Write-Host "`n2) Restoring clean src/api.ts from Git HEAD..." -ForegroundColor Cyan

    $cleanApi = git show HEAD:src/api.ts

    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($cleanApi)) {
        Write-Host "❌ Could not read clean api.ts from Git HEAD." -ForegroundColor Red
        Write-Host "Backup is here: $BackupDir" -ForegroundColor Yellow
        Pause-End
        exit
    }

    $cleanApi | Set-Content $ApiFile -Encoding UTF8

    $apiNow = Get-Content $ApiFile -Raw -Encoding UTF8
    if ($apiNow -match "<<<<<<<|=======|>>>>>>>") {
        Write-Host "❌ api.ts still has conflict markers. Stop." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "✅ api.ts cleaned" -ForegroundColor Green

    Write-Host "`n3) Patching App.tsx filters..." -ForegroundColor Cyan

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
        Write-Host "✅ Governorate mapper already exists / syntax checked" -ForegroundColor Green
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
        Write-Host "✅ Replaced exact API params block" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Exact params block not found. Trying regex patch..." -ForegroundColor Yellow

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

    Write-Host "`n4) Final conflict marker check..." -ForegroundColor Cyan

    $ConflictFilesAfter = Get-ChildItem -Path ".\src" -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx |
        Select-String -Pattern "<<<<<<<|=======|>>>>>>>" |
        Select-Object -ExpandProperty Path -Unique

    if ($ConflictFilesAfter) {
        Write-Host "❌ Conflict markers still found:" -ForegroundColor Red
        $ConflictFilesAfter | ForEach-Object { Write-Host $_ -ForegroundColor Red }
        Pause-End
        exit
    }

    Write-Host "✅ No conflict markers in src" -ForegroundColor Green

    Write-Host "`n5) Build..." -ForegroundColor Cyan
    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed. Restoring backups..." -ForegroundColor Red
        Copy-Item "$BackupDir\App.tsx" $AppFile -Force
        Copy-Item "$BackupDir\api.ts" $ApiFile -Force
        Pause-End
        exit
    }

    Write-Host "✅ Build passed" -ForegroundColor Green

    Write-Host "`n6) Clean accidental backup folders from Git tracking..." -ForegroundColor Cyan

    $trackedBackups = git ls-files "backup-before-*"
    if ($trackedBackups) {
        $trackedBackups | ForEach-Object {
            git rm --cached "$_" 2>$null
        }
        Write-Host "✅ Removed tracked backup files from Git index" -ForegroundColor Green
    } else {
        Write-Host "✅ No tracked backup folders found" -ForegroundColor Green
    }

    Write-Host "`n7) Commit only real source files..." -ForegroundColor Cyan
    git add .\src\App.tsx .\src\api.ts .\LOCK_STATUS.md
    git commit -m "Fix API conflict markers and business filters"

    Write-Host "`n8) Deploy frontend..." -ForegroundColor Cyan
    npx wrangler pages deploy ".\dist" --project-name $PagesProject

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Deploy failed, but build passed." -ForegroundColor Red
        Pause-End
        exit
    }

    Write-Host "`n✅ Deploy complete" -ForegroundColor Green
    Start-Process "https://shakumaku.pages.dev/?api-conflict-filter-fix=$Stamp"

    Write-Host "`nTest now:" -ForegroundColor Cyan
    Write-Host "1. Login with safaribosafar@gmail.com" -ForegroundColor Yellow
    Write-Host "2. Select Baghdad" -ForegroundColor Yellow
    Write-Host "3. Select Restaurants" -ForegroundColor Yellow
    Write-Host "4. Change to Erbil" -ForegroundColor Yellow
    Write-Host "5. Confirm business cards still load" -ForegroundColor Yellow

    Pause-End
}
catch {
    Write-Host "`n❌ SCRIPT ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Pause-End
}
