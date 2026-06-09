#!/usr/bin/env bash
#
# Render all 14 engaging lesson videos (overlays over the trimmed clips) to out/.
# Uses the slim public dir (out/aw-public: just the 14 aw clips + portrait) so
# each render copies ~314MB instead of the full 1.1GB public/.
#
# Run from the repo root:
#   bash src/theplatform/affiong-williams-it-is-not-about-ideas/render-lessons.sh
set -euo pipefail

PUB="out/aw-public"
mkdir -p out

ids=(
  "aw-01-plant-trees:aw-01"
  "aw-02-mango-tree:aw-02"
  "aw-03-build-for-the-future:aw-03"
  "aw-04-deciding-to-plant:aw-04"
  "aw-05-fifty-year-horizon:aw-05"
  "aw-06-honest-odds-vision:aw-06"
  "aw-07-roots-go-deep:aw-07"
  "aw-08-waiting-not-idle:aw-08"
  "aw-09-the-canopy:aw-09"
  "aw-10-destiny-helpers:aw-10"
  "aw-11-engage-dont-retreat:aw-11"
  "aw-12-long-harvest:aw-12"
  "aw-13-shape-the-future:aw-13"
  "aw-14-the-charge:aw-14"
)

for pair in "${ids[@]}"; do
  id="${pair%%:*}"
  out="${pair##*:}"
  echo "=== rendering $id -> out/$out.mp4 ==="
  npx remotion render "$id" "out/$out.mp4" --public-dir="$PUB" --log=error
done

echo "ALL 14 LESSONS RENDERED"
