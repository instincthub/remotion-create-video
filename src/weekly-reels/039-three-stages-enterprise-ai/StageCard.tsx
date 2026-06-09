import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./colors";
import { dmMono, dmSans, nunito } from "./fonts";

type StageCardProps = {
  index: string; // "01" | "02" | "03"
  title: string;
  bullets: string[];
  footer: string; // e.g. "→ USER", "→ ALERTS", "TRAINED ON HISTORICAL DATA"
  color: string;
  // Optional offsets so the card can sit slightly differently per scene
  width?: number;
  height?: number;
};

export const StageCard: React.FC<StageCardProps> = ({
  index,
  title,
  bullets,
  footer,
  color,
  width = 820,
  height = 980,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({
    frame: frame - 4,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  return (
    <div
      style={{
        width,
        minHeight: height,
        backgroundColor: color,
        borderRadius: 32,
        padding: "44px 44px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        boxShadow: `0 30px 90px ${color}40, 0 6px 28px rgba(0,0,0,0.4)`,
        opacity: interpolate(cardProgress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(cardProgress, [0, 1], [40, 0])}px) scale(${interpolate(cardProgress, [0, 1], [0.96, 1])})`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontFamily: nunito,
            fontSize: 84,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 26,
            fontWeight: 500,
            color: `${colors.white}cc`,
            letterSpacing: 3,
            padding: "10px 18px",
            border: `1.5px solid ${colors.white}55`,
            borderRadius: 12,
            backgroundColor: `${colors.white}14`,
          }}
        >
          {index}
        </div>
      </div>

      {/* Bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {bullets.map((b, i) => {
          const rowProgress = spring({
            frame: frame - (16 + i * 10),
            fps,
            config: { damping: 18, stiffness: 90 },
          });

          return (
            <div
              key={`${b}-${i}`}
              style={{
                fontFamily: dmSans,
                fontSize: 38,
                fontWeight: 500,
                color: colors.darkSlateGray,
                backgroundColor: colors.magnolia,
                borderRadius: 18,
                padding: "26px 30px",
                lineHeight: 1.25,
                opacity: interpolate(rowProgress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(rowProgress, [0, 1], [-30, 0])}px)`,
              }}
            >
              {b}
            </div>
          );
        })}
      </div>

      {/* Footer pill */}
      <div
        style={{
          marginTop: "auto",
          display: "inline-flex",
          alignSelf: "flex-start",
          fontFamily: dmMono,
          fontSize: 22,
          fontWeight: 500,
          color: colors.white,
          letterSpacing: 3,
          padding: "14px 22px",
          borderRadius: 999,
          backgroundColor: `${colors.white}22`,
          border: `1.5px solid ${colors.white}55`,
          opacity: interpolate(
            spring({
              frame: frame - 50,
              fps,
              config: { damping: 18, stiffness: 90 },
            }),
            [0, 1],
            [0, 1],
          ),
        }}
      >
        {footer}
      </div>
    </div>
  );
};
