import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated grid background
const AnimatedGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 60], [0, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const verticalLines = [];
  for (let x = 0; x <= 1920; x += 120) {
    verticalLines.push(x);
  }
  const horizontalLines = [];
  for (let y = 0; y <= 1080; y += 120) {
    horizontalLines.push(y);
  }

  return (
    <AbsoluteFill style={{ opacity: gridOpacity }}>
      <svg width="1920" height="1080">
        {verticalLines.map((x, i) => {
          const pulse =
            Math.sin((frame * 0.02 + i * 0.5) * 2) * 0.3 + 0.7;
          return (
            <line
              key={`v-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={1080}
              stroke={colors.darkCyra}
              strokeWidth={1}
              opacity={pulse}
            />
          );
        })}
        {horizontalLines.map((y, i) => {
          const pulse =
            Math.sin((frame * 0.02 + i * 0.7) * 2) * 0.3 + 0.7;
          return (
            <line
              key={`h-${i}`}
              x1={0}
              y1={y}
              x2={1920}
              y2={y}
              stroke={colors.darkCyra}
              strokeWidth={1}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Model deployment icon that drops in
const ModelIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [-80, 0]);
  const pulse = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <div
      style={{
        position: "absolute",
        top: 180,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
      }}
    >
      <svg width="200" height="160" viewBox="0 0 200 160">
        {/* Server rack */}
        <rect
          x={40}
          y={10}
          width={120}
          height={140}
          rx={8}
          fill={`${colors.darkCyra}15`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        {/* Server slots */}
        {[0, 1, 2].map((i) => (
          <g key={`slot-${i}`}>
            <rect
              x={55}
              y={25 + i * 42}
              width={90}
              height={30}
              rx={4}
              fill={`${colors.darkCyra}10`}
              stroke={colors.darkCyra}
              strokeWidth={1.5}
            />
            {/* Status LED */}
            <circle
              cx={130}
              cy={40 + i * 42}
              r={4}
              fill={i === 1 ? colors.limeGreen : colors.darkCyra}
              opacity={i === 1 ? pulse : 0.4}
            />
            {/* Lines representing data */}
            <line
              x1={62}
              y1={40 + i * 42}
              x2={115}
              y2={40 + i * 42}
              stroke={colors.darkCyra}
              strokeWidth={2}
              opacity={0.3}
            />
          </g>
        ))}
        {/* Checkmark overlay */}
        <circle
          cx={155}
          cy={30}
          r={18}
          fill={colors.limeGreen}
          opacity={pulse}
        />
        <polyline
          points="146,30 153,37 165,23"
          fill="none"
          stroke={colors.white}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Model icon drops in
  const iconProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });

  // Line 1: "You deployed a model."
  const line1Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1.5),
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // Line 2: "So you're done?"
  const line2Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 14, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Line 3: "Not even close."
  const line3Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 8),
    config: { damping: 10, stiffness: 70 },
  });
  const line3Opacity = interpolate(line3Progress, [0, 1], [0, 1]);
  const line3Scale = interpolate(line3Progress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <AnimatedGrid />
      </AbsoluteFill>

      {/* Model deployment icon */}
      <ModelIcon progress={iconProgress} />

      {/* Text content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          paddingTop: 100,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          You deployed a model.{" "}
          <span style={{ color: colors.limeGreen }}>It works.</span>
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            marginTop: 24,
          }}
        >
          So you are{" "}
          <span style={{ color: colors.darkCyra }}>done</span>?
        </div>

        <div
          style={{
            opacity: line3Opacity,
            transform: `scale(${line3Scale})`,
            fontSize: 60,
            fontWeight: 700,
            color: colors.oldRose,
            textAlign: "center",
            lineHeight: 1.4,
            marginTop: 32,
          }}
        >
          Not even close.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
