import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene01Hook } from "./Scene01Hook";
import { Scene02Different } from "./Scene02Different";
import { Scene03Problem } from "./Scene03Problem";
import { Scene04WantedDifferent } from "./Scene04WantedDifferent";
import { Scene05Reveal } from "./Scene05Reveal";
import { Scene06WhatWeCover } from "./Scene06WhatWeCover";
import { Scene07WhoItsFor } from "./Scene07WhoItsFor";
import { Scene08MeetNoah } from "./Scene08MeetNoah";
import { Scene09WhatYouGet } from "./Scene09WhatYouGet";
import { Scene10CTA } from "./Scene10CTA";
import { Scene11BrandSignoff } from "./Scene11BrandSignoff";

const FPS = 30;
const TRANSITION_DURATION = 15; // frames (0.5 seconds)

// Scene durations in frames (seconds × FPS)
// Each scene (except the last) gets +TRANSITION_DURATION to compensate
// for the overlap caused by transitions, keeping total at 9180 frames (306s)
const SCENES = [
  { component: Scene01Hook, duration: 15 * FPS + TRANSITION_DURATION },
  { component: Scene02Different, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene03Problem, duration: 26 * FPS + TRANSITION_DURATION },
  { component: Scene04WantedDifferent, duration: 13 * FPS + TRANSITION_DURATION },
  { component: Scene05Reveal, duration: 32 * FPS + TRANSITION_DURATION },
  { component: Scene06WhatWeCover, duration: 35 * FPS + TRANSITION_DURATION },
  { component: Scene07WhoItsFor, duration: 40 * FPS + TRANSITION_DURATION },
  { component: Scene08MeetNoah, duration: 37 * FPS + TRANSITION_DURATION },
  { component: Scene09WhatYouGet, duration: 39 * FPS + TRANSITION_DURATION },
  { component: Scene10CTA, duration: 38 * FPS + TRANSITION_DURATION },
  { component: Scene11BrandSignoff, duration: 18 * FPS },
];

export const AIPlaybookIntroComposition: React.FC = () => {
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
