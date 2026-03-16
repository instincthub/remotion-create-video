import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2StatsBomb } from "./Scene2StatsBomb";
import { Scene3SpeedOfChange } from "./Scene3SpeedOfChange";
import { Scene4PerceptionGap } from "./Scene4PerceptionGap";
import { Scene5ParentFears } from "./Scene5ParentFears";
import { Scene6SchoolFailure } from "./Scene6SchoolFailure";
import { Scene7Opportunity } from "./Scene7Opportunity";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TD = 15; // 0.5s fade transition

// Matching the same timestamps as the 16:9 version
// Scene 1: 0-12s, Scene 2: 12-40s, Scene 3: 40-59s, Scene 4: 59-93s
// Scene 5: 93-127s, Scene 6: 127-164s, Scene 7: 164-211s, Scene 8: 211-248s
const SCENES = [
  { component: Scene1Hook, duration: 12 * FPS + TD },
  { component: Scene2StatsBomb, duration: 28 * FPS + TD },
  { component: Scene3SpeedOfChange, duration: 19 * FPS + TD },
  { component: Scene4PerceptionGap, duration: 34 * FPS + TD },
  { component: Scene5ParentFears, duration: 34 * FPS + TD },
  { component: Scene6SchoolFailure, duration: 37 * FPS + TD },
  { component: Scene7Opportunity, duration: 47 * FPS + TD },
  { component: Scene8Closing, duration: 37 * FPS },
];

export const AIWakeUpCallReelComposition: React.FC = () => {
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
              timing={linearTiming({ durationInFrames: TD })}
            />
          ) : null,
        ];
      })}
    </TransitionSeries>
  );
};
