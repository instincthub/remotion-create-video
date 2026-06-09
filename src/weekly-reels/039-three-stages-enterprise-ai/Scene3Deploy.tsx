import { AbsoluteFill } from "remotion";
import { colors, stageColors } from "./colors";
import { dmMono, nunito } from "./fonts";
import { SceneBackground } from "./SceneBackground";
import { StageCard } from "./StageCard";
import { StepIndicator } from "./StepIndicator";

export const Scene3Deploy: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.surfaceDarker, fontFamily: nunito }}>
      <SceneBackground
        glow={stageColors.deploy}
        patternColor={stageColors.deploy}
        glowPosition="50% 30%"
      />

      <AbsoluteFill
        style={{
          padding: "120px 80px 280px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        <StepIndicator active={2} activeColor={stageColors.deploy} />

        <div
          style={{
            fontFamily: dmMono,
            fontSize: 28,
            fontWeight: 500,
            color: colors.chineseSilver,
            letterSpacing: 3,
          }}
        >
          SERVES LIVE TRAFFIC
        </div>

        <StageCard
          index="02"
          title="Deploy"
          color={stageColors.deploy}
          bullets={[
            "Data preparation",
            "AI processing",
            "Output preparation",
          ]}
          footer="→ USER"
        />
      </AbsoluteFill>

      <Watermark />
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 220,
      right: 80,
      fontFamily: dmMono,
      fontSize: 15,
      fontWeight: 500,
      color: `${colors.white}40`,
      letterSpacing: 2,
    }}
  >
    ENTERPRISE AI · CH. 2
  </div>
);
