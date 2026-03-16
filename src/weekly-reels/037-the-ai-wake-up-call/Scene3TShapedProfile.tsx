import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const BULLET_TECH = [
  "AI & computational thinking",
  "Data literacy & analysis",
  "Digital navigation & safety",
  "Systems reasoning",
];

const BULLET_HUMAN = [
  "Empathy & emotional intelligence",
  "Creative & original thinking",
  "Ethical judgment",
  "Grit & perseverance",
];

export const Scene3TShapedProfile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid lines
  const gridOpacity = interpolate(frame, [0, fps * 1], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // T-shape drawing
  const vertStart = fps * 2;
  const vertProgress = interpolate(
    frame,
    [vertStart, vertStart + fps * 3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const horizStart = vertStart + fps * 3;
  const horizProgress = interpolate(
    frame,
    [horizStart, horizStart + fps * 3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Labels
  const deepLabelProgress = spring({
    frame: frame - (vertStart + fps * 3.5),
    fps,
    config: { damping: 18, stiffness: 75 },
  });
  const broadLabelProgress = spring({
    frame: frame - (horizStart + fps * 3.5),
    fps,
    config: { damping: 18, stiffness: 75 },
  });

  // Intersection dot pulse
  const dotProgress = spring({
    frame: frame - fps * 9,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const dotScale = interpolate(dotProgress, [0, 0.5, 1], [0, 1.4, 1]);
  const dotOpacity = interpolate(dotProgress, [0, 0.1, 1], [0, 1, 1]);

  const advantageProgress = spring({
    frame: frame - fps * 10,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  // Explanation blocks at ~20s
  const techBlockProgress = spring({
    frame: frame - fps * 20,
    fps,
    config: { damping: 16, stiffness: 70 },
  });
  const humanBlockProgress = spring({
    frame: frame - fps * 21,
    fps,
    config: { damping: 16, stiffness: 70 },
  });

  // "Not one or the other" at ~35s
  const bothProgress = spring({
    frame: frame - fps * 35,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // T shape center coords
  const cx = 960;
  const topY = 160;
  const vertHeight = 260;
  const barWidth = 700;
  const barY = topY + 30;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Subtle grid lines */}
      <AbsoluteFill style={{ opacity: gridOpacity, pointerEvents: "none" }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              left: i * 160,
              top: 0,
              width: 1,
              height: "100%",
              background: colors.tiffanyBlue,
            }}
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: i * 155,
              left: 0,
              width: "100%",
              height: 1,
              background: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* T-Shape SVG */}
      <AbsoluteFill style={{ paddingBottom: 220 }}>
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          {/* Vertical bar */}
          <rect
            x={cx - 28}
            y={topY + 30}
            width={56}
            height={(vertHeight - 30) * vertProgress}
            fill={colors.darkCyra}
            rx={4}
          />
          {/* Horizontal bar — extends bidirectionally */}
          <rect
            x={cx - barWidth * horizProgress}
            y={barY}
            width={barWidth * 2 * horizProgress}
            height={56}
            fill={colors.caribbeanGreen}
            rx={4}
          />
          {/* Intersection dot */}
          {dotOpacity > 0 && (
            <circle
              cx={cx}
              cy={barY + 28}
              r={22 * dotScale}
              fill={colors.white}
              opacity={dotOpacity}
            />
          )}
        </svg>

        {/* Deep Expertise label — below vertical bar */}
        <div
          style={{
            position: "absolute",
            left: cx - 180,
            top: topY + 30 + 260,
            width: 360,
            textAlign: "center",
            opacity: interpolate(deepLabelProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(deepLabelProgress, [0, 1], [12, 0])}px)`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.darkCyra,
            fontFamily,
          }}
        >
          Deep Expertise
        </div>

        {/* Broad Human Skills label — right of horizontal bar */}
        <div
          style={{
            position: "absolute",
            right: 100,
            top: barY + 70,
            opacity: interpolate(broadLabelProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(broadLabelProgress, [0, 1], [12, 0])}px)`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
          }}
        >
          Broad Human Skills
        </div>

        {/* "Your Child's Advantage" near intersection */}
        <div
          style={{
            position: "absolute",
            left: cx - 300,
            top: barY - 52,
            width: 600,
            textAlign: "center",
            opacity: interpolate(advantageProgress, [0, 1], [0, 1]),
            fontSize: 26,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
          }}
        >
          Your Child's Advantage
        </div>

        {/* Explanation blocks */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 460,
            right: 80,
            display: "flex",
            flexDirection: "row",
            gap: 40,
          }}
        >
          {/* Technical Fluency block */}
          <div
            style={{
              flex: 1,
              opacity: interpolate(techBlockProgress, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(techBlockProgress, [0, 1], [-30, 0])}px)`,
              background: `${colors.darkSlateGray}CC`,
              borderRadius: 10,
              padding: "24px 28px",
              borderLeft: `4px solid ${colors.tiffanyBlue}`,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.tiffanyBlue, fontFamily, marginBottom: 14 }}>
              Technical Fluency
            </div>
            {BULLET_TECH.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{ width: 8, height: 8, borderRadius: 4, background: colors.tiffanyBlue, flexShrink: 0 }}
                />
                <span style={{ fontSize: 18, color: colors.white, fontFamily, lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* Human Capability block */}
          <div
            style={{
              flex: 1,
              opacity: interpolate(humanBlockProgress, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(humanBlockProgress, [0, 1], [30, 0])}px)`,
              background: `${colors.darkSlateGray}CC`,
              borderRadius: 10,
              padding: "24px 28px",
              borderLeft: `4px solid ${colors.turkishRose}`,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.turkishRose, fontFamily, marginBottom: 14 }}>
              Human Capability
            </div>
            {BULLET_HUMAN.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{ width: 8, height: 8, borderRadius: 4, background: colors.turkishRose, flexShrink: 0 }}
                />
                <span style={{ fontSize: 18, color: colors.white, fontFamily, lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* "Not one or the other. Both." */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(bothProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(bothProgress, [0, 1], [0.95, 1])})`,
            fontSize: 48,
            fontWeight: 900,
            color: colors.white,
            fontFamily,
          }}
        >
          Not one or the other. Both.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
