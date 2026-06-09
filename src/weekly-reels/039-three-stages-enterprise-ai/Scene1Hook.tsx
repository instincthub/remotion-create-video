import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmSans, dmMono } from "./fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowProgress = spring({
    frame,
    fps,
    delay: 3,
    config: { damping: 18, stiffness: 90 },
  });

  const titleProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const subProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  const chipsProgress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.surfaceDarker,
        fontFamily: nunito,
      }}
    >
      {/* Soft cyan glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 38%, ${colors.darkCyra}55 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Dotted grid */}
      <AbsoluteFill style={{ opacity: 0.06, pointerEvents: "none" }}>
        <svg width="1080" height="1920">
          <defs>
            <pattern
              id="dots-hook"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill={colors.tiffanyBlue} />
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#dots-hook)" />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 28,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 22,
            fontWeight: 500,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            opacity: interpolate(eyebrowProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrowProgress, [0, 1], [20, 0])}px)`,
            padding: "10px 22px",
            border: `1.5px solid ${colors.tiffanyBlue}60`,
            borderRadius: 999,
            backgroundColor: `${colors.darkCyra}18`,
          }}
        >
          CH. 2 · BUILDING ENTERPRISE AI
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 96,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.05,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [28, 0])}px)`,
          }}
        >
          Three stages
          <br />
          of an enterprise
          <br />
          <span style={{ color: colors.tiffanyBlue }}>AI application.</span>
        </div>

        {/* Subhead */}
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 34,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            lineHeight: 1.35,
            maxWidth: 880,
            marginTop: 18,
            opacity: interpolate(subProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Building the model is only the first move.
        </div>

        {/* Stage chips preview */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 26,
            opacity: interpolate(chipsProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(chipsProgress, [0, 1], [16, 0])}px)`,
          }}
        >
          {[
            { label: "Develop", color: colors.tiffanyBlue },
            { label: "Deploy", color: colors.caribbeanGreen },
            { label: "Sustain", color: colors.oldRose },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                fontFamily: dmMono,
                fontSize: 22,
                fontWeight: 500,
                color: s.color,
                letterSpacing: 2,
                padding: "12px 22px",
                border: `1.5px solid ${s.color}80`,
                borderRadius: 12,
                backgroundColor: `${s.color}14`,
              }}
            >
              {s.label.toUpperCase()}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        ENTERPRISE AI · CH. 2
      </div>
    </AbsoluteFill>
  );
};
