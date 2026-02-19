import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2WhyGames } from "./Scene2WhyGames";
import { Scene3MachineLearning } from "./Scene3MachineLearning";
import { Scene4Reinforcement } from "./Scene4Reinforcement";
import { Scene5DeepBlue } from "./Scene5DeepBlue";
import { Scene6AlphaGo } from "./Scene6AlphaGo";
import { Scene7RealWorld } from "./Scene7RealWorld";
import { Scene8Closing } from "./Scene8Closing";

const FPS = 30;
const TRANSITION_DURATION = 15; // 0.5 seconds

// Scene durations (seconds × FPS) + transition buffer for overlap compensation
// Total target: 180s = 5400 frames
// 7 transitions × 15 = 105 frames overlap
// Sum of durations = 5400 + 105 = 5505
const SCENES = [
  { component: Scene1Hook, duration: 15 * FPS + TRANSITION_DURATION },             // 0:00–0:15
  { component: Scene2WhyGames, duration: 20 * FPS + TRANSITION_DURATION },          // 0:15–0:35
  { component: Scene3MachineLearning, duration: 25 * FPS + TRANSITION_DURATION },   // 0:35–1:00
  { component: Scene4Reinforcement, duration: 25 * FPS + TRANSITION_DURATION },     // 1:00–1:25
  { component: Scene5DeepBlue, duration: 25 * FPS + TRANSITION_DURATION },          // 1:25–1:50
  { component: Scene6AlphaGo, duration: 30 * FPS + TRANSITION_DURATION },           // 1:50–2:20
  { component: Scene7RealWorld, duration: 20 * FPS + TRANSITION_DURATION },         // 2:20–2:40
  { component: Scene8Closing, duration: 20 * FPS },                                 // 2:40–3:00
];

export const BoardGamesComposition: React.FC = () => {
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
