import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Morphing keyword visualization
const MorphingKeyword: React.FC<{
  from: string;
  to: string;
  delay: number;
}> = ({ from, to, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Morph transition
  const morphStart = delay + 40;
  const morphProgress = interpolate(
    frame,
    [morphStart, morphStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const fromOpacity = 1 - morphProgress;
  const toOpacity = morphProgress;
  const strikethrough = interpolate(morphProgress, [0, 0.5], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 50,
      }}
    >
      {/* From keyword */}
      <div style={{ position: "relative", minWidth: 160, textAlign: "center" }}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.oldRose,
            opacity: fromOpacity,
          }}
        >
          {from}
        </span>
        {/* Strikethrough line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${strikethrough}%`,
            height: 2,
            backgroundColor: colors.oldRose,
          }}
        />
      </div>

      {/* Arrow */}
      <svg width="30" height="20" viewBox="0 0 30 20" fill="none" style={{ opacity: morphProgress }}>
        <path
          d="M0 10 L22 10 M16 4 L22 10 L16 16"
          stroke={colors.chineseSilver}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* To keyword */}
      <span
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: colors.corn,
          opacity: toOpacity,
        }}
      >
        {to}
      </span>
    </div>
  );
};

export const Scene6SpammersEvolve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Lightbulb entrance
  const bulbEntrance = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const bulbOpacity = interpolate(bulbEntrance, [0, 1], [0, 1]);
  const bulbScale = interpolate(bulbEntrance, [0, 1], [0.6, 1]);
  const bulbGlow = Math.sin(frame * 0.08) * 0.2 + 0.8;

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

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Spammers Get
          <br />
          <span style={{ color: colors.corn }}>Creative</span>
        </div>

        {/* Lightbulb icon */}
        <div style={{ opacity: bulbOpacity, transform: `scale(${bulbScale})` }}>
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
            {/* Glow */}
            <circle cx="60" cy="55" r="45" fill={`${colors.corn}08`} opacity={bulbGlow} />
            {/* Bulb */}
            <path
              d="M40 55 Q40 25 60 20 Q80 25 80 55 Q80 75 72 82 L72 95 L48 95 L48 82 Q40 75 40 55Z"
              fill={`${colors.corn}15`}
              stroke={colors.corn}
              strokeWidth={2}
            />
            {/* Filament */}
            <path
              d="M52 60 Q56 50 60 60 Q64 50 68 60"
              stroke={colors.corn}
              strokeWidth={1.5}
              fill="none"
              opacity={bulbGlow}
            />
            {/* Base */}
            <rect x="48" y="95" width="24" height="10" rx="2" stroke={colors.chineseSilver} strokeWidth={1.5} fill="none" />
            <line x1="48" y1="100" x2="72" y2="100" stroke={`${colors.chineseSilver}40`} strokeWidth={1} />
            {/* Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 60 + Math.cos(rad) * 50;
              const y1 = 55 + Math.sin(rad) * 50;
              const x2 = 60 + Math.cos(rad) * 58;
              const y2 = 55 + Math.sin(rad) * 58;
              const rayOpacity = Math.sin(frame * 0.12 + i * 0.8) * 0.3 + 0.4;
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

        {/* Morphing keywords */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <MorphingKeyword from="Purchase Now" to="Grab Deal" delay={20} />
          <MorphingKeyword from="Subscribe" to="Join Free" delay={35} />
          <MorphingKeyword from="Click Here" to="Tap Below" delay={50} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
