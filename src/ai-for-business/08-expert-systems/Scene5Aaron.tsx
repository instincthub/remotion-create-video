import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated paint strokes on canvas
const PaintCanvas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const canvasOpacity = interpolate(frame, [fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Strokes that animate onto the canvas
  const strokes = [
    {
      path: "M 700 350 Q 750 280 850 300 Q 950 320 920 400",
      color: colors.darkCyra,
      delay: 2 * fps,
    },
    {
      path: "M 850 300 Q 900 250 950 280 Q 1000 310 980 360",
      color: colors.tiffanyBlue,
      delay: 3 * fps,
    },
    {
      path: "M 750 400 Q 800 450 900 430 Q 1000 410 1050 450",
      color: colors.caribbeanGreen,
      delay: 4 * fps,
    },
    {
      path: "M 680 450 Q 720 500 800 520 Q 880 540 920 510",
      color: colors.turkishRose,
      delay: 5 * fps,
    },
    {
      path: "M 950 380 Q 1020 420 1080 380 Q 1140 340 1100 280",
      color: colors.viridianGreen,
      delay: 6 * fps,
    },
    {
      path: "M 800 550 Q 860 580 940 560 Q 1020 540 1060 580",
      color: colors.metallicBlue,
      delay: 7 * fps,
    },
    // Abstract face elements
    {
      path: "M 820 330 Q 830 310 850 320",
      color: colors.gunmetal,
      delay: 8 * fps,
    },
    {
      path: "M 900 330 Q 910 310 920 320",
      color: colors.gunmetal,
      delay: 8.5 * fps,
    },
    {
      path: "M 850 370 Q 870 390 890 370",
      color: colors.oldRose,
      delay: 9 * fps,
    },
  ];

  return (
    <AbsoluteFill style={{ opacity: canvasOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Canvas frame */}
        <rect
          x={640}
          y={220}
          width={480}
          height={420}
          fill={`${colors.magnolia}80`}
          stroke={colors.chineseSilver}
          strokeWidth={3}
          rx={2}
        />

        {/* Paint strokes */}
        {strokes.map((stroke, i) => {
          const strokeProgress = interpolate(
            frame,
            [stroke.delay, stroke.delay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <path
              key={`stroke-${i}`}
              d={stroke.path}
              fill="none"
              stroke={stroke.color}
              strokeWidth={i >= 6 ? 3 : 6}
              strokeLinecap="round"
              strokeDasharray={300}
              strokeDashoffset={300 * (1 - strokeProgress)}
              opacity={0.8}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Robotic arm drawing
const RoboticArm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const armOpacity = interpolate(frame, [fps, 2 * fps], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arm swings as it draws
  const armAngle = Math.sin(frame * 0.04) * 15;
  const tipX = 1200 + Math.sin(frame * 0.04) * 50;
  const tipY = 450 + Math.cos(frame * 0.06) * 30;

  return (
    <AbsoluteFill style={{ opacity: armOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Base */}
        <rect
          x={1300}
          y={650}
          width={80}
          height={40}
          rx={4}
          fill={colors.chineseSilver}
          stroke={colors.darkSlateGray}
          strokeWidth={2}
        />
        {/* Arm segment 1 */}
        <line
          x1={1340}
          y1={650}
          x2={1280}
          y2={550}
          stroke={colors.darkSlateGray}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* Joint */}
        <circle cx={1280} cy={550} r={8} fill={colors.darkCyra} />
        {/* Arm segment 2 */}
        <line
          x1={1280}
          y1={550}
          x2={tipX}
          y2={tipY}
          stroke={colors.darkSlateGray}
          strokeWidth={4}
          strokeLinecap="round"
          transform={`rotate(${armAngle}, 1280, 550)`}
        />
        {/* Pen tip */}
        <circle
          cx={tipX}
          cy={tipY}
          r={4}
          fill={colors.darkCyra}
          transform={`rotate(${armAngle}, 1280, 550)`}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene5Aaron: React.FC = () => {
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
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Description
  const descProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const descOpacity = interpolate(descProgress, [0, 1], [0, 1]);

  // Caveat
  const caveatProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const caveatOpacity = interpolate(caveatProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.magnolia} 0%, ${colors.white} 50%, ${colors.magnolia} 100%)`,
        fontFamily,
      }}
    >
      <PaintCanvas />
      <RoboticArm />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          AARON:{" "}
          <span style={{ color: colors.turkishRose }}>The Robotic Artist</span>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: descOpacity,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: colors.rhythm,
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Created physical paintings of people and plants.
          <br />
          Chose subjects and composition autonomously.
        </div>
      </div>

      {/* Caveat */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: caveatOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "14px 28px",
            backgroundColor: `${colors.corn}20`,
            border: `2px solid ${colors.corn}`,
            borderRadius: 10,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.gunmetal,
            }}
          >
            Style and artistic logic were still programmed by humans.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
