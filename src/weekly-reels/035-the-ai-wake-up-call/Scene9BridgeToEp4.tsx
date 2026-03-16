import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const TOTAL_DOTS = 7;
const ACTIVE_DOT = 2; // 0-indexed, dot 3 is index 2

const HexagonIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <polygon
      points="18,2 32,10 32,26 18,34 4,26 4,10"
      stroke={colors.white}
      strokeWidth="2.5"
      fill="none"
    />
    <polygon
      points="18,8 27,13 27,23 18,28 9,23 9,13"
      fill={colors.tiffanyBlue}
      opacity={0.7}
    />
  </svg>
);

export const Scene9BridgeToEp4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stacked content entrance
  const eyebrowProgress = spring({ frame, fps, config: { damping: 200 } });
  const episodeProgress = spring({ frame: frame - fps * 0.3, fps, config: { damping: 14, stiffness: 70 } });
  const subtitleProgress = spring({ frame: frame - fps * 0.7, fps, config: { damping: 16, stiffness: 75 } });

  // Dots animate in left-to-right
  const dotsProgress = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo at bottom
  const logoProgress = spring({ frame: frame - fps * 0.8, fps, config: { damping: 200 } });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${colors.darkCyra} 0%, ${colors.gunmetal} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Center stacked content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          gap: 16,
        }}
      >
        {/* COMING NEXT eyebrow */}
        <div
          style={{
            opacity: interpolate(eyebrowProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrowProgress, [0, 1], [-16, 0])}px)`,
            fontSize: 18,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            fontFamily,
            letterSpacing: 4,
            textTransform: "uppercase" as const,
          }}
        >
          Coming Next
        </div>

        {/* Episode 4 */}
        <div
          style={{
            opacity: interpolate(episodeProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(episodeProgress, [0, 1], [0.85, 1])})`,
            fontSize: 80,
            fontWeight: 900,
            color: colors.white,
            fontFamily,
            lineHeight: 1,
          }}
        >
          Episode 4
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: interpolate(subtitleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
            fontSize: 40,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
            textAlign: "center",
          }}
        >
          What You Can Do Tonight.
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 14,
            marginTop: 32,
          }}
        >
          {Array.from({ length: TOTAL_DOTS }, (_, i) => {
            const dotRevealThreshold = i / TOTAL_DOTS;
            const dotOpacity = interpolate(
              dotsProgress,
              [dotRevealThreshold, dotRevealThreshold + 1 / TOTAL_DOTS],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const isActive = i === ACTIVE_DOT;
            return (
              <div
                key={i}
                style={{
                  opacity: dotOpacity,
                  width: isActive ? 28 : 14,
                  height: 14,
                  borderRadius: 7,
                  background: isActive ? colors.darkCyra : `${colors.rhythm}66`,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>

      {/* InstinctHub logo bottom-center */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: logoOpacity,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
          <HexagonIcon />
          <span style={{ fontSize: 24, fontWeight: 700, color: colors.white, fontFamily }}>
            InstinctHub
          </span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, color: colors.tiffanyBlue, fontFamily, letterSpacing: 1 }}>
          Preparing Families for What's Coming
        </div>
      </div>
    </AbsoluteFill>
  );
};
