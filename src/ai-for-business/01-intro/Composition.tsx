import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Context } from "./Scene2Context";
import { Scene3ConsumerAI } from "./Scene3ConsumerAI";
import { Scene4EnterpriseAI } from "./Scene4EnterpriseAI";
import { Scene5Stakes } from "./Scene5Stakes";
import { Scene6WhyFail } from "./Scene6WhyFail";
import { Scene7Takeaway } from "./Scene7Takeaway";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds × FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 5400 frames (180s)
const SCENES = [
  { component: Scene1Hook, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene2Context, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene3ConsumerAI, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene4EnterpriseAI, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene5Stakes, duration: 25 * FPS + TRANSITION_DURATION },
  { component: Scene6WhyFail, duration: 30 * FPS + TRANSITION_DURATION },
  { component: Scene7Takeaway, duration: 20 * FPS + TRANSITION_DURATION },
  { component: Scene8Closing, duration: 15 * FPS },
];

export const IntroComposition: React.FC = () => {
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
