import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Framework } from "./Scene2Framework";
import { Scene3Source } from "./Scene3Source";
import { Scene4Data } from "./Scene4Data";
import { Scene5Process } from "./Scene5Process";
import { Scene6Develop } from "./Scene6Develop";
import { Scene7Deploy } from "./Scene7Deploy";
import { Scene8KnowledgeTrust } from "./Scene8KnowledgeTrust";
import { Scene9Interaction } from "./Scene9Interaction";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene2Framework, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene3Source, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4Data, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene5Process, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene6Develop, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene7Deploy, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene8KnowledgeTrust, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene9Interaction, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 25 * FPS },
];

export const AtoIFrameworkComposition: React.FC = () => {
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
