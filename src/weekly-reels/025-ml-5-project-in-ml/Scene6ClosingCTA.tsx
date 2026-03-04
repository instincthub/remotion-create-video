import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene6ClosingCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Learning Made Simple" section
  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Tagline
  const taglineDelay = 20;
  const taglineProgress = spring({ frame, fps, delay: taglineDelay, config: { damping: 200 } });
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);

  // Icon
  const iconEntrance = spring({ frame, fps, delay: 10, config: { damping: 14, stiffness: 80 } });
  const iconScale = interpolate(iconEntrance, [0, 1], [0, 1]);
  const iconPulse = Math.sin(frame * 0.06) * 0.05 + 1;

  // Closing "See you next time"
  const closingDelay = 12 * fps;
  const closingProgress = spring({
    frame,
    fps,
    delay: closingDelay,
    config: { damping: 200 },
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingScale = interpolate(closingProgress, [0, 1], [0.8, 1]);

  // Fade first section
  const firstSectionOpacity = interpolate(
    frame,
    [closingDelay - 20, closingDelay],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Social icons
  const socialDelay = closingDelay + 15;
  const socialProgress = spring({ frame, fps, delay: socialDelay, config: { damping: 200 } });
  const socialOpacity = interpolate(socialProgress, [0, 1], [0, 1]);

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

      {/* Learning Made Simple section */}
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
          opacity: firstSectionOpacity,
        }}
      >
        {/* Brain + lightbulb icon */}
        <div style={{ transform: `scale(${iconScale * iconPulse})` }}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Circle glow */}
            <circle cx="100" cy="100" r="80" fill={`${colors.tiffanyBlue}06`} stroke={`${colors.tiffanyBlue}15`} strokeWidth={1.5} />

            {/* Brain shape */}
            <path
              d="M100 45 Q75 45 65 65 Q50 60 48 80 Q38 85 40 105 Q38 120 50 130
                 Q48 145 60 152 Q65 165 85 165 Q95 170 100 168
                 Q105 170 115 165 Q135 165 140 152 Q152 145 150 130
                 Q162 120 160 105 Q162 85 152 80 Q150 60 135 65 Q125 45 100 45Z"
              fill={`${colors.tiffanyBlue}10`}
              stroke={colors.tiffanyBlue}
              strokeWidth={2}
            />

            {/* Lightbulb inside */}
            <circle cx="100" cy="100" r="18" fill={`${colors.corn}20`} stroke={colors.corn} strokeWidth={2} />
            {/* Filament */}
            <path d="M94 100 Q97 94 100 100 Q103 106 106 100" stroke={colors.corn} strokeWidth={1.5} fill="none" />

            {/* Rays */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const x1 = 100 + Math.cos(angle) * 24;
              const y1 = 100 + Math.sin(angle) * 24;
              const x2 = 100 + Math.cos(angle) * 34;
              const y2 = 100 + Math.sin(angle) * 34;
              const rayOpacity = Math.sin(frame * 0.1 + i) * 0.3 + 0.4;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors.corn}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={rayOpacity}
                />
              );
            })}
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          Learning
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Made Simple</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: taglineOpacity,
            lineHeight: 1.5,
            maxWidth: 600,
          }}
        >
          Technical concepts that don't feel technical
        </div>
      </AbsoluteFill>

      {/* Closing section */}
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
          opacity: closingOpacity,
        }}
      >
        {/* Wave hand */}
        <div style={{ transform: `scale(${closingScale})` }}>
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
            <circle
              cx="65"
              cy="65"
              r="52"
              fill={`${colors.caribbeanGreen}10`}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
            />
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
            transform: `scale(${closingScale})`,
            lineHeight: 1.2,
          }}
        >
          See You
          <br />
          <span style={{ color: colors.caribbeanGreen }}>Next Time</span>
        </div>

        {/* Subscribe CTA */}
        <div
          style={{
            display: "flex",
            gap: 14,
            opacity: socialOpacity,
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
