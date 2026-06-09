#!/usr/bin/env bash
#
# Render all 11 engaging lesson videos (overlays over the trimmed clips) to out/.
# Bundles ONCE (with a slim public dir of just this course's assets) and renders
# every lesson from that single bundle, so the ~280MB public dir is copied one
# time instead of once per lesson. Faster, and avoids ENOSPC under parallel builds.
#
# Run from the repo root:
#   bash src/theplatform/tosin-eniolorunda-it-is-not-about-ideas-its-about-making-ideas-happen/render-lessons.sh
set -euo pipefail

PUB="out/te-public"
BUNDLE="out/te-bundle"
mkdir -p out "$PUB"

# Stage only this course's assets into the slim public dir.
cp -f public/tp-te-*.mp4 "$PUB"/ 2>/dev/null || true
cp -f public/tp-te-tosin-portrait.jpg "$PUB"/ 2>/dev/null || true

# Bundle once (public dir copied a single time into the bundle).
echo "=== bundling once -> $BUNDLE ==="
npx remotion bundle --public-dir="$PUB" --out-dir="$BUNDLE" --log=error

ids=(
  "te-01-execution-at-scale:te-01"
  "te-02-ideas-are-free:te-02"
  "te-03-biggest-challenge-is-you:te-03"
  "te-04-goals-write-the-number:te-04"
  "te-05-structure-serves-goals:te-05"
  "te-06-hardest-constraint-people:te-06"
  "te-07-customer-obsession:te-07"
  "te-08-traits-craft-to-candor:te-08"
  "te-09-four-ms-motivation:te-09"
  "te-10-incentives-and-context:te-10"
  "te-11-systems-governance-diagnostic:te-11"
)

for pair in "${ids[@]}"; do
  id="${pair%%:*}"
  out="${pair##*:}"
  echo "=== rendering $id -> out/$out.mp4 ==="
  npx remotion render "$BUNDLE" "$id" "out/$out.mp4" --log=error
done

echo "ALL 11 LESSONS RENDERED"
