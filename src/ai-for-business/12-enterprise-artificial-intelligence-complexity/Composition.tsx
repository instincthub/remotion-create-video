import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Mission } from "./Scene2Mission";
import { Scene3Stakeholders } from "./Scene3Stakeholders";
import { Scene4Consequences } from "./Scene4Consequences";
import { Scene5Regulation } from "./Scene5Regulation";
import { Scene6Insurance } from "./Scene6Insurance";
import { Scene7Historical } from "./Scene7Historical";
import { Scene8Layers } from "./Scene8Layers";
import { Scene9Checklist } from "./Scene9Checklist";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 12 * FPS + TRANSITION_DURATION },
  { component: Scene2Mission, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene3Stakeholders, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4Consequences, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene5Regulation, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene6Insurance, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene7Historical, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene8Layers, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene9Checklist, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 10 * FPS },
];

export const EnterpriseAIComplexityComposition: React.FC = () => {
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
