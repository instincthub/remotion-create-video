import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Preview card for next episode
const NextEpisodeCard: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const borderGlow = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: "100%",
        maxWidth: 700,
        padding: "32px 36px",
        borderRadius: 20,
        background: `linear-gradient(135deg, ${colors.darkSlateGray}, ${colors.gunmetal})`,
        border: `2px solid ${colors.tiffanyBlue}`,
        borderColor: `rgba(15, 171, 188, ${borderGlow})`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: colors.tiffanyBlue,
          textTransform: "uppercase",
          letterSpacing: 3,
        }}
      >
        Coming Next
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: colors.white,
          lineHeight: 1.3,
        }}
      >
        Real ML Projects
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: colors.chineseSilver,
          lineHeight: 1.4,
        }}
      >
        Built with Modern AI
      </div>

      {/* Small icons row */}
      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
        {["rocket", "code", "brain"].map((type, i) => {
          const iconPaths: Record<string, string> = {
            rocket: "M12 20 L8 28 L16 24 M12 20 L16 24 M12 4 Q6 10 6 18 L12 20 L18 18 Q18 10 12 4 M8 15 L4 17 M16 15 L20 17",
            code: "M8 8 L2 16 L8 24 M16 8 L22 16 L16 24",
            brain: "M12 4 Q6 4 4 10 Q2 12 4 16 Q3 20 6 22 Q7 26 12 26 Q17 26 18 22 Q21 20 20 16 Q22 12 20 10 Q18 4 12 4",
          };
          return (
            <div
              key={type}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${colors.tiffanyBlue}10`,
                border: `1px solid ${colors.tiffanyBlue}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path
                  d={iconPaths[type]}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={Math.sin(frame * 0.08 + i * 2) * 0.2 + 0.8}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Social media follow CTA
const SocialCTA: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const yOffset = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${yOffset}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 400,
          color: colors.chineseSilver,
          textAlign: "center",
        }}
      >
        Follow for more ML tips
      </div>

      {/* Social icons row */}
      <div style={{ display: "flex", gap: 16 }}>
        {[
          { label: "Like", path: "M12 21 C12 21 4 14 4 9 Q4 4 9 4 Q12 4 12 8 Q12 4 15 4 Q20 4 20 9 C20 14 12 21 12 21Z" },
          { label: "Comment", path: "M4 4 L20 4 L20 16 L12 16 L8 20 L8 16 L4 16 Z" },
          { label: "Share", path: "M18 4 A3 3 0 1 0 18 4.01 M18 20 A3 3 0 1 0 18 20.01 M6 12 A3 3 0 1 0 6 12.01 M8.5 10.5 L15.5 5.5 M8.5 13.5 L15.5 18.5" },
        ].map((social, i) => {
          const iconPulse = Math.sin(frame * 0.06 + i * 2.2) * 0.08 + 1;
          return (
            <div
              key={social.label}
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${colors.tiffanyBlue}12`,
                border: `1.5px solid ${colors.tiffanyBlue}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${iconPulse})`,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d={social.path}
                  stroke={colors.tiffanyBlue}
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
    </div>
  );
};

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Closing text
  const closingDelay = 16 * fps;
  const closingProgress = spring({
    frame,
    fps,
    delay: closingDelay,
    config: { damping: 200 },
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingScale = interpolate(closingProgress, [0, 1], [0.8, 1]);

  // Fade card section
  const cardOpacity = interpolate(
    frame,
    [closingDelay - 20, closingDelay],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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

      {/* Card + Social section */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 40,
          opacity: cardOpacity,
        }}
      >
        <NextEpisodeCard delay={10} />
        <SocialCTA delay={40} />
      </AbsoluteFill>

      {/* Closing "See you next time" */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 20,
          opacity: closingOpacity,
        }}
      >
        {/* Wave hand */}
        <div style={{ transform: `scale(${closingScale})` }}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <circle
              cx="70"
              cy="70"
              r="55"
              fill={`${colors.caribbeanGreen}12`}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
            />
            {/* Stylized hand wave */}
            <path
              d="M55 85 L55 60 Q55 55 60 55 Q65 55 65 60 L65 50 Q65 45 70 45 Q75 45 75 50 L75 48 Q75 43 80 43 Q85 43 85 48 L85 52 Q85 47 90 47 Q95 47 95 52 L95 80 Q95 95 80 95 L65 95 Q55 95 55 85Z"
              fill={`${colors.caribbeanGreen}30`}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {/* Motion lines */}
            {[0, 1, 2].map((i) => {
              const lineOpacity = Math.sin(frame * 0.1 + i * 1.5) * 0.3 + 0.3;
              return (
                <line
                  key={i}
                  x1={40 - i * 6}
                  y1={55 + i * 12}
                  x2={30 - i * 6}
                  y2={55 + i * 12}
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
