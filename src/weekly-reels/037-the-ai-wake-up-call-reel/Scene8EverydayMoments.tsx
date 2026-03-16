import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const BANDS = [
  {
    color: colors.darkCyra,
    action: "Pushes through difficulty",
    trait: "Human Drive",
  },
  {
    color: colors.caribbeanGreen,
    action: "Makes something new",
    trait: "Originality",
  },
  {
    color: colors.turkishRose,
    action: "Comforts a friend",
    trait: "Empathy",
  },
];

export const Scene8EverydayMoments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bands slide in from left with 0.8s stagger
  const bandProgresses = BANDS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (0.5 + i * 0.8)),
      fps,
      config: { damping: 200 },
    })
  );

  // Warm radial glow
  const glowOpacity = interpolate(frame, [0, Math.round(fps * 2)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final closing line (all bands are visible after ~3s)
  const closingIn = spring({
    frame: frame - Math.round(fps * 4.5),
    fps,
    config: { damping: 14, stiffness: 55 },
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Warm radial glow center */}
      <AbsoluteFill
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 50% 50%, #3D4A52 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px 340px",
          gap: 24,
        }}
      >
        {/* Bands */}
        {BANDS.map((band, i) => {
          const p = bandProgresses[i];
          const xIn = interpolate(p, [0, 1], [-200, 0]);
          const opacity = interpolate(p, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${xIn}px)`,
                width: "100%",
                maxWidth: 960,
                height: 120,
                borderRadius: 16,
                background: band.color,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 36px",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.white,
                  lineHeight: 1.3,
                }}
              >
                {band.action}
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: `${colors.white}CC`,
                  letterSpacing: 1,
                  fontStyle: "italic",
                }}
              >
                → {band.trait}
              </div>
            </div>
          );
        })}

        {/* Closing line */}
        {closingIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(closingIn, [0, 1], [0, 1]),
              transform: `scale(${interpolate(closingIn, [0, 1], [0.95, 1])})`,
              fontSize: 34,
              fontWeight: 900,
              fontStyle: "italic",
              color: colors.white,
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: 880,
              marginTop: 32,
            }}
          >
            The most powerful classroom is already in your home.
          </div>
        )}
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 60,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
