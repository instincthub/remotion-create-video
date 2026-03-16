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
    description: "Genuinely understanding what another person feels",
    example: "What a doctor brings to the bedside that no algorithm can",
    closing: null,
  },
  {
    letter: "P",
    name: "Perspective",
    description: "Ethical judgment and moral reasoning",
    example: "What leaders carry that AI cannot",
    closing: null,
  },
  {
    letter: "O",
    name: "Originality",
    description: "Truly novel ideas from lived experience",
    example: "What the next generation of creators will be valued for",
    closing: null,
  },
  {
    letter: "C",
    name: "Connection",
    description: "Inspiring others and building trust",
    example: "What great teachers, coaches, and founders do",
    closing: null,
  },
  {
    letter: "H",
    name: "Human Drive",
    description: "Grit and perseverance through failure",
    example: "AI doesn't know what it means to struggle. Your child does.",
    closing: "All five: associated with GROWTH.",
  },
];

// Each card visible for ~7s (210 frames), stagger 7s each
const CARD_START_FRAMES = CARDS.map((_, i) => i * 210);
const CARD_HOLD_FRAMES = 200;

const EpochCard: React.FC<{
  card: typeof CARDS[0];
  frame: number;
  fps: number;
  startFrame: number;
  isActive: boolean;
}> = ({ card, frame, fps, startFrame, isActive }) => {
  const enterProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 75 },
  });

  const opacity = interpolate(enterProgress, [0, 1], [0, isActive ? 1 : 0.3]);
  const tx = interpolate(enterProgress, [0, 1], [200, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: "50%",
        transform: `translateX(${tx}px) translateY(-50%)`,
        opacity,
        background: colors.darkSlateGray,
        borderTop: `4px solid ${colors.turkishRose}`,
        borderRadius: 12,
        padding: "36px 48px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 48,
        height: 260,
      }}
    >
      {/* Large initial letter */}
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: colors.turkishRose,
          fontFamily,
          lineHeight: 1,
          minWidth: 80,
          textAlign: "center",
        }}
      >
        {card.letter}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 48, fontWeight: 700, color: colors.white, fontFamily, lineHeight: 1 }}>
          {card.name}
        </div>
        <div style={{ fontSize: 22, fontWeight: 400, color: colors.white, fontFamily, lineHeight: 1.4 }}>
          {card.description}
        </div>
        <div style={{ fontSize: 20, fontWeight: 400, color: colors.tiffanyBlue, fontFamily, fontStyle: "italic" }}>
          {card.example}
        </div>
        {card.closing && (
          <div style={{ fontSize: 22, fontWeight: 700, color: colors.caribbeanGreen, fontFamily, marginTop: 8 }}>
            {card.closing}
          </div>
        )}
      </div>
    </div>
  );
};

export const Scene6EpochSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const bgShift = interpolate(frame, [0, fps * 37], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Determine active card
  const activeCardIndex = CARD_START_FRAMES.reduce((acc, start, i) => {
    return frame >= start ? i : acc;
  }, 0);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Animated background gradient */}
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

      {/* Cards — only render current and nearby cards for performance */}
      <AbsoluteFill style={{ paddingBottom: 220 }}>
        {CARDS.map((card, i) => {
          const isVisible = frame >= CARD_START_FRAMES[i] && frame < CARD_START_FRAMES[i] + CARD_HOLD_FRAMES + 40;
          if (!isVisible && i !== activeCardIndex) return null;
          return (
            <EpochCard
              key={card.letter}
              card={card}
              frame={frame}
              fps={fps}
              startFrame={CARD_START_FRAMES[i]}
              isActive={i === activeCardIndex}
            />
          );
        })}
      </AbsoluteFill>

      {/* Progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {CARDS.map((card, i) => {
          const isActive = i === activeCardIndex;
          const isPast = i < activeCardIndex;
          return (
            <div
              key={card.letter}
              style={{
                width: isActive ? 32 : 12,
                height: 12,
                borderRadius: 6,
                background: isActive ? colors.turkishRose : isPast ? colors.rhythm : `${colors.rhythm}66`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
