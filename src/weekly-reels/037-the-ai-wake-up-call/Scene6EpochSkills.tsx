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
    letter: "E",
    name: "Empathy",
    description: "Genuinely understanding what another person feels, reading the room",
    example: "What a doctor brings to the bedside that no algorithm can.",
    closing: null,
  },
  {
    letter: "P",
    name: "Perspective",
    description: "Ethical judgement and moral reasoning from multiple angles",
    example: "What leaders carry that AI cannot.",
    closing: null,
  },
  {
    letter: "O",
    name: "Originality",
    description: "Genuinely novel ideas from lived experience and imagination",
    example: "What the next generation of creators will be valued for.",
    closing: null,
  },
  {
    letter: "C",
    name: "Connection",
    description: "Inspiring others, building trust, communicating a vision",
    example: "What great teachers, coaches, and founders do.",
    closing: null,
  },
  {
    letter: "H",
    name: "Human Drive",
    description: "Grit and perseverance through failure and disappointment",
    example: "AI does not know what it means to struggle. Your child does.",
    closing: "Every single one: associated with GROWTH.",
  },
];

// Card start frames (in scene-local frames) per spec
const CARD_START_FRAMES = [30, 570, 1110, 1650, 2190];

const EpochCard: React.FC<{
  card: typeof CARDS[0];
  frame: number;
  fps: number;
  startFrame: number;
  isActive: boolean;
  cardIndex: number;
  activeIndex: number;
}> = ({ card, frame, fps, startFrame, isActive, cardIndex, activeIndex }) => {
  const enterProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 75 },
  });

  const opacity = interpolate(enterProgress, [0, 1], [0, isActive ? 1 : 0.25]);
  const tx = interpolate(enterProgress, [0, 1], [240, 0]);

  // Closing line scale-up for card H
  const closingProgress = spring({
    frame: frame - (startFrame + fps * 4),
    fps,
    config: { damping: 16, stiffness: 70 },
  });
  const closingScale = interpolate(closingProgress, [0, 1], [0.85, 1]);
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top: "50%",
        transform: `translateX(${tx}px) translateY(-50%)`,
        opacity,
        background: colors.darkSlateGray,
        borderTop: `4px solid ${colors.turkishRose}`,
        borderRadius: 14,
        padding: "40px 52px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 52,
        minHeight: 300,
        boxShadow: isActive ? `0 8px 40px ${colors.darkCyra}40` : "none",
      }}
    >
      {/* Large initial letter */}
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: colors.turkishRose,
          fontFamily,
          lineHeight: 1,
          minWidth: 100,
          textAlign: "center",
        }}
      >
        {card.letter}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
            lineHeight: 1,
          }}
        >
          {card.name}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.white,
            fontFamily,
            lineHeight: 1.45,
          }}
        >
          {card.description}
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: colors.tiffanyBlue,
            fontFamily,
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {card.example}
        </div>
        {card.closing && (
          <div
            style={{
              opacity: closingOpacity,
              transform: `scale(${closingScale})`,
              transformOrigin: "left center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.caribbeanGreen,
              fontFamily,
              marginTop: 8,
              filter: `drop-shadow(0 0 8px ${colors.caribbeanGreen}80)`,
            }}
          >
            {card.closing}
          </div>
        )}
      </div>

      {/* Progress dots inside card */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {CARDS.map((_, di) => {
          const isActiveDot = di === cardIndex;
          const isPastDot = di < cardIndex;
          return (
            <div
              key={di}
              style={{
                width: isActiveDot ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background: isActiveDot
                  ? colors.turkishRose
                  : isPastDot
                  ? colors.rhythm
                  : `${colors.rhythm}55`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Scene6EpochSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const bgShift = interpolate(frame, [0, fps * 109], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Active card: last card whose start frame has passed
  const activeCardIndex = CARD_START_FRAMES.reduce((acc, start, i) => {
    return frame >= start ? i : acc;
  }, 0);

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Animated background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, #206D62 0%, ${colors.darkCyra} 100%)`,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${colors.darkCyra} 0%, #206D62 100%)`,
          opacity: bgShift,
          pointerEvents: "none",
        }}
      />

      {/* Cards */}
      <AbsoluteFill style={{ paddingBottom: 220 }}>
        {CARDS.map((card, i) => {
          const isActive = i === activeCardIndex;
          // Render card if it has appeared and is not too old (keep a window)
          const hasAppeared = frame >= CARD_START_FRAMES[i];
          if (!hasAppeared) return null;
          return (
            <EpochCard
              key={card.letter}
              card={card}
              frame={frame}
              fps={fps}
              startFrame={CARD_START_FRAMES[i]}
              isActive={isActive}
              cardIndex={i}
              activeIndex={activeCardIndex}
            />
          );
        })}
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
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
