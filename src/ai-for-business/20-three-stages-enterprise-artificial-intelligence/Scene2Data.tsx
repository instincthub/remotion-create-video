import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Floating data particles connecting to a neural network
const DataParticles: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const particles = [
    { x: 200, y: 300, delay: 0 },
    { x: 350, y: 200, delay: 5 },
    { x: 500, y: 400, delay: 10 },
    { x: 700, y: 250, delay: 15 },
    { x: 850, y: 350, delay: 8 },
    { x: 1050, y: 280, delay: 3 },
    { x: 1200, y: 380, delay: 12 },
    { x: 1400, y: 220, delay: 7 },
    { x: 1550, y: 340, delay: 18 },
    { x: 1700, y: 290, delay: 2 },
  ];

  // Central neural node
  const centerX = 960;
  const centerY = 540;

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080">
        {/* Connection lines from particles to center */}
        {particles.map((p, i) => {
          const flowProgress =
            (frame * 0.015 + p.delay * 0.1) % 1;
          const lineOpacity =
            Math.sin(flowProgress * Math.PI) * 0.3;
          return (
            <line
              key={`conn-${i}`}
              x1={p.x}
              y1={p.y}
              x2={centerX}
              y2={centerY}
              stroke={colors.tiffanyBlue}
              strokeWidth={1}
              opacity={lineOpacity}
              strokeDasharray="6 4"
            />
          );
        })}

        {/* Central neural node */}
        <circle
          cx={centerX}
          cy={centerY}
          r={40}
          fill={`${colors.darkCyra}15`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={22}
          fill={`${colors.caribbeanGreen}25`}
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
        />

        {/* Data particles */}
        {particles.map((p, i) => {
          const wobbleX =
            Math.sin(frame * 0.03 + i * 1.2) * 8;
          const wobbleY =
            Math.cos(frame * 0.025 + i * 0.9) * 6;
          const pulse =
            Math.sin(frame * 0.05 + i * 0.7) * 0.3 + 0.7;
          return (
            <g key={`p-${i}`}>
              <circle
                cx={p.x + wobbleX}
                cy={p.y + wobbleY}
                r={6}
                fill={`${colors.tiffanyBlue}30`}
                stroke={colors.tiffanyBlue}
                strokeWidth={1.5}
                opacity={pulse}
              />
              <circle
                cx={p.x + wobbleX}
                cy={p.y + wobbleY}
                r={2}
                fill={colors.tiffanyBlue}
                opacity={pulse}
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene2Data: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background particles fade in
  const particleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.3),
    config: { damping: 14, stiffness: 80 },
  });
  const particleOpacity = interpolate(
    particleProgress,
    [0, 1],
    [0, 0.6],
  );

  // Line 1
  const line1Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1),
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  // Line 2
  const line2Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 12, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Line 3
  const line3Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 9),
    config: { damping: 12, stiffness: 80 },
  });
  const line3Opacity = interpolate(line3Progress, [0, 1], [0, 1]);
  const line3Scale = interpolate(line3Progress, [0, 1], [0.9, 1]);

  // "And data changes." emphasis
  const line4Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 13),
    config: { damping: 10, stiffness: 70 },
  });
  const line4Opacity = interpolate(line4Progress, [0, 1], [0, 1]);
  const line4Scale = interpolate(line4Progress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      <DataParticles opacity={particleOpacity} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          The real challenge begins{" "}
          <span style={{ color: colors.darkCyra }}>after</span>{" "}
          development.
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: 32,
          }}
        >
          Enterprise AI is not just{" "}
          <span style={{ color: colors.rhythm }}>code</span>.
        </div>

        <div
          style={{
            opacity: line3Opacity,
            transform: `scale(${line3Scale})`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkCyra,
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: 28,
          }}
        >
          It is data.
        </div>

        <div
          style={{
            opacity: line4Opacity,
            transform: `scale(${line4Scale})`,
            fontSize: 48,
            fontWeight: 700,
            color: colors.oldRose,
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: 20,
          }}
        >
          And data changes.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
