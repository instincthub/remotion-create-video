import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

const TRAITS = [
  "Understands the business domain",
  "Finds manual processes to automate",
  "Introduces the team to better ways",
];

export const Scene5Explorer: React.FC = () => {
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

  // Weeks -> Minutes visual starts around frame 300
  const weeksStart = 300;
  const weeksProgress = spring({
    frame: frame - weeksStart,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const arrowProgress = interpolate(
    frame,
    [weeksStart + 20, weeksStart + 50],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const minutesProgress = spring({
    frame: frame - (weeksStart + 45),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const finalProgress = spring({
    frame: frame - 520,
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
          background: `radial-gradient(ellipse at 80% 30%, ${colors.tealDeeper}45 0%, transparent 55%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 24,
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
            PATH · 02
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
          Explorer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: colors.neutral200,
            lineHeight: 1.3,
            maxWidth: 900,
            opacity: interpolate(descProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(descProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Not satisfied with just using it.
          <br />
          <span style={{ color: colors.tealLight, fontWeight: 700 }}>
            Wants to know the core.
          </span>
        </div>

        {/* Traits */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            marginTop: 12,
          }}
        >
          {TRAITS.map((trait, i) => {
            const itemProgress = spring({
              frame: frame - (120 + i * 30),
              fps,
              config: { damping: 16, stiffness: 80 },
            });

            return (
              <div
                key={trait}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: interpolate(itemProgress, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(itemProgress, [0, 1], [-40, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    minWidth: 16,
                    borderRadius: 4,
                    backgroundColor: colors.tealLight,
                    boxShadow: `0 0 16px ${colors.tealLight}90`,
                  }}
                />
                <div
                  style={{
                    fontFamily: nunito,
                    fontSize: 32,
                    fontWeight: 600,
                    color: colors.white,
                    lineHeight: 1.25,
                  }}
                >
                  {trait}
                </div>
              </div>
            );
          })}
        </div>

        {/* Weeks -> Minutes transformation */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "28px 30px",
            backgroundColor: `${colors.tealDeeper}30`,
            border: `1.5px solid ${colors.tealLight}80`,
            borderRadius: 18,
            width: "100%",
            opacity: interpolate(weeksProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(weeksProgress, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontFamily: dmMono,
                fontSize: 18,
                color: colors.neutral400,
                letterSpacing: 2,
              }}
            >
              BEFORE
            </div>
            <div
              style={{
                fontFamily: nunito,
                fontSize: 64,
                fontWeight: 700,
                color: colors.neutral200,
                textDecoration: arrowProgress > 0.5 ? "line-through" : "none",
                textDecorationColor: colors.error,
                textDecorationThickness: 6,
              }}
            >
              Weeks
            </div>
          </div>

          <div
            style={{
              fontSize: 56,
              color: colors.tealLight,
              opacity: arrowProgress,
              transform: `translateX(${interpolate(arrowProgress, [0, 1], [-20, 0])}px)`,
            }}
          >
            →
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              opacity: interpolate(minutesProgress, [0, 1], [0, 1]),
              transform: `scale(${interpolate(minutesProgress, [0, 1], [0.8, 1])})`,
            }}
          >
            <div
              style={{
                fontFamily: dmMono,
                fontSize: 18,
                color: colors.tealLight,
                letterSpacing: 2,
              }}
            >
              AFTER
            </div>
            <div
              style={{
                fontFamily: nunito,
                fontSize: 72,
                fontWeight: 700,
                color: colors.tealLight,
                textShadow: `0 0 24px ${colors.tealLight}60`,
              }}
            >
              Minutes
            </div>
          </div>
        </div>

        {/* Closing line */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 32,
            fontWeight: 600,
            color: colors.white,
            marginTop: 12,
            lineHeight: 1.3,
            opacity: interpolate(finalProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(finalProgress, [0, 1], [16, 0])}px)`,
          }}
        >
          You become the one lighting the path.
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
