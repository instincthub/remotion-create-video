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

// Card start times: E at 1s, P at 19s, O at 37s, C at 55s, H at 73s
const CARD_START_SECONDS = [1, 19, 37, 55, 73];

export const Scene6EpochSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardStartFrames = CARD_START_SECONDS.map((s) => Math.round(fps * s));

  // Each card slides in from right
  const cardProgresses = EPOCH_CARDS.map((_, i) =>
    spring({
      frame: frame - cardStartFrames[i],
      fps,
      config: { damping: 200 },
    })
  );

  // "All five: GROWTH" appears 3s after last card
  const growthIn = spring({
    frame: frame - cardStartFrames[4] - Math.round(fps * 3),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Which card is active (last one that has started)
  let activeCard = 0;
  for (let i = EPOCH_CARDS.length - 1; i >= 0; i--) {
    if (cardProgresses[i] > 0.1) {
      activeCard = i;
      break;
    }
  }

  // Background gradient subtly cycles
  const gradientShift = interpolate(
    frame,
    [0, Math.round(fps * 109)],
    [0, 20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${160 + gradientShift}deg, #206D62 0%, ${colors.darkCyra} 100%)`,
        fontFamily,
      }}
    >
      {/* Progress dots at top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {EPOCH_CARDS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === activeCard ? 32 : 12,
              height: 12,
              borderRadius: 6,
              background: i === activeCard ? colors.turkishRose : `${colors.white}40`,
            }}
          />
        ))}
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 60px 340px",
          gap: 0,
        }}
      >
        {/* Cards — stacked, only active fully visible */}
        <div style={{ position: "relative", width: "100%", maxWidth: 960 }}>
          {EPOCH_CARDS.map((card, i) => {
            const p = cardProgresses[i];
            const isActive = i === activeCard;
            const isPast = i < activeCard;

            const xIn = interpolate(p, [0, 1], [200, 0]);
            const baseOpacity = interpolate(p, [0, 1], [0, 1]);
            const dimOpacity = isPast
              ? interpolate(
                  cardProgresses[i + 1] || 0,
                  [0, 0.5, 1],
                  [1, 0.3, 0.15],
                  { extrapolateRight: "clamp" }
                )
              : 1;
            const cardOpacity = baseOpacity * dimOpacity;

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
                  padding: "36px 40px",
                  borderTop: `4px solid ${colors.turkishRose}`,
                  marginBottom: isActive ? 28 : 0,
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
                      fontSize: 100,
                      fontWeight: 900,
                      color: colors.turkishRose,
                      lineHeight: 1,
                      minWidth: 80,
                    }}
                  >
                    {card.letter}
                  </div>
                  <div
                    style={{
                      fontSize: 52,
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
                    fontSize: 28,
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
                    fontSize: 24,
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
              marginTop: 320,
              fontSize: 36,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              textAlign: "center",
              letterSpacing: 2,
              textShadow: `0 0 40px ${colors.caribbeanGreen}60`,
            }}
          >
            Every single one: associated with GROWTH.
          </div>
        )}
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
