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
 * REEL 2 — "A day I'll never forget." The founder's vulnerable confession: an
 * unguarded school computer lab, a friend who said "let me show you something",
 * and the adult site that loaded — a link he still remembers years later. It
 * lands on the rule he's used ever since ("explain it first, or you can't show
 * me") and closes on the 2026 Summer Coding Class CTA.
 *
 * This is the emotional, story-driven reel — the one most likely to travel.
 * Captions track Noah's exact words in each trimmed clip.
 */

const CLIPS = {
  hook: { before: 163.4, after: 172.2, pos: "50% 36%" }, // cue 87-89
  loaded: { before: 237.0, after: 250.0, pos: "50% 38%" }, // cue 94-97
  remember: { before: 259.3, after: 267.0, pos: "50% 38%" }, // cue 101-103
  rule: { before: 313.9, after: 324.5, pos: "50% 38%" }, // cue 122-127
};

const HookScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const eb = useReveal(2);
  const t = useReveal(10, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.hook.before)}
      trimAfter={sec(CLIPS.hook.after)}
      objectPosition={CLIPS.hook.pos}
    >
      <Eyebrow p={eb}>A true story</Eyebrow>
      <LowerThird p={t}>
        <Caption size={74}>
          A day I&rsquo;ll <Hl>never forget.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const LoadedScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(6, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.loaded.before)}
      trimAfter={sec(CLIPS.loaded.after)}
      objectPosition={CLIPS.loaded.pos}
    >
      <LowerThird p={t}>
        <Caption size={62}>
          A friend typed in a URL — and the <Hl>wrong thing loaded.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const RememberScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(6, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.remember.before)}
      trimAfter={sec(CLIPS.remember.after)}
      objectPosition={CLIPS.remember.pos}
    >
      <LowerThird p={t}>
        <Caption size={64}>
          Years later, I <Hl>still remember that exact site.</Hl>
        </Caption>
      </LowerThird>
    </ClipScene>
  );
};

const RuleScene: React.FC<ReelProps> = ({ videoSrc }) => {
  const t = useReveal(6, 18, 80);
  return (
    <ClipScene
      videoSrc={videoSrc}
      trimBefore={sec(CLIPS.rule.before)}
      trimAfter={sec(CLIPS.rule.after)}
      objectPosition={CLIPS.rule.pos}
      dim={0.12}
    >
      <LowerThird p={t}>
        <Caption size={60}>
          My rule ever since:{" "}
          <Hl>&ldquo;Explain it first — or you can&rsquo;t show me.&rdquo;</Hl>
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
    key: "loaded",
    duration: sec(CLIPS.loaded.after) - sec(CLIPS.loaded.before),
    node: <LoadedScene videoSrc={videoSrc} />,
  },
  {
    key: "remember",
    duration: sec(CLIPS.remember.after) - sec(CLIPS.remember.before),
    node: <RememberScene videoSrc={videoSrc} />,
  },
  {
    key: "rule",
    duration: sec(CLIPS.rule.after) - sec(CLIPS.rule.before),
    node: <RuleScene videoSrc={videoSrc} />,
  },
  { key: "outro", duration: sec(6), node: <OutroSCC /> },
];

export const REEL2_FRAMES = reelFrames(scenes("x"));

export const Reel2NeverForget: React.FC<ReelProps> = ({ videoSrc }) => (
  <ReelShell scenes={scenes(videoSrc)} />
);
