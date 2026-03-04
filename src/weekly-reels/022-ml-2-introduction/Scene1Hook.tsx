import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Elegant envelope with shield overlay
const EnvelopeShield: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const scale = interpolate(entrance, [0, 1], [0.6, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Shield appears after envelope
  const shieldEntrance = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 14, stiffness: 80 },
  });
  const shieldScale = interpolate(shieldEntrance, [0, 1], [0, 1]);
  const shieldOpacity = interpolate(shieldEntrance, [0, 1], [0, 1]);

  // Gentle pulse on shield
  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;

  return (
    <div style={{ opacity, transform: `scale(${scale})`, position: "relative" }}>
      <svg width="360" height="300" viewBox="0 0 360 300" fill="none">
        {/* Envelope body */}
        <rect
          x="40"
          y="80"
          width="280"
          height="180"
          rx="12"
          fill={`${colors.darkSlateGray}`}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
        />
        {/* Envelope flap */}
        <path
          d="M40 80 L180 175 L320 80"
          fill="none"
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* Inner fold lines */}
        <path
          d="M40 260 L140 185"
          stroke={`${colors.tiffanyBlue}40`}
          strokeWidth={1}
        />
        <path
          d="M320 260 L220 185"
          stroke={`${colors.tiffanyBlue}40`}
          strokeWidth={1}
        />

        {/* Shield overlay */}
        <g
          transform={`translate(180, 160) scale(${shieldScale * pulse})`}
          opacity={shieldOpacity}
        >
          <path
            d="M0 -45 L-35 -25 L-35 10 Q-35 40 0 55 Q35 40 35 10 L35 -25 Z"
            fill={`${colors.tiffanyBlue}25`}
            stroke={colors.caribbeanGreen}
            strokeWidth={2.5}
          />
          {/* Checkmark inside shield */}
          <path
            d="M-12 5 L-4 14 L14 -8"
            stroke={colors.caribbeanGreen}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Decorative dots around */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2 + frame * 0.015;
          const cx = 180 + Math.cos(angle) * 155;
          const cy = 160 + Math.sin(angle) * 125;
          const dotOpacity = Math.sin(frame * 0.1 + i * 1.2) * 0.3 + 0.4;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={3}
              fill={colors.tiffanyBlue}
              opacity={dotOpacity}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [25, 0]);

  // Background subtle pulse
  const bgPulse = Math.sin(frame * 0.03) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
        transform: `scale(${bgPulse})`,
      }}
    >
      {/* Subtle grid */}
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
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              left: i * 90,
              width: 1,
              height: "100%",
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Content */}
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
        }}
      >
        <EnvelopeShield />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
            letterSpacing: 6,
          }}
        >
          SPAM
          <br />
          <span style={{ color: colors.tiffanyBlue }}>FILTER</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            lineHeight: 1.5,
          }}
        >
          A Classic ML Example
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
