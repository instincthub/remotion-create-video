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
const TD = 15; // Transition duration: 0.5s at 30fps

// Scene durations in frames (matching timestamps + transition overlap)
// Scene 1: 0–22s, Scene 2: 22–53s, Scene 3: 53–116s, Scene 4: 116–169s
// Scene 5: 169–187s, Scene 6: 187–269s, Scene 7: 269–312s, Scene 8: 312–343s
const SCENES = [
  { component: Scene1OpeningChallenge, duration: 22 * FPS + TD }, // 675
  { component: Scene2HarvardStat,      duration: 31 * FPS + TD }, // 945
  { component: Scene3DisappearingJobs, duration: 63 * FPS + TD }, // 1905
  { component: Scene4EntryLevelCrisis, duration: 53 * FPS + TD }, // 1605
  { component: Scene5PivotMoment,      duration: 18 * FPS + TD }, // 555
  { component: Scene6EmergingJobs,     duration: 82 * FPS + TD }, // 2475
  { component: Scene7HarvardQuote,     duration: 43 * FPS + TD }, // 1305
  { component: Scene8BridgeToEp3,      duration: 31 * FPS },       // 930 (no trailing TD)
];

export const AIWakeUpCall2Composition: React.FC = () => {
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
