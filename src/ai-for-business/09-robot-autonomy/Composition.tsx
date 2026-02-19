import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2WhatIsAutonomy } from "./Scene2WhatIsAutonomy";
import { Scene3SensorsMobility } from "./Scene3SensorsMobility";
import { Scene4DarpaChallenge } from "./Scene4DarpaChallenge";
import { Scene5WhyRoboticsMatter } from "./Scene5WhyRoboticsMatter";
import { Scene6Closing } from "./Scene6Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 150s = 4500 frames
// 5 transitions × 15 = 75 frames overlap
// Sum of durations = 4500 + 75 = 4575
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },              // 0:00–0:15
  { component: Scene2WhatIsAutonomy, duration: 25 * FPS + TRANSITION_DURATION },     // 0:15–0:40
  { component: Scene3SensorsMobility, duration: 30 * FPS + TRANSITION_DURATION },    // 0:40–1:10
  { component: Scene4DarpaChallenge, duration: 30 * FPS + TRANSITION_DURATION },     // 1:10–1:40
  { component: Scene5WhyRoboticsMatter, duration: 25 * FPS + TRANSITION_DURATION },  // 1:40–2:05
  { component: Scene6Closing, duration: 25 * FPS },                                  // 2:05–2:30
];

export const RobotAutonomyComposition: React.FC = () => {
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
