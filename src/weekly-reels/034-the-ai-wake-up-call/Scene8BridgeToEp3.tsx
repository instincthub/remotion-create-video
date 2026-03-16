import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const DOT_COUNT = 7;
const ACTIVE_DOT = 1; // index 1 = Ep2 (0-indexed)

export const Scene8BridgeToEp3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient sweep
  const gradientProgress = interpolate(frame, [0, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Coming Next label
  const comingProgress = spring({ frame, fps, config: { damping: 200 } });
  const comingOpacity = interpolate(comingProgress, [0, 1], [0, 1]);

  // Episode 3 title
  const ep3Progress = spring({
    frame: frame - fps * 1.5,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const ep3Opacity = interpolate(ep3Progress, [0, 1], [0, 1]);
  const ep3Y = interpolate(ep3Progress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame: frame - fps * 3,
    fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Dots appear one by one
  const dotProgresses = Array.from({ length: DOT_COUNT }, (_, i) =>
    spring({
      frame: frame - fps * (5 + i * 0.5),
      fps,
      config: { damping: 200 },
    })
  );

  // Logo
  const logoProgress = spring({
    frame: frame - fps * 9,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 0.6, 1], [0.8, 1.05, 1]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Base background */}
      <AbsoluteFill style={{ background: colors.gunmetal }} />
      {/* Gradient sweep fades in */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to right, ${colors.darkCyra}, ${colors.gunmetal})`,
          opacity: gradientProgress,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 20,
        }}
      >
        {/* Coming Next label */}
        <div
          style={{
            opacity: comingOpacity,
            fontSize: 16,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 5,
            textTransform: "uppercase" as const,
            fontFamily,
          }}
        >
          Coming Next
        </div>

        {/* Episode 3 */}
        <div
          style={{
            opacity: ep3Opacity,
            transform: `translateY(${ep3Y}px)`,
            fontSize: 80,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Episode 3
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            fontSize: 40,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          The Skills That Make Your Child Irreplaceable.
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 24,
          }}
        >
          {Array.from({ length: DOT_COUNT }, (_, i) => {
            const dotOpacity = interpolate(dotProgresses[i], [0, 1], [0, 1]);
            const isActive = i === ACTIVE_DOT;
            return (
              <div
                key={i}
                style={{
                  opacity: dotOpacity * (isActive ? 1 : 0.4),
                  width: isActive ? 28 : 12,
                  height: 12,
                  borderRadius: 6,
                  background: isActive ? colors.darkCyra : colors.rhythm,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>

      {/* InstinctHub logo at bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: "50%",
          transform: `translateX(-50%) scale(${logoScale})`,
          opacity: logoOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 11,
              background: colors.darkCyra,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2L16 6V12L9 16L2 12V6L9 2Z"
                stroke={colors.white}
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="9" cy="9" r="2.5" fill={colors.caribbeanGreen} />
            </svg>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: colors.white,
              fontFamily,
              letterSpacing: 0.5,
            }}
          >
            InstinctHub
          </div>
        </div>
        <div
          style={{
            fontSize: 14,
            color: colors.tiffanyBlue,
            fontFamily,
            letterSpacing: 1.5,
            textAlign: "center",
          }}
        >
          Preparing Families for What's Coming
        </div>
      </div>
    </AbsoluteFill>
  );
};
