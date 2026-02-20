import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Decision tree node positions (pre-computed for determinism)
const TREE_NODES = [
  // Level 0 (root)
  { x: 960, y: 180, level: 0 },
  // Level 1
  { x: 600, y: 320, level: 1 },
  { x: 1320, y: 320, level: 1 },
  // Level 2
  { x: 400, y: 460, level: 2 },
  { x: 720, y: 460, level: 2 },
  { x: 1160, y: 460, level: 2 },
  { x: 1500, y: 460, level: 2 },
  // Level 3
  { x: 320, y: 580, level: 3 },
  { x: 480, y: 580, level: 3 },
  { x: 640, y: 580, level: 3 },
  { x: 800, y: 580, level: 3 },
  { x: 1080, y: 580, level: 3 },
  { x: 1240, y: 580, level: 3 },
  { x: 1420, y: 580, level: 3 },
  { x: 1580, y: 580, level: 3 },
];

// Parent-child connections
const TREE_EDGES: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [1, 4],
  [2, 5], [2, 6],
  [3, 7], [3, 8],
  [4, 9], [4, 10],
  [5, 11], [5, 12],
  [6, 13], [6, 14],
];

export const Scene5Unpredictability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title with glitch
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Glitch effect on title
  const glitchCycle = Math.floor(frame * 0.3) % 20;
  const isGlitching = glitchCycle < 2 && frame > fps && frame < 14 * fps;
  const glitchX = isGlitching ? ((frame * 7) % 9) - 4 : 0;
  const glitchColor = isGlitching ? colors.oldRose : colors.white;

  // Tree expansion - levels appear progressively
  const levelDelays = [fps, 2 * fps, 3.5 * fps, 5 * fps];

  const nodeSprings = TREE_NODES.map((node) =>
    spring({
      frame,
      fps,
      delay: levelDelays[node.level],
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // Warning badges flicker
  const warningNodes: Record<number, boolean> = { 7: true, 10: true, 13: true };
  const warningOpacity = interpolate(
    frame,
    [8 * fps, 9 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom warning text
  const warningTextProgress = spring({
    frame,
    fps,
    delay: 9 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const warningTextOpacity = interpolate(warningTextProgress, [0, 1], [0, 1]);

  // Subtle screen flicker
  const flickerOpacity = isGlitching ? 0.03 : 0;

  return (
    <AbsoluteFill
      style={{
        background: colors.darkCharcoal,
        fontFamily,
      }}
    >
      {/* Flicker overlay */}
      <AbsoluteFill
        style={{
          background: colors.oldRose,
          opacity: flickerOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateX(${glitchX}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: glitchColor,
          }}
        >
          Unpredictability{" "}
          <span style={{ color: colors.oldRose }}>Increases Risk</span>
        </div>
      </div>

      {/* Decision tree */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880">
          <defs>
            <filter id="warningGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {TREE_EDGES.map(([from, to], i) => {
            const parentNode = TREE_NODES[from];
            const childNode = TREE_NODES[to];
            const edgeEntrance = nodeSprings[to];
            const edgeOpacity = interpolate(edgeEntrance, [0, 1], [0, 0.6]);

            return (
              <line
                key={`edge-${i}`}
                x1={parentNode.x}
                y1={parentNode.y}
                x2={childNode.x}
                y2={childNode.y}
                stroke={colors.darkCyra}
                strokeWidth={2}
                opacity={edgeOpacity}
              />
            );
          })}

          {/* Nodes */}
          {TREE_NODES.map((node, i) => {
            const entrance = nodeSprings[i];
            const nodeOpacity = interpolate(entrance, [0, 1], [0, 1]);
            const nodeScale = interpolate(entrance, [0, 1], [0.3, 1]);
            const isWarning = warningNodes[i];
            const nodeColor = isWarning && warningOpacity > 0.5
              ? colors.oldRose
              : colors.darkCyra;
            const nodeSize = node.level === 0 ? 22 : node.level === 1 ? 18 : node.level === 2 ? 14 : 10;

            return (
              <g
                key={`node-${i}`}
                opacity={nodeOpacity}
                transform={`translate(${node.x}, ${node.y}) scale(${nodeScale}) translate(${-node.x}, ${-node.y})`}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize}
                  fill={`${nodeColor}30`}
                  stroke={nodeColor}
                  strokeWidth={2}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize * 0.4}
                  fill={nodeColor}
                  opacity={0.8}
                />
                {/* Warning indicator */}
                {isWarning && warningOpacity > 0 && (
                  <g opacity={warningOpacity}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeSize + 8}
                      fill="none"
                      stroke={colors.oldRose}
                      strokeWidth={2}
                      opacity={0.5 + Math.sin(frame * 0.15) * 0.3}
                      filter="url(#warningGlow)"
                    />
                    <text
                      x={node.x}
                      y={node.y + nodeSize + 22}
                      textAnchor="middle"
                      fill={colors.oldRose}
                      fontSize={12}
                      fontFamily={fontFamily}
                      fontWeight={700}
                    >
                      ?
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Bottom warning text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: warningTextOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${colors.oldRose}15`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.oldRose}40`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              color: colors.white,
              fontWeight: 700,
            }}
          >
            You cannot test every possible outcome
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
