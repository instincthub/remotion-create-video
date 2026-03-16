import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const StatCard: React.FC<{
  percent: string;
  label: string;
  note: string;
  color: string;
  borderColor: string;
  progress: number;
  fromTop?: boolean;
}> = ({ percent, label, note, color, borderColor, progress, fromTop = true }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [fromTop ? -40 : 40, 0]);
  const scale = interpolate(progress, [0, 0.7, 1], [0.85, 1.04, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        background: colors.white,
        borderRadius: 20,
        border: `3px solid ${borderColor}`,
        padding: "36px 40px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 120, fontWeight: 900, color, lineHeight: 1, letterSpacing: -3 }}>
        {percent}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: colors.darkSlateGray, lineHeight: 1.4, marginTop: 12 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: colors.rhythm, marginTop: 8 }}>{note}</div>
    </div>
  );
};

export const Scene4PerceptionGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 200 } });
  const card1 = spring({ frame: frame - Math.round(fps * 1.5), fps, config: { damping: 15, stiffness: 80 } });
  const arrow = spring({ frame: frame - Math.round(fps * 5), fps, config: { damping: 200 } });
  const card2 = spring({ frame: frame - Math.round(fps * 6), fps, config: { damping: 15, stiffness: 80 } });
  const gap = spring({ frame: frame - Math.round(fps * 10), fps, config: { damping: 200 } });
  const source = spring({ frame: frame - Math.round(fps * 14), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 5,
          background: `linear-gradient(to right, ${colors.caribbeanGreen}, ${colors.darkCyra})`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 28,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(title, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(title, [0, 1], [20, 0])}px)`,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.darkCyra, letterSpacing: 4, marginBottom: 10 }}>
            THE PERCEPTION GAP
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: colors.darkSlateGray, lineHeight: 1.2 }}>
            Parents know it matters. But schools aren't teaching it.
          </div>
        </div>

        {/* Card 1: 88% */}
        <StatCard
          percent="88%"
          label="of parents believe AI knowledge will be critical for their child's future"
          note="Samsung & Morning Consult Survey"
          color={colors.caribbeanGreen}
          borderColor={colors.caribbeanGreen}
          progress={card1}
          fromTop
        />

        {/* Arrow pointing down */}
        <div
          style={{
            opacity: interpolate(arrow, [0, 1], [0, 1]),
            transform: `scaleY(${interpolate(arrow, [0, 1], [0, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div style={{ width: 2, height: 32, background: colors.oldRose }} />
          <svg width="24" height="16" viewBox="0 0 24 16">
            <polygon points="12,16 0,0 24,0" fill={colors.oldRose} />
          </svg>
        </div>

        {/* Card 2: 81% */}
        <StatCard
          percent="81%"
          label="say AI is NOT being taught in their child's school"
          note="The same survey — the same parents"
          color={colors.oldRose}
          borderColor={colors.oldRose}
          progress={card2}
          fromTop={false}
        />

        {/* THE GAP label */}
        <div
          style={{
            opacity: interpolate(gap, [0, 1], [0, 1]),
            transform: `scale(${interpolate(gap, [0, 0.7, 1], [0.8, 1.05, 1])})`,
            background: colors.oldRose,
            borderRadius: 8,
            padding: "12px 40px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 900, color: colors.white, letterSpacing: 4 }}>
            THIS GAP WILL DEFINE YOUR CHILD'S FUTURE
          </div>
        </div>

        <div
          style={{
            opacity: interpolate(source, [0, 1], [0, 1]),
            fontSize: 13,
            color: colors.rhythm,
            textAlign: "center",
          }}
        >
          Source: Samsung & Morning Consult Parent Survey on AI Education
        </div>
      </AbsoluteFill>

      {/* Dark logo for light bg */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.darkSlateGray}60`,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
