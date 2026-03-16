import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene7BusinessLeaderStat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const STAT_START = fps * 2;

  // Counter animation
  const counterProgress = spring({
    frame: frame - STAT_START,
    fps,
    config: { damping: 18, stiffness: 55 },
  });
  const displayed = Math.round(interpolate(counterProgress, [0, 1], [0, 83]));

  // Arrow beside counter
  const arrowProgress = spring({
    frame: frame - STAT_START - fps * 1.5,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);
  const arrowY = interpolate(arrowProgress, [0, 1], [20, 0]);

  // Label below counter
  const labelProgress = spring({
    frame: frame - STAT_START - fps * 1.8,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);
  const labelY = interpolate(labelProgress, [0, 1], [16, 0]);

  // Source
  const sourceProgress = spring({
    frame: frame - STAT_START - fps * 2.5,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Quote block at ~15s
  const quoteProgress = spring({
    frame: frame - fps * 15,
    fps,
    config: { damping: 18, stiffness: 65 },
  });
  const quoteOpacity = interpolate(quoteProgress, [0, 1], [0, 1]);
  const quoteY = interpolate(quoteProgress, [0, 1], [28, 0]);

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: colors.caribbeanGreen,
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
          gap: 24,
        }}
      >
        {/* Stat row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 200,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              fontFamily,
              lineHeight: 1,
            }}
          >
            {displayed}%
          </div>

          {/* Upward arrow SVG */}
          <svg
            width={80}
            height={120}
            style={{
              opacity: arrowOpacity,
              transform: `translateY(${arrowY}px)`,
            }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={colors.caribbeanGreen} />
              </marker>
            </defs>
            <line
              x1={40}
              y1={110}
              x2={40}
              y2={10}
              stroke={colors.caribbeanGreen}
              strokeWidth={8}
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </div>

        {/* Label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
            fontSize: 26,
            fontWeight: 400,
            color: colors.darkSlateGray,
            fontFamily,
            textAlign: "center",
            maxWidth: 860,
            lineHeight: 1.5,
          }}
        >
          of business leaders say human skills are becoming{" "}
          <span style={{ fontWeight: 700, color: colors.caribbeanGreen }}>MORE valuable</span>{" "}
          as AI advances
        </div>

        {/* Source */}
        <div
          style={{
            opacity: interpolate(sourceProgress, [0, 1], [0, 1]),
            fontSize: 18,
            fontWeight: 400,
            fontStyle: "italic",
            color: colors.rhythm,
            fontFamily,
          }}
        >
          Workday, 2026
        </div>

        {/* Quote block */}
        <div
          style={{
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
            background: `${colors.darkSlateGray}22`,
            borderLeft: `4px solid ${colors.darkCyra}`,
            borderRadius: 8,
            padding: "24px 36px",
            maxWidth: 900,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              fontStyle: "italic",
              color: colors.darkSlateGray,
              fontFamily,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            "The smarter AI gets, the more valuable your humanity becomes."
          </div>
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
