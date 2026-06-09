import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

function useCounter(
  frame: number,
  fps: number,
  startFrame: number,
  endFrame: number,
  from: number,
  to: number
) {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return Math.round(from + (to - from) * progress);
}

export const Scene03Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stat 1: 60% → animates from 0 to 60 over frames 30-120
  const stat60 = useCounter(frame, fps, 30, 120, 0, 60);

  // Stat 2: 2% → animates from 10 to 2 over frames 180-270 (counting down)
  const stat2 = useCounter(frame, fps, 180, 270, 10, 2);

  // Card 1 entrance
  const card1Spring = spring({ frame, fps, config: { damping: 15, stiffness: 80 }, delay: 10 });
  const card1Scale = interpolate(card1Spring, [0, 1], [0.85, 1]);

  // Card 2 entrance
  const card2Spring = spring({ frame, fps, config: { damping: 15, stiffness: 80 }, delay: 150 });
  const card2Scale = interpolate(card2Spring, [0, 1], [0.85, 1]);

  // Company reveal
  const companySpring = spring({ frame, fps, config: { damping: 200 }, delay: 300 });
  const companyY = interpolate(companySpring, [0, 1], [30, 0]);

  // Platform reveal
  const platformSpring = spring({ frame, fps, config: { damping: 200 }, delay: 360 });
  const platformY = interpolate(platformSpring, [0, 1], [20, 0]);

  // Insight text
  const insightSpring = spring({ frame, fps, config: { damping: 200 }, delay: 60 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.brandCharcoal} 0%, #1A2A24 60%, ${colors.deepNight} 100%)`,
      }}
    >
      {/* Subtle dot pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.caribbeanGreen}10 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Diagonal accent line */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1920 1080"
      >
        <line
          x1="0" y1="1080"
          x2="480" y2="0"
          stroke={`${colors.sunsetAmber}15`}
          strokeWidth="2"
        />
        <line
          x1="480" y1="1080"
          x2="960" y2="0"
          stroke={`${colors.sunsetAmber}08`}
          strokeWidth="1"
        />
      </svg>

      {/* Main content */}
      <AbsoluteFill
        style={{
          paddingLeft: 120,
          paddingRight: 120,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 0,
        }}
      >
        {/* Top insight line */}
        <div
          style={{
            opacity: insightSpring,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 28,
            color: `${colors.white}70`,
            marginBottom: 60,
          }}
        >
          Of the people it approved for loans…
        </div>

        {/* Two stat cards side by side */}
        <div style={{ display: "flex", gap: 48, marginBottom: 80 }}>
          {/* Stat card 1 — 60% */}
          <div
            style={{
              opacity: card1Spring,
              transform: `scale(${card1Scale})`,
              width: 560,
              padding: 48,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${colors.sunsetAmber}18 0%, ${colors.accentOrange}08 100%)`,
              border: `1.5px solid ${colors.sunsetAmber}40`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background number ghost */}
            <div
              style={{
                position: "absolute",
                right: -20,
                bottom: -40,
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 200,
                color: `${colors.sunsetAmber}06`,
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              %
            </div>

            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 100,
                color: colors.sunsetAmber,
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              {stat60}%
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 24,
                color: `${colors.white}85`,
                lineHeight: 1.5,
              }}
            >
              had{" "}
              <span
                style={{
                  color: colors.white,
                  fontWeight: 500,
                }}
              >
                no traditional credit history
              </span>
            </div>
          </div>

          {/* Stat card 2 — <2% NPL */}
          <div
            style={{
              opacity: card2Spring,
              transform: `scale(${card2Scale})`,
              width: 560,
              padding: 48,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${colors.limeGreen}12 0%, ${colors.caribbeanGreen}08 100%)`,
              border: `1.5px solid ${colors.limeGreen}35`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -20,
                bottom: -40,
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 200,
                color: `${colors.limeGreen}05`,
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              ↓
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 0,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 64,
                  color: colors.limeGreen,
                  lineHeight: 1,
                }}
              >
                {"<"}
              </span>
              <span
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 100,
                  color: colors.limeGreen,
                  lineHeight: 1,
                }}
              >
                {stat2}%
              </span>
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 24,
                color: `${colors.white}85`,
                lineHeight: 1.5,
              }}
            >
              non-performing loan ratio{" "}
              <span
                style={{
                  color: colors.limeGreen,
                  fontWeight: 500,
                }}
              >
                (industry-leading)
              </span>
            </div>
          </div>
        </div>

        {/* Company reveal */}
        <div
          style={{
            opacity: companySpring,
            transform: `translateY(${companyY}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 4,
                height: 48,
                background: `linear-gradient(180deg, ${colors.sunsetAmber}, ${colors.tiffanyBlue})`,
                borderRadius: 2,
              }}
            />
            <div>
              <div
                style={{
                  opacity: companySpring,
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 44,
                  color: colors.white,
                  lineHeight: 1.1,
                }}
              >
                MNT Halan
              </div>
              <div
                style={{
                  opacity: platformSpring,
                  transform: `translateY(${platformY}px)`,
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 24,
                  color: `${colors.white}70`,
                  letterSpacing: 1,
                }}
              >
                Platform:{" "}
                <span
                  style={{
                    color: colors.tiffanyBlue,
                    fontWeight: 500,
                  }}
                >
                  Neuron
                </span>{" "}
                ·{" "}
                <span style={{ color: `${colors.white}50` }}>
                  What AI in African fintech actually looks like today.
                </span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
