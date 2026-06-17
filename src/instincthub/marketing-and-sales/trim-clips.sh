#!/bin/bash
# Professional edit: trim-and-concat the MIT OCW "Marketing and Sales" lecture
# into 15 self-contained InstinctHub lesson clips, each <= 420s.
#
# Cuts exclude: OCW bumper (0:00-0:21), host recap + speaker intro (0:21-3:23),
# audience polling / crowd work (3:23-8:40), inaudible audience guesses
# (33:31-34:07, 56:07-56:58), "we're out of time" housekeeping, and applause.
# Lessons 6, 8, 11, 13, 14, 15 splice multiple keep-ranges (internal dead spots
# and a later retrospective answer moved next to the story it concludes).
#
# Frame-accurate: input-seek (-ss before -i) + re-encode per range, then
# concat-demux ranges encoded with identical params.

set -euo pipefail

SRC="/Users/noaholatoye/Documents/code_projects/create-video/src/instincthub/marketing-and-sales/marketing-and-sales.mp4"
OUT="/Users/noaholatoye/Documents/code_projects/create-video/public"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

ENC=(-c:v libx264 -preset fast -crf 19 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart)

# cut <outfile> <start1> <end1> [<start2> <end2> ...]
cut() {
  local name="$1"; shift
  local parts=() i=0
  while [ "$#" -ge 2 ]; do
    local seg="$TMP/${name}-part$i.mp4"
    ffmpeg -hide_banner -loglevel error -y -ss "$1" -to "$2" -i "$SRC" "${ENC[@]}" "$seg"
    parts+=("$seg"); i=$((i+1)); shift 2
  done
  if [ "${#parts[@]}" -eq 1 ]; then
    mv "${parts[0]}" "$OUT/$name.mp4"
  else
    local list="$TMP/${name}.txt"; : > "$list"
    for p in "${parts[@]}"; do echo "file '$p'" >> "$list"; done
    ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i "$list" -c copy "$OUT/$name.mp4"
  fi
  local d
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$name.mp4")
  echo "$name.mp4  ${d%.*}s"
}

# M1: What Are You Really Selling?
cut ih-ms-01-the-only-non-negotiable     519.7  759.0   # 8:40 bio -> 12:39 "two descriptors"
cut ih-ms-02-unique-and-important        759.0  902.5   # 12:39 -> 15:02 "You will flounder."
cut ih-ms-03-regain-the-perfect-plan     902.5  1213.5  # 15:02 -> 20:13 "...let's launch, which we did."

# M2: When You Misidentify Your Customer
cut ih-ms-04-a-complete-disaster         1213.5 1379.5  # 20:13 disaster -> 22:59 "...buy it again."
cut ih-ms-05-no-money-wrong-channel      1379.5 1572.0  # 22:59 -> 26:12 slotting fees / couldn't afford
cut ih-ms-06-paying-for-the-mistake      1572.0 1696.5  3421.0 3451.5
                                                         # 26:12 -> 28:16 sadder-but-wiser, + 57:01-57:31 retrospective lesson
# M3: NiteBite, Getting It Right
cut ih-ms-07-find-the-emotional-problem  1696.5 1948.0  # 28:16 -> 32:28 focus groups / die-in-my-sleep
cut ih-ms-08-customers-shape-the-product 1948.0 2011.0  2047.0 2164.0
                                                         # cut 33:31-34:07 inaudible audience guesses
cut ih-ms-09-advertise-to-the-fear       2173.0 2546.5  # 36:13 ads -> 42:26 "...And they complied."

# M4: Winning the Channel
cut ih-ms-10-phone-orders-to-shelves     2547.0 2812.0  # 42:27 flowchart -> 46:52 customers payoff
cut ih-ms-11-educators-and-wholesalers   2818.0 3070.0  3774.0 3856.0
                                                         # 46:58 -> 51:10 "Off it went." + 1:02:54-1:04:16 wholesaler Q&A
cut ih-ms-12-the-planogram-meeting       3070.0 3365.0  # 51:10 -> 56:05 "...but I learned a lot."

# M5: Principles That Travel
cut ih-ms-13-selling-is-detective-work   3459.0 3502.5  3857.0 4064.0
                                                         # 57:39-58:22 what-motivates-them + 1:04:17-1:07:44 two bullets / margarine / Ford
cut ih-ms-14-segment-and-sell-benefits   3503.0 3769.0  4064.0 4124.0
                                                         # 58:23-1:02:49 pyramid / peace-of-mind + 1:07:44-1:08:44 benefits & competition
cut ih-ms-15-start-small-iterate-win     4135.0 4251.0  4264.0 4336.0
                                                         # MVP story + final summary, ends before applause
echo "All 15 lesson clips written to $OUT"
