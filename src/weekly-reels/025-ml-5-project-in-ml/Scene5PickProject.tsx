import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Project recommendation card
const ProjectRow: React.FC<{
  number: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  delay: number;
}> = ({ number, title, description, color, icon, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [40, 0]);

  const pulse = Math.sin(frame * 0.05 + number * 1.5) * 0.03 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px) scale(${pulse})`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        maxWidth: 740,
        padding: "14px 18px",
        borderRadius: 16,
        background: `${color}06`,
        border: `1.5px solid ${color}20`,
      }}
    >
      {/* Number circle */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `${color}15`,
          border: `2px solid ${color}50`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 18,
          fontWeight: 700,
          color,
        }}
      >
        {number}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${color}10`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d={icon}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: colors.white, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, color: colors.rhythm, lineHeight: 1.3 }}>
          {description}
        </div>
      </div>
    </div>
  );
};

export const Scene5PickProject: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // "Comment your pick" CTA
  const ctaDelay = 8 * fps;
  const ctaProgress = spring({ frame, fps, delay: ctaDelay, config: { damping: 14, stiffness: 80 } });
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 14,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
            marginBottom: 10,
          }}
        >
          Which One Will
          <br />
          <span style={{ color: colors.tiffanyBlue }}>You Build?</span>
        </div>

        {/* Project list */}
        <ProjectRow
          number={1}
          title="Spam Filter"
          description="Detect fake & fishy content"
          color={colors.tiffanyBlue}
          icon="M4 8 L12 14 L20 8 M4 8 L4 18 L20 18 L20 8 L4 8 M4 18 L10 12 M20 18 L14 12"
          delay={15}
        />
        <ProjectRow
          number={2}
          title="Handwriting Recognition"
          description="Pen to digital text"
          color={colors.caribbeanGreen}
          icon="M4 20 L8 4 L12 16 L16 8 L20 20 M3 20 L21 20"
          delay={25}
        />
        <ProjectRow
          number={3}
          title="House Price Prediction"
          description="Smart valuation for realtors"
          color={colors.corn}
          icon="M4 20 L12 6 L20 20 Z M9 20 L9 14 L15 14 L15 20"
          delay={35}
        />
        <ProjectRow
          number={4}
          title="Sentiment Analysis"
          description="Read customer mood & tone"
          color={colors.turkishRose}
          icon="M12 4 A8 8 0 1 0 12 4.01 M8 11 L8 11.01 M16 11 L16 11.01 M9 16 Q12 19 15 16"
          delay={45}
        />
        <ProjectRow
          number={5}
          title="Image Classification"
          description="Identify objects & animals"
          color={colors.chineseBlue}
          icon="M4 6 L4 18 L20 18 L20 6 Z M4 14 L8 10 L12 14 L16 10 L20 14 M15 9 A1 1 0 1 0 15 9.01"
          delay={55}
        />

        {/* Comment CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            marginTop: 10,
            padding: "12px 28px",
            borderRadius: 14,
            background: `${colors.tiffanyBlue}15`,
            border: `2px solid ${colors.tiffanyBlue}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4 L20 4 L20 16 L12 16 L8 20 L8 16 L4 16 Z"
              stroke={colors.tiffanyBlue}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span style={{ fontSize: 20, fontWeight: 700, color: colors.tiffanyBlue }}>
            Comment Your Pick!
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
