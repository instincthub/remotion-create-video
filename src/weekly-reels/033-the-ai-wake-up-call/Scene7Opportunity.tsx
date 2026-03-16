import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";
import { Logo } from "./Logo";

const COUNTRIES = [
  { flag: "🇫🇮", name: "Finland", detail: "AI literacy from kindergarten" },
  { flag: "🇪🇪", name: "Estonia", detail: "AI in schools from age 7" },
  { flag: "🇨🇳", name: "China", detail: "80% student excitement about AI" },
  { flag: "🇦🇪", name: "UAE", detail: "Mandatory — age 4 through Grade 12" },
];

const CountryRow: React.FC<{
  flag: string;
  name: string;
  detail: string;
  progress: number;
}> = ({ flag, name, detail, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "16px 0",
        borderBottom: `1px solid ${colors.rhythm}25`,
      }}
    >
      <span style={{ fontSize: 32 }}>{flag}</span>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: colors.white }}>
          {name}
        </div>
        <div style={{ fontSize: 15, color: colors.rhythm, marginTop: 2 }}>
          {detail}
        </div>
      </div>
    </div>
  );
};

export const Scene7Opportunity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated jobs counter
  const counterProgress = spring({
    frame: frame - Math.round(fps * 0.5),
    fps,
    durationInFrames: Math.round(fps * 5),
    config: { damping: 200 },
  });
  const jobsValue = Math.round(interpolate(counterProgress, [0, 1], [0, 78]));

  const subtitleProgress = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 200 },
  });

  const dividerProgress = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    config: { damping: 200 },
  });

  const countryProgresses = COUNTRIES.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (7 + i * 2)),
      fps,
      config: { damping: 200 },
    })
  );

  const compProgress = spring({
    frame: frame - Math.round(fps * 18),
    fps,
    config: { damping: 200 },
  });

  const ctaProgress = spring({
    frame: frame - Math.round(fps * 28),
    fps,
    config: { damping: 200 },
  });

  const counterOpacity = interpolate(counterProgress, [0, 1], [0, 1]);
  const counterScale = interpolate(counterProgress, [0, 0.5, 1], [0.7, 1.06, 1]);

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Subtle teal glow top-left */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "80px 80px 220px",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Left: Jobs counter */}
        <div
          style={{
            flex: "0 0 540px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.tiffanyBlue,
              letterSpacing: 4,
            }}
          >
            THE OPPORTUNITY
          </div>

          {/* Big counter */}
          <div
            style={{
              opacity: counterOpacity,
              transform: `scale(${counterScale})`,
              transformOrigin: "left center",
            }}
          >
            <div
              style={{
                fontSize: 160,
                fontWeight: 900,
                color: colors.caribbeanGreen,
                lineHeight: 1,
                letterSpacing: -6,
              }}
            >
              {jobsValue}M
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: colors.white,
                marginTop: 4,
              }}
            >
              Net New Jobs This Decade
            </div>
            <div style={{ fontSize: 15, color: colors.rhythm, marginTop: 6 }}>
              World Economic Forum Projection
            </div>
          </div>

          <div
            style={{
              opacity: interpolate(subtitleProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(subtitleProgress, [0, 1], [16, 0])}px)`,
              fontSize: 22,
              color: colors.white,
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            But only for people equipped with the{" "}
            <span style={{ color: colors.caribbeanGreen, fontWeight: 700 }}>
              right skills.
            </span>
          </div>

          {/* Excitement comparison */}
          <div
            style={{
              opacity: interpolate(compProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(compProgress, [0, 1], [16, 0])}px)`,
              background: `${colors.darkSlateGray}CC`,
              borderRadius: 12,
              padding: "20px 24px",
              border: `1px solid ${colors.rhythm}30`,
            }}
          >
            <div style={{ fontSize: 14, color: colors.rhythm, marginBottom: 12, letterSpacing: 2 }}>
              STUDENT EXCITEMENT ABOUT AI
            </div>
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: colors.caribbeanGreen, lineHeight: 1 }}>80%</div>
                <div style={{ fontSize: 14, color: colors.chineseSilver, marginTop: 4 }}>China</div>
              </div>
              <div style={{ fontSize: 24, color: colors.rhythm }}>vs</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: colors.oldRose, lineHeight: 1 }}>35%</div>
                <div style={{ fontSize: 14, color: colors.chineseSilver, marginTop: 4 }}>United States</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 1,
            alignSelf: "stretch",
            background: `linear-gradient(to bottom, transparent, ${colors.rhythm}40, transparent)`,
            opacity: interpolate(dividerProgress, [0, 1], [0, 1]),
          }}
        />

        {/* Right: Countries list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.rhythm,
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            ALREADY TEACHING AI IN SCHOOLS
          </div>

          {COUNTRIES.map((c, i) => (
            <CountryRow
              key={i}
              flag={c.flag}
              name={c.name}
              detail={c.detail}
              progress={countryProgresses[i]}
            />
          ))}

          {/* CTA */}
          <div
            style={{
              opacity: interpolate(ctaProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(ctaProgress, [0, 1], [16, 0])}px)`,
              marginTop: 32,
              padding: "20px 24px",
              background: `${colors.darkCyra}20`,
              borderRadius: 10,
              borderLeft: `4px solid ${colors.darkCyra}`,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.white, lineHeight: 1.5 }}>
              This is not just an education problem.
            </div>
            <div style={{ fontSize: 18, color: colors.caribbeanGreen, marginTop: 6, fontWeight: 700 }}>
              It is a preparation problem. And it starts at home.
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <Logo />
    </AbsoluteFill>
  );
};
