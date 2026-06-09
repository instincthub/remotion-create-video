#!/usr/bin/env bash
#
# Render all 13 engaging lesson videos (overlays over the trimmed clips) to out/.
# Uses a slim public dir (out/ja-public: just the 13 ja clips + portrait) so each
# render copies a fraction of the full 3.9GB public/.
#
# Run from the repo root:
#   bash src/theplatform/john-alamu-it-is-not-about-ideas-its-about-making-ideas-happen/render-lessons.sh
set -euo pipefail

PUB="out/ja-public"
mkdir -p out "$PUB"
cp -f public/tp-ja-*.mp4 "$PUB"/
cp -f public/tp-ja-john-portrait.jpg "$PUB"/

ids=(
  "ja-01-starting-point:ja-01"
  "ja-02-start-with-what-you-have:ja-02"
  "ja-03-resilience-beats-ideas:ja-03"
  "ja-04-destiny-helpers:ja-04"
  "ja-05-ideas-are-living:ja-05"
  "ja-06-audacity-factory:ja-06"
  "ja-07-founder-not-ceo:ja-07"
  "ja-08-founders-instinct:ja-08"
  "ja-09-no-work-life-balance:ja-09"
  "ja-10-staff-will-humble-you:ja-10"
  "ja-11-protect-your-idea:ja-11"
  "ja-12-learn-from-asia:ja-12"
  "ja-13-test-and-put-god-first:ja-13"
)

for pair in "${ids[@]}"; do
  id="${pair%%:*}"
  out="${pair##*:}"
  echo "=== rendering $id -> out/$out.mp4 ==="
  npx remotion render "$id" "out/$out.mp4" --public-dir="$PUB" --log=error
done

echo "ALL 13 LESSONS RENDERED"
