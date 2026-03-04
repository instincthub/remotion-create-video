import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1SentimentIntro } from "./Scene1SentimentIntro";
import { Scene2MoodDetection } from "./Scene2MoodDetection";
import { Scene3SmartRouting } from "./Scene3SmartRouting";
import { Scene4ImageClassification } from "./Scene4ImageClassification";
import { Scene5PickProject } from "./Scene5PickProject";
import { Scene6ClosingCTA } from "./Scene6ClosingCTA";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds x FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 2550 frames (~85s)
//
// SRT timing: 0-10, 10-23, 23-33, 33-55, 55-65, 65-85
// Raw durations: 10+13+10+22+10+20 = 85s
const SCENES = [
  { component: Scene1SentimentIntro, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene2MoodDetection, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene3SmartRouting, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene4ImageClassification, duration: 22 * FPS + TRANSITION_DURATION },
  { component: Scene5PickProject, duration: 10 * FPS + TRANSITION_DURATION },
  { component: Scene6ClosingCTA, duration: 20 * FPS },
];

export const ML5ProjectInMLComposition: React.FC = () => {
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
