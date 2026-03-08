import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2ProductivityParadox: React.FC = () => {
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

  // Scale tilt animation
  const tilt = interpolate(frame, [60, 180], [0, -15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftEntrance = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 14, stiffness: 80 },
  });

  const rightEntrance = spring({
    frame,
    fps,
    delay: 35,
    config: { damping: 14, stiffness: 80 },
  });

  const subProgress = spring({
    frame,
    fps,
    delay: 50,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Grid */}
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
          paddingLeft: 40,
          paddingRight: 40,
          gap: 30,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          The Productivity
          <br />
          <span style={{ color: colors.turkishRose }}>Paradox</span>
        </div>

        {/* Balance scale */}
        <svg
          width="500"
          height="350"
          viewBox="0 0 500 350"
          fill="none"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          {/* Fulcrum triangle */}
          <polygon
            points="250,200 230,250 270,250"
            fill={`${colors.chineseSilver}30`}
            stroke={colors.chineseSilver}
            strokeWidth={2}
          />
          {/* Base */}
          <line
            x1="200"
            y1="250"
            x2="300"
            y2="250"
            stroke={colors.chineseSilver}
            strokeWidth={2}
          />
          {/* Beam */}
          <line
            x1="80"
            y1="180"
            x2="420"
            y2="180"
            stroke={colors.chineseSilver}
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* Left pan - Productivity */}
          <g
            style={{
              transform: `scale(${interpolate(leftEntrance, [0, 1], [0, 1])})`,
              transformOrigin: "130px 180px",
            }}
          >
            <line x1="80" y1="180" x2="80" y2="220" stroke={colors.caribbeanGreen} strokeWidth={1.5} />
            <line x1="180" y1="180" x2="180" y2="220" stroke={colors.caribbeanGreen} strokeWidth={1.5} />
            <rect x="60" y="220" width="140" height="8" rx="4" fill={`${colors.caribbeanGreen}30`} stroke={colors.caribbeanGreen} strokeWidth={1.5} />
            {/* Up arrow */}
            <path d="M130 100 L130 160 M115 120 L130 100 L145 120" stroke={colors.caribbeanGreen} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Right pan - Cognitive Load */}
          <g
            style={{
              transform: `scale(${interpolate(rightEntrance, [0, 1], [0, 1])})`,
              transformOrigin: "370px 180px",
            }}
          >
            <line x1="320" y1="180" x2="320" y2="220" stroke={colors.oldRose} strokeWidth={1.5} />
            <line x1="420" y1="180" x2="420" y2="220" stroke={colors.oldRose} strokeWidth={1.5} />
            <rect x="300" y="220" width="140" height="8" rx="4" fill={`${colors.oldRose}30`} stroke={colors.oldRose} strokeWidth={1.5} />
            {/* Bigger up arrow */}
            <path d="M370 70 L370 160 M348 100 L370 70 L392 100" stroke={colors.oldRose} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {/* Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 500,
            opacity: interpolate(leftEntrance, [0, 1], [0, 1]),
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.caribbeanGreen }}>
              Productivity
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.oldRose }}>
              Cognitive Load
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            lineHeight: 1.5,
            maxWidth: 600,
          }}
        >
          Expected to help, but increasing mental exhaustion
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
