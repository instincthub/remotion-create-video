#!/usr/bin/env bash
#
# Cut the Kemi Adeosun keynote ("A Great Idea Is Not Enough", The Platform
# Nigeria) into the 12 InstinctHub course lesson clips. Each clip is
# self-contained and <= 420s (the 7-minute rule); the longest is ~256s.
# Input-seek (-ss before -i) re-bases every clip's timestamps to 0, so the
# overlay cues in each lesson's timing.ts (relative to the clip start) line up.
#
# EXCLUDED from every clip (not course teaching content):
#   0:00-2:38   MC bio + Kemi's housekeeping (thanks to Pastor Paul, "clap for
#               me", the friend's-daughter wedding, the 2017 callback).
#   33:49-end   trailing "Wow, keep the applause coming."
#
# L12 is the only MULTI-RANGE lesson: it concatenates the 91% reality-check with
# the no-capital teaching and DROPS the Nidacity self-promo (31:37-33:00).
#
# Run from the repo root:
#   bash src/theplatform/kemi-adeosun-it-is-not-about-ideas-its-about-making-ideas-happen/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

SRC="src/theplatform/kemi-adeosun-it-is-not-about-ideas-its-about-making-ideas-happen/kemi-adeosun-it-is-not-about-ideas-its-about-making-ideas-happen.mp4"
OUT="public"
TMP="public/_ka_tmp"
mkdir -p "$OUT" "$TMP"

# clip <outfile> <start_sec> <end_sec> : single continuous window, re-based to 0.
clip () {
  echo "-> $1  (${2}s -> ${3}s)"
  ffmpeg -y -ss "$2" -to "$3" -i "$SRC" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart \
    "$OUT/$1" -loglevel error
}

# clipcat <outfile> <a_start> <a_end> <b_start> <b_end> : two windows concatenated
# into one clean clip (drops the dead segment between them). Frame-accurate via
# re-encode of each part, then stream-copy concat.
clipcat () {
  local out="$1"; shift
  local a0="$1" a1="$2" b0="$3" b1="$4"
  echo "-> $out  (${a0}s -> ${a1}s) + (${b0}s -> ${b1}s)"
  ffmpeg -y -ss "$a0" -to "$a1" -i "$SRC" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -ar 48000 "$TMP/${out%.mp4}_a.mp4" -loglevel error
  ffmpeg -y -ss "$b0" -to "$b1" -i "$SRC" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -ar 48000 "$TMP/${out%.mp4}_b.mp4" -loglevel error
  printf "file '%s'\nfile '%s'\n" "${out%.mp4}_a.mp4" "${out%.mp4}_b.mp4" > "$TMP/${out%.mp4}.txt"
  ffmpeg -y -f concat -safe 0 -i "$TMP/${out%.mp4}.txt" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart \
    "$OUT/$out" -loglevel error
}

#       outfile                              start  end     source window
clip tp-ka-01-next-bounce.mp4                 158    300   # 2:38-5:00
clip tp-ka-02-nine-businesses.mp4             300    420   # 5:00-7:00
clip tp-ka-03-not-a-market-exemption.mp4      420    533   # 7:00-8:53
clip tp-ka-04-know-your-market.mp4            533    743   # 8:53-12:23
clip tp-ka-05-not-forced.mp4                  743    925   # 12:23-15:25
clip tp-ka-06-five-numbers.mp4                925   1050   # 15:25-17:30
clip tp-ka-07-research-skepticism.mp4        1050   1215   # 17:30-20:15
clip tp-ka-08-dont-compete-on-price.mp4      1215   1471   # 20:15-24:31
clip tp-ka-09-timing-incubate.mp4            1471   1592   # 24:31-26:32
clip tp-ka-10-build-your-team.mp4            1592   1756   # 26:32-29:16
clip tp-ka-11-discipline-outsource.mp4       1756   1864   # 29:16-31:04
# L12: keep 31:04-31:37 (reality check) + 33:00-33:49 (no-capital), drop promo.
clipcat tp-ka-12-no-capital-myth.mp4         1864   1897   1980   2029

rm -rf "$TMP"
echo "OK 12 clips written to $OUT/"
