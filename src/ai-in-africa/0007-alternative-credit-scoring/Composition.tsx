import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene01Hook } from "./Scene01Hook";
import { Scene02Jumo } from "./Scene02Jumo";
import { Scene03MNTHalan } from "./Scene03MNTHalan";
import { Scene04Tala } from "./Scene04Tala";
import { Scene05FairMoney } from "./Scene05FairMoney";
import { Scene06Conclusion } from "./Scene06Conclusion";

const FPS = 30;
const T = FPS;
const TR = 15;

// SRT-mapped durations (seconds):
// Scene01: hook          0:00–0:11  → 11s
// Scene02: JUMO          0:11–0:54  → 43s
// Scene03: MNT Halan     0:54–1:17  → 23s
// Scene04: Tala          1:17–1:47  → 30s
// Scene05: FairMoney     1:47–2:09  → 22s
// Scene06: Conclusion    2:09–2:20  → 11s
// Total: 140s = 4200 frames
const SCENES = [
  { component: Scene01Hook,      duration: 11 * T + TR },
  { component: Scene02Jumo,      duration: 43 * T + TR },
  { component: Scene03MNTHalan,  duration: 23 * T + TR },
  { component: Scene04Tala,      duration: 30 * T + TR },
  { component: Scene05FairMoney, duration: 22 * T + TR },
  { component: Scene06Conclusion, duration: 11 * T },
];

export const AlternativeCreditScoringComposition: React.FC = () => {
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
