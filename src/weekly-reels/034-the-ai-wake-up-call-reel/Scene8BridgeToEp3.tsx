import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const DOT_COUNT = 7;
const ACTIVE_DOT = 1; // 0-indexed, dot 2 = index 1

export const Scene8BridgeToEp3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = spring({ frame, fps, config: { damping: 200 } });
  const ep3Label = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 200 },
  });
  const subtitle = spring({
    frame: frame - Math.round(fps * 2.5),
    fps,
    config: { damping: 200 },
  });
  const dotsIn = spring({
    frame: frame - Math.round(fps * 4.5),
    fps,
    config: { damping: 200 },
  });
  const logoIn = spring({
    frame: frame - Math.round(fps * 6.5),
    fps,
    config: { damping: 200 },
  });

  // Active dot pulse
  const dotPulse = 0.85 + Math.sin(frame * 0.08) * 0.15;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.darkCyra} 0%, ${colors.gunmetal} 60%)`,
        fontFamily,
      }}
    >
      {/* Subtle particle grid */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.07 }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={192 + i * 160}
            x2={1080}
            y2={192 + i * 160}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={80 + i * 130}
            y1={80}
            x2={80 + i * 130}
            y2={1620}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 0,
        }}
      >
        {/* COMING NEXT eyebrow */}
        <div
          style={{
            opacity: interpolate(eyebrow, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrow, [0, 1], [16, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 6,
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          COMING NEXT
        </div>

        {/* Episode 3 */}
        <div
          style={{
            opacity: interpolate(ep3Label, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ep3Label, [0, 1], [24, 0])}px)`,
            fontSize: 80,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 28,
          }}
        >
          Episode 3
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: interpolate(subtitle, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitle, [0, 1], [20, 0])}px)`,
            fontSize: 32,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            textAlign: "center",
            lineHeight: 1.45,
            maxWidth: 840,
            marginBottom: 64,
          }}
        >
          The Skills That Make Your Child Irreplaceable.
        </div>

        {/* Progress dots */}
        <div
          style={{
            opacity: interpolate(dotsIn, [0, 1], [0, 1]),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 80,
          }}
        >
          {Array.from({ length: DOT_COUNT }, (_, i) => {
            const isActive = i === ACTIVE_DOT;
            return (
              <div
                key={i}
                style={{
                  width: isActive ? 24 : 12,
                  height: isActive ? 24 : 12,
                  borderRadius: "50%",
                  background: isActive ? colors.darkCyra : `${colors.chineseSilver}40`,
                  transform: isActive ? `scale(${dotPulse})` : "scale(1)",
                  boxShadow: isActive ? `0 0 16px ${colors.darkCyra}80` : "none",
                }}
              />
            );
          })}
        </div>

        {/* InstinctHub logo + tagline */}
        <div
          style={{
            opacity: interpolate(logoIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoIn, [0, 1], [16, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Logo mark */}
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="14" fill={colors.darkCyra} />
            <text
              x="28"
              y="38"
              textAnchor="middle"
              fontSize="28"
              fontWeight="900"
              fill={colors.white}
              fontFamily="sans-serif"
            >
              IH
            </text>
          </svg>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.white,
              letterSpacing: 2,
            }}
          >
            InstinctHub
          </div>
          <div
            style={{
              fontSize: 18,
              color: `${colors.chineseSilver}90`,
              textAlign: "center",
            }}
          >
            Future-ready learning for the AI era.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
