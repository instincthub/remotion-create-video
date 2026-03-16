import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1OpeningQuestion } from "./Scene1OpeningQuestion";
import { Scene2WEFSkillsShock } from "./Scene2WEFSkillsShock";
import { Scene3TShapedProfile } from "./Scene3TShapedProfile";
import { Scene4TechnicalSkills } from "./Scene4TechnicalSkills";
import { Scene5EpochPivot } from "./Scene5EpochPivot";
import { Scene6EpochSkills } from "./Scene6EpochSkills";
import { Scene7BusinessLeaderStat } from "./Scene7BusinessLeaderStat";
import { Scene8EverydayMoments } from "./Scene8EverydayMoments";
import { Scene9BridgeToEp4 } from "./Scene9BridgeToEp4";

const FPS = 30;
const TD = 15; // 0.5s fade transition — 8 transitions

// Scene durations (seconds → frames + TD for all but last)
// Scene 1:  15s →  465f + TD
// Scene 2:  34s → 1035f + TD
// Scene 3:  42s → 1275f + TD
// Scene 4:  94s → 2835f + TD
// Scene 5:  31s →  945f + TD
// Scene 6: 109s → 3285f + TD
// Scene 7:  29s →  885f + TD
// Scene 8:  12s →  375f + TD
// Scene 9:   8s →  240f  (no TD, last scene)
// Total = 11340 frames
const SCENES = [
  { component: Scene1OpeningQuestion,    duration: 15 * FPS + TD },
  { component: Scene2WEFSkillsShock,     duration: 34 * FPS + TD },
  { component: Scene3TShapedProfile,     duration: 42 * FPS + TD },
  { component: Scene4TechnicalSkills,    duration: 94 * FPS + TD },
  { component: Scene5EpochPivot,         duration: 31 * FPS + TD },
  { component: Scene6EpochSkills,        duration: 109 * FPS + TD },
  { component: Scene7BusinessLeaderStat, duration: 29 * FPS + TD },
  { component: Scene8EverydayMoments,    duration: 12 * FPS + TD },
  { component: Scene9BridgeToEp4,        duration: 8 * FPS },
];

export const AIWakeUpCall4ReelComposition: React.FC = () => {
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
