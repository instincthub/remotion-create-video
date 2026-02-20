import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const pillars = [
  { label: "Layered Models", color: colors.darkCyra },
  { label: "Data Pipelines", color: colors.viridianGreen },
  { label: "Decision Engines", color: colors.tiffanyBlue },
  { label: "Fusion Layers", color: colors.caribbeanGreen },
];

export const Scene9Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Bottom message
  const bottomProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle background pattern */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={`circle-${i}`}
            cx={960}
            cy={540}
            r={80 + i * 60}
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
        }}
      >
        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 64,
            fontWeight: 700,
            color: colors.gunmetal,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Artificial Intelligence ={" "}
          <span
            style={{
              color: colors.darkCyra,
              display: "inline",
            }}
          >
            Systems Architecture
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 30,
            color: colors.rhythm,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Not magic. Engineering.
        </div>

        {/* Pillar badges */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 60,
          }}
        >
          {pillars.map((pillar, i) => {
            const pillarProgress = spring({
              frame,
              fps,
              delay: 3 * fps + i * 10,
              config: { damping: 12, stiffness: 80 },
            });
            const pillarOpacity = interpolate(pillarProgress, [0, 1], [0, 1]);
            const pillarY = interpolate(pillarProgress, [0, 1], [20, 0]);

            return (
              <div
                key={`pillar-${i}`}
                style={{
                  opacity: pillarOpacity,
                  transform: `translateY(${pillarY}px)`,
                  padding: "16px 32px",
                  background: `${pillar.color}12`,
                  border: `2px solid ${pillar.color}30`,
                  borderRadius: 12,
                  fontSize: 22,
                  fontWeight: 700,
                  color: pillar.color,
                }}
              >
                {pillar.label}
              </div>
            );
          })}
        </div>

        {/* Bottom message */}
        <div
          style={{
            opacity: bottomOpacity,
            marginTop: 60,
            fontSize: 28,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          Inputs → Transformations → Aggregation → <span style={{ color: colors.caribbeanGreen }}>Outputs</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
