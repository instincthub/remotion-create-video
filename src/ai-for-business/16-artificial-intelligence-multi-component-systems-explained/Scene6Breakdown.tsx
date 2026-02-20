import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const layers = [
  { label: "Speech-to-Text", description: "Converts voice input to text", color: colors.darkCyra },
  { label: "Intent Detection", description: "Identifies what the user is asking", color: colors.viridianGreen },
  { label: "Entity Recognition", description: "Extracts key objects like 'President' and 'United States'", color: colors.tiffanyBlue },
  { label: "Question Answering", description: "Retrieves the correct answer", color: colors.caribbeanGreen },
  { label: "Dialogue Management", description: "Handles ambiguity and context", color: colors.deepGreenCyanTurquoise },
  { label: "Text-to-Speech", description: "Converts text back into audio", color: colors.darkCyra },
];

export const Scene6Breakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
          <span style={{ color: colors.darkCyra }}>Intent.</span>{" "}
          <span style={{ color: colors.viridianGreen }}>Entity.</span>{" "}
          <span style={{ color: colors.tiffanyBlue }}>Dialogue.</span>{" "}
          <span style={{ color: colors.caribbeanGreen }}>Response.</span>
        </div>
      </div>

      {/* Stacked layers */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {layers.map((layer, i) => {
          const layerDelay = 1.5 * fps + i * 12;
          const layerProgress = spring({
            frame,
            fps,
            delay: layerDelay,
            config: { damping: 12, stiffness: 80 },
          });
          const layerOpacity = interpolate(layerProgress, [0, 1], [0, 1]);
          const layerY = interpolate(layerProgress, [0, 1], [20, 0]);
          const layerScale = interpolate(layerProgress, [0, 1], [0.95, 1]);

          return (
            <div
              key={`layer-${i}`}
              style={{
                opacity: layerOpacity,
                transform: `translateY(${layerY}px) scale(${layerScale})`,
                width: 1200,
                display: "flex",
                alignItems: "center",
                background: colors.white,
                borderRadius: 14,
                padding: "20px 32px",
                boxShadow: `0 4px 20px ${colors.gunmetal}08`,
                border: `2px solid ${layer.color}25`,
                gap: 24,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: layer.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.white,
                  flexShrink: 0,
                }}
              >
                {(i + 1 < 10 ? "0" : "") + (i + 1)}
              </div>

              {/* Label */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: colors.gunmetal }}>
                  {layer.label}
                </div>
                <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 2 }}>
                  {layer.description}
                </div>
              </div>

              {/* Connector line */}
              {i < layers.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: -14,
                    width: 2,
                    height: 14,
                    background: `${layer.color}40`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {(() => {
          const noteProgress = spring({
            frame,
            fps,
            delay: 7 * fps,
            config: { damping: 10, stiffness: 60 },
          });
          return (
            <div
              style={{
                opacity: interpolate(noteProgress, [0, 1], [0, 1]),
                fontSize: 28,
                fontWeight: 700,
                color: colors.darkSlateGray,
              }}
            >
              Each component solves a{" "}
              <span style={{ color: colors.darkCyra }}>different task.</span>
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
