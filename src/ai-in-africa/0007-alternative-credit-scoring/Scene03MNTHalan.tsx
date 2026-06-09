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

const PILLARS = [
  { label: "Lending", icon: "₦", color: colors.sunsetAmber },
  { label: "Payments", icon: "⇄", color: colors.tiffanyBlue },
  { label: "Commerce", icon: "◈", color: colors.caribbeanGreen },
];

export const Scene03MNTHalan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  const countrySpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });

  const integrationLine = spring({ frame, fps, config: { damping: 200 }, delay: 120 });

  const automationSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, delay: 330 });
  const automationY = interpolate(automationSpring, [0, 1], [30, 0]);
  const automationPct = useCounter(frame, 360, 570, 0, 50);

  const customersSpring = spring({ frame, fps, config: { damping: 200 }, delay: 500 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, #0B1F2E 0%, ${colors.deepNight} 55%, #112030 100%)`,
      }}
    >
      {/* Dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.tiffanyBlue}08 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

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
        {/* Company header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 10 }}>
          <div
            style={{
              width: 5,
              height: 70,
              background: `linear-gradient(180deg, ${colors.tiffanyBlue}, ${colors.caribbeanGreen}50)`,
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
              MNT Halan
            </div>
            <div
              style={{
                opacity: countrySpring,
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 20,
                color: colors.tiffanyBlue,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                marginTop: 4,
              }}
            >
              Egypt · Integrated AI Platform
            </div>
          </div>
        </div>

        {/* Integration note */}
        <div
          style={{
            opacity: integrationLine,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 24,
            color: `${colors.white}65`,
            marginBottom: 44,
            marginLeft: 25,
          }}
        >
          What's striking is the integration.
        </div>

        {/* Three pillars */}
        <div style={{ display: "flex", gap: 28, marginBottom: 52 }}>
          {PILLARS.map((pillar, i) => {
            const ps = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, delay: 160 + i * 70 });
            const sy = interpolate(ps, [0, 1], [20, 0]);
            return (
              <div
                key={pillar.label}
                style={{
                  opacity: ps,
                  transform: `translateY(${sy}px)`,
                  flex: 1,
                  padding: "36px 32px",
                  borderRadius: 20,
                  background: `${pillar.color}12`,
                  border: `1.5px solid ${pillar.color}40`,
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 800,
                    fontSize: 56,
                    color: pillar.color,
                    lineHeight: 1,
                  }}
                >
                  {pillar.icon}
                </div>
                <div
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 700,
                    fontSize: 28,
                    color: colors.white,
                  }}
                >
                  {pillar.label}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${pillar.color}60, transparent)`,
                    borderRadius: 1,
                  }}
                />
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: 18,
                    color: `${colors.white}60`,
                    textAlign: "center" as const,
                    lineHeight: 1.5,
                  }}
                >
                  {i === 0 && "Collateral-free loans via AI model"}
                  {i === 1 && "Transactions feed model training"}
                  {i === 2 && "Every purchase improves scoring"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Insight connector */}
        {frame >= 300 && (
          <div
            style={{
              opacity: spring({ frame, fps, config: { damping: 200 }, delay: 300 }),
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 22,
              color: `${colors.white}60`,
              marginBottom: 36,
            }}
          >
            The model gets smarter every time a customer buys, pays, or repays.
          </div>
        )}

        {/* Automation + Customers stats */}
        {frame >= 330 && (
          <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
            {/* 50% automation */}
            <div
              style={{
                opacity: automationSpring,
                transform: `translateY(${automationY}px)`,
                padding: "28px 44px",
                borderRadius: 18,
                background: `linear-gradient(135deg, ${colors.sunsetAmber}18 0%, ${colors.accentOrange}08 100%)`,
                border: `1.5px solid ${colors.sunsetAmber}40`,
                minWidth: 280,
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 80,
                  color: colors.sunsetAmber,
                  lineHeight: 1,
                }}
              >
                {automationPct}%
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 19,
                  color: `${colors.white}75`,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                automation rate
                <br />
                on loan approval
              </div>
            </div>

            {/* 5M customers */}
            <div
              style={{
                opacity: customersSpring,
                padding: "28px 44px",
                borderRadius: 18,
                background: `${colors.tiffanyBlue}10`,
                border: `1.5px solid ${colors.tiffanyBlue}35`,
                minWidth: 240,
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: 80,
                  color: colors.tiffanyBlue,
                  lineHeight: 1,
                }}
              >
                5M
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: 19,
                  color: `${colors.white}75`,
                  marginTop: 8,
                }}
              >
                customer scale
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
