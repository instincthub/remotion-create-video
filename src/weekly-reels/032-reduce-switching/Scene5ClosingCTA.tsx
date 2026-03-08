import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene5ClosingCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Quote (0-900 frames / 30s)
  const phase2Start = 900;

  const phase1Opacity = interpolate(frame, [phase2Start - 30, phase2Start], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase2Entrance = spring({
    frame: Math.max(0, frame - phase2Start),
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Quote lines
  const line1 = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const line2 = spring({ frame, fps, delay: 150, config: { damping: 200 } });
  const line3 = spring({ frame, fps, delay: 350, config: { damping: 200 } });

  // Social icons
  const socialDelay = phase2Start + 60;
  const socialProgress = spring({
    frame: Math.max(0, frame - socialDelay),
    fps,
    config: { damping: 200 },
  });

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

      {/* Phase 1: Quote */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 60,
          paddingRight: 60,
          gap: 24,
          opacity: phase1Opacity,
        }}
      >
        {/* Quote mark */}
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none" style={{ opacity: 0.2 }}>
          <path d="M5 40 L5 20 Q5 5 20 5 L25 5 L25 12 L20 12 Q12 12 12 20 L12 25 L25 25 L25 40 Z" fill={colors.darkCyra} />
          <path d="M35 40 L35 20 Q35 5 50 5 L55 5 L55 12 L50 12 Q42 12 42 20 L42 25 L55 25 L55 40 Z" fill={colors.darkCyra} />
        </svg>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.chineseSilver,
            textAlign: "center",
            lineHeight: 1.5,
            opacity: interpolate(line1, [0, 1], [0, 1]),
          }}
        >
          The goal is not to write more code
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.5,
            opacity: interpolate(line2, [0, 1], [0, 1]),
          }}
        >
          The goal is to build better systems
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.darkCyra,
            textAlign: "center",
            lineHeight: 1.5,
            opacity: interpolate(line3, [0, 1], [0, 1]),
            textShadow: `0 0 30px ${colors.darkCyra}40`,
          }}
        >
          Without Burning Out
        </div>
      </AbsoluteFill>

      {/* Phase 2: CTA */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 24,
          opacity: interpolate(phase2Entrance, [0, 1], [0, 1]),
        }}
      >
        {/* Wave hand */}
        <div style={{ transform: `scale(${interpolate(phase2Entrance, [0, 1], [0.8, 1])})` }}>
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
            <circle cx="65" cy="65" r="52" fill={`${colors.caribbeanGreen}10`} stroke={colors.caribbeanGreen} strokeWidth={2} />
            <path
              d="M50 82 L50 58 Q50 53 55 53 Q60 53 60 58 L60 48 Q60 43 65 43 Q70 43 70 48 L70 46 Q70 41 75 41 Q80 41 80 46 L80 50 Q80 45 85 45 Q90 45 90 50 L90 76 Q90 90 76 90 L60 90 Q50 90 50 82Z"
              fill={`${colors.caribbeanGreen}25`}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {[0, 1, 2].map((i) => {
              const lineOpacity = Math.sin(frame * 0.1 + i * 1.5) * 0.3 + 0.3;
              return (
                <line
                  key={i}
                  x1={38 - i * 5}
                  y1={52 + i * 12}
                  x2={28 - i * 5}
                  y2={52 + i * 12}
                  stroke={colors.caribbeanGreen}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={lineOpacity}
                />
              );
            })}
          </svg>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          See You
          <br />
          <span style={{ color: colors.caribbeanGreen }}>Next Time</span>
        </div>

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            gap: 14,
            opacity: interpolate(socialProgress, [0, 1], [0, 1]),
          }}
        >
          {[
            { label: "Subscribe", path: "M12 21 C12 21 4 14 4 9 Q4 4 9 4 Q12 4 12 8 Q12 4 15 4 Q20 4 20 9 C20 14 12 21 12 21Z" },
            { label: "Comment", path: "M4 4 L20 4 L20 16 L12 16 L8 20 L8 16 L4 16 Z" },
            { label: "Follow", path: "M12 4 L14 9 L20 9 L15 13 L17 19 L12 15 L7 19 L9 13 L4 9 L10 9 Z" },
          ].map((social, i) => {
            const iconPulse = Math.sin(frame * 0.06 + i * 2) * 0.06 + 1;
            return (
              <div
                key={social.label}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: `${colors.caribbeanGreen}10`,
                  border: `1.5px solid ${colors.caribbeanGreen}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${iconPulse})`,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d={social.path}
                    stroke={colors.caribbeanGreen}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontSize: 22,
            color: colors.caribbeanGreen,
            fontWeight: 700,
            opacity: interpolate(socialProgress, [0, 1], [0, 1]),
          }}
        >
          Follow & Share
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
