<#
  Video studio doctor — Windows (PowerShell 5.1+).
  Checks every prerequisite for the Remotion + ffmpeg + whisper video pipeline.
  Exit 0 = every REQUIRED check passed. Exit 1 = something required is missing.

  Usage:
    powershell -ExecutionPolicy Bypass -File doctor.ps1
    powershell -ExecutionPolicy Bypass -File doctor.ps1 -Repo C:\path\to\repo
#>

param(
  [string]$Repo = ""
)

$ErrorActionPreference = "Continue"

# ------------------------------------------------------------- constants
$MinNodeMajor  = 18
$MinPyMinor    = 9
$MinDiskGB     = 10
$ModelDir      = Join-Path $env:USERPROFILE ".cache\whisper-cpp"
$ModelFile     = Join-Path $ModelDir "ggml-small.en.bin"
$ModelMinBytes = 400000000
$ModelUrl      = "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin"

if ([string]::IsNullOrWhiteSpace($Repo)) {
  # scripts/ -> setup-video-studio/ -> skills/ -> .claude/ -> repo root
  $Repo = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")).Path
}

# --------------------------------------------------------------- state
$script:Failed    = @()
$script:Warned    = @()
$script:PassCount = 0
$script:FailCount = 0
$script:WarnCount = 0

function Pass($label, $detail) {
  $script:PassCount++
  Write-Host "  PASS  " -ForegroundColor Green -NoNewline
  Write-Host ("{0,-22} {1}" -f $label, $detail)
}
function Fail($label, $detail, $fix) {
  $script:FailCount++
  Write-Host "  FAIL  " -ForegroundColor Red -NoNewline
  Write-Host ("{0,-22} {1}" -f $label, $detail)
  $script:Failed += [pscustomobject]@{ Label = $label; Fix = $fix }
}
function Warn($label, $detail, $note) {
  $script:WarnCount++
  Write-Host "  WARN  " -ForegroundColor Yellow -NoNewline
  Write-Host ("{0,-22} {1}" -f $label, $detail)
  $script:Warned += [pscustomobject]@{ Label = $label; Note = $note }
}
function Have($cmd) { return [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }

# -------------------------------------------------------------- header
$osName = (Get-CimInstance Win32_OperatingSystem -ErrorAction SilentlyContinue).Caption
if (-not $osName) { $osName = "Windows" }
$arch = $env:PROCESSOR_ARCHITECTURE

Write-Host ""
Write-Host "Video Studio — setup checklist" -ForegroundColor White
Write-Host "  $osName ($arch)"
Write-Host "  repo: $Repo"
Write-Host ""

# ===================================================== 1. PACKAGE MANAGER
Write-Host "1. Package manager" -ForegroundColor White
if (Have "winget") {
  Pass "winget" (winget --version 2>$null)
} elseif (Have "choco") {
  Pass "Chocolatey" (choco --version 2>$null)
} else {
  Fail "winget" "not available" `
    "winget ships with Windows 10 1809+ / Windows 11 via 'App Installer'. Install it from the Microsoft Store (search 'App Installer'), then reopen PowerShell."
}

# ============================================================== 2. CORE
Write-Host ""
Write-Host "2. Core tools" -ForegroundColor White

if (Have "git") { Pass "git" (git --version 2>$null) }
else { Fail "git" "not installed" "winget install --id Git.Git -e --source winget" }

if (Have "node") {
  $nodeV = (node -v 2>$null)
  $nodeMajor = 0
  if ($nodeV -match '^v(\d+)') { $nodeMajor = [int]$Matches[1] }
  if ($nodeMajor -ge $MinNodeMajor) { Pass "Node.js" $nodeV }
  else { Fail "Node.js" "$nodeV is too old (need $MinNodeMajor+)" "winget install --id OpenJS.NodeJS.LTS -e --source winget" }
} else {
  Fail "Node.js" "not installed" "winget install --id OpenJS.NodeJS.LTS -e --source winget"
}

if (Have "npm") { Pass "npm" (npm -v 2>$null) }
else { Fail "npm" "not installed" "Comes with Node.js — install Node first." }

$pyCmd = $null
foreach ($c in @("python", "python3", "py")) { if (Have $c) { $pyCmd = $c; break } }
if ($pyCmd) {
  $pyV = & $pyCmd -c "import sys;print('%d.%d'%sys.version_info[:2])" 2>$null
  $ok = $false
  if ($pyV -match '^(\d+)\.(\d+)$') {
    $ok = ([int]$Matches[1] -eq 3 -and [int]$Matches[2] -ge $MinPyMinor)
  }
  if ($ok) { Pass "Python" "$pyV ($pyCmd)" }
  else { Fail "Python" "$pyV is too old (need 3.$MinPyMinor+)" "winget install --id Python.Python.3.12 -e --source winget" }
} else {
  Fail "Python" "not installed" "winget install --id Python.Python.3.12 -e --source winget   # tick 'Add to PATH'"
}

# ============================================================= 3. MEDIA
Write-Host ""
Write-Host "3. Media tools" -ForegroundColor White

if (Have "ffmpeg") {
  $ffv = (ffmpeg -version 2>$null | Select-Object -First 1)
  $ffShort = ((($ffv -split ' ') | Select-Object -First 3) -join ' ')
  Pass "ffmpeg" $ffShort

  # Wrap in @() — in PS 5.1 a no-match Select-String returns $null, and $null.Count throws.
  $filters = @(ffmpeg -filters 2>$null | Select-String -Pattern 'subtitles|drawtext').Count
  if ($filters -gt 0) {
    Pass "ffmpeg text filters" "drawtext/subtitles available"
  } else {
    Warn "ffmpeg text filters" "no libass/drawtext in this build" `
      "Not a blocker. The pipeline renders captions as transparent PNGs and composites them with the overlay filter."
  }
} else {
  Fail "ffmpeg" "not installed" "winget install --id Gyan.FFmpeg -e --source winget   # then reopen PowerShell so PATH refreshes"
}

if (Have "ffprobe") { Pass "ffprobe" "available" }
else { Fail "ffprobe" "not installed" "Ships with ffmpeg — install ffmpeg." }

# ============================================================ 4. WHISPER
Write-Host ""
Write-Host "4. Transcription (captions)" -ForegroundColor White

if (Have "whisper-cli") {
  $wv = (whisper-cli --version 2>&1 | Select-String -Pattern 'version' | Select-Object -First 1)
  Pass "whisper-cli" $wv
} else {
  Fail "whisper-cli" "not installed" `
    "No winget package. Download the prebuilt Windows build from https://github.com/ggml-org/whisper.cpp/releases (whisper-bin-x64.zip), extract to %USERPROFILE%\.whisper\, and add that folder to PATH. Full steps in rules/windows.md."
}

if (Test-Path $ModelFile) {
  $size = (Get-Item $ModelFile).Length
  if ($size -ge $ModelMinBytes) {
    Pass "whisper model" ("small.en ({0} MB)" -f [int]($size / 1MB))
  } else {
    Fail "whisper model" ("file is truncated ({0} MB)" -f [int]($size / 1MB)) `
      "Remove-Item '$ModelFile'; then re-download — see the command below."
  }
} else {
  Fail "whisper model" "not downloaded" `
    "New-Item -ItemType Directory -Force -Path '$ModelDir'; Invoke-WebRequest -Uri '$ModelUrl' -OutFile '$ModelFile'   # ~487 MB"
}

# =============================================================== 5. REPO
Write-Host ""
Write-Host "5. Project" -ForegroundColor White

$pkg = Join-Path $Repo "package.json"
if ((Test-Path $pkg) -and (Select-String -Path $pkg -Pattern '"remotion"' -Quiet)) {
  Pass "repo" $Repo

  if (Test-Path (Join-Path $Repo "node_modules\remotion")) {
    $rv = "?"
    try {
      $rv = (Get-Content (Join-Path $Repo "node_modules\remotion\package.json") -Raw | ConvertFrom-Json).version
    } catch {}
    Pass "dependencies" "remotion $rv installed"
  } else {
    Fail "dependencies" "node_modules missing" "cd '$Repo'; npm install"
  }

  $shell1 = Join-Path $Repo "node_modules\.remotion\chrome-headless-shell"
  $shell2 = Join-Path $env:LOCALAPPDATA "remotion"
  if ((Test-Path $shell1) -or (Test-Path $shell2)) {
    Pass "Remotion browser" "headless shell cached"
  } else {
    Warn "Remotion browser" "not downloaded yet" "cd '$Repo'; npx remotion browser ensure   # ~150 MB, one time"
  }
} else {
  Fail "repo" "no Remotion package.json at $Repo" `
    "git clone https://github.com/instincthub/remotion-create-video.git; cd remotion-create-video; npm install"
}

# =========================================================== 6. OPTIONAL
Write-Host ""
Write-Host "6. Optional (nice to have)" -ForegroundColor White

$fontFound = $false
foreach ($d in @("$env:WINDIR\Fonts", "$env:LOCALAPPDATA\Microsoft\Windows\Fonts")) {
  if (Test-Path $d) {
    if (@(Get-ChildItem $d -Filter "Montserrat-Bold*" -ErrorAction SilentlyContinue).Count -gt 0) { $fontFound = $true }
  }
}
if ($fontFound) { Pass "Montserrat Bold" "installed" }
else {
  Warn "Montserrat Bold" "not installed" `
    "Default caption/badge font. Download from fonts.google.com/specimen/Montserrat, right-click Montserrat-Bold.ttf and choose 'Install for all users'."
}

if (Have "gh") { Pass "GitHub CLI" (gh --version 2>$null | Select-Object -First 1) }
else { Warn "GitHub CLI" "not installed" "Only needed to push/pull via CLI: winget install --id GitHub.cli -e" }

try {
  $drive = (Get-Item $Repo).PSDrive.Name
  $freeGB = [int]((Get-PSDrive $drive).Free / 1GB)
  if ($freeGB -ge $MinDiskGB) { Pass "disk space" "$freeGB GB free" }
  else { Warn "disk space" "$freeGB GB free" "Video work needs headroom. $MinDiskGB GB+ recommended." }
} catch {
  Warn "disk space" "could not determine" "Make sure you have at least $MinDiskGB GB free."
}

# ============================================================ 7. SUMMARY
Write-Host ""
Write-Host "Result  " -NoNewline -ForegroundColor White
Write-Host "$script:PassCount passed  " -NoNewline -ForegroundColor Green
Write-Host "$script:FailCount failed  " -NoNewline -ForegroundColor Red
Write-Host "$script:WarnCount warnings" -ForegroundColor Yellow

if ($script:Failed.Count -gt 0) {
  Write-Host ""
  Write-Host "Blocking — fix these before creating video:" -ForegroundColor Red
  foreach ($f in $script:Failed) {
    Write-Host ""
    Write-Host ("  " + $f.Label) -ForegroundColor White
    Write-Host ("    " + $f.Fix)
  }
}

if ($script:Warned.Count -gt 0) {
  Write-Host ""
  Write-Host "Warnings — not blocking:" -ForegroundColor Yellow
  foreach ($w in $script:Warned) {
    Write-Host ""
    Write-Host ("  " + $w.Label) -ForegroundColor White
    Write-Host ("    " + $w.Note)
  }
}

Write-Host ""
if ($script:FailCount -eq 0) {
  Write-Host "Ready. Next: cd '$Repo'; npm run dev" -ForegroundColor Green
  Write-Host ""
  exit 0
} else {
  Write-Host "$script:FailCount required item(s) still missing. Re-run this checklist after fixing."
  Write-Host ""
  exit 1
}
