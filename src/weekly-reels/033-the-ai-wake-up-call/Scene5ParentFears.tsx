import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";
import { Logo } from "./Logo";

const CARDS = [
  {
    stat: "65%",
    headline: "Fear AI will destroy critical thinking",
    detail: "Parents worry their children will lose the ability to think independently",
    icon: "🧠",
    accentColor: colors.oldRose,
  },
  {
    stat: "50%+",
    headline: "Fear job loss for their children",
    detail: "More than half believe AI will make it harder for their kids to find work",
    icon: "💼",
    accentColor: colors.oldRose,
  },
  {
    stat: "44%",
    headline: "Feel unprepared to guide their child",
    detail: "Across 19 countries — parents lack the knowledge to guide AI use at home",
    icon: "🌍",
    accentColor: colors.oldRose,
  },
];

const FearCard: React.FC<{
  card: (typeof CARDS)[0];
  index: number;
  progress: number;
  isActive: boolean;
}> = ({ card, index, progress, isActive }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [80, 0]);
  const dimOpacity = isActive ? 1 : 0.3;

  return (
    <div
      style={{
        opacity: opacity * dimOpacity,
        transform: `translateX(${x}px)`,
        background: `linear-gradient(135deg, ${colors.darkSlateGray}, ${colors.gunmetal})`,
        borderRadius: 16,
        border: `2px solid ${isActive ? card.accentColor : colors.rhythm + "40"}`,
        padding: "32px 40px",
        display: "flex",
        alignItems: "flex-start",
        gap: 32,
        boxShadow: isActive ? `0 0 40px ${card.accentColor}25` : "none",
        transition: "all 0.3s",
      }}
    >
      {/* Stat */}
      <div
        style={{
          minWidth: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: card.accentColor,
            lineHeight: 1,
          }}
        >
          {card.stat}
        </div>
        <div
          style={{
            width: 40,
            height: 3,
            background: card.accentColor,
            marginTop: 8,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.4,
            marginBottom: 12,
          }}
        >
          {card.headline}
        </div>
        <div
          style={{
            fontSize: 18,
            color: colors.rhythm,
            lineHeight: 1.6,
          }}
        >
          {card.detail}
        </div>
      </div>

      {/* Dark Cyra header bar on left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: isActive ? card.accentColor : colors.rhythm + "40",
          borderRadius: "16px 0 0 16px",
        }}
      />
    </div>
  );
};

export const Scene5ParentFears: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Cards appear in staggered sequence, each holds then dims
  const card0Progress = spring({
    frame: frame - Math.round(fps * 2),
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const card1Progress = spring({
    frame: frame - Math.round(fps * 8),
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const card2Progress = spring({
    frame: frame - Math.round(fps * 16),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Active card cycles
  const card0Active = frame < fps * 8;
  const card1Active = frame >= fps * 8 && frame < fps * 16;
  const card2Active = frame >= fps * 16;

  // Closing message
  const closingProgress = spring({
    frame: frame - Math.round(fps * 24),
    fps,
    config: { damping: 200 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.gunmetal,
        fontFamily,
      }}
    >
      {/* Subtle grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${colors.darkSlateGray}18 0px, ${colors.darkSlateGray}18 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, ${colors.darkSlateGray}18 0px, ${colors.darkSlateGray}18 1px, transparent 1px, transparent 80px)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 160px 220px",
          gap: 32,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: colors.tiffanyBlue,
              letterSpacing: 4,
              marginBottom: 8,
            }}
          >
            PARENT FEARS REVEALED
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: colors.white,
              lineHeight: 1.3,
            }}
          >
            Parents are worried. And they should be.
          </div>
          <div
            style={{
              fontSize: 22,
              color: colors.rhythm,
              marginTop: 8,
            }}
          >
            But not for the reasons they think.
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          {CARDS.map((card, i) => {
            const progresses = [card0Progress, card1Progress, card2Progress];
            const actives = [card0Active, card1Active, card2Active];
            return (
              <div key={i} style={{ position: "relative" }}>
                <FearCard
                  card={card}
                  index={i}
                  progress={progresses[i]}
                  isActive={actives[i]}
                />
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <div
          style={{
            opacity: closingOpacity,
            fontSize: 28,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            borderLeft: `4px solid ${colors.caribbeanGreen}`,
            paddingLeft: 20,
            lineHeight: 1.4,
          }}
        >
          Fear without direction is just paralysis.
        </div>
      </AbsoluteFill>

      <Logo />
    </AbsoluteFill>
  );
};
