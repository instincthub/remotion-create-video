import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1TaskMatching } from "./Scene1TaskMatching";
import { Scene2AIStrengths } from "./Scene2AIStrengths";
import { Scene3HumanStrengths } from "./Scene3HumanStrengths";
import { Scene4ReduceRedundancy } from "./Scene4ReduceRedundancy";

const FPS = 30;
const TRANSITION_DURATION = 15;

// SRT timing: 0-19, 19-30, 30-55, 55-102
// Raw durations: 19+11+25+47 = 102s
const SCENES = [
  { component: Scene1TaskMatching, duration: 19 * FPS + TRANSITION_DURATION },
  { component: Scene2AIStrengths, duration: 11 * FPS + TRANSITION_DURATION },
  { component: Scene3HumanStrengths, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene4ReduceRedundancy, duration: 47 * FPS },
];

export const SpecificTasksComposition: React.FC = () => {
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
