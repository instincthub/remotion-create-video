import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { IntroComposition } from "./ai-for-business/01-intro/Composition";
import { AIWinterComposition } from "./ai-for-business/02-ai-winter/Composition";
import { EngineeringAIComposition } from "./ai-for-business/03-engineering-ai/Composition";
import { WhyAIProjectsFailComposition } from "./ai-for-business/04-why-ai-projects-fail/Composition";
import { WhyAIAppsAreDifferentComposition } from "./ai-for-business/05-why-ai-apps-are-different/Composition";
import { BoardGamesComposition } from "./ai-for-business/06-board-games/Composition";
import { NLUEvolutionComposition } from "./ai-for-business/07-nlu-evolution/Composition";
import { ExpertSystemsComposition } from "./ai-for-business/08-expert-systems/Composition";
import { RobotAutonomyComposition } from "./ai-for-business/09-robot-autonomy/Composition";
import { AIOrAutomationComposition } from "./ai-for-business/10-ai-or-just-smart-automation/Composition";
import { WebDominanceComposition } from "./ai-for-business/11-web-dominance/Composition";
import { EnterpriseAIComplexityComposition } from "./ai-for-business/12-enterprise-artificial-intelligence-complexity/Composition";
import { EnterpriseAIExpectationsGapComposition } from "./ai-for-business/13-enterprise-artificial-intelligence-expectations-gap/Composition";
import { RealEnterpriseAIComposition } from "./ai-for-business/14-real-enterprise-artificial-intelligence-applications/Composition";
import { RealWorldSystemsComposition } from "./ai-for-business/15-enterprise-artificial-intelligence-real-world-systems/Composition";
import { MultiComponentSystemsComposition } from "./ai-for-business/16-artificial-intelligence-multi-component-systems-explained/Composition";
import { AtoIFrameworkComposition } from "./ai-for-business/17-where-to-introduce-artificial-intelligence-in-business/Composition";
import { WhyEnterpriseAIComplexComposition } from "./ai-for-business/18-why-enterprise-artificial-intelligence-is-complex/Composition";
import { EnterpriseAIDevOpsComposition } from "./ai-for-business/19-enterprise-artificial-intelligence-architecture-devops-challenges/Composition";
import { ThreeStagesComposition } from "./ai-for-business/20-three-stages-enterprise-artificial-intelligence/Composition";
import { ReadyToBuildComposition } from "./ai-for-business/21-ready-to-build-real-artificial-intelligence-applications/Composition";
import { VibeCoderComposition } from "./weekly-reels/001-what-should-a-vibe-coder-learn/Composition";

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
        <Composition
          id="06-board-games"
          component={BoardGamesComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="07-nlu-evolution"
          component={NLUEvolutionComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="08-expert-systems"
          component={ExpertSystemsComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="09-robot-autonomy"
          component={RobotAutonomyComposition}
          durationInFrames={4500}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="10-ai-or-just-smart-automation"
          component={AIOrAutomationComposition}
          durationInFrames={6000}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="11-web-dominance"
          component={WebDominanceComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="12-enterprise-artificial-intelligence-complexity"
          component={EnterpriseAIComplexityComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="13-enterprise-artificial-intelligence-expectations-gap"
          component={EnterpriseAIExpectationsGapComposition}
          durationInFrames={5700}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="14-real-enterprise-artificial-intelligence-applications"
          component={RealEnterpriseAIComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="15-enterprise-artificial-intelligence-real-world-systems"
          component={RealWorldSystemsComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="16-artificial-intelligence-multi-component-systems-explained"
          component={MultiComponentSystemsComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="17-where-to-introduce-artificial-intelligence-in-business"
          component={AtoIFrameworkComposition}
          durationInFrames={6300}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="18-why-enterprise-artificial-intelligence-is-complex"
          component={WhyEnterpriseAIComplexComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="19-enterprise-artificial-intelligence-architecture-devops-challenges"
          component={EnterpriseAIDevOpsComposition}
          durationInFrames={6450}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="20-three-stages-enterprise-artificial-intelligence"
          component={ThreeStagesComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="21-ready-to-build-real-artificial-intelligence-applications"
          component={ReadyToBuildComposition}
          durationInFrames={5400}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="weekly-reels">
        <Composition
          id="001-what-should-a-vibe-coder-learn"
          component={VibeCoderComposition}
          durationInFrames={5400}
          fps={30}
          width={1080}
          height={1920}
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
