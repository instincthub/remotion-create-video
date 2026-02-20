import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Lifecycle loop diagram
const LifecycleLoop: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const rotation = (frame * 0.8) % 360;

  const stages = [
    { angle: -90, label: "Develop", color: colors.darkCyra },
    { angle: 30, label: "Deploy", color: colors.viridianGreen },
    { angle: 150, label: "Sustain", color: colors.deepGreenCyanTurquoise },
  ];

  const cx = 960;
  const cy = 560;
  const radius = 220;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
      }}
    >
      <svg width="1920" height="1080">
        {/* Rotating arc */}
        <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={`${colors.darkCyra}30`}
            strokeWidth={3.5}
          />
          {/* Moving dot on the circle */}
          <circle
            cx={cx + radius}
            cy={cy}
            r={10}
            fill={colors.caribbeanGreen}
          />
        </g>

        {/* Stage nodes */}
        {stages.map((stage, i) => {
          const rad = (stage.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * radius;
          const y = cy + Math.sin(rad) * radius;
          const pulse =
            Math.sin(frame * 0.05 + i * 2) * 0.1 + 0.9;

          return (
            <g key={`stage-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={56}
                fill={`${stage.color}15`}
                stroke={stage.color}
                strokeWidth={3}
                opacity={pulse}
              />
              <text
                x={x}
                y={y + 7}
                textAnchor="middle"
                fill={stage.color}
                fontSize={22}
                fontWeight={700}
                fontFamily={fontFamily}
              >
                {stage.label}
              </text>

              {/* Arrow to next */}
              {i < stages.length && (() => {
                const nextAngle =
                  stages[(i + 1) % stages.length].angle;
                const midAngle =
                  ((stage.angle + nextAngle + (nextAngle < stage.angle ? 360 : 0)) / 2) *
                  (Math.PI / 180);
                const arrowX =
                  cx + Math.cos(midAngle) * (radius + 2);
                const arrowY =
                  cy + Math.sin(midAngle) * (radius + 2);
                return (
                  <circle
                    cx={arrowX}
                    cy={arrowY}
                    r={5}
                    fill={`${stage.color}60`}
                  />
                );
              })()}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lifecycle diagram
  const loopProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.3),
    config: { damping: 14, stiffness: 80 },
  });
  const loopOpacity = interpolate(loopProgress, [0, 1], [0, 1]);

  // Main text
  const textProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  // Tagline
  const tagProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 12, stiffness: 80 },
  });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.darkNavy,
        fontFamily,
      }}
    >
      {/* Lifecycle loop */}
      <LifecycleLoop opacity={loopOpacity} />

      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 100,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: colors.darkCyra }}>Develop</span>.{" "}
            <span style={{ color: colors.viridianGreen }}>Deploy</span>.{" "}
            <span style={{ color: colors.caribbeanGreen }}>Sustain</span>.
          </div>
        </div>

        <div
          style={{
            opacity: tagOpacity,
            marginTop: 24,
            fontSize: 36,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Design for the{" "}
          <span style={{ color: colors.tiffanyBlue }}>lifecycle</span>.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
