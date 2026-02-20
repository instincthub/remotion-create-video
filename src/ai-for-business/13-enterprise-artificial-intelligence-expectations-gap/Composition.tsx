import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Engineering } from "./Scene2Engineering";
import { Scene3SmallTeams } from "./Scene3SmallTeams";
import { Scene4Enterprise } from "./Scene4Enterprise";
import { Scene5Complexity } from "./Scene5Complexity";
import { Scene6Accuracy } from "./Scene6Accuracy";
import { Scene7DataNeverSleeps } from "./Scene7DataNeverSleeps";
import { Scene8SkillsEthics } from "./Scene8SkillsEthics";
import { Scene9EngineeringMindset } from "./Scene9EngineeringMindset";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 12 * FPS + TRANSITION_DURATION },
  { component: Scene2Engineering, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene3SmallTeams, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4Enterprise, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene5Complexity, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene6Accuracy, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene7DataNeverSleeps, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene8SkillsEthics, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene9EngineeringMindset, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 10 * FPS },
];

export const EnterpriseAIExpectationsGapComposition: React.FC = () => {
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
