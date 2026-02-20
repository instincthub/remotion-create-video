import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom out
  const zoom = interpolate(frame, [0, 18 * fps], [1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main line 1: "Performance impresses."
  const line1Progress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 60 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  // Main line 2: "Resilience survives."
  const line2Progress = spring({
    frame,
    fps,
    delay: 3.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Divider line
  const dividerWidth = interpolate(
    frame,
    [5.5 * fps, 7 * fps],
    [0, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Closing statement
  const closingProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingY = interpolate(closingProgress, [0, 1], [20, 0]);

  // System diagram glow (background)
  const glowOpacity = interpolate(
    frame,
    [0, 3 * fps],
    [0, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const glowPulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.8, 1]);

  // Gradient background shift
  const gradientShift = interpolate(frame, [0, 18 * fps], [0, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + gradientShift}deg, ${colors.darkNavy} 0%, #0f2a2c 50%, #0a2025 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {/* Background system diagram (glowing steadily) */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0, opacity: glowOpacity * glowPulse }}
        >
          {/* Circular system diagram */}
          <circle cx="960" cy="540" r="300" fill="none" stroke={colors.tiffanyBlue} strokeWidth={1.5} />
          <circle cx="960" cy="540" r="200" fill="none" stroke={colors.viridianGreen} strokeWidth={1} />
          <circle cx="960" cy="540" r="100" fill="none" stroke={colors.darkCyra} strokeWidth={1.5} />

          {/* Nodes on outer ring */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x = 960 + Math.cos(angle) * 300;
            const y = 540 + Math.sin(angle) * 300;
            const pulse = interpolate(
              Math.sin(frame * 0.04 + i),
              [-1, 1],
              [6, 10]
            );
            return (
              <circle
                key={`outer-${i}`}
                cx={x}
                cy={y}
                r={pulse}
                fill={colors.tiffanyBlue}
                opacity={0.6}
              />
            );
          })}

          {/* Nodes on middle ring */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 5 + 0.3;
            const x = 960 + Math.cos(angle) * 200;
            const y = 540 + Math.sin(angle) * 200;
            return (
              <circle
                key={`mid-${i}`}
                cx={x}
                cy={y}
                r={7}
                fill={colors.viridianGreen}
                opacity={0.5}
              />
            );
          })}

          {/* Center node */}
          <circle cx="960" cy="540" r={14} fill={colors.darkCyra} opacity={0.4} />

          {/* Connecting lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const outerX = 960 + Math.cos(angle) * 300;
            const outerY = 540 + Math.sin(angle) * 300;
            return (
              <line
                key={`line-${i}`}
                x1={960}
                y1={540}
                x2={outerX}
                y2={outerY}
                stroke={colors.tiffanyBlue}
                strokeWidth={0.5}
                opacity={0.3}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Text content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          paddingBottom: 200,
        }}
      >
        {/* "Performance impresses." */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 64,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          <span style={{ color: colors.chineseSilver }}>Builders chase</span>{" "}
          performance.
        </div>

        {/* "Resilience survives." */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 64,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            marginTop: 20,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: colors.chineseSilver }}>System thinkers build</span>{" "}
          <span style={{ color: colors.caribbeanGreen }}>resilience</span>.
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}, transparent)`,
            marginTop: 40,
            marginBottom: 40,
          }}
        />

        {/* Closing */}
        <div
          style={{
            opacity: closingOpacity,
            transform: `translateY(${closingY}px)`,
            fontSize: 36,
            fontWeight: 700,
            color: colors.corn,
            textAlign: "center",
          }}
        >
          Choose which one you want to be.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
