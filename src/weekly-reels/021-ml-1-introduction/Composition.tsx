import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2WhatIsML } from "./Scene2WhatIsML";
import { Scene3MLConcept } from "./Scene3MLConcept";
import { Scene4TraditionalCoding } from "./Scene4TraditionalCoding";
import { Scene5CodeBreaks } from "./Scene5CodeBreaks";
import { Scene6MLShines } from "./Scene6MLShines";
import { Scene7IntelligenceFromData } from "./Scene7IntelligenceFromData";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 3300 frames (110s)
//
// SRT timing: 0-5, 5-11, 11-22, 22-32, 32-50, 50-63, 63-84, 84-110
// Raw durations: 5+6+11+10+18+13+21+26 = 110s
const SCENES = [
  { component: Scene1Hook, duration: 5 * FPS + TRANSITION_DURATION },
  { component: Scene2WhatIsML, duration: 6 * FPS + TRANSITION_DURATION },
  { component: Scene3MLConcept, duration: 11 * FPS + TRANSITION_DURATION },
  { component: Scene4TraditionalCoding, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene5CodeBreaks, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene6MLShines, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene7IntelligenceFromData, duration: 21 * FPS + TRANSITION_DURATION },
  { component: Scene8Closing, duration: 26 * FPS },
];

export const MLIntroductionComposition: React.FC = () => {
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
