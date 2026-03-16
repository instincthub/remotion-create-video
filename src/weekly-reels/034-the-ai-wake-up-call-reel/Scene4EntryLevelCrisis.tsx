import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const RUNGS = 6;

export const Scene4EntryLevelCrisis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = spring({ frame, fps, config: { damping: 200 } });
  const stat1In = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const ladderIn = spring({
    frame: frame - Math.round(fps * 4),
    fps,
    config: { damping: 200 },
  });
  const stat2In = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const quoteIn = spring({
    frame: frame - Math.round(fps * 10),
    fps,
    config: { damping: 200 },
  });

  // Bottom 3 rungs fade out over 8s starting at frame 4*fps
  const rungFadeStart = Math.round(fps * 5);
  const rungFadeDuration = Math.round(fps * 8);

  // Fire glow pulse at bottom
  const fireGlow = 0.5 + Math.sin(frame * 0.05) * 0.3;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Fire glow at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.oldRose}25 0%, transparent 70%)`,
          opacity: fireGlow,
          pointerEvents: "none",
        }}
      />

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
            transform: `translateY(${interpolate(eyebrow, [0, 1], [16, 0])}px)`,
            fontSize: 18,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          THE ENTRY-LEVEL CRISIS
        </div>

        {/* Stat 1 */}
        <div
          style={{
            opacity: interpolate(stat1In, [0, 0.1, 1], [0, 1, 1]),
            transform: `scale(${interpolate(stat1In, [0, 0.5, 1], [0.7, 1.08, 1])})`,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            66%
          </span>
        </div>
        <div
          style={{
            opacity: interpolate(stat1In, [0.3, 1], [0, 1]),
            fontSize: 28,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 840,
            marginBottom: 4,
          }}
        >
          of enterprises reducing entry-level hiring
        </div>
        <div
          style={{
            opacity: interpolate(stat1In, [0.5, 1], [0, 1]),
            fontSize: 16,
            color: colors.rhythm,
            textAlign: "center",
            marginBottom: 36,
            letterSpacing: 2,
            fontWeight: 700,
          }}
        >
          IDC 2026
        </div>

        {/* Ladder SVG */}
        <div
          style={{
            opacity: interpolate(ladderIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ladderIn, [0, 1], [24, 0])}px)`,
            marginBottom: 36,
          }}
        >
          <svg width="120" height="400" viewBox="0 0 120 400">
            {/* Side rails */}
            <line x1="20" y1="20" x2="20" y2="380" stroke={colors.chineseSilver} strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="20" x2="100" y2="380" stroke={colors.chineseSilver} strokeWidth="6" strokeLinecap="round" />
            {/* Rungs — bottom 3 fade out */}
            {Array.from({ length: RUNGS }, (_, i) => {
              const y = 40 + i * 60;
              const rungIndex = RUNGS - 1 - i; // 0 = bottom rung
              const isBottom3 = rungIndex < 3;
              let rungOpacity = 1;
              if (isBottom3) {
                const fadeOffset = rungIndex * Math.round(fps * 1.5);
                rungOpacity = interpolate(
                  frame - rungFadeStart - fadeOffset,
                  [0, rungFadeDuration * 0.5],
                  [1, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
              }
              return (
                <line
                  key={i}
                  x1="20"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke={isBottom3 ? colors.oldRose : colors.tiffanyBlue}
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity={rungOpacity}
                />
              );
            })}
          </svg>
        </div>

        {/* Stat 2 */}
        <div
          style={{
            opacity: interpolate(stat2In, [0, 0.1, 1], [0, 1, 1]),
            transform: `scale(${interpolate(stat2In, [0, 0.5, 1], [0.7, 1.08, 1])})`,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: colors.oldRose,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            20%
          </span>
        </div>
        <div
          style={{
            opacity: interpolate(stat2In, [0.3, 1], [0, 1]),
            fontSize: 26,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 840,
            marginBottom: 4,
          }}
        >
          of orgs eliminating half of middle management
        </div>
        <div
          style={{
            opacity: interpolate(stat2In, [0.5, 1], [0, 1]),
            fontSize: 16,
            color: colors.rhythm,
            textAlign: "center",
            marginBottom: 32,
            letterSpacing: 2,
            fontWeight: 700,
          }}
        >
          GARTNER
        </div>

        {/* Quote */}
        <div
          style={{
            opacity: interpolate(quoteIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(quoteIn, [0, 1], [16, 0])}px)`,
            fontSize: 28,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            textAlign: "center",
            lineHeight: 1.5,
            fontStyle: "italic",
            maxWidth: 840,
          }}
        >
          "Burning the bottom rungs to heat the house."
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
