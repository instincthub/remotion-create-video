import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Data particles converging into center
const ConvergingParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const convergeProgress = interpolate(frame, [2 * fps, 14 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const centerX = 960;
  const centerY = 540;

  const particles = Array.from({ length: 50 }, (_, i) => {
    const startAngle = (i / 50) * Math.PI * 2;
    const startRadius = 500 + (i % 5) * 60;
    return {
      startX: centerX + Math.cos(startAngle) * startRadius,
      startY: centerY + Math.sin(startAngle) * startRadius,
      size: 2 + (i % 4) * 1.5,
      speed: 0.8 + (i % 3) * 0.3,
    };
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {particles.map((p, i) => {
          const progress = Math.min(convergeProgress * p.speed, 1);
          const x = interpolate(progress, [0, 1], [p.startX, centerX]);
          const y = interpolate(progress, [0, 1], [p.startY, centerY]);
          const pulse = Math.sin(frame * 0.05 + i) * 0.3 + 0.7;

          return (
            <circle
              key={`cp-${i}`}
              cx={x}
              cy={y}
              r={p.size * (1 - progress * 0.5)}
              fill={
                i % 3 === 0
                  ? colors.darkCyra
                  : i % 3 === 1
                    ? colors.tiffanyBlue
                    : colors.caribbeanGreen
              }
              opacity={pulse}
            />
          );
        })}

        {/* Central glow grows as particles converge */}
        <circle
          cx={centerX}
          cy={centerY}
          r={20 + convergeProgress * 60}
          fill={colors.darkCyra}
          opacity={convergeProgress * 0.15}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene7Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main headline - bold zoom in
  const headlineProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 10, stiffness: 80 },
  });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);
  const headlineScale = interpolate(headlineProgress, [0, 1], [0.7, 1]);

  // Subheadline
  const subProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  // Glow pulse on headline
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [20, 50]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <ConvergingParticles />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          zIndex: 2,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: colors.darkCyra,
              textShadow: `0 0 ${glowIntensity}px ${colors.darkCyra}30`,
              lineHeight: 1.3,
            }}
          >
            Artificial Intelligence
            <br />
            or Automation?
          </div>
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 36,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          The future is built on{" "}
          <span style={{ color: colors.tiffanyBlue }}>data</span>.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
