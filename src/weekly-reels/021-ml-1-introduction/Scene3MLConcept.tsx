import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Traditional coding icon (person + keyboard)
const TraditionalSide: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Code lines being written one by one
  const codeLines = [
    { y: 50, width: 70, delay: 8 },
    { y: 62, width: 50, delay: 14 },
    { y: 74, width: 85, delay: 20 },
    { y: 86, width: 40, delay: 26 },
    { y: 98, width: 65, delay: 32 },
  ];

  return (
    <div style={{ opacity, textAlign: "center" }}>
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
        {/* Monitor */}
        <rect
          x="30"
          y="15"
          width="140"
          height="100"
          rx="6"
          fill={colors.gunmetal}
          stroke={colors.darkSlateGray}
          strokeWidth={2}
        />
        {/* Screen */}
        <rect
          x="38"
          y="23"
          width="124"
          height="80"
          rx="3"
          fill={colors.darkSlateGray}
        />
        {/* Code lines */}
        {codeLines.map((line, i) => {
          const lineProgress = interpolate(
            frame - line.delay,
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <rect
              key={i}
              x="48"
              y={line.y}
              width={line.width * lineProgress}
              height={3}
              rx={1.5}
              fill={colors.oldRose}
              opacity={0.7}
            />
          );
        })}
        {/* Stand */}
        <rect x="85" y="115" width="30" height="8" rx="2" fill={colors.gunmetal} />
        <rect x="75" y="123" width="50" height="5" rx="2" fill={colors.gunmetal} />
        {/* Person icon */}
        <circle cx="100" cy="145" r="7" fill={colors.rhythm} opacity={0.6} />
      </svg>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.oldRose,
          marginTop: 8,
          letterSpacing: 1,
        }}
      >
        EXPLICIT
        <br />
        INSTRUCTIONS
      </div>
    </div>
  );
};

// ML side (brain learning from data)
const MLSide: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Data points flowing into brain
  const dataPoints = [
    { x: 30, y: 40, delay: 10 },
    { x: 170, y: 50, delay: 18 },
    { x: 40, y: 120, delay: 26 },
    { x: 160, y: 110, delay: 22 },
    { x: 100, y: 20, delay: 14 },
  ];

  return (
    <div style={{ opacity, textAlign: "center" }}>
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
        {/* Brain shape */}
        <ellipse
          cx="100"
          cy="80"
          rx="45"
          ry="40"
          fill={`${colors.caribbeanGreen}15`}
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
        />
        {/* Brain detail */}
        <path
          d="M80 80 Q90 60 100 65 Q110 60 120 80 Q125 95 115 105 Q105 110 100 108 Q95 110 85 105 Q75 95 80 80Z"
          fill={`${colors.tiffanyBlue}20`}
          stroke={colors.tiffanyBlue}
          strokeWidth={1}
        />
        {/* Neural glow */}
        <ellipse
          cx="100"
          cy="80"
          rx="55"
          ry="50"
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={1}
          opacity={Math.sin(frame * 0.1) * 0.3 + 0.2}
          strokeDasharray="4 4"
        />

        {/* Data points flowing in */}
        {dataPoints.map((dp, i) => {
          const dpProgress = interpolate(
            frame - dp.delay,
            [0, 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const dx = interpolate(dpProgress, [0, 1], [dp.x, 100]);
          const dy = interpolate(dpProgress, [0, 1], [dp.y, 80]);
          const dpOpacity = dpProgress > 0.9 ? interpolate(dpProgress, [0.9, 1], [0.6, 0]) : 0.6;
          return (
            <circle
              key={i}
              cx={dx}
              cy={dy}
              r={4}
              fill={colors.caribbeanGreen}
              opacity={dpOpacity * dpProgress}
            />
          );
        })}
      </svg>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.caribbeanGreen,
          marginTop: 8,
          letterSpacing: 1,
        }}
      >
        LEARNS FROM
        <br />
        DATA
      </div>
    </div>
  );
};

export const Scene3MLConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  // Left side (Traditional)
  const leftProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 200 },
  });

  // Right side (ML)
  const rightProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });

  // VS badge
  const vsProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 200 },
  });
  const vsScale = interpolate(vsProgress, [0, 1], [0, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 200 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  // Arrow animation
  const arrowProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 200 },
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.magnolia}, ${colors.white}, ${colors.magnolia})`,
        fontFamily,
      }}
    >
      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 20,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            lineHeight: 1.4,
            marginBottom: 20,
          }}
        >
          When you hear
          <br />
          <span style={{ color: colors.darkCyra }}>Machine Learning</span>...
        </div>

        {/* Comparison */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            width: "100%",
          }}
        >
          {/* Traditional */}
          <TraditionalSide progress={leftProgress} />

          {/* VS */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: colors.rhythm,
              transform: `scale(${vsScale})`,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: `${colors.rhythm}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            VS
          </div>

          {/* ML */}
          <MLSide progress={rightProgress} />
        </div>

        {/* Bottom text */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            lineHeight: 1.5,
            marginTop: 30,
            maxWidth: 800,
          }}
        >
          Programming <span style={{ fontWeight: 700, color: colors.darkCyra }}>without</span>
          <br />
          explicitly coding every instruction
        </div>

        {/* Arrow pointing to ML side */}
        <div
          style={{
            opacity: arrowOpacity,
            fontSize: 40,
            color: colors.caribbeanGreen,
          }}
        >
          &#x2192;
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
