import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated laptop with code streaming out, then a crack appears
const LaptopIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);

  // Code lines streaming out of screen
  const codeLines = [
    { y: 95, width: 80, delay: 15, color: colors.caribbeanGreen },
    { y: 110, width: 55, delay: 20, color: colors.tiffanyBlue },
    { y: 125, width: 70, delay: 25, color: colors.caribbeanGreen },
    { y: 140, width: 45, delay: 30, color: colors.tiffanyBlue },
    { y: 155, width: 65, delay: 35, color: colors.caribbeanGreen },
  ];

  // Crack appears at the "fix it" moment (around 3s)
  const crackProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 12, stiffness: 200 },
  });
  const crackOpacity = interpolate(crackProgress, [0, 1], [0, 1]);

  // Screen flicker when crack hits
  const flickerPhase = frame % 8;
  const isFlickering =
    flickerPhase < 2 && frame > 3 * fps && frame < 3.5 * fps;

  // Floating speed indicators
  const speedProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        position: "relative",
      }}
    >
      <svg width="400" height="320" viewBox="0 0 400 320" fill="none">
        {/* Speed lines behind laptop */}
        {[0, 1, 2, 3, 4].map((i) => {
          const lineOpacity = interpolate(
            speedProgress,
            [0, 1],
            [0, 0.15 + i * 0.05],
          );
          return (
            <line
              key={`speed-${i}`}
              x1={60 + i * 15}
              y1={80 + i * 30}
              x2={20 + i * 10}
              y2={80 + i * 30}
              stroke={colors.tiffanyBlue}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={lineOpacity}
            />
          );
        })}

        {/* Laptop base */}
        <rect
          x="80"
          y="220"
          width="240"
          height="14"
          rx="4"
          fill={colors.gunmetal}
          stroke={colors.darkSlateGray}
          strokeWidth={1.5}
        />
        {/* Hinge */}
        <rect x="170" y="218" width="60" height="6" rx="3" fill={colors.darkSlateGray} />

        {/* Screen body */}
        <rect
          x="90"
          y="60"
          width="220"
          height="160"
          rx="8"
          fill={colors.gunmetal}
          stroke={colors.darkSlateGray}
          strokeWidth={2}
        />
        {/* Screen */}
        <rect
          x="100"
          y="70"
          width="200"
          height="135"
          rx="4"
          fill={isFlickering ? colors.oldRose : colors.darkSlateGray}
          opacity={isFlickering ? 0.3 : 1}
        />

        {/* Code lines streaming on screen */}
        {codeLines.map((line, i) => {
          const lineProgress = interpolate(
            frame - line.delay,
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const lineWidth = line.width * lineProgress;
          return (
            <rect
              key={i}
              x="115"
              y={line.y}
              width={lineWidth}
              height={4}
              rx={2}
              fill={line.color}
              opacity={0.8}
            />
          );
        })}

        {/* Code cursor blinking */}
        <rect
          x={115 + (frame * 1.2) % 90}
          y={codeLines[Math.floor(frame / 20) % codeLines.length]?.y ?? 95}
          width={2}
          height={12}
          fill={colors.white}
          opacity={Math.sin(frame * 0.3) > 0 ? 0.8 : 0}
        />

        {/* Crack overlay on screen */}
        <g opacity={crackOpacity}>
          <path
            d="M200 100 L215 135 L205 140 L225 180 L215 175 L230 200"
            stroke={colors.oldRose}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M215 135 L230 130"
            stroke={colors.oldRose}
            strokeWidth={2}
            fill="none"
          />
          <path
            d="M205 140 L190 150"
            stroke={colors.oldRose}
            strokeWidth={2}
            fill="none"
          />
          {/* Warning triangle */}
          <g transform="translate(255, 115)">
            <path
              d="M0 -15 L13 10 L-13 10 Z"
              fill={colors.oldRose}
              opacity={0.9}
            />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill={colors.white}
              fontSize="14"
              fontWeight="bold"
            >
              !
            </text>
          </g>
        </g>

        {/* Checkmark before crack / speed badge */}
        <g
          opacity={interpolate(crackProgress, [0, 0.3], [0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <circle cx="270" cy="85" r="16" fill={colors.caribbeanGreen} />
          <path
            d="M262 85 L268 91 L278 79"
            stroke={colors.white}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1
  const line1Progress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // Line 2
  const line2Progress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 200 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [40, 0]);

  // Question mark pulse
  const qPulse =
    frame > 4 * fps ? Math.sin((frame - 4 * fps) * 0.1) * 0.12 + 1 : 1;

  // Background zoom
  const zoom = interpolate(frame, [0, 14 * fps], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.magnolia}, ${colors.white}, ${colors.magnolia})`,
        fontFamily,
        transform: `scale(${zoom})`,
      }}
    >
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
          gap: 10,
        }}
      >
        {/* Laptop illustration */}
        <LaptopIllustration />

        {/* Line 1 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            lineHeight: 1.3,
            marginTop: 20,
          }}
        >
          You can build fast.
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.oldRose,
            textAlign: "center",
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px) scale(${qPulse})`,
            lineHeight: 1.3,
            marginTop: 16,
          }}
        >
          But can you fix it?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
