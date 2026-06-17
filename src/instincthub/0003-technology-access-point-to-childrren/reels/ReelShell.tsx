import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TD } from "./ReelKit";

/** Music bed ("Amazing Plan - Distressed"), in public-tap/public. */
const MUSIC_SRC = "reel-music-amazing-plan.mp3";
/** Very low — sits under Noah's voice without competing with it. */
const MUSIC_VOLUME = 0.04;
/** Music fade-in / fade-out length (frames). */
const MUSIC_FADE = 18;

export type ReelScene = {
  /** Unique key for the scene. */
  key: string;
  /** On-screen length in frames. For footage clips, == trimAfter − trimBefore. */
  duration: number;
  node: React.ReactNode;
};

/** Total composition length once the TD cross-dissolves overlap adjacent scenes. */
export const reelFrames = (scenes: ReelScene[]): number =>
  scenes.reduce((a, s) => a + s.duration, 0) - (scenes.length - 1) * TD;

/**
 * Joins reel scenes with short cross-dissolves so the jump-cuts between
 * soundbites read as fluid rather than abrupt. Last scene has no trailing
 * transition.
 */
export const ReelShell: React.FC<{ scenes: ReelScene[] }> = ({ scenes }) => {
  const total = reelFrames(scenes);
  return (
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

      {/* Very low music bed under the original talk audio. Eased in at the start
          and out at the end so it never pops. Tune MUSIC_VOLUME above. */}
      <Audio
        src={staticFile(MUSIC_SRC)}
        volume={(f) =>
          MUSIC_VOLUME *
          interpolate(
            f,
            [0, MUSIC_FADE, total - MUSIC_FADE, total],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />
    </AbsoluteFill>
  );
};
