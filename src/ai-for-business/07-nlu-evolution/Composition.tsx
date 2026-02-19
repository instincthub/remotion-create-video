import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Eliza } from "./Scene2Eliza";
import { Scene3Shrdlu } from "./Scene3Shrdlu";
import { Scene4Watson } from "./Scene4Watson";
import { Scene5Debater } from "./Scene5Debater";
import { Scene6DeepLearning } from "./Scene6DeepLearning";
import { Scene7Closing } from "./Scene7Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 180s = 5400 frames
// 6 transitions × 15 = 90 frames overlap
// Sum of durations = 5400 + 90 = 5490
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },             // 0:00–0:15
  { component: Scene2Eliza, duration: 25 * FPS + TRANSITION_DURATION },             // 0:15–0:40
  { component: Scene3Shrdlu, duration: 25 * FPS + TRANSITION_DURATION },            // 0:40–1:05
  { component: Scene4Watson, duration: 35 * FPS + TRANSITION_DURATION },            // 1:05–1:40
  { component: Scene5Debater, duration: 40 * FPS + TRANSITION_DURATION },           // 1:40–2:20
  { component: Scene6DeepLearning, duration: 25 * FPS + TRANSITION_DURATION },      // 2:20–2:45
  { component: Scene7Closing, duration: 15 * FPS },                                 // 2:45–3:00
];

export const NLUEvolutionComposition: React.FC = () => {
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
