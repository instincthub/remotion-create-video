import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Enterprise skyline with digital overlay
const Skyline: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const buildings = [
    { x: 160, w: 80, h: 220 },
    { x: 280, w: 60, h: 160 },
    { x: 380, w: 100, h: 280 },
    { x: 520, w: 70, h: 200 },
    { x: 640, w: 90, h: 300 },
    { x: 780, w: 60, h: 180 },
    { x: 880, w: 110, h: 340 },
    { x: 1040, w: 80, h: 260 },
    { x: 1160, w: 70, h: 190 },
    { x: 1270, w: 100, h: 310 },
    { x: 1420, w: 60, h: 170 },
    { x: 1520, w: 90, h: 240 },
    { x: 1660, w: 70, h: 200 },
  ];

  const baseY = 780;

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080">
        {/* Digital overlay lines (horizontal) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const y = 300 + i * 80;
          const pulse =
            Math.sin(frame * 0.02 + i * 0.6) * 0.2 + 0.3;
          return (
            <line
              key={`ol-${i}`}
              x1={0}
              y1={y}
              x2={1920}
              y2={y}
              stroke={colors.caribbeanGreen}
              strokeWidth={0.5}
              opacity={pulse}
            />
          );
        })}

        {/* Buildings */}
        {buildings.map((b, i) => {
          const pulse =
            Math.sin(frame * 0.03 + i * 0.9) * 0.08 + 0.92;
          return (
            <g key={`b-${i}`} opacity={pulse}>
              <rect
                x={b.x}
                y={baseY - b.h}
                width={b.w}
                height={b.h}
                rx={2}
                fill={`${colors.caribbeanGreen}08`}
                stroke={colors.caribbeanGreen}
                strokeWidth={1}
              />
              {/* Window lights */}
              {Array.from({ length: Math.floor(b.h / 40) }).map(
                (_, row) =>
                  Array.from({
                    length: Math.floor((b.w - 16) / 16),
                  }).map((_, col) => {
                    const windowPulse =
                      Math.sin(
                        frame * 0.04 + i * 0.3 + row * 0.5 + col * 0.7,
                      ) *
                        0.4 +
                      0.6;
                    return (
                      <rect
                        key={`win-${i}-${row}-${col}`}
                        x={b.x + 8 + col * 16}
                        y={baseY - b.h + 12 + row * 40}
                        width={8}
                        height={12}
                        rx={1}
                        fill={colors.caribbeanGreen}
                        opacity={windowPulse * 0.3}
                      />
                    );
                  }),
              )}
            </g>
          );
        })}

        {/* Ground line */}
        <line
          x1={0}
          y1={baseY}
          x2={1920}
          y2={baseY}
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
          opacity={0.4}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 10 * fps], [1, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Skyline
  const skylineProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.2),
    config: { damping: 14, stiffness: 80 },
  });
  const skylineOpacity = interpolate(
    skylineProgress,
    [0, 1],
    [0, 0.6],
  );

  // Main text: "Builders Win."
  const textProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 10, stiffness: 70 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1]);

  // Subtle glow
  const glowPulse =
    Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.deepGreenCyanTurquoise} 0%, ${colors.darkCyra} 50%, ${colors.darkNavy} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Skyline opacity={skylineOpacity} />
      </AbsoluteFill>

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
            opacity: textOpacity * glowPulse,
            transform: `scale(${textScale})`,
            fontSize: 84,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            textShadow: `0 0 60px ${colors.caribbeanGreen}60, 0 0 120px ${colors.caribbeanGreen}30`,
          }}
        >
          Builders{" "}
          <span
            style={{
              color: colors.caribbeanGreen,
            }}
          >
            Win
          </span>
          .
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
