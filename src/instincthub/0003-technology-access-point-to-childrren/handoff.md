# Handoff — 0003 Technology Access Point to Children

An InstinctHub talk made into an engaging YouTube video: the real talking-head
footage with branded overlays (hook, instructor third, section roadmap, pull
quotes, closing CTA) and **real-footage b-roll cutaways** composited on top in
Remotion, timed to the transcript, plus a thumbnail and a full YouTube package.

Speaker: **Noah Olatoye, Founder, InstinctHub**. Brand: **InstinctHub** (Dark
Cyra `#00838F`, Montserrat/Nunito). Built with the engaging-video-from-footage
skill + the shared InstinctHub overlay system.

---

## What's here

```
src/instincthub/0003-technology-access-point-to-childrren/
├── 0003-…-childrren.mp4        # ORIGINAL source footage (3840×2160 @ 50fps, 483s)
├── 0003-…-childrren.srt        # transcript (source of every cue)
├── 0003-…-childrren_1.mp3      # supplied music bed
├── timing.ts                   # ⭐ SINGLE SOURCE OF TRUTH — content + all cues
├── index.tsx                   # composition: 1s thumbnail hold → Lesson + music bed
├── Thumbnail.tsx               # 16:9 YouTube thumbnail (also the 1s opening card)
├── youtube-package.md          # title / description / chapters / keywords
└── handoff.md                  # this file
```

The piece reuses the shared InstinctHub overlay system in
`src/instincthub/_shared/` (generic `Lesson` shell + Hook, InstructorLowerThird,
SectionReveal, SectionTracker, QuoteOverlay, StatCallout, Cutaway, ClosingCard,
LogoBug). **A new lesson is just a new `timing.ts` — no new components.**

### Composition IDs (Remotion Studio → folder `instincthub/0003-technology-access-points`)
- `ih-tap-technology-access-points` — the full video (1920×1080, 14520 frames = 484s)
- `ih-tap-thumbnail` — the 16:9 thumbnail (1 frame)

---

## Assets (in `public/`, all gitignored — large/derived)
| File | What | How it was made |
|------|------|-----------------|
| `ih-tech-access-points.mp4` | the talk footage | copy of the source mp4 |
| `ih-tech-access-points-music.mp3` | music bed | copy of the supplied mp3 |
| `ih-tap-portrait.jpg` | thumbnail portrait | `ffmpeg -ss 4` still from the footage |
| `broll/*.mp4` | 8 cutaway clips | trimmed 1080p from `/Volumes/Video Files/Raw Clips/Videos` (see below) |

B-roll clips used (trimmed to ~6s, cover-cropped to 1080p, muted):
`teens-phones-night, friends-laptop, kids-phone-addicted, kids-parents-toys,
internet-security, cyber-hoodie, kids-sports, kids-parents-laptop`.

---

## How to work on it

**Re-time / re-word anything** → edit `timing.ts` only. Cues are authored in
seconds via `sec()`; everything (footage, overlays, tracker, cutaways) follows.
Each section/quote/cutaway has an inline `// cue NN` comment tying it to the SRT.

**Preview in Studio**
```bash
npx remotion studio          # open ih-tap-technology-access-points
```

**Render stills to check a frame** (frames include the +30 thumbnail offset, so
a spoken beat at T seconds is frame `30 + T*30`):
```bash
npx remotion still build ih-tap-technology-access-points out/check.png --frame=3060
```

### ⚠️ Disk / bundling gotcha (important)
`public/` is ~6.9 GB (other projects' footage) and Remotion copies the whole
public dir into its bundle. The disk is near-full, so a normal bundle hits
`ENOSPC`. **Fix already in place:** a slim hardlinked dir `public-tap/` (~98 MB)
holds only this video's assets. Build the bundle once against it, then render
stills/video against that bundle:
```bash
# 1) bundle once against the slim dir (writes to ./build)
npx remotion bundle src/index.ts --public-dir=./public-tap
# 2) render against the prebuilt bundle (no re-copy of public)
npx remotion render build ih-tap-technology-access-points out/ih-tap-technology-access-points.mp4 --concurrency=4
```
If you add/replace a b-roll clip or asset, hardlink it into `public-tap/` (same
subpath) and re-bundle:
```bash
ln public/broll/NEWCLIP.mp4 public-tap/broll/NEWCLIP.mp4
```
To regenerate `public-tap/` from scratch, see the hardlink loop in git history /
the asset table above.

**Final render output:** `out/ih-tap-technology-access-points.mp4` (1920×1080,
~8m04s, H.264 + AAC; footage voice + low music bed mixed in).

---

## Music bed
`index.tsx` layers the supplied mp3 under the talk at `MUSIC_VOLUME = 0.06`
(set in `timing.ts`). Raise/lower it there, or delete the `<Audio>` in
`index.tsx` to drop music entirely.

## B-roll cutaway system (reusable)
`_shared/Cutaway.tsx` and `_shared/types.ts` were extended (backward-compatibly)
so a `CutawayContent` can carry an optional `videoSrc` (+ `videoFocus`). When
set, the cutaway plays that footage full-frame (cover-cropped, muted, Ken-Burns
push) behind cinematic scrims with the brand eyebrow + caption, instead of a
drawn illustration. Existing illustration cutaways (marketing-and-sales) are
unaffected.

---

## Editorial map (talk seconds → overlay)
| ~sec | Overlay |
|------|---------|
| 0–11 | Hook: "Technology is the #1 access point to your children" |
| 13 / 38 / 99 / 152 / 204 / 235 / 367 / 424 | b-roll cutaways |
| 24 | §1 What "access points" really are |
| 50–59 | Instructor lower-third (Noah Olatoye) |
| 70 / 271 | Pull quotes |
| 87 | §2 Don't just fight the screen |
| 123 | §3 Monitor — but don't smother |
| 181 | §4 A story I'll never forget |
| 307 | §5 The "explain it first" rule |
| 352 | §6 Walk the journey with them |
| 400→end | Closing CTA: Summer Coding Class (holds to end) |

The talk has **no built-in end card** — the closing CTA safely holds to the last
frame. If a future re-export adds an outro, set `closing.out` in `timing.ts` to
just before it.

---

## Deliverables for this task
1. **Video** — `out/ih-tap-technology-access-points.mp4`
2. **Thumbnail** — render `ih-tap-thumbnail` to PNG:
   `npx remotion still build ih-tap-thumbnail out/ih-tap-thumbnail.png`
3. **Description / keywords / chapters** — `youtube-package.md`

Before publishing: replace `[ADD YOUR LINK HERE]` in `youtube-package.md` with
the real Summer Coding Class registration URL.
