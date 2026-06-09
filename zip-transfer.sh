#!/bin/bash
# Creates a transfer-ready zip of the project.
# Includes: all committed files + untracked non-ignored files.
# Excludes: .git, everything in .gitignore.

set -e

PROJECT="create-video"
OUTPUT="${PROJECT}-$(date +%Y%m%d).zip"

# Remove any previous archive
rm -f "$OUTPUT"

# 1. Archive all committed (tracked) files
git archive --format=zip HEAD -o "$OUTPUT"

# 2. Add untracked files that are NOT ignored (e.g. new files not yet committed)
UNTRACKED=$(git ls-files --others --exclude-standard)
if [ -n "$UNTRACKED" ]; then
  echo "$UNTRACKED" | zip "$OUTPUT" -@
fi

echo "Created: $OUTPUT ($(du -sh "$OUTPUT" | cut -f1))"
