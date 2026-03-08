import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2BurningTokens: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Token counter
  const tokenCount = Math.floor(
    interpolate(frame, [30, 500], [0, 9999], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Progress bar: Pro → Max
  const progressWidth = interpolate(frame, [60, 200], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeEntrance = spring({
    frame,
    fps,
    delay: 220,
    config: { damping: 14, stiffness: 80 },
  });

  // Flame flicker
  const flicker1 = Math.sin(frame * 0.15) * 0.15 + 0.85;
  const flicker2 = Math.sin(frame * 0.2 + 1) * 0.1 + 0.9;

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
          gap: 30,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Burning Through
          <br />
          <span style={{ color: colors.oldRose }}>AI Tokens</span>
        </div>

        {/* Flame icon */}
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          <path
            d="M60 10 Q40 50 50 70 Q35 55 30 80 Q20 100 40 120 Q50 130 60 130 Q70 130 80 120 Q100 100 90 80 Q85 55 70 70 Q80 50 60 10Z"
            fill={`${colors.oldRose}30`}
            stroke={colors.oldRose}
            strokeWidth={2}
            opacity={flicker1}
          />
          <path
            d="M60 40 Q50 65 55 80 Q45 70 42 90 Q38 105 52 115 Q57 118 60 118 Q63 118 68 115 Q82 105 78 90 Q75 70 65 80 Q70 65 60 40Z"
            fill={`${colors.corn}25`}
            stroke={colors.corn}
            strokeWidth={1.5}
            opacity={flicker2}
          />
        </svg>

        {/* Token counter */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: colors.corn,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {tokenCount.toLocaleString()}
        </div>
        <div style={{ fontSize: 20, color: colors.rhythm, marginTop: -20 }}>
          tokens consumed
        </div>

        {/* Plan upgrade bar */}
        <div style={{ width: "100%", maxWidth: 500 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 18, color: colors.chineseSilver }}>
              Pro Plan
            </span>
            <span style={{ fontSize: 18, color: colors.tiffanyBlue }}>
              Max Plan
            </span>
          </div>
          <div
            style={{
              height: 24,
              borderRadius: 12,
              backgroundColor: `${colors.tiffanyBlue}15`,
              border: `1px solid ${colors.tiffanyBlue}30`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressWidth}%`,
                height: "100%",
                borderRadius: 12,
                background: `linear-gradient(90deg, ${colors.darkCyra}, ${colors.tiffanyBlue})`,
              }}
            />
          </div>
        </div>

        {/* +20% badge */}
        <div
          style={{
            transform: `scale(${interpolate(badgeEntrance, [0, 1], [0, 1])})`,
            padding: "10px 24px",
            borderRadius: 20,
            backgroundColor: `${colors.tiffanyBlue}15`,
            border: `2px solid ${colors.tiffanyBlue}`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.tiffanyBlue,
          }}
        >
          +20% More Tokens
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
