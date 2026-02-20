import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Scale } from "./Scene2Scale";
import { Scene3Errors } from "./Scene3Errors";
import { Scene4RealTime } from "./Scene4RealTime";
import { Scene5Unpredictability } from "./Scene5Unpredictability";
import { Scene6State } from "./Scene6State";
import { Scene7ContinuousLearning } from "./Scene7ContinuousLearning";
import { Scene8Federation } from "./Scene8Federation";
import { Scene9Architecture } from "./Scene9Architecture";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene2Scale, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene3Errors, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4RealTime, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene5Unpredictability, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene6State, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene7ContinuousLearning, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene8Federation, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene9Architecture, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 15 * FPS },
];

export const WhyEnterpriseAIComplexComposition: React.FC = () => {
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
