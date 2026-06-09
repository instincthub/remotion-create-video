#!/usr/bin/env bash
#
# Cut the Affiong Williams keynote ("Plant Trees You May Never Sit Under",
# The Platform Nigeria) into the 14 InstinctHub course lesson clips. Each clip
# is self-contained and <= 420s (the 7-minute rule); the longest is ~126s.
# Input-seek (-ss before -i) re-bases every clip's timestamps to 0, so the
# overlay cues in each lesson's timing.ts (relative to the clip start) line up.
#
# EXCLUDED from every clip (not course teaching content):
#   0:00-3:52  MC bio + applause, greeting/housekeeping, external hype-video
#              narration (music/laughter, footage we don't have).
#   24:00-end  closing prayer + final thanks (faith sign-off for the venue).
#
# Run from the repo root:
#   bash src/theplatform/affiong-williams-it-is-not-about-ideas/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

SRC="src/theplatform/affiong-williams-it-is-not-about-ideas/affiong-williams-it-is-not-about-ideas.mp4"
OUT="public"
mkdir -p "$OUT"

# clip <outfile> <start_sec> <end_sec>
clip () {
  echo "-> $1  (${2}s -> ${3}s)"
  ffmpeg -y -ss "$2" -to "$3" -i "$SRC" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart \
    "$OUT/$1" -loglevel error
}

#       outfile                              start  end     source window
clip tp-aw-01-plant-trees.mp4                 234    340   # 3:54-5:40
clip tp-aw-02-mango-tree.mp4                  340    453   # 5:40-7:33
clip tp-aw-03-build-for-the-future.mp4        453    521   # 7:33-8:41
clip tp-aw-04-deciding-to-plant.mp4           521    599   # 8:41-9:59
clip tp-aw-05-fifty-year-horizon.mp4          599    665   # 9:59-11:05
clip tp-aw-06-honest-odds-vision.mp4          665    791   # 11:05-13:11
clip tp-aw-07-roots-go-deep.mp4               791    858   # 13:11-14:18
clip tp-aw-08-waiting-not-idle.mp4            858    945   # 14:18-15:45
clip tp-aw-09-the-canopy.mp4                  948   1044   # 15:48-17:24
clip tp-aw-10-destiny-helpers.mp4            1044   1090   # 17:24-18:10
clip tp-aw-11-engage-dont-retreat.mp4        1096   1210   # 18:16-20:10
clip tp-aw-12-long-harvest.mp4               1211   1301   # 20:11-21:41
clip tp-aw-13-shape-the-future.mp4           1301   1394   # 21:41-23:14
clip tp-aw-14-the-charge.mp4                 1394   1439   # 23:14-23:59

echo "OK 14 clips written to $OUT/"
