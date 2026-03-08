import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1MultipleApps } from "./Scene1MultipleApps";
import { Scene2BurningTokens } from "./Scene2BurningTokens";
import { Scene3GoingInCircles } from "./Scene3GoingInCircles";
import { Scene4ResearchBurnout } from "./Scene4ResearchBurnout";
import { Scene5UseIntelligently } from "./Scene5UseIntelligently";

const FPS = 30;
const TRANSITION_DURATION = 15;

// SRT timing: 0-20, 20-45, 45-65, 65-89, 89-128
// Raw durations: 20+25+20+24+39 = 128s
const SCENES = [
  { component: Scene1MultipleApps, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene2BurningTokens, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene3GoingInCircles, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene4ResearchBurnout, duration: 24 * FPS + TRANSITION_DURATION },
  { component: Scene5UseIntelligently, duration: 39 * FPS },
];

export const AIFatigueStoryComposition: React.FC = () => {
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
