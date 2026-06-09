---
name: engaging-video-from-footage
description: "Turn a talking-head video + its transcript into an engaging, on-brand piece by compositing animated overlays, illustrated cutaways, a tip tracker, and a thumbnail onto the real footage in Remotion — timed to what's said. Optionally (ON DEMAND only) cut a 9:16 teaser reel from the same footage with real audio. Use when the user supplies a video and transcript and wants it made engaging. ALWAYS confirm the brand/design system first."
---

# Engaging Video From Footage

Two segments. **Segment 1 (YouTube engagement overlay) runs whenever the user
asks to make a video engaging. Segment 2 (teaser reel) is ON DEMAND ONLY — do
not build a reel unless the user explicitly asks for one.**

This skill encodes a workflow already proven in this repo
(`src/kids-and-ai-chatbots/`). Read it fully before building, then compose with
the existing skills/commands rather than reinventing them:

- `remotion-best-practices` skill — invoke before writing any Remotion code.
- `/video` command — 16:9 landscape rules (canvas, safe zones).
- `/reel` command — 9:16 portrait rules.
- Brand skills (see gate below).

---

## 0. Inputs & the brand gate (MANDATORY — do this first)

The user provides three things. Two usually arrive; the third is often
implied and **must be confirmed**:

1. **The video file** (talking-head footage, any resolution/fps).
2. **The transcript** — an `.srt` (preferred; has cue timings) or plain text.
3. **The design system / brand.**

**Brand gate:** if the brand is not explicitly stated, STOP and ask which to
use. Never guess a palette. Known systems in this repo:

| Brand | Invoke | Accent | Type |
|-------|--------|--------|------|
| AI Playbook | `ai-playbook-brand` skill | Brand Teal `#1A7A6E` | Nunito / DM Sans / DM Mono |
| InstinctHub | `/instincthub-colors` command | Dark Cyra `#00838F` | Inter |
| Other | ask the user for the palette + fonts | — | — |

Use `AskUserQuestion` for the brand if unclear. Then invoke that brand skill and
take **all** colors/fonts/voice from it — no arbitrary hex values.

If the brand IS given, confirm it in one line and proceed.

---

## Segment 1 — YouTube engagement overlay (always)

Goal: keep the speaker on screen and burn a branded layer on top, timed to the
transcript, so the talk is more engaging and retains viewers.

### 1.1 Set up the footage
- Copy the video into `public/` with a clean, space-free filename
  (`public/<slug>.mp4`).
- Add that file to `.gitignore` (source footage is large — never commit it).
- `ffprobe` it for width/height/fps/duration.
- Composition: **1920×1080 @ 30fps**. `durationInFrames = round(duration * 30)`.
- Timing insight: SRT cue times are wall-clock seconds. Remotion composites by
  time, so mapping `sec → frame` at 30fps stays correct **regardless of the
  source fps** (e.g. a 50fps source is fine). `const sec = (s) => Math.round(s * 30)`.

### 1.2 Architecture
Put everything in `src/<topic>/<name>/`: `colors.ts`, `fonts.ts` (re-export the
brand's), `timing.ts` (all cue→frame mappings + content), one file per
overlay/scene, and `index.tsx`. Register in `Root.tsx`. Keep files small.

`index.tsx` layers bottom → top, all timed from `timing.ts`:

1. **Background** — `<OffthreadVideo src={staticFile(videoSrc)} />` (the real
   footage) + a gentle bottom scrim. Make `videoSrc` a prop with a default so
   the studio composites automatically; render a branded placeholder when empty.
2. **Hook lower-third** — the opening line. See legibility rule below.
3. **Per-point reveals** — one panel per teaching point, entering on its cue and
   receding after a hold.
4. **Tip tracker (the curiosity engine)** — a persistent rail of all N points.
   **Blur/lock the UPCOMING points, dim+check the DONE ones, keep only the
   ACTIVE one sharp.** Hiding what's next is what keeps people watching to the
   end. (Confirm with the user whether to also blur completed points or just
   upcoming — default: blur upcoming, check done.)
5. **Stat callouts** — big animated numbers for any statistics in the script.
6. **Full-frame illustrated cutaways ("B-roll")** — opaque brand-background
   takeovers that depict what's being said, placed in the GAPS between reveals
   (never over a reveal). Opaque + full-frame on purpose, **so the speaker never
   obstructs the illustration**. Build one reusable shell (bg + eyebrow +
   illustration slot + caption + fade) and a registry of distinct, prop-rich
   line-art illustrations keyed by name. One illustration family, many props.
7. **CTA lower-third** — closing call to action.
8. **Thumbnail** — see 1.4.

### 1.3 Legibility (critical)
Footage is often bright (white walls). **White text over footage MUST sit in a
frosted brand-dark box** (`background: ${brandDark}E6`, subtle teal border, soft
shadow) or behind a scrim. A drop shadow alone is not enough. The reveal/stat
panels already provide this; the hook and CTA need an explicit box.

### 1.4 Thumbnail (if a thumbnail is requested)
Hold a **1-second static** card at the very start so YouTube can auto-pick it.
Delay the entire talk (footage + every overlay) by `THUMBNAIL_FRAMES` using a
`<Sequence from={THUMBNAIL_FRAMES}>` so nothing is lost behind it — this keeps
every cue in `timing.ts` relative to the talk's own start (no per-overlay
offsets). Make the thumbnail static so any frame YouTube samples is identical.

### 1.5 Verify (always, before declaring done)
Render stills over the REAL footage with `npx remotion still <id> out/x.png
--frame=N` and inspect: hook, each reveal, every cutaway, the CTA, and the tail.

- **Watch the tail.** Talks often have their OWN built-in end card. Find where
  it starts (probe frames) and fade your CTA out BEFORE it so they don't collide.
- Check the speaker stays unobstructed and boxes are legible.

### 1.6 Deliver
Give the render command (`npx remotion render <id> out/<name>.mp4`). Warn that
downscaling 4K/50fps over ~18k frames is slow. Offer YouTube description +
keywords if asked (separate task).

---

## Segment 2 — Teaser reel (ON DEMAND ONLY)

**Skip this entirely unless the user explicitly asks for a reel/short.** Not
every video needs one.

Goal: a 30–60s **9:16** reel that drives traffic to the full video, built from
**real trimmed clips of the footage with their original audio**, punchlines on
top. (A silent animated reel is a fallback only if the user wants no footage.)

### 2.1 Build
- Canvas **1080×1920 @ 30fps**. Bottom 300px is subtitle-safe.
- Pick the punchiest soundbites from the SRT. **The overlay text must match the
  words he actually says in that clip** (read the cues, not the teleprompter —
  ad-libs differ).
- Each clip: `<OffthreadVideo trimBefore={sec*30} trimAfter={sec*30} .../>`
  (trim values are FRAMES = seconds×30, on the talk's timeline). `OffthreadVideo`
  carries audio on render.
- Center-crop 16:9 → 9:16: `style={{ width:'100%', height:'100%',
  objectFit:'cover', objectPosition:'50% 42%' }}` (bias toward the face).
- Cinematic top/bottom scrims + frosted lower-third caption boxes.
- Tease the tip list with the same curiosity mechanic (Tip 1 sharp, rest
  frosted/locked) to pull viewers to the full video.
- **Join clips with short cross-dissolves** (`TransitionSeries` + `fade`, ~9
  frames). Hard cuts cause a seek-flash / abrupt "gap"; a 0.3s dissolve reads as
  fluid. (Trade-off: ~0.3s of audio blends at each joint. If the user wants
  perfectly clean audio cuts, split visual dissolve from hard-cut audio.)
- Close on a **branded CTA end card** (no footage) — e.g. "Watch the full
  version on YouTube" + the channel handle/URL the user gives.

### 2.2 Trim precision
You cannot audition audio here, and noisy mic floors defeat `silencedetect`. So:
- Drop lead-in filler so a clip opens on the key word (e.g. start on "40%", not
  "shows that 40%").
- Extend the tail so the final word completes — land it in the natural pause
  before the next cue, not on the cue's listed end (SRT ends words a touch early).
- Keep each `Series`/sequence duration == `trimAfter − trimBefore`.
- Expose these as single-number frame knobs and tell the user the direction to
  nudge if a syllable clips. Re-render on request.

### 2.3 Verify
Render the mp4 and confirm with `ffprobe` that BOTH streams exist
(`codec_type=video` h264 + `codec_type=audio` aac) and duration is 30–60s.

---

## Definition of done
- [ ] Brand system confirmed (asked if unclear); all colors/fonts from it.
- [ ] Footage in `public/`, gitignored; composition sized & timed to it.
- [ ] Overlays mapped to transcript cues; curiosity mechanic on the tracker.
- [ ] White-on-footage text is boxed/scrimmed and legible.
- [ ] CTA clears the footage's own end card.
- [ ] Stills verified over real footage; type-check clean.
- [ ] Reel built ONLY if requested; if built, audio+video streams verified.
