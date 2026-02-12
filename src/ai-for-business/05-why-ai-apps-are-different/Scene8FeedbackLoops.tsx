import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated stock ticker lines forming feedback loops
const StockTicker: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const tickerOpacity = interpolate(frame, [2 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Generate a volatile stock line
  const drawProgress = interpolate(frame, [2.5 * fps, 10 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalPoints = 60;
  const visiblePoints = Math.ceil(drawProgress * totalPoints);

  // Stock price with feedback-driven volatility
  const generateStockPath = () => {
    const points: { x: number; y: number }[] = [];
    let price = 150;
    for (let i = 0; i < totalPoints; i++) {
      const volatility = i > 30 ? 8 : 3; // Volatility increases (feedback loop)
      const trend = i > 40 ? -2 : i > 20 ? 3 : 1;
      price += Math.sin(i * 0.5 + 1) * volatility + trend * 0.3;
      price = Math.max(80, Math.min(250, price));
      points.push({
        x: 60 + i * 13,
        y: 250 - price,
      });
    }
    return points;
  };

  const stockPoints = generateStockPath();
  const visible = stockPoints.slice(0, visiblePoints);

  const path =
    visible.length >= 2
      ? visible
          .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
          .join(" ")
      : "";

  // Feedback loop arrow
  const loopProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 200 },
  });
  const loopOpacity = interpolate(loopProgress, [0, 1], [0, 1]);

  // AI action markers
  const marker1Opacity = interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const marker2Opacity = interpolate(frame, [7 * fps, 8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rapid motion lines at high volatility
  const motionLines = frame > 9 * fps;
  const motionOpacity = motionLines
    ? Math.sin(frame * 0.3) * 0.3 + 0.4
    : 0;

  return (
    <div style={{ position: "relative", width: 900, height: 340, opacity: tickerOpacity }}>
      <svg width="900" height="340" viewBox="0 0 900 340">
        {/* Grid */}
        {[50, 100, 150, 200, 250].map((y) => (
          <line
            key={y}
            x1={50}
            y1={y}
            x2={860}
            y2={y}
            stroke={`${colors.white}10`}
            strokeWidth={0.5}
          />
        ))}

        {/* Stock line */}
        <path
          d={path}
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Volatility zone highlight */}
        {visiblePoints > 30 && (
          <rect
            x={450}
            y={20}
            width={410}
            height={300}
            fill={colors.oldRose}
            opacity={0.06}
            rx={8}
          />
        )}

        {/* AI action marker 1 */}
        <g opacity={marker1Opacity}>
          <circle cx={200} cy={stockPoints[10]?.y || 150} r={8} fill={colors.tiffanyBlue} />
          <text
            x={200}
            y={(stockPoints[10]?.y || 150) - 18}
            fontSize={13}
            fill={colors.tiffanyBlue}
            textAnchor="middle"
            fontFamily={fontFamily}
            fontWeight="bold"
          >
            AI BUYS
          </text>
        </g>

        {/* AI action marker 2 */}
        <g opacity={marker2Opacity}>
          <circle cx={500} cy={stockPoints[34]?.y || 120} r={8} fill={colors.oldRose} />
          <text
            x={500}
            y={(stockPoints[34]?.y || 120) - 18}
            fontSize={13}
            fill={colors.oldRose}
            textAnchor="middle"
            fontFamily={fontFamily}
            fontWeight="bold"
          >
            AI SELLS
          </text>
        </g>

        {/* Feedback loop curved arrow */}
        <g opacity={loopOpacity}>
          <path
            d="M500 280 Q600 320 700 280 Q780 240 700 200 Q620 160 540 200"
            fill="none"
            stroke={colors.corn}
            strokeWidth={2.5}
            strokeDasharray="8 4"
          />
          <polygon
            points="540,195 530,208 548,206"
            fill={colors.corn}
          />
          <text x={620} y={310} fontSize={14} fill={colors.corn} textAnchor="middle" fontWeight="bold">
            FEEDBACK LOOP
          </text>
        </g>

        {/* Motion lines for volatility */}
        {motionLines &&
          [0, 1, 2, 3].map((i) => (
            <line
              key={`motion-${i}`}
              x1={600 + i * 50}
              y1={30 + (frame * 3 + i * 40) % 280}
              x2={620 + i * 50}
              y2={40 + (frame * 3 + i * 40) % 280}
              stroke={colors.oldRose}
              strokeWidth={1.5}
              opacity={motionOpacity}
            />
          ))}
      </svg>
    </div>
  );
};

export const Scene8FeedbackLoops: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);

  // Sub heading
  const subProgress = spring({
    frame,
    fps,
    delay: 1 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Bottom warning
  const warningProgress = spring({
    frame,
    fps,
    delay: 10 * fps,
    config: { damping: 200 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, #1a2530 0%, ${colors.gunmetal} 100%)`,
        fontFamily,
      }}
    >
      {/* Heading */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: colors.white,
            opacity: headingOpacity,
          }}
        >
          AI{" "}
          <span style={{ color: colors.caribbeanGreen }}>changes</span>{" "}
          its environment
        </div>
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            opacity: subOpacity,
            marginTop: 10,
          }}
        >
          Feedback loops
        </div>
      </div>

      {/* Stock ticker visualization */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StockTicker frame={frame} fps={fps} />
      </div>

      {/* Bottom warning */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: warningOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 22,
            color: colors.oldRose,
            fontWeight: "bold",
          }}
        >
          Sometimes they spiral out of control
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: colors.oldRose,
          transform: `scaleX(${interpolate(frame, [fps, 12 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
