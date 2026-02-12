import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Evolution } from "./Scene2Evolution";
import { Scene3Architecture } from "./Scene3Architecture";
import { Scene4Uncertainty } from "./Scene4Uncertainty";
import { Scene5Ethics } from "./Scene5Ethics";
import { Scene6Accountability } from "./Scene6Accountability";
import { Scene7NonDeterministic } from "./Scene7NonDeterministic";
import { Scene8FeedbackLoops } from "./Scene8FeedbackLoops";
import { Scene9Closing } from "./Scene9Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 180s = 5400 frames
// 8 transitions × 15 = 120 frames overlap
// Sum of durations = 5400 + 120 = 5520
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },              // 0:00–0:15
  { component: Scene2Evolution, duration: 25 * FPS + TRANSITION_DURATION },          // 0:15–0:40
  { component: Scene3Architecture, duration: 23 * FPS + TRANSITION_DURATION },       // 0:40–1:03
  { component: Scene4Uncertainty, duration: 27 * FPS + TRANSITION_DURATION },        // 1:03–1:30
  { component: Scene5Ethics, duration: 27 * FPS + TRANSITION_DURATION },             // 1:30–1:57
  { component: Scene6Accountability, duration: 23 * FPS + TRANSITION_DURATION },     // 1:57–2:20
  { component: Scene7NonDeterministic, duration: 15 * FPS + TRANSITION_DURATION },   // 2:20–2:35
  { component: Scene8FeedbackLoops, duration: 15 * FPS + TRANSITION_DURATION },      // 2:35–2:50
  { component: Scene9Closing, duration: 10 * FPS },                                  // 2:50–3:00
];

export const WhyAIAppsAreDifferentComposition: React.FC = () => {
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
