import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const StatBlock: React.FC<{
  targetValue: number;
  accentColor: string;
  label: string;
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ targetValue, accentColor, label, frame, fps, startFrame }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.7, 1]);

  const countEnd = startFrame + fps * 2;
  const rawCount = interpolate(frame, [startFrame, countEnd], [0, targetValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayCount = Math.round(rawCount);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        flex: 1,
        maxWidth: 640,
      }}
    >
      <div
        style={{
          fontSize: 160,
          fontWeight: 900,
          color: accentColor,
          fontFamily,
          lineHeight: 1,
          letterSpacing: -4,
        }}
      >
        {displayCount}%
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: colors.darkSlateGray,
          fontFamily,
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 440,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene2WEFSkillsShock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 200 } });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [-20, 0]);

  const sourceProgress = spring({ frame: frame - fps * 5, fps, config: { damping: 200 } });
  const sourceOpacity = interpolate(sourceProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: colors.darkCyra,
        }}
      />
      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          height: 4,
          background: colors.darkCyra,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 40,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.darkCyra,
            letterSpacing: 4,
            textTransform: "uppercase" as const,
          }}
        >
          World Economic Forum · Future of Jobs Report 2025
        </div>

        {/* Two stat blocks side by side */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 80,
            width: "100%",
          }}
        >
          <StatBlock
            targetValue={39}
            accentColor={colors.darkCyra}
            label="of today's core skills obsolete by 2030"
            frame={frame}
            fps={fps}
            startFrame={fps * 1}
          />
          {/* Divider */}
          <div
            style={{
              width: 2,
              height: 280,
              background: colors.rhythm,
              opacity: 0.3,
            }}
          />
          <StatBlock
            targetValue={59}
            accentColor={colors.caribbeanGreen}
            label="of the global workforce needs reskilling"
            frame={frame}
            fps={fps}
            startFrame={fps * 1}
          />
        </div>

        {/* Source */}
        <div
          style={{
            opacity: sourceOpacity,
            fontSize: 14,
            fontWeight: 400,
            color: colors.rhythm,
            fontFamily,
            letterSpacing: 1,
          }}
        >
          Source: World Economic Forum Future of Jobs Report 2025
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
