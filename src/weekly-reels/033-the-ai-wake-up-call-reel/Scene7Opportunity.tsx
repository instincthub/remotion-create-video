import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const COUNTRIES = [
  { flag: "🇫🇮", name: "Finland", detail: "AI from kindergarten" },
  { flag: "🇪🇪", name: "Estonia", detail: "AI in schools from age 7" },
  { flag: "🇨🇳", name: "China", detail: "80% student excitement" },
  { flag: "🇦🇪", name: "UAE", detail: "Mandatory — age 4 to Grade 12" },
];

export const Scene7Opportunity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counterProgress = spring({
    frame: frame - Math.round(fps * 0.5),
    fps,
    durationInFrames: Math.round(fps * 5),
    config: { damping: 200 },
  });
  const jobsValue = Math.round(interpolate(counterProgress, [0, 1], [0, 78]));

  const subtitle = spring({ frame: frame - Math.round(fps * 5), fps, config: { damping: 200 } });
  const countryTitle = spring({ frame: frame - Math.round(fps * 9), fps, config: { damping: 200 } });

  const countryProgresses = COUNTRIES.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (10 + i * 2)),
      fps,
      config: { damping: 200 },
    })
  );

  const comp = spring({ frame: frame - Math.round(fps * 20), fps, config: { damping: 200 } });
  const cta = spring({ frame: frame - Math.round(fps * 30), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Teal glow */}
      <div
        style={{
          position: "absolute",
          top: -300,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 36,
        }}
      >
        {/* Eyebrow */}
        <div style={{ fontSize: 18, fontWeight: 700, color: colors.tiffanyBlue, letterSpacing: 4 }}>
          THE OPPORTUNITY
        </div>

        {/* Big counter */}
        <div
          style={{
            opacity: interpolate(counterProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(counterProgress, [0, 0.5, 1], [0.7, 1.06, 1])})`,
            transformOrigin: "left center",
          }}
        >
          <div style={{ fontSize: 180, fontWeight: 900, color: colors.caribbeanGreen, lineHeight: 1, letterSpacing: -6 }}>
            {jobsValue}M
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: colors.white, marginTop: 4 }}>
            Net New Jobs This Decade
          </div>
          <div style={{ fontSize: 16, color: colors.rhythm, marginTop: 4 }}>World Economic Forum Projection</div>
        </div>

        <div
          style={{
            opacity: interpolate(subtitle, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitle, [0, 1], [16, 0])}px)`,
            fontSize: 26,
            color: colors.white,
            lineHeight: 1.5,
          }}
        >
          But only for people equipped with the{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: 700 }}>right skills</span>.
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `${colors.rhythm}40` }} />

        {/* Countries */}
        <div
          style={{
            opacity: interpolate(countryTitle, [0, 1], [0, 1]),
            fontSize: 14,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 3,
          }}
        >
          ALREADY TEACHING AI IN SCHOOLS
        </div>

        {COUNTRIES.map((c, i) => {
          const p = countryProgresses[i];
          const opacity = interpolate(p, [0, 1], [0, 1]);
          const x = interpolate(p, [0, 1], [32, 0]);
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "12px 0",
                borderBottom: `1px solid ${colors.rhythm}20`,
              }}
            >
              <span style={{ fontSize: 40 }}>{c.flag}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.white }}>{c.name}</div>
                <div style={{ fontSize: 16, color: colors.rhythm }}>{c.detail}</div>
              </div>
            </div>
          );
        })}

        {/* China vs USA */}
        <div
          style={{
            opacity: interpolate(comp, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(comp, [0, 1], [16, 0])}px)`,
            background: `${colors.darkSlateGray}CC`,
            borderRadius: 12,
            padding: "20px 24px",
            border: `1px solid ${colors.rhythm}30`,
          }}
        >
          <div style={{ fontSize: 14, color: colors.rhythm, marginBottom: 10, letterSpacing: 2 }}>
            STUDENT EXCITEMENT ABOUT AI
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: colors.caribbeanGreen, lineHeight: 1 }}>80%</div>
              <div style={{ fontSize: 16, color: colors.chineseSilver }}>China</div>
            </div>
            <div style={{ fontSize: 20, color: colors.rhythm }}>vs</div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: colors.oldRose, lineHeight: 1 }}>35%</div>
              <div style={{ fontSize: 16, color: colors.chineseSilver }}>United States</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: interpolate(cta, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cta, [0, 1], [16, 0])}px)`,
            fontSize: 24,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            lineHeight: 1.4,
          }}
        >
          The opportunity is enormous. But it will not wait.
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
