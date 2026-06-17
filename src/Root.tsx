import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { AIInAfricaFintechComposition } from "./ai-in-africa/0006-ai-in-africa-fintech/Composition";
import { AlternativeCreditScoringComposition } from "./ai-in-africa/0007-alternative-credit-scoring/Composition";
import {
  AIReinventedInsuranceComposition,
  COMPOSITION_FRAMES as INSURANCE_FRAMES,
} from "./ai-in-africa/0009-ai-reinvented-insurance/index";
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
import { BecomeAIPractitionerComposition } from "./weekly-reels/038-become-ai-practitioner/index";
import { ThreeStagesReelComposition } from "./weekly-reels/039-three-stages-enterprise-ai/index";
import { KidsAndAIParentTipsComposition } from "./kids-and-ai-chatbots/parent-tips/index";
import { COMPOSITION_FRAMES as KIDS_AI_TOTAL_FRAMES } from "./kids-and-ai-chatbots/parent-tips/timing";
import {
  KidsAndAITeaserComposition,
  TEASER_FRAMES,
} from "./kids-and-ai-chatbots/teaser-reel/index";
import {
  DCSLDutiesOverviewComposition,
  TOTAL_FRAMES as DCSL_DUTIES_FRAMES,
} from "./dcsl/01-overview-duties-of-directors/index";
import {
  DCSLChairmanComposition,
  TOTAL_FRAMES as DCSL_CHAIRMAN_FRAMES,
} from "./dcsl/02-the-chairman/index";
import {
  DCSLBoardDutiesComposition,
  TOTAL_FRAMES as DCSL_BOARD_DUTIES_FRAMES,
} from "./dcsl/03-duties-and-responsibilities-of-the-board/index";
import {
  DCSLCaseStudyComposition,
  TOTAL_FRAMES as DCSL_CASE_STUDY_FRAMES,
} from "./dcsl/04-case-study/index";
import {
  DCSLOtherDutiesComposition,
  TOTAL_FRAMES as DCSL_OTHER_DUTIES_FRAMES,
} from "./dcsl/05-other-duties-of-directors-under-cama-2020/index";
import {
  DCSLComplianceComposition,
  TOTAL_FRAMES as DCSL_COMPLIANCE_FRAMES,
} from "./dcsl/06-ensuring-compliance-and-adequiate-internal-control/index";
import {
  DCSLRemovalComposition,
  TOTAL_FRAMES as DCSL_REMOVAL_FRAMES,
} from "./dcsl/07-removal-from-office/index";
import {
  DCSLNCCGComposition,
  TOTAL_FRAMES as DCSL_NCCG_FRAMES,
} from "./dcsl/08-nigerian-code-of-corporate-governance/index";
import {
  DCSLProvisionsComposition,
  TOTAL_FRAMES as DCSL_PROVISIONS_FRAMES,
} from "./dcsl/09-provisions-of-the-code/index";
import {
  DCSLMeetingsComposition,
  TOTAL_FRAMES as DCSL_MEETINGS_FRAMES,
} from "./dcsl/10-meeting-requirements/index";
import {
  DCSLEffectivenessComposition,
  TOTAL_FRAMES as DCSL_EFFECTIVENESS_FRAMES,
} from "./dcsl/11-how-facebook-acquired-instagram/index";
import {
  DCSLHireRemoveCEOComposition,
  TOTAL_FRAMES as DCSL_HIRE_REMOVE_CEO_FRAMES,
} from "./dcsl/12-the-board-can-hire-and-remove-a-ceo/index";
import {
  DCSLAvailabilityComposition,
  TOTAL_FRAMES as DCSL_AVAILABILITY_FRAMES,
} from "./dcsl/13-how-available-are-the-board-members/index";
import {
  DCSLAgendaComposition,
  TOTAL_FRAMES as DCSL_AGENDA_FRAMES,
} from "./dcsl/14-what-should-be-on-the-board-agenda/index";
import {
  DCSLDomineeringComposition,
  TOTAL_FRAMES as DCSL_DOMINEERING_FRAMES,
} from "./dcsl/15-a-domineering-board-member/index";
import {
  DCSLRedFlagsComposition,
  TOTAL_FRAMES as DCSL_RED_FLAGS_FRAMES,
} from "./dcsl/16-red-flag-in-corporate-board/index";
import {
  DCSLNextSeatComposition,
  TOTAL_FRAMES as DCSL_NEXT_SEAT_FRAMES,
} from "./dcsl/17-before-you-accept-next-board-member-seat/index";
import { AFFIONG_LESSONS } from "./theplatform/affiong-williams-it-is-not-about-ideas/registry";
import { Thumbnail as AWThumbnail } from "./theplatform/affiong-williams-it-is-not-about-ideas/Thumbnail";
import { MARKETING_SALES_LESSONS } from "./instincthub/marketing-and-sales/registry";
import { Thumbnail as IHMSThumbnail } from "./instincthub/marketing-and-sales/Thumbnail";
import {
  TechAccessPointsComposition,
  COMPOSITION_FRAMES as TAP_FRAMES,
} from "./instincthub/0003-technology-access-point-to-childrren/index";
import { Thumbnail as TAPThumbnail } from "./instincthub/0003-technology-access-point-to-childrren/Thumbnail";
import {
  Reel1ScreenReframe,
  REEL1_FRAMES,
} from "./instincthub/0003-technology-access-point-to-childrren/reels/Reel1ScreenReframe";
import {
  Reel2NeverForget,
  REEL2_FRAMES,
} from "./instincthub/0003-technology-access-point-to-childrren/reels/Reel2NeverForget";
import {
  Reel3WalkWithThem,
  REEL3_FRAMES,
} from "./instincthub/0003-technology-access-point-to-childrren/reels/Reel3WalkWithThem";
import {
  SccComparisonReel,
  SCC_COMPARISON_FRAMES,
} from "./instincthub/scc-reels/001-scc-the-comparison/index";
import {
  HealedThemAllComposition,
  COMPOSITION_FRAMES as MMM_HHTA_FRAMES,
} from "./mmm/he-healed-them-all/index";
import { ThumbnailScene as MMMHHTAThumbnail } from "./mmm/he-healed-them-all/ThumbnailScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="dcsl">
        <Composition
          id="dcsl-01-overview-duties-of-directors"
          component={DCSLDutiesOverviewComposition}
          durationInFrames={DCSL_DUTIES_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-01-overview-duties.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-02-the-chairman"
          component={DCSLChairmanComposition}
          durationInFrames={DCSL_CHAIRMAN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-02-the-chairman.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-03-duties-and-responsibilities-of-the-board"
          component={DCSLBoardDutiesComposition}
          durationInFrames={DCSL_BOARD_DUTIES_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-03-duties-of-the-board.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-04-case-study"
          component={DCSLCaseStudyComposition}
          durationInFrames={DCSL_CASE_STUDY_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-04-case-study.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-05-other-duties-of-directors-under-cama-2020"
          component={DCSLOtherDutiesComposition}
          durationInFrames={DCSL_OTHER_DUTIES_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-05-other-duties-cama.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-06-ensuring-compliance-and-internal-control"
          component={DCSLComplianceComposition}
          durationInFrames={DCSL_COMPLIANCE_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-06-compliance-control.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-07-removal-from-office"
          component={DCSLRemovalComposition}
          durationInFrames={DCSL_REMOVAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-07-removal-from-office.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-08-nigerian-code-of-corporate-governance"
          component={DCSLNCCGComposition}
          durationInFrames={DCSL_NCCG_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-08-nccg.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-09-provisions-of-the-code"
          component={DCSLProvisionsComposition}
          durationInFrames={DCSL_PROVISIONS_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-09-provisions-of-the-code.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-10-meeting-requirements"
          component={DCSLMeetingsComposition}
          durationInFrames={DCSL_MEETINGS_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-10-meeting-requirements.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-11-how-facebook-acquired-instagram"
          component={DCSLEffectivenessComposition}
          durationInFrames={DCSL_EFFECTIVENESS_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-11-facebook-instagram.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-12-the-board-can-hire-and-remove-a-ceo"
          component={DCSLHireRemoveCEOComposition}
          durationInFrames={DCSL_HIRE_REMOVE_CEO_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-12-hire-remove-ceo.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-13-how-available-are-the-board-members"
          component={DCSLAvailabilityComposition}
          durationInFrames={DCSL_AVAILABILITY_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-13-availability.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-14-what-should-be-on-the-board-agenda"
          component={DCSLAgendaComposition}
          durationInFrames={DCSL_AGENDA_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-14-board-agenda.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-15-a-domineering-board-member"
          component={DCSLDomineeringComposition}
          durationInFrames={DCSL_DOMINEERING_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-15-domineering.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-16-red-flag-in-corporate-board"
          component={DCSLRedFlagsComposition}
          durationInFrames={DCSL_RED_FLAGS_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-16-red-flags.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
        <Composition
          id="dcsl-17-before-you-accept-next-board-member-seat"
          component={DCSLNextSeatComposition}
          durationInFrames={DCSL_NEXT_SEAT_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "dcsl-17-next-seat.mp4",
            logoSrc: "dcsl-logo-light.png",
          }}
        />
      </Folder>

      <Folder name="instincthub">
        <Folder name="marketing-and-sales">
          {MARKETING_SALES_LESSONS.map((l) => (
            <Composition
              key={l.id}
              id={l.id}
              component={l.component}
              durationInFrames={l.totalFrames}
              fps={30}
              width={1920}
              height={1080}
              defaultProps={{
                videoSrc: l.videoSrc,
                logoSrc: "instincthub-logo-color.png",
              }}
            />
          ))}
          <Composition
            id="ih-ms-thumbnail"
            component={IHMSThumbnail}
            durationInFrames={1}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{ portraitSrc: "ih-ms-speaker-portrait.jpg" }}
          />
        </Folder>

        <Folder name="0003-technology-access-points">
          <Composition
            id="ih-tap-technology-access-points"
            component={TechAccessPointsComposition}
            durationInFrames={TAP_FRAMES}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{
              videoSrc: "ih-tech-access-points.mp4",
              logoSrc: "instincthub-logo-color.png",
            }}
          />
          <Composition
            id="ih-tap-thumbnail"
            component={TAPThumbnail}
            durationInFrames={1}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{ portraitSrc: "ih-tap-portrait.jpg" }}
          />

          <Composition
            id="ih-tap-reel-1-screen-reframe"
            component={Reel1ScreenReframe}
            durationInFrames={REEL1_FRAMES}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ videoSrc: "ih-tech-access-points.mp4" }}
          />
          <Composition
            id="ih-tap-reel-2-never-forget"
            component={Reel2NeverForget}
            durationInFrames={REEL2_FRAMES}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ videoSrc: "ih-tech-access-points.mp4" }}
          />
          <Composition
            id="ih-tap-reel-3-walk-with-them"
            component={Reel3WalkWithThem}
            durationInFrames={REEL3_FRAMES}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ videoSrc: "ih-tech-access-points.mp4" }}
          />
        </Folder>
        <Folder name="scc-reels">
          <Composition
            id="scc-reel-001-the-comparison"
            component={SccComparisonReel}
            durationInFrames={SCC_COMPARISON_FRAMES}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>
      </Folder>

      <Folder name="mmm">
        <Composition
          id="mmm-he-healed-them-all"
          component={HealedThemAllComposition}
          durationInFrames={MMM_HHTA_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ videoSrc: "mmm-he-healed-them-all.mp4" }}
        />
        <Composition
          id="mmm-hhta-thumbnail"
          component={MMMHHTAThumbnail}
          durationInFrames={1}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="theplatform">
        <Folder name="affiong-williams-plant-trees">
          {AFFIONG_LESSONS.map((l) => (
            <Composition
              key={l.id}
              id={l.id}
              component={l.component}
              durationInFrames={l.totalFrames}
              fps={30}
              width={1920}
              height={1080}
              defaultProps={{ videoSrc: l.videoSrc, logoSrc: "" }}
            />
          ))}
          <Composition
            id="aw-thumbnail"
            component={AWThumbnail}
            durationInFrames={1}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{ portraitSrc: "tp-aw-affiong-portrait.jpg" }}
          />
        </Folder>
      </Folder>

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
        <Composition
          id="038-become-ai-practitioner"
          component={BecomeAIPractitionerComposition}
          durationInFrames={2235}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="039-three-stages-enterprise-ai"
          component={ThreeStagesReelComposition}
          durationInFrames={630}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="ai-in-africa">
        <Composition
          id="0006-ai-in-africa-fintech"
          component={AIInAfricaFintechComposition}
          durationInFrames={5730}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="0007-alternative-credit-scoring"
          component={AlternativeCreditScoringComposition}
          durationInFrames={4275}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="0009-ai-reinvented-insurance"
          component={AIReinventedInsuranceComposition}
          durationInFrames={INSURANCE_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            videoSrc: "0009-ai-reinvented-insurance-cut.mp4",
          }}
        />
      </Folder>

      <Folder name="kids-and-ai-chatbots">
        <Composition
          id="kids-and-ai-parent-tips"
          component={KidsAndAIParentTipsComposition}
          durationInFrames={KIDS_AI_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ videoSrc: "kids-and-ai-parent-tips.mp4" }}
        />
        <Composition
          id="kids-and-ai-teaser-reel"
          component={KidsAndAITeaserComposition}
          durationInFrames={TEASER_FRAMES}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ videoSrc: "kids-and-ai-parent-tips.mp4" }}
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
