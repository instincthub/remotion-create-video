import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2WebDominance } from "./Scene2WebDominance";
import { Scene3DataFeed } from "./Scene3DataFeed";
import { Scene4Redundancy } from "./Scene4Redundancy";
import { Scene5ComplexEnv } from "./Scene5ComplexEnv";
import { Scene6RiskComparison } from "./Scene6RiskComparison";
import { Scene7Context } from "./Scene7Context";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 180s = 5400 frames
// 7 transitions × 15 = 105 frames overlap
// Sum of durations = 5400 + 105 = 5505
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },                // 0:00–0:15
  { component: Scene2WebDominance, duration: 25 * FPS + TRANSITION_DURATION },         // 0:15–0:40
  { component: Scene3DataFeed, duration: 30 * FPS + TRANSITION_DURATION },             // 0:40–1:10
  { component: Scene4Redundancy, duration: 35 * FPS + TRANSITION_DURATION },           // 1:10–1:45
  { component: Scene5ComplexEnv, duration: 25 * FPS + TRANSITION_DURATION },           // 1:45–2:10
  { component: Scene6RiskComparison, duration: 25 * FPS + TRANSITION_DURATION },       // 2:10–2:35
  { component: Scene7Context, duration: 15 * FPS + TRANSITION_DURATION },              // 2:35–2:50
  { component: Scene8Closing, duration: 10 * FPS },                                    // 2:50–3:00
];

export const WebDominanceComposition: React.FC = () => {
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
