import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Question } from "./Scene2Question";
import { Scene3Categories } from "./Scene3Categories";
import { Scene4Consumer } from "./Scene4Consumer";
import { Scene5Explorer } from "./Scene5Explorer";
import { Scene6Closing } from "./Scene6Closing";

const FPS = 30;
const TD = 15; // 0.5s fade

// Scene 1 Hook:         8s  = 240f + TD
// Scene 2 Question:     9s  = 270f + TD
// Scene 3 Categories:   7s  = 210f + TD
// Scene 4 Consumer:    18s  = 540f + TD
// Scene 5 Explorer:    22s  = 660f + TD
// Scene 6 Closing:      8s  = 240f (last, no TD)
// Total = 2235 frames (~74.5s)
const SCENES = [
  { component: Scene1Hook, duration: 8 * FPS + TD },
  { component: Scene2Question, duration: 9 * FPS + TD },
  { component: Scene3Categories, duration: 7 * FPS + TD },
  { component: Scene4Consumer, duration: 18 * FPS + TD },
  { component: Scene5Explorer, duration: 22 * FPS + TD },
  { component: Scene6Closing, duration: 8 * FPS },
];

export const BecomeAIPractitionerComposition: React.FC = () => {
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
              timing={linearTiming({ durationInFrames: TD })}
            />
          ) : null,
        ];
      })}
    </TransitionSeries>
  );
};
