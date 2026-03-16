import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1OpeningChallenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame, fps, config: { damping: 200 } });
  const line2 = spring({
    frame: frame - Math.round(fps * 2.5),
    fps,
    config: { damping: 200 },
  });
  const line3 = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const capIn = spring({ frame, fps, config: { damping: 200 } });

  // Pulsing glow for line 3
  const pulse = 0.85 + Math.sin(frame * 0.08) * 0.15;
  const glowOpacity = interpolate(line3, [0, 1], [0, 1]);

  // Warm bottom glow
  const warmGlow = 0.6 + Math.sin(frame * 0.03) * 0.4;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Warm bottom glow */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: "50%",
          transform: `translateX(-50%)`,
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.oldRose}20 0%, transparent 70%)`,
          opacity: warmGlow,
          pointerEvents: "none",
        }}
      />

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
        {/* Graduation cap SVG */}
        <div
          style={{
            opacity: interpolate(capIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(capIn, [0, 1], [-24, 0])}px)`,
            marginBottom: 60,
          }}
        >
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
            <polygon
              points="70,10 130,40 70,70 10,40"
              fill={colors.tiffanyBlue}
              opacity={0.9}
            />
            <rect x="90" y="40" width="6" height="36" fill={colors.tiffanyBlue} opacity={0.7} />
            <circle cx="93" cy="80" r="8" fill={colors.caribbeanGreen} opacity={0.9} />
            <rect x="45" y="48" width="50" height="28" rx="4" fill={colors.darkCyra} opacity={0.7} />
          </svg>
        </div>

        {/* Line 1 */}
        <div
          style={{
            opacity: interpolate(line1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1, [0, 1], [32, 0])}px)`,
            fontSize: 72,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          4 years of study.
        </div>

        {/* Line 2 */}
        <div
          style={{
            opacity: interpolate(line2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2, [0, 1], [32, 0])}px)`,
            fontSize: 72,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 28,
          }}
        >
          Mountains of debt.
        </div>

        {/* Divider */}
        <div
          style={{
            opacity: interpolate(line3, [0, 1], [0, 1]),
            width: 80,
            height: 3,
            background: colors.oldRose,
            borderRadius: 2,
            marginBottom: 28,
          }}
        />

        {/* Line 3 — pulsing glow */}
        <div
          style={{
            opacity: glowOpacity,
            transform: `scale(${interpolate(line3, [0, 0.5, 1], [0.9, 1.04, 1])})`,
            fontSize: 80,
            fontWeight: 900,
            color: colors.oldRose,
            textAlign: "center",
            lineHeight: 1.15,
            textShadow: `0 0 ${Math.round(pulse * 40)}px ${colors.oldRose}80`,
          }}
        >
          AI just took the job.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}50`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
