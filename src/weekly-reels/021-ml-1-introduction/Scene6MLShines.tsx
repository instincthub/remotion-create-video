import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// ML model with data flowing through it
const MLModelIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: fps, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  // Data streams entering
  const streams = [
    { startX: 20, startY: 60, delay: 30 },
    { startX: 10, startY: 120, delay: 40 },
    { startX: 30, startY: 180, delay: 50 },
    { startX: 15, startY: 240, delay: 35 },
  ];

  // Solution streams exiting
  const solutions = [
    { endX: 380, endY: 80, delay: 55 },
    { endX: 390, endY: 150, delay: 65 },
    { endX: 375, endY: 220, delay: 75 },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
        {/* Center brain/model */}
        <g>
          {/* Outer glow ring */}
          <circle
            cx="200"
            cy="150"
            r="70"
            fill="none"
            stroke={colors.caribbeanGreen}
            strokeWidth={2}
            opacity={glowPulse * 0.4}
          />
          <circle
            cx="200"
            cy="150"
            r="85"
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
            opacity={glowPulse * 0.2}
            strokeDasharray="6 4"
          />

          {/* Model core */}
          <circle
            cx="200"
            cy="150"
            r="55"
            fill={`${colors.darkCyra}20`}
            stroke={colors.darkCyra}
            strokeWidth={3}
          />

          {/* Brain pattern inside */}
          <path
            d="M175 150 Q185 125 200 130 Q215 125 225 150 Q230 170 220 180 Q210 188 200 185 Q190 188 180 180 Q170 170 175 150Z"
            fill={`${colors.caribbeanGreen}25`}
            stroke={colors.caribbeanGreen}
            strokeWidth={1.5}
          />

          {/* Neural dots */}
          {[
            { cx: 190, cy: 140 },
            { cx: 210, cy: 140 },
            { cx: 200, cy: 155 },
            { cx: 185, cy: 160 },
            { cx: 215, cy: 160 },
          ].map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={3}
              fill={colors.tiffanyBlue}
              opacity={Math.sin(frame * 0.12 + i) * 0.4 + 0.6}
            />
          ))}

          {/* "MODEL" label */}
          <text
            x="200"
            y="200"
            textAnchor="middle"
            fill={colors.darkCyra}
            fontSize="14"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            MODEL
          </text>
        </g>

        {/* Input streams (problems) */}
        {streams.map((s, i) => {
          const streamProgress = interpolate(
            frame - s.delay,
            [0, 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const sx = interpolate(streamProgress, [0, 1], [s.startX, 145]);
          const sy = interpolate(streamProgress, [0, 1], [s.startY, 150]);
          const sOpacity = streamProgress > 0.85
            ? interpolate(streamProgress, [0.85, 1], [0.7, 0])
            : interpolate(streamProgress, [0, 0.15], [0, 0.7]);

          return (
            <g key={`in-${i}`}>
              {/* Trail line */}
              <line
                x1={s.startX}
                y1={s.startY}
                x2={sx}
                y2={sy}
                stroke={colors.rhythm}
                strokeWidth={1}
                opacity={sOpacity * 0.4}
                strokeDasharray="3 3"
              />
              {/* Data point */}
              <circle
                cx={sx}
                cy={sy}
                r={5}
                fill={colors.rhythm}
                opacity={sOpacity}
              />
            </g>
          );
        })}

        {/* Output streams (solutions) */}
        {solutions.map((s, i) => {
          const solProgress = interpolate(
            frame - s.delay,
            [0, 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const sx = interpolate(solProgress, [0, 1], [255, s.endX]);
          const sy = interpolate(solProgress, [0, 1], [150, s.endY]);
          const sOpacity = solProgress > 0.85
            ? interpolate(solProgress, [0.85, 1], [0.8, 0.3])
            : interpolate(solProgress, [0, 0.15], [0, 0.8]);

          return (
            <g key={`out-${i}`}>
              <line
                x1={255}
                y1={150}
                x2={sx}
                y2={sy}
                stroke={colors.caribbeanGreen}
                strokeWidth={1.5}
                opacity={sOpacity * 0.5}
              />
              {/* Solution checkmark */}
              <circle
                cx={sx}
                cy={sy}
                r={6}
                fill={colors.caribbeanGreen}
                opacity={sOpacity}
              />
            </g>
          );
        })}

        {/* Labels */}
        <text
          x="30"
          y="30"
          fill={colors.rhythm}
          fontSize="13"
          fontWeight="bold"
          fontFamily="Inter, sans-serif"
          opacity={interpolate(frame, [fps, 2 * fps], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          PROBLEMS
        </text>
        <text
          x="340"
          y="30"
          fill={colors.caribbeanGreen}
          fontSize="13"
          fontWeight="bold"
          fontFamily="Inter, sans-serif"
          opacity={interpolate(frame, [2 * fps, 3 * fps], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          SOLUTIONS
        </text>
      </svg>
    </div>
  );
};

export const Scene6MLShines: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Sparkle effects
  const sparkles = [
    { x: 150, y: 200, delay: 2 * fps },
    { x: 800, y: 300, delay: 2.5 * fps },
    { x: 300, y: 500, delay: 3 * fps },
    { x: 700, y: 600, delay: 3.5 * fps },
  ];

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 200 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.darkCyra}, ${colors.deepGreenCyanTurquoise})`,
        fontFamily,
      }}
    >
      {/* Sparkles */}
      {sparkles.map((s, i) => {
        const sparkleOpacity = Math.sin(frame * 0.1 + i * 1.5) * 0.4 + 0.3;
        const sparkleScale = Math.sin(frame * 0.08 + i * 2) * 0.3 + 0.7;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.white,
              opacity: sparkleOpacity,
              transform: `scale(${sparkleScale})`,
            }}
          />
        );
      })}

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
          gap: 20,
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
          This is where
          <br />
          ML <span style={{ color: colors.corn }}>SHINES</span>
        </div>

        {/* Model illustration */}
        <MLModelIllustration />

        {/* Bottom text */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            lineHeight: 1.6,
            maxWidth: 750,
          }}
        >
          Entrust the conditions to a{" "}
          <span style={{ fontWeight: 700, color: colors.white }}>model</span>
          <br />
          that solves problems as they arise
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
