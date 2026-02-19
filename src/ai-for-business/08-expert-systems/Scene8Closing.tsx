import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Timeline from 1970s to today
const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timelineOpacity = interpolate(frame, [fps, 2 * fps], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const milestones = [
    { year: "1965", label: "DENDRAL", x: 300 },
    { year: "1972", label: "MYCIN", x: 560 },
    { year: "1973", label: "AARON", x: 820 },
    { year: "1980s", label: "Expert\nSystems\nBoom", x: 1080 },
    { year: "2010s+", label: "Deep\nLearning", x: 1340 },
    { year: "Today", label: "Modern\nAI", x: 1600 },
  ];

  const lineDrawProgress = interpolate(frame, [fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: timelineOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Timeline line */}
        <line
          x1={200}
          y1={680}
          x2={200 + 1500 * lineDrawProgress}
          y2={680}
          stroke={colors.darkCyra}
          strokeWidth={3}
        />

        {/* Milestones */}
        {milestones.map((ms, i) => {
          const msProgress = spring({
            frame,
            fps,
            delay: fps + i * 8,
            config: { damping: 200 },
          });
          const msOpacity = interpolate(msProgress, [0, 1], [0, 1]);

          return (
            <g key={`ms-${i}`} opacity={msOpacity}>
              {/* Dot */}
              <circle
                cx={ms.x}
                cy={680}
                r={8}
                fill={i < 4 ? colors.darkCyra : colors.tiffanyBlue}
              />
              {/* Year */}
              <text
                x={ms.x}
                y={730}
                textAnchor="middle"
                fontSize={24}
                fontWeight="bold"
                fill={colors.darkCyra}
                fontFamily="Inter, sans-serif"
              >
                {ms.year}
              </text>
              {/* Label */}
              {ms.label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={ms.x}
                  y={630 - (ms.label.split("\n").length - 1 - li) * 26}
                  textAnchor="middle"
                  fontSize={22}
                  fill={colors.rhythm}
                  fontFamily="Inter, sans-serif"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main headline with glow
  const headlineProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 10, stiffness: 80 },
  });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);
  const headlineScale = interpolate(headlineProgress, [0, 1], [0.9, 1]);

  // Subtle glow pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [20, 40]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <Timeline />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 5,
          paddingTop: 120,
        }}
      >
        <div
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: colors.darkCyra,
              textShadow: `0 0 ${glowIntensity}px ${colors.darkCyra}30`,
              lineHeight: 1.3,
            }}
          >
            The future builds
            <br />
            on the past.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
