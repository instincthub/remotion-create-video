import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Data } from "./Scene2Data";
import { Scene3Develop } from "./Scene3Develop";
import { Scene4Production } from "./Scene4Production";
import { Scene5Deploy } from "./Scene5Deploy";
import { Scene6Skills } from "./Scene6Skills";
import { Scene7Sustain } from "./Scene7Sustain";
import { Scene8Drift } from "./Scene8Drift";
import { Scene9BestPractices } from "./Scene9BestPractices";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene2Data, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene3Develop, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene4Production, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene5Deploy, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene6Skills, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene7Sustain, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene8Drift, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene9BestPractices, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 5 * FPS },
];

export const ThreeStagesComposition: React.FC = () => {
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
