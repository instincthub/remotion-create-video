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

  // Count up 0→83 over 2s after 1s
  const countStart = fps * 1;
  const countEnd = fps * 3;
  const rawCount = interpolate(frame, [countStart, countEnd], [0, 83], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayCount = Math.round(rawCount);

  // Number spring entrance
  const numProgress = spring({
    frame: frame - fps * 0.5,
    fps,
    config: { damping: 12, stiffness: 55 },
  });
  const numScale = interpolate(numProgress, [0, 0.6, 1], [0.5, 1.08, 1]);
  const numOpacity = interpolate(numProgress, [0, 1], [0, 1]);

  // Arrow appears at 2s
  const arrowProgress = spring({
    frame: frame - fps * 2,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);
  const arrowY = interpolate(arrowProgress, [0, 1], [40, 0]);

  // Body text appears at 2.5s
  const bodyProgress = spring({
    frame: frame - fps * 2.5,
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const bodyOpacity = interpolate(bodyProgress, [0, 1], [0, 1]);
  const bodyY = interpolate(bodyProgress, [0, 1], [24, 0]);

  // Source at 4s
  const sourceProgress = spring({
    frame: frame - fps * 4,
    fps,
    config: { damping: 200 },
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
          gap: 24,
        }}
      >
        {/* Number row with arrow */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              opacity: numOpacity,
              transform: `scale(${numScale})`,
              fontSize: 200,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              fontFamily,
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            {displayCount}%
          </div>

          {/* Upward arrow SVG */}
          <div
            style={{
              opacity: arrowOpacity,
              transform: `translateY(${arrowY}px)`,
            }}
          >
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
              <line x1="40" y1="110" x2="40" y2="10" stroke={colors.caribbeanGreen} strokeWidth="6" strokeLinecap="round" />
              <polyline
                points="16,36 40,10 64,36"
                stroke={colors.caribbeanGreen}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Body text */}
        <div
          style={{
            opacity: bodyOpacity,
            transform: `translateY(${bodyY}px)`,
            fontSize: 32,
            fontWeight: 400,
            color: colors.darkSlateGray,
            fontFamily,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 1100,
          }}
        >
          of business leaders say human skills are becoming{" "}
          <span style={{ fontWeight: 700, color: colors.darkCyra }}>MORE valuable</span>
          {" "}as AI advances
        </div>

        {/* Source */}
        <div
          style={{
            opacity: interpolate(sourceProgress, [0, 1], [0, 1]),
            fontSize: 18,
            fontWeight: 400,
            color: colors.rhythm,
            fontFamily,
            letterSpacing: 1,
          }}
        >
          Source: Workday, 2026
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
