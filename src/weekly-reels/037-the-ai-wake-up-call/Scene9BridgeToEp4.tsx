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
const ACTIVE_DOT = 3; // 0-indexed, dot 4 (episode 4)

export const Scene9BridgeToEp4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "COMING NEXT" at 1s
  const comingProgress = spring({
    frame: frame - fps * 1,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  // "Episode 4" at 2s
  const ep4Progress = spring({
    frame: frame - fps * 2,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  // "What You Can Do Tonight." at 3s
  const actionProgress = spring({
    frame: frame - fps * 3,
    fps,
    config: { damping: 16, stiffness: 75 },
  });

  // Logo scales in
  const logoProgress = spring({
    frame: frame - fps * 4,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  // Light sweep
  const sweepProgress = interpolate(frame, [fps * 1, fps * 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweepX = interpolate(sweepProgress, [0, 1], [1920, 1200]);

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to right, ${colors.darkCyra} 0%, ${colors.gunmetal} 100%)`,
        }}
      />

      {/* Tiffany Blue light sweep upper right */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${sweepX}px 180px, ${colors.tiffanyBlue}22 0%, transparent 40%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 260,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 12,
        }}
      >
        {/* COMING NEXT */}
        <div
          style={{
            opacity: interpolate(comingProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(comingProgress, [0, 1], [-16, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            fontFamily,
            letterSpacing: 6,
            textTransform: "uppercase" as const,
          }}
        >
          Coming Next
        </div>

        {/* Episode 4 */}
        <div
          style={{
            opacity: interpolate(ep4Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ep4Progress, [0, 1], [20, 0])}px)`,
            fontSize: 80,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
            lineHeight: 1,
          }}
        >
          Episode 4
        </div>

        {/* What You Can Do Tonight */}
        <div
          style={{
            opacity: interpolate(actionProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(actionProgress, [0, 1], [0.95, 1])})`,
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
            gap: 12,
            marginTop: 32,
          }}
        >
          {[...Array(TOTAL_DOTS)].map((_, i) => {
            const isActive = i === ACTIVE_DOT;
            return (
              <div
                key={i}
                style={{
                  width: isActive ? 36 : 12,
                  height: 12,
                  borderRadius: 6,
                  background: isActive ? colors.darkCyra : colors.rhythm,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>

      {/* InstinctHub hexagon logo */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(logoProgress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoProgress, [0, 1], [0.7, 1])})`,
        }}
      >
        <svg width={64} height={72} viewBox="0 0 64 72">
          <polygon
            points="32,2 62,18 62,54 32,70 2,54 2,18"
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={3}
          />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={colors.tiffanyBlue}
            fontFamily={fontFamily}
          >
            IH
          </text>
        </svg>
      </div>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
