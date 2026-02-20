import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface StackItem {
  label: string;
  icon: string;
  color: string;
  delay: number;
}

const stackLayers: StackItem[] = [
  { label: "Monitoring", icon: "M", color: colors.darkSlateGray, delay: 2 },
  { label: "Human Review", icon: "H", color: colors.deepGreenCyanTurquoise, delay: 4 },
  { label: "Model", icon: "AI", color: colors.darkCyra, delay: 6 },
  { label: "Database", icon: "DB", color: colors.chineseBlue, delay: 8 },
  { label: "Backend", icon: "BE", color: colors.policeBlue, delay: 10 },
  { label: "Frontend", icon: "FE", color: colors.metallicBlue, delay: 12 },
];

export const Scene7SystemLayers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-20, 0]);

  // Layer animations
  const layerProgresses = stackLayers.map((layer) =>
    spring({
      frame,
      fps,
      delay: layer.delay * fps,
      config: { damping: 10, stiffness: 60, mass: 1.2 },
    })
  );

  // "If any layer fails" text
  const failProgress = spring({
    frame,
    fps,
    delay: 14.5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const failOpacity = interpolate(failProgress, [0, 1], [0, 1]);
  const failY = interpolate(failProgress, [0, 1], [20, 0]);

  // Accent line grows
  const accentWidth = interpolate(
    frame,
    [1 * fps, 3 * fps],
    [0, 700],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0b1525 100%)`,
        fontFamily,
      }}
    >
      {/* Background pattern */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`bgl-${i}`}
            x1={0}
            y1={108 * i}
            x2={1920}
            y2={108 * i}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          This is{" "}
          <span style={{ color: colors.tiffanyBlue }}>Architecture</span>
        </div>
        {/* Accent underline */}
        <div
          style={{
            width: accentWidth,
            maxWidth: 700,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}, transparent)`,
            marginTop: 12,
          }}
        />
      </div>

      {/* Stack visualization */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column-reverse",
          gap: 6,
          zIndex: 3,
        }}
      >
        {stackLayers.map((layer, i) => {
          const progress = layerProgresses[i];
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const slideUp = interpolate(progress, [0, 1], [60, 0]);
          const scaleX = interpolate(progress, [0, 1], [0.7, 1]);

          return (
            <div
              key={`stack-${i}`}
              style={{
                opacity,
                transform: `translateY(${slideUp}px) scaleX(${scaleX})`,
                transformOrigin: "center bottom",
                width: 700,
                height: 85,
                background: layer.color,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 20,
                border: `1px solid ${colors.white}15`,
                position: "relative",
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: `${colors.white}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.white,
                  letterSpacing: 1,
                }}
              >
                {layer.icon}
              </div>
              {/* Label */}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                {layer.label}
              </div>
              {/* Layer number */}
              <div
                style={{
                  position: "absolute",
                  right: 24,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `${colors.white}40`,
                  letterSpacing: 2,
                }}
              >
                LAYER {stackLayers.length - i}
              </div>
            </div>
          );
        })}
      </div>

      {/* "If any layer fails..." text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: failOpacity,
            transform: `translateY(${failY}px)`,
            fontSize: 32,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          If any layer fails,{" "}
          <span style={{ color: colors.oldRose }}>the whole system suffers.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
