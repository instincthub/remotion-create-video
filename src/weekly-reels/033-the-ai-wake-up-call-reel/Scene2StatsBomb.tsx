import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2StatsBomb: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 22% (0-14s)
  const eyebrow1 = spring({ frame, fps, config: { damping: 200 } });
  const stat22 = spring({
    frame: frame - Math.round(fps * 0.8),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const label22 = spring({ frame: frame - Math.round(fps * 3), fps, config: { damping: 200 } });
  const subLabel = spring({ frame: frame - Math.round(fps * 5), fps, config: { damping: 200 } });

  // Phase 2: NOT ONE (14-28s)
  const notOneProgress = spring({
    frame: frame - Math.round(fps * 14),
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const notOneContext = spring({
    frame: frame - Math.round(fps * 19),
    fps,
    config: { damping: 200 },
  });

  // Shake for NOT ONE
  const shakeAmount = interpolate(notOneProgress, [0.3, 0.6, 1], [10, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 1.8) * shakeAmount;
  const flashOp = interpolate(notOneProgress, [0.3, 0.5, 0.8, 1], [0, 0.3, 0.05, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition: phase 1 fades out as phase 2 arrives
  const phase1Opacity = interpolate(
    notOneProgress,
    [0, 0.5],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Particle dots */}
      <svg width="1080" height="1920" style={{ position: "absolute", opacity: 0.12 }}>
        {Array.from({ length: 40 }, (_, i) => {
          const x = (i % 8) * 140 + 60;
          const y = Math.floor(i / 8) * 300 + 120;
          const p = Math.sin(frame * 0.04 + i * 0.7) * 0.4 + 0.6;
          return <circle key={i} cx={x} cy={y} r={3} fill={colors.tiffanyBlue} opacity={p} />;
        })}
      </svg>

      {/* Flash overlay */}
      <AbsoluteFill
        style={{ background: colors.oldRose, opacity: flashOp, pointerEvents: "none" }}
      />

      {/* Phase 1: 22% stat */}
      <AbsoluteFill
        style={{
          opacity: phase1Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 0,
        }}
      >
        <div
          style={{
            opacity: interpolate(eyebrow1, [0, 1], [0, 1]),
            fontSize: 18,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          WORLD ECONOMIC FORUM
        </div>

        <div
          style={{
            opacity: interpolate(stat22, [0, 1], [0, 1]),
            transform: `scale(${interpolate(stat22, [0, 0.6, 1], [0.4, 1.12, 1])})`,
            fontSize: 220,
            fontWeight: 900,
            color: colors.caribbeanGreen,
            lineHeight: 1,
            letterSpacing: -8,
            textAlign: "center",
          }}
        >
          22%
        </div>

        <div
          style={{
            opacity: interpolate(label22, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(label22, [0, 1], [20, 0])}px)`,
            fontSize: 36,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 800,
            marginTop: 16,
          }}
        >
          of ALL jobs will be reshaped by AI
        </div>

        <div
          style={{
            opacity: interpolate(subLabel, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subLabel, [0, 1], [16, 0])}px)`,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: `${colors.caribbeanGreen}20`,
              border: `1px solid ${colors.caribbeanGreen}50`,
              borderRadius: 8,
              padding: "10px 28px",
              fontSize: 22,
              color: colors.caribbeanGreen,
              fontWeight: 700,
            }}
          >
            By 2030 — before your child starts their career
          </div>
          <div style={{ fontSize: 14, color: colors.rhythm, marginTop: 10 }}>
            Source: World Economic Forum Future of Jobs Report
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 2: NOT ONE */}
      <AbsoluteFill
        style={{
          opacity: interpolate(notOneProgress, [0, 0.5], [0, 1]),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 0,
          pointerEvents: notOneProgress > 0.1 ? "auto" : "none",
        }}
      >
        <div
          style={{
            opacity: interpolate(notOneContext, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(notOneContext, [0, 1], [20, 0])}px)`,
            fontSize: 32,
            color: `${colors.chineseSilver}90`,
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: 40,
            maxWidth: 840,
          }}
        >
          Nearly half of all parents have never had a single conversation about AI with their child.
        </div>

        <div
          style={{
            transform: `translateX(${shakeX}px) scale(${interpolate(notOneProgress, [0, 0.5, 1], [0.5, 1.15, 1])})`,
            opacity: interpolate(notOneProgress, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: colors.oldRose,
              letterSpacing: 6,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            NOT
          </div>
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: colors.oldRose,
              letterSpacing: 6,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            ONE.
          </div>
        </div>

        <div
          style={{
            opacity: interpolate(notOneContext, [0, 1], [0, 1]),
            marginTop: 36,
            fontSize: 26,
            color: `${colors.chineseSilver}80`,
            textAlign: "center",
          }}
        >
          Not a single conversation.
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
