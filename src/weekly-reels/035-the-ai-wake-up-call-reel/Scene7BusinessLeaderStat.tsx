import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene7BusinessLeaderStat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 200 } });

  // 83% counts up
  const statIn = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const countValue = Math.round(interpolate(statIn, [0, 1], [0, 83]));

  const descIn = spring({
    frame: frame - Math.round(fps * 2.5),
    fps,
    config: { damping: 200 },
  });

  const arrowIn = spring({
    frame: frame - Math.round(fps * 4),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const sourceIn = spring({
    frame: frame - Math.round(fps * 5.5),
    fps,
    config: { damping: 200 },
  });

  // Arrow pulse
  const arrowPulse = 1 + Math.sin(frame * 0.07) * 0.04;

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Subtle top gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 280,
          background: `linear-gradient(to bottom, ${colors.darkSlateGray}18, transparent)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [20, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: colors.darkCyra,
            letterSpacing: 4,
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          BUSINESS LEADERS SAY
        </div>

        {/* 83% big stat */}
        <div
          style={{
            opacity: interpolate(statIn, [0, 0.1, 1], [0, 1, 1]),
            transform: `scale(${interpolate(statIn, [0, 0.5, 1], [0.7, 1.08, 1])})`,
            fontSize: 180,
            fontWeight: 900,
            color: colors.caribbeanGreen,
            lineHeight: 1,
            letterSpacing: -6,
            textAlign: "center",
            marginBottom: 8,
            textShadow: `0 0 80px ${colors.caribbeanGreen}40`,
          }}
        >
          {countValue}%
        </div>

        {/* Description */}
        <div
          style={{
            opacity: interpolate(descIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(descIn, [0, 1], [20, 0])}px)`,
            fontSize: 26,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 760,
            marginBottom: 56,
          }}
        >
          say human skills like empathy and communication will be MORE valuable as AI takes over routine tasks
        </div>

        {/* Upward arrow */}
        <div
          style={{
            opacity: interpolate(arrowIn, [0, 1], [0, 1]),
            transform: `scale(${arrowPulse})`,
            marginBottom: 40,
          }}
        >
          <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
            <line
              x1={32}
              y1={72}
              x2={32}
              y2={interpolate(arrowIn, [0, 1], [72, 8])}
              stroke={colors.caribbeanGreen}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <polyline
              points={`${interpolate(arrowIn, [0.5, 1], [32, 12], { extrapolateLeft: "clamp" })},${interpolate(arrowIn, [0.5, 1], [72, 8], { extrapolateLeft: "clamp" })} 32,${interpolate(arrowIn, [0.8, 1], [40, 8], { extrapolateLeft: "clamp" })} ${interpolate(arrowIn, [0.5, 1], [32, 52], { extrapolateLeft: "clamp" })},${interpolate(arrowIn, [0.5, 1], [72, 8], { extrapolateLeft: "clamp" })}`}
              stroke={colors.caribbeanGreen}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Source */}
        <div
          style={{
            opacity: interpolate(sourceIn, [0, 1], [0, 1]),
            fontSize: 16,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          PwC GLOBAL WORKFORCE SURVEY · 2025
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.gunmetal}60`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
