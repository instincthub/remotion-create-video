import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// 8 axes matching the reference rubric
interface RadarAxis {
  label: string;
  shortLabel?: string;
  angle: number; // degrees, starting from top (-90)
  webValue: number; // 0-1 for web AI (red)
  enterpriseValue: number; // 0-1 for enterprise AI (blue)
}

const AXES: RadarAxis[] = [
  { label: "Application", shortLabel: "Complexity", angle: -90, webValue: 0.35, enterpriseValue: 0.85 },
  { label: "Correctness &", shortLabel: "Consistency", angle: -45, webValue: 0.3, enterpriseValue: 0.9 },
  { label: "Decision", shortLabel: "Consequence", angle: 0, webValue: 0.2, enterpriseValue: 0.95 },
  { label: "Data Strategy &", shortLabel: "Governance", angle: 45, webValue: 0.25, enterpriseValue: 0.85 },
  { label: "Skills &", shortLabel: "Resources", angle: 90, webValue: 0.3, enterpriseValue: 0.8 },
  { label: "Ethics &", shortLabel: "Regulations", angle: 135, webValue: 0.2, enterpriseValue: 0.9 },
  { label: "Business", shortLabel: "Relevance", angle: 180, webValue: 0.45, enterpriseValue: 0.85 },
  { label: "Stakeholder", shortLabel: "Alignment", angle: -135, webValue: 0.25, enterpriseValue: 0.8 },
];

const LEVELS = ["Very Low", "Low", "Medium", "High", "Very High"];

// Helper to get a point on the radar
const getPoint = (cx: number, cy: number, angle: number, r: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
};

// Generate octagon path at a given scale
const getOctagonPath = (cx: number, cy: number, radius: number, scale: number) => {
  return AXES
    .map((axis, i) => {
      const p = getPoint(cx, cy, axis.angle, radius * scale);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";
};

// Generate data polygon
const getDataPath = (
  cx: number,
  cy: number,
  radius: number,
  valueKey: "webValue" | "enterpriseValue",
  progress: number,
) => {
  return AXES
    .map((axis, i) => {
      const p = getPoint(cx, cy, axis.angle, radius * axis[valueKey] * progress);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";
};

// LEFT CHART: Rubric with level rings and labels
const RubricChart: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  progress: number;
}> = ({ cx, cy, radius, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <svg width={radius * 2 + 280} height={radius * 2 + 280}
      viewBox={`${cx - radius - 140} ${cy - radius - 140} ${radius * 2 + 280} ${radius * 2 + 280}`}
      style={{ opacity }}
    >
      {/* Level rings (5 rings: 0.2 to 1.0) */}
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => (
        <path
          key={`ring-${i}`}
          d={getOctagonPath(cx, cy, radius, scale)}
          fill="none"
          stroke={`${colors.chineseSilver}40`}
          strokeWidth={1}
          strokeDasharray={i < 4 ? "6 4" : "none"}
        />
      ))}

      {/* Axis lines from center to edge */}
      {AXES.map((axis, i) => {
        const end = getPoint(cx, cy, axis.angle, radius);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke={`${colors.chineseSilver}30`}
            strokeWidth={1}
          />
        );
      })}

      {/* Level labels along top axis */}
      {LEVELS.map((level, i) => {
        const r = radius * ((i + 1) * 0.2);
        const p = getPoint(cx, cy, -90, r);
        return (
          <text
            key={`level-${i}`}
            x={p.x + 8}
            y={p.y + 4}
            fontSize={15}
            fill={colors.oldRose}
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            {level}
          </text>
        );
      })}

      {/* Axis labels */}
      {AXES.map((axis, i) => {
        const labelDist = radius + 40;
        const p = getPoint(cx, cy, axis.angle, labelDist);

        const anchor: "start" | "middle" | "end" =
          axis.angle > -80 && axis.angle < 80
            ? "start"
            : axis.angle > 100 || axis.angle < -100
              ? "end"
              : "middle";

        return (
          <g key={`label-${i}`}>
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={17}
              fontWeight="bold"
              fill={colors.chineseSilver}
              fontFamily="Inter, sans-serif"
            >
              {axis.label}
            </text>
            {axis.shortLabel && (
              <text
                x={p.x}
                y={p.y + 10}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={17}
                fontWeight="bold"
                fill={colors.chineseSilver}
                fontFamily="Inter, sans-serif"
              >
                {axis.shortLabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// RIGHT CHART: Comparison overlay with both polygons
const ComparisonChart: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  gridProgress: number;
  webProgress: number;
  enterpriseProgress: number;
}> = ({ cx, cy, radius, gridProgress, webProgress, enterpriseProgress }) => {
  const opacity = interpolate(gridProgress, [0, 1], [0, 1]);

  return (
    <svg width={radius * 2 + 280} height={radius * 2 + 280}
      viewBox={`${cx - radius - 140} ${cy - radius - 140} ${radius * 2 + 280} ${radius * 2 + 280}`}
      style={{ opacity }}
    >
      {/* Level rings */}
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => (
        <path
          key={`ring-${i}`}
          d={getOctagonPath(cx, cy, radius, scale)}
          fill="none"
          stroke={`${colors.chineseSilver}25`}
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {AXES.map((axis, i) => {
        const end = getPoint(cx, cy, axis.angle, radius);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke={`${colors.chineseSilver}20`}
            strokeWidth={1}
          />
        );
      })}

      {/* Enterprise polygon (blue) - drawn first so it's behind */}
      {enterpriseProgress > 0 && (
        <>
          <path
            d={getDataPath(cx, cy, radius, "enterpriseValue", enterpriseProgress)}
            fill={`${colors.darkCyra}15`}
            stroke={colors.darkCyra}
            strokeWidth={3}
          />
          {AXES.map((axis, i) => {
            const p = getPoint(cx, cy, axis.angle, radius * axis.enterpriseValue * enterpriseProgress);
            return (
              <circle
                key={`ep-${i}`}
                cx={p.x}
                cy={p.y}
                r={5}
                fill={colors.darkCyra}
                stroke={colors.white}
                strokeWidth={2}
              />
            );
          })}
        </>
      )}

      {/* Web AI polygon (red) - drawn on top */}
      {webProgress > 0 && (
        <>
          <path
            d={getDataPath(cx, cy, radius, "webValue", webProgress)}
            fill={`${colors.oldRose}12`}
            stroke={colors.oldRose}
            strokeWidth={3}
          />
          {AXES.map((axis, i) => {
            const p = getPoint(cx, cy, axis.angle, radius * axis.webValue * webProgress);
            return (
              <circle
                key={`wp-${i}`}
                cx={p.x}
                cy={p.y}
                r={5}
                fill={colors.oldRose}
                stroke={colors.white}
                strokeWidth={2}
              />
            );
          })}
        </>
      )}

      {/* Axis labels */}
      {AXES.map((axis, i) => {
        const labelDist = radius + 40;
        const p = getPoint(cx, cy, axis.angle, labelDist);

        const anchor: "start" | "middle" | "end" =
          axis.angle > -80 && axis.angle < 80
            ? "start"
            : axis.angle > 100 || axis.angle < -100
              ? "end"
              : "middle";

        return (
          <g key={`label-${i}`}>
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={17}
              fontWeight="bold"
              fill={colors.chineseSilver}
              fontFamily="Inter, sans-serif"
            >
              {axis.label}
            </text>
            {axis.shortLabel && (
              <text
                x={p.x}
                y={p.y + 10}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={17}
                fontWeight="bold"
                fill={colors.chineseSilver}
                fontFamily="Inter, sans-serif"
              >
                {axis.shortLabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const Scene4Enterprise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Left rubric chart appears
  const rubricProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Right comparison chart grid appears
  const compGridProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Enterprise polygon draws (blue)
  const enterpriseFill = interpolate(
    frame,
    [7 * fps, 12 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Web AI polygon draws (red) - appears after enterprise
  const webFill = interpolate(
    frame,
    [13 * fps, 17 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Legend appears
  const legendProgress = spring({
    frame,
    fps,
    delay: 18 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const legendOpacity = interpolate(legendProgress, [0, 1], [0, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 20 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  // Background glow
  const bgPulse = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [0.02, 0.04],
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkNavy} 0%, #0d1525 60%, ${colors.darkCharcoal} 100%)`,
        fontFamily,
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.tiffanyBlue} 0%, transparent 70%)`,
          opacity: bgPulse,
          zIndex: 0,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Enterprise AI Is{" "}
          <span style={{ color: colors.tiffanyBlue }}>Different</span>
        </div>
      </div>

      {/* Left chart: Rubric */}
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 100,
          zIndex: 2,
        }}
      >
        <RubricChart
          cx={300}
          cy={280}
          radius={180}
          progress={rubricProgress}
        />
      </div>

      {/* Left label */}
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 115,
          opacity: interpolate(rubricProgress, [0, 1], [0, 1]),
          fontSize: 18,
          fontWeight: 700,
          color: colors.rhythm,
          letterSpacing: 3,
          zIndex: 3,
        }}
      >
        ASSESSMENT RUBRIC
      </div>

      {/* Right chart: Comparison */}
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 100,
          zIndex: 2,
        }}
      >
        <ComparisonChart
          cx={300}
          cy={280}
          radius={180}
          gridProgress={compGridProgress}
          webProgress={webFill}
          enterpriseProgress={enterpriseFill}
        />
      </div>

      {/* Right label */}
      <div
        style={{
          position: "absolute",
          right: 280,
          top: 115,
          opacity: interpolate(compGridProgress, [0, 1], [0, 1]),
          fontSize: 18,
          fontWeight: 700,
          color: colors.rhythm,
          letterSpacing: 3,
          zIndex: 3,
        }}
      >
        WEB vs ENTERPRISE
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 60,
          opacity: legendOpacity,
          zIndex: 3,
        }}
      >
        {/* Enterprise legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: colors.darkCyra,
            }}
          />
          <span style={{ fontSize: 18, color: colors.white, fontWeight: 700 }}>
            Enterprise AI
          </span>
        </div>
        {/* Web legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: colors.oldRose,
            }}
          />
          <span style={{ fontSize: 18, color: colors.white, fontWeight: 700 }}>
            Web AI
          </span>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            fontSize: 28,
            color: colors.chineseSilver,
            textAlign: "center",
          }}
        >
          If you treat them the same,{" "}
          <span style={{ color: colors.oldRose, fontWeight: 700 }}>
            you fail
          </span>
          .
        </div>
      </div>
    </AbsoluteFill>
  );
};
