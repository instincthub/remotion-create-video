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
const TD = 15; // 0.5s fade transition — 8 transitions × TD = 120 frames overlap

// Scene durations (seconds → frames + TD for all but last)
// Scene 1: 10s → 315f + TD
// Scene 2: 18s → 555f + TD
// Scene 3: 14s → 435f + TD
// Scene 4: 33s → 1005f + TD
// Scene 5: 13s → 405f + TD
// Scene 6: 37s → 1125f + TD
// Scene 7: 11s → 345f + TD
// Scene 8:  9s → 285f + TD
// Scene 9:  5s → 150f  (no TD, last scene)
// Total visible frames: 315+555+435+1005+405+1125+345+285+150 - (8×15) = 4500 ✓
const SCENES = [
  { component: Scene1OpeningQuestion, duration: 10 * FPS + TD },
  { component: Scene2WEFSkillsShock, duration: 18 * FPS + TD },
  { component: Scene3TShapedProfile, duration: 14 * FPS + TD },
  { component: Scene4TechnicalSkills, duration: 33 * FPS + TD },
  { component: Scene5EpochPivot, duration: 13 * FPS + TD },
  { component: Scene6EpochSkills, duration: 37 * FPS + TD },
  { component: Scene7BusinessLeaderStat, duration: 11 * FPS + TD },
  { component: Scene8EverydayMoments, duration: 9 * FPS + TD },
  { component: Scene9BridgeToEp4, duration: 5 * FPS },
];

export const AIWakeUpCall3ReelComposition: React.FC = () => {
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
