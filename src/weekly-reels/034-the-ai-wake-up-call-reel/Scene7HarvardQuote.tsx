import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const QUOTE_LINES = [
  '"The jobs that survive',
  "won't be the ones that",
  'resist AI — but the ones that use it."',
];

const WEF_ROWS = [
  { pct: "47%", label: "tasks done by humans alone" },
  { pct: "30%", label: "tasks: human + AI collaboration" },
  { pct: "22%", label: "tasks handled by tech alone" },
];

export const Scene7HarvardQuote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rule1 = spring({ frame, fps, config: { damping: 200 } });

  const quoteLines = QUOTE_LINES.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (0.5 + i * 2.5)),
      fps,
      config: { damping: 200 },
    })
  );

  const attribution = spring({
    frame: frame - Math.round(fps * 8),
    fps,
    config: { damping: 200 },
  });

  const rule2 = spring({
    frame: frame - Math.round(fps * 10),
    fps,
    config: { damping: 200 },
  });

  const wefTitle = spring({
    frame: frame - Math.round(fps * 13),
    fps,
    config: { damping: 200 },
  });

  const wefRows = WEF_ROWS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (15 + i * 3)),
      fps,
      config: { damping: 12, stiffness: 60 },
    })
  );

  // Radial glow
  const glowPulse = 0.7 + Math.sin(frame * 0.04) * 0.3;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* darkCyra radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${glowPulse})`,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}18 0%, transparent 70%)`,
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
        {/* Top rule */}
        <div
          style={{
            opacity: interpolate(rule1, [0, 1], [0, 1]),
            width: interpolate(rule1, [0, 1], [0, 840]),
            height: 2,
            background: colors.darkCyra,
            borderRadius: 1,
            marginBottom: 32,
          }}
        />

        {/* Quote lines */}
        {QUOTE_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: interpolate(quoteLines[i], [0, 1], [0, 1]),
              transform: `translateY(${interpolate(quoteLines[i], [0, 1], [20, 0])}px)`,
              fontSize: 48,
              fontWeight: 700,
              color: colors.white,
              textAlign: "center",
              lineHeight: 1.35,
              marginBottom: i === QUOTE_LINES.length - 1 ? 24 : 0,
            }}
          >
            {line}
          </div>
        ))}

        {/* Attribution */}
        <div
          style={{
            opacity: interpolate(attribution, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(attribution, [0, 1], [12, 0])}px)`,
            fontSize: 20,
            color: colors.rhythm,
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: 32,
          }}
        >
          — Harvard Business Review, 2026
        </div>

        {/* Bottom rule */}
        <div
          style={{
            opacity: interpolate(rule2, [0, 1], [0, 1]),
            width: interpolate(rule2, [0, 1], [0, 840]),
            height: 2,
            background: colors.darkCyra,
            borderRadius: 1,
            marginBottom: 48,
          }}
        />

        {/* WEF title */}
        <div
          style={{
            opacity: interpolate(wefTitle, [0, 1], [0, 1]),
            fontSize: 16,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 3,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          WEF 2025 TASK SPLIT BY 2030
        </div>

        {/* WEF rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          {WEF_ROWS.map((row, i) => (
            <div
              key={i}
              style={{
                opacity: interpolate(wefRows[i], [0, 1], [0, 1]),
                transform: `scale(${interpolate(wefRows[i], [0, 0.5, 1], [0.8, 1.05, 1])})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "16px 28px",
                background: `${colors.darkSlateGray}CC`,
                borderRadius: 12,
                borderLeft: `4px solid ${colors.tiffanyBlue}`,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: colors.tiffanyBlue,
                  lineHeight: 1,
                  minWidth: 160,
                  textAlign: "right",
                }}
              >
                {row.pct}
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: colors.white,
                  lineHeight: 1.3,
                }}
              >
                {row.label}
              </div>
            </div>
          ))}
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
