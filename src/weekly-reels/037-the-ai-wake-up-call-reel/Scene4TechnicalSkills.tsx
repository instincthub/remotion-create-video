import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const CARDS = [
  {
    icon: "🤖",
    skill: "AI Literacy",
    description: "Understanding what AI can and cannot do",
    detail: "Evaluate AI outputs critically. Know when to trust — and when to question — what the model says.",
  },
  {
    icon: "🧩",
    skill: "Computational Thinking",
    description: "Breaking problems into solvable steps",
    detail: "Decompose, pattern-match, and abstract. The cognitive toolkit behind every algorithm.",
  },
  {
    icon: "📊",
    skill: "Data Literacy",
    description: "Reading, questioning, and challenging data",
    detail: "Interpret charts, spot bias, and make evidence-based decisions instead of gut-feel ones.",
  },
  {
    icon: "🌐",
    skill: "Digital Fluency",
    description: "Navigating the internet with critical awareness",
    detail: "Use, adapt, and question digital tools — not just follow instructions but truly understand them.",
  },
];

// All 4 cards appear in first ~10s (stagger 2.5s each)
// Then spotlight cycle begins from ~12s
// One full cycle = 4 cards × 8s each = 32s; 2 cycles = 64s; total before is 12s → 12 + 64 = 76s fits in 94s
const CARD_STAGGER_S = 2.5;
const SPOTLIGHT_START_S = 12;
const SPOTLIGHT_HOLD_S = 8; // each card spotlit for 8s
const SPOTLIGHT_CYCLE_CARDS = 4;
const SPOTLIGHT_CYCLE_S = SPOTLIGHT_HOLD_S * SPOTLIGHT_CYCLE_CARDS; // 32s per cycle

export const Scene4TechnicalSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 200 } });

  // Card entrance springs
  const cardProgresses = CARDS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (1 + i * CARD_STAGGER_S)),
      fps,
      config: { damping: 200 },
    })
  );

  // Spotlight logic: which card is active?
  const spotlightFrame = frame - Math.round(fps * SPOTLIGHT_START_S);
  let spotlightCard = -1;
  if (spotlightFrame > 0) {
    const cycleFrame = spotlightFrame % Math.round(fps * SPOTLIGHT_CYCLE_S);
    spotlightCard = Math.floor(cycleFrame / Math.round(fps * SPOTLIGHT_HOLD_S));
  }

  // How far into the current spotlight hold are we? (0–1)
  const spotlightPhase = (() => {
    if (spotlightFrame <= 0) return 0;
    const cycleFrame = spotlightFrame % Math.round(fps * SPOTLIGHT_CYCLE_S);
    const phaseFrame = cycleFrame % Math.round(fps * SPOTLIGHT_HOLD_S);
    return phaseFrame / Math.round(fps * SPOTLIGHT_HOLD_S);
  })();

  // Subtle grid pulse
  const gridOpacity = 0.05 + Math.sin(frame * 0.025) * 0.02;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Tiffany grid overlay */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: gridOpacity }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={140 * i} x2={1080} y2={140 * i}
            stroke={colors.tiffanyBlue} strokeWidth={1} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={108 * i} y1={0} x2={108 * i} y2={1920}
            stroke={colors.tiffanyBlue} strokeWidth={1} />
        ))}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 60px 340px",
          gap: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [20, 0])}px)`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            marginBottom: 40,
          }}
        >
          TECHNICAL SKILLS FOR THE AI ERA
        </div>

        {/* Cards stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CARDS.map((card, i) => {
            const p = cardProgresses[i];
            const xIn = interpolate(p, [0, 1], [-120, 0]);
            const baseOpacity = interpolate(p, [0, 1], [0, 1]);

            // Spotlight effects
            const isSpotlit = spotlightCard === i;
            const isOtherSpotlit = spotlightCard >= 0 && spotlightCard !== i;

            const glowOpacity = isSpotlit
              ? interpolate(spotlightPhase, [0, 0.1, 0.9, 1], [0, 1, 1, 0.6])
              : 0;
            const cardScale = isSpotlit
              ? interpolate(spotlightPhase, [0, 0.15, 0.85, 1], [1, 1.02, 1.02, 1])
              : 1;
            const dimFactor = isOtherSpotlit ? 0.5 : 1;
            const finalOpacity = baseOpacity * dimFactor;

            // Detail text only visible when card is spotlit
            const detailOpacity = isSpotlit
              ? interpolate(spotlightPhase, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
              : 0;

            return (
              <div
                key={i}
                style={{
                  opacity: finalOpacity,
                  transform: `translateX(${xIn}px) scale(${cardScale})`,
                  background: colors.darkSlateGray,
                  borderRadius: 16,
                  padding: "28px 32px",
                  borderLeft: `5px solid ${colors.tiffanyBlue}`,
                  boxShadow: glowOpacity > 0
                    ? `0 0 ${Math.round(40 * glowOpacity)}px ${colors.tiffanyBlue}80`
                    : "none",
                  maxWidth: 960,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
                  <span style={{ fontSize: 36 }}>{card.icon}</span>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: colors.tiffanyBlue,
                    }}
                  >
                    {card.skill}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    color: colors.chineseSilver,
                    lineHeight: 1.5,
                    marginBottom: detailOpacity > 0.05 ? 14 : 0,
                  }}
                >
                  {card.description}
                </div>
                {detailOpacity > 0.05 && (
                  <div
                    style={{
                      opacity: detailOpacity,
                      fontSize: 22,
                      fontWeight: 400,
                      color: colors.rhythm,
                      lineHeight: 1.55,
                      fontStyle: "italic",
                    }}
                  >
                    {card.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 60,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
