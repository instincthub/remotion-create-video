import { ClipScene } from "./ClipScene";
import {
  Eyebrow,
  LowerThird,
  Caption,
  Hl,
  OutroSCC,
  useReveal,
  sec,
} from "./ReelKit";
import { ReelShell, reelFrames, type ReelScene } from "./ReelShell";

export type ReelProps = { videoSrc: string };

/**
 * REEL 1 — "Don't fight the screen." A scroll-stopping reframe for parents:
 * technology is the #1 access point to kids → yes, screen addiction is real →
 * so stop fighting it and make screen time meaningful. Closes on the 2026
 * Summer Coding Class CTA.
 *
 * Every caption matches what Noah actually says in that trimmed clip (read off
 * the SRT), so the overlay and his voice stay in lockstep.
 */

// Footage clips (seconds on the talk timeline → trims). Tune by ±0.2s if a
// syllable clips: nudge `before` down to keep the lead word, `after` up to let
// the final word finish before the next cue.
const CLIPS = {
  hook: { before: 67.3, after: 75.9, pos: "50% 36%" }, // cue 24-26 thesis
  addicted: { before: 86.5, after: 92.2, pos: "50% 38%" }, // cue 30-32
  reframe: { before: 93.7, after: 105.3, pos: "50% 38%" }, // cue 33-37
};

const HookScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const eb = useReveal(2);
  const t = useReveal(8, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.hook.before)}
      trimAfter={sec(CLIPS.hook.after)}
      objectPosition={CLIPS.hook.pos}
    >
      <Eyebrow p={eb}>Parents, take note</Eyebrow>
      <LowerThird p={t}>
        <Caption size={70}>
          Technology is the <Hl>#1 access point</Hl> to your children.
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const AddictedScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(4, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.addicted.before)}
      trimAfter={sec(CLIPS.addicted.after)}
      objectPosition={CLIPS.addicted.pos}
    >
      <LowerThird p={t}>
        <Caption size={72}>
          &ldquo;They&rsquo;re addicted to screens.&rdquo; <Hl>It&rsquo;s real.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const ReframeScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(6, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.reframe.before)}
      trimAfter={sec(CLIPS.reframe.after)}
      objectPosition={CLIPS.reframe.pos}
    >
      <LowerThird p={t}>
        <Caption size={66}>
          So don&rsquo;t fight it — <Hl>make screen time meaningful.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const scenes = (videoSrc: string): ReelScene[] => [
  {
    key: "hook",
    duration: sec(CLIPS.hook.after) - sec(CLIPS.hook.before),
    node: <HookScene videoSrc={videoSrc} />,
  },
  {
    key: "addicted",
    duration: sec(CLIPS.addicted.after) - sec(CLIPS.addicted.before),
    node: <AddictedScene videoSrc={videoSrc} />,
  },
  {
    key: "reframe",
    duration: sec(CLIPS.reframe.after) - sec(CLIPS.reframe.before),
    node: <ReframeScene videoSrc={videoSrc} />,
  },
  { key: "outro", duration: sec(6), node: <OutroSCC /> },
];

export const REEL1_FRAMES = reelFrames(scenes("x"));

export const Reel1ScreenReframe: React.FC<ReelProps> = ({ videoSrc }) => (
  <ReelShell scenes={scenes(videoSrc)} />
);
