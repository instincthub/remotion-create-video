import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Turing } from "./Scene2Turing";
import { Scene3Dartmouth } from "./Scene3Dartmouth";
import { Scene4AIEffect } from "./Scene4AIEffect";
import { Scene5FirstWinter } from "./Scene5FirstWinter";
import { Scene6Comeback } from "./Scene6Comeback";
import { Scene7Crash } from "./Scene7Crash";
import { Scene8SecondWinter } from "./Scene8SecondWinter";
import { Scene9Evolution } from "./Scene9Evolution";
import { Scene10Lesson } from "./Scene10Lesson";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 210s = 6300 frames
// 9 transitions × 15 = 135 frames overlap
// Sum of durations = 6300 + 135 = 6435
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },      // 0:00–0:15
  { component: Scene2Turing, duration: 20 * FPS + TRANSITION_DURATION },     // 0:15–0:35
  { component: Scene3Dartmouth, duration: 20 * FPS + TRANSITION_DURATION },  // 0:35–0:55
  { component: Scene4AIEffect, duration: 25 * FPS + TRANSITION_DURATION },   // 0:55–1:20
  { component: Scene5FirstWinter, duration: 25 * FPS + TRANSITION_DURATION },// 1:20–1:45
  { component: Scene6Comeback, duration: 25 * FPS + TRANSITION_DURATION },   // 1:45–2:10
  { component: Scene7Crash, duration: 20 * FPS + TRANSITION_DURATION },      // 2:10–2:30
  { component: Scene8SecondWinter, duration: 20 * FPS + TRANSITION_DURATION },// 2:30–2:50
  { component: Scene9Evolution, duration: 20 * FPS + TRANSITION_DURATION },  // 2:50–3:10
  { component: Scene10Lesson, duration: 20 * FPS },                          // 3:10–3:30
];

export const AIWinterComposition: React.FC = () => {
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
