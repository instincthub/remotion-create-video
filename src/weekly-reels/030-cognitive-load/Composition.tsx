import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1ServerAnalogy } from "./Scene1ServerAnalogy";
import { Scene2HumanOverload } from "./Scene2HumanOverload";
import { Scene3ThreeQuestions } from "./Scene3ThreeQuestions";
import { Scene4BreakTheLoop } from "./Scene4BreakTheLoop";

const FPS = 30;
const TRANSITION_DURATION = 15;

// SRT timing: 0-22, 22-35, 35-53, 53-75
// Raw durations: 22+13+18+22 = 75s
const SCENES = [
  { component: Scene1ServerAnalogy, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene2HumanOverload, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene3ThreeQuestions, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene4BreakTheLoop, duration: 22 * FPS },
];

export const CognitiveLoadComposition: React.FC = () => {
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
