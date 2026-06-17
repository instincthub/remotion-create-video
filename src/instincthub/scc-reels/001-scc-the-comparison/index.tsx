import { BrollScene } from "../BrollScene";
import { ReelShell, reelFrames, type ReelScene } from "../ReelShell";
import {
  Eyebrow,
  LowerThird,
  Caption,
  Sub,
  Hl,
  Win,
  ListReveal,
  StatPop,
  OutroSCC,
  useReveal,
  sec,
} from "../ReelKit";

/**
 * REEL 001 — "The Comparison." A scroll-stopping reframe for Nigerian parents:
 * most kids will waste the summer on screens → some parents are making a
 * different choice → by the end their child has written real Python, used AI
 * properly, and built an app they demo live → 2 years running, 200 children,
 * Lagos + virtual → register at instinctHub.com/scc.
 *
 * SILENT, b-roll-driven: previous-training photos (Ken Burns) and muted clips,
 * cross-dissolved, with animated captions paraphrasing the script. No audio.
 */

// ---- Scene durations (frames @30) ----
const D = {
  hook: 118,
  waste: 110,
  choice: 100,
  outcomes: 214,
  demo: 122,
  proof: 132,
  outro: 180,
};

const HookScene: React.FC = () => {
  const eb = useReveal(2);
  const t = useReveal(8, 18, 80);
  const s = useReveal(46);
  return (
    <BrollScene
      kind="photo"
      src="scc-comparison/scc-4218.jpg"
      durationInFrames={D.hook}
      objectPosition="50% 40%"
      kenBurns={{ fromScale: 1.06, toScale: 1.16, panY: -10 }}
      dim={0.12}
    >
      <Eyebrow p={eb}>The comparison</Eyebrow>
      <LowerThird p={t}>
        <Caption size={66}>
          This summer, your child will spend hours{" "}
          <Hl>watching a screen.</Hl>
        </Caption>
        <Sub p={s}>And honestly? Most kids will.</Sub>
      </LowerThird>
    </BrollScene>
  );
};

const WasteScene: React.FC = () => {
  const t = useReveal(4, 18, 80);
  const s = useReveal(34);
  return (
    <BrollScene
      kind="photo"
      src="scc-comparison/scc-3940.jpg"
      durationInFrames={D.waste}
      objectPosition="50% 45%"
      kenBurns={{ fromScale: 1.08, toScale: 1.16, panX: -18 }}
      dim={0.28}
    >
      <LowerThird p={t}>
        <Caption size={74}>
          YouTube. Games. TikTok. <Hl>Repeat.</Hl>
        </Caption>
        <Sub p={s}>8 weeks of holiday gone. Nothing to show for it.</Sub>
      </LowerThird>
    </BrollScene>
  );
};

const ChoiceScene: React.FC = () => {
  const t = useReveal(6, 18, 80);
  const s = useReveal(40);
  return (
    <BrollScene
      kind="clip"
      src="scc-comparison/scc-clip-4250.mp4"
      durationInFrames={D.choice}
      trimBefore={sec(0.4)}
      trimAfter={sec(0.4) + D.choice}
      objectPosition="50% 45%"
      dim={0.14}
    >
      <LowerThird p={t}>
        <Caption size={66}>
          But some parents are making <Hl>a different choice.</Hl>
        </Caption>
        <Sub p={s}>And the difference matters.</Sub>
      </LowerThird>
    </BrollScene>
  );
};

const OutcomesScene: React.FC = () => {
  const eb = useReveal(2);
  return (
    <BrollScene
      kind="clip"
      src="scc-comparison/scc-clip-4256.mp4"
      durationInFrames={D.outcomes}
      trimBefore={sec(1.4)}
      trimAfter={sec(1.4) + D.outcomes}
      objectPosition="50% 55%"
      dim={0.18}
    >
      <Eyebrow p={eb}>By summer&rsquo;s end, your child has…</Eyebrow>
      <ListReveal
        startDelay={20}
        stagger={34}
        items={[
          <>
            Written real <Win>Python code</Win>
          </>,
          <>
            Used <Win>AI</Win> properly, not just played with it
          </>,
          <>
            Built a working <Win>app</Win> they designed
          </>,
        ]}
      />
    </BrollScene>
  );
};

// Demo scene. Placeholder = 2025 winner's-cheque photo. To use the "student
// presenting on a mic" photo: save it to public/scc-comparison/scc-presentation.jpg
// and change src below to "scc-comparison/scc-presentation.jpg" (zoom already set).
const DemoScene: React.FC = () => {
  const t = useReveal(4, 18, 80);
  const s = useReveal(36);
  return (
    <BrollScene
      kind="photo"
      src="scc-comparison/scc-9919.jpg"
      durationInFrames={D.demo}
      objectPosition="50% 44%"
      kenBurns={{ fromScale: 1.05, toScale: 1.17, panY: 6 }}
      dim={0.14}
    >
      <LowerThird p={t}>
        <Caption size={66}>
          Then they <Hl>present it live.</Hl>
        </Caption>
        <Sub p={s}>
          To family, and to people who can&rsquo;t believe a child built it.
        </Sub>
      </LowerThird>
    </BrollScene>
  );
};

const ProofScene: React.FC = () => {
  const eb = useReveal(2);
  return (
    <BrollScene
      kind="photo"
      src="scc-comparison/scc-9973.jpg"
      durationInFrames={D.proof}
      objectPosition="50% 42%"
      kenBurns={{ fromScale: 1.1, toScale: 1.04, panY: 6 }}
      dim={0.16}
    >
      <Eyebrow p={eb}>2 years running · across Nigeria</Eyebrow>
      <StatPop value={200} label="children, this summer" />
    </BrollScene>
  );
};

const scenes = (): ReelScene[] => [
  { key: "hook", duration: D.hook, node: <HookScene /> },
  { key: "waste", duration: D.waste, node: <WasteScene /> },
  { key: "choice", duration: D.choice, node: <ChoiceScene /> },
  { key: "outcomes", duration: D.outcomes, node: <OutcomesScene /> },
  { key: "demo", duration: D.demo, node: <DemoScene /> },
  { key: "proof", duration: D.proof, node: <ProofScene /> },
  { key: "outro", duration: D.outro, node: <OutroSCC /> },
];

export const SCC_COMPARISON_FRAMES = reelFrames(scenes());

export const SccComparisonReel: React.FC = () => (
  <ReelShell scenes={scenes()} />
);
