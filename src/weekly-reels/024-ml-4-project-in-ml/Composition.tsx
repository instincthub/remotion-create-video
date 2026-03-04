import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2ProjectPlanning } from "./Scene2ProjectPlanning";
import { Scene3Criteria } from "./Scene3Criteria";
import { Scene4SpamFilter } from "./Scene4SpamFilter";
import { Scene5SpamFilterDetails } from "./Scene5SpamFilterDetails";
import { Scene6Handwriting } from "./Scene6Handwriting";
import { Scene7HousePricing } from "./Scene7HousePricing";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 2640 frames (~88s)
//
// SRT timing: 0-8, 8-14, 14-28, 28-44, 44-59, 59-78, 78-88
// Raw durations: 8+6+14+16+15+19+10 = 88s
const SCENES = [
  { component: Scene1Hook, duration: 8 * FPS + TRANSITION_DURATION },
  { component: Scene2ProjectPlanning, duration: 6 * FPS + TRANSITION_DURATION },
  { component: Scene3Criteria, duration: 14 * FPS + TRANSITION_DURATION },
  { component: Scene4SpamFilter, duration: 16 * FPS + TRANSITION_DURATION },
  { component: Scene5SpamFilterDetails, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene6Handwriting, duration: 19 * FPS + TRANSITION_DURATION },
  { component: Scene7HousePricing, duration: 10 * FPS },
];

export const ML4ProjectInMLComposition: React.FC = () => {
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
