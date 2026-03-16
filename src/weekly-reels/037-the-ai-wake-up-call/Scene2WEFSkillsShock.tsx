import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const StatCounter: React.FC<{
  value: number;
  color: string;
  label: string;
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ value, color, label, frame, fps, startFrame }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, stiffness: 60 },
  });
  const displayed = Math.round(interpolate(progress, [0, 1], [0, value]));

  const labelProgress = spring({
    frame: frame - startFrame - fps * 1.2,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);
  const labelY = interpolate(labelProgress, [0, 1], [16, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 180,
          fontWeight: 900,
          color,
          fontFamily,
          lineHeight: 1,
        }}
      >
        {displayed}%
      </div>
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          fontSize: 22,
          fontWeight: 400,
          color: colors.darkSlateGray,
          fontFamily,
          textAlign: "center",
          maxWidth: 380,
          lineHeight: 1.4,
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

  const STAT_START = fps * 2;

  // Eyebrow
  const eyebrowProgress = spring({
    frame: frame - fps * 0.3,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  // Context text at ~15s
  const contextProgress = spring({
    frame: frame - fps * 15,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const contextOpacity = interpolate(contextProgress, [0, 1], [0, 1]);
  const contextY = interpolate(contextProgress, [0, 1], [24, 0]);

  // Bottom text at ~25s
  const bottomProgress = spring({
    frame: frame - fps * 25,
    fps,
    config: { damping: 18, stiffness: 65 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Top and bottom rules */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: colors.darkCyra,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          height: 4,
          background: colors.darkCyra,
          opacity: 0.3,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(eyebrowProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrowProgress, [0, 1], [-12, 0])}px)`,
            fontSize: 18,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            fontFamily,
            marginBottom: 32,
          }}
        >
          World Economic Forum 2025
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 80,
            width: "100%",
          }}
        >
          <StatCounter
            value={39}
            color={colors.darkCyra}
            label="of the skills considered important today will be disrupted or obsolete"
            frame={frame}
            fps={fps}
            startFrame={STAT_START}
          />
          <StatCounter
            value={59}
            color={colors.caribbeanGreen}
            label="of workers will need significant reskilling within the next 3 years"
            frame={frame}
            fps={fps}
            startFrame={STAT_START}
          />
        </div>

        {/* Context text */}
        <div
          style={{
            opacity: contextOpacity,
            transform: `translateY(${contextY}px)`,
            fontSize: 26,
            fontWeight: 400,
            fontStyle: "italic",
            color: colors.darkSlateGray,
            fontFamily,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
            marginTop: 40,
          }}
        >
          That includes the people teaching your children right now.
        </div>

        {/* Bottom text */}
        <div
          style={{
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            fontSize: 24,
            fontWeight: 400,
            color: colors.tiffanyBlue,
            fontFamily,
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.6,
            marginTop: 28,
          }}
        >
          So the question isn't just what jobs are coming.
          <br />
          It's what kind of human being you need to raise.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.darkSlateGray}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
