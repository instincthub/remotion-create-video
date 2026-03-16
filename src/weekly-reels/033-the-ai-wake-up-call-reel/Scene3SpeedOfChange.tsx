import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene3SpeedOfChange: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 200 } });
  const bar2023 = spring({ frame: frame - Math.round(fps * 2), fps, durationInFrames: Math.round(fps * 3), config: { damping: 200 } });
  const bar2024 = spring({ frame: frame - Math.round(fps * 5.5), fps, durationInFrames: Math.round(fps * 4), config: { damping: 20, stiffness: 120 } });
  const badge = spring({ frame: frame - Math.round(fps * 10), fps, config: { damping: 10, stiffness: 100 } });
  const context = spring({ frame: frame - Math.round(fps * 13), fps, config: { damping: 200 } });

  // Bar widths as % of track (max track = 840px effective)
  const track = 840;
  const width2023 = interpolate(bar2023, [0, 1], [0, (4.4 / 100) * track], { easing: Easing.out(Easing.quad) });
  const width2024 = interpolate(bar2024, [0, 1], [0, (71.7 / 100) * track], { easing: Easing.out(Easing.exp) });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal} 0%, ${colors.darkSlateGray} 100%)`,
        fontFamily,
      }}
    >
      {/* Upward stream lines */}
      <svg width="1080" height="1920" style={{ position: "absolute", opacity: 0.1 }}>
        {Array.from({ length: 16 }, (_, i) => {
          const x = 60 + i * 64;
          const y = ((frame * (1.2 + (i % 3) * 0.4) + i * 120) % 2000) - 80;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2={y + 60} stroke={colors.darkCyra} strokeWidth={1.5} opacity={0.7} />
              <circle cx={x} cy={y} r={2} fill={colors.caribbeanGreen} />
            </g>
          );
        })}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 48,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(title, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(title, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.tiffanyBlue, letterSpacing: 4, marginBottom: 12 }}>
            THE SPEED OF CHANGE
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: colors.white, lineHeight: 1.2 }}>
            AI Coding Benchmark Performance
          </div>
          <div style={{ fontSize: 20, color: colors.rhythm, marginTop: 8 }}>
            SWE-bench — % of problems solved
          </div>
        </div>

        {/* 2023 bar */}
        <div style={{ opacity: interpolate(bar2023, [0, 1], [0, 1]) }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.chineseSilver }}>2023</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.rhythm }}>4.4%</span>
          </div>
          <div style={{ height: 52, background: `${colors.rhythm}25`, borderRadius: 8, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: width2023,
                background: colors.rhythm,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
              }}
            />
          </div>
        </div>

        {/* 2024 bar */}
        <div style={{ opacity: interpolate(bar2024, [0, 1], [0, 1]) }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.white }}>2024</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.caribbeanGreen }}>71.7%</span>
          </div>
          <div style={{ height: 80, background: `${colors.caribbeanGreen}20`, borderRadius: 8, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: width2024,
                background: `linear-gradient(to right, ${colors.darkCyra}, ${colors.caribbeanGreen})`,
                borderRadius: 8,
              }}
            />
          </div>
        </div>

        {/* 16x badge */}
        <div
          style={{
            opacity: interpolate(badge, [0, 1], [0, 1]),
            transform: `scale(${interpolate(badge, [0, 0.6, 1], [0.6, 1.1, 1])})`,
            background: `linear-gradient(135deg, ${colors.darkCyra}, ${colors.tiffanyBlue})`,
            borderRadius: 20,
            padding: "28px 40px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 100, fontWeight: 900, color: colors.white, lineHeight: 1 }}>16×</div>
          <div style={{ fontSize: 22, color: `${colors.white}CC`, fontWeight: 700, marginTop: 4 }}>
            improvement in 12 months
          </div>
        </div>

        {/* Context */}
        <div
          style={{
            opacity: interpolate(context, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(context, [0, 1], [16, 0])}px)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.white, lineHeight: 1.4 }}>
            What took a <span style={{ color: colors.oldRose }}>decade</span> before…
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: colors.caribbeanGreen, marginTop: 6 }}>
            now happens in a single year.
          </div>
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
