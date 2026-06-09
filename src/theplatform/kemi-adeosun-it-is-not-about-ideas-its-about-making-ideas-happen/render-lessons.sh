#!/usr/bin/env bash
#
# Render all 12 engaging lesson videos (overlays over the trimmed clips) into the
# out/ka-public/ subfolder. INPUT clips come from an ISOLATED slim public dir
# outside the repo (/tmp/ka-render-public: the 12 ka clips + portrait) so renders
# are not disturbed by other agents rebuilding ./build or cleaning ./out. Each
# render bundles to its own temp dir from that public dir. Idempotent: a lesson
# whose output already exists in out/ka-public/ is skipped, so a killed run
# resumes cleanly.
#
# Run from the repo root:
#   bash src/theplatform/kemi-adeosun-it-is-not-about-ideas-its-about-making-ideas-happen/render-lessons.sh
set -euo pipefail

KAPUB="/tmp/ka-render-public"
OUTDIR="out/ka-public"
mkdir -p "$OUTDIR"

# (Re)populate the isolated public dir from the canonical clips if needed.
if [ ! -f "$KAPUB/tp-ka-01-next-bounce.mp4" ]; then
  echo "=== seeding $KAPUB ==="
  mkdir -p "$KAPUB"
  cp public/tp-ka-*.mp4 "$KAPUB"/
  cp public/tp-ka-kemi-portrait.jpg "$KAPUB"/
fi

ids=(
  "ka-01-next-bounce:ka-01"
  "ka-02-nine-businesses:ka-02"
  "ka-03-not-a-market-exemption:ka-03"
  "ka-04-know-your-market:ka-04"
  "ka-05-not-forced:ka-05"
  "ka-06-five-numbers:ka-06"
  "ka-07-research-skepticism:ka-07"
  "ka-08-dont-compete-on-price:ka-08"
  "ka-09-timing-incubate:ka-09"
  "ka-10-build-your-team:ka-10"
  "ka-11-discipline-outsource:ka-11"
  "ka-12-no-capital-myth:ka-12"
)

for pair in "${ids[@]}"; do
  id="${pair%%:*}"
  out="${pair##*:}"
  dest="$OUTDIR/$out.mp4"
  if [ -f "$dest" ]; then
    echo "=== skip $id (already rendered: $dest) ==="
    continue
  fi
  echo "=== rendering $id -> $dest ==="
  npx remotion render "$id" "$dest" --public-dir="$KAPUB" --log=error
done

echo "ALL 12 LESSONS RENDERED -> $OUTDIR/"
