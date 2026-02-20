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

export const Scene2Framework: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 60 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}12 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}12 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title area */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          The{" "}
          <span style={{ color: colors.darkCyra }}>A to I</span>{" "}
          Framework
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 26,
            color: colors.rhythm,
            marginTop: 12,
          }}
        >
          Nine layers. One complete system.
        </div>
      </div>

      {/* Vertical stack of layers — bottom to top */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          bottom: 200,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 6,
          padding: "0 80px",
        }}
      >
        {frameworkLayers.map((layer, i) => {
          const layerDelay = 1.5 * fps + i * 12;
          const layerProgress = spring({
            frame,
            fps,
            delay: layerDelay,
            config: { damping: 12, stiffness: 70 },
          });
          const layerOpacity = interpolate(layerProgress, [0, 1], [0, 1]);
          const layerY = interpolate(layerProgress, [0, 1], [30, 0]);
          const layerScale = interpolate(layerProgress, [0, 1], [0.95, 1]);

          // Glow pulse after layer appears
          const glowFrame = frame - (1.5 * fps + i * 12);
          const glow =
            glowFrame > 0
              ? interpolate(
                  Math.sin(glowFrame * 0.06),
                  [-1, 1],
                  [0.6, 1]
                )
              : 0.6;

          // Width narrows from bottom to top for pyramid look
          const widthPct = 90 - i * 4;

          return (
            <div
              key={layer.letter}
              style={{
                opacity: layerOpacity,
                transform: `translateY(${layerY}px) scaleX(${layerScale})`,
                width: `${widthPct}%`,
                maxWidth: 1200,
                padding: "14px 32px",
                borderRadius: 12,
                background: `${layer.color}15`,
                border: `2px solid ${layer.color}${Math.round(glow * 60).toString(16).padStart(2, "0")}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: layer.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.white,
                  flexShrink: 0,
                }}
              >
                {layer.letter}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: colors.gunmetal,
                }}
              >
                {layer.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
