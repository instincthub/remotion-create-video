import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated gear-brain that grows
const GrowingModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.6, 1]);

  // Rotating gear
  const rotation = frame * 0.3;

  // Growth bar progress (fills over the scene)
  const barProgress = interpolate(frame, [40, 200], [0.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse glow
  const glowPulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
        {/* Outer glow ring */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke={colors.tiffanyBlue}
          strokeWidth={1}
          opacity={glowPulse * 0.2}
          strokeDasharray="6 4"
        />

        {/* Gear shape */}
        <g transform={`rotate(${rotation}, 140, 140)`}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = 140 + Math.cos(angle) * 70;
            const y1 = 140 + Math.sin(angle) * 70;
            const x2 = 140 + Math.cos(angle) * 90;
            const y2 = 140 + Math.sin(angle) * 90;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.tiffanyBlue}
                strokeWidth={12}
                strokeLinecap="round"
                opacity={0.6}
              />
            );
          })}
          <circle
            cx="140"
            cy="140"
            r="60"
            fill={`${colors.tiffanyBlue}10`}
            stroke={colors.tiffanyBlue}
            strokeWidth={2}
          />
        </g>

        {/* Brain inside gear */}
        <path
          d="M120 130 Q130 110 140 115 Q150 110 160 130 Q165 150 155 160 Q148 165 140 163 Q132 165 125 160 Q115 150 120 130Z"
          fill={`${colors.caribbeanGreen}20`}
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
          opacity={0.9}
        />
        <path
          d="M140 113 Q138 140 140 163"
          stroke={colors.tiffanyBlue}
          strokeWidth={1}
          fill="none"
          opacity={0.5}
        />

        {/* Upward arrow */}
        <g opacity={interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <path
            d="M140 60 L130 75 M140 60 L150 75 M140 60 L140 95"
            stroke={colors.caribbeanGreen}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>

      {/* Progress bar */}
      <div
        style={{
          width: 400,
          height: 8,
          borderRadius: 4,
          backgroundColor: `${colors.tiffanyBlue}15`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barProgress * 100}%`,
            height: "100%",
            borderRadius: 4,
            background: `linear-gradient(90deg, ${colors.darkCyra}, ${colors.tiffanyBlue}, ${colors.caribbeanGreen})`,
            transition: "width 0.1s",
          }}
        />
      </div>
    </div>
  );
};

export const Scene3ModelGrows: React.FC = () => {
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

  const subProgress = spring({
    frame,
    fps,
    delay: 60,
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
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          A Model That
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Gets Better</span>
        </div>

        <GrowingModel />

        {/* "Every Day" label */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
          }}
        >
          Every single day
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
