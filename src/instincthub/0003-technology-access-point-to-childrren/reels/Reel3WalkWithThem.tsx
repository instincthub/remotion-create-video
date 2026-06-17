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
import type { ReelProps } from "./Reel1ScreenReframe";

/**
 * REEL 3 — "Don't just enrol them." The conversion reel: the common parenting
 * mistake (sign the kid up and think you're done), the fix (walk the journey
 * with them, like a footballer's parent at the training ground), and the payoff
 * — at the Summer Coding Class, parents learn alongside their kids. Closes on
 * the 2026 Summer Coding Class CTA.
 *
 * Captions track Noah's exact words in each trimmed clip.
 */

const CLIPS = {
  mistake: { before: 351.6, after: 364.6, pos: "50% 38%" }, // cue 138-142
  journey: { before: 365.5, after: 369.0, pos: "50% 38%" }, // cue 143-144
  football: { before: 370.2, after: 379.3, pos: "50% 38%" }, // cue 145-149
  payoff: { before: 426.4, after: 434.5, pos: "50% 38%" }, // cue 167-170
};

const MistakeScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const eb = useReveal(2);
  const t = useReveal(8, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.mistake.before)}
      trimAfter={sec(CLIPS.mistake.after)}
      objectPosition={CLIPS.mistake.pos}
    >
      <Eyebrow p={eb}>Let&rsquo;s face the truth</Eyebrow>
      <LowerThird p={t}>
        <Caption size={64}>
          Enrolling your child in a program <Hl>isn&rsquo;t all of it.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const JourneyScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(4, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.journey.before)}
      trimAfter={sec(CLIPS.journey.after)}
      objectPosition={CLIPS.journey.pos}
    >
      <LowerThird p={t}>
        <Caption size={74}>
          Go through the journey <Hl>with them.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const FootballScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(6, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.football.before)}
      trimAfter={sec(CLIPS.football.after)}
      objectPosition={CLIPS.football.pos}
    >
      <LowerThird p={t}>
        <Caption size={62}>
          Like a parent at the <Hl>football training ground.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const PayoffScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(6, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.payoff.before)}
      trimAfter={sec(CLIPS.payoff.after)}
      objectPosition={CLIPS.payoff.pos}
      dim={0.1}
    >
      <LowerThird p={t}>
        <Caption size={62}>
          At Summer Coding Class, <Hl>parents learn too.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const scenes = (videoSrc: string): ReelScene[] => [
  {
    key: "mistake",
    duration: sec(CLIPS.mistake.after) - sec(CLIPS.mistake.before),
    node: <MistakeScene videoSrc={videoSrc} />,
  },
  {
    key: "journey",
    duration: sec(CLIPS.journey.after) - sec(CLIPS.journey.before),
    node: <JourneyScene videoSrc={videoSrc} />,
  },
  {
    key: "football",
    duration: sec(CLIPS.football.after) - sec(CLIPS.football.before),
    node: <FootballScene videoSrc={videoSrc} />,
  },
  {
    key: "payoff",
    duration: sec(CLIPS.payoff.after) - sec(CLIPS.payoff.before),
    node: <PayoffScene videoSrc={videoSrc} />,
  },
  { key: "outro", duration: sec(6), node: <OutroSCC /> },
];

export const REEL3_FRAMES = reelFrames(scenes("x"));

export const Reel3WalkWithThem: React.FC<ReelProps> = ({ videoSrc }) => (
  <ReelShell scenes={scenes(videoSrc)} />
);
