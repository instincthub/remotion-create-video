#!/usr/bin/env bash
#
# Cut the Tosin Eniolorunda keynote ("Ideas Are Free, Execution Is Everything",
# The Platform Nigeria) into the 11 InstinctHub course lesson clips. Each clip is
# self-contained and <= 420s (the 7-minute rule); the longest is ~265s.
# Input-seek (-ss before -i) re-bases every clip's timestamps to 0, so the overlay
# cues in each lesson's timing.ts (relative to the clip start) line up.
#
# EXCLUDED from every clip (not course teaching content):
#   0:00-1:22   MC bio + applause/cheering
#   1:22-3:04   thanks to Pastor / Covenant Christian Center anecdote (housekeeping)
#   3:04-5:42   Lagos/Ibadan bus chit-chat + personal bio + "where are my slides"
#   6:12-6:18   "where are my slides / all right be beautiful" false start (cut in L1)
#   18:04-22:10 Nigeria human-capital tangent (education/IQ, social media, role-model,
#               "American mindset") — off-thesis, sensitive; excluded by request policy
#   28:53-28:56 audience recap Q&A filler
#   35:12-end   closing thanks + applause/walk-off tail
#
# Run from the repo root:
#   bash src/theplatform/tosin-eniolorunda-it-is-not-about-ideas-its-about-making-ideas-happen/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

DIR="src/theplatform/tosin-eniolorunda-it-is-not-about-ideas-its-about-making-ideas-happen"
SRC="$DIR/tosin-eniolorunda-it-is-not-about-ideas-its-about-making-ideas-happen.mp4"
OUT="public"
TMP="$OUT/.te-tmp"
mkdir -p "$OUT" "$TMP"

ENC=(-c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart)

# clip <outfile> <start_sec> <end_sec>   — single keep-range
clip () {
  echo "-> $1  (${2}s -> ${3}s)"
  ffmpeg -y -ss "$2" -to "$3" -i "$SRC" "${ENC[@]}" "$OUT/$1" -loglevel error
}

# clip2 <outfile> <a_start> <a_end> <b_start> <b_end>  — two ranges, concatenated
clip2 () {
  echo "-> $1  (${2}s -> ${3}s) + (${4}s -> ${5}s)"
  ffmpeg -y -ss "$2" -to "$3" -i "$SRC" "${ENC[@]}" "$TMP/a.mp4" -loglevel error
  ffmpeg -y -ss "$4" -to "$5" -i "$SRC" "${ENC[@]}" "$TMP/b.mp4" -loglevel error
  printf "file '%s'\n" "$PWD/$TMP/a.mp4" "$PWD/$TMP/b.mp4" > "$TMP/list.txt"
  ffmpeg -y -f concat -safe 0 -i "$TMP/list.txt" -c copy "$OUT/$1" -loglevel error
}

#     outfile                                     start  end       source window
clip2 tp-te-01-execution-at-scale.mp4         342  372  375  470  # 5:42-6:12 + 6:15-7:50
clip  tp-te-02-ideas-are-free.mp4             470  515             # 7:50-8:35
clip  tp-te-03-biggest-challenge-is-you.mp4   515  588             # 8:35-9:48
clip  tp-te-04-goals-write-the-number.mp4     588  778             # 9:48-12:58
clip  tp-te-05-structure-serves-goals.mp4     778  968             # 12:58-16:08
clip  tp-te-06-hardest-constraint-people.mp4  968 1084             # 16:08-18:04
clip  tp-te-07-customer-obsession.mp4        1334 1599             # 22:14-26:39
clip  tp-te-08-traits-craft-to-candor.mp4    1602 1733             # 26:42-28:53
clip  tp-te-09-four-ms-motivation.mp4        1736 1927             # 28:56-32:07
clip  tp-te-10-incentives-and-context.mp4    1927 1997             # 32:07-33:17
clip  tp-te-11-systems-governance-diagnostic.mp4 1997 2112         # 33:17-35:12

rm -rf "$TMP"
echo "OK 11 clips written to $OUT/"
