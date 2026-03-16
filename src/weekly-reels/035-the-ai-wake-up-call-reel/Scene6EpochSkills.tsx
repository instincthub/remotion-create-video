import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const EPOCH_CARDS = [
  {
    letter: "E",
    skill: "Empathy",
    description: "Understanding others' emotions and perspectives at a human level.",
    example: "A nurse who senses unspoken fear. An engineer who designs for real people.",
  },
  {
    letter: "P",
    skill: "Perspective",
    description: "Seeing a problem from multiple angles — cultural, systemic, and personal.",
    example: "A leader who asks 'who is this leaving out?' before shipping.",
  },
  {
    letter: "O",
    skill: "Originality",
    description: "Creating ideas that didn't exist before — not remixing, but inventing.",
    example: "A student who writes a story no prompt could generate.",
  },
  {
    letter: "C",
    skill: "Connection",
    description: "Building trust, relationships, and meaning between people.",
    example: "A teacher who makes a struggling child feel seen and capable.",
  },
  {
    letter: "H",
    skill: "Human Drive",
    description: "Intrinsic motivation, grit, and the will to push through adversity.",
    example: "An athlete who trains at 5am not because an algorithm said so.",
  },
];

// Each card holds ~7.4s (222f at 30fps) and dims as next enters
// Card starts: 0s, 7.4s, 14.8s, 22.2s, 29.6s
const CARD_HOLD_SECONDS = 7.4;

export const Scene6EpochSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardStartFrames = EPOCH_CARDS.map((_, i) =>
    Math.round(fps * (i * CARD_HOLD_SECONDS))
  );

  // Each card slides in from right, then dims as next enters
  const cardProgresses = EPOCH_CARDS.map((_, i) =>
    spring({
      frame: frame - cardStartFrames[i],
      fps,
      config: { damping: 200 },
    })
  );

  // "All five: GROWTH" appears with last card
  const growthIn = spring({
    frame: frame - cardStartFrames[4] - Math.round(fps * 3),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Which card is active (most recent one with progress > 0.5)
  let activeCard = 0;
  for (let i = EPOCH_CARDS.length - 1; i >= 0; i--) {
    if (cardProgresses[i] > 0.1) {
      activeCard = i;
      break;
    }
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #206D62 0%, ${colors.darkCyra} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* Cards — only active card fully visible, previous dims */}
        <div style={{ position: "relative", width: "100%" }}>
          {EPOCH_CARDS.map((card, i) => {
            const p = cardProgresses[i];
            const isActive = i === activeCard;
            const isPast = i < activeCard;

            const xIn = interpolate(p, [0, 1], [200, 0]);
            const baseOpacity = interpolate(p, [0, 1], [0, 1]);
            const dimOpacity = isPast ? interpolate(cardProgresses[i + 1] || 0, [0, 0.5, 1], [1, 0.3, 0.15], { extrapolateRight: "clamp" }) : 1;
            const cardOpacity = baseOpacity * dimOpacity;

            // Only render if card has started
            if (p < 0.01 && i > 0) return null;

            return (
              <div
                key={i}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: i === 0 ? undefined : 0,
                  left: 0,
                  right: 0,
                  opacity: cardOpacity,
                  transform: `translateX(${xIn}px)`,
                  background: `${colors.gunmetal}E0`,
                  borderRadius: 20,
                  padding: "32px 36px",
                  borderTop: `4px solid ${colors.turkishRose}`,
                  marginBottom: isActive ? 32 : 0,
                }}
              >
                {/* Letter + Skill name row */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 24,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 80,
                      fontWeight: 900,
                      color: colors.turkishRose,
                      lineHeight: 1,
                      minWidth: 72,
                    }}
                  >
                    {card.letter}
                  </div>
                  <div
                    style={{
                      fontSize: 44,
                      fontWeight: 700,
                      color: colors.white,
                      lineHeight: 1.1,
                    }}
                  >
                    {card.skill}
                  </div>
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 400,
                    color: colors.white,
                    lineHeight: 1.55,
                    marginBottom: 16,
                  }}
                >
                  {card.description}
                </div>

                {/* Example */}
                <div
                  style={{
                    fontSize: 18,
                    fontStyle: "italic",
                    color: colors.tiffanyBlue,
                    lineHeight: 1.5,
                  }}
                >
                  {card.example}
                </div>
              </div>
            );
          })}
        </div>

        {/* All five: GROWTH */}
        {growthIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(growthIn, [0, 1], [0, 1]),
              transform: `scale(${interpolate(growthIn, [0, 0.5, 1], [0.8, 1.05, 1])})`,
              marginTop: 360,
              fontSize: 34,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              textAlign: "center",
              letterSpacing: 2,
              textShadow: `0 0 40px ${colors.caribbeanGreen}60`,
            }}
          >
            All five: GROWTH
          </div>
        )}
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
