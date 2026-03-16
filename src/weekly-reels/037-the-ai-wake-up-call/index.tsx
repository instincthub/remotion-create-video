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

const SCENES = [
  { component: Scene1OpeningQuestion,    duration: 15 * FPS + TD }, // 465
  { component: Scene2WEFSkillsShock,     duration: 34 * FPS + TD }, // 1035
  { component: Scene3TShapedProfile,     duration: 42 * FPS + TD }, // 1275
  { component: Scene4TechnicalSkills,    duration: 94 * FPS + TD }, // 2835
  { component: Scene5EpochPivot,         duration: 31 * FPS + TD }, // 945
  { component: Scene6EpochSkills,        duration: 109 * FPS + TD }, // 3285
  { component: Scene7BusinessLeaderStat, duration: 29 * FPS + TD }, // 885
  { component: Scene8EverydayMoments,    duration: 12 * FPS + TD }, // 375
  { component: Scene9BridgeToEp4,        duration: 8 * FPS },        // 240 (no trailing TD)
];
// Total: 465+1035+1275+2835+945+3285+885+375+240 = 11340 frames

export const AIWakeUpCall4Composition: React.FC = () => {
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
