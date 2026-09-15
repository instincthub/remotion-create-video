#!/usr/bin/env bash
# Video studio doctor — macOS / Linux.
# Checks every prerequisite for the Remotion + ffmpeg + whisper video pipeline.
# Exit 0 = every REQUIRED check passed. Exit 1 = something required is missing.
#
# Usage:
#   bash doctor.sh              # check the repo this script lives in
#   bash doctor.sh /path/repo   # check a specific repo checkout
#
# Written for bash 3.2 (the macOS system bash) — no associative arrays.

set -u

# ---------------------------------------------------------------- constants
MIN_NODE_MAJOR=18
MIN_PY_MINOR=9          # i.e. python 3.9+
MIN_DISK_GB=10
MODEL_DIR="$HOME/.cache/whisper-cpp"
MODEL_FILE="$MODEL_DIR/ggml-small.en.bin"
MODEL_MIN_BYTES=400000000
MODEL_URL="https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin"

# Repo to inspect: argument, else two levels up from this script.
if [ $# -ge 1 ]; then
  REPO="$1"
else
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  REPO="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
fi

# ------------------------------------------------------------------ colours
if [ -t 1 ]; then
  R=$'\033[31m'; G=$'\033[32m'; Y=$'\033[33m'; B=$'\033[1m'; N=$'\033[0m'
else
  R=''; G=''; Y=''; B=''; N=''
fi

FAILED=""        # newline-separated "label|fix" for required failures
WARNED=""        # newline-separated "label|note" for warnings
PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0

pass() { PASS_COUNT=$((PASS_COUNT+1)); printf "  ${G}PASS${N}  %-22s %s\n" "$1" "$2"; }
fail() { FAIL_COUNT=$((FAIL_COUNT+1)); printf "  ${R}FAIL${N}  %-22s %s\n" "$1" "$2"
         FAILED="${FAILED}$1|$3
"; }
warn() { WARN_COUNT=$((WARN_COUNT+1)); printf "  ${Y}WARN${N}  %-22s %s\n" "$1" "$2"
         WARNED="${WARNED}$1|$3
"; }

have() { command -v "$1" >/dev/null 2>&1; }

# ------------------------------------------------------------------- header
OS="$(uname -s)"
ARCH="$(uname -m)"
case "$OS" in
  Darwin) OS_NAME="macOS $(sw_vers -productVersion 2>/dev/null || echo '?')" ; PKG="brew" ;;
  Linux)  OS_NAME="Linux" ; PKG="apt" ;;
  *)      OS_NAME="$OS" ; PKG="unknown" ;;
esac

printf "\n${B}Video Studio — setup checklist${N}\n"
printf "  %s (%s)\n" "$OS_NAME" "$ARCH"
printf "  repo: %s\n\n" "$REPO"

# ============================================================ 1. PACKAGE MGR
printf "${B}1. Package manager${N}\n"
if [ "$OS" = "Darwin" ]; then
  if have brew; then
    pass "Homebrew" "$(brew --version 2>/dev/null | head -1)"
  else
    fail "Homebrew" "not installed" \
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
  fi
elif [ "$OS" = "Linux" ]; then
  if have apt-get; then pass "apt" "available"
  else warn "apt" "not found" "Use your distro package manager for ffmpeg/python3/node."; fi
fi

# ================================================================== 2. CORE
printf "\n${B}2. Core tools${N}\n"

# --- git
GIT_OUT="$(git --version 2>&1)"
if have git && [ "${GIT_OUT#git version}" != "$GIT_OUT" ]; then
  pass "git" "$GIT_OUT"
elif echo "$GIT_OUT" | grep -qi 'xcode license'; then
  fail "git" "blocked by unaccepted Xcode license" \
    "sudo xcodebuild -license accept   # asks for your password, then re-run this checklist"
elif have git; then
  fail "git" "installed but not working: $(echo "$GIT_OUT" | head -1)" \
    "xcode-select --install   # macOS   |   sudo apt install -y git   # Linux"
else
  if [ "$OS" = "Darwin" ]; then
    fail "git" "not installed" "xcode-select --install   # then re-run this checklist"
  else
    fail "git" "not installed" "sudo apt install -y git"
  fi
fi

# --- node
if have node; then
  NODE_V="$(node -v 2>/dev/null)"                       # e.g. v20.11.0
  NODE_MAJOR="$(echo "$NODE_V" | sed 's/^v//' | cut -d. -f1)"
  if [ "$NODE_MAJOR" -ge "$MIN_NODE_MAJOR" ] 2>/dev/null; then
    pass "Node.js" "$NODE_V"
  else
    fail "Node.js" "$NODE_V is too old (need ${MIN_NODE_MAJOR}+)" "brew upgrade node   # or install Node LTS from nodejs.org"
  fi
else
  if [ "$OS" = "Darwin" ]; then
    fail "Node.js" "not installed" "brew install node"
  else
    fail "Node.js" "not installed" "sudo apt install -y nodejs npm"
  fi
fi

# --- npm
if have npm; then pass "npm" "$(npm -v 2>/dev/null)"
else fail "npm" "not installed" "Comes with Node.js — install Node first."; fi

# --- python3
if have python3; then
  PY_V="$(python3 -c 'import sys;print("%d.%d"%sys.version_info[:2])' 2>/dev/null)"
  PY_MAJOR="$(echo "$PY_V" | cut -d. -f1)"
  PY_MINOR="$(echo "$PY_V" | cut -d. -f2)"
  if [ "$PY_MAJOR" -eq 3 ] && [ "$PY_MINOR" -ge "$MIN_PY_MINOR" ] 2>/dev/null; then
    pass "Python" "$PY_V"
  else
    fail "Python" "$PY_V is too old (need 3.${MIN_PY_MINOR}+)" "brew install python@3.12"
  fi
else
  fail "Python" "not installed" "brew install python   # macOS   |   sudo apt install -y python3 python3-venv   # Linux"
fi

# ================================================================== 3. MEDIA
printf "\n${B}3. Media tools${N}\n"

if have ffmpeg; then
  pass "ffmpeg" "$(ffmpeg -version 2>/dev/null | head -1 | cut -d' ' -f1-3)"

  # Caption rendering path: libass/drawtext present = subtitle filters usable.
  FILT="$(ffmpeg -filters 2>/dev/null | grep -icE 'subtitles|drawtext' || true)"
  if [ "${FILT:-0}" -gt 0 ] 2>/dev/null; then
    pass "ffmpeg text filters" "drawtext/subtitles available"
  else
    warn "ffmpeg text filters" "no libass/drawtext in this build" \
      "Not a blocker. The pipeline renders captions as transparent PNGs and composites them with the overlay filter — deterministic and fully styleable. Only matters if you want burn-in .srt via ffmpeg directly."
  fi
else
  fail "ffmpeg" "not installed" "brew install ffmpeg   # macOS   |   sudo apt install -y ffmpeg   # Linux"
fi

if have ffprobe; then pass "ffprobe" "available"
else fail "ffprobe" "not installed" "Ships with ffmpeg — install ffmpeg."; fi

# ================================================================ 4. WHISPER
printf "\n${B}4. Transcription (captions)${N}\n"

if have whisper-cli; then
  pass "whisper-cli" "$(whisper-cli --version 2>&1 | grep -i 'version' | head -1)"
elif have whisper-cpp; then
  warn "whisper-cli" "found 'whisper-cpp' but not 'whisper-cli'" \
    "Newer whisper-cpp installs the binary as whisper-cli. Run: brew reinstall whisper-cpp"
else
  fail "whisper-cli" "not installed" "brew install whisper-cpp   # macOS   |   see rules/troubleshooting.md for Linux/Windows"
fi

if [ -f "$MODEL_FILE" ]; then
  SIZE="$(wc -c < "$MODEL_FILE" | tr -d ' ')"
  if [ "$SIZE" -ge "$MODEL_MIN_BYTES" ] 2>/dev/null; then
    pass "whisper model" "small.en ($((SIZE/1024/1024)) MB)"
  else
    fail "whisper model" "file is truncated ($((SIZE/1024/1024)) MB)" \
      "rm '$MODEL_FILE' && mkdir -p '$MODEL_DIR' && curl -L -o '$MODEL_FILE' '$MODEL_URL'"
  fi
else
  fail "whisper model" "not downloaded" \
    "mkdir -p '$MODEL_DIR' && curl -L -o '$MODEL_FILE' '$MODEL_URL'   # ~487 MB"
fi

# =================================================================== 5. REPO
printf "\n${B}5. Project${N}\n"

if [ -f "$REPO/package.json" ] && grep -q '"remotion"' "$REPO/package.json" 2>/dev/null; then
  pass "repo" "$REPO"

  if [ -d "$REPO/node_modules/remotion" ]; then
    RV="$(node -p "require('$REPO/node_modules/remotion/package.json').version" 2>/dev/null || echo '?')"
    pass "dependencies" "remotion $RV installed"
  else
    fail "dependencies" "node_modules missing" "cd '$REPO' && npm install"
  fi

  # Remotion needs a headless Chrome; it downloads its own.
  if [ -d "$REPO/node_modules/.remotion/chrome-headless-shell" ] || \
     [ -d "$HOME/Library/Caches/remotion" ] || [ -d "$HOME/.cache/remotion" ]; then
    pass "Remotion browser" "headless shell cached"
  else
    warn "Remotion browser" "not downloaded yet" \
      "cd '$REPO' && npx remotion browser ensure   # ~150 MB, one time"
  fi
else
  fail "repo" "no Remotion package.json at $REPO" \
    "git clone https://github.com/instincthub/remotion-create-video.git && cd remotion-create-video && npm install"
fi

# ================================================================ 6. OPTIONAL
printf "\n${B}6. Optional (nice to have)${N}\n"

if [ -f "$HOME/Library/Fonts/Montserrat-Bold.ttf" ] || \
   fc-list 2>/dev/null | grep -qi 'montserrat.*bold'; then
  pass "Montserrat Bold" "installed"
else
  warn "Montserrat Bold" "not installed" \
    "Default caption/badge font. Download from fonts.google.com/specimen/Montserrat and install Montserrat-Bold.ttf, or pick another font in your brand config."
fi

if have gh; then pass "GitHub CLI" "$(gh --version 2>/dev/null | head -1)"
else warn "GitHub CLI" "not installed" "Only needed to push/pull from GitHub via CLI: brew install gh"; fi

# --- disk space
AVAIL_GB="$(df -Pk "$REPO" 2>/dev/null | awk 'NR==2 {print int($4/1024/1024)}')"
if [ -n "${AVAIL_GB:-}" ] && [ "$AVAIL_GB" -ge "$MIN_DISK_GB" ] 2>/dev/null; then
  pass "disk space" "${AVAIL_GB} GB free"
else
  warn "disk space" "${AVAIL_GB:-?} GB free" \
    "Video work needs headroom — renders, footage and the whisper model add up. ${MIN_DISK_GB} GB+ recommended."
fi

# ================================================================= 7. SUMMARY
printf "\n${B}Result${N}  ${G}%d passed${N}  ${R}%d failed${N}  ${Y}%d warnings${N}\n" \
  "$PASS_COUNT" "$FAIL_COUNT" "$WARN_COUNT"

if [ -n "$FAILED" ]; then
  printf "\n${R}${B}Blocking — fix these before creating video:${N}\n"
  printf "%s" "$FAILED" | while IFS='|' read -r label fix; do
    [ -z "$label" ] && continue
    printf "\n  ${B}%s${N}\n    %s\n" "$label" "$fix"
  done
fi

if [ -n "$WARNED" ]; then
  printf "\n${Y}${B}Warnings — not blocking:${N}\n"
  printf "%s" "$WARNED" | while IFS='|' read -r label note; do
    [ -z "$label" ] && continue
    printf "\n  ${B}%s${N}\n    %s\n" "$label" "$note"
  done
fi

if [ "$FAIL_COUNT" -eq 0 ]; then
  printf "\n${G}${B}Ready.${N} Next: cd '%s' && npm run dev\n\n" "$REPO"
  exit 0
else
  printf "\n%d required item(s) still missing. Re-run this checklist after fixing.\n\n" "$FAIL_COUNT"
  exit 1
fi
