import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2AIEffect } from "./Scene2AIEffect";
import { Scene3AlgorithmsAndData } from "./Scene3AlgorithmsAndData";
import { Scene4MilkReminder } from "./Scene4MilkReminder";
import { Scene5Future2047 } from "./Scene5Future2047";
import { Scene6CollectiveIntelligence } from "./Scene6CollectiveIntelligence";
import { Scene7Closing } from "./Scene7Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 200s = 6000 frames
// 6 transitions × 15 = 90 frames overlap
// Sum of durations = 6000 + 90 = 6090
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },                  // 0:00–0:15
  { component: Scene2AIEffect, duration: 30 * FPS + TRANSITION_DURATION },               // 0:15–0:45
  { component: Scene3AlgorithmsAndData, duration: 35 * FPS + TRANSITION_DURATION },      // 0:45–1:20
  { component: Scene4MilkReminder, duration: 35 * FPS + TRANSITION_DURATION },           // 1:20–1:55
  { component: Scene5Future2047, duration: 40 * FPS + TRANSITION_DURATION },             // 1:55–2:35
  { component: Scene6CollectiveIntelligence, duration: 25 * FPS + TRANSITION_DURATION }, // 2:35–3:00
  { component: Scene7Closing, duration: 20 * FPS },                                     // 3:00–3:20
];

export const AIOrAutomationComposition: React.FC = () => {
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
