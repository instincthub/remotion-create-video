import { AbsoluteFill } from "remotion";
import { colors, stageColors } from "./colors";
import { dmMono, nunito } from "./fonts";
import { SceneBackground } from "./SceneBackground";
import { StageCard } from "./StageCard";
import { StepIndicator } from "./StepIndicator";

export const Scene4Sustain: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.surfaceDarker, fontFamily: nunito }}>
      <SceneBackground
        glow={stageColors.sustain}
        patternColor={stageColors.sustain}
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
        <StepIndicator active={3} activeColor={stageColors.sustain} />

        <div
          style={{
            fontFamily: dmMono,
            fontSize: 28,
            fontWeight: 500,
            color: colors.chineseSilver,
            letterSpacing: 3,
          }}
        >
          KEEPS THE MODEL HONEST
        </div>

        <StageCard
          index="03"
          title="Sustain"
          color={stageColors.sustain}
          bullets={[
            "Performance statistic collection",
            "Contingency / fail-over",
            "Production monitoring",
          ]}
          footer="→ ALERTS"
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
