import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const frameworkLayers = [
  { letter: "A", label: "Source", color: colors.deepGreenCyanTurquoise },
  { letter: "B", label: "Data", color: colors.darkCyra },
  { letter: "C", label: "Process", color: colors.viridianGreen },
  { letter: "D", label: "Develop", color: colors.tiffanyBlue },
  { letter: "E", label: "Deploy", color: colors.caribbeanGreen },
  { letter: "F", label: "Knowledge", color: colors.metallicBlue },
  { letter: "G", label: "Ethics", color: colors.chineseBlue },
  { letter: "H", label: "Interaction", color: colors.policeBlue },
  { letter: "I", label: "Users", color: colors.darkSlateGray },
];

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient
  const zoom = interpolate(frame, [0, 25 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stack on left side — layers light up sequentially
  const stackProgress = interpolate(frame, [0.5 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title: "If You Skip a Layer..."
  const title1Progress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const title1Opacity = interpolate(title1Progress, [0, 1], [0, 1]);
  const title1Y = interpolate(title1Progress, [0, 1], [40, 0]);

  // "Builders think in systems."
  const builderProgress = spring({
    frame,
    fps,
    delay: 9 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const builderOpacity = interpolate(builderProgress, [0, 1], [0, 1]);
  const builderY = interpolate(builderProgress, [0, 1], [20, 0]);

  // "Not prompts."
  const notPromptsProgress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const notPromptsOpacity = interpolate(notPromptsProgress, [0, 1], [0, 1]);

  // "Professionals design the stack."
  const proProgress = spring({
    frame,
    fps,
    delay: 14 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const proOpacity = interpolate(proProgress, [0, 1], [0, 1]);
  const proY = interpolate(proProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 50%, ${colors.gunmetal} 100%)`,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.white}08 1px, transparent 1px),
            linear-gradient(90deg, ${colors.white}08 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Centered layout */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          gap: 40,
        }}
      >
        {/* A to I horizontal strip — two rows */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 1000,
          }}
        >
          {frameworkLayers.map((layer, i) => {
            // Each layer lights up based on sequential progress
            const layerThreshold = i / frameworkLayers.length;
            const isLit = stackProgress > layerThreshold;
            const layerActiveProgress = interpolate(
              stackProgress,
              [layerThreshold, layerThreshold + 0.08],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Glow pulse after lighting up
            const glowPulse = isLit
              ? interpolate(
                  Math.sin((frame - layerThreshold * 6 * fps) * 0.05),
                  [-1, 1],
                  [0.6, 1]
                )
              : 0;

            return (
              <div
                key={layer.letter}
                style={{
                  opacity: 0.3 + layerActiveProgress * 0.7,
                  transform: `scale(${0.9 + layerActiveProgress * 0.1})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: isLit
                    ? `${layer.color}30`
                    : `${colors.white}08`,
                  border: `2px solid ${layer.color}${Math.round(glowPulse * 80).toString(16).padStart(2, "0")}`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: isLit ? layer.color : `${colors.white}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: colors.white,
                    flexShrink: 0,
                  }}
                >
                  {layer.letter}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: isLit ? colors.white : `${colors.white}50`,
                  }}
                >
                  {layer.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered closing text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              opacity: title1Opacity,
              transform: `translateY(${title1Y}px)`,
              fontSize: 58,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.3,
            }}
          >
            If you skip a layer,{" "}
            <span style={{ color: colors.corn }}>it is a demo.</span>
          </div>

          <div
            style={{
              opacity: builderOpacity,
              transform: `translateY(${builderY}px)`,
              fontSize: 38,
              fontWeight: 700,
              color: `${colors.white}cc`,
              marginTop: 32,
            }}
          >
            Builders think in{" "}
            <span style={{ color: colors.caribbeanGreen }}>systems.</span>
            <span
              style={{
                opacity: notPromptsOpacity,
                color: `${colors.white}60`,
                marginLeft: 16,
              }}
            >
              Not prompts.
            </span>
          </div>

          <div
            style={{
              opacity: proOpacity,
              transform: `translateY(${proY}px)`,
              fontSize: 38,
              fontWeight: 700,
              color: `${colors.white}cc`,
              marginTop: 24,
            }}
          >
            Professionals design the{" "}
            <span style={{ color: colors.tiffanyBlue }}>stack.</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
