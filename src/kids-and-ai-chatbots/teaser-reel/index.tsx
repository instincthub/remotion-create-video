import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  SceneHook,
  SceneStakes,
  SceneStat,
  SceneWrong,
  SceneTease,
  SceneEndCard,
} from "./scenes";

export type TeaserProps = {
  /** Filename of the talk inside public/. */
  videoSrc: string;
};

const TD = 9; // 0.3s cross dissolve — softens the cut between soundbites

/**
 * "Kids and AI Chatbots" teaser — 9:16 reel built from REAL trimmed clips of
 * the talk (original audio kept), center-cropped to portrait, with punchlines
 * laid on top. Clips are joined with short cross dissolves (TransitionSeries)
 * so the jump cuts read as fluid rather than abrupt, then a branded end card
 * closes with the YouTube CTA.
 *
 * On-screen durations (frames @30): hook 132, stakes 189, stat 164, wrong 168,
 * tease 168, end 150. With 5 cross dissolves the composition length is
 * sum(durations) − 5·TD = 971 − 45 = 926 frames ≈ 30.9s.
 */
const DURATIONS = [132, 189, 164, 168, 168, 150];
export const TEASER_FRAMES =
  DURATIONS.reduce((a, b) => a + b, 0) - (DURATIONS.length - 1) * TD; // 930

export const KidsAndAITeaserComposition: React.FC<TeaserProps> = ({
  videoSrc,
}) => {
  const scenes = [
    <SceneHook key="hook" videoSrc={videoSrc} />,
    <SceneStakes key="stakes" videoSrc={videoSrc} />,
    <SceneStat key="stat" videoSrc={videoSrc} />,
    <SceneWrong key="wrong" videoSrc={videoSrc} />,
    <SceneTease key="tease" videoSrc={videoSrc} />,
    <SceneEndCard key="end" />,
  ];

  return (
    <TransitionSeries>
      {scenes.map((node, i) => {
        const isLast = i === scenes.length - 1;
        return [
          <TransitionSeries.Sequence
            key={`scene-${i}`}
            durationInFrames={DURATIONS[i]}
          >
            {node}
          </TransitionSeries.Sequence>,
          !isLast ? (
            <TransitionSeries.Transition
              key={`transition-${i}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TD })}
            />
          ) : null,
        ];
      })}
    </TransitionSeries>
  );
};
