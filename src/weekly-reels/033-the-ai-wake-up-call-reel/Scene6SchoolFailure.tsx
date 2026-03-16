import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const STATS = [
  {
    percent: "19%",
    label: "Schools with a formal AI policy",
    note: "Only 1 in 5",
    color: colors.tiffanyBlue,
  },
  {
    percent: "68%",
    label: "Teachers received zero AI training this year",
    note: "Zero. This past school year.",
    color: colors.oldRose,
  },
  {
    percent: "85%",
    label: "Already using AI tools in class without guidance",
    note: "Most without any support",
    color: colors.caribbeanGreen,
  },
];

export const Scene6SchoolFailure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 200 } });

  const statProgresses = STATS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (2.5 + i * 8)),
      fps,
      config: { damping: 15, stiffness: 80 },
    })
  );

  const closing = spring({ frame: frame - Math.round(fps * 27), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: colors.darkSlateGray, fontFamily }}>
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(to right, ${colors.oldRose}, ${colors.darkCyra}, ${colors.caribbeanGreen})`,
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
        {/* Title */}
        <div
          style={{
            opacity: interpolate(title, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(title, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.oldRose, letterSpacing: 4, marginBottom: 10 }}>
            THE SCHOOL SYSTEM REALITY
          </div>
          <div style={{ fontSize: 50, fontWeight: 900, color: colors.white, lineHeight: 1.2 }}>
            The institutions we trust to prepare our children…
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: colors.oldRose, marginTop: 8 }}>
            are themselves unprepared.
          </div>
        </div>

        {/* Stats stacked */}
        {STATS.map((stat, i) => {
          const p = statProgresses[i];
          const opacity = interpolate(p, [0, 1], [0, 1]);
          const y = interpolate(p, [0, 1], [40, 0]);
          const scale = interpolate(p, [0, 0.7, 1], [0.88, 1.04, 1]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                borderTop: `4px solid ${stat.color}`,
                padding: "24px 0 0",
              }}
            >
              <div style={{ fontSize: 100, fontWeight: 900, color: stat.color, lineHeight: 1, letterSpacing: -3 }}>
                {stat.percent}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.white, lineHeight: 1.4, marginTop: 8 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 15, color: colors.rhythm, marginTop: 4 }}>
                {stat.note}
              </div>
            </div>
          );
        })}

        {/* Closing */}
        <div
          style={{
            opacity: interpolate(closing, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(closing, [0, 1], [16, 0])}px)`,
            fontSize: 24,
            color: `${colors.chineseSilver}90`,
            lineHeight: 1.5,
          }}
        >
          So who is filling that gap?{" "}
          <span style={{ color: colors.white, fontWeight: 700 }}>Right now — nobody.</span>
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
