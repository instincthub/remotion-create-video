#!/usr/bin/env bash
#
# Render all 13 engaging lesson videos (overlays over the trimmed clips) to out/.
# Uses a slim public dir (out/tl-public: just the 13 tl clips + portrait) so each
# render copies a small dir instead of the full public/.
#
# Run from the repo root (after trim-clips.sh):
#   bash src/theplatform/timilola-adetu-second-half-advantage/render-lessons.sh
set -euo pipefail

PUB="out/tl-public"
mkdir -p "$PUB" out
cp -f public/tp-tl-*.mp4 "$PUB"/ 2>/dev/null || true
cp -f public/tp-tl-timilola-portrait.jpg "$PUB"/ 2>/dev/null || true

ids=(
  "tl-01-eighteen-month-question:tl-01"
  "tl-02-what-tipped-the-decision:tl-02"
  "tl-03-your-reflections:tl-03"
  "tl-04-mindset-decides-response:tl-04"
  "tl-05-growth-vs-fixed:tl-05"
  "tl-06-vi-to-onikan:tl-06"
  "tl-07-corporate-discipline:tl-07"
  "tl-08-targets-revelation:tl-08"
  "tl-09-let-others-in:tl-09"
  "tl-10-jobs-and-succession:tl-10"
  "tl-11-not-about-age:tl-11"
  "tl-12-dont-be-pigeonholed:tl-12"
  "tl-13-passion-pace-empower:tl-13"
)

for pair in "${ids[@]}"; do
  id="${pair%%:*}"
  out="${pair##*:}"
  echo "=== rendering $id -> out/$out.mp4 ==="
  npx remotion render "$id" "out/$out.mp4" --public-dir="$PUB" --log=error
done

echo "ALL 13 LESSONS RENDERED"
