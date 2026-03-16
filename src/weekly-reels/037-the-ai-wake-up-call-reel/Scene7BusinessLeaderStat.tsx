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

  // 83% counting up from 0
  const statIn = spring({
    frame: frame - Math.round(fps * 0.5),
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const count = Math.round(interpolate(statIn, [0, 1], [0, 83]));

  const arrowIn = spring({
    frame: frame - Math.round(fps * 1.5),
    fps,
    config: { damping: 200 },
  });

  const descIn = spring({
    frame: frame - Math.round(fps * 3),
    fps,
    config: { damping: 200 },
  });

  const sourceIn = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 200 },
  });

  // Quote block at 15s
  const quoteIn = spring({
    frame: frame - Math.round(fps * 15),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Arrow draw progress (SVG upward arrow)
  const arrowDraw = interpolate(arrowIn, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Top accent rule */}
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
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* Large stat + arrow row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              opacity: interpolate(statIn, [0, 0.1, 1], [0, 1, 1]),
              transform: `scale(${interpolate(statIn, [0, 0.5, 1], [0.7, 1.08, 1])})`,
              fontSize: 200,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            {count}%
          </div>

          {/* Upward SVG arrow */}
          {arrowDraw > 0 && (
            <svg width="80" height="140" viewBox="0 0 80 140">
              {/* Shaft */}
              <line
                x1={40}
                y1={130}
                x2={40}
                y2={130 - 110 * arrowDraw}
                stroke={colors.caribbeanGreen}
                strokeWidth={8}
                strokeLinecap="round"
              />
              {/* Arrow head — only draw once shaft is mostly done */}
              {arrowDraw > 0.85 && (
                <>
                  <line
                    x1={40}
                    y1={20}
                    x2={14}
                    y2={46}
                    stroke={colors.caribbeanGreen}
                    strokeWidth={8}
                    strokeLinecap="round"
                    opacity={interpolate(arrowDraw, [0.85, 1], [0, 1])}
                  />
                  <line
                    x1={40}
                    y1={20}
                    x2={66}
                    y2={46}
                    stroke={colors.caribbeanGreen}
                    strokeWidth={8}
                    strokeLinecap="round"
                    opacity={interpolate(arrowDraw, [0.85, 1], [0, 1])}
                  />
                </>
              )}
            </svg>
          )}
        </div>

        {/* Description */}
        <div
          style={{
            opacity: interpolate(descIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(descIn, [0, 1], [20, 0])}px)`,
            fontSize: 30,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.45,
            maxWidth: 880,
            marginBottom: 28,
          }}
        >
          of business leaders say uniquely human skills will be MORE valuable as AI adoption increases
        </div>

        {/* Source */}
        <div
          style={{
            opacity: interpolate(sourceIn, [0, 1], [0, 1]),
            fontSize: 18,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 2,
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          WORKDAY, 2026
        </div>

        {/* Quote block at 15s */}
        {quoteIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(quoteIn, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(quoteIn, [0, 1], [30, 0])}px)`,
              background: `${colors.darkSlateGray}14`,
              border: `2px solid ${colors.darkSlateGray}30`,
              borderRadius: 16,
              padding: "36px 40px",
              maxWidth: 880,
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontStyle: "italic",
                color: colors.darkSlateGray,
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              "The smarter AI gets, the more valuable your humanity becomes."
            </div>
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
          color: `${colors.darkSlateGray}40`,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
