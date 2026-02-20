import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated neural-to-enterprise grid background
const NeuralGrid: React.FC = () => {
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

  // Neural nodes at grid intersections
  const nodes: Array<{ x: number; y: number }> = [];
  for (let x = 240; x <= 1680; x += 240) {
    for (let y = 240; y <= 840; y += 240) {
      nodes.push({ x, y });
    }
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
        {/* Neural nodes at intersections */}
        {nodes.map((node, i) => {
          const pulse =
            Math.sin(frame * 0.04 + i * 0.9) * 0.4 + 0.6;
          return (
            <circle
              key={`n-${i}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill={colors.tiffanyBlue}
              opacity={pulse}
            />
          );
        })}
        {/* Connection lines between adjacent nodes */}
        {nodes.map((node, i) => {
          const nextNode = nodes[i + 1];
          if (!nextNode || Math.abs(node.y - nextNode.y) > 240) return null;
          const pulse =
            Math.sin(frame * 0.03 + i * 0.5) * 0.3 + 0.4;
          return (
            <line
              key={`c-${i}`}
              x1={node.x}
              y1={node.y}
              x2={nextNode.x}
              y2={nextNode.y}
              stroke={colors.tiffanyBlue}
              strokeWidth={1}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Abstract enterprise building silhouette
const EnterpriseSilhouette: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [-50, 0]);
  const pulse = Math.sin(frame * 0.05) * 0.1 + 0.9;

  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
      }}
    >
      <svg width="360" height="200" viewBox="0 0 360 200">
        {/* Main building */}
        <rect
          x={120}
          y={20}
          width={120}
          height={160}
          rx={4}
          fill={`${colors.darkCyra}10`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        {/* Left wing */}
        <rect
          x={40}
          y={60}
          width={80}
          height={120}
          rx={4}
          fill={`${colors.darkCyra}08`}
          stroke={colors.darkCyra}
          strokeWidth={1.5}
        />
        {/* Right wing */}
        <rect
          x={240}
          y={60}
          width={80}
          height={120}
          rx={4}
          fill={`${colors.darkCyra}08`}
          stroke={colors.darkCyra}
          strokeWidth={1.5}
        />
        {/* Windows on main building */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`w-${row}-${col}`}
              x={135 + col * 30}
              y={35 + row * 32}
              width={18}
              height={14}
              rx={2}
              fill={
                (row + col) % 3 === 0
                  ? `${colors.caribbeanGreen}35`
                  : `${colors.darkCyra}15`
              }
              stroke={colors.darkCyra}
              strokeWidth={1}
              opacity={
                (row + col) % 3 === 0 ? pulse : 0.5
              }
            />
          )),
        )}
        {/* AI brain icon on top */}
        <circle
          cx={180}
          cy={10}
          r={14}
          fill={`${colors.caribbeanGreen}20`}
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
          opacity={pulse}
        />
        <path
          d="M173 10 Q180 0 187 10 Q180 20 173 10"
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
          opacity={pulse}
        />
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 12 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Building icon
  const iconProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });

  // Line 1: "Artificial Intelligence is exciting."
  const line1Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // Line 2: "But are you ready to build?"
  const line2Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
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
        <NeuralGrid />
      </AbsoluteFill>

      <EnterpriseSilhouette progress={iconProgress} />

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
          Artificial Intelligence is{" "}
          <span style={{ color: colors.darkCyra }}>exciting</span>.
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
          But are you ready to{" "}
          <span style={{ color: colors.caribbeanGreen }}>build</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
