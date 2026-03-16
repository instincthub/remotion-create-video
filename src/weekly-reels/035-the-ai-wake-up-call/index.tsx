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
const TD = 15; // Transition duration: 0.5s at 30fps

// Scene durations in frames (matching timestamps + transition overlap)
// Scene 1: 0–10s, Scene 2: 11–28s, Scene 3: 29–42s, Scene 4: 43–75s
// Scene 5: 76–88s, Scene 6: 89–125s, Scene 7: 126–136s, Scene 8: 137–145s, Scene 9: 146–150s
const SCENES = [
  { component: Scene1OpeningQuestion,  duration: 10 * FPS + TD }, // 315
  { component: Scene2WEFSkillsShock,   duration: 18 * FPS + TD }, // 555
  { component: Scene3TShapedProfile,   duration: 14 * FPS + TD }, // 435
  { component: Scene4TechnicalSkills,  duration: 33 * FPS + TD }, // 1005
  { component: Scene5EpochPivot,       duration: 13 * FPS + TD }, // 405
  { component: Scene6EpochSkills,      duration: 37 * FPS + TD }, // 1125
  { component: Scene7BusinessLeaderStat, duration: 11 * FPS + TD }, // 345
  { component: Scene8EverydayMoments,  duration: 9 * FPS + TD }, // 285
  { component: Scene9BridgeToEp4,      duration: 5 * FPS },       // 150 (no trailing TD)
];

export const AIWakeUpCall3Composition: React.FC = () => {
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
