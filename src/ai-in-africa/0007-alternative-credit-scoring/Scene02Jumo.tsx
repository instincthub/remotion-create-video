import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

function useCounter(frame: number, startF: number, endF: number, from: number, to: number) {
  const progress = interpolate(frame, [startF, endF], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return Math.round(from + (to - from) * progress);
}

const PARTNERS = ["MTN", "Airtel", "Ecobank", "LetSheGo"];

export const Scene02Jumo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Company reveal (0-150)
  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  const countrySpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });
  const descSpring = spring({ frame, fps, config: { damping: 200 }, delay: 100 });

  // Phase 2: Features + partners (150-450)
  const featureSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, delay: 150 });
  const featureY = interpolate(featureSpring, [0, 1], [30, 0]);

  const featCount = useCounter(frame, 180, 390, 0, 15000);

  // Phase 3: Stats reveal (450-840)
  const statsReveal = spring({ frame, fps, config: { damping: 200 }, delay: 450 });
  const disbursedCount = useCounter(frame, 480, 700, 0, 8);
  const customersCount = useCounter(frame, 540, 750, 0, 30);

  // Phase 4: Cerise score (840-1290)
  const ceriseSpring = spring({ frame, fps, config: { damping: 200 }, delay: 840 });
  const ceriseY = interpolate(ceriseSpring, [0, 1], [24, 0]);
  const ceriseScore = useCounter(frame, 870, 1080, 0, 92);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(155deg, ${colors.deepNight} 0%, #0A1E30 50%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Dot pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.sunsetAmber}08 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Diagonal accent */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1920 1080"
      >
        <line x1="0" y1="0" x2="520" y2="1080" stroke={`${colors.caribbeanGreen}10`} strokeWidth="2" />
        <line x1="1920" y1="0" x2="1400" y2="1080" stroke={`${colors.sunsetAmber}08`} strokeWidth="1.5" />
      </svg>

      <AbsoluteFill
        style={{
          paddingLeft: 130,
          paddingRight: 130,
          paddingTop: 90,
          paddingBottom: 90,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Company header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 12 }}>
          <div
            style={{
              width: 5,
              height: 70,
              background: `linear-gradient(180deg, ${colors.sunsetAmber}, ${colors.accentOrange}50)`,
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
                fontSize: 80,
                color: colors.white,
                lineHeight: 1,
              }}
            >
              JUMO
            </div>
            <div
              style={{
                opacity: countrySpring,
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 22,
                color: colors.sunsetAmber,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                marginTop: 4,
              }}
            >
              South Africa · Banking as a Service
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descSpring,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 26,
            color: `${colors.white}70`,
            marginBottom: 48,
            marginLeft: 25,
          }}
        >
          Credit engine embedded inside mobile operators
        </div>

        {/* Predictive features + Partners row */}
        {frame >= 150 && (
          <div
            style={{
              opacity: featureSpring,
              transform: `translateY(${featureY}px)`,
              display: "flex",
              gap: 40,
              alignItems: "flex-start",
              marginBottom: 50,
            }}
          >
            {/* Feature count card */}
            <div
              style={{
                padding: "36px 48px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${colors.sunsetAmber}18 0%, ${colors.accentOrange}08 100%)`,
                border: `1.5px solid ${colors.sunsetAmber}40`,
                minWidth: 300,
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 72,
                  color: colors.sunsetAmber,
                  lineHeight: 1,
                }}
              >
                {featCount.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 20,
                  color: `${colors.white}80`,
                  marginTop: 8,
                }}
              >
                predictive features
                <br />
                per applicant
              </div>
            </div>

            {/* Partners */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 18,
                  color: `${colors.white}50`,
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  marginBottom: 4,
                }}
              >
                Embedded in
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12 }}>
                {PARTNERS.map((p, i) => {
                  const ps = spring({ frame, fps, config: { damping: 200 }, delay: 200 + i * 50 });
                  return (
                    <div
                      key={p}
                      style={{
                        opacity: ps,
                        transform: `scale(${interpolate(ps, [0, 1], [0.8, 1])})`,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderRadius: 32,
                        border: `1.5px solid ${colors.caribbeanGreen}50`,
                        backgroundColor: `${colors.caribbeanGreen}10`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: bodyFont,
                          fontWeight: 500,
                          fontSize: 20,
                          color: colors.caribbeanGreen,
                        }}
                      >
                        {p}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 20,
                  color: `${colors.white}60`,
                  marginTop: 4,
                }}
              >
                across{" "}
                <span style={{ color: colors.tiffanyBlue, fontWeight: 600, fontSize: 24 }}>9</span>
                {" "}African markets
              </div>
            </div>
          </div>
        )}

        {/* Stats row */}
        {frame >= 450 && (
          <div
            style={{
              opacity: statsReveal,
              display: "flex",
              gap: 40,
              marginBottom: 48,
            }}
          >
            {[
              { value: `$${disbursedCount}B`, label: "disbursed since launch", color: colors.limeGreen },
              { value: `${customersCount}M+`, label: "customers served", color: colors.tiffanyBlue },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 44px",
                  borderRadius: 16,
                  background: `${stat.color}10`,
                  border: `1.5px solid ${stat.color}35`,
                  minWidth: 240,
                }}
              >
                <div
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 800,
                    fontSize: 64,
                    color: stat.color,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: 18,
                    color: `${colors.white}70`,
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cerise score */}
        {frame >= 840 && (
          <div
            style={{
              opacity: ceriseSpring,
              transform: `translateY(${ceriseY}px)`,
              display: "flex",
              alignItems: "center",
              gap: 28,
              padding: "28px 44px",
              borderRadius: 20,
              background: `linear-gradient(135deg, ${colors.limeGreen}15 0%, ${colors.caribbeanGreen}08 100%)`,
              border: `1.5px solid ${colors.limeGreen}40`,
              maxWidth: 900,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 80,
                  color: colors.limeGreen,
                  lineHeight: 1,
                }}
              >
                {ceriseScore}%
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 16,
                  color: `${colors.white}60`,
                  letterSpacing: 1.5,
                  textTransform: "uppercase" as const,
                }}
              >
                Cerise Score · April 2025
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 22,
                  color: `${colors.white}85`,
                  lineHeight: 1.5,
                }}
              >
                Global Cerise Customer Protection Audit
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 600,
                  fontSize: 20,
                  color: colors.limeGreen,
                  marginTop: 8,
                }}
              >
                Highest score ever recorded by any digital financial services company in the world.
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
