# The Founder's Mindset — InstinctHub Course (Vusi Thembekwayo)

The Platform Nigeria keynote *"It's not about ideas; it's about making ideas
happen"* (Vusi Thembekwayo, May 2026), converted into an **InstinctHub course
video structure**: a 4-module, 11-lesson course where **every lesson video is
≤ 7 minutes (420s)** and self-contained — its own hook and recap.

Each lesson is the real footage with a branded overlay layer composited on top
(engaging-video-from-footage), using the reusable **The Platform** design system
at [`src/theplatform/_shared`](../_shared). A new lesson is just a new
`timing.ts` — no new components.

> Skills this was built with: `instincthub-video-production` (the 7-minute rule
> + splitting + `video_key` handoff), `engaging-video-from-footage` (the overlay
> workflow), `remotion-best-practices`. Brand: The Platform `_shared` system
> (sampled from theplatformnigeria.com).

## The course tree

Source: one 47:28 recording. Transcript covers **0:00–29:58**; lessons are cut
from the transcribed teaching content. The MC intro (0:00–2:10) and the closing
social/unity remarks (42:35–47:02) are **excluded** from the course (see below).

| Module | # | Lesson | Clip (source) | Len | Composition id |
|--------|---|--------|---------------|-----|----------------|
| **M1 · The Founder's Mindset** | 1 | Earn the right to be offended | 2:10–5:00 | 170s | `fm-01-earn-the-right` |
| | 2 | What successful founders knew | 5:00–9:30 | 270s | `fm-02-what-founders-knew` |
| | 3 | The Founder's Mindset | 9:30–11:54 | 144s | `fm-03-the-founders-mindset` |
| **M2 · The Opportunity** | 4 | Capital isn't the problem — you are | 11:58–16:28 | 270s | `fm-04-capital-isnt-the-problem` |
| | 5 | A trillion-dollar context | 16:28–21:30 | 302s | `fm-05-trillion-dollar-context` |
| | 6 | Play the game you're gifted | 21:30–24:36 | 186s | `fm-06-play-your-game` |
| **M3 · How Founders Scale** | 7 | The four things you need to scale | 24:36–26:33 | 117s | `fm-07-four-things-to-scale` |
| | 8 | Aligning incentives | 26:33–30:29 | 236s | `fm-08-aligning-incentives` |
| | 9 | The levels of entrepreneurship | 30:38–35:07 | 269s | `fm-09-levels-of-entrepreneurship` |
| **M4 · Becoming a Founder** | 10 | The valley where scale goes to die | 35:15–39:35 | 260s | `fm-10-valley-of-scale` |
| | 11 | How to be a founder (+ your DNA) | 39:35–42:35 | 180s | `fm-11-how-to-be-a-founder` |

All 11 are **≤ 420s** ✓. Modules 1–3 are clean 3-lesson assessment blocks; M4 is
a 2-lesson wrap. The canonical list (ids, durations, `videoSrc`, `videoKey`)
lives in [`registry.tsx`](./registry.tsx) and drives `Root.tsx`.

## Layout

```
founders-mindset-vusi/
├── README.md            ← you are here
├── trim-clips.sh        ← cuts the 11 ≤420s clips into public/
├── registry.tsx         ← 11 lessons → Remotion components + course metadata
├── 01-earn-the-right/timing.ts        … 11-how-to-be-a-founder/timing.ts
└── (each timing.ts = one TalkContent, all cues RELATIVE to its clip start)
```

## Produce → ship pipeline (per instincthub-video-production)

MCP clients can't accept binary uploads, so the route is: render → push to S3 →
hand the `video_key` to the course-creation agent.

1. **Cut the clips** (frame-accurate, re-based to 0):
   ```bash
   bash src/theplatform/founders-mindset-vusi/trim-clips.sh
   ```
   Writes `public/tp-fm-01-…mp4` … `tp-fm-11-…mp4` (gitignored).

2. **Render each engaging lesson** (overlays over the real clip):
   ```bash
   npx remotion render fm-01-earn-the-right out/fm-01.mp4 --log=error
   # … through fm-11-how-to-be-a-founder
   ```
   Verify a beat first with a still over the real clip:
   `npx remotion still fm-04-capital-isnt-the-problem out/check.png --frame=5100`

3. **Push each `out/fm-NN.mp4` to S3** by your normal route, using the stable,
   sortable key from `registry.tsx`:
   ```
   instincthub/uploads/founders-mindset-vusi/m1-l1-earn-the-right.mp4
   instincthub/uploads/founders-mindset-vusi/m1-l2-what-founders-knew.mp4
   …
   instincthub/uploads/founders-mindset-vusi/m4-l11-how-to-be-a-founder.mp4
   ```

4. **Hand the `video_key` to the course-creation agent.** Each lesson becomes a
   step with a `video` content block:
   ```json
   { "video_key": "instincthub/uploads/founders-mindset-vusi/m1-l1-earn-the-right.mp4" }
   ```
   Never pass a guessed key — a wrong key plays nothing.

5. **Confirm readiness before publishing.** After attachment the server runs
   MediaConvert + probes duration. Read (don't write) the step:
   - `get_step_details(step_id)` → `video_uploader.status` must be `SUCCESS`
     (not `PENDING`/`PROCESSING`/`FAILED`).
   - `step.duration` ≤ 420 — the hard check that the 7-minute rule held.

## What was excluded (follow-ups)

- **Untranscribed tail 29:58–47:28** (~17:30). The transcript Noah supplied
  covers the full talk, so this is *teaching content that still needs splitting*
  only where it's on-topic. The lessons above stop at 42:35.
- **42:35–47:02 — closing social/unity remarks** (South Africa, African unity,
  the church/platform). Off-topic for an entrepreneurship course; keep as an
  optional "Closing Remarks" asset, not a lesson.
- If you want these as lessons too, re-run the split on those ranges and add
  `timing.ts` files following the same pattern.

## Design notes (baked into `_shared`, keep them)

- **Ink anchors, yellow sparks.** Yellow highlights ONE thing per view (active
  tracker badge, a key figure, an underline). Never white text on yellow — text
  on yellow is Ink (the active badge already does this).
- **White-on-footage always sits in a frosted ink panel** (`${ink}F0`).
- **Clean progress rail, no blur.** Enrolled learners see the whole lesson
  roadmap (upcoming dimmed, done ✓, active sharp) — a paid LMS course, not a
  YouTube retention trick.
- Type is **Overpass** throughout (the brand face); the lightbulb is the motif.
- **Logo bug is OFF for this course** (`showLogo={false}` in `registry.tsx`): the
  venue stage screens already carry "the platform" branding in-frame, so the
  top-right bug would collide with it. For un-branded footage, leave it on
  (the `Talk` default) — a drawn lightbulb wordmark renders even with no logo asset.

## Verify

Studio preview composites automatically once `trim-clips.sh` has run (defaults
point at the `public/tp-fm-*.mp4` clips). Before the clips exist you can still
review the overlay layer over the branded placeholder:

```bash
npx remotion still fm-03-the-founders-mindset out/check.png --frame=3700 \
  --props='{"videoSrc":"","logoSrc":""}'
```
