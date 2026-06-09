import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

function useCounterFloat(
  frame: number,
  startFrame: number,
  endFrame: number,
  from: number,
  to: number,
  decimals: number = 1
) {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const value = from + (to - from) * progress;
  return value.toFixed(decimals);
}

const OTHER_SECTORS = [
  { label: "Healthcare", pct: 12, color: colors.tiffanyBlue },
  { label: "Agriculture", pct: 8, color: colors.caribbeanGreen },
  { label: "Logistics", pct: 15, color: colors.metallicBlue },
  { label: "Fintech", pct: 37.5, color: colors.sunsetAmber, highlight: true },
];

export const Scene09Regulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reason badge
  const reasonSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });

  // Heading
  const headingSpring = spring({ frame, fps, config: { damping: 200 }, delay: 60 });
  const headingY = interpolate(headingSpring, [0, 1], [20, 0]);

  // Statement
  const statSpring = spring({ frame, fps, config: { damping: 200 }, delay: 130 });

  // CBN stat
  const cbnSpring = spring({ frame, fps, config: { damping: 200 }, delay: 260 });
  const cbn37 = useCounterFloat(frame, 280, 440, 0, 37.5, 1);

  // Comparison bars
  const barsSpring = spring({ frame, fps, config: { damping: 200 }, delay: 460 });

  // Conclusion
  const conclusionSpring = spring({ frame, fps, config: { damping: 200 }, delay: 620 });
  const conclusionY = interpolate(conclusionSpring, [0, 1], [20, 0]);

  // Sign-off
  const signoffSpring = spring({ frame, fps, config: { damping: 200 }, delay: 720 });

  // Divider
  const dividerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.deepNight} 0%, #101825 55%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,171,188,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,171,188,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <AbsoluteFill
        style={{
          paddingLeft: 120,
          paddingRight: 120,
          flexDirection: "row",
          gap: 80,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Left column — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Reason badge */}
          <div
            style={{
              opacity: reasonSpring,
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: `2px solid ${colors.tiffanyBlue}60`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 22,
                  color: colors.tiffanyBlue,
                }}
              >
                3
              </span>
            </div>
            <span
              style={{
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: 18,
                color: `${colors.white}55`,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Third reason
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              opacity: headingSpring,
              transform: `translateY(${headingY}px)`,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 72,
                color: colors.tiffanyBlue,
              }}
            >
              Regulatory Headroom.
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: interpolate(dividerSpring, [0, 1], [0, 500]),
              height: 3,
              background: `linear-gradient(90deg, ${colors.tiffanyBlue}70, transparent)`,
              borderRadius: 2,
              marginBottom: 32,
            }}
          />

          {/* Statement */}
          <div
            style={{
              opacity: statSpring,
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 26,
              color: `${colors.white}75`,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            African Central Banks largely{" "}
            <span style={{ color: colors.white, fontWeight: 500 }}>
              encourage digital lending experimentation.
            </span>
          </div>

          {/* CBN stat */}
          {frame >= 240 && (
            <div
              style={{
                opacity: cbnSpring,
                padding: 28,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${colors.sunsetAmber}12, ${colors.accentOrange}06)`,
                border: `1.5px solid ${colors.sunsetAmber}35`,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 16,
                  color: `${colors.white}50`,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Central Bank of Nigeria — Fintech Report
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 800,
                    fontSize: 72,
                    color: colors.sunsetAmber,
                    lineHeight: 1,
                  }}
                >
                  {cbn37}%
                </span>
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 22,
                  color: `${colors.white}80`,
                }}
              >
                of Nigerian fintechs now use{" "}
                <span style={{ color: colors.white, fontWeight: 500 }}>
                  AI for credit scoring
                </span>
              </div>
            </div>
          )}

          {/* Conclusion */}
          {frame >= 600 && (
            <div
              style={{
                opacity: conclusionSpring,
                transform: `translateY(${conclusionY}px)`,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 32,
                  color: colors.white,
                  lineHeight: 1.4,
                }}
              >
                That is why fintech runs ahead of every other sector on this continent.
              </div>
            </div>
          )}

          {/* Sign-off */}
          {frame >= 700 && (
            <div
              style={{
                opacity: signoffSpring,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 32,
                  backgroundColor: colors.sunsetAmber,
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 700,
                    fontSize: 22,
                    color: colors.white,
                  }}
                >
                  AI Playbook · Africa Series
                </span>
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: 16,
                    color: `${colors.white}45`,
                  }}
                >
                  Next: 15 deployments, one by one.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right column — sector comparison bars */}
        {frame >= 440 && (
          <div
            style={{
              flexShrink: 0,
              width: 460,
              opacity: barsSpring,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: 15,
                color: `${colors.white}40`,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              AI adoption by sector
            </div>

            {OTHER_SECTORS.map((sector, i) => {
              const barDelay = 460 + i * 60;
              const barProgress = interpolate(frame, [barDelay, barDelay + 120], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: (t) => 1 - Math.pow(1 - t, 3),
              });
              const barWidth = barProgress * (sector.pct / 40) * 380;

              return (
                <div
                  key={sector.label}
                  style={{
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: bodyFont,
                        fontWeight: sector.highlight ? 600 : 400,
                        fontSize: sector.highlight ? 20 : 18,
                        color: sector.highlight ? colors.white : `${colors.white}65`,
                      }}
                    >
                      {sector.label}
                    </span>
                    <span
                      style={{
                        fontFamily: displayFont,
                        fontWeight: 700,
                        fontSize: 18,
                        color: sector.color,
                      }}
                    >
                      {sector.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: 380,
                      height: sector.highlight ? 12 : 8,
                      borderRadius: 6,
                      backgroundColor: `${colors.white}08`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: barWidth,
                        height: "100%",
                        background: sector.highlight
                          ? `linear-gradient(90deg, ${sector.color}, ${colors.accentOrange})`
                          : sector.color,
                        borderRadius: 6,
                        boxShadow: sector.highlight
                          ? `0 0 10px ${sector.color}50`
                          : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
