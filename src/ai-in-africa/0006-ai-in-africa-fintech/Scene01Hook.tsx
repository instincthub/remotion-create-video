import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

// Subtle background data-points (simulating mobile transaction dots)
const DATA_DOTS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 137.5) % 1920,
  y: (i * 97.3) % 1080,
  size: 2 + (i % 3),
  speed: 0.004 + (i % 5) * 0.0012,
  offset: i * 0.7,
}));

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Open Egypt's most used app right now."  → appears at frame 0
  const line1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const line1Y = interpolate(line1Spring, [0, 1], [24, 0]);

  // Line 2: "5 million people use every day." → frame 80
  const line2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });
  const line2Y = interpolate(line2Spring, [0, 1], [24, 0]);

  // Line 3: features list → frame 160
  const line3Spring = spring({ frame, fps, config: { damping: 200 }, delay: 160 });
  const line3Y = interpolate(line3Spring, [0, 1], [24, 0]);

  // Line 4: "All in one place." → frame 260
  const line4Spring = spring({ frame, fps, config: { damping: 200 }, delay: 260 });
  const line4Y = interpolate(line4Spring, [0, 1], [20, 0]);

  // Accent bar width
  const accentBarSpring = spring({ frame, fps, config: { damping: 200 }, delay: 30 });
  const accentBarWidth = interpolate(accentBarSpring, [0, 1], [0, 560]);

  // Number "5M" pulse
  const pulse = Math.sin(frame * 0.12) * 0.03 + 1;

  // Background orbs
  const orb1X = Math.sin(frame * 0.006) * 60;
  const orb1Y = Math.cos(frame * 0.005) * 40;
  const orb2X = Math.cos(frame * 0.007) * 50;
  const orb2Y = Math.sin(frame * 0.008) * 35;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${colors.deepNight} 0%, #0D2033 50%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,195,162,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,195,162,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          left: 1400 + orb1X,
          top: 150 + orb1Y,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.sunsetAmber}14 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -100 + orb2X,
          top: 400 + orb2Y,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Floating data dots */}
      {DATA_DOTS.map((dot, i) => {
        const drift = Math.sin(frame * dot.speed + dot.offset) * 8;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: dot.x + drift,
              top: dot.y + Math.cos(frame * dot.speed * 0.8 + dot.offset) * 6,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              backgroundColor: colors.caribbeanGreen,
              opacity: 0.18 + Math.sin(frame * dot.speed * 2 + dot.offset) * 0.08,
            }}
          />
        );
      })}

      {/* Content area */}
      <AbsoluteFill
        style={{
          paddingLeft: 120,
          paddingRight: 120,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Episode badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 40,
              opacity: line1Spring,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: colors.sunsetAmber,
              }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: 18,
                color: colors.sunsetAmber,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              AI in Africa · Episode 06
            </span>
          </div>

          {/* Line 1 */}
          <div
            style={{
              opacity: line1Spring,
              transform: `translateY(${line1Y}px)`,
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 36,
              color: `${colors.white}99`,
              marginBottom: 8,
            }}
          >
            Open Egypt's most used app right now.
          </div>

          {/* Accent bar */}
          <div
            style={{
              width: accentBarWidth,
              height: 3,
              background: `linear-gradient(90deg, ${colors.sunsetAmber}, ${colors.accentOrange}60)`,
              borderRadius: 2,
              marginBottom: 32,
            }}
          />

          {/* "5 million people" stat */}
          <div
            style={{
              opacity: line2Spring,
              transform: `translateY(${line2Y}px)`,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 128,
                color: colors.sunsetAmber,
                lineHeight: 1,
                transform: `scale(${pulse})`,
                display: "inline-block",
              }}
            >
              5M
            </span>
            <span
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 40,
                color: colors.white,
                opacity: 0.85,
              }}
            >
              people use it every day
            </span>
          </div>

          {/* Feature pills */}
          {frame >= 160 && (
            <div
              style={{
                opacity: line3Spring,
                transform: `translateY(${line3Y}px)`,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 36,
              }}
            >
              {["Loans", "Savings", "Payments", "Buy Now Pay Later", "E-commerce"].map(
                (feature, i) => {
                  const pillSpring = spring({
                    frame,
                    fps,
                    config: { damping: 200 },
                    delay: 160 + i * 30,
                  });
                  return (
                    <div
                      key={feature}
                      style={{
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 40,
                        border: `1.5px solid ${colors.caribbeanGreen}60`,
                        backgroundColor: `${colors.caribbeanGreen}12`,
                        opacity: pillSpring,
                        transform: `scale(${interpolate(pillSpring, [0, 1], [0.85, 1])})`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: bodyFont,
                          fontWeight: 500,
                          fontSize: 22,
                          color: colors.caribbeanGreen,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* "All in one place" */}
          {frame >= 260 && (
            <div
              style={{
                opacity: line4Spring,
                transform: `translateY(${line4Y}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 3,
                  backgroundColor: colors.tiffanyBlue,
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 48,
                  color: colors.white,
                }}
              >
                All in one place.
              </span>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
