import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

export const Scene06WhyFintech: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
    delay: 20,
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.85, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  // Subtitle
  const subtitleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 100 });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [20, 0]);

  // "Three reasons" line
  const reasonsSpring = spring({ frame, fps, config: { damping: 200 }, delay: 200 });

  // Accent bars animation
  const barSpring = spring({ frame, fps, config: { damping: 200 }, delay: 40 });

  // Background animation — sweeping gradient
  const sweepX = interpolate(frame, [0, 300], [-300, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.brandCharcoal} 0%, ${colors.continentGreen} 40%, ${colors.brandCharcoal} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Sweeping light reveal */}
      <div
        style={{
          position: "absolute",
          left: sweepX,
          top: 0,
          width: 1920,
          bottom: 0,
          background: `linear-gradient(90deg, transparent 0%, ${colors.caribbeanGreen}06 40%, ${colors.tiffanyBlue}05 60%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Corner grid marks */}
      {[
        { top: 40, left: 40 },
        { top: 40, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 32,
            height: 32,
            borderTop: i < 2 ? `2px solid ${colors.white}15` : undefined,
            borderBottom: i >= 2 ? `2px solid ${colors.white}15` : undefined,
            borderLeft: i % 2 === 0 ? `2px solid ${colors.white}15` : undefined,
            borderRight: i % 2 === 1 ? `2px solid ${colors.white}15` : undefined,
            opacity: barSpring,
          }}
        />
      ))}

      {/* Center content */}
      <AbsoluteFill
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 60,
          gap: 0,
        }}
      >
        {/* Section label */}
        <div
          style={{
            opacity: subtitleSpring,
            transform: `translateY(${subtitleY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              backgroundColor: `${colors.white}40`,
            }}
          />
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 16,
              color: `${colors.white}60`,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Deep dive
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              backgroundColor: `${colors.white}40`,
            }}
          />
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 800,
              fontSize: 72,
              color: colors.white,
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            Why fintech is Africa's
          </div>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 800,
              fontSize: 72,
              lineHeight: 1.15,
            }}
          >
            <span style={{ color: colors.sunsetAmber }}>deepest</span>
            {" "}
            <span style={{ color: colors.white }}>AI story</span>
          </div>
        </div>

        {/* Horizontal rule */}
        <div
          style={{
            width: interpolate(barSpring, [0, 1], [0, 480]),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.sunsetAmber}80, transparent)`,
            marginBottom: 48,
          }}
        />

        {/* Sub-claim */}
        <div
          style={{
            opacity: subtitleSpring,
            transform: `translateY(${subtitleY}px)`,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 32,
              color: `${colors.white}80`,
            }}
          >
            This is the sector where AI got serious{" "}
            <span
              style={{
                color: colors.white,
                fontWeight: 500,
              }}
            >
              first.
            </span>
          </span>
        </div>

        {/* Three reasons teaser */}
        {frame >= 180 && (
          <div
            style={{
              opacity: reasonsSpring,
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 16,
            }}
          >
            {["DATA", "GAP", "REGULATION"].map((reason, i) => {
              const badgeSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 200 + i * 50,
              });
              return (
                <div
                  key={reason}
                  style={{
                    opacity: badgeSpring,
                    transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
                    paddingLeft: 28,
                    paddingRight: 28,
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderRadius: 40,
                    border: `1.5px solid ${colors.white}30`,
                    backgroundColor: `${colors.white}08`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 500,
                      fontSize: 18,
                      color: `${colors.white}80`,
                      letterSpacing: 2,
                    }}
                  >
                    {reason}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
