import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2WEFSkillsShock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 200 } });

  // Stat 1: 39% — starts at 1s
  const stat1In = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const count1 = Math.round(interpolate(stat1In, [0, 1], [0, 39]));

  const label1In = spring({
    frame: frame - Math.round(fps * 2),
    fps,
    config: { damping: 200 },
  });

  const dividerIn = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 200 },
  });

  // Stat 2: 59% — starts at 7s
  const stat2In = spring({
    frame: frame - Math.round(fps * 7),
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const count2 = Math.round(interpolate(stat2In, [0, 1], [0, 59]));

  const label2In = spring({
    frame: frame - Math.round(fps * 8.5),
    fps,
    config: { damping: 200 },
  });

  const sourceIn = spring({
    frame: frame - Math.round(fps * 10),
    fps,
    config: { damping: 200 },
  });

  // Context text at ~15s
  const contextIn = spring({
    frame: frame - Math.round(fps * 15),
    fps,
    config: { damping: 200 },
  });

  // Rhetorical question at ~25s
  const questionIn = spring({
    frame: frame - Math.round(fps * 25),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Top rule */}
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
      {/* Bottom rule above safe zone */}
      <div
        style={{
          position: "absolute",
          bottom: 300,
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
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [20, 0])}px)`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.darkSlateGray,
            letterSpacing: 4,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          WORLD ECONOMIC FORUM · 2025
        </div>

        {/* Stat 1 — 39% */}
        <div
          style={{
            opacity: interpolate(stat1In, [0, 0.1, 1], [0, 1, 1]),
            transform: `scale(${interpolate(stat1In, [0, 0.5, 1], [0.7, 1.08, 1])})`,
            fontSize: 160,
            fontWeight: 900,
            color: colors.darkCyra,
            lineHeight: 1,
            letterSpacing: -4,
            textAlign: "center",
          }}
        >
          {count1}%
        </div>
        <div
          style={{
            opacity: interpolate(label1In, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(label1In, [0, 1], [16, 0])}px)`,
            fontSize: 28,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 880,
            marginBottom: 48,
          }}
        >
          of core job skills will be disrupted by AI within 5 years
        </div>

        {/* Divider */}
        <div
          style={{
            opacity: interpolate(dividerIn, [0, 1], [0, 1]),
            width: interpolate(dividerIn, [0, 1], [0, 760]),
            height: 3,
            background: `${colors.rhythm}60`,
            borderRadius: 2,
            marginBottom: 48,
          }}
        />

        {/* Stat 2 — 59% */}
        <div
          style={{
            opacity: interpolate(stat2In, [0, 0.1, 1], [0, 1, 1]),
            transform: `scale(${interpolate(stat2In, [0, 0.5, 1], [0.7, 1.08, 1])})`,
            fontSize: 160,
            fontWeight: 900,
            color: colors.caribbeanGreen,
            lineHeight: 1,
            letterSpacing: -4,
            textAlign: "center",
          }}
        >
          {count2}%
        </div>
        <div
          style={{
            opacity: interpolate(label2In, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(label2In, [0, 1], [16, 0])}px)`,
            fontSize: 28,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 880,
            marginBottom: 36,
          }}
        >
          of workers will need reskilling or upskilling by 2027
        </div>

        {/* Source */}
        <div
          style={{
            opacity: interpolate(sourceIn, [0, 1], [0, 1]),
            fontSize: 16,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 2,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          SOURCE: WEF FUTURE OF JOBS REPORT 2025
        </div>

        {/* Context text at ~15s */}
        {contextIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(contextIn, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(contextIn, [0, 1], [20, 0])}px)`,
              fontSize: 26,
              fontWeight: 400,
              color: colors.darkSlateGray,
              textAlign: "center",
              lineHeight: 1.55,
              maxWidth: 880,
              marginBottom: 32,
            }}
          >
            The people teaching your children today are preparing them for
            a world that no longer exists.
          </div>
        )}

        {/* Rhetorical question at ~25s */}
        {questionIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(questionIn, [0, 1], [0, 1]),
              transform: `scale(${interpolate(questionIn, [0, 0.5, 1], [0.92, 1.04, 1])})`,
              fontSize: 30,
              fontWeight: 700,
              color: colors.darkCyra,
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Are you raising your child for the AI era — or the one before it?
          </div>
        )}
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 60,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.gunmetal}60`,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
