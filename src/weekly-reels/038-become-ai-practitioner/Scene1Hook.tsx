import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowProgress = spring({
    frame,
    fps,
    delay: 3,
    config: { damping: 18, stiffness: 90 },
  });

  const fiveProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 70 },
  });

  const titleProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const subProgress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  const pulse = Math.sin(frame * 0.08) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        background: colors.brandDark,
        fontFamily: nunito,
      }}
    >
      {/* Soft radial glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${colors.tealDeeper}55 0%, transparent 58%)`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle dotted grid */}
      <AbsoluteFill style={{ opacity: 0.06, pointerEvents: "none" }}>
        <svg width="1080" height="1920">
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#dots)" />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 32,
        }}
      >
        {/* Eyebrow tag */}
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 22,
            fontWeight: 500,
            color: colors.tealLight,
            letterSpacing: 4,
            opacity: interpolate(eyebrowProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrowProgress, [0, 1], [20, 0])}px)`,
            padding: "10px 22px",
            border: `1.5px solid ${colors.tealLight}60`,
            borderRadius: 999,
            backgroundColor: `${colors.tealLight}10`,
          }}
        >
          AI PLAYBOOK · PATHS
        </div>

        {/* Massive "5" */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 340,
            fontWeight: 700,
            color: colors.tealLight,
            lineHeight: 0.9,
            opacity: interpolate(fiveProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(fiveProgress, [0, 1], [0.6, pulse])})`,
            textShadow: `0 0 80px ${colors.tealLight}40`,
          }}
        >
          5
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 72,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.1,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [24, 0])}px)`,
          }}
        >
          ways to become
          <br />
          effective with AI
        </div>

        {/* Subhead */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 36,
            fontWeight: 600,
            color: colors.tealLight,
            textAlign: "center",
            marginTop: 10,
            opacity: interpolate(subProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Pick your practical career path.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        AI PLAYBOOK
      </div>
    </AbsoluteFill>
  );
};
