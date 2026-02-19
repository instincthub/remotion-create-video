import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Neural network with dynamically connecting nodes
const NeuralNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  const layers = [
    [{ x: 200, y: 300 }, { x: 200, y: 450 }, { x: 200, y: 600 }, { x: 200, y: 750 }],
    [{ x: 450, y: 250 }, { x: 450, y: 400 }, { x: 450, y: 550 }, { x: 450, y: 700 }, { x: 450, y: 820 }],
    [{ x: 700, y: 300 }, { x: 700, y: 450 }, { x: 700, y: 600 }, { x: 700, y: 750 }],
    [{ x: 950, y: 350 }, { x: 950, y: 525 }, { x: 950, y: 700 }],
    [{ x: 1200, y: 450 }, { x: 1200, y: 600 }],
  ];

  const networkOpacity = interpolate(frame, [0, 60], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connections between layers
  const connections: { from: { x: number; y: number }; to: { x: number; y: number }; idx: number }[] = [];
  let idx = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    for (const from of layers[l]) {
      for (const to of layers[l + 1]) {
        connections.push({ from, to, idx });
        idx++;
      }
    }
  }

  return (
    <AbsoluteFill style={{ opacity: networkOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id="alphaGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines with animated data flow */}
        {connections.map((conn, i) => {
          const connectionAppear = interpolate(
            frame,
            [30 + i * 0.5, 60 + i * 0.5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const pulse = Math.sin((frame * 0.04 + i * 0.3) * 2) * 0.3 + 0.5;

          return (
            <line
              key={`conn-${i}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.from.x + (conn.to.x - conn.from.x) * connectionAppear}
              y2={conn.from.y + (conn.to.y - conn.from.y) * connectionAppear}
              stroke={colors.tiffanyBlue}
              strokeWidth={0.8}
              opacity={pulse * connectionAppear}
            />
          );
        })}

        {/* Nodes */}
        {([] as { x: number; y: number }[]).concat(...layers).map((node, i) => {
          const nodeAppear = interpolate(frame, [20 + i * 2, 40 + i * 2], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = Math.sin((frame * 0.06 + i * 0.5) * 2) * 0.2 + 0.8;

          return (
            <g key={`node-${i}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={14}
                fill={colors.darkCyra}
                opacity={nodeAppear * pulse * 0.15}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill={colors.caribbeanGreen}
                opacity={nodeAppear * pulse}
                filter="url(#alphaGlow)"
              />
            </g>
          );
        })}

        {/* Data flow dots */}
        {connections
          .filter((_, i) => i % 5 === 0)
          .map((conn, i) => {
            const t = ((frame * 0.02 + i * 0.15) % 1);
            const dotX = conn.from.x + (conn.to.x - conn.from.x) * t;
            const dotY = conn.from.y + (conn.to.y - conn.from.y) * t;
            const dotAppear = frame > 60 ? 1 : 0;

            return (
              <circle
                key={`dot-${i}`}
                cx={dotX}
                cy={dotY}
                r={3}
                fill={colors.caribbeanGreen}
                opacity={dotAppear * 0.7}
              />
            );
          })}
      </svg>
    </AbsoluteFill>
  );
};

// Go board with expanding branching tree
const GoBoardTree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardAppear = interpolate(frame, [2 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridSize = 9;
  const cellSize = 28;
  const boardWidth = gridSize * cellSize;
  const offsetX = 1920 - boardWidth - 140;
  const offsetY = 300;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: boardAppear * 0.6,
      }}
    >
      {/* Grid lines */}
      {Array.from({ length: gridSize }).map((_, i) => (
        <g key={`go-grid-${i}`}>
          <line
            x1={offsetX + i * cellSize}
            y1={offsetY}
            x2={offsetX + i * cellSize}
            y2={offsetY + boardWidth - cellSize}
            stroke={`${colors.tiffanyBlue}40`}
            strokeWidth={0.8}
          />
          <line
            x1={offsetX}
            y1={offsetY + i * cellSize}
            x2={offsetX + boardWidth - cellSize}
            y2={offsetY + i * cellSize}
            stroke={`${colors.tiffanyBlue}40`}
            strokeWidth={0.8}
          />
        </g>
      ))}

      {/* Stones appearing over time */}
      {[
        { row: 3, col: 3, color: colors.white, delay: 3 },
        { row: 3, col: 5, color: colors.gunmetal, delay: 3.5 },
        { row: 5, col: 4, color: colors.white, delay: 4 },
        { row: 4, col: 3, color: colors.gunmetal, delay: 4.5 },
        { row: 4, col: 5, color: colors.white, delay: 5 },
        { row: 2, col: 4, color: colors.gunmetal, delay: 5.5 },
        { row: 5, col: 6, color: colors.white, delay: 6 },
        { row: 6, col: 3, color: colors.gunmetal, delay: 6.5 },
      ].map((stone, i) => {
        const stoneProgress = spring({
          frame,
          fps,
          delay: stone.delay * fps,
          config: { damping: 10, stiffness: 200 },
        });
        const stoneScale = interpolate(stoneProgress, [0, 1], [0, 1]);

        return (
          <circle
            key={`stone-${i}`}
            cx={offsetX + stone.col * cellSize}
            cy={offsetY + stone.row * cellSize}
            r={cellSize / 2.5}
            fill={stone.color}
            opacity={stoneScale * 0.85}
            transform={`translate(${offsetX + stone.col * cellSize}, ${offsetY + stone.row * cellSize}) scale(${stoneScale}) translate(${-(offsetX + stone.col * cellSize)}, ${-(offsetY + stone.row * cellSize)})`}
          />
        );
      })}

      {/* Branch lines showing possible moves */}
      {[
        { x1: offsetX + 4 * cellSize, y1: offsetY + 4 * cellSize, x2: offsetX + 4 * cellSize - 60, y2: offsetY + 4 * cellSize - 80 },
        { x1: offsetX + 4 * cellSize, y1: offsetY + 4 * cellSize, x2: offsetX + 4 * cellSize + 50, y2: offsetY + 4 * cellSize - 70 },
        { x1: offsetX + 4 * cellSize, y1: offsetY + 4 * cellSize, x2: offsetX + 4 * cellSize + 80, y2: offsetY + 4 * cellSize + 20 },
      ].map((branch, i) => {
        const branchProgress = interpolate(
          frame,
          [7 * fps + i * 10, 8 * fps + i * 10],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const pulse = Math.sin((frame * 0.08 + i) * 2) * 0.3 + 0.7;

        return (
          <line
            key={`branch-${i}`}
            x1={branch.x1}
            y1={branch.y1}
            x2={branch.x1 + (branch.x2 - branch.x1) * branchProgress}
            y2={branch.y1 + (branch.y2 - branch.y1) * branchProgress}
            stroke={colors.caribbeanGreen}
            strokeWidth={2}
            opacity={branchProgress * pulse}
            strokeDasharray="6 4"
          />
        );
      })}
    </svg>
  );
};

export const Scene6AlphaGo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Era badge
  const badgeProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.7, 1]);

  // AlphaGo description
  const alphaDesc = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const alphaOpacity = interpolate(alphaDesc, [0, 1], [0, 1]);
  const alphaY = interpolate(alphaDesc, [0, 1], [30, 0]);

  // AlphaZero section
  const zeroProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const zeroOpacity = interpolate(zeroProgress, [0, 1], [0, 1]);
  const zeroScale = interpolate(zeroProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${colors.darkCyra}, ${colors.gunmetal} 70%)`,
        fontFamily,
      }}
    >
      <NeuralNetwork />
      <GoBoardTree />

      {/* Content overlay */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        {/* Era badge */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: badgeOpacity,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "8px 24px",
              borderRadius: 40,
              backgroundColor: `${colors.caribbeanGreen}20`,
              border: `2px solid ${colors.caribbeanGreen}50`,
              color: colors.caribbeanGreen,
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 3,
            }}
          >
            2016
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 64,
            fontWeight: "bold",
            color: colors.white,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textShadow: `0 0 40px ${colors.darkCyra}60`,
          }}
        >
          <span style={{ color: colors.caribbeanGreen }}>AlphaGo</span> Changes
          Everything
        </div>

        {/* AlphaGo description - left side */}
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 100,
            width: 700,
            opacity: alphaOpacity,
            transform: `translateY(${alphaY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: colors.white,
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            AlphaGo defeated{" "}
            <span style={{ fontWeight: "bold", color: colors.tiffanyBlue }}>
              Lee Sedol
            </span>{" "}
            in the game of Go.
          </div>
          <div
            style={{
              fontSize: 26,
              color: colors.chineseSilver,
              lineHeight: 1.6,
            }}
          >
            Go has hundreds of possible moves at each turn. Brute force alone
            would not work. AlphaGo used{" "}
            <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
              deep neural networks
            </span>
            .
          </div>
        </div>

        {/* AlphaZero card */}
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 100,
            width: 680,
            padding: "28px 36px",
            borderRadius: 20,
            backgroundColor: `${colors.gunmetal}90`,
            border: `2px solid ${colors.caribbeanGreen}40`,
            backdropFilter: "blur(10px)",
            opacity: zeroOpacity,
            transform: `scale(${zeroScale})`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: colors.caribbeanGreen,
              marginBottom: 12,
            }}
          >
            Then came AlphaZero
          </div>
          <div
            style={{
              fontSize: 24,
              color: colors.magnolia,
              lineHeight: 1.6,
            }}
          >
            No human training data. Just the rules of the game. It learned{" "}
            <span style={{ color: colors.corn, fontWeight: "bold" }}>
              everything from scratch
            </span>{" "}
            and dominated previous systems.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
