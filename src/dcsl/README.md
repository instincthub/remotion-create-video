# DCSL Course-Lesson Videos

On-brand Remotion overlays for **DCSL Corporate Services Limited** training
videos. Each lesson is a talking-head recording with a branded overlay layer
composited on top — an instructor lower-third, a clean section progress-rail,
pull-quote and stat callouts, and full-frame governance illustrations — all
timed to the transcript.

A whole course shares **one component library** (`_shared/`), so a new lesson is
mostly a new data file, not new components.

> Companion skill: `.claude/skills/dcsl-lesson-video/` (the authoring workflow).
> Brand source of truth: the `dcsl-brand` skill. General approach:
> `engaging-video-from-footage`. Remotion conventions: `remotion-best-practices`.

## Layout

```
src/dcsl/
├── README.md                       ← you are here
├── _shared/                        ← the reusable lesson library
│   ├── colors.ts                   DCSL palette (blue / deep-blue / orange + dark surfaces)
│   ├── fonts.ts                    Inter (the dcsl-brand recommended sans)
│   ├── types.ts                    LessonContent + every content shape (the contract)
│   ├── Lesson.tsx                  Generic composite: footage + all overlays from one LessonContent
│   ├── Background.tsx              OffthreadVideo footage + bottom scrim (+ placeholder)
│   ├── LogoBug.tsx                 Persistent DCSL logo chip, top-right
│   ├── HookOverlay.tsx             Opening topic lower-third
│   ├── InstructorLowerThird.tsx    Name / credential / title bar (required)
│   ├── OutlineReveal.tsx           Numbered agenda card (opening lesson only)
│   ├── SectionReveal.tsx           Left reveal panel per section
│   ├── SectionTracker.tsx          Persistent right rail — clean progress (no blur)
│   ├── QuoteOverlay.tsx            Pull-quote / key-point card
│   ├── StatCallout.tsx             Big orange figure (counts up, or literal value)
│   ├── Cutaway.tsx                 Full-frame opaque illustrated takeover
│   └── illustrations.tsx           Governance line-art registry (keyed by name)
├── 01-overview-duties-of-directors/
│   ├── timing.ts                   sec() cues + the LessonContent for lesson 1
│   └── index.tsx                   thin <Lesson …/> wrapper
├── 02-the-chairman/
│   ├── timing.ts
│   └── index.tsx
├── 03-duties-and-responsibilities-of-the-board/
│   ├── timing.ts                   8 fiduciary-duty sections (CAMA 2020 s.305)
│   └── index.tsx
├── 04-case-study/
│   ├── timing.ts                   conflict-of-interest worked example (Grenda PLC)
│   └── index.tsx
├── 05-other-duties-of-directors-under-cama-2020/
│   ├── timing.ts                   6 further board duties (trustees → risk)
│   └── index.tsx
├── 06-ensuring-compliance-and-adequiate-internal-control/
│   ├── timing.ts                   compliance, ethics, disclosure, breach consequences
│   └── index.tsx
├── 07-removal-from-office/
│   ├── timing.ts                   the CAMA removal procedure (short lesson)
│   └── index.tsx
├── 08-nigerian-code-of-corporate-governance/
│   ├── timing.ts                   history/timeline lesson (the rail is the timeline)
│   └── index.tsx
├── 09-provisions-of-the-code/
│   ├── timing.ts                   NCCG provisions walkthrough (board size, diversity…)
│   └── index.tsx
├── 10-meeting-requirements/
│   ├── timing.ts                   board operations (meetings, auditors, co. secretary)
│   └── index.tsx
├── 11-how-facebook-acquired-instagram/
│   ├── timing.ts                   board-effectiveness case study + effective-board framework
│   └── index.tsx
├── 12-the-board-can-hire-and-remove-a-ceo/
│   ├── timing.ts                   CEO mandate + elements of effectiveness (composition)
│   └── index.tsx
├── 13-how-available-are-the-board-members/
│   ├── timing.ts                   availability, over-boarding, committees, dynamics
│   └── index.tsx
├── 14-what-should-be-on-the-board-agenda/
│   ├── timing.ts                   constructive challenge, the agenda, dysfunctional directors
│   └── index.tsx
├── 15-a-domineering-board-member/
│   ├── timing.ts                   difficult directors: evaluate, escalate, replace
│   └── index.tsx
├── 16-red-flag-in-corporate-board/
│   ├── timing.ts                   board evaluation + the red flags of ineffectiveness
│   └── index.tsx
└── 17-before-you-accept-next-board-member-seat/
    ├── timing.ts                   course finale: due diligence, capacity, feedback
    └── index.tsx
```

Illustration registry (`_shared/illustrations.tsx`) keys so far:
`infoAsymmetry`, `shareInfo`, `hierarchy`, `outsider`, `link`, `tenure`,
`balance`, `appointment` (directors/board); `goodFaith`, `stakeholders`,
`delegation`, `confidentiality`, `fetterDiscretion` (fiduciary duties);
`productRecall`, `conflictTie`, `recusal`, `ringFence` (conflict-of-interest case
study); `financials`, `esg`, `performanceKpi`, `remuneration`, `riskFramework`
(other CAMA duties); `compliance`, `ethics`, `insiderDealing`, `consequences`
(compliance & control); `resignVsRemove` (removal from office); `timeline`,
`harmonise`, `stricter` (NCCG evolution); `boardComposition`, `diversity`,
`boardRefresh` (Code provisions); `remunerationLimits`, `training`,
`companySecretary` (board operations); `dealSnapshot`, `dealTimeline`,
`boardBypassed`, `toneAtTop`, `continuity` (board effectiveness); `ceoSeat`,
`sixElements`, `nedMajority`, `separationOfPower` (building the board);
`chairMdSplit`, `overBoarded`, `committees`, `boardDynamics` (availability &
committees); `constructiveChallenge`, `agendaFilter`, `pastVsFuture`,
`dysfunctionalDirector` (the board agenda); `domineeringChair`, `peerReview`,
`escalationLadder`, `replaceRep` (difficult directors); `boardEvaluation`,
`redFlags`, `groupthink` (red flags); `dueDiligenceChecklist` (before you
accept). Keep the family — 5px line art, white/light-blue, **one orange accent
per scene**.

`olabisi-adeyemi-dcsl-may-2026/` (the raw `.mp4` + `.srt` + slides) is the
source material for the first two lessons; it is not imported by the code.

## How a lesson is wired

`index.tsx` is a three-line wrapper; all the work is the data in `timing.ts`:

```tsx
// index.tsx
import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";
export { TOTAL_FRAMES };
export const DCSLChairmanComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
```

```ts
// timing.ts
const sec = (s: number) => Math.round(s * 30);   // fps is always 30
export const TOTAL_FRAMES = sec(267.28);          // round(durationSeconds * 30)
export const content: LessonContent = {
  trackerTitle: "Board Leadership",
  trackerIn: sec(17),
  totalFrames: TOTAL_FRAMES,
  hook: { /* … */ },
  instructor: { name: "Bisi Adeyemi", credential: "F.CIoD", title: "Managing Director, DCSL", /* … */ },
  sections: [ /* each with activeAt = its SRT cue */ ],
  quotes: [ /* verbatim from the slides */ ],
  stats:  [ /* key figures the instructor states */ ],
  cutaways: [ /* { key, start, dur, … } in the gaps between reveals */ ],
  closing: { /* recap / "Next:" — not a marketing CTA */ },
};
```

Registered in [`src/Root.tsx`](../Root.tsx) under the `dcsl` folder at
`1920×1080 @ 30fps`, `durationInFrames={TOTAL_FRAMES}`, with
`defaultProps={{ videoSrc, logoSrc: "dcsl-logo-light.png" }}`.

## Add a new lesson

1. **Footage → `public/`**: copy the `.mp4` to `public/dcsl-<NN>-<slug>.mp4`
   (clean, space-free name). It is already covered by `.gitignore`
   (`src/dcsl/**/*.mp4` + explicit `public/dcsl-*.mp4` entries). The logo lives at
   `public/dcsl-logo-light.png`. `ffprobe` the file for its duration.
2. **Clean the transcript.** Fix garbled auto-`.srt` before timing anything —
   cues feed every overlay's timing and quotes must be accurate.
3. **Create `src/dcsl/<NN>-<slug>/`** with `timing.ts` (the `LessonContent`) and
   `index.tsx` (copy an existing one). Pull every cue from the SRT and every
   quote/figure from the slide deck.
4. **Register** the composition in `src/Root.tsx`.
5. **Verify over real footage**, then render.

## Verify & render

```bash
# Preview live
npx remotion studio

# Still over the REAL footage at frame N (inspect each beat)
npx remotion still dcsl-02-the-chairman out/check.png --frame=3240

# Final render (audio is carried automatically by OffthreadVideo)
npx remotion render dcsl-02-the-chairman out/dcsl-02-the-chairman.mp4 --log=error
```

Check each beat: hook legible, instructor lower-third correct, every section
reveal + tracker state (active = blue with orange badge, done = check, upcoming =
dimmed), each quote/stat, every cutaway, the closing, and that **the speaker is
never obstructed**. DCSL footage is centre-framed with calm dark areas left and
right, which is exactly where the left reveal and right rail sit.

## Brand rules (baked into the components — keep them)

- **Blue anchors, orange accents.** Orange highlights ONE thing per view: the
  active tracker badge, a key figure, an underline, the instructor's accent bar.
- **Never white text on orange** (1.92 contrast — fails). Text on orange is Deep
  Blue. The active tracker badge already does this.
- **White text over bright footage sits in a frosted Deep Blue box**
  (`${deepBlue}E6`). Every overlay does; never put bare white text on footage.
- **Senior, uncluttered tone** — restraint over noise.

## Design decisions (for this course)

- **Clean progress rail, not a curiosity blur.** Enrolled learners see the whole
  roadmap; upcoming sections are dimmed, not hidden. (The general
  `engaging-video-from-footage` skill defaults to blurring upcoming items for
  YouTube retention — we deliberately don't, for a paid LMS course.)
- **Straight to footage** — no thumbnail/title hold.
- **Closing = recap / "Next:"**, not a CTA. DCSL talks so far have **no** built-in
  outro card (they end on the speaker), so `closing.out` is set beyond
  `TOTAL_FRAMES` to hold the recap to the end. Re-check each new video's tail.

## Notes

- `fps` is always 30; the source footage fps is irrelevant — Remotion composites
  by time, so `sec(x) = round(x * 30)` stays correct.
- `tsc` reports repo-wide `padStart` lib-target warnings (pre-existing, in the
  other compositions too); Remotion's esbuild bundler renders these fine.
- Footage and rendered MP4s are gitignored — copy finals out of `out/` to share.
