import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { IntroComposition } from "./ai-for-business/01-intro/Composition";
import { AIWinterComposition } from "./ai-for-business/02-ai-winter/Composition";
import { EngineeringAIComposition } from "./ai-for-business/03-engineering-ai/Composition";
import { WhyAIProjectsFailComposition } from "./ai-for-business/04-why-ai-projects-fail/Composition";
import { WhyAIAppsAreDifferentComposition } from "./ai-for-business/05-why-ai-apps-are-different/Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="ai-for-business">
        <Composition
          id="01-intro"
          component={IntroComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="02-ai-winter"
          component={AIWinterComposition}
          durationInFrames={6300}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="03-engineering-ai"
          component={EngineeringAIComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="04-why-ai-projects-fail"
          component={WhyAIProjectsFailComposition}
          durationInFrames={6000}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="05-why-ai-apps-are-different"
          component={WhyAIAppsAreDifferentComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
