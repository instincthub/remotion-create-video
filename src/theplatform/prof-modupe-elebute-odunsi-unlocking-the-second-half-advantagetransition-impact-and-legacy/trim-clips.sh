#!/usr/bin/env bash
#
# Cut the Prof. Modupe Elebute-Odunsi keynote ("Unlocking the Second Half
# Advantage: Transition, Impact and Legacy", The Platform Nigeria) into the 13
# InstinctHub course lesson clips. Each clip is self-contained and <= 420s (the
# 7-minute rule); the longest is ~153s. Input-seek (-ss before -i) re-bases
# every clip's timestamps to 0, so the overlay cues in each lesson's timing.ts
# (relative to the clip start) line up.
#
# Source true duration: 24:41.29 (1481.3s), 1920x1080, 23.976fps.
#
# EXCLUDED from every clip (not course teaching content):
#   0:00-4:18   MC bio intro + applause; greeting/housekeeping ("do I have my
#               first slide"); the "40 over 40" age chit-chat; the framing aside
#               "resounding similarity in all the speakers this morning".
#   internal    applause stings, "thank you / thank you" acknowledgements, and
#               the "my time is up, one more minute" housekeeping (cut + concat).
#   24:37-end   closing applause.
#
# Lessons with multiple keep-ranges (internal dead-spots removed) are cut into
# segments then concatenated (re-encode each segment to identical params, then
# stream-copy concat) for a clean, frame-accurate join.
#
# Run from the repo root:
#   bash src/theplatform/prof-modupe-elebute-odunsi-unlocking-the-second-half-advantagetransition-impact-and-legacy/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

DIR="src/theplatform/prof-modupe-elebute-odunsi-unlocking-the-second-half-advantagetransition-impact-and-legacy"
SRC="$DIR/prof-modupe-elebute-odunsi-unlocking-the-second-half-advantagetransition-impact-and-legacy.mp4"
OUT="public"
TMP="$(mktemp -d)"
mkdir -p "$OUT"
trap 'rm -rf "$TMP"' EXIT

VENC=(-c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart)

# single-range clip: clip <outfile> <start_sec> <end_sec>
clip () {
  echo "-> $1  (${2}s -> ${3}s)"
  ffmpeg -y -ss "$2" -to "$3" -i "$SRC" "${VENC[@]}" "$OUT/$1" -loglevel error
}

# multi-range clip: clipcat <outfile> <s1> <e1> <s2> <e2> [<s3> <e3> ...]
clipcat () {
  local out="$1"; shift
  echo "-> $out  (concat of $(($#/2)) segments)"
  local list="$TMP/${out%.mp4}.txt"; : > "$list"
  local i=0
  while [ "$#" -gt 0 ]; do
    local s="$1" e="$2"; shift 2
    local seg="$TMP/${out%.mp4}-$i.mp4"
    ffmpeg -y -ss "$s" -to "$e" -i "$SRC" "${VENC[@]}" "$seg" -loglevel error
    echo "file '$seg'" >> "$list"
    i=$((i+1))
  done
  ffmpeg -y -f concat -safe 0 -i "$list" -c copy -movflags +faststart "$OUT/$out" -loglevel error
}

#       outfile                              ranges (sec)
clip    tp-me-01-the-question.mp4             258 311          # 4:18-5:11
clip    tp-me-02-calling-born-early.mp4       311 409          # 5:11-6:49
clipcat tp-me-03-work-hard-be-bold.mp4        409 456 461 567  # 6:49-7:36 | 7:41-9:27
clip    tp-me-04-success-as-destination.mp4   567 662          # 9:27-11:02
clip    tp-me-05-success-by-comparison.mp4    664 755          # 11:04-12:35
clip    tp-me-06-turning-point-at-fifty.mp4   757 844          # 12:37-14:04
clip    tp-me-07-leaving-security.mp4          846 921          # 14:06-15:21
clip    tp-me-08-god-orders-your-steps.mp4    923 988          # 15:23-16:28
clipcat tp-me-09-going-home.mp4               988 1018 1023 1106 # 16:28-16:58 | 17:03-18:26
clip    tp-me-10-one-building-one-team.mp4    1115 1217        # 18:35-20:17
clip    tp-me-11-the-human-cost.mp4           1217 1305        # 20:17-21:45
clipcat tp-me-12-stepping-stones-legacy.mp4   1305 1361 1366 1379 # 21:45-22:41 | 22:46-22:59
clip    tp-me-13-lifting-others-the-charge.mp4 1385 1477       # 23:05-24:37

# Portrait still for the course thumbnail (a clean speaking frame ~13:00).
echo "-> tp-me-modupe-portrait.jpg  (frame @ 783s)"
ffmpeg -y -ss 783 -i "$SRC" -frames:v 1 -q:v 2 "$OUT/tp-me-modupe-portrait.jpg" -loglevel error

echo "OK 13 clips + portrait written to $OUT/"
