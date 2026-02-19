import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Reward meter bar
const RewardMeter: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
  delay: number;
  isPositive: boolean;
}> = ({ label, value, maxValue, color, delay, isPositive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 80 },
  });
  const barWidth = interpolate(progress, [0, 1], [0, (value / maxValue) * 400]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity,
      }}
    >
      <div
        style={{
          width: 40,
          fontSize: 28,
          textAlign: "center",
          color: isPositive ? colors.caribbeanGreen : colors.oldRose,
          fontWeight: "bold",
        }}
      >
        {isPositive ? "+" : "-"}
      </div>
      <div style={{ width: 140, fontSize: 20, color: colors.gunmetal, fontWeight: "bold" }}>
        {label}
      </div>
      <div
        style={{
          width: 420,
          height: 28,
          borderRadius: 14,
          backgroundColor: `${colors.chineseSilver}30`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: barWidth,
            height: "100%",
            borderRadius: 14,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}40`,
          }}
        />
      </div>
    </div>
  );
};

// Backgammon board simplified
const BackgammonBoard: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  return (
    <svg
      width="360"
      height="280"
      viewBox="0 0 360 280"
      fill="none"
      style={{ opacity }}
    >
      {/* Board outline */}
      <rect x="10" y="10" width="340" height="260" rx="8" stroke={colors.darkCyra} strokeWidth="2.5" fill={`${colors.darkCyra}10`} />
      {/* Center bar */}
      <rect x="172" y="10" width="16" height="260" fill={`${colors.darkCyra}20`} />
      {/* Triangles - top */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 20 + i * 25;
        const isDark = i % 2 === 0;
        return (
          <polygon
            key={`tt-${i}`}
            points={`${x},20 ${x + 25},20 ${x + 12.5},100`}
            fill={isDark ? `${colors.darkCyra}30` : `${colors.americanPurple}30`}
            stroke={`${colors.darkCyra}50`}
            strokeWidth={1}
          />
        );
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 196 + i * 25;
        const isDark = i % 2 === 0;
        return (
          <polygon
            key={`tt2-${i}`}
            points={`${x},20 ${x + 25},20 ${x + 12.5},100`}
            fill={isDark ? `${colors.darkCyra}30` : `${colors.americanPurple}30`}
            stroke={`${colors.darkCyra}50`}
            strokeWidth={1}
          />
        );
      })}
      {/* Triangles - bottom */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 20 + i * 25;
        const isDark = i % 2 === 1;
        return (
          <polygon
            key={`tb-${i}`}
            points={`${x},260 ${x + 25},260 ${x + 12.5},180`}
            fill={isDark ? `${colors.darkCyra}30` : `${colors.americanPurple}30`}
            stroke={`${colors.darkCyra}50`}
            strokeWidth={1}
          />
        );
      })}
      {/* Reward pulse on a piece */}
      {(() => {
        const pulseOpacity = Math.sin(frame * 0.08) * 0.3 + 0.7;
        return (
          <g>
            <circle cx="45" cy="240" r="10" fill={colors.caribbeanGreen} opacity={pulseOpacity} />
            <circle cx="45" cy="220" r="10" fill={colors.caribbeanGreen} opacity={pulseOpacity * 0.8} />
            <circle cx="95" cy="240" r="10" fill={colors.oldRose} opacity={pulseOpacity} />
            <circle cx="220" cy="40" r="10" fill={colors.caribbeanGreen} opacity={pulseOpacity} />
            <circle cx="270" cy="40" r="10" fill={colors.oldRose} opacity={pulseOpacity * 0.8} />
            <circle cx="270" cy="60" r="10" fill={colors.oldRose} opacity={pulseOpacity * 0.6} />
          </g>
        );
      })()}
    </svg>
  );
};

export const Scene4Reinforcement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Era tag
  const eraProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const eraOpacity = interpolate(eraProgress, [0, 1], [0, 1]);

  // Board
  const boardProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 200 },
  });
  const boardOpacity = interpolate(boardProgress, [0, 1], [0, 1]);

  // Credit assignment text
  const creditProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const creditOpacity = interpolate(creditProgress, [0, 1], [0, 1]);
  const creditScale = interpolate(creditProgress, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.darkCyra,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.darkCyra,
        }}
      />

      {/* Era tag */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: eraOpacity,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 40,
            backgroundColor: `${colors.darkCyra}15`,
            border: `2px solid ${colors.darkCyra}40`,
            color: colors.darkCyra,
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          THE 1990s
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 52,
          fontWeight: "bold",
          color: colors.gunmetal,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Reinforcement Learning:{" "}
        <span style={{ color: colors.darkCyra }}>Learning by Playing</span>
      </div>

      {/* Two column layout */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 80,
          right: 80,
          display: "flex",
          gap: 60,
          alignItems: "flex-start",
        }}
      >
        {/* Left: Backgammon + Description */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <BackgammonBoard opacity={boardOpacity} />
          <div
            style={{
              fontSize: 20,
              color: colors.rhythm,
              textAlign: "center",
              opacity: boardOpacity,
              fontWeight: "bold",
            }}
          >
            TD-Gammon learned by playing against itself
          </div>
        </div>

        {/* Right: Reward meters */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.gunmetal,
              marginBottom: 8,
              opacity: titleOpacity,
            }}
          >
            Reward-Based Learning
          </div>

          <RewardMeter
            label="Good Move"
            value={90}
            maxValue={100}
            color={colors.caribbeanGreen}
            delay={3 * fps}
            isPositive
          />
          <RewardMeter
            label="Neutral"
            value={50}
            maxValue={100}
            color={colors.corn}
            delay={3.5 * fps}
            isPositive
          />
          <RewardMeter
            label="Bad Move"
            value={80}
            maxValue={100}
            color={colors.oldRose}
            delay={4 * fps}
            isPositive={false}
          />
          <RewardMeter
            label="Winning"
            value={100}
            maxValue={100}
            color={colors.darkCyra}
            delay={4.5 * fps}
            isPositive
          />
        </div>
      </div>

      {/* Temporal credit assignment box */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 200,
          right: 200,
          padding: "20px 32px",
          borderRadius: 16,
          backgroundColor: `${colors.gunmetal}08`,
          border: `2px solid ${colors.darkCyra}30`,
          opacity: creditOpacity,
          transform: `scale(${creditScale})`,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 22, color: colors.gunmetal }}>
          Solved{" "}
          <span style={{ fontWeight: "bold", color: colors.darkCyra }}>
            temporal credit assignment
          </span>
          : How do you reward the right decision when the result comes much later?
        </span>
      </div>
    </AbsoluteFill>
  );
};
