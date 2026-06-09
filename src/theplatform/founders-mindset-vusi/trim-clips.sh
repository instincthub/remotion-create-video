#!/usr/bin/env bash
#
# Cut the Vusi Thembekwayo keynote into the 11 InstinctHub course lesson clips.
# Each clip is self-contained and ≤ 420s (the 7-minute rule). Input-seek (-ss
# before -i) re-bases every clip's timestamps to 0, so the overlay cues in each
# lesson's timing.ts (which are relative to the clip start) line up exactly.
#
# Run from the repo root:  bash src/theplatform/founders-mindset-vusi/trim-clips.sh
# Output clips land in public/ (gitignored) ready for Remotion to composite.
set -euo pipefail

SRC="src/theplatform/vusi-thembekwayo-it-is-not-about-ideas-its-about-making-ideas-happen-may-1st-2026/VUSI THEMBEKWAYO _ IT IS NOT ABOUT IDEAS; IT'S ABOUT MAKING IDEAS HAPPEN _ MAY 1ST 2026.mp4"
OUT="public"
mkdir -p "$OUT"

# clip <outfile> <start_sec> <end_sec>
clip () {
  echo "→ $1  (${2}s → ${3}s)"
  ffmpeg -y -ss "$2" -to "$3" -i "$SRC" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart \
    "$OUT/$1" -loglevel error
}

#       outfile                              start  end
clip tp-fm-01-earn-the-right.mp4              130    300   # 2:10–5:00
clip tp-fm-02-what-founders-knew.mp4          300    570   # 5:00–9:30
clip tp-fm-03-the-founders-mindset.mp4        570    714   # 9:30–11:54
clip tp-fm-04-capital-isnt-the-problem.mp4    718    988   # 11:58–16:28
clip tp-fm-05-trillion-dollar-context.mp4     988   1290   # 16:28–21:30
clip tp-fm-06-play-your-game.mp4             1290   1476   # 21:30–24:36
clip tp-fm-07-four-things-to-scale.mp4       1476   1593   # 24:36–26:33
clip tp-fm-08-aligning-incentives.mp4        1593   1829   # 26:33–30:29
clip tp-fm-09-levels-of-entrepreneurship.mp4 1838   2107   # 30:38–35:07
clip tp-fm-10-valley-of-scale.mp4            2115   2375   # 35:15–39:35
clip tp-fm-11-how-to-be-a-founder.mp4        2375   2555   # 39:35–42:35

echo "✓ 11 clips written to $OUT/"
