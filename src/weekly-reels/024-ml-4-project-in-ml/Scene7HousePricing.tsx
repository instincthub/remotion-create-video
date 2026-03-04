import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// House with price tag icon
const HouseIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 10, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const float = Math.sin(frame * 0.04) * 5;
  const pulse = Math.sin(frame * 0.06) * 0.04 + 1;

  return (
    <div style={{ opacity, transform: `scale(${scale * pulse}) translateY(${float}px)` }}>
      <svg width="300" height="280" viewBox="0 0 300 280" fill="none">
        {/* House body */}
        <rect
          x="70"
          y="130"
          width="160"
          height="120"
          rx="4"
          fill={`${colors.corn}10`}
          stroke={colors.corn}
          strokeWidth={2.5}
        />
        {/* Roof */}
        <path
          d="M50 135 L150 50 L250 135"
          stroke={colors.corn}
          strokeWidth={3}
          fill={`${colors.corn}08`}
          strokeLinejoin="round"
        />
        {/* Door */}
        <rect x="130" y="180" width="40" height="70" rx="4" fill={`${colors.corn}20`} stroke={colors.corn} strokeWidth={1.5} />
        <circle cx="162" cy="215" r={3} fill={colors.corn} />
        {/* Window left */}
        <rect x="85" y="155" width="30" height="30" rx="3" fill={`${colors.corn}15`} stroke={colors.corn} strokeWidth={1.5} />
        <line x1="100" y1="155" x2="100" y2="185" stroke={colors.corn} strokeWidth={1} opacity={0.5} />
        <line x1="85" y1="170" x2="115" y2="170" stroke={colors.corn} strokeWidth={1} opacity={0.5} />
        {/* Window right */}
        <rect x="185" y="155" width="30" height="30" rx="3" fill={`${colors.corn}15`} stroke={colors.corn} strokeWidth={1.5} />
        <line x1="200" y1="155" x2="200" y2="185" stroke={colors.corn} strokeWidth={1} opacity={0.5} />
        <line x1="185" y1="170" x2="215" y2="170" stroke={colors.corn} strokeWidth={1} opacity={0.5} />
        {/* Chimney */}
        <rect x="195" y="60" width="25" height="50" rx="3" fill={`${colors.corn}15`} stroke={colors.corn} strokeWidth={1.5} />

        {/* Price tag */}
        <g transform="translate(230, 80)">
          <rect x="0" y="0" width="65" height="32" rx="8" fill={colors.limeGreen} />
          <text x="32" y="22" fontSize="16" fontWeight="700" fill={colors.gunmetal} textAnchor="middle">
            $$$
          </text>
        </g>

        {/* Decorative sparkles */}
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2 + frame * 0.03;
          const cx = 150 + Math.cos(angle) * 140;
          const cy = 140 + Math.sin(angle) * 120;
          const sparkleOpacity = Math.sin(frame * 0.1 + i * 2) * 0.3 + 0.4;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={3}
              fill={colors.corn}
              opacity={sparkleOpacity}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Rising chart
const PriceChart: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const drawProgress = interpolate(
    frame - delay,
    [0, 50],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ opacity }}>
      <svg width="600" height="200" viewBox="0 0 600 200" fill="none">
        {/* Axes */}
        <line x1="60" y1="170" x2="560" y2="170" stroke={colors.rhythm} strokeWidth={1.5} />
        <line x1="60" y1="170" x2="60" y2="20" stroke={colors.rhythm} strokeWidth={1.5} />

        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="60"
            y1={170 - (i + 1) * 35}
            x2="560"
            y2={170 - (i + 1) * 35}
            stroke={`${colors.rhythm}20`}
            strokeWidth={1}
          />
        ))}

        {/* Chart line - rising trend */}
        <path
          d="M80 150 L160 130 L240 140 L320 100 L400 80 L480 50 L540 30"
          stroke={colors.limeGreen}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={600}
          strokeDashoffset={600 * (1 - drawProgress)}
        />

        {/* Area fill */}
        <path
          d="M80 150 L160 130 L240 140 L320 100 L400 80 L480 50 L540 30 L540 170 L80 170 Z"
          fill={`${colors.limeGreen}08`}
          opacity={drawProgress}
        />

        {/* Data points */}
        {[
          { x: 80, y: 150 },
          { x: 160, y: 130 },
          { x: 240, y: 140 },
          { x: 320, y: 100 },
          { x: 400, y: 80 },
          { x: 480, y: 50 },
          { x: 540, y: 30 },
        ].map((pt, i) => {
          const pointProgress = interpolate(
            drawProgress,
            [i / 7, (i + 1) / 7],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={5}
              fill={colors.limeGreen}
              opacity={pointProgress}
            />
          );
        })}

        {/* Labels */}
        <text x="310" y="195" fontSize="14" fill={colors.chineseSilver} textAnchor="middle">
          Features (size, location, year...)
        </text>
        <text x="30" y="95" fontSize="14" fill={colors.chineseSilver} textAnchor="middle" transform="rotate(-90, 30, 95)">
          Price
        </text>
      </svg>
    </div>
  );
};

export const Scene7HousePricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge
  const badgeEntrance = spring({ frame, fps, delay: 5, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0, 1]);

  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // "Big win" text
  const winDelay = 6 * fps;
  const winProgress = spring({ frame, fps, delay: winDelay, config: { damping: 200 } });
  const winOpacity = interpolate(winProgress, [0, 1], [0, 1]);
  const winScale = interpolate(winProgress, [0, 1], [0.8, 1]);

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
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 30,
          paddingRight: 30,
          gap: 16,
        }}
      >
        {/* "#3" badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `${colors.corn}20`,
            border: `2px solid ${colors.corn}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.corn,
          }}
        >
          #3
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          House Price
          <br />
          <span style={{ color: colors.corn }}>Prediction</span>
        </div>

        <HouseIcon />

        {/* Chart */}
        <PriceChart delay={2 * fps} />

        {/* Big win badge */}
        <div
          style={{
            opacity: winOpacity,
            transform: `scale(${winScale})`,
            padding: "12px 28px",
            borderRadius: 14,
            background: `${colors.limeGreen}12`,
            border: `1.5px solid ${colors.limeGreen}40`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L15 9 L22 9 L16 14 L18 22 L12 17 L6 22 L8 14 L2 9 L9 9 Z" fill={colors.limeGreen} opacity={0.8} />
          </svg>
          <span style={{ fontSize: 20, fontWeight: 700, color: colors.limeGreen }}>
            Big Win for Realtors
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
