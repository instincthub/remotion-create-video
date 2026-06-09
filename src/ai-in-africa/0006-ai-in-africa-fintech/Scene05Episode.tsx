import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const COMPANIES = [
  { name: "Jumo", country: "South Africa", color: colors.tiffanyBlue },
  { name: "Tala", country: "Kenya", color: colors.caribbeanGreen },
  { name: "FairMoney", country: "Nigeria", color: colors.sunsetAmber },
  { name: "Carbon", country: "Nigeria", color: colors.accentOrange },
  { name: "Pezesha", country: "Kenya", color: colors.limeGreen },
  { name: "Naked Insurance", country: "South Africa", color: colors.tiffanyBlue },
  { name: "Empata", country: "South Africa", color: colors.caribbeanGreen },
];

const THREE_PILLARS = [
  {
    number: "01",
    label: "How money is lent",
    color: colors.sunsetAmber,
    delay: 800,
  },
  {
    number: "02",
    label: "How risk is priced",
    color: colors.tiffanyBlue,
    delay: 900,
  },
  {
    number: "03",
    label: "How banks talk to customers",
    color: colors.caribbeanGreen,
    delay: 1000,
  },
];

export const Scene05Episode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const headerY = interpolate(headerSpring, [0, 1], [20, 0]);

  // "15" counter
  const countSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, delay: 60 });
  const countScale = interpolate(countSpring, [0, 1], [0.5, 1]);

  // Subtitle
  const subtitleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 120 });

  // Phase change: companies appear then pillars
  const showPhase2 = frame >= 720;

  const phase2Fade = interpolate(frame, [720, 790], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${colors.deepNight} 0%, #0C1F1A 50%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Horizontal scan lines */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.008) 3px,
            rgba(255,255,255,0.008) 4px
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Phase 1: Companies list (0-720) */}
      {!showPhase2 && (
        <AbsoluteFill
          style={{
            paddingLeft: 120,
            paddingRight: 120,
            flexDirection: "column",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* "15 verified AI deployments" */}
          <div
            style={{
              opacity: headerSpring,
              transform: `translateY(${headerY}px)`,
              display: "flex",
              alignItems: "baseline",
              gap: 20,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 120,
                color: colors.sunsetAmber,
                lineHeight: 1,
                opacity: countSpring,
                transform: `scale(${countScale})`,
                display: "inline-block",
              }}
            >
              15
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 48,
                  color: colors.white,
                  lineHeight: 1,
                }}
              >
                verified AI deployments
              </span>
              <span
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 28,
                  color: `${colors.white}60`,
                }}
              >
                across the African fintech landscape
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: interpolate(subtitleSpring, [0, 1], [0, 800]),
              height: 2,
              background: `linear-gradient(90deg, ${colors.sunsetAmber}80, transparent)`,
              marginBottom: 40,
            }}
          />

          {/* Company grid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {COMPANIES.map((company, i) => {
              const delay = 180 + i * 60;
              const compSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay,
              });
              const compX = interpolate(compSpring, [0, 1], [-30, 0]);

              return (
                <div
                  key={company.name}
                  style={{
                    opacity: compSpring,
                    transform: `translateX(${compX}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: company.color,
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${company.color}60`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 700,
                      fontSize: 36,
                      color: colors.white,
                    }}
                  >
                    {company.name}
                  </span>
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 400,
                      fontSize: 22,
                      color: `${colors.white}45`,
                    }}
                  >
                    {company.country}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: `linear-gradient(90deg, ${company.color}20, transparent)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}

      {/* Phase 2: Three pillars (720+) */}
      {showPhase2 && (
        <AbsoluteFill
          style={{
            paddingLeft: 120,
            paddingRight: 120,
            flexDirection: "column",
            justifyContent: "center",
            gap: 0,
            opacity: phase2Fade,
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 28,
                color: `${colors.white}60`,
                marginBottom: 8,
              }}
            >
              By the end, you'll understand how AI is rebuilding
            </div>
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 52,
                color: colors.white,
              }}
            >
              three things in African finance.
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 600,
              height: 2,
              background: `linear-gradient(90deg, ${colors.tiffanyBlue}80, transparent)`,
              marginBottom: 60,
            }}
          />

          {/* Pillars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {THREE_PILLARS.map((pillar, i) => {
              const pillarSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: pillar.delay,
              });
              const pillarX = interpolate(pillarSpring, [0, 1], [-20, 0]);

              return (
                <div
                  key={i}
                  style={{
                    opacity: pillarSpring,
                    transform: `translateX(${pillarX}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 32,
                  }}
                >
                  <span
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 800,
                      fontSize: 24,
                      color: pillar.color,
                      opacity: 0.6,
                      minWidth: 40,
                    }}
                  >
                    {pillar.number}
                  </span>
                  <div
                    style={{
                      width: 3,
                      height: 48,
                      backgroundColor: pillar.color,
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 700,
                      fontSize: 44,
                      color: colors.white,
                    }}
                  >
                    {pillar.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          {frame >= 1050 && (
            <div
              style={{
                marginTop: 60,
                opacity: interpolate(frame, [1050, 1110], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 2,
                  backgroundColor: colors.sunsetAmber,
                }}
              />
              <span
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 36,
                  color: colors.sunsetAmber,
                }}
              >
                Let's get started.
              </span>
            </div>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
