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

const DATA_SOURCES = [
  { label: "SMS records", icon: "✉", color: colors.sunsetAmber },
  { label: "M-PESA history", icon: "📱", color: colors.caribbeanGreen },
  { label: "App installs", icon: "⊞", color: colors.tiffanyBlue },
  { label: "GPS patterns", icon: "◎", color: colors.turkishRose },
];

export const Scene04Tala: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  const countrySpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });

  const pointsSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, delay: 150 });
  const pointsY = interpolate(pointsSpring, [0, 1], [30, 0]);
  const pointsCount = useCounter(frame, 180, 420, 0, 250);

  const permSpring = spring({ frame, fps, config: { damping: 200 }, delay: 380 });

  const modelSpring = spring({ frame, fps, config: { damping: 200 }, delay: 530 });

  const statsSpring = spring({ frame, fps, config: { damping: 200 }, delay: 660 });

  // Phone dots floating
  const PHONE_DOTS = Array.from({ length: 14 }, (_, i) => ({
    x: 1500 + (i * 47.3) % 380,
    y: 100 + (i * 71.9) % 860,
    phase: i * 0.7,
    speed: 0.004 + (i % 4) * 0.001,
  }));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${colors.deepNight} 0%, #0F1E10 55%, ${colors.brandCharcoal} 100%)`,
      }}
    >
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,197,162,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,197,162,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Floating phone dots */}
      {PHONE_DOTS.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x + Math.sin(frame * d.speed + d.phase) * 8,
            top: d.y + Math.cos(frame * d.speed * 0.8 + d.phase) * 6,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: colors.caribbeanGreen,
            opacity: 0.1 + Math.sin(frame * d.speed * 2 + d.phase) * 0.05,
          }}
        />
      ))}

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
              background: `linear-gradient(180deg, ${colors.caribbeanGreen}, ${colors.tiffanyBlue}50)`,
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
              Tala
            </div>
            <div
              style={{
                opacity: countrySpring,
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 20,
                color: colors.caribbeanGreen,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                marginTop: 4,
              }}
            >
              Kenya · Originally a Kenya Story
            </div>
          </div>
        </div>

        {/* 250 data points */}
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start", marginBottom: 44 }}>
          {frame >= 150 && (
            <div
              style={{
                opacity: pointsSpring,
                transform: `translateY(${pointsY}px)`,
                padding: "32px 44px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${colors.caribbeanGreen}18 0%, ${colors.tiffanyBlue}08 100%)`,
                border: `1.5px solid ${colors.caribbeanGreen}45`,
                minWidth: 280,
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 88,
                  color: colors.caribbeanGreen,
                  lineHeight: 1,
                }}
              >
                {pointsCount}
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 20,
                  color: `${colors.white}75`,
                  marginTop: 8,
                }}
              >
                data points
                <br />
                pulled per user
              </div>
            </div>
          )}

          {/* Data sources grid */}
          <div style={{ flex: 1 }}>
            {frame >= 380 && (
              <div
                style={{
                  opacity: permSpring,
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 20,
                  color: `${colors.white}55`,
                  marginBottom: 20,
                }}
              >
                Pulled from your phone with your permission:
              </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 16 }}>
              {DATA_SOURCES.map((src, i) => {
                const ds = spring({ frame, fps, config: { damping: 200 }, delay: 400 + i * 60 });
                return (
                  <div
                    key={src.label}
                    style={{
                      opacity: ds,
                      transform: `scale(${interpolate(ds, [0, 1], [0.85, 1])})`,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      paddingLeft: 20,
                      paddingRight: 24,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 36,
                      border: `1.5px solid ${src.color}45`,
                      backgroundColor: `${src.color}0E`,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{src.icon}</span>
                    <span
                      style={{
                        fontFamily: bodyFont,
                        fontWeight: 500,
                        fontSize: 20,
                        color: src.color,
                      }}
                    >
                      {src.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Model description */}
        {frame >= 530 && (
          <div
            style={{
              opacity: modelSpring,
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 26,
              color: `${colors.white}70`,
              marginBottom: 44,
              paddingLeft: 4,
            }}
          >
            The model uses these to underwrite{" "}
            <span style={{ color: colors.white, fontWeight: 500 }}>
              collateral-free microloans.
            </span>
          </div>
        )}

        {/* Stats */}
        {frame >= 660 && (
          <div
            style={{
              opacity: statsSpring,
              display: "flex",
              gap: 36,
            }}
          >
            {[
              { value: "$2.7B", label: "total disbursed", color: colors.sunsetAmber },
              { value: "6M", label: "customers", color: colors.tiffanyBlue },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "24px 40px",
                  borderRadius: 16,
                  background: `${s.color}10`,
                  border: `1.5px solid ${s.color}35`,
                  minWidth: 200,
                }}
              >
                <div
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 800,
                    fontSize: 64,
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
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
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
