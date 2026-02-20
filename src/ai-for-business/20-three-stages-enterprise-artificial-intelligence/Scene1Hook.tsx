import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated data grid background
const DataGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 60], [0, 0.08], {
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

// Laptop with model icon transitioning to enterprise building
const ModelToEnterprise: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [-60, 0]);
  const pulse = Math.sin(frame * 0.06) * 0.12 + 0.88;

  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
      }}
    >
      <svg width="320" height="200" viewBox="0 0 320 200">
        {/* Laptop */}
        <rect
          x={60}
          y={20}
          width={90}
          height={65}
          rx={6}
          fill={`${colors.darkCyra}12`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        <rect
          x={45}
          y={85}
          width={120}
          height={8}
          rx={3}
          fill={`${colors.darkCyra}20`}
          stroke={colors.darkCyra}
          strokeWidth={1.5}
        />
        {/* Brain/model icon on screen */}
        <circle
          cx={105}
          cy={52}
          r={16}
          fill={`${colors.caribbeanGreen}25`}
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
        />
        <path
          d="M97 52 Q105 40 113 52 Q105 64 97 52"
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
        />

        {/* Arrow */}
        <line
          x1={170}
          y1={55}
          x2={200}
          y2={55}
          stroke={colors.darkCyra}
          strokeWidth={2}
          strokeDasharray="4 3"
          opacity={pulse}
        />
        <polygon
          points="200,50 210,55 200,60"
          fill={colors.darkCyra}
          opacity={pulse}
        />

        {/* Enterprise building */}
        <rect
          x={220}
          y={15}
          width={80}
          height={78}
          rx={4}
          fill={`${colors.darkCyra}10`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        {/* Windows */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`w-${row}-${col}`}
              x={232 + col * 22}
              y={25 + row * 22}
              width={14}
              height={12}
              rx={2}
              fill={
                row === 1 && col === 1
                  ? `${colors.caribbeanGreen}40`
                  : `${colors.darkCyra}15`
              }
              stroke={colors.darkCyra}
              strokeWidth={1}
              opacity={
                row === 1 && col === 1
                  ? pulse
                  : 0.5
              }
            />
          )),
        )}
        {/* Door */}
        <rect
          x={250}
          y={75}
          width={20}
          height={18}
          rx={2}
          fill={`${colors.darkCyra}20`}
          stroke={colors.darkCyra}
          strokeWidth={1.5}
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

  // Icon animation
  const iconProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });

  // Line 1: "You built the model."
  const line1Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // Line 2: "Will it survive the real world?"
  const line2Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 6),
    config: { damping: 10, stiffness: 70 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Scale = interpolate(line2Progress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <DataGrid />
      </AbsoluteFill>

      <ModelToEnterprise progress={iconProgress} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 120,
          paddingBottom: 200,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          You built the{" "}
          <span style={{ color: colors.darkCyra }}>model</span>.
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            marginTop: 28,
          }}
        >
          Will it{" "}
          <span style={{ color: colors.oldRose }}>survive</span> the real
          world?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
