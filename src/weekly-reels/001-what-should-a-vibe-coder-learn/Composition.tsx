import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Fragile } from "./Scene2Fragile";
import { Scene3Layers } from "./Scene3Layers";
import { Scene4DataFlow } from "./Scene4DataFlow";
import { Scene5AIClarity } from "./Scene5AIClarity";
import { Scene6Fundamentals } from "./Scene6Fundamentals";
import { Scene7Rebuild } from "./Scene7Rebuild";
import { Scene8Debug } from "./Scene8Debug";
import { Scene9Closing } from "./Scene9Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 5400 frames (180s)
//
// Raw durations: 14+18+27+22+23+27+18+13+18 = 180s
const SCENES = [
  { component: Scene1Hook, duration: 14 * FPS + TRANSITION_DURATION },
  { component: Scene2Fragile, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene3Layers, duration: 27 * FPS + TRANSITION_DURATION },
  { component: Scene4DataFlow, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene5AIClarity, duration: 23 * FPS + TRANSITION_DURATION },
  { component: Scene6Fundamentals, duration: 27 * FPS + TRANSITION_DURATION },
  { component: Scene7Rebuild, duration: 18 * FPS + TRANSITION_DURATION },
  { component: Scene8Debug, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene9Closing, duration: 18 * FPS },
];

export const VibeCoderComposition: React.FC = () => {
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
