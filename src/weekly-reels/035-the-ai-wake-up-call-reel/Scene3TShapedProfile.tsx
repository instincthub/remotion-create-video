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

  const titleIn = spring({ frame, fps, config: { damping: 200 } });

  // T-shape: horizontal bar draws first (from center outward), then vertical drops down
  const hBarProgress = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 200 },
  });
  const vBarProgress = spring({
    frame: frame - Math.round(fps * 2.5),
    fps,
    config: { damping: 200 },
  });

  // Labels appear after bars
  const labelsIn = spring({
    frame: frame - Math.round(fps * 3.5),
    fps,
    config: { damping: 200 },
  });
  const intersectIn = spring({
    frame: frame - Math.round(fps * 4.5),
    fps,
    config: { damping: 200 },
  });

  // Soft grid pulse
  const gridOpacity = 0.06 + Math.sin(frame * 0.02) * 0.02;

  // T-shape SVG dimensions (portrait canvas: 1080 wide)
  // SVG viewBox 600×500, centered
  const SVG_W = 600;
  const SVG_H = 520;
  const H_Y = 100; // y of horizontal bar
  const H_X1 = 40;
  const H_X2 = 560;
  const H_MID = (H_X1 + H_X2) / 2; // 300
  const V_X = H_MID; // vertical bar x center
  const V_Y1 = H_Y;
  const V_Y2 = 480;
  const BAR_THICK = 48;

  // Horizontal bar grows from center out
  const hLeft = H_MID - (H_MID - H_X1) * hBarProgress;
  const hRight = H_MID + (H_X2 - H_MID) * hBarProgress;

  // Vertical bar drops from top
  const vBottom = V_Y1 + (V_Y2 - V_Y1) * vBarProgress;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Subtle grid */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: gridOpacity }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={160 * i + 80}
            x2={1080}
            y2={160 * i + 80}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={80 + i * 132}
            y1={0}
            x2={80 + i * 132}
            y2={1920}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

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
        {/* Title */}
        <div
          style={{
            opacity: interpolate(titleIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleIn, [0, 1], [20, 0])}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          The T-Shaped Profile
        </div>

        {/* T-shape SVG */}
        <div style={{ position: "relative", width: SVG_W, height: SVG_H }}>
          <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
            {/* Horizontal bar (caribbeanGreen) — broad skills */}
            <rect
              x={hLeft}
              y={H_Y - BAR_THICK / 2}
              width={Math.max(0, hRight - hLeft)}
              height={BAR_THICK}
              rx={8}
              fill={colors.caribbeanGreen}
            />
            {/* Vertical bar (darkCyra) — deep expertise */}
            <rect
              x={V_X - BAR_THICK / 2}
              y={V_Y1}
              width={BAR_THICK}
              height={Math.max(0, vBottom - V_Y1)}
              rx={8}
              fill={colors.darkCyra}
            />
            {/* Intersection dot */}
            {intersectIn > 0.1 && (
              <circle
                cx={V_X}
                cy={H_Y}
                r={interpolate(intersectIn, [0, 1], [0, 28])}
                fill={colors.tiffanyBlue}
                opacity={interpolate(intersectIn, [0, 1], [0, 1])}
              />
            )}
          </svg>

          {/* Labels */}
          {/* Left of horizontal bar */}
          <div
            style={{
              position: "absolute",
              top: H_Y - BAR_THICK / 2 - 48,
              left: 0,
              opacity: interpolate(labelsIn, [0, 1], [0, 1]),
              fontSize: 20,
              fontWeight: 700,
              color: colors.caribbeanGreen,
              textAlign: "left",
            }}
          >
            Broad skills
          </div>
          {/* Right of horizontal bar */}
          <div
            style={{
              position: "absolute",
              top: H_Y - BAR_THICK / 2 - 48,
              right: 0,
              opacity: interpolate(labelsIn, [0, 1], [0, 1]),
              fontSize: 20,
              fontWeight: 700,
              color: colors.caribbeanGreen,
              textAlign: "right",
            }}
          >
            Adaptability
          </div>

          {/* Below vertical bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: V_X - 120,
              width: 240,
              opacity: interpolate(labelsIn, [0, 1], [0, 1]),
              fontSize: 20,
              fontWeight: 700,
              color: colors.darkCyra,
              textAlign: "center",
            }}
          >
            Deep expertise
          </div>

          {/* Intersection label */}
          <div
            style={{
              position: "absolute",
              top: H_Y - 16,
              left: V_X + 36,
              opacity: interpolate(intersectIn, [0, 1], [0, 1]),
              fontSize: 18,
              fontWeight: 700,
              color: colors.white,
              background: `${colors.gunmetal}CC`,
              padding: "4px 12px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            AI-fluent professional
          </div>
        </div>

        {/* Caption below T */}
        <div
          style={{
            opacity: interpolate(labelsIn, [0, 1], [0, 1]),
            marginTop: 48,
            fontSize: 26,
            fontWeight: 700,
            color: `${colors.chineseSilver}CC`,
            textAlign: "center",
            lineHeight: 1.45,
            maxWidth: 780,
          }}
        >
          The workers who thrive combine deep human expertise with broad AI fluency.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
