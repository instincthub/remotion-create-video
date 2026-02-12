import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Rising stock chart
const StockChart: React.FC<{ progress: number }> = ({ progress }) => {
  const points = Array.from({ length: 30 }, (_, i) => {
    const t = i / 29;
    const baseY = 180 - t * 150;
    const noise = Math.sin(t * 20) * 8 + Math.sin(t * 12) * 5;
    return { x: 60 + t * 900, y: Math.max(20, baseY + noise) };
  });

  const visibleCount = Math.floor(progress * points.length);
  const visiblePoints = points.slice(0, visibleCount);
  const pathD = visiblePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg width="1020" height="220" viewBox="0 0 1020 220" fill="none">
      {/* Grid */}
      {[50, 100, 150].map((y) => (
        <line key={y} x1="50" y1={y} x2="970" y2={y} stroke={colors.neonGreen} strokeWidth={0.5} opacity={0.1} />
      ))}
      <line x1="50" y1="200" x2="970" y2="200" stroke={colors.neonGreen} strokeWidth={1} opacity={0.2} />
      <line x1="50" y1="10" x2="50" y2="200" stroke={colors.neonGreen} strokeWidth={1} opacity={0.2} />
      {/* Chart line */}
      {visiblePoints.length > 1 && (
        <path d={pathD} stroke={colors.neonGreen} strokeWidth={3} fill="none" strokeLinecap="round" />
      )}
      {/* Glow area under line */}
      {visiblePoints.length > 1 && (
        <path
          d={`${pathD} L ${visiblePoints[visiblePoints.length - 1].x} 200 L ${visiblePoints[0].x} 200 Z`}
          fill={`${colors.neonGreen}15`}
        />
      )}
    </svg>
  );
};

// Floating money/dollar signs
const MoneyParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: 100 + ((i * 157) % 1700),
    startY: 1100,
    speed: 0.6 + (i % 4) * 0.2,
    size: 20 + (i % 3) * 6,
    opacity: 0.15 + (i % 4) * 0.05,
  }));

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = p.startY - frame * p.speed;
        const wrappedY = ((y % 1300) + 1300) % 1300 - 100;
        const swayX = Math.sin((frame * 0.015 + i * 2) * 1.5) * 20;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + swayX,
              top: wrappedY,
              fontSize: p.size,
              color: colors.neonGreen,
              opacity: p.opacity,
              fontWeight: "bold",
              fontFamily,
            }}
          >
            $
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Neural network nodes overlaid on finance
const NeuralOverlay: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 300, y: 250 }, { x: 500, y: 180 }, { x: 700, y: 300 },
    { x: 900, y: 200 }, { x: 1100, y: 280 }, { x: 1300, y: 220 },
    { x: 1500, y: 300 }, { x: 400, y: 400 }, { x: 800, y: 420 },
    { x: 1200, y: 380 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [0, 7], [2, 8], [4, 9], [7, 8], [8, 9],
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {connections.map(([a, b], i) => {
          const pulse = Math.sin((frame * 0.05 + i) * 2) * 0.3 + 0.5;
          return (
            <line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={colors.neonPurple} strokeWidth={1} opacity={pulse}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={4} fill={colors.neonPurple}
            opacity={Math.sin((frame * 0.06 + i) * 2) * 0.3 + 0.7}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene6Comeback: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Chart draws
  const chartProgress = interpolate(
    frame,
    [2 * fps, 16 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Neural overlay fades in
  const neuralOpacity = interpolate(
    frame,
    [6 * fps, 10 * fps],
    [0, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Headline
  const headlineDelay = 8 * fps;
  const headlineProgress = spring({ frame, fps, delay: headlineDelay, config: { damping: 200 } });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        fontFamily,
      }}
    >
      {/* 80s neon gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #1a0030 0%, #0a0a2a 50%, #0a1a1a 100%)`,
        }}
      />

      <MoneyParticles />
      <NeuralOverlay opacity={neuralOpacity} />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "60px 120px",
        }}
      >
        {/* Year + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: colors.neonPurple,
              padding: "8px 24px",
              borderRadius: 30,
              fontSize: 22,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            1980s
          </div>
          <div style={{ fontSize: 20, color: colors.iceGray }}>
            The Comeback
          </div>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: colors.white,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          Wall Street Discovers Neural Networks
        </div>

        {/* Stock chart */}
        <StockChart progress={chartProgress} />

        {/* Headline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.neonGreen,
            opacity: headlineOpacity,
            textAlign: "center",
          }}
        >
          &ldquo;Neural Networks Predict Stock Prices&rdquo;
        </div>

        <div
          style={{
            fontSize: 18,
            color: colors.iceGray,
            opacity: headlineOpacity * 0.7,
            textAlign: "center",
          }}
        >
          Money flowing. Confidence soaring. What could go wrong?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
