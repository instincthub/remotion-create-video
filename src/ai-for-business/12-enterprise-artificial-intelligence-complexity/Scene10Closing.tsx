import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Network grid background with slow pulse
const NetworkGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(
    frame,
    [0, 2 * fps],
    [0, 0.12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slow pulse on dots
  const dotPulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.4, 1]);

  // Grid parameters
  const cols = 16;
  const rows = 10;
  const spacingX = 1920 / (cols + 1);
  const spacingY = 1080 / (rows + 1);

  const dots: Array<{ x: number; y: number }> = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      dots.push({ x: c * spacingX, y: r * spacingY });
    }
  }

  // Generate connections (between adjacent dots)
  const connections: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const idx = (r - 1) * cols + (c - 1);
      // Right neighbor
      if (c < cols) {
        connections.push({
          x1: dots[idx].x,
          y1: dots[idx].y,
          x2: dots[idx + 1].x,
          y2: dots[idx + 1].y,
        });
      }
      // Bottom neighbor
      if (r < rows) {
        connections.push({
          x1: dots[idx].x,
          y1: dots[idx].y,
          x2: dots[idx + cols].x,
          y2: dots[idx + cols].y,
        });
      }
    }
  }

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", top: 0, left: 0, opacity: gridOpacity }}
    >
      {/* Connection lines */}
      {connections.map((conn, i) => (
        <line
          key={`conn-${i}`}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke={colors.white}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}
      {/* Dots */}
      {dots.map((dot, i) => {
        // Some dots pulse more than others for organic feel
        const localPulse = Math.sin(frame * 0.03 + i * 0.5) > 0.3 ? dotPulse : 0.4;
        return (
          <circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={2.5}
            fill={colors.white}
            opacity={localPulse}
          />
        );
      })}
    </svg>
  );
};

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text spring animation
  const textProgress = spring({
    frame,
    fps,
    delay: 0.5 * fps,
    config: { damping: 10, stiffness: 60, mass: 1.2 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1]);

  // Slow zoom on the whole scene
  const zoomScale = interpolate(
    frame,
    [0, 10 * fps],
    [1, 1.06],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Underline animation (draws after text appears)
  const underlineProgress = interpolate(
    frame,
    [2 * fps, 3.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Glow pulse on underline
  const underlineGlow = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [10, 30]
  );

  // Subtle radial vignette
  const vignetteOpacity = interpolate(
    frame,
    [0, 2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "Trust" word highlight
  const trustGlow = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0, 15]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.deepGreenCyanTurquoise,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Zoom container */}
      <AbsoluteFill
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Network grid background */}
        <NetworkGrid />

        {/* Radial vignette overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at center, transparent 40%, ${colors.deepGreenCyanTurquoise}90 100%)`,
            opacity: vignetteOpacity,
            zIndex: 1,
          }}
        />

        {/* Main centered text */}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 200,
            zIndex: 2,
          }}
        >
          <div
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}
          >
            {/* Main text */}
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                color: colors.white,
                textAlign: "center",
                lineHeight: 1.3,
                maxWidth: 1000,
              }}
            >
              Enterprise AI
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                color: colors.white,
                textAlign: "center",
                lineHeight: 1.3,
                position: "relative",
                display: "inline-block",
              }}
            >
              Protects{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  textShadow: `0 0 ${trustGlow}px ${colors.white}40`,
                }}
              >
                Trust
                {/* Animated underline under "Trust" */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: `${underlineProgress * 100}%`,
                    height: 6,
                    background: colors.darkCyra,
                    borderRadius: 3,
                    boxShadow: `0 0 ${underlineGlow}px ${colors.darkCyra}`,
                  }}
                />
              </span>
            </div>
          </div>

          {/* Decorative horizontal lines */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 50,
              opacity: interpolate(
                frame,
                [3.5 * fps, 5 * fps],
                [0, 0.5],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                width: interpolate(
                  frame,
                  [3.5 * fps, 5 * fps],
                  [0, 200],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                height: 1,
                background: colors.white,
              }}
            />
            <svg width="12" height="12" viewBox="0 0 12 12">
              <circle cx={6} cy={6} r={4} fill={colors.darkCyra} />
            </svg>
            <div
              style={{
                width: interpolate(
                  frame,
                  [3.5 * fps, 5 * fps],
                  [0, 200],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                height: 1,
                background: colors.white,
              }}
            />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
