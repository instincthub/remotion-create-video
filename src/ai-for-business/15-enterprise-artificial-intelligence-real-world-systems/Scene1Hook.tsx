import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Abstract data lines background
  const lineOpacity = interpolate(frame, [0, fps], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title: "AI Is Not Just Chatbots"
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Subtitle: "Enterprise Systems. Real Money."
  const subProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  // Counting numbers animation
  const countStart = 2 * fps;
  const countValue = interpolate(
    frame,
    [countStart, countStart + 4 * fps],
    [0, 47000000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const countOpacity = interpolate(frame, [countStart, countStart + fps], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.magnolia} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {/* Abstract data lines */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0, opacity: lineOpacity }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 80 + i * 85;
            const dashOffset = interpolate(frame, [0, 15 * fps], [0, -200]);
            return (
              <line
                key={`line-${i}`}
                x1={0}
                y1={y}
                x2={1920}
                y2={y}
                stroke={colors.darkCyra}
                strokeWidth={1}
                strokeDasharray="12 24"
                strokeDashoffset={dashOffset + i * 20}
              />
            );
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 200 + i * 220;
            return (
              <line
                key={`vline-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={1080}
                stroke={colors.darkCyra}
                strokeWidth={0.5}
                opacity={0.5}
              />
            );
          })}
        </svg>

        {/* Floating counter in background */}
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 140,
            fontWeight: 700,
            color: colors.darkCyra,
            opacity: countOpacity,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          ${Math.floor(countValue).toLocaleString()}
        </div>
      </AbsoluteFill>

      {/* Main text content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          paddingBottom: 80,
          paddingTop: 160,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 64,
            fontWeight: 700,
            color: colors.gunmetal,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Artificial Intelligence Is{" "}
          <span style={{ color: colors.darkCyra }}>Not Just Chatbots</span>
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 42,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Enterprise Systems.{" "}
          <span style={{ color: colors.caribbeanGreen }}>Real Money.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
