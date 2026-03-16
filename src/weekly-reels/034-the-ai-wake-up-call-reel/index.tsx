import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1OpeningChallenge } from "./Scene1OpeningChallenge";
import { Scene2HarvardStat } from "./Scene2HarvardStat";
import { Scene3DisappearingJobs } from "./Scene3DisappearingJobs";
import { Scene4EntryLevelCrisis } from "./Scene4EntryLevelCrisis";
import { Scene5PivotMoment } from "./Scene5PivotMoment";
import { Scene6EmergingJobs } from "./Scene6EmergingJobs";
import { Scene7HarvardQuote } from "./Scene7HarvardQuote";
import { Scene8BridgeToEp3 } from "./Scene8BridgeToEp3";

const FPS = 30;
const TD = 15; // 0.5s fade transition — 7 transitions total

// Scene 1: 22s (675f + TD), Scene 2: 31s (945f + TD), Scene 3: 63s (1905f + TD)
// Scene 4: 53s (1605f + TD), Scene 5: 18s (555f + TD), Scene 6: 82s (2475f + TD)
// Scene 7: 43s (1305f + TD), Scene 8: 31s (930f, no TD)
// Total: 343s = 10290 frames
const SCENES = [
  { component: Scene1OpeningChallenge, duration: 22 * FPS + TD },
  { component: Scene2HarvardStat, duration: 31 * FPS + TD },
  { component: Scene3DisappearingJobs, duration: 63 * FPS + TD },
  { component: Scene4EntryLevelCrisis, duration: 53 * FPS + TD },
  { component: Scene5PivotMoment, duration: 18 * FPS + TD },
  { component: Scene6EmergingJobs, duration: 82 * FPS + TD },
  { component: Scene7HarvardQuote, duration: 43 * FPS + TD },
  { component: Scene8BridgeToEp3, duration: 31 * FPS },
];

export const AIWakeUpCall2ReelComposition: React.FC = () => {
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
