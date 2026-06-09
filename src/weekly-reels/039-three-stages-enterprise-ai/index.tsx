import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Develop } from "./Scene2Develop";
import { Scene3Deploy } from "./Scene3Deploy";
import { Scene4Sustain } from "./Scene4Sustain";
import { Scene5Loop } from "./Scene5Loop";

const FPS = 30;
const TD = 15; // 0.5s fade

// Each Sequence's duration is its own render time; Transitions overlap
// with both adjacent sequences (15f each). Total composition length =
// sum(durations) - sum(transitions) = 690 - 4*15 = 630f (~21s).
//
// Scene 1 Hook:    4s  + TD = 135f (renders 0-134, fades 120-134)
// Scene 2 Develop: 4s  + TD = 135f (renders 120-254)
// Scene 3 Deploy:  4s  + TD = 135f (renders 240-374)
// Scene 4 Sustain: 4s  + TD = 135f (renders 360-494)
// Scene 5 Loop:    5s       = 150f (renders 480-629, last)
const SCENES = [
  { component: Scene1Hook, duration: 4 * FPS + TD },
  { component: Scene2Develop, duration: 4 * FPS + TD },
  { component: Scene3Deploy, duration: 4 * FPS + TD },
  { component: Scene4Sustain, duration: 4 * FPS + TD },
  { component: Scene5Loop, duration: 5 * FPS },
];

export const ThreeStagesReelComposition: React.FC = () => {
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
