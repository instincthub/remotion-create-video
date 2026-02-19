import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Subtle radial pulse
const RadialPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseRadius = 200 + Math.sin(frame * 0.03) * 40;
  const pulseOpacity = 0.08 + Math.sin(frame * 0.03) * 0.04;

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <circle
          cx={960}
          cy={540}
          r={pulseRadius}
          fill={colors.tiffanyBlue}
          opacity={pulseOpacity}
        />
        <circle
          cx={960}
          cy={540}
          r={pulseRadius * 1.6}
          fill={colors.tiffanyBlue}
          opacity={pulseOpacity * 0.5}
        />
        <circle
          cx={960}
          cy={540}
          r={pulseRadius * 2.2}
          fill={colors.tiffanyBlue}
          opacity={pulseOpacity * 0.2}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main headline
  const headlineProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 10, stiffness: 80 },
  });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);
  const headlineScale = interpolate(headlineProgress, [0, 1], [0.8, 1]);

  // Subline
  const subProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Glow pulse on headline
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [20, 50]
  );

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [8 * fps, 10 * fps],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCyra,
        fontFamily,
        opacity: fadeOut,
      }}
    >
      <RadialPulse />

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
            fontSize: 60,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            textShadow: `0 0 ${glowIntensity}px ${colors.white}30`,
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          AI is powerful.
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 44,
            fontWeight: "bold",
            color: colors.caribbeanGreen,
            textAlign: "center",
          }}
        >
          Context is everything.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
