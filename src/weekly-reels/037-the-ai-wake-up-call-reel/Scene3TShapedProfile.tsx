import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene3TShapedProfile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // T-shape SVG drawing: vertical bar first (~3s), then horizontal (~3s)
  const verticalDraw = interpolate(
    frame,
    [Math.round(fps * 0.5), Math.round(fps * 3.5)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const horizontalDraw = interpolate(
    frame,
    [Math.round(fps * 4), Math.round(fps * 7)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Labels appear after bars draw
  const deepLabelIn = spring({
    frame: frame - Math.round(fps * 4),
    fps,
    config: { damping: 200 },
  });

  const broadLabelIn = spring({
    frame: frame - Math.round(fps * 7.5),
    fps,
    config: { damping: 200 },
  });

  // Intersection dot pulse (sin wave after ~7s)
  const dotPulse = frame > Math.round(fps * 7)
    ? 1 + Math.sin((frame - Math.round(fps * 7)) * 0.15) * 0.15
    : 0;

  const advantageIn = spring({
    frame: frame - Math.round(fps * 8),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Two stacked blocks at ~20s
  const block1In = spring({
    frame: frame - Math.round(fps * 20),
    fps,
    config: { damping: 200 },
  });

  const block2In = spring({
    frame: frame - Math.round(fps * 22.5),
    fps,
    config: { damping: 200 },
  });

  // Closing line at ~35s
  const closingIn = spring({
    frame: frame - Math.round(fps * 35),
    fps,
    config: { damping: 14, stiffness: 55 },
  });

  // Grid lines opacity — subtle background grid
  const gridOpacity = 0.04 + Math.sin(frame * 0.02) * 0.01;

  // T-shape dimensions (centered in 1080px wide)
  const canvasCenterX = 540;
  // Vertical bar
  const vBarX = canvasCenterX;
  const vBarTopY = 120;
  const vBarBottomY = vBarTopY + 400 * verticalDraw;
  const vBarWidth = 80;
  // Horizontal bar (full draw = 920px wide, centered)
  const hBarHalfWidth = 460 * horizontalDraw;
  const hBarLeft = canvasCenterX - hBarHalfWidth;
  const hBarRight = canvasCenterX + hBarHalfWidth;
  const hBarHeight = 80;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Grid overlay */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: gridOpacity }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0} y1={140 * i} x2={1080} y2={140 * i}
            stroke={colors.tiffanyBlue} strokeWidth={1}
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={108 * i} y1={0} x2={108 * i} y2={1920}
            stroke={colors.tiffanyBlue} strokeWidth={1}
          />
        ))}
      </svg>

      {/* T-shape SVG */}
      <svg
        style={{ position: "absolute", top: 200, left: 0, width: "100%", height: 560, pointerEvents: "none" }}
      >
        {/* Horizontal bar */}
        {horizontalDraw > 0 && (
          <rect
            x={hBarLeft}
            y={0}
            width={hBarRight - hBarLeft}
            height={hBarHeight}
            rx={12}
            fill={colors.darkCyra}
          />
        )}
        {/* Vertical bar */}
        {verticalDraw > 0 && (
          <rect
            x={vBarX - vBarWidth / 2}
            y={hBarHeight}
            width={vBarWidth}
            height={Math.max(0, (vBarBottomY - vBarTopY) * verticalDraw)}
            rx={12}
            fill={colors.darkSlateGray}
          />
        )}
        {/* Intersection dot */}
        {dotPulse > 0 && (
          <circle
            cx={vBarX}
            cy={hBarHeight / 2}
            r={20 * dotPulse}
            fill={colors.tiffanyBlue}
          />
        )}
      </svg>

      {/* Deep Expertise label on vertical bar */}
      {deepLabelIn > 0.05 && (
        <div
          style={{
            position: "absolute",
            top: 460,
            left: 0,
            right: 0,
            opacity: interpolate(deepLabelIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(deepLabelIn, [0, 1], [20, 0])}px)`,
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.darkCyra,
            letterSpacing: 1,
          }}
        >
          Deep Expertise
        </div>
      )}

      {/* Broad Human Skills label on horizontal bar */}
      {broadLabelIn > 0.05 && (
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 0,
            right: 0,
            opacity: interpolate(broadLabelIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(broadLabelIn, [0, 1], [-10, 0])}px)`,
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            letterSpacing: 1,
          }}
        >
          Broad Human Skills
        </div>
      )}

      {/* "Your Child's Advantage" */}
      {advantageIn > 0.05 && (
        <div
          style={{
            position: "absolute",
            top: 310,
            left: 0,
            right: 0,
            opacity: interpolate(advantageIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(advantageIn, [0, 0.5, 1], [0.88, 1.05, 1])})`,
            textAlign: "center",
            fontSize: 36,
            fontWeight: 900,
            color: colors.white,
            letterSpacing: 1,
          }}
        >
          Your Child's Advantage
        </div>
      )}

      {/* Two stacked blocks at ~20s */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "80px 80px 360px",
          gap: 20,
        }}
      >
        {/* Block 1: Technical Fluency */}
        {block1In > 0.05 && (
          <div
            style={{
              width: "100%",
              maxWidth: 960,
              opacity: interpolate(block1In, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(block1In, [0, 1], [-60, 0])}px)`,
              background: `${colors.tiffanyBlue}20`,
              border: `2px solid ${colors.tiffanyBlue}`,
              borderRadius: 16,
              padding: "28px 36px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: colors.tiffanyBlue,
                marginBottom: 10,
              }}
            >
              Technical Fluency
            </div>
            <div style={{ fontSize: 22, fontWeight: 400, color: colors.chineseSilver, lineHeight: 1.5 }}>
              AI Literacy · Computational Thinking · Data & Digital Skills
            </div>
          </div>
        )}

        {/* Block 2: Human Capability */}
        {block2In > 0.05 && (
          <div
            style={{
              width: "100%",
              maxWidth: 960,
              opacity: interpolate(block2In, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(block2In, [0, 1], [60, 0])}px)`,
              background: `${colors.turkishRose}20`,
              border: `2px solid ${colors.turkishRose}`,
              borderRadius: 16,
              padding: "28px 36px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: colors.turkishRose,
                marginBottom: 10,
              }}
            >
              Human Capability
            </div>
            <div style={{ fontSize: 22, fontWeight: 400, color: colors.chineseSilver, lineHeight: 1.5 }}>
              Empathy · Creativity · Perspective · Drive · Connection
            </div>
          </div>
        )}

        {/* Closing line at ~35s */}
        {closingIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(closingIn, [0, 1], [0, 1]),
              transform: `scale(${interpolate(closingIn, [0, 0.5, 1], [0.9, 1.04, 1])})`,
              fontSize: 40,
              fontWeight: 900,
              color: colors.white,
              textAlign: "center",
              lineHeight: 1.3,
              marginTop: 16,
            }}
          >
            Not one or the other. Both.
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
          color: `${colors.white}40`,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
