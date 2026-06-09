---
name: dcsl-lesson-video
description: "Turn a DCSL talking-head course lesson (a 16:9 video + its .srt transcript) into an engaging, on-brand Remotion piece — branded overlays, an instructor lower-third, a clean section progress-rail, pull-quote and stat callouts, and full-frame governance illustrations — all timed to what's said. Use for any DCSL Corporate Services Limited training/course lesson video. Builds on the reusable component library at src/dcsl/_shared. Composes with engaging-video-from-footage, dcsl-brand, and remotion-best-practices."
---

# DCSL Lesson Video

Make DCSL course-lesson footage engaging by compositing a branded overlay
layer on top of the real talking-head video, timed to the transcript. Each
lesson in a course is a separate Remotion composition that reuses one shared
component library — so a new lesson is mostly a new **content/timing data file**,
not new components.

This skill is the DCSL-specific application of `engaging-video-from-footage`.
Read that skill for the general philosophy (legibility boxes, curiosity vs.
clean tracker, verifying over real footage). Read `dcsl-brand` for colours,
logo, and type. Read `remotion-best-practices` before writing Remotion code.

## What already exists (reuse it — don't rebuild)

`src/dcsl/_shared/` is a complete, generic lesson library:

| File | Role |
|------|------|
| `colors.ts` | DCSL palette (blue/deep-blue/orange + dark surfaces, dark-legible text) |
| `fonts.ts` | Inter (the dcsl-brand recommended sans) |
| `types.ts` | `LessonContent` and all content shapes — the contract you fill in |
| `Lesson.tsx` | The generic composite: layers footage + every overlay from one `LessonContent` |
| `Background.tsx` | `OffthreadVideo` footage + bottom scrim (+ placeholder when no footage) |
| `LogoBug.tsx` | Persistent DCSL logo chip, top-right |
| `HookOverlay.tsx` | Opening topic lower-third |
| `InstructorLowerThird.tsx` | **Required** name/credential/title bar (orange accent) |
| `OutlineReveal.tsx` | Numbered agenda card (opening lesson only) |
| `SectionReveal.tsx` | Left reveal panel per section |
| `SectionTracker.tsx` | Persistent right rail — **clean progress** (active=blue+orange badge, done=check, upcoming=dimmed, NO blur) |
| `QuoteOverlay.tsx` | Pull-quote / key-point card (orange quote mark + attribution) |
| `StatCallout.tsx` | Big orange figure; counts up if `count` set, else pops a literal `value` (e.g. "9 / 8", "0.01%") |
| `Cutaway.tsx` | Full-frame opaque illustrated takeover |
| `illustrations.tsx` | Governance line-art registry, keyed by name (see below) |

Existing governance illustration keys:
- Directors/board (L1–2): `infoAsymmetry`, `shareInfo`, `hierarchy`, `outsider`,
  `link`, `tenure`, `balance`, `appointment`.
- Fiduciary duties (L3): `goodFaith`, `stakeholders`, `delegation`,
  `confidentiality`, `fetterDiscretion`.
- Conflict-of-interest case study (L4): `productRecall`, `conflictTie`,
  `recusal`, `ringFence`.
- Other CAMA duties (L5): `financials`, `esg`, `performanceKpi`,
  `remuneration`, `riskFramework`.
- Compliance & control (L6): `compliance`, `ethics`, `insiderDealing`,
  `consequences`.
- Removal from office (L7): `resignVsRemove`.
- NCCG evolution / timeline (L8): `timeline`, `harmonise`, `stricter`. For a
  history lesson, the section rail doubles as a chronological timeline.
- Code provisions (L9): `boardComposition`, `diversity`, `boardRefresh`.
- Board operations (L10): `remunerationLimits`, `training`, `companySecretary`.
- Board effectiveness / case study (L11): `dealSnapshot`, `dealTimeline`,
  `boardBypassed`, `toneAtTop`, `continuity`.
- Building the board (L12): `ceoSeat`, `sixElements`, `nedMajority`,
  `separationOfPower`.
- Availability & committees (L13): `chairMdSplit`, `overBoarded`, `committees`,
  `boardDynamics`.
- The board agenda (L14): `constructiveChallenge`, `agendaFilter`,
  `pastVsFuture`, `dysfunctionalDirector`.
- Difficult directors (L15): `domineeringChair`, `peerReview`,
  `escalationLadder`, `replaceRep`.
- Red flags (L16): `boardEvaluation`, `redFlags`, `groupthink`.
- Before you accept (L17): `dueDiligenceChecklist`.

Add new ones to `illustrations.tsx` and the `ILLUSTRATIONS` map; keep the family
(5px rounded line art, white/light-blue, **one orange accent per scene** — do
not use two orange elements in a scene). Keep internal `<text>` labels short and
inside the 720-wide viewBox (the svg renders ~760px; a centred label needs its
centre x ≲ 630 to avoid clipping the right edge).

Reference lessons: `src/dcsl/01-overview-duties-of-directors/`,
`src/dcsl/02-the-chairman/`, `src/dcsl/03-duties-and-responsibilities-of-the-board/`
— copy one as the template. The rail comfortably holds up to ~8 sections.

## Brand rules that are baked in (keep them)

From `dcsl-brand`:
- **Blue anchors, orange accents.** Orange highlights ONE thing per view — the
  active tracker badge, a key figure, an underline, the instructor's accent bar.
- **NEVER white text on orange** (1.92 contrast). Text on orange must be Deep
  Blue. The components already do this (active badge = orange fill, deep-blue text).
- **White text over bright footage MUST sit in a frosted Deep Blue box**
  (`${deepBlue}E6`). Every overlay does this; don't put bare white text on footage.
- Senior, uncluttered tone — restraint over noise.

## Workflow for a new lesson

1. **Confirm inputs**: the `.mp4` (16:9), the `.srt` (clean — fix garbled
   auto-transcripts first), and any slide deck (authoritative wording for
   quotes/figures). The brand is always DCSL.
2. **Footage → public/**: copy to `public/dcsl-<NN>-<slug>.mp4` with a clean
   filename; add it to `.gitignore` (footage is large). `ffprobe` for duration.
   The logo is already at `public/dcsl-logo-light.png`.
3. **Make a lesson folder** `src/dcsl/<NN>-<slug>/` with:
   - `timing.ts` — `const sec = (s) => Math.round(s * 30)`,
     `TOTAL_FRAMES = sec(durationSeconds)`, and a `content: LessonContent`
     object. Every cue comes from the SRT; every quote/figure from the slides.
   - `index.tsx` — a thin wrapper: `<Lesson videoSrc logoSrc content={content} />`.
4. **Register** in `src/Root.tsx` under the `dcsl` folder: `width={1920}
   height={1080} fps={30} durationInFrames={TOTAL_FRAMES}`, with
   `defaultProps={{ videoSrc, logoSrc: "dcsl-logo-light.png" }}`.
5. **Verify over real footage** (see below) before declaring done.
6. **Render**: `npx remotion render <id> out/<slug>.mp4 --log=error`.

## Timing / content rules (the part that actually matters)

- **fps is 30**; source footage fps is irrelevant (Remotion composites by time).
  `sec(x) = round(x*30)`.
- **Sections** drive both the left reveal and the right rail. Set `activeAt` to
  the SRT cue where the instructor starts that section. Set `noReveal: true` for
  a section the hook already introduces (it still appears in the tracker).
- **No left-panel collisions.** The hook, instructor, outline, section reveals,
  quotes, stats and closing all live lower-/upper-left. They are time-gated —
  make sure two never overlap. Section reveals hold ~6.5s (195f); place quotes
  and stats in the gaps between reveals.
- **Cutaways go in the gaps**, never over a reveal. They are opaque full-frame
  takeovers (the speaker keeps talking underneath); each depicts the current
  sentence.
- **Tracker** appears at `trackerIn` and fades when the closing begins
  (`fadeAt = closing.in`).
- **End card check**: DCSL talks so far have **no** built-in outro card (they end
  on the speaker), so the closing recap can hold to the very end — set
  `closing.out` greater than `TOTAL_FRAMES` so it never fades. Re-check each new
  video's tail; if a future one has its own end card, pull `closing.out` before it.
- **Closing = recap / "Next:"**, not a marketing CTA (this is a paid course).
- **Narration slips happen.** If the speaker mis-states a fact (e.g. in the L4
  case study she swaps the two law firms' names), do NOT reproduce the error on
  screen. Frame the on-screen text abstractly and correctly (e.g. "the firm the
  board wants to hire is led by the CEO's spouse") rather than pinning a wrong
  name. The footage audio still plays; the overlay should never contradict the truth.

## Instructor lower-third (always required)

Every lesson must show the instructor. Default:
`name: "Bisi Adeyemi", credential: "F.CIoD", title: "Managing Director, DCSL"`.
Shown ~9–17s in, bottom-left, after the hook.

## Verifying

Render stills over the REAL footage and inspect each beat:

```
npx remotion still <id> out/check/f<N>.png --frame=<N>
```

Check: hook legible, instructor LT correct, each section reveal + tracker state
(active blue/orange, done checks, counter), each quote/stat, every cutaway, the
closing, and that **the speaker is never obstructed** (DCSL footage is
centre-framed with calm dark areas left/right — left reveal + right rail fit
that). Confirm white text is always boxed.

## Definition of done

- [ ] Footage in `public/`, gitignored; composition sized 1920×1080@30 to its duration.
- [ ] `LessonContent` filled from the SRT (cues) and slides (quotes/figures).
- [ ] Instructor lower-third present and correct.
- [ ] Clean progress rail; no left-panel collisions; cutaways in gaps.
- [ ] Closing holds to end (no built-in end card) or clears one if present.
- [ ] Stills verified over real footage; `tsc` clean apart from the repo-wide
      `padStart` lib-target warnings (Remotion's bundler renders these fine).
