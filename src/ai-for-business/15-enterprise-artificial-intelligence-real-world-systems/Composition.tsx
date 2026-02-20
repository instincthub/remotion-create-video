import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2FinancialAccounting } from "./Scene2FinancialAccounting";
import { Scene3RecommenderSystem } from "./Scene3RecommenderSystem";
import { Scene4ComputerVision } from "./Scene4ComputerVision";
import { Scene5Procurement } from "./Scene5Procurement";
import { Scene6RiskPlanning } from "./Scene6RiskPlanning";
import { Scene7SystemPattern } from "./Scene7SystemPattern";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene2FinancialAccounting, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene3RecommenderSystem, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4ComputerVision, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene5Procurement, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene6RiskPlanning, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene7SystemPattern, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene8Closing, duration: 20 * FPS },
];

export const RealWorldSystemsComposition: React.FC = () => {
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
