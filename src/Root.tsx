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
import { AIPlaybookIntroComposition } from "./ai-for-business/044-introduction-to-ai-playbook/Composition";
import { VibeCoderComposition } from "./weekly-reels/001-what-should-a-vibe-coder-learn/Composition";
import { MLIntroductionComposition } from "./weekly-reels/021-ml-1-introduction/Composition";
import { ML2SpamFilterComposition } from "./weekly-reels/022-ml-2-introduction/Composition";
import { ML3WhenToUseMLComposition } from "./weekly-reels/023-ml-3-when-to-use-ml/Composition";
import { ML4ProjectInMLComposition } from "./weekly-reels/024-ml-4-project-in-ml/Composition";
import { ML5ProjectInMLComposition } from "./weekly-reels/025-ml-5-project-in-ml/Composition";
import { AIFatigueIntroComposition } from "./weekly-reels/026-ai-fatigue-intro/Composition";
import { AIFatigueStoryComposition } from "./weekly-reels/027-ai-fatigue-story/Composition";
import { TimeboxAIComposition } from "./weekly-reels/028-timebox-ai/Composition";
import { SpecificTasksComposition } from "./weekly-reels/029-specific-tasks/Composition";
import { CognitiveLoadComposition } from "./weekly-reels/030-cognitive-load/Composition";
import { DeepCodeModeComposition } from "./weekly-reels/031-deep-code-mode/Composition";
import { ReduceSwitchingComposition } from "./weekly-reels/032-reduce-switching/Composition";
import { AIWakeUpCallComposition } from "./weekly-reels/033-the-ai-wake-up-call/index";
import { AIWakeUpCallReelComposition } from "./weekly-reels/033-the-ai-wake-up-call-reel/index";
import { AIWakeUpCall2Composition } from "./weekly-reels/034-the-ai-wake-up-call/index";
import { AIWakeUpCall2ReelComposition } from "./weekly-reels/034-the-ai-wake-up-call-reel/index";
import { AIWakeUpCall3Composition } from "./weekly-reels/035-the-ai-wake-up-call/index";
import { AIWakeUpCall3ReelComposition } from "./weekly-reels/035-the-ai-wake-up-call-reel/index";
import { AIWakeUpCall4Composition } from "./weekly-reels/037-the-ai-wake-up-call/index";
import { AIWakeUpCall4ReelComposition } from "./weekly-reels/037-the-ai-wake-up-call-reel/index";

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
        <Composition
          id="044-introduction-to-ai-playbook"
          component={AIPlaybookIntroComposition}
          durationInFrames={9180}
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
        <Composition
          id="021-ml-1-introduction"
          component={MLIntroductionComposition}
          durationInFrames={3300}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="022-ml-2-introduction"
          component={ML2SpamFilterComposition}
          durationInFrames={3300}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="023-ml-3-when-to-use-ml"
          component={ML3WhenToUseMLComposition}
          durationInFrames={2460}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="024-ml-4-project-in-ml"
          component={ML4ProjectInMLComposition}
          durationInFrames={2640}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="025-ml-5-project-in-ml"
          component={ML5ProjectInMLComposition}
          durationInFrames={2550}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="026-ai-fatigue-intro"
          component={AIFatigueIntroComposition}
          durationInFrames={4140}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="027-ai-fatigue-story"
          component={AIFatigueStoryComposition}
          durationInFrames={3840}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="028-timebox-ai"
          component={TimeboxAIComposition}
          durationInFrames={2820}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="029-specific-tasks"
          component={SpecificTasksComposition}
          durationInFrames={3060}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="030-cognitive-load"
          component={CognitiveLoadComposition}
          durationInFrames={2250}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="031-deep-code-mode"
          component={DeepCodeModeComposition}
          durationInFrames={3330}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="032-reduce-switching"
          component={ReduceSwitchingComposition}
          durationInFrames={5610}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="033-the-ai-wake-up-call"
          component={AIWakeUpCallComposition}
          durationInFrames={7440}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="033-the-ai-wake-up-call-reel"
          component={AIWakeUpCallReelComposition}
          durationInFrames={7440}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="034-the-ai-wake-up-call"
          component={AIWakeUpCall2Composition}
          durationInFrames={10290}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="034-the-ai-wake-up-call-reel"
          component={AIWakeUpCall2ReelComposition}
          durationInFrames={10290}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="035-the-ai-wake-up-call"
          component={AIWakeUpCall3Composition}
          durationInFrames={4500}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="035-the-ai-wake-up-call-reel"
          component={AIWakeUpCall3ReelComposition}
          durationInFrames={4500}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="037-the-ai-wake-up-call"
          component={AIWakeUpCall4Composition}
          durationInFrames={11340}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="037-the-ai-wake-up-call-reel"
          component={AIWakeUpCall4ReelComposition}
          durationInFrames={11340}
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
