import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TD } from "./ReelKit";

/**
 * Silent reel shell for the SCC series. Joins b-roll scenes with short
 * cross-dissolves so the cuts between photos/clips read as fluid rather than
 * abrupt. No audio bed — these reels carry their message in the captions.
 */

export type ReelScene = {
  key: string;
  duration: number;
  node: React.ReactNode;
};

/** Total composition length once TD cross-dissolves overlap adjacent scenes. */
export const reelFrames = (scenes: ReelScene[]): number =>
  scenes.reduce((a, s) => a + s.duration, 0) - (scenes.length - 1) * TD;

export const ReelShell: React.FC<{ scenes: ReelScene[] }> = ({ scenes }) => (
  <AbsoluteFill>
    <TransitionSeries>
      {scenes.map((scene, i) => {
        const isLast = i === scenes.length - 1;
        return [
          <TransitionSeries.Sequence
            key={scene.key}
            durationInFrames={scene.duration}
          >
            {scene.node}
          </TransitionSeries.Sequence>,
          !isLast ? (
            <TransitionSeries.Transition
              key={`t-${scene.key}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TD })}
            />
          ) : null,
        ];
      })}
    </TransitionSeries>
  </AbsoluteFill>
);
