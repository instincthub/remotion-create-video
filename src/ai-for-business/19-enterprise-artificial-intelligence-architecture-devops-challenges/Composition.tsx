import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Evaluation } from "./Scene2Evaluation";
import { Scene3Architecture } from "./Scene3Architecture";
import { Scene4Dependencies } from "./Scene4Dependencies";
import { Scene5DevOps } from "./Scene5DevOps";
import { Scene6ModelUpdates } from "./Scene6ModelUpdates";
import { Scene7Regulation } from "./Scene7Regulation";
import { Scene8Factory } from "./Scene8Factory";
import { Scene9TimeToValue } from "./Scene9TimeToValue";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene2Evaluation, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene3Architecture, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4Dependencies, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene5DevOps, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene6ModelUpdates, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene7Regulation, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene8Factory, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene9TimeToValue, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 15 * FPS },
];

export const EnterpriseAIDevOpsComposition: React.FC = () => {
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
