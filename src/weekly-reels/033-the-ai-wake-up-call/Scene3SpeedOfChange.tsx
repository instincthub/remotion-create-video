import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";
import { Logo } from "./Logo";

const DataStream: React.FC = () => {
  const frame = useCurrentFrame();

  const streams = Array.from({ length: 20 }, (_, i) => ({
    x: 80 + i * 90,
    speed: 1.5 + (i % 3) * 0.8,
    offset: i * 47,
  }));

  return (
    <AbsoluteFill style={{ opacity: 0.15 }}>
      <svg width="1920" height="1080">
        {streams.map((stream, i) => {
          const y = ((frame * stream.speed + stream.offset) % 1200) - 100;
          return (
            <g key={i}>
              <line
                x1={stream.x} y1={y}
                x2={stream.x} y2={y + 80}
                stroke={colors.darkCyra}
                strokeWidth={1.5}
                opacity={0.6}
              />
              <circle
                cx={stream.x} cy={y}
                r={2.5}
                fill={colors.caribbeanGreen}
                opacity={0.8}
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC<{
  year: string;
  percent: number;
  label: string;
  color: string;
  progress: number;
  barWidth: number;
}> = ({ year, percent, label, color, progress, barWidth }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const width = interpolate(progress, [0, 1], [0, barWidth], {
    easing: Easing.out(Easing.exp),
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* Year label */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.chineseSilver,
          width: 80,
          textAlign: "right",
        }}
      >
        {year}
      </div>

      {/* Bar track */}
      <div
        style={{
          flex: 1,
          height: 60,
          background: `${colors.gunmetal}80`,
          borderRadius: 8,
          border: `1px solid ${colors.rhythm}40`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Filled bar */}
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(to right, ${color}80, ${color})`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 16,
          }}
        >
          {width > 8 && (
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: colors.white,
              }}
            >
              {percent}%
            </span>
          )}
        </div>
      </div>

      {/* Percent label beside bar */}
      <div
        style={{
          width: 200,
          fontSize: 18,
          color: `${colors.chineseSilver}80`,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene3SpeedOfChange: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // 2023 bar: fills first
  const bar2023Progress = spring({
    frame: frame - Math.round(fps * 2),
    fps,
    durationInFrames: Math.round(fps * 3),
    config: { damping: 200 },
  });

  // 2024 bar: fills after with dramatic acceleration
  const bar2024Progress = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    durationInFrames: Math.round(fps * 4),
    config: { damping: 20, stiffness: 120 },
  });

  // "16x" badge
  const badgeProgress = spring({
    frame: frame - Math.round(fps * 11),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Context text
  const contextProgress = spring({
    frame: frame - Math.round(fps * 13),
    fps,
    config: { damping: 200 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeProgress, [0, 0.6, 1], [0.5, 1.15, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.gunmetal} 0%, ${colors.darkSlateGray} 100%)`,
        fontFamily,
      }}
    >
      <DataStream />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 160px 240px",
          gap: 48,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.tiffanyBlue,
              letterSpacing: 4,
              marginBottom: 12,
            }}
          >
            THE SPEED OF CHANGE
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: colors.white,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            AI Coding Benchmark Performance
          </div>
          <div
            style={{
              fontSize: 22,
              color: `${colors.chineseSilver}70`,
              marginTop: 8,
            }}
          >
            SWE-bench Verified — Problem-Solving Ability
          </div>
        </div>

        {/* Progress bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <ProgressBar
            year="2023"
            percent={4.4}
            label="4.4% of software engineering problems solved"
            color={colors.rhythm}
            progress={bar2023Progress}
            barWidth={4.4}
          />
          <ProgressBar
            year="2024"
            percent={71.7}
            label="71.7% — in just 12 months"
            color={colors.caribbeanGreen}
            progress={bar2024Progress}
            barWidth={71.7}
          />
        </div>

        {/* 16x badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`,
              background: `linear-gradient(135deg, ${colors.darkCyra}, ${colors.tiffanyBlue})`,
              borderRadius: 16,
              padding: "20px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 80, fontWeight: 900, color: colors.white, lineHeight: 1 }}>
              16×
            </div>
            <div style={{ fontSize: 18, color: `${colors.white}CC`, fontWeight: 700 }}>
              improvement in 12 months
            </div>
          </div>

          <div
            style={{
              opacity: interpolate(contextProgress, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(contextProgress, [0, 1], [30, 0])}px)`,
              maxWidth: 600,
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: colors.white,
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              What took a{" "}
              <span style={{ color: colors.oldRose }}>decade</span>{" "}
              in previous tech revolutions…
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: colors.caribbeanGreen,
              }}
            >
              is now happening in a single year.
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <Logo />
    </AbsoluteFill>
  );
};
