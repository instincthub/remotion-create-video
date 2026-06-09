import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const NODES = Array.from({ length: 20 }, (_, i) => ({
  x: (i * 173.3) % 1920,
  y: (i * 112.7) % 1080,
  r: 3 + (i % 4),
  phase: i * 0.6,
  speed: 0.003 + (i % 6) * 0.0008,
}));

const LINES = [
  { x1: 200, y1: 200, x2: 600, y2: 400 },
  { x1: 600, y1: 400, x2: 1100, y2: 250 },
  { x1: 1100, y1: 250, x2: 1700, y2: 500 },
  { x1: 300, y1: 700, x2: 800, y2: 600 },
  { x1: 800, y1: 600, x2: 1400, y2: 750 },
];

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });

  const line1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 30 });
  const line1Y = interpolate(line1Spring, [0, 1], [28, 0]);

  const accentWidth = interpolate(
    spring({ frame, fps, config: { damping: 200 }, delay: 50 }),
    [0, 1],
    [0, 520]
  );

  const headlineSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, delay: 70 });
  const headlineY = interpolate(headlineSpring, [0, 1], [40, 0]);

  const subSpring = spring({ frame, fps, config: { damping: 200 }, delay: 160 });
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  const orb1X = Math.sin(frame * 0.005) * 50;
  const orb1Y = Math.cos(frame * 0.006) * 35;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.deepNight} 0%, #0C1E2E 55%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,195,162,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,195,162,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* Network SVG */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1920 1080"
      >
        {LINES.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={`${colors.tiffanyBlue}12`}
            strokeWidth="1.5"
          />
        ))}
        {NODES.map((n, i) => {
          const drift = Math.sin(frame * n.speed + n.phase) * 6;
          return (
            <circle
              key={i}
              cx={n.x + drift}
              cy={n.y + Math.cos(frame * n.speed * 0.9 + n.phase) * 5}
              r={n.r}
              fill={colors.caribbeanGreen}
              opacity={0.12 + Math.sin(frame * n.speed * 2 + n.phase) * 0.06}
            />
          );
        })}
      </svg>

      {/* Ambient orb */}
      <div
        style={{
          position: "absolute",
          right: -100 + orb1X,
          top: 80 + orb1Y,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.sunsetAmber}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          paddingLeft: 130,
          paddingRight: 130,
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: badgeSpring,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 44,
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
              textTransform: "uppercase" as const,
            }}
          >
            AI in Africa · Episode 07
          </span>
        </div>

        {/* Lead-in */}
        <div
          style={{
            opacity: line1Spring,
            transform: `translateY(${line1Y}px)`,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 34,
            color: `${colors.white}80`,
            marginBottom: 16,
          }}
        >
          The biggest AI story in African fintech is
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: accentWidth,
            height: 3,
            background: `linear-gradient(90deg, ${colors.sunsetAmber}, ${colors.caribbeanGreen}60)`,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Headline */}
        <div
          style={{
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
            fontFamily: displayFont,
            fontWeight: 800,
            fontSize: 96,
            color: colors.white,
            lineHeight: 1.05,
            marginBottom: 40,
          }}
        >
          Alternative{" "}
          <span style={{ color: colors.sunsetAmber }}>Credit</span>
          <br />
          Scoring.
        </div>

        {/* Sub-line */}
        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 30,
            color: `${colors.white}75`,
            marginBottom: 48,
          }}
        >
          I want to walk you through{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: 500 }}>
            four operators
          </span>{" "}
          who build it at scale.
        </div>

        {/* Country pills */}
        {frame >= 240 && (
          <div style={{ display: "flex", gap: 16 }}>
            {["South Africa", "Egypt", "Kenya", "Nigeria"].map((country, i) => {
              const ps = spring({ frame, fps, config: { damping: 200 }, delay: 240 + i * 40 });
              return (
                <div
                  key={country}
                  style={{
                    opacity: ps,
                    transform: `scale(${interpolate(ps, [0, 1], [0.85, 1])})`,
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 40,
                    border: `1.5px solid ${colors.tiffanyBlue}50`,
                    backgroundColor: `${colors.tiffanyBlue}10`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 500,
                      fontSize: 20,
                      color: colors.tiffanyBlue,
                    }}
                  >
                    {country}
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
