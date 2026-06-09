import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

// AI Playbook wordmark
const AIPlaybookWordmark: React.FC<{ opacity: number; scale: number }> = ({
  opacity,
  scale,
}) => (
  <div
    style={{
      opacity,
      transform: `scale(${scale})`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    }}
  >
    <div
      style={{
        fontFamily: displayFont,
        fontWeight: 800,
        fontSize: 56,
        color: colors.white,
        letterSpacing: -1,
        lineHeight: 1,
      }}
    >
      <span style={{ color: colors.darkCyra }}>AI</span>
      {" "}
      <span>Playbook</span>
    </div>
    <div
      style={{
        fontFamily: bodyFont,
        fontWeight: 400,
        fontSize: 14,
        color: `${colors.white}50`,
        letterSpacing: 4,
        textTransform: "uppercase",
      }}
    >
      Africa Series
    </div>
  </div>
);

export const Scene04Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    delay: 10,
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);

  // Horizontal divider
  const dividerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });
  const dividerWidth = interpolate(dividerSpring, [0, 1], [0, 700]);

  // "Welcome" greeting
  const greetingSpring = spring({ frame, fps, config: { damping: 200 }, delay: 120 });
  const greetingY = interpolate(greetingSpring, [0, 1], [16, 0]);

  // Name
  const nameSpring = spring({ frame, fps, config: { damping: 200 }, delay: 180 });
  const nameY = interpolate(nameSpring, [0, 1], [16, 0]);

  // Episode description
  const desc1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 280 });
  const desc2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 360 });
  const desc3Spring = spring({ frame, fps, config: { damping: 200 }, delay: 440 });

  // "Fintech" highlight reveal
  const fintechSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 480,
  });
  const fintechScale = interpolate(fintechSpring, [0, 1], [0.7, 1]);

  // Background orbs
  const orbDrift = Math.sin(frame * 0.006) * 30;

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.white }}
    >
      {/* Soft color orbs */}
      <div
        style={{
          position: "absolute",
          left: 1200 + orbDrift,
          top: -100,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}0A 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -200,
          top: 600,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.sunsetAmber}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Diagonal stripe texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 120px,
            rgba(0,131,143,0.012) 120px,
            rgba(0,131,143,0.012) 121px
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Left column — Logo + identity */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 560,
          bottom: 0,
          background: `linear-gradient(180deg, ${colors.brandCharcoal} 0%, #1E2D28 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <AIPlaybookWordmark opacity={logoSpring} scale={logoScale} />

        {/* Horizontal rule */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.darkCyra}60, transparent)`,
          }}
        />

        {/* Episode indicator */}
        <div
          style={{
            opacity: greetingSpring,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 13,
              color: `${colors.white}40`,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Episode
          </span>
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 64,
              color: colors.sunsetAmber,
              lineHeight: 1,
            }}
          >
            06
          </span>
        </div>
      </div>

      {/* Right column — intro content */}
      <div
        style={{
          position: "absolute",
          left: 620,
          right: 80,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Greeting */}
        <div
          style={{
            opacity: greetingSpring,
            transform: `translateY(${greetingY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 32,
              color: colors.rhythm,
            }}
          >
            Welcome to
          </span>
          {" "}
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 32,
              color: colors.brandCharcoal,
            }}
          >
            AI Playbook.
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            opacity: nameSpring,
            transform: `translateY(${nameY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 4,
              height: 36,
              backgroundColor: colors.darkCyra,
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 36,
              color: colors.brandCharcoal,
            }}
          >
            I'm Noah Olatoye.
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 320,
            height: 1,
            backgroundColor: `${colors.brandCharcoal}15`,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        {/* Episode description */}
        <div
          style={{
            opacity: desc1Spring,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 26,
            color: colors.darkSlateGray,
            lineHeight: 1.6,
          }}
        >
          In the last episode, we walked through the general landscape of AI in African businesses.
        </div>

        <div
          style={{
            opacity: desc2Spring,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 28,
            color: colors.brandCharcoal,
            lineHeight: 1.5,
          }}
        >
          Today, we go deep into{" "}
          <span
            style={{ color: colors.darkCyra }}
          >
            one sector
          </span>{" "}
          — where African AI is the oldest, biggest, and most measurable.
        </div>

        {/* "Fintech" reveal */}
        {frame >= 460 && (
          <div
            style={{
              opacity: fintechSpring,
              transform: `scale(${fintechScale})`,
              display: "inline-flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: colors.sunsetAmber,
                boxShadow: `0 0 12px ${colors.sunsetAmber}`,
              }}
            />
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 72,
                color: colors.brandCharcoal,
              }}
            >
              Fintech.
            </span>
          </div>
        )}

        {frame >= 460 && (
          <div
            style={{
              opacity: desc3Spring,
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 22,
              color: colors.rhythm,
            }}
          >
            15 verified AI deployments across the African fintech landscape.
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
