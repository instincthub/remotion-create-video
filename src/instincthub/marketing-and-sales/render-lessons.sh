#!/bin/bash
# Render all 15 marketing-and-sales lesson composites + the course thumbnail.
#
# Renders from a prebuilt bundle (`npx remotion bundle` → ./build) so the
# 6GB public dir is copied once, not per lesson. Each render retries up to
# 3x because Google Fonts fetches occasionally drop (ERR_SOCKET_NOT_CONNECTED).
set -euo pipefail
cd /Users/noaholatoye/Documents/code_projects/create-video

SERVE=build
if [ ! -d "$SERVE" ]; then
  echo "=== bundling once"
  npx remotion bundle
fi

LESSONS=(
  ih-ms-01-the-only-non-negotiable
  ih-ms-02-unique-and-important
  ih-ms-03-regain-the-perfect-plan
  ih-ms-04-a-complete-disaster
  ih-ms-05-no-money-wrong-channel
  ih-ms-06-paying-for-the-mistake
  ih-ms-07-find-the-emotional-problem
  ih-ms-08-customers-shape-the-product
  ih-ms-09-advertise-to-the-fear
  ih-ms-10-phone-orders-to-shelves
  ih-ms-11-educators-and-wholesalers
  ih-ms-12-the-planogram-meeting
  ih-ms-13-selling-is-detective-work
  ih-ms-14-segment-and-sell-benefits
  ih-ms-15-start-small-iterate-win
)

for id in "${LESSONS[@]}"; do
  echo "=== rendering $id"
  ok=0
  for attempt in 1 2 3; do
    if npx remotion render "$SERVE" "$id" "out/$id.mp4" --log=error; then
      ok=1
      break
    fi
    echo "=== attempt $attempt for $id failed; retrying in 10s"
    sleep 10
  done
  if [ "$ok" -ne 1 ]; then
    echo "FAILED: $id after 3 attempts"
    exit 1
  fi
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "out/$id.mp4")
  echo "=== done $id  ${d%.*}s"
done

npx remotion still "$SERVE" ih-ms-thumbnail out/ih-ms-thumbnail.png --log=error
echo "ALL RENDERS COMPLETE"
