import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const StatBubble: React.FC<{
  percent: string;
  label: string;
  sublabel: string;
  color: string;
  borderColor: string;
  progress: number;
  side: "left" | "right";
}> = ({ percent, label, sublabel, color, borderColor, progress, side }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(
    progress,
    [0, 1],
    [side === "left" ? -80 : 80, 0]
  );
  const scale = interpolate(progress, [0, 0.7, 1], [0.8, 1.05, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        width: 380,
        background: colors.white,
        borderRadius: 20,
        border: `3px solid ${borderColor}`,
        padding: "48px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: `0 8px 40px ${borderColor}30`,
      }}
    >
      <div
        style={{
          fontSize: 108,
          fontWeight: 900,
          color,
          lineHeight: 1,
          letterSpacing: -2,
        }}
      >
        {percent}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.darkSlateGray,
          textAlign: "center",
          lineHeight: 1.4,
          marginTop: 16,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          color: colors.rhythm,
          textAlign: "center",
          marginTop: 10,
          lineHeight: 1.4,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
};

const GapArrow: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scaleX = interpolate(progress, [0, 1], [0, 1]);
  const labelOpacity = interpolate(progress, [0.6, 1], [0, 1], {
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
      }}
    >
      {/* Gap label */}
      <div
        style={{
          opacity: labelOpacity,
          background: `linear-gradient(135deg, ${colors.oldRose}, ${colors.oldRose}CC)`,
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: 20,
          fontWeight: 900,
          color: colors.white,
          letterSpacing: 3,
          marginBottom: 8,
        }}
      >
        THE GAP
      </div>

      {/* Arrow */}
      <div
        style={{
          transform: `scaleX(${scaleX})`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg width="240" height="40" viewBox="0 0 240 40">
          {/* Left arrowhead */}
          <polygon
            points="0,20 24,4 24,36"
            fill={colors.oldRose}
          />
          {/* Arrow body */}
          <rect
            x={24} y={16} width={192} height={8}
            fill={colors.oldRose}
          />
          {/* Right arrowhead */}
          <polygon
            points="240,20 216,4 216,36"
            fill={colors.oldRose}
          />
        </svg>
      </div>

      <div
        style={{
          opacity: labelOpacity,
          fontSize: 16,
          color: colors.rhythm,
          textAlign: "center",
          maxWidth: 220,
          lineHeight: 1.4,
        }}
      >
        This gap will define your child's future
      </div>
    </div>
  );
};

export const Scene4PerceptionGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const leftBubble = spring({
    frame: frame - Math.round(fps * 1.5),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const rightBubble = spring({
    frame: frame - Math.round(fps * 3),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const arrowProgress = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 200 },
  });

  const surveyOpacity = interpolate(frame, [fps * 6, fps * 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
        opacity: bgOpacity,
      }}
    >
      {/* Subtle top gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(to right, ${colors.darkCyra}, ${colors.caribbeanGreen})`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 220px",
          gap: 40,
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
              fontSize: 20,
              fontWeight: 700,
              color: colors.darkCyra,
              letterSpacing: 4,
              marginBottom: 10,
            }}
          >
            THE PERCEPTION GAP
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: colors.darkSlateGray,
              lineHeight: 1.3,
            }}
          >
            Parents know it matters. But schools aren't teaching it.
          </div>
        </div>

        {/* Bubbles + Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
          }}
        >
          <StatBubble
            percent="88%"
            label="of parents believe AI knowledge will be critical for their child's future"
            sublabel="Samsung & Morning Consult Survey"
            color={colors.caribbeanGreen}
            borderColor={colors.caribbeanGreen}
            progress={leftBubble}
            side="left"
          />

          <GapArrow progress={arrowProgress} />

          <StatBubble
            percent="81%"
            label="say AI is NOT being taught in their child's school"
            sublabel="Same survey — same parents"
            color={colors.oldRose}
            borderColor={colors.oldRose}
            progress={rightBubble}
            side="right"
          />
        </div>

        {/* Source */}
        <div
          style={{
            opacity: surveyOpacity,
            fontSize: 14,
            color: colors.rhythm,
            textAlign: "center",
          }}
        >
          Source: Samsung & Morning Consult Parent Survey on AI Education
        </div>
      </AbsoluteFill>

      {/* Dark logo for light background */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          right: 80,
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: 0.6,
          fontFamily,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: colors.darkCyra,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke={colors.white} strokeWidth="1.5" fill="none" />
            <circle cx="9" cy="9" r="2.5" fill={colors.caribbeanGreen} />
          </svg>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: colors.darkSlateGray, letterSpacing: 0.5 }}>
          InstinctHub
        </span>
      </div>
    </AbsoluteFill>
  );
};
