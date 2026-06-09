import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

const EXAMPLES = [
  {
    label: "Gmail",
    detail: "Smart filters & reply",
  },
  {
    label: "Netflix",
    detail: "Movie recommendations",
  },
  {
    label: "ChatGPT",
    detail: "Drafting & planning",
  },
];

export const Scene4Consumer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeProgress = spring({
    frame,
    fps,
    delay: 3,
    config: { damping: 18, stiffness: 90 },
  });

  const titleProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const descProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  const closingProgress = spring({
    frame: frame - 320,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.brandDark,
        fontFamily: nunito,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${colors.tealDeeper}40 0%, transparent 55%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 26,
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 22px",
            backgroundColor: `${colors.tealLight}15`,
            border: `1.5px solid ${colors.tealLight}70`,
            borderRadius: 999,
            opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(badgeProgress, [0, 1], [15, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: dmMono,
              fontSize: 20,
              fontWeight: 500,
              color: colors.tealLight,
              letterSpacing: 3,
            }}
          >
            PATH · 01
          </div>
        </div>

        {/* Big title */}
        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          Consumer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            fontFamily: nunito,
            color: colors.neutral200,
            lineHeight: 1.3,
            maxWidth: 900,
            opacity: interpolate(descProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(descProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          You already use AI.
          <br />
          <span style={{ color: colors.tealLight, fontWeight: 700 }}>
            Even before you knew.
          </span>
        </div>

        {/* Examples stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            marginTop: 20,
          }}
        >
          {EXAMPLES.map((ex, i) => {
            const itemProgress = spring({
              frame: frame - (110 + i * 40),
              fps,
              config: { damping: 16, stiffness: 80 },
            });

            return (
              <div
                key={ex.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "22px 28px",
                  backgroundColor: `${colors.neutral800}60`,
                  border: `1.5px solid ${colors.tealDeeper}80`,
                  borderRadius: 16,
                  opacity: interpolate(itemProgress, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(itemProgress, [0, 1], [-50, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    minWidth: 68,
                    borderRadius: 14,
                    backgroundColor: colors.tealDeeper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: nunito,
                    fontSize: 30,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {ex.label[0]}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div
                    style={{
                      fontFamily: nunito,
                      fontSize: 40,
                      fontWeight: 700,
                      color: colors.white,
                      lineHeight: 1.1,
                    }}
                  >
                    {ex.label}
                  </div>
                  <div
                    style={{
                      fontFamily: nunito,
                      fontSize: 24,
                      fontWeight: 400,
                      color: colors.neutral400,
                    }}
                  >
                    {ex.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 34,
            fontWeight: 600,
            color: colors.tealLight,
            marginTop: 16,
            lineHeight: 1.3,
            opacity: interpolate(closingProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(closingProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Using the product is a real path.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        AI PLAYBOOK
      </div>
    </AbsoluteFill>
  );
};
