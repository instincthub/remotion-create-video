import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// 7 progress dots — dot 4 (index 3) is active for Episode 4
const TOTAL_EPISODES = 7;
const ACTIVE_EPISODE = 3; // 0-indexed → Episode 4

export const Scene9BridgeToEp4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Coming Next label
  const comingIn = spring({
    frame: frame - Math.round(fps * 0.3),
    fps,
    config: { damping: 200 },
  });

  // Episode label
  const episodeIn = spring({
    frame: frame - Math.round(fps * 0.8),
    fps,
    config: { damping: 14, stiffness: 70 },
  });

  // Subtitle
  const subtitleIn = spring({
    frame: frame - Math.round(fps * 1.4),
    fps,
    config: { damping: 16, stiffness: 60 },
  });

  // Logo scales in at ~2s
  const logoIn = spring({
    frame: frame - Math.round(fps * 2),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Tiffany light sweep upper-right — horizontal progress across corner
  const sweepProgress = interpolate(
    frame,
    [Math.round(fps * 0.5), Math.round(fps * 2.5)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkCyra} 0%, ${colors.gunmetal} 60%)`,
        fontFamily,
      }}
    >
      {/* Tiffany Blue light sweep upper right */}
      {sweepProgress > 0 && (
        <svg
          style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, pointerEvents: "none" }}
        >
          <defs>
            <radialGradient id="sweep" cx="100%" cy="0%" r="60%">
              <stop offset="0%" stopColor={colors.tiffanyBlue} stopOpacity={0.35 * sweepProgress} />
              <stop offset="100%" stopColor={colors.tiffanyBlue} stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={400} height={400} fill="url(#sweep)" />
        </svg>
      )}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px 340px",
          gap: 0,
        }}
      >
        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 14,
            marginBottom: 80,
          }}
        >
          {Array.from({ length: TOTAL_EPISODES }, (_, i) => (
            <div
              key={i}
              style={{
                width: i === ACTIVE_EPISODE ? 36 : 14,
                height: 14,
                borderRadius: 7,
                background: i === ACTIVE_EPISODE ? colors.darkCyra : colors.rhythm,
              }}
            />
          ))}
        </div>

        {/* "COMING NEXT" small caps */}
        <div
          style={{
            opacity: interpolate(comingIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(comingIn, [0, 1], [16, 0])}px)`,
            fontSize: 26,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 6,
            textTransform: "uppercase" as const,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          Coming Next
        </div>

        {/* "Episode 4" */}
        <div
          style={{
            opacity: interpolate(episodeIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(episodeIn, [0, 0.6, 1], [0.8, 1.05, 1])})`,
            fontSize: 80,
            fontWeight: 900,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Episode 4
        </div>

        {/* "What You Can Do Tonight." */}
        <div
          style={{
            opacity: interpolate(subtitleIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitleIn, [0, 1], [20, 0])}px)`,
            fontSize: 44,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 80,
          }}
        >
          What You Can Do Tonight.
        </div>

        {/* InstinctHub logo text */}
        {logoIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(logoIn, [0, 1], [0, 1]),
              transform: `scale(${interpolate(logoIn, [0, 0.5, 1], [0.7, 1.06, 1])})`,
              fontSize: 32,
              fontWeight: 900,
              color: colors.white,
              textAlign: "center",
              letterSpacing: 2,
            }}
          >
            InstinctHub
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
