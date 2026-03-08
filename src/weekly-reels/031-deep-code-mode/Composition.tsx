import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1DeepCodeIntro } from "./Scene1DeepCodeIntro";
import { Scene2AIFeatureStory } from "./Scene2AIFeatureStory";
import { Scene3VulnerabilityStats } from "./Scene3VulnerabilityStats";
import { Scene4VibeCodersVsPros } from "./Scene4VibeCodersVsPros";
import { Scene5OwnTheLogic } from "./Scene5OwnTheLogic";

const FPS = 30;
const TRANSITION_DURATION = 15;

// SRT timing: 0-24, 24-50, 50-65, 65-84, 84-111
// Raw durations: 24+26+15+19+27 = 111s
const SCENES = [
  { component: Scene1DeepCodeIntro, duration: 24 * FPS + TRANSITION_DURATION },
  { component: Scene2AIFeatureStory, duration: 26 * FPS + TRANSITION_DURATION },
  { component: Scene3VulnerabilityStats, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene4VibeCodersVsPros, duration: 19 * FPS + TRANSITION_DURATION },
  { component: Scene5OwnTheLogic, duration: 27 * FPS },
];

export const DeepCodeModeComposition: React.FC = () => {
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
