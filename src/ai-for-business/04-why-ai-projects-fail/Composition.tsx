import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2NotSmarterSoftware } from "./Scene2NotSmarterSoftware";
import { Scene3DataDecides } from "./Scene3DataDecides";
import { Scene4AutomateClean } from "./Scene4AutomateClean";
import { Scene5AIMakesMistakes } from "./Scene5AIMakesMistakes";
import { Scene6Generalisation } from "./Scene6Generalisation";
import { Scene7BuildForReality } from "./Scene7BuildForReality";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 200s = 6000 frames
// 7 transitions × 15 = 105 frames overlap
// Sum of durations = 6000 + 105 = 6105
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },               // 0:00–0:15
  { component: Scene2NotSmarterSoftware, duration: 25 * FPS + TRANSITION_DURATION },  // 0:15–0:40
  { component: Scene3DataDecides, duration: 35 * FPS + TRANSITION_DURATION },          // 0:40–1:15
  { component: Scene4AutomateClean, duration: 30 * FPS + TRANSITION_DURATION },        // 1:15–1:45
  { component: Scene5AIMakesMistakes, duration: 30 * FPS + TRANSITION_DURATION },      // 1:45–2:15
  { component: Scene6Generalisation, duration: 25 * FPS + TRANSITION_DURATION },       // 2:15–2:40
  { component: Scene7BuildForReality, duration: 20 * FPS + TRANSITION_DURATION },      // 2:40–3:00
  { component: Scene8Closing, duration: 20 * FPS },                                    // 3:00–3:20
];

export const WhyAIProjectsFailComposition: React.FC = () => {
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
