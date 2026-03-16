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
    text: "Pushes through difficulty",
    skill: "Human Drive",
  },
  {
    color: colors.caribbeanGreen,
    text: "Makes something new",
    skill: "Originality",
  },
  {
    color: colors.turkishRose,
    text: "Comforts a friend",
    skill: "Empathy",
  },
];

export const Scene8EverydayMoments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 200 } });

  const bandProgresses = BANDS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (1 + i * 1.5)),
      fps,
      config: { damping: 200 },
    })
  );

  const closingIn = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Warm subtle glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.turkishRose}12 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [20, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            marginBottom: 56,
          }}
        >
          EVERYDAY MOMENTS OF GROWTH
        </div>

        {/* Bands */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 64 }}>
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
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  background: band.color,
                  borderRadius: 14,
                  height: 88,
                  paddingLeft: 28,
                  paddingRight: 28,
                  gap: 0,
                  overflow: "hidden",
                }}
              >
                {/* Text */}
                <div
                  style={{
                    flex: 1,
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.white,
                    lineHeight: 1.3,
                  }}
                >
                  {band.text}
                </div>

                {/* Arrow + skill label */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <line x1={4} y1={12} x2={20} y2={12} stroke={colors.white} strokeWidth={2.5} strokeLinecap="round" />
                    <polyline points="14,6 20,12 14,18" stroke={colors.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: `${colors.white}CC`,
                      letterSpacing: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {band.skill}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <div
          style={{
            opacity: interpolate(closingIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(closingIn, [0, 1], [24, 0])}px)`,
            fontSize: 30,
            fontWeight: 700,
            fontStyle: "italic",
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 820,
            alignSelf: "center",
          }}
        >
          "The most powerful classroom is already in your home."
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
