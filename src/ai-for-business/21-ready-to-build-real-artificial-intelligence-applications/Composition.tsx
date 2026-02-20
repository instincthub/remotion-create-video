import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2ConsumerVsEnterprise } from "./Scene2ConsumerVsEnterprise";
import { Scene3RiskMatrix } from "./Scene3RiskMatrix";
import { Scene4SystemLayers } from "./Scene4SystemLayers";
import { Scene5Architecture } from "./Scene5Architecture";
import { Scene6Complexity } from "./Scene6Complexity";
import { Scene7Lifecycle } from "./Scene7Lifecycle";
import { Scene8ScaleStructure } from "./Scene8ScaleStructure";
import { Scene9Systems } from "./Scene9Systems";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 12 * FPS + TRANSITION_DURATION },
  { component: Scene2ConsumerVsEnterprise, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene3RiskMatrix, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene4SystemLayers, duration: 23 * FPS + TRANSITION_DURATION },
  { component: Scene5Architecture, duration: 23 * FPS + TRANSITION_DURATION },
  { component: Scene6Complexity, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene7Lifecycle, duration: 24 * FPS + TRANSITION_DURATION },
  { component: Scene8ScaleStructure, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene9Systems, duration: 12 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 10 * FPS },
];

export const ReadyToBuildComposition: React.FC = () => {
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
