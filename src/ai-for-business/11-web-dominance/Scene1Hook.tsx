import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated network lines in background
const NetworkLines: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = [
    { x: 200, y: 150 },
    { x: 500, y: 300 },
    { x: 800, y: 120 },
    { x: 1100, y: 280 },
    { x: 1400, y: 160 },
    { x: 1700, y: 320 },
    { x: 350, y: 600 },
    { x: 700, y: 750 },
    { x: 1050, y: 680 },
    { x: 1350, y: 800 },
    { x: 1600, y: 700 },
    { x: 250, y: 900 },
    { x: 600, y: 950 },
    { x: 960, y: 500 },
    { x: 1250, y: 550 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 10],
    [11, 12], [1, 6], [2, 13], [3, 14],
    [7, 13], [8, 14], [13, 14], [0, 6],
    [4, 10], [5, 10], [11, 6],
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {connections.map(([a, b], i) => {
          const drawProgress = interpolate(
            frame,
            [5 + i * 2, 30 + i * 2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const n1 = nodes[a];
          const n2 = nodes[b];
          return (
            <line
              key={`conn-${i}`}
              x1={n1.x}
              y1={n1.y}
              x2={n1.x + (n2.x - n1.x) * drawProgress}
              y2={n1.y + (n2.y - n1.y) * drawProgress}
              stroke={colors.tiffanyBlue}
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}
        {nodes.map((node, i) => {
          const pulse = Math.sin(frame * 0.04 + i * 0.8) * 2 + 4;
          const nodeOpacity = interpolate(
            frame,
            [10 + i * 2, 25 + i * 2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              <circle cx={node.x} cy={node.y} r={pulse} fill={colors.tiffanyBlue} opacity={0.3} />
              <circle cx={node.x} cy={node.y} r={2} fill={colors.tiffanyBlue} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Animated search bar with typing effect
const SearchBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 100 },
  });
  const barOpacity = interpolate(barProgress, [0, 1], [0, 1]);
  const barScale = interpolate(barProgress, [0, 1], [0.8, 1]);

  const query = "When was Neil Armstrong born?";
  const typingStart = 2 * fps;
  const charsPerFrame = 0.4;
  const charsVisible = Math.min(
    Math.max(Math.floor((frame - typingStart) * charsPerFrame), 0),
    query.length
  );
  const displayedText = query.slice(0, charsVisible);
  const showCursor = frame > typingStart && frame % 16 < 10;

  // Answer appears after typing completes
  const typingEnd = typingStart + query.length / charsPerFrame;
  const answerProgress = spring({
    frame,
    fps,
    delay: typingEnd + fps,
    config: { damping: 10, stiffness: 80 },
  });
  const answerOpacity = interpolate(answerProgress, [0, 1], [0, 1]);
  const answerY = interpolate(answerProgress, [0, 1], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
      }}
    >
      {/* Search bar */}
      <div
        style={{
          opacity: barOpacity,
          transform: `scale(${barScale})`,
          background: `${colors.white}15`,
          borderRadius: 40,
          padding: "20px 36px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          border: `1px solid ${colors.tiffanyBlue}40`,
          minWidth: 600,
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Search icon */}
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle
            cx={12}
            cy={12}
            r={9}
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={2.5}
          />
          <line
            x1={19}
            y1={19}
            x2={26}
            y2={26}
            stroke={colors.tiffanyBlue}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            fontSize: 26,
            color: colors.white,
            fontFamily,
            minHeight: 36,
          }}
        >
          {displayedText}
          {showCursor && (
            <span style={{ color: colors.tiffanyBlue }}>|</span>
          )}
        </div>
      </div>

      {/* Answer card */}
      <div
        style={{
          opacity: answerOpacity,
          transform: `translateY(${answerY}px)`,
          marginTop: 24,
          background: `${colors.white}12`,
          borderRadius: 16,
          padding: "16px 32px",
          border: `1px solid ${colors.caribbeanGreen}40`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.caribbeanGreen,
            fontFamily,
          }}
        >
          August 5th, 1930
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title text
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.darkSlateGray} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <NetworkLines />
      </AbsoluteFill>

      {/* Title at top */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1000,
            paddingBottom: 200,
          }}
        >
          Why does web AI feel{" "}
          <span style={{ color: colors.tiffanyBlue }}>so powerful</span>?
        </div>
      </div>

      <SearchBar />
    </AbsoluteFill>
  );
};
