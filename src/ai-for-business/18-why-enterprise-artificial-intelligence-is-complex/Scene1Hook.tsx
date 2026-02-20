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

  const gridOpacity = interpolate(frame, [0, 60], [0, 0.12], {
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

// Simple neural network graphic
const NeuralNetworkGraphic: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const layers = [
    { x: 300, nodes: 3 },
    { x: 500, nodes: 4 },
    { x: 700, nodes: 4 },
    { x: 900, nodes: 2 },
  ];

  const nodeRadius = 16;
  const startY = 300;
  const spacingY = 80;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
      }}
    >
      <svg width="1920" height="1080">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Connections */}
        {layers.slice(0, -1).map((layer, li) => {
          const nextLayer = layers[li + 1];
          const connections: React.ReactElement[] = [];
          for (let ni = 0; ni < layer.nodes; ni++) {
            for (let nj = 0; nj < nextLayer.nodes; nj++) {
              const y1 =
                startY +
                ni * spacingY -
                ((layer.nodes - 1) * spacingY) / 2;
              const y2 =
                startY +
                nj * spacingY -
                ((nextLayer.nodes - 1) * spacingY) / 2;
              const pulse =
                Math.sin(frame * 0.05 + li * 2 + ni + nj) * 0.4 + 0.6;
              connections.push(
                <line
                  key={`conn-${li}-${ni}-${nj}`}
                  x1={layer.x}
                  y1={y1}
                  x2={nextLayer.x}
                  y2={y2}
                  stroke={colors.darkCyra}
                  strokeWidth={1.5}
                  opacity={pulse * 0.4}
                />,
              );
            }
          }
          return connections;
        })}
        {/* Nodes */}
        {layers.map((layer, li) =>
          Array.from({ length: layer.nodes }).map((_, ni) => {
            const y =
              startY + ni * spacingY - ((layer.nodes - 1) * spacingY) / 2;
            const pulse =
              Math.sin(frame * 0.06 + li * 1.5 + ni * 0.8) * 0.3 + 0.7;
            return (
              <circle
                key={`node-${li}-${ni}`}
                cx={layer.x}
                cy={y}
                r={nodeRadius}
                fill={`${colors.darkCyra}40`}
                stroke={colors.darkCyra}
                strokeWidth={2}
                opacity={pulse}
                filter="url(#nodeGlow)"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Neural network fades in then dims
  const nnOpacity = interpolate(frame, [0, fps, 4 * fps, 6 * fps], [0, 0.6, 0.6, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text entrance
  const textProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [40, 0]);

  // Second line staggers in
  const line2Progress = spring({
    frame,
    fps,
    delay: 4.5 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <AnimatedGrid />
        <NeuralNetworkGraphic opacity={nnOpacity} />
      </AbsoluteFill>

      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1100,
            padding: "0 80px",
          }}
        >
          Training a model is{" "}
          <span style={{ color: colors.caribbeanGreen }}>easy</span>.
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1100,
            padding: "0 80px",
            marginTop: 20,
          }}
        >
          Running it in an enterprise is{" "}
          <span style={{ color: colors.oldRose }}>not</span>.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
