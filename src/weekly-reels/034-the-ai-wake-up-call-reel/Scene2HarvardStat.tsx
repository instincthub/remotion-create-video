import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2HarvardStat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = spring({ frame, fps, config: { damping: 200 } });
  const statIn = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const dropIn = spring({
    frame: frame - Math.round(fps * 2),
    fps,
    config: { damping: 200 },
  });
  const cardIn = spring({
    frame: frame - Math.round(fps * 4.5),
    fps,
    config: { damping: 200 },
  });

  // Countdown: 20 → 13
  const countValue = Math.round(interpolate(statIn, [0, 1], [20, 13]));

  // Falling dots
  const dots = Array.from({ length: 30 }, (_, i) => {
    const x = (i % 6) * 180 + 60;
    const baseY = Math.floor(i / 6) * 320 + 100;
    const y = ((baseY + frame * (1.5 + (i % 3) * 0.5)) % 1820) + 80;
    return { x, y, i };
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.darkSlateGray,
        fontFamily,
      }}
    >
      {/* Falling dots */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.12 }}
      >
        {dots.map(({ x, y, i }) => (
          <circle key={i} cx={x} cy={y} r={3} fill={colors.tiffanyBlue} />
        ))}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(eyebrow, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrow, [0, 1], [20, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          HARVARD BUSINESS SCHOOL 2026
        </div>

        {/* Big stat counter */}
        <div
          style={{
            opacity: interpolate(statIn, [0, 0.1, 1], [0, 1, 1]),
            transform: `scale(${interpolate(statIn, [0, 0.5, 1], [0.5, 1.1, 1])})`,
            fontSize: 180,
            fontWeight: 900,
            color: colors.oldRose,
            lineHeight: 1,
            letterSpacing: -6,
            textAlign: "center",
          }}
        >
          {countValue}%
        </div>

        {/* DROP label */}
        <div
          style={{
            opacity: interpolate(dropIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(dropIn, [0, 1], [20, 0])}px)`,
            fontSize: 80,
            fontWeight: 900,
            color: colors.oldRose,
            letterSpacing: 8,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          DROP
        </div>

        {/* Stat card */}
        <div
          style={{
            opacity: interpolate(cardIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardIn, [0, 1], [24, 0])}px)`,
            background: `${colors.gunmetal}CC`,
            border: `1px solid ${colors.rhythm}40`,
            borderRadius: 16,
            padding: "28px 36px",
            textAlign: "center",
            maxWidth: 840,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.4,
              marginBottom: 12,
            }}
          >
            White-collar job postings fell after ChatGPT launch
          </div>
          <div
            style={{
              fontSize: 18,
              color: colors.rhythm,
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            Harvard Business School · 2026
          </div>
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
