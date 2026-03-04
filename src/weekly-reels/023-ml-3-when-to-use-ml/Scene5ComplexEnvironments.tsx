import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Network node
const NODES = [
  { x: 540, y: 380, label: "ML" },
  { x: 340, y: 280, label: "" },
  { x: 740, y: 280, label: "" },
  { x: 240, y: 450, label: "" },
  { x: 840, y: 450, label: "" },
  { x: 400, y: 550, label: "" },
  { x: 680, y: 550, label: "" },
  { x: 300, y: 650, label: "" },
  { x: 780, y: 650, label: "" },
  { x: 540, y: 700, label: "" },
];

// Edges connecting nodes
const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 5], [0, 6],
  [1, 3], [1, 5],
  [2, 4], [2, 6],
  [3, 7], [4, 8],
  [5, 7], [5, 9],
  [6, 8], [6, 9],
  [7, 9], [8, 9],
];

export const Scene5ComplexEnvironments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Network entrance
  const networkEntrance = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const networkOpacity = interpolate(networkEntrance, [0, 1], [0, 1]);
  const networkScale = interpolate(networkEntrance, [0, 1], [0.7, 1]);

  // Question marks for uncertainty
  const uncertaintyDelay = 6 * fps;
  const uncertaintyProgress = spring({
    frame,
    fps,
    delay: uncertaintyDelay,
    config: { damping: 200 },
  });
  const uncertaintyOpacity = interpolate(uncertaintyProgress, [0, 1], [0, 1]);

  // "Deploy ML" text
  const deployDelay = 9 * fps;
  const deployProgress = spring({
    frame,
    fps,
    delay: deployDelay,
    config: { damping: 14, stiffness: 80 },
  });
  const deployOpacity = interpolate(deployProgress, [0, 1], [0, 1]);
  const deployScale = interpolate(deployProgress, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 160,
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Complex
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Environments</span>
        </div>

        {/* Network graph */}
        <div
          style={{
            opacity: networkOpacity,
            transform: `scale(${networkScale})`,
          }}
        >
          <svg width="1080" height="800" viewBox="0 0 1080 800" fill="none">
            {/* Edges */}
            {EDGES.map(([from, to], i) => {
              const edgeDelay = 20 + i * 3;
              const edgeOpacity = interpolate(
                frame - edgeDelay,
                [0, 10],
                [0, 0.3],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <line
                  key={`e-${i}`}
                  x1={NODES[from].x}
                  y1={NODES[from].y}
                  x2={NODES[to].x}
                  y2={NODES[to].y}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={1.5}
                  opacity={edgeOpacity}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const nodeDelay = 18 + i * 4;
              const nodeEntrance = spring({
                frame,
                fps,
                delay: nodeDelay,
                config: { damping: 14, stiffness: 100 },
              });
              const nodeScale = interpolate(nodeEntrance, [0, 1], [0, 1]);
              const isCenter = i === 0;
              const nodeRadius = isCenter ? 36 : 14;
              const nodePulse = isCenter
                ? Math.sin(frame * 0.06) * 0.08 + 1
                : 1;
              const nodeColor = isCenter ? colors.tiffanyBlue : colors.rhythm;

              return (
                <g key={`n-${i}`} transform={`translate(${node.x}, ${node.y}) scale(${nodeScale * nodePulse})`}>
                  {isCenter && (
                    <circle
                      r={50}
                      fill={`${colors.tiffanyBlue}08`}
                      stroke={`${colors.tiffanyBlue}20`}
                      strokeWidth={1}
                    />
                  )}
                  <circle
                    r={nodeRadius}
                    fill={`${nodeColor}30`}
                    stroke={nodeColor}
                    strokeWidth={2}
                  />
                  {isCenter && (
                    <text
                      textAnchor="middle"
                      y={7}
                      fontSize="20"
                      fontWeight="700"
                      fill={colors.white}
                    >
                      ML
                    </text>
                  )}
                </g>
              );
            })}

            {/* Floating question marks for uncertainty */}
            {[
              { x: 180, y: 350, size: 36 },
              { x: 900, y: 350, size: 30 },
              { x: 150, y: 600, size: 28 },
              { x: 920, y: 580, size: 32 },
            ].map((q, i) => {
              const float = Math.sin(frame * 0.05 + i * 1.8) * 10;
              return (
                <text
                  key={`q-${i}`}
                  x={q.x}
                  y={q.y + float}
                  fontSize={q.size}
                  fill={colors.corn}
                  opacity={uncertaintyOpacity * 0.5}
                  fontWeight="700"
                  fontFamily={fontFamily}
                >
                  ?
                </text>
              );
            })}
          </svg>
        </div>

        {/* Deploy ML text */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            textAlign: "center",
            opacity: deployOpacity,
            transform: `scale(${deployScale})`,
            lineHeight: 1.3,
            position: "absolute",
            bottom: 380,
          }}
        >
          Deploy Machine Learning
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
