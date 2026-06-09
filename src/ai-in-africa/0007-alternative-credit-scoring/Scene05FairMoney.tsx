import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

function useCounter(frame: number, startF: number, endF: number, from: number, to: number, decimals = 0) {
  const progress = interpolate(frame, [startF, endF], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const val = from + (to - from) * progress;
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val);
}

const DATA_SIGNALS = [
  { label: "App usage patterns", color: colors.sunsetAmber },
  { label: "Transaction velocity", color: colors.tiffanyBlue },
  { label: "Digital footprints", color: colors.caribbeanGreen },
];

export const Scene05FairMoney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  const countrySpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });

  const engineLine = spring({ frame, fps, config: { damping: 200 }, delay: 100 });

  const growth = useCounter(frame, 210, 450, 0, 62) as number;
  const growthSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, delay: 200 });
  const growthY = interpolate(growthSpring, [0, 1], [30, 0]);

  const nairaVal = useCounter(frame, 420, 600, 0, 1299, 1) as string;
  const nairaSpring = spring({ frame, fps, config: { damping: 200 }, delay: 420 });

  const usdSpring = spring({ frame, fps, config: { damping: 200 }, delay: 540 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${colors.deepNight} 0%, #1A0E0A 55%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.accentOrange}07 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1920 1080"
      >
        <line x1="1920" y1="1080" x2="1400" y2="0" stroke={`${colors.sunsetAmber}10`} strokeWidth="2" />
      </svg>

      <AbsoluteFill
        style={{
          paddingLeft: 130,
          paddingRight: 130,
          paddingTop: 80,
          paddingBottom: 80,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 10 }}>
          <div
            style={{
              width: 5,
              height: 70,
              background: `linear-gradient(180deg, ${colors.accentOrange}, ${colors.sunsetAmber}50)`,
              borderRadius: 3,
              opacity: titleSpring,
            }}
          />
          <div>
            <div
              style={{
                opacity: titleSpring,
                transform: `translateY(${titleY}px)`,
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 72,
                color: colors.white,
                lineHeight: 1,
              }}
            >
              FairMoney
            </div>
            <div
              style={{
                opacity: countrySpring,
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 20,
                color: colors.accentOrange,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                marginTop: 4,
              }}
            >
              Nigeria · Alternative Data Credit Engine
            </div>
          </div>
        </div>

        {/* Engine description */}
        <div
          style={{
            opacity: engineLine,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 24,
            color: `${colors.white}65`,
            marginBottom: 44,
            marginLeft: 25,
          }}
        >
          Built its credit engine on alternative data signals:
        </div>

        {/* Signals */}
        <div style={{ display: "flex", gap: 20, marginBottom: 52 }}>
          {DATA_SIGNALS.map((sig, i) => {
            const ss = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, delay: 130 + i * 60 });
            return (
              <div
                key={sig.label}
                style={{
                  opacity: ss,
                  transform: `scale(${interpolate(ss, [0, 1], [0.85, 1])})`,
                  flex: 1,
                  padding: "28px 32px",
                  borderRadius: 18,
                  background: `${sig.color}10`,
                  border: `1.5px solid ${sig.color}40`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: sig.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 600,
                    fontSize: 24,
                    color: colors.white,
                  }}
                >
                  {sig.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Revenue growth */}
        {frame >= 200 && (
          <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
            {/* 62% growth */}
            <div
              style={{
                opacity: growthSpring,
                transform: `translateY(${growthY}px)`,
                padding: "32px 48px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${colors.sunsetAmber}18 0%, ${colors.accentOrange}08 100%)`,
                border: `1.5px solid ${colors.sunsetAmber}45`,
                minWidth: 280,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -24,
                  bottom: -32,
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 160,
                  color: `${colors.sunsetAmber}06`,
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                ↑
              </div>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 88,
                  color: colors.sunsetAmber,
                  lineHeight: 1,
                }}
              >
                {growth}%
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 20,
                  color: `${colors.white}75`,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                revenue growth
                <br />
                year over year
              </div>
            </div>

            {/* Revenue amount */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 24 }}>
              {frame >= 420 && (
                <div
                  style={{
                    opacity: nairaSpring,
                    padding: "24px 40px",
                    borderRadius: 16,
                    background: `${colors.caribbeanGreen}10`,
                    border: `1.5px solid ${colors.caribbeanGreen}35`,
                    minWidth: 340,
                  }}
                >
                  <div
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 800,
                      fontSize: 56,
                      color: colors.caribbeanGreen,
                      lineHeight: 1,
                    }}
                  >
                    ₦{nairaVal}B
                  </div>
                  <div
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 400,
                      fontSize: 18,
                      color: `${colors.white}65`,
                      marginTop: 8,
                    }}
                  >
                    Naira revenue · 2024
                  </div>
                </div>
              )}
              {frame >= 540 && (
                <div
                  style={{
                    opacity: usdSpring,
                    padding: "24px 40px",
                    borderRadius: 16,
                    background: `${colors.tiffanyBlue}10`,
                    border: `1.5px solid ${colors.tiffanyBlue}35`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 800,
                      fontSize: 56,
                      color: colors.tiffanyBlue,
                      lineHeight: 1,
                    }}
                  >
                    ~$78M
                  </div>
                  <div
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 400,
                      fontSize: 18,
                      color: `${colors.white}65`,
                      marginTop: 8,
                    }}
                  >
                    USD equivalent
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
