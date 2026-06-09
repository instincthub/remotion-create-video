#!/usr/bin/env bash
#
# Cut the John Alamu keynote ("It Is Not About Ideas, It's About Making Ideas
# Happen", The Platform Nigeria) into the 13 InstinctHub course lesson clips.
# Each clip is self-contained and <= 420s (the 7-minute rule); the longest is
# ~225s. Input-seek (-ss before -i) re-bases every clip's timestamps to 0, so
# the overlay cues in each lesson's timing.ts (relative to the clip start) line
# up frame-accurately.
#
# EXCLUDED from every clip (not course teaching content):
#   0:00-2:54   MC bio + applause, greeting the pastor, "camera-shy / you don't
#               blow" warm-up and blessing + applause (housekeeping/pleasantries).
#   10:22-10:52 financial-services-group aside ("asset management, investment
#               bank, tech... I won't talk tech") - navigation between segments;
#               lands on the M1->M2 boundary so it drops out cleanly.
#   30:36-end   "I don't want to be a talkative / thank you very much" + applause.
#
# Run from the repo root:
#   bash src/theplatform/john-alamu-it-is-not-about-ideas-its-about-making-ideas-happen/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

SRC="src/theplatform/john-alamu-it-is-not-about-ideas-its-about-making-ideas-happen/john-alamu-it-is-not-about-ideas-its-about-making-ideas-happen.mp4"
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

#       outfile                                  start  end     source window
clip tp-ja-01-starting-point.mp4                  174    396   # 2:54-6:36
clip tp-ja-02-start-with-what-you-have.mp4        396    478   # 6:36-7:58
clip tp-ja-03-resilience-beats-ideas.mp4          478    622   # 7:58-10:22
clip tp-ja-04-destiny-helpers.mp4                 652    747   # 10:52-12:27
clip tp-ja-05-ideas-are-living.mp4                747    851   # 12:27-14:11
clip tp-ja-06-audacity-factory.mp4                851   1055   # 14:11-17:35
clip tp-ja-07-founder-not-ceo.mp4                1055   1187   # 17:35-19:47
clip tp-ja-08-founders-instinct.mp4              1187   1267   # 19:47-21:07
clip tp-ja-09-no-work-life-balance.mp4           1267   1351   # 21:07-22:31
clip tp-ja-10-staff-will-humble-you.mp4          1351   1576   # 22:31-26:16
clip tp-ja-11-protect-your-idea.mp4              1576   1626   # 26:16-27:06
clip tp-ja-12-learn-from-asia.mp4                1626   1722   # 27:06-28:42
clip tp-ja-13-test-and-put-god-first.mp4         1722   1836   # 28:42-30:36

echo "OK 13 clips written to $OUT/"
