#!/usr/bin/env bash
#
# Cut the Timilola Adetu keynote ("The Second Half Advantage", The Platform
# Nigeria) into the 13 InstinctHub course lesson clips. Each clip is
# self-contained and well under 420s (the 7-minute rule); the longest is ~149s.
# Input-seek (-ss before -i) re-bases every clip's timestamps to 0, so the
# overlay cues in each lesson's timing.ts (relative to the clip start) line up.
#
# Source true duration: 26:58 (1618.45s), 1920x1080, 23.976fps, AAC stereo.
#
# EXCLUDED from every clip (not course teaching content):
#   0:00-5:23   MC bio readout (SKLD history, awards, family) + applause.
#   5:32-6:49   greeting, hearing-aid housekeeping, thanks to TCN leadership,
#               cross-references to earlier speakers ("from my profile").
#   internal    applause / laughter / cheering stings, the "is he here?" aside
#               about Mr. Oshimi, and the repeated "I walked the wrong way"
#               after the cheer (cut + concat).
#   26:53-end   closing applause.
#
# Lessons with multiple keep-ranges (internal dead-spots removed) are cut into
# segments then concatenated (re-encode each segment to identical params, then
# stream-copy concat) for a clean, frame-accurate join.
#
# Run from the repo root:
#   bash src/theplatform/timilola-adetu-second-half-advantage/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

DIR="src/theplatform/unlocking-the-second-half-advantagetransition-impact-and-legacy"
SRC="$DIR/unlocking-the-second-half-advantagetransition-impact-and-legacy.mp4"
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

#       outfile                                  ranges (sec)
clip    tp-tl-01-eighteen-month-question.mp4      409 547           # 6:49-9:07
clip    tp-tl-02-what-tipped-the-decision.mp4     550 665           # 9:10-11:05
clip    tp-tl-03-your-reflections.mp4             665 766           # 11:05-12:46
clip    tp-tl-04-mindset-decides-response.mp4     766 844           # 12:46-14:04
clip    tp-tl-05-growth-vs-fixed.mp4              844 938           # 14:04-15:38
clip    tp-tl-06-vi-to-onikan.mp4                 938 1030          # 15:38-17:10
clip    tp-tl-07-corporate-discipline.mp4         1030 1092         # 17:10-18:12
clip    tp-tl-08-targets-revelation.mp4           1092 1136         # 18:12-18:56
clip    tp-tl-09-let-others-in.mp4                1144 1206         # 19:04-20:06
clip    tp-tl-10-jobs-and-succession.mp4          1211 1254         # 20:11-20:54
clipcat tp-tl-11-not-about-age.mp4                1273 1314 1321 1350 # 21:13-21:54 | 22:01-22:30
clip    tp-tl-12-dont-be-pigeonholed.mp4          1350 1499         # 22:30-24:59
clip    tp-tl-13-passion-pace-empower.mp4         1501 1612         # 25:01-26:52

# Portrait still candidates for the course thumbnail (clean speaking frames).
for t in 600 720 980 1180; do
  echo "-> tp-tl-portrait-cand-$t.jpg  (frame @ ${t}s)"
  ffmpeg -y -ss "$t" -i "$SRC" -frames:v 1 -q:v 2 "$OUT/tp-tl-portrait-cand-$t.jpg" -loglevel error
done

echo "OK 13 clips + 4 portrait candidates written to $OUT/"
