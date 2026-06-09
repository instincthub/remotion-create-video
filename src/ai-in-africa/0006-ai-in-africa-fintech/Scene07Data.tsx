import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

// Simulated transaction data flow particles
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  startX: 80 + (i % 5) * 180,
  y: 200 + Math.floor(i / 5) * 140,
  delay: i * 18,
  speed: 2.8 + (i % 3) * 0.6,
}));

const DATA_TYPES = [
  { label: "Airtime top-ups", icon: "📱", delay: 420 },
  { label: "M-PESA sends", icon: "💸", delay: 510 },
  { label: "Utility bills paid", icon: "🔋", delay: 600 },
];

export const Scene07Data: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reason label
  const reasonSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const reasonY = interpolate(reasonSpring, [0, 1], [16, 0]);

  // Main heading
  const headingSpring = spring({ frame, fps, config: { damping: 200 }, delay: 60 });
  const headingY = interpolate(headingSpring, [0, 1], [20, 0]);

  // Stat line
  const statSpring = spring({ frame, fps, config: { damping: 200 }, delay: 140 });

  // "Every transaction..." text
  const transSpring = spring({ frame, fps, config: { damping: 200 }, delay: 260 });
  const transY = interpolate(transSpring, [0, 1], [16, 0]);

  // Contrast section
  const contrastSpring = spring({ frame, fps, config: { damping: 200 }, delay: 560 });
  const contrastY = interpolate(contrastSpring, [0, 1], [20, 0]);

  // "That difference is the entire ball game."
  const ballgameSpring = spring({ frame, fps, config: { damping: 200 }, delay: 720 });

  // Animated bar showing penetration %
  const barProgress = interpolate(frame, [140, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const barWidth = barProgress * 640;

  // Particle positions
  const getParticleX = (particle: typeof PARTICLES[0]) => {
    const elapsed = frame - particle.delay;
    if (elapsed < 0) return -100;
    const x = (elapsed * particle.speed) % 1080;
    return particle.startX + x;
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.deepNight} 0%, #0A1C14 55%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Moving data particles */}
      {PARTICLES.map((p, i) => {
        const px = getParticleX(p);
        const visible = frame >= p.delay && frame < p.delay + 200;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: p.y,
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: colors.tiffanyBlue,
              opacity: visible ? 0.35 : 0,
              boxShadow: `0 0 6px ${colors.tiffanyBlue}60`,
              transition: "none",
            }}
          />
        );
      })}

      {/* Content */}
      <AbsoluteFill
        style={{
          paddingLeft: 120,
          paddingRight: 120,
          flexDirection: "column",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Reason number badge */}
        <div
          style={{
            opacity: reasonSpring,
            transform: `translateY(${reasonY}px)`,
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
              border: `2px solid ${colors.sunsetAmber}60`,
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
                color: colors.sunsetAmber,
              }}
            >
              1
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
            First reason
          </span>
        </div>

        {/* Main heading */}
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
              fontSize: 72,
              color: colors.sunsetAmber,
            }}
          >
            Data.
          </span>
        </div>

        {/* Africa mobile money stat */}
        <div
          style={{
            opacity: statSpring,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 30,
              color: `${colors.white}80`,
            }}
          >
            Africa has the{" "}
            <span
              style={{
                color: colors.white,
                fontWeight: 600,
              }}
            >
              highest mobile money penetration
            </span>{" "}
            in the world.
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 640,
              height: 8,
              borderRadius: 4,
              backgroundColor: `${colors.white}10`,
              overflow: "hidden",
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: barWidth,
                height: "100%",
                background: `linear-gradient(90deg, ${colors.sunsetAmber}, ${colors.accentOrange}80)`,
                borderRadius: 4,
                boxShadow: `0 0 12px ${colors.sunsetAmber}50`,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 16,
              color: `${colors.white}35`,
              letterSpacing: 1,
            }}
          >
            Mobile money penetration — Africa vs world average
          </span>
        </div>

        {/* "Every transaction..." */}
        {frame >= 240 && (
          <div
            style={{
              opacity: transSpring,
              transform: `translateY(${transY}px)`,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 26,
                color: `${colors.white}70`,
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Every transaction generates a structured data point.
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {DATA_TYPES.map((dt) => {
                const dtSpring = spring({
                  frame,
                  fps,
                  config: { damping: 200 },
                  delay: dt.delay,
                });
                return (
                  <div
                    key={dt.label}
                    style={{
                      opacity: dtSpring,
                      transform: `scale(${interpolate(dtSpring, [0, 1], [0.85, 1])})`,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 12,
                      backgroundColor: `${colors.tiffanyBlue}12`,
                      border: `1px solid ${colors.tiffanyBlue}30`,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{dt.icon}</span>
                    <span
                      style={{
                        fontFamily: bodyFont,
                        fontWeight: 500,
                        fontSize: 20,
                        color: colors.tiffanyBlue,
                      }}
                    >
                      {dt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* The contrast section */}
        {frame >= 540 && (
          <div
            style={{
              opacity: contrastSpring,
              transform: `translateY(${contrastY}px)`,
              display: "flex",
              gap: 32,
              marginBottom: 24,
              padding: 32,
              borderRadius: 16,
              backgroundColor: `${colors.white}04`,
              border: `1px solid ${colors.white}10`,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: 15,
                  color: `${colors.white}40`,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Most of the world
              </div>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 28,
                  color: `${colors.white}60`,
                }}
              >
                Train on credit bureau data
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                backgroundColor: `${colors.white}15`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: 15,
                  color: colors.sunsetAmber,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Africa
              </div>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 28,
                  color: colors.white,
                }}
              >
                Train on mobile money behaviour
              </div>
            </div>
          </div>
        )}

        {/* "That difference is the entire ball game." */}
        {frame >= 700 && (
          <div
            style={{
              opacity: ballgameSpring,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 4,
                height: 32,
                backgroundColor: colors.caribbeanGreen,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 32,
                color: colors.white,
              }}
            >
              That difference is the entire ball game.
            </span>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
