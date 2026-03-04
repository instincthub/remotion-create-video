import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated brain with neural connections
const BrainIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  // Neural pulse
  const pulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

  // Connection sparks
  const connections = [
    { x1: 200, y1: 80, x2: 140, y2: 120, delay: 15 },
    { x1: 200, y1: 80, x2: 260, y2: 120, delay: 20 },
    { x1: 170, y1: 140, x2: 130, y2: 190, delay: 25 },
    { x1: 230, y1: 140, x2: 270, y2: 190, delay: 30 },
    { x1: 200, y1: 160, x2: 200, y2: 210, delay: 35 },
    { x1: 150, y1: 170, x2: 180, y2: 220, delay: 28 },
    { x1: 250, y1: 170, x2: 220, y2: 220, delay: 32 },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        position: "relative",
      }}
    >
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
        {/* Brain outer shape */}
        <ellipse
          cx="200"
          cy="140"
          rx="90"
          ry="80"
          fill={`${colors.tiffanyBlue}15`}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
          opacity={pulse}
        />
        {/* Brain inner detail */}
        <path
          d="M160 140 Q180 100 200 110 Q220 100 240 140 Q250 170 230 190 Q210 200 200 195 Q190 200 170 190 Q150 170 160 140Z"
          fill={`${colors.caribbeanGreen}20`}
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
          opacity={0.8}
        />
        {/* Brain center fold */}
        <path
          d="M200 105 Q195 140 200 195"
          stroke={colors.tiffanyBlue}
          strokeWidth={1.5}
          fill="none"
          opacity={0.6}
        />

        {/* Neural nodes */}
        {[
          { cx: 200, cy: 80, r: 6 },
          { cx: 140, cy: 120, r: 5 },
          { cx: 260, cy: 120, r: 5 },
          { cx: 170, cy: 140, r: 4 },
          { cx: 230, cy: 140, r: 4 },
          { cx: 150, cy: 170, r: 5 },
          { cx: 250, cy: 170, r: 5 },
          { cx: 200, cy: 160, r: 6 },
          { cx: 130, cy: 190, r: 4 },
          { cx: 270, cy: 190, r: 4 },
          { cx: 180, cy: 220, r: 5 },
          { cx: 220, cy: 220, r: 5 },
          { cx: 200, cy: 210, r: 4 },
        ].map((node, i) => {
          const nodePulse = Math.sin(frame * 0.12 + i * 0.8) * 0.3 + 0.7;
          return (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={colors.tiffanyBlue}
              opacity={nodePulse}
            />
          );
        })}

        {/* Neural connections with animated opacity */}
        {connections.map((conn, i) => {
          const connProgress = interpolate(
            frame - conn.delay,
            [0, 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const connPulse = Math.sin(frame * 0.08 + i * 1.2) * 0.3 + 0.5;
          return (
            <line
              key={i}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke={colors.caribbeanGreen}
              strokeWidth={1.5}
              opacity={connProgress * connPulse}
            />
          );
        })}

        {/* Glow ring around brain */}
        <ellipse
          cx="200"
          cy="140"
          rx="110"
          ry="100"
          fill="none"
          stroke={colors.tiffanyBlue}
          strokeWidth={1}
          opacity={Math.sin(frame * 0.06) * 0.2 + 0.15}
          strokeDasharray="8 6"
        />
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title: "BEYOND THE HYPES"
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);

  // Glitch effect on title
  const glitchCycle = frame % 50;
  const isGlitching = glitchCycle < 3 && frame > 20 && frame < 4 * fps;
  const glitchX = isGlitching ? ((frame * 7) % 9) - 4 : 0;

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  // Background pulse
  const bgPulse = Math.sin(frame * 0.04) * 0.03 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
        transform: `scale(${bgPulse})`,
      }}
    >
      {/* Subtle grid pattern */}
      <AbsoluteFill style={{ opacity: 0.04 }}>
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
          gap: 20,
        }}
      >
        {/* Brain illustration */}
        <BrainIllustration />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) translateX(${glitchX}px)`,
            lineHeight: 1.2,
            letterSpacing: 4,
          }}
        >
          BEYOND THE
          <br />
          <span style={{ color: colors.tiffanyBlue }}>HYPES</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          How Machine Learning
          <br />
          Actually Solves Real Problems
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
