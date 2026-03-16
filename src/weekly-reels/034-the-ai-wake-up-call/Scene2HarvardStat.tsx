import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const FallingParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 73 + 40) % 1760 + 80,
    speed: 0.8 + (i % 5) * 0.4,
    offset: (i * 137) % 1080,
    size: 2 + (i % 3),
  }));

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p) => {
        const y = ((frame * p.speed + p.offset) % 1080);
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: colors.rhythm,
              opacity: 0.25,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene2HarvardStat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Eyebrow
  const eyebrowProgress = spring({ frame, fps, config: { damping: 200 } });

  // Big number: count from 20 → 13 over 2s after 1s
  const countStart = fps * 1;
  const countEnd = fps * 3;
  const rawCount = interpolate(frame, [countStart, countEnd], [20, 13], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayCount = Math.round(rawCount);

  // Number spring-in
  const numProgress = spring({
    frame: frame - fps * 1,
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const numScale = interpolate(numProgress, [0, 0.6, 1], [0.5, 1.1, 1]);
  const numOpacity = interpolate(numProgress, [0, 1], [0, 1]);

  // "DROP" label
  const dropProgress = spring({
    frame: frame - fps * 2,
    fps,
    config: { damping: 200 },
  });

  // Stat card
  const cardProgress = spring({
    frame: frame - fps * 4,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
  const cardY = interpolate(cardProgress, [0, 1], [50, 0]);

  return (
    <AbsoluteFill style={{ background: colors.darkSlateGray, fontFamily }}>
      <FallingParticles />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(eyebrowProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrowProgress, [0, 1], [16, 0])}px)`,
            fontSize: 16,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            marginBottom: 24,
            textTransform: "uppercase" as const,
          }}
        >
          The Harvard Research
        </div>

        {/* Big number */}
        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            fontSize: 200,
            fontWeight: 900,
            color: colors.oldRose,
            lineHeight: 1,
            letterSpacing: -6,
          }}
        >
          {displayCount}%
        </div>

        {/* DROP label */}
        <div
          style={{
            opacity: interpolate(dropProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(dropProgress, [0, 1], [20, 0])}px)`,
            fontSize: 48,
            fontWeight: 900,
            color: colors.white,
            letterSpacing: 8,
            marginBottom: 40,
          }}
        >
          DROP
        </div>

        {/* Stat card */}
        <div
          style={{
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
            background: `${colors.gunmetal}CC`,
            borderTop: `3px solid ${colors.darkCyra}`,
            borderRadius: 12,
            padding: "28px 40px",
            maxWidth: 860,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.4,
              marginBottom: 12,
            }}
          >
            White-collar job postings fell 13% after ChatGPT launch
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: colors.chineseSilver,
              marginBottom: 8,
            }}
          >
            Harvard Business School, 2026
          </div>
          <div style={{ fontSize: 14, color: colors.rhythm, letterSpacing: 1 }}>
            SOURCE: Harvard Business School Research
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
