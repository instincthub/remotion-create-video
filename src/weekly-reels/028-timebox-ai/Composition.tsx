import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1ToolkitIntro } from "./Scene1ToolkitIntro";
import { Scene2TimeboxConcept } from "./Scene2TimeboxConcept";
import { Scene3TimeBreakdown } from "./Scene3TimeBreakdown";
import { Scene4MixIntermittently } from "./Scene4MixIntermittently";

const FPS = 30;
const TRANSITION_DURATION = 15;

// SRT timing: 0-22, 22-35, 35-58, 58-94
// Raw durations: 22+13+23+36 = 94s
const SCENES = [
  { component: Scene1ToolkitIntro, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene2TimeboxConcept, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene3TimeBreakdown, duration: 23 * FPS + TRANSITION_DURATION },
  { component: Scene4MixIntermittently, duration: 36 * FPS },
];

export const TimeboxAIComposition: React.FC = () => {
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
