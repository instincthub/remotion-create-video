import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated grid pattern
const AnimatedGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 60], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  // Vertical lines
  for (let x = 0; x <= 1920; x += 120) {
    lines.push({ x1: x, y1: 0, x2: x, y2: 1080 });
  }
  // Horizontal lines
  for (let y = 0; y <= 1080; y += 120) {
    lines.push({ x1: 0, y1: y, x2: 1920, y2: y });
  }

  return (
    <AbsoluteFill style={{ opacity: gridOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {lines.map((l, i) => {
          const pulse = Math.sin((frame * 0.03 + i * 0.4) * 2) * 0.3 + 0.7;
          return (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={colors.tiffanyBlue}
              strokeWidth={0.5}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Board game SVG representations that crossfade
const GameBoards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardSize = 320;
  const cx = 960;
  const cy = 540;
  const startX = cx - boardSize / 2;
  const startY = cy + 100;

  // Cycle through 3 boards: checkers, chess, Go
  const cycleDuration = 4 * fps; // 4 seconds per board
  const phase = (frame / cycleDuration) % 3;

  const checkersOpacity = phase < 1
    ? interpolate(phase, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    : 0;
  const chessOpacity = phase >= 1 && phase < 2
    ? interpolate(phase - 1, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    : 0;
  const goOpacity = phase >= 2
    ? interpolate(phase - 2, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    : 0;

  const boardEnter = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cellSize = boardSize / 8;

  return (
    <AbsoluteFill style={{ opacity: boardEnter * 0.6 }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id="boardGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Checkers board */}
        <g opacity={checkersOpacity} filter="url(#boardGlow)">
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;
            return (
              <rect
                key={`ch-${i}`}
                x={startX + col * cellSize}
                y={startY + row * cellSize}
                width={cellSize}
                height={cellSize}
                fill={isDark ? colors.americanPurple : `${colors.magnolia}40`}
                stroke={`${colors.tiffanyBlue}30`}
                strokeWidth={0.5}
              />
            );
          })}
          {/* Checkers pieces */}
          {[
            { row: 0, col: 1 }, { row: 0, col: 3 }, { row: 0, col: 5 },
            { row: 7, col: 0 }, { row: 7, col: 2 }, { row: 7, col: 4 },
          ].map((p, i) => (
            <circle
              key={`cp-${i}`}
              cx={startX + p.col * cellSize + cellSize / 2}
              cy={startY + p.row * cellSize + cellSize / 2}
              r={cellSize / 3}
              fill={i < 3 ? colors.oldRose : colors.tiffanyBlue}
              opacity={0.8}
            />
          ))}
        </g>

        {/* Chess board */}
        <g opacity={chessOpacity} filter="url(#boardGlow)">
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;
            return (
              <rect
                key={`cs-${i}`}
                x={startX + col * cellSize}
                y={startY + row * cellSize}
                width={cellSize}
                height={cellSize}
                fill={isDark ? colors.deepGreenCyanTurquoise : `${colors.magnolia}40`}
                stroke={`${colors.tiffanyBlue}30`}
                strokeWidth={0.5}
              />
            );
          })}
          {/* Chess piece symbols */}
          {[
            { row: 0, col: 4, piece: "\u265A" },
            { row: 0, col: 3, piece: "\u265B" },
            { row: 7, col: 4, piece: "\u2654" },
            { row: 7, col: 3, piece: "\u2655" },
          ].map((p, i) => (
            <text
              key={`csp-${i}`}
              x={startX + p.col * cellSize + cellSize / 2}
              y={startY + p.row * cellSize + cellSize / 2 + 8}
              textAnchor="middle"
              fontSize={30}
              fill={colors.white}
            >
              {p.piece}
            </text>
          ))}
        </g>

        {/* Go board */}
        <g opacity={goOpacity} filter="url(#boardGlow)">
          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => {
            const offset = (boardSize / 8) * i;
            return (
              <g key={`go-line-${i}`}>
                <line
                  x1={startX + offset}
                  y1={startY}
                  x2={startX + offset}
                  y2={startY + boardSize}
                  stroke={`${colors.tiffanyBlue}60`}
                  strokeWidth={1}
                />
                <line
                  x1={startX}
                  y1={startY + offset}
                  x2={startX + boardSize}
                  y2={startY + offset}
                  stroke={`${colors.tiffanyBlue}60`}
                  strokeWidth={1}
                />
              </g>
            );
          })}
          {/* Go stones */}
          {[
            { row: 2, col: 3, color: colors.white },
            { row: 3, col: 4, color: colors.gunmetal },
            { row: 4, col: 3, color: colors.gunmetal },
            { row: 3, col: 2, color: colors.white },
            { row: 5, col: 5, color: colors.white },
          ].map((s, i) => (
            <circle
              key={`gs-${i}`}
              cx={startX + s.col * cellSize}
              cy={startY + s.row * cellSize}
              r={cellSize / 2.5}
              fill={s.color}
              opacity={0.85}
            />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text
  const textProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const textScale = interpolate(textProgress, [0, 1], [0.6, 1]);
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.americanPurple}, ${colors.gunmetal})`,
        fontFamily,
      }}
    >
      <AnimatedGrid />
      <GameBoards />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          transform: `scale(${zoom})`,
          zIndex: 1,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1200,
            textShadow: `0 0 40px ${colors.americanPurple}80`,
          }}
        >
          What if the future of{" "}
          <span style={{ color: colors.tiffanyBlue }}>
            Artificial Intelligence
          </span>
          <br />
          started with a{" "}
          <span style={{ color: colors.caribbeanGreen }}>board game</span>?
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.chineseSilver,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
          }}
        >
          For over 70 years, games have been AI&apos;s secret training ground.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
