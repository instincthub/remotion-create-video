import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2RiseOfExpertSystems } from "./Scene2RiseOfExpertSystems";
import { Scene3Mycin } from "./Scene3Mycin";
import { Scene4Dendral } from "./Scene4Dendral";
import { Scene5Aaron } from "./Scene5Aaron";
import { Scene6KnowledgeBottleneck } from "./Scene6KnowledgeBottleneck";
import { Scene7RulesToLearning } from "./Scene7RulesToLearning";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 180s = 5400 frames
// 7 transitions × 15 = 105 frames overlap
// Sum of durations = 5400 + 105 = 5505
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },                 // 0:00–0:15
  { component: Scene2RiseOfExpertSystems, duration: 25 * FPS + TRANSITION_DURATION },   // 0:15–0:40
  { component: Scene3Mycin, duration: 30 * FPS + TRANSITION_DURATION },                 // 0:40–1:10
  { component: Scene4Dendral, duration: 30 * FPS + TRANSITION_DURATION },               // 1:10–1:40
  { component: Scene5Aaron, duration: 25 * FPS + TRANSITION_DURATION },                 // 1:40–2:05
  { component: Scene6KnowledgeBottleneck, duration: 30 * FPS + TRANSITION_DURATION },   // 2:05–2:35
  { component: Scene7RulesToLearning, duration: 15 * FPS + TRANSITION_DURATION },        // 2:35–2:50
  { component: Scene8Closing, duration: 10 * FPS },                                     // 2:50–3:00
];

export const ExpertSystemsComposition: React.FC = () => {
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
