import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Platform card showing where spam filter is used
const PlatformCard: React.FC<{
  icon: string;
  label: string;
  delay: number;
  index: number;
  accentColor: string;
}> = ({ icon, label, delay, index, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const float = Math.sin(frame * 0.05 + index * 2) * 5;

  const iconPaths: Record<string, string> = {
    social: "M20 4 A16 16 0 1 0 20 4.01 M14 16 Q14 22 20 22 Q26 22 26 16 M14 14 L14 14.01 M26 14 L26 14.01",
    email: "M4 10 L20 22 L36 10 M4 10 L4 30 L36 30 L36 10 L4 10",
    catalogue: "M8 4 L32 4 L32 36 L8 36 Z M12 10 L28 10 M12 16 L28 16 M12 22 L24 22 M12 28 L20 28",
  };

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${float}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: 200,
        padding: "24px 16px",
        borderRadius: 20,
        background: `${accentColor}08`,
        border: `1.5px solid ${accentColor}25`,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: `${accentColor}12`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d={iconPaths[icon]}
            stroke={accentColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.white,
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene4SpamFilter: React.FC = () => {
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

  // Number badge entrance
  const badgeEntrance = spring({ frame, fps, delay: 8, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0, 1]);

  // Envelope icon
  const envEntrance = spring({ frame, fps, delay: 12, config: { damping: 200 } });
  const envScale = interpolate(envEntrance, [0, 1], [0.5, 1]);
  const envOpacity = interpolate(envEntrance, [0, 1], [0, 1]);

  const shieldPulse = Math.sin(frame * 0.07) * 0.05 + 1;

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
          gap: 24,
        }}
      >
        {/* "#1" badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `${colors.tiffanyBlue}20`,
            border: `2px solid ${colors.tiffanyBlue}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.tiffanyBlue,
          }}
        >
          #1
        </div>

        {/* Envelope + Shield icon */}
        <div style={{ opacity: envOpacity, transform: `scale(${envScale * shieldPulse})` }}>
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            {/* Envelope */}
            <rect x="20" y="40" width="180" height="120" rx="12" fill={`${colors.darkSlateGray}`} stroke={colors.tiffanyBlue} strokeWidth={2} />
            <path d="M20 40 L110 110 L200 40" fill="none" stroke={colors.tiffanyBlue} strokeWidth={2} strokeLinejoin="round" />
            {/* Shield */}
            <g transform="translate(110, 95)">
              <path
                d="M0 -30 L-22 -16 L-22 6 Q-22 26 0 36 Q22 26 22 6 L22 -16 Z"
                fill={`${colors.caribbeanGreen}20`}
                stroke={colors.caribbeanGreen}
                strokeWidth={2}
              />
              <path d="M-7 3 L-2 8 L9 -5" stroke={colors.caribbeanGreen} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          SPAM
          <br />
          <span style={{ color: colors.tiffanyBlue }}>FILTER</span>
        </div>

        {/* Platform cards */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <PlatformCard icon="social" label="Social Media" delay={5 * 30} index={0} accentColor={colors.tiffanyBlue} />
          <PlatformCard icon="email" label="Email" delay={7 * 30} index={1} accentColor={colors.caribbeanGreen} />
          <PlatformCard icon="catalogue" label="Catalogue" delay={9 * 30} index={2} accentColor={colors.corn} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
