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
  { name: "JUMO", country: "South Africa", color: colors.sunsetAmber },
  { name: "MNT Halan", country: "Egypt", color: colors.tiffanyBlue },
  { name: "Tala", country: "Kenya", color: colors.caribbeanGreen },
  { name: "FairMoney", country: "Nigeria", color: colors.accentOrange },
];

export const Scene06Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fourSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, delay: 10 });
  const fourY = interpolate(fourSpring, [0, 1], [40, 0]);

  const patternSpring = spring({ frame, fps, config: { damping: 200 }, delay: 120 });

  const statementSpring = spring({ frame, fps, config: { damping: 200 }, delay: 210 });
  const statementY = interpolate(statementSpring, [0, 1], [20, 0]);

  const orb1X = Math.sin(frame * 0.007) * 40;
  const orb2X = Math.cos(frame * 0.006) * 30;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.deepNight} 0%, #0D1F18 50%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Background grid */}
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
          left: -150 + orb1X,
          top: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.caribbeanGreen}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -100 + orb2X,
          bottom: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.sunsetAmber}0E 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          paddingLeft: 130,
          paddingRight: 130,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Company pills row */}
        <div style={{ display: "flex", gap: 20, marginBottom: 56 }}>
          {COMPANIES.map((co, i) => {
            const cs = spring({ frame, fps, config: { damping: 200 }, delay: i * 45 });
            return (
              <div
                key={co.name}
                style={{
                  opacity: cs,
                  transform: `scale(${interpolate(cs, [0, 1], [0.85, 1])})`,
                  padding: "14px 28px",
                  borderRadius: 40,
                  border: `1.5px solid ${co.color}50`,
                  backgroundColor: `${co.color}10`,
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 700,
                    fontSize: 22,
                    color: co.color,
                  }}
                >
                  {co.name}
                </span>
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: 14,
                    color: `${colors.white}55`,
                    letterSpacing: 1,
                  }}
                >
                  {co.country}
                </span>
              </div>
            );
          })}
        </div>

        {/* "Four companies, four countries, one pattern." */}
        <div
          style={{
            opacity: fourSpring,
            transform: `translateY(${fourY}px)`,
            fontFamily: displayFont,
            fontWeight: 800,
            fontSize: 72,
            color: colors.white,
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Four companies.{" "}
          <span style={{ color: colors.sunsetAmber }}>Four countries.</span>
          <br />
          <span style={{ color: colors.caribbeanGreen }}>One pattern.</span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(patternSpring, [0, 1], [0, 640]),
            height: 3,
            background: `linear-gradient(90deg, ${colors.caribbeanGreen}, ${colors.tiffanyBlue}50)`,
            borderRadius: 2,
            marginBottom: 36,
          }}
        />

        {/* The pattern statement */}
        <div
          style={{
            opacity: statementSpring,
            transform: `translateY(${statementY}px)`,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 32,
            color: `${colors.white}80`,
            lineHeight: 1.5,
            maxWidth: 900,
          }}
        >
          Use{" "}
          <span style={{ color: colors.white, fontWeight: 500 }}>
            mobile and transaction data
          </span>{" "}
          to lend to people that{" "}
          <span style={{ color: colors.sunsetAmber, fontWeight: 500 }}>
            traditional systems ignore.
          </span>
        </div>

        {/* Episode badge */}
        {frame >= 240 && (
          <div
            style={{
              opacity: spring({ frame, fps, config: { damping: 200 }, delay: 240 }),
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 56,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: colors.sunsetAmber,
              }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: 16,
                color: `${colors.white}50`,
                letterSpacing: 2.5,
                textTransform: "uppercase" as const,
              }}
            >
              AI in Africa Series · Episode 07
            </span>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
