import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Insurance } from "./Scene2Insurance";
import { Scene3Components } from "./Scene3Components";
import { Scene4Results } from "./Scene4Results";
import { Scene5Pipeline } from "./Scene5Pipeline";
import { Scene6Breakdown } from "./Scene6Breakdown";
import { Scene7MultiSkill } from "./Scene7MultiSkill";
import { Scene8DataFusion } from "./Scene8DataFusion";
import { Scene9Architecture } from "./Scene9Architecture";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene2Insurance, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene3Components, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene4Results, duration: 16 * FPS + TRANSITION_DURATION },
  { component: Scene5Pipeline, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene6Breakdown, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene7MultiSkill, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene8DataFusion, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene9Architecture, duration: 14 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 20 * FPS },
];

export const MultiComponentSystemsComposition: React.FC = () => {
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
