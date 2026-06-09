#!/usr/bin/env bash
#
# Render all 13 engaging lesson videos (overlays over the trimmed clips) to out/.
# Uses a slim public dir (out/me-public: just the 13 me clips + portrait) so each
# render copies a small dir instead of the full public/.
#
# Run from the repo root (after trim-clips.sh):
#   bash src/theplatform/prof-modupe-elebute-odunsi-unlocking-the-second-half-advantagetransition-impact-and-legacy/render-lessons.sh
set -euo pipefail

PUB="out/me-public"
mkdir -p "$PUB" out
cp -f public/tp-me-*.mp4 "$PUB"/ 2>/dev/null || true
cp -f public/tp-me-modupe-portrait.jpg "$PUB"/ 2>/dev/null || true

ids=(
  "me-01-the-question:me-01"
  "me-02-calling-born-early:me-02"
  "me-03-work-hard-be-bold:me-03"
  "me-04-success-as-destination:me-04"
  "me-05-success-by-comparison:me-05"
  "me-06-turning-point-at-fifty:me-06"
  "me-07-leaving-security:me-07"
  "me-08-god-orders-your-steps:me-08"
  "me-09-going-home:me-09"
  "me-10-one-building-one-team:me-10"
  "me-11-the-human-cost:me-11"
  "me-12-stepping-stones-legacy:me-12"
  "me-13-lifting-others-the-charge:me-13"
)

for pair in "${ids[@]}"; do
  id="${pair%%:*}"
  out="${pair##*:}"
  echo "=== rendering $id -> out/$out.mp4 ==="
  npx remotion render "$id" "out/$out.mp4" --public-dir="$PUB" --log=error
done

echo "ALL 13 LESSONS RENDERED"
