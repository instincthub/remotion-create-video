import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Failure } from "./Scene2Failure";
import { Scene3Misalignment } from "./Scene3Misalignment";
import { Scene4MoreThanAlgorithms } from "./Scene4MoreThanAlgorithms";
import { Scene5Team } from "./Scene5Team";
import { Scene6Impact } from "./Scene6Impact";
import { Scene7Trust } from "./Scene7Trust";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 180s = 5400 frames
// 7 transitions × 15 = 105 frames overlap
// Sum of durations = 5400 + 105 = 5505
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },              // 0:00–0:15
  { component: Scene2Failure, duration: 20 * FPS + TRANSITION_DURATION },            // 0:15–0:35
  { component: Scene3Misalignment, duration: 25 * FPS + TRANSITION_DURATION },       // 0:35–1:00
  { component: Scene4MoreThanAlgorithms, duration: 30 * FPS + TRANSITION_DURATION }, // 1:00–1:30
  { component: Scene5Team, duration: 35 * FPS + TRANSITION_DURATION },               // 1:30–2:05
  { component: Scene6Impact, duration: 25 * FPS + TRANSITION_DURATION },             // 2:05–2:30
  { component: Scene7Trust, duration: 20 * FPS + TRANSITION_DURATION },              // 2:30–2:50
  { component: Scene8Closing, duration: 10 * FPS },                                  // 2:50–3:00
];

export const EngineeringAIComposition: React.FC = () => {
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
