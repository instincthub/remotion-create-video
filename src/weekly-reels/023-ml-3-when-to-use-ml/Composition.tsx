import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2ChangingConditions } from "./Scene2ChangingConditions";
import { Scene3ComplexToCode } from "./Scene3ComplexToCode";
import { Scene4ConstantUpdates } from "./Scene4ConstantUpdates";
import { Scene5ComplexEnvironments } from "./Scene5ComplexEnvironments";
import { Scene6Research } from "./Scene6Research";
import { Scene7CTA } from "./Scene7CTA";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 2460 frames (~82s)
//
// SRT timing: 0-3, 3-8, 8-15, 15-23, 23-36, 36-57, 57-82
// Raw durations: 3+5+7+8+13+21+25 = 82s
const SCENES = [
  { component: Scene1Hook, duration: 3 * FPS + TRANSITION_DURATION },
  { component: Scene2ChangingConditions, duration: 5 * FPS + TRANSITION_DURATION },
  { component: Scene3ComplexToCode, duration: 7 * FPS + TRANSITION_DURATION },
  { component: Scene4ConstantUpdates, duration: 8 * FPS + TRANSITION_DURATION },
  { component: Scene5ComplexEnvironments, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene6Research, duration: 21 * FPS + TRANSITION_DURATION },
  { component: Scene7CTA, duration: 25 * FPS },
];

export const ML3WhenToUseMLComposition: React.FC = () => {
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
