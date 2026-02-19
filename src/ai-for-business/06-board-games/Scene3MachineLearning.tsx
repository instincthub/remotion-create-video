import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Vintage computer SVG
const VintageComputer: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="280"
    height="240"
    viewBox="0 0 280 240"
    fill="none"
    style={{ opacity }}
  >
    {/* Monitor */}
    <rect x="30" y="10" width="220" height="160" rx="10" stroke={colors.white} strokeWidth="3" fill="none" />
    <rect x="50" y="30" width="180" height="120" rx="4" fill={`${colors.metallicBlue}40`} stroke={colors.white} strokeWidth="1.5" />
    {/* Screen lines (retro) */}
    <line x1="60" y1="60" x2="160" y2="60" stroke={colors.caribbeanGreen} strokeWidth="2" opacity={0.7} />
    <line x1="60" y1="80" x2="200" y2="80" stroke={colors.caribbeanGreen} strokeWidth="2" opacity={0.5} />
    <line x1="60" y1="100" x2="140" y2="100" stroke={colors.caribbeanGreen} strokeWidth="2" opacity={0.6} />
    <line x1="60" y1="120" x2="180" y2="120" stroke={colors.caribbeanGreen} strokeWidth="2" opacity={0.4} />
    {/* Stand */}
    <rect x="110" y="170" width="60" height="15" rx="2" fill="none" stroke={colors.white} strokeWidth="2" />
    <rect x="90" y="185" width="100" height="8" rx="2" fill="none" stroke={colors.white} strokeWidth="2" />
    {/* Keyboard */}
    <rect x="40" y="210" width="200" height="25" rx="4" fill="none" stroke={colors.white} strokeWidth="2" />
    {/* Keys */}
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={56 + i * 22} y={216} width={16} height={12} rx={2} fill={`${colors.white}20`} stroke={colors.white} strokeWidth={0.5} />
    ))}
  </svg>
);

// Checkers piece animation
const CheckersPiece: React.FC<{
  x: number;
  y: number;
  delay: number;
  color: string;
}> = ({ x, y, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 10, stiffness: 150 },
  });
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const pieceOpacity = interpolate(progress, [0, 1], [0, 0.9]);

  return (
    <circle
      cx={x}
      cy={y}
      r={20}
      fill={color}
      opacity={pieceOpacity}
      transform={`translate(${x}, ${y}) scale(${scale}) translate(${-x}, ${-y})`}
    />
  );
};

export const Scene3MachineLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Era badge
  const badgeProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.5, 1]);

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Computer visual
  const computerProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const computerOpacity = interpolate(computerProgress, [0, 1], [0, 1]);

  // Description text
  const descProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const descOpacity = interpolate(descProgress, [0, 1], [0, 1]);
  const descY = interpolate(descProgress, [0, 1], [30, 0]);

  // Key term highlight
  const termProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const termScale = interpolate(termProgress, [0, 1], [0.8, 1]);
  const termOpacity = interpolate(termProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.metallicBlue}, ${colors.policeBlue})`,
        fontFamily,
      }}
    >
      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.white}10 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Era badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "10px 32px",
            borderRadius: 40,
            backgroundColor: `${colors.americanPurple}80`,
            border: `2px solid ${colors.americanPurple}`,
            color: colors.magnolia,
            fontSize: 24,
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          THE 1950s
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: "bold",
          color: colors.white,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span style={{ color: colors.caribbeanGreen }}>Machine Learning</span>{" "}
        is Born
      </div>

      {/* Two column layout */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 100,
          right: 100,
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
        }}
      >
        {/* Left: Computer + Checkers */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <VintageComputer opacity={computerOpacity} />

          {/* Animated checkers board (mini) */}
          <svg width="240" height="240" viewBox="0 0 240 240" style={{ opacity: computerOpacity }}>
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isDark = (row + col) % 2 === 1;
              return (
                <rect
                  key={i}
                  x={col * 30}
                  y={row * 30}
                  width={30}
                  height={30}
                  fill={isDark ? `${colors.americanPurple}60` : `${colors.white}10`}
                  stroke={`${colors.white}15`}
                  strokeWidth={0.5}
                />
              );
            })}
            {/* Animated pieces */}
            <CheckersPiece x={45} y={15} delay={3 * fps} color={colors.oldRose} />
            <CheckersPiece x={105} y={15} delay={3.3 * fps} color={colors.oldRose} />
            <CheckersPiece x={165} y={15} delay={3.6 * fps} color={colors.oldRose} />
            <CheckersPiece x={15} y={225} delay={4 * fps} color={colors.tiffanyBlue} />
            <CheckersPiece x={75} y={225} delay={4.3 * fps} color={colors.tiffanyBlue} />
            <CheckersPiece x={135} y={225} delay={4.6 * fps} color={colors.tiffanyBlue} />
          </svg>
        </div>

        {/* Right: Description */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: colors.magnolia,
              lineHeight: 1.6,
              opacity: descOpacity,
              transform: `translateY(${descY}px)`,
            }}
          >
            <span style={{ fontWeight: "bold", color: colors.white }}>
              Arthur Samuel
            </span>{" "}
            built a checkers program and introduced a revolutionary idea:
          </div>

          <div
            style={{
              fontSize: 28,
              color: colors.chineseSilver,
              lineHeight: 1.6,
              opacity: descOpacity,
              transform: `translateY(${descY}px)`,
            }}
          >
            Instead of programming every move, he let the computer{" "}
            <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
              learn from experience
            </span>
            .
          </div>

          {/* Key term card */}
          <div
            style={{
              marginTop: 20,
              padding: "20px 28px",
              borderRadius: 16,
              backgroundColor: `${colors.darkCyra}25`,
              border: `2px solid ${colors.darkCyra}50`,
              opacity: termOpacity,
              transform: `scale(${termScale})`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: colors.tiffanyBlue,
                fontWeight: "bold",
                marginBottom: 6,
              }}
            >
              Key Insight
            </div>
            <div style={{ fontSize: 24, color: colors.white, lineHeight: 1.5 }}>
              The computer could eventually play{" "}
              <span style={{ color: colors.corn }}>better than its creator</span>.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
