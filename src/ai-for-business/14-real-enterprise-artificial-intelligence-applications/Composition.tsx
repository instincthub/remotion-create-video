import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Tension } from "./Scene1Tension";
import { Scene2RealApplications } from "./Scene2RealApplications";
import { Scene3SystemComponent } from "./Scene3SystemComponent";
import { Scene4RadioStation } from "./Scene4RadioStation";
import { Scene5ContextProblem } from "./Scene5ContextProblem";
import { Scene6ComplexityGrows } from "./Scene6ComplexityGrows";
import { Scene7SystemLayers } from "./Scene7SystemLayers";
import { Scene8FailureThinking } from "./Scene8FailureThinking";
import { Scene9WhatToDo } from "./Scene9WhatToDo";
import { Scene10Closing } from "./Scene10Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds at 30fps

const SCENES = [
  { component: Scene1Tension, duration: 14 * FPS + TRANSITION_DURATION },
  { component: Scene2RealApplications, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene3SystemComponent, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene4RadioStation, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene5ContextProblem, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene6ComplexityGrows, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene7SystemLayers, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene8FailureThinking, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene9WhatToDo, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene10Closing, duration: 18 * FPS },
];

export const RealEnterpriseAIComposition: React.FC = () => {
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
