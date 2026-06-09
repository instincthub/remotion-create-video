import { AbsoluteFill } from "remotion";
import { colors, stageColors } from "./colors";
import { dmMono, nunito } from "./fonts";
import { SceneBackground } from "./SceneBackground";
import { StageCard } from "./StageCard";
import { StepIndicator } from "./StepIndicator";

export const Scene2Develop: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.surfaceDarker, fontFamily: nunito }}>
      <SceneBackground
        glow={stageColors.develop}
        patternColor={stageColors.develop}
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
        <StepIndicator active={1} activeColor={stageColors.develop} />

        <div
          style={{
            fontFamily: dmMono,
            fontSize: 28,
            fontWeight: 500,
            color: colors.chineseSilver,
            letterSpacing: 3,
          }}
        >
          TRAIN ON HISTORICAL DATA
        </div>

        <StageCard
          index="01"
          title="Develop"
          color={stageColors.develop}
          bullets={[
            "Data preparation",
            "AI application development",
            "AI application testing",
          ]}
          footer="→ MODEL READY"
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
