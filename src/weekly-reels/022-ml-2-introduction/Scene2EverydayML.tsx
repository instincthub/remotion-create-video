import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Minimalist platform icons
const PlatformIcon: React.FC<{
  type: "social" | "email" | "streaming";
  delay: number;
}> = ({ type, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const float = Math.sin(frame * 0.06 + delay * 0.3) * 6;

  const iconPaths: Record<string, { path: string; label: string }> = {
    social: {
      path: "M50 25 C50 11.2 38.8 0 25 0 S0 11.2 0 25 11.2 50 25 50 50 38.8 50 25ZM25 12 C28.3 12 31 14.7 31 18 S28.3 24 25 24 19 21.3 19 18 21.7 12 25 12ZM37 36 C37 30.5 31.6 28 25 28 S13 30.5 13 36",
      label: "Social Media",
    },
    email: {
      path: "M0 10 Q0 5 5 5 L45 5 Q50 5 50 10 L50 40 Q50 45 45 45 L5 45 Q0 45 0 40 ZM5 10 L25 27 L45 10",
      label: "Email",
    },
    streaming: {
      path: "M0 5 Q0 0 5 0 L45 0 Q50 0 50 5 L50 35 Q50 40 45 40 L5 40 Q0 40 0 35 ZM20 14 L35 22 L20 30 Z",
      label: "Streaming",
    },
  };

  const icon = iconPaths[type];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${float}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 24,
          background: `${colors.tiffanyBlue}12`,
          border: `1.5px solid ${colors.tiffanyBlue}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path
            d={icon.path}
            stroke={colors.tiffanyBlue}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 400,
          color: colors.chineseSilver,
          textAlign: "center",
        }}
      >
        {icon.label}
      </div>
    </div>
  );
};

export const Scene2EverydayML: React.FC = () => {
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
      {/* Subtle grid */}
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
          gap: 50,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          We Already
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Experience This</span>
        </div>

        {/* Platform icons row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          <PlatformIcon type="social" delay={15} />
          <div style={{ display: "flex", gap: 40 }}>
            <PlatformIcon type="email" delay={25} />
            <PlatformIcon type="streaming" delay={35} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
