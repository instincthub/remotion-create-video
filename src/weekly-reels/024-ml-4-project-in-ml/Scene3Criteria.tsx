import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Criteria card
const CriteriaCard: React.FC<{
  number: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  delay: number;
}> = ({ number, title, description, icon, iconColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [50, 0]);

  // Checkmark appears after card
  const checkEntrance = spring({
    frame,
    fps,
    delay: delay + 20,
    config: { damping: 14, stiffness: 80 },
  });
  const checkScale = interpolate(checkEntrance, [0, 1], [0, 1]);

  const pulse = Math.sin(frame * 0.06 + number * 2) * 0.04 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px)`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        width: "100%",
        maxWidth: 720,
        padding: "20px 24px",
        borderRadius: 18,
        background: `${iconColor}08`,
        border: `1.5px solid ${iconColor}25`,
      }}
    >
      {/* Number + Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${iconColor}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transform: `scale(${pulse})`,
          position: "relative",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d={icon}
            stroke={iconColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {/* Number badge */}
        <div
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: colors.gunmetal,
          }}
        >
          {number}
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: colors.rhythm,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>

      {/* Checkmark */}
      <div style={{ transform: `scale(${checkScale})`, flexShrink: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" fill={`${colors.limeGreen}20`} stroke={colors.limeGreen} strokeWidth={2} />
          <path d="M9 14 L12 17 L19 10" stroke={colors.limeGreen} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export const Scene3Criteria: React.FC = () => {
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
          paddingLeft: 50,
          paddingRight: 50,
          gap: 24,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
            marginBottom: 16,
          }}
        >
          The
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Criteria</span>
        </div>

        <CriteriaCard
          number={1}
          title="Not Too Complicated"
          description="Easy to follow along"
          icon="M8 18 Q18 4 28 18 M8 24 Q18 14 28 24"
          iconColor={colors.tiffanyBlue}
          delay={20}
        />

        <CriteriaCard
          number={2}
          title="Rich Enough to Learn"
          description="Covers essential ML concepts"
          icon="M18 6 L18 30 M10 14 L18 6 L26 14 M6 20 L18 30 L30 20"
          iconColor={colors.caribbeanGreen}
          delay={5 * 30}
        />

        <CriteriaCard
          number={3}
          title="Prepares for Any Project"
          description="Transferable skills & patterns"
          icon="M18 6 L30 18 L18 30 L6 18 Z M12 18 L18 12 L24 18 L18 24 Z"
          iconColor={colors.corn}
          delay={9 * 30}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
