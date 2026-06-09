import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene01Hook } from "./Scene01Hook";
import { Scene02AIEngine } from "./Scene02AIEngine";
import { Scene03Stats } from "./Scene03Stats";
import { Scene04Intro } from "./Scene04Intro";
import { Scene05Episode } from "./Scene05Episode";
import { Scene06WhyFintech } from "./Scene06WhyFintech";
import { Scene07Data } from "./Scene07Data";
import { Scene08Gap } from "./Scene08Gap";
import { Scene09Regulation } from "./Scene09Regulation";

const FPS = 30;
const T = FPS; // 1 second in frames
const TR = 15; // transition duration frames (0.5s)

// Scene display durations (seconds) mapped to SRT timing.
// Each scene except the last gets +TR to compensate for TransitionSeries overlap.
// Total visual time = sum(display seconds) = 191s = 5730 frames.
//
// Scene01: 18s · Scene02: 16s · Scene03: 13s · Scene04: 20s
// Scene05: 38s · Scene06: 10s · Scene07: 28s · Scene08: 18s · Scene09: 30s
// = 191s
const SCENES = [
  { component: Scene01Hook,       duration: 18 * T + TR },
  { component: Scene02AIEngine,   duration: 16 * T + TR },
  { component: Scene03Stats,      duration: 13 * T + TR },
  { component: Scene04Intro,      duration: 20 * T + TR },
  { component: Scene05Episode,    duration: 38 * T + TR },
  { component: Scene06WhyFintech, duration: 10 * T + TR },
  { component: Scene07Data,       duration: 28 * T + TR },
  { component: Scene08Gap,        duration: 18 * T + TR },
  { component: Scene09Regulation, duration: 30 * T },      // last — no +TR
];

export const AIInAfricaFintechComposition: React.FC = () => {
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
              timing={linearTiming({ durationInFrames: TR })}
            />
          ) : null,
        ];
      })}
    </TransitionSeries>
  );
};
