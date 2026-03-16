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

const StatBlock: React.FC<{
  percent: string;
  label: string;
  note: string;
  color: string;
  progress: number;
}> = ({ percent, label, note, color, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [40, 0]);
  const scale = interpolate(progress, [0, 0.7, 1], [0.85, 1.04, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        padding: "40px 32px",
        borderTop: `4px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: 112,
          fontWeight: 900,
          color,
          lineHeight: 1,
          letterSpacing: -3,
        }}
      >
        {percent}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.white,
          textAlign: "center",
          lineHeight: 1.5,
          marginTop: 20,
          maxWidth: 280,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 15,
          color: colors.rhythm,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        {note}
      </div>
    </div>
  );
};

export const Scene6SchoolFailure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });

  const stat0 = spring({
    frame: frame - Math.round(fps * 2.5),
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const stat1 = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const stat2 = spring({
    frame: frame - Math.round(fps * 9.5),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const closingProgress = spring({
    frame: frame - Math.round(fps * 18),
    fps,
    config: { damping: 200 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ background: colors.darkSlateGray, fontFamily }}>
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(to right, ${colors.oldRose}, ${colors.darkCyra}, ${colors.caribbeanGreen})`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 220px",
          gap: 56,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.oldRose,
              letterSpacing: 4,
              marginBottom: 12,
            }}
          >
            THE UNCOMFORTABLE TRUTH ABOUT SCHOOLS
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: colors.white,
              lineHeight: 1.3,
            }}
          >
            The institutions we trust to prepare our children{" "}
            <span style={{ color: colors.oldRose }}>are themselves unprepared.</span>
          </div>
        </div>

        {/* Three stats side by side */}
        <div
          style={{
            display: "flex",
            gap: 0,
            width: "100%",
            maxWidth: 1400,
          }}
        >
          {/* Dividers between blocks */}
          <StatBlock
            percent="19%"
            label="Schools with a formal AI policy"
            note="Only 1 in 5"
            color={colors.tiffanyBlue}
            progress={stat0}
          />
          <div style={{ width: 1, background: `${colors.rhythm}30`, alignSelf: "stretch" }} />
          <StatBlock
            percent="68%"
            label="Teachers received zero AI training this year"
            note="Zero. This past school year."
            color={colors.oldRose}
            progress={stat1}
          />
          <div style={{ width: 1, background: `${colors.rhythm}30`, alignSelf: "stretch" }} />
          <StatBlock
            percent="85%"
            label="Already using AI tools in class"
            note="Without any guidance at all"
            color={colors.caribbeanGreen}
            progress={stat2}
          />
        </div>

        {/* Closing */}
        <div
          style={{
            opacity: interpolate(closingProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(closingProgress, [0, 1], [16, 0])}px)`,
            textAlign: "center",
            fontSize: 22,
            color: `${colors.chineseSilver}90`,
            maxWidth: 800,
            lineHeight: 1.6,
          }}
        >
          So who is filling that gap?{" "}
          <span style={{ color: colors.white, fontWeight: 700 }}>Right now — nobody.</span>
          <br />
          And that is exactly why you are watching this.
        </div>
      </AbsoluteFill>

      <Logo />
    </AbsoluteFill>
  );
};
