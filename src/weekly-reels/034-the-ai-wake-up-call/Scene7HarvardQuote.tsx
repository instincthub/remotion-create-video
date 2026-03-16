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
  "AI will not replace humans.",
  "But humans who use AI",
  "will replace humans who don't.",
];

const WEF_BLOCKS = [
  { pct: "47%", label: "Performed primarily by humans", color: colors.caribbeanGreen },
  { pct: "30%", label: "Human + AI collaboration", color: colors.tiffanyBlue },
  { pct: "22%", label: "Mainly technology alone", color: colors.rhythm },
];

export const Scene7HarvardQuote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Top rule
  const ruleProgress = spring({ frame, fps, config: { damping: 200 } });
  const ruleWidth = interpolate(ruleProgress, [0, 1], [0, 700]);

  // Quote lines appear one by one
  const lineProgresses = QUOTE_LINES.map((_, i) =>
    spring({
      frame: frame - fps * (1 + i * 2.5),
      fps,
      config: { damping: 200 },
    })
  );

  // Attribution
  const attrProgress = spring({
    frame: frame - fps * 9,
    fps,
    config: { damping: 200 },
  });

  // Bottom rule
  const bottomRuleProgress = spring({
    frame: frame - fps * 11,
    fps,
    config: { damping: 200 },
  });
  const bottomRuleWidth = interpolate(bottomRuleProgress, [0, 1], [0, 700]);

  // WEF blocks appear after quote
  const wefProgresses = WEF_BLOCKS.map((_, i) =>
    spring({
      frame: frame - fps * (14 + i * 2),
      fps,
      config: { damping: 14, stiffness: 80 },
    })
  );

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Radial glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${colors.darkCyra}18 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

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
        {/* Top rule */}
        <div
          style={{
            width: ruleWidth,
            height: 2,
            background: colors.darkCyra,
            marginBottom: 32,
          }}
        />

        {/* Quote lines */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {QUOTE_LINES.map((line, i) => {
            const opacity = interpolate(lineProgresses[i], [0, 1], [0, 1]);
            const y = interpolate(lineProgresses[i], [0, 1], [20, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  fontSize: 60,
                  fontWeight: 700,
                  color: colors.white,
                  lineHeight: 1.4,
                  fontFamily,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {/* Attribution */}
        <div
          style={{
            opacity: interpolate(attrProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(attrProgress, [0, 1], [16, 0])}px)`,
            fontSize: 22,
            color: colors.rhythm,
            fontFamily,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          — Harvard Prof. Karim Lakhani
        </div>

        {/* Bottom rule */}
        <div
          style={{
            width: bottomRuleWidth,
            height: 2,
            background: colors.darkCyra,
            marginBottom: 40,
          }}
        />

        {/* WEF 2030 blocks */}
        <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
          {WEF_BLOCKS.map((block, i) => {
            const opacity = interpolate(wefProgresses[i], [0, 1], [0, 1]);
            const y = interpolate(wefProgresses[i], [0, 1], [24, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  background: `${colors.darkSlateGray}CC`,
                  border: `1px solid ${block.color}40`,
                  borderTop: `3px solid ${block.color}`,
                  borderRadius: 10,
                  padding: "20px 28px",
                  textAlign: "center",
                  minWidth: 220,
                }}
              >
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: block.color,
                    lineHeight: 1,
                    fontFamily,
                  }}
                >
                  {block.pct}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: colors.white,
                    marginTop: 10,
                    fontFamily,
                    lineHeight: 1.4,
                  }}
                >
                  {block.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: colors.rhythm,
                    marginTop: 6,
                    fontFamily,
                    letterSpacing: 1,
                  }}
                >
                  WEF 2030
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
