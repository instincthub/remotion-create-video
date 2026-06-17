#!/bin/bash
# Creates a transfer-ready zip of the project.
# Includes: all committed files + untracked non-ignored files.
# Excludes: .git, everything in .gitignore, and the zip itself.

# Always run from the project root, even when double-clicked in Finder
cd "$(dirname "$0")"

PROJECT="create-video"
OUTPUT="${PROJECT}-$(date +%Y%m%d).zip"

# Remove any previous archive
rm -f "$OUTPUT"

# Capture untracked non-ignored files BEFORE creating the zip
# so the zip itself is never added to its own input list
UNTRACKED=$(git ls-files --others --exclude-standard | grep -v "\.zip$")

# 1. Archive all committed (tracked) files
git archive --format=zip HEAD -o "$OUTPUT"

# 2. Append untracked non-ignored files (e.g. new files not yet committed)
if [ -n "$UNTRACKED" ]; then
  echo "$UNTRACKED" | zip "$OUTPUT" -@ || true
fi

echo ""
echo "Done: $(pwd)/$OUTPUT"
echo "Size: $(du -sh "$OUTPUT" | cut -f1)"
echo ""
read -rp "Press Enter to close..."
