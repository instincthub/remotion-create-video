import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

// Population circles visualisation
const CIRCLES = Array.from({ length: 100 }, (_, i) => ({
  col: i % 10,
  row: Math.floor(i / 10),
  banked: i >= 40, // 60% are unbanked
}));

export const Scene08Gap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reason badge
  const reasonSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });

  // Heading
  const headingSpring = spring({ frame, fps, config: { damping: 200 }, delay: 60 });
  const headingY = interpolate(headingSpring, [0, 1], [20, 0]);

  // Main statement
  const statSpring = spring({ frame, fps, config: { damping: 200 }, delay: 140 });
  const statY = interpolate(statSpring, [0, 1], [16, 0]);

  // Circle grid reveal
  const gridFade = interpolate(frame, [160, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Second insight
  const insight2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 320 });
  const insight2Y = interpolate(insight2Spring, [0, 1], [16, 0]);

  // Third insight
  const insight3Spring = spring({ frame, fps, config: { damping: 200 }, delay: 420 });
  const insight3Y = interpolate(insight3Spring, [0, 1], [16, 0]);

  // Divider grow
  const dividerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });

  // "Gap" pulse
  const pulse = Math.sin(frame * 0.1) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${colors.deepNight} 0%, #0D1820 55%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Faint radial glow */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: 100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.turkishRose}0C 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          paddingLeft: 120,
          paddingRight: 120,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 80,
        }}
      >
        {/* Left text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            flex: 1,
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
                border: `2px solid ${colors.turkishRose}60`,
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
                  color: colors.turkishRose,
                }}
              >
                2
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
              Second reason
            </span>
          </div>

          {/* "The Gap." heading */}
          <div
            style={{
              opacity: headingSpring,
              transform: `translateY(${headingY}px)`,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 80,
                color: colors.turkishRose,
                transform: `scale(${pulse})`,
                display: "inline-block",
              }}
            >
              The Gap.
            </span>
          </div>

          {/* Accent rule */}
          <div
            style={{
              width: interpolate(dividerSpring, [0, 1], [0, 480]),
              height: 3,
              background: `linear-gradient(90deg, ${colors.turkishRose}70, transparent)`,
              borderRadius: 2,
              marginBottom: 32,
            }}
          />

          {/* Statement */}
          <div
            style={{
              opacity: statSpring,
              transform: `translateY(${statY}px)`,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 28,
                color: `${colors.white}80`,
                lineHeight: 1.6,
              }}
            >
              Hundreds of millions of African adults still operate{" "}
              <span
                style={{
                  color: colors.white,
                  fontWeight: 600,
                }}
              >
                outside the financial system.
              </span>
            </div>
          </div>

          {/* Second insight */}
          {frame >= 300 && (
            <div
              style={{
                opacity: insight2Spring,
                transform: `translateY(${insight2Y}px)`,
                marginBottom: 24,
                paddingLeft: 20,
                borderLeft: `3px solid ${colors.turkishRose}50`,
              }}
            >
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 24,
                  color: `${colors.white}65`,
                  lineHeight: 1.6,
                }}
              >
                This is the market traditional credit scoring{" "}
                <span
                  style={{
                    color: colors.oldRose,
                    fontWeight: 500,
                  }}
                >
                  cannot reach.
                </span>
              </div>
            </div>
          )}

          {/* Third insight */}
          {frame >= 400 && (
            <div
              style={{
                opacity: insight3Spring,
                transform: `translateY(${insight3Y}px)`,
                padding: 24,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${colors.caribbeanGreen}10, ${colors.tiffanyBlue}08)`,
                border: `1px solid ${colors.caribbeanGreen}25`,
              }}
            >
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 24,
                  color: `${colors.white}80`,
                  lineHeight: 1.6,
                }}
              >
                AI doesn't just{" "}
                <span style={{ fontStyle: "italic", color: `${colors.white}60` }}>
                  improve
                </span>{" "}
                African lending.
              </div>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 28,
                  color: colors.caribbeanGreen,
                  marginTop: 8,
                }}
              >
                It makes lending possible — for the majority.
              </div>
            </div>
          )}
        </div>

        {/* Right: population circles grid */}
        <div
          style={{
            flexShrink: 0,
            opacity: gridFade,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 14,
              color: `${colors.white}40`,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Representation of 100 adults
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 28px)",
              gap: 8,
            }}
          >
            {CIRCLES.map((c, i) => {
              const circleDelay = 160 + i * 8;
              const circleOpacity = interpolate(
                frame,
                [circleDelay, circleDelay + 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: c.banked
                      ? `${colors.tiffanyBlue}60`
                      : colors.turkishRose,
                    opacity: circleOpacity,
                    boxShadow: c.banked
                      ? "none"
                      : `0 0 6px ${colors.turkishRose}60`,
                  }}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: colors.turkishRose,
                }}
              />
              <span
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 14,
                  color: `${colors.white}60`,
                }}
              >
                Unbanked (~60%)
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: `${colors.tiffanyBlue}60`,
                }}
              />
              <span
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 14,
                  color: `${colors.white}60`,
                }}
              >
                Banked (~40%)
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
