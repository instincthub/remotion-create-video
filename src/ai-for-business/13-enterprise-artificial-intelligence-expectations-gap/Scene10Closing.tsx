import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text spring
  const textProgress = spring({
    frame,
    fps,
    delay: 0.5 * fps,
    config: { damping: 10, stiffness: 60, mass: 1.2 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1]);

  // Slow zoom
  const zoomScale = interpolate(
    frame,
    [0, 10 * fps],
    [1, 1.06],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Underline animation
  const underlineProgress = interpolate(
    frame,
    [2 * fps, 3.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Glow pulse
  const underlineGlow = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [10, 30],
  );

  // Vignette
  const vignetteOpacity = interpolate(
    frame,
    [0, 2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 3.5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Background network dots
  const dotOpacity = interpolate(
    frame,
    [0, 2 * fps],
    [0, 0.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const dots = Array.from({ length: 30 }, (_, i) => ({
    x: 80 + (i * 63) % 1760,
    y: 40 + (i * 37) % 1000,
    size: 1.5 + (i % 3),
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCyra,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Background dots */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0, opacity: dotOpacity }}
        >
          {dots.map((dot, i) => {
            const drift = Math.sin(frame * 0.02 + i * 0.7) * 6;
            return (
              <circle
                key={`d-${i}`}
                cx={dot.x + drift}
                cy={dot.y + Math.cos(frame * 0.015 + i) * 5}
                r={dot.size}
                fill={colors.white}
                opacity={0.4 + Math.sin(frame * 0.03 + i) * 0.2}
              />
            );
          })}
        </svg>

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at center, transparent 40%, ${colors.darkCyra}90 100%)`,
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
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: colors.white,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              AI Is
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: colors.white,
                textAlign: "center",
                lineHeight: 1.3,
                position: "relative",
                display: "inline-block",
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Engineering
                {/* Animated underline */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: `${underlineProgress * 100}%`,
                    height: 6,
                    background: colors.white,
                    borderRadius: 3,
                    boxShadow: `0 0 ${underlineGlow}px ${colors.white}60`,
                  }}
                />
              </span>
            </div>

            {/* Subtitle */}
            <div
              style={{
                opacity: subOpacity,
                fontSize: 26,
                color: `${colors.white}CC`,
                textAlign: "center",
                marginTop: 40,
                maxWidth: 800,
                lineHeight: 1.5,
              }}
            >
              Engineering discipline separates hype from impact.
            </div>
          </div>

          {/* Decorative lines */}
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
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              ),
            }}
          >
            <div
              style={{
                width: interpolate(
                  frame,
                  [3.5 * fps, 5 * fps],
                  [0, 200],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
                height: 1,
                background: colors.white,
              }}
            />
            <svg width="12" height="12" viewBox="0 0 12 12">
              <circle cx={6} cy={6} r={4} fill={colors.white} />
            </svg>
            <div
              style={{
                width: interpolate(
                  frame,
                  [3.5 * fps, 5 * fps],
                  [0, 200],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
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
