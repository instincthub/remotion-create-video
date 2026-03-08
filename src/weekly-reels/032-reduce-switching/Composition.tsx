import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1SwitchingProblem } from "./Scene1SwitchingProblem";
import { Scene2LostContext } from "./Scene2LostContext";
import { Scene3CategorizeAI } from "./Scene3CategorizeAI";
import { Scene4KeyTakeaways } from "./Scene4KeyTakeaways";
import { Scene5ClosingCTA } from "./Scene5ClosingCTA";

const FPS = 30;
const TRANSITION_DURATION = 15;

// SRT timing: 0-22, 22-44, 44-76, 76-131, 131-187
// Raw durations: 22+22+32+55+56 = 187s
const SCENES = [
  { component: Scene1SwitchingProblem, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene2LostContext, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene3CategorizeAI, duration: 32 * FPS + TRANSITION_DURATION },
  { component: Scene4KeyTakeaways, duration: 55 * FPS + TRANSITION_DURATION },
  { component: Scene5ClosingCTA, duration: 56 * FPS },
];

export const ReduceSwitchingComposition: React.FC = () => {
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
