import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2EverydayML } from "./Scene2EverydayML";
import { Scene3ModelGrows } from "./Scene3ModelGrows";
import { Scene4TrainingKeywords } from "./Scene4TrainingKeywords";
import { Scene5SpamPatterns } from "./Scene5SpamPatterns";
import { Scene6SpammersEvolve } from "./Scene6SpammersEvolve";
import { Scene7MLSolution } from "./Scene7MLSolution";
import { Scene8SelfLearning } from "./Scene8SelfLearning";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 3300 frames (110s)
//
// SRT timing: 0-7, 7-15, 15-25, 25-34, 34-50, 50-60, 60-72, 72-110
// Raw durations: 7+8+10+9+16+10+12+38 = 110s
const SCENES = [
  { component: Scene1Hook, duration: 7 * FPS + TRANSITION_DURATION },
  { component: Scene2EverydayML, duration: 8 * FPS + TRANSITION_DURATION },
  { component: Scene3ModelGrows, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene4TrainingKeywords, duration: 9 * FPS + TRANSITION_DURATION },
  { component: Scene5SpamPatterns, duration: 16 * FPS + TRANSITION_DURATION },
  { component: Scene6SpammersEvolve, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene7MLSolution, duration: 12 * FPS + TRANSITION_DURATION },
  { component: Scene8SelfLearning, duration: 38 * FPS },
];

export const ML2SpamFilterComposition: React.FC = () => {
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
