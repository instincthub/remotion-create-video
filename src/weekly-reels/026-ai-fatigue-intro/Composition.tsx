import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2ProductivityParadox } from "./Scene2ProductivityParadox";
import { Scene3DevelopersAsJudges } from "./Scene3DevelopersAsJudges";
import { Scene4ExpectationsTripled } from "./Scene4ExpectationsTripled";
import { Scene5BurnoutSignal } from "./Scene5BurnoutSignal";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at ~4140 frames (~138s)
//
// SRT timing: 0-9, 9-32, 32-68, 68-100, 100-138
// Raw durations: 9+23+36+32+38 = 138s
const SCENES = [
  { component: Scene1Hook, duration: 9 * FPS + TRANSITION_DURATION },
  { component: Scene2ProductivityParadox, duration: 23 * FPS + TRANSITION_DURATION },
  { component: Scene3DevelopersAsJudges, duration: 36 * FPS + TRANSITION_DURATION },
  { component: Scene4ExpectationsTripled, duration: 32 * FPS + TRANSITION_DURATION },
  { component: Scene5BurnoutSignal, duration: 38 * FPS },
];

export const AIFatigueIntroComposition: React.FC = () => {
  return (
    <TransitionSeries>
      {SCENES.map((scene, i) => {
        const SceneComponent = scene.component;
        const isLast = i === SCENES.length - 1;

        return [
          <TransitionSeries.Sequence
            key={`scene-${i}`}
            durationInFrames={scene.duration}
          >
            <SceneComponent />
          </TransitionSeries.Sequence>,
          !isLast ? (
            <TransitionSeries.Transition
              key={`transition-${i}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />
          ) : null,
        ];
      })}
    </TransitionSeries>
  );
};
