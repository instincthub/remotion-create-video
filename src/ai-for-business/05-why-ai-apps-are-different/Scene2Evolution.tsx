import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated accuracy line graph
const AccuracyGraph: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Two competing accuracy lines
  const vendorAPoints = [
    { x: 0, y: 82 }, { x: 1, y: 84 }, { x: 2, y: 86 },
    { x: 3, y: 85 }, { x: 4, y: 88 }, { x: 5, y: 90 },
    { x: 6, y: 89 }, { x: 7, y: 92 }, { x: 8, y: 95 },
  ];

  const vendorBPoints = [
    { x: 0, y: 80 }, { x: 1, y: 83 }, { x: 2, y: 82 },
    { x: 3, y: 87 }, { x: 4, y: 86 }, { x: 5, y: 88 },
    { x: 6, y: 91 }, { x: 7, y: 90 }, { x: 8, y: 93 },
  ];

  const toSvgY = (accuracy: number) => 220 - (accuracy - 75) * 10;
  const toSvgX = (idx: number) => 80 + idx * 75;

  const drawProgress = interpolate(progress, [0, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visiblePoints = Math.ceil(drawProgress * vendorAPoints.length);

  const buildPath = (points: { x: number; y: number }[]) => {
    const visible = points.slice(0, visiblePoints);
    if (visible.length < 2) return "";
    return visible
      .map((p, i) =>
        i === 0
          ? `M ${toSvgX(p.x)} ${toSvgY(p.y)}`
          : `L ${toSvgX(p.x)} ${toSvgY(p.y)}`
      )
      .join(" ");
  };

  // Axis labels
  const yLabels = [75, 80, 85, 90, 95];

  // Pulsing current values
  const pulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

  return (
    <svg width="800" height="280" viewBox="0 0 800 280">
      {/* Grid lines */}
      {yLabels.map((label) => (
        <g key={label}>
          <line
            x1={70}
            y1={toSvgY(label)}
            x2={700}
            y2={toSvgY(label)}
            stroke={colors.chineseSilver}
            strokeWidth={0.5}
            strokeDasharray="4 4"
          />
          <text
            x={55}
            y={toSvgY(label) + 5}
            fontSize={14}
            fill={colors.rhythm}
            textAnchor="end"
            fontFamily="monospace"
          >
            {label}%
          </text>
        </g>
      ))}

      {/* Vendor A line */}
      <path
        d={buildPath(vendorAPoints)}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Vendor B line */}
      <path
        d={buildPath(vendorBPoints)}
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {vendorAPoints.slice(0, visiblePoints).map((p, i) => (
        <circle
          key={`a-${i}`}
          cx={toSvgX(p.x)}
          cy={toSvgY(p.y)}
          r={i === visiblePoints - 1 ? 6 * pulse : 4}
          fill={colors.darkCyra}
        />
      ))}
      {vendorBPoints.slice(0, visiblePoints).map((p, i) => (
        <circle
          key={`b-${i}`}
          cx={toSvgX(p.x)}
          cy={toSvgY(p.y)}
          r={i === visiblePoints - 1 ? 6 * pulse : 4}
          fill={colors.caribbeanGreen}
        />
      ))}

      {/* Legend */}
      {progress > 0.2 && (
        <g>
          <rect x={580} y={20} width={14} height={14} rx={3} fill={colors.darkCyra} />
          <text x={600} y={32} fontSize={14} fill={colors.gunmetal} fontFamily={fontFamily}>
            Vendor A
          </text>
          <rect x={580} y={44} width={14} height={14} rx={3} fill={colors.caribbeanGreen} />
          <text x={600} y={56} fontSize={14} fill={colors.gunmetal} fontFamily={fontFamily}>
            Vendor B
          </text>
        </g>
      )}
    </svg>
  );
};

export const Scene2Evolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 120 },
  });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Graph progress
  const graphProgress = interpolate(
    frame,
    [2 * fps, 16 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Graph fade-in
  const graphOpacity = interpolate(frame, [2 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accuracy percentages
  const pctProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 200 },
  });
  const pctOpacity = interpolate(pctProgress, [0, 1], [0, 1]);

  // "Arms race" text
  const armsRaceProgress = spring({
    frame,
    fps,
    delay: 17 * fps,
    config: { damping: 10, stiffness: 100 },
  });
  const armsRaceOpacity = interpolate(armsRaceProgress, [0, 1], [0, 1]);
  const armsRaceScale = interpolate(armsRaceProgress, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.chineseSilver}30 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Heading */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headingOpacity,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          AI{" "}
          <span style={{ color: colors.darkCyra }}>evolves</span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        <div style={{ fontSize: 26, color: colors.rhythm }}>
          Accuracy changes over time. New data. New algorithms. New competition.
        </div>
      </div>

      {/* Accuracy graph */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: graphOpacity,
        }}
      >
        <AccuracyGraph progress={graphProgress} />
      </div>

      {/* Animated accuracy percentages */}
      <div
        style={{
          position: "absolute",
          top: 550,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 120,
          opacity: pctOpacity,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              fontFamily: "monospace",
              color: colors.darkCyra,
            }}
          >
            92%
          </div>
          <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 4 }}>
            Today
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <line x1={5} y1={30} x2={42} y2={30} stroke={colors.chineseSilver} strokeWidth={2} />
            <polygon points="42,22 58,30 42,38" fill={colors.chineseSilver} />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              fontFamily: "monospace",
              color: colors.caribbeanGreen,
            }}
          >
            95%
          </div>
          <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 4 }}>
            Tomorrow?
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <line x1={5} y1={30} x2={42} y2={30} stroke={colors.chineseSilver} strokeWidth={2} />
            <polygon points="42,22 58,30 42,38" fill={colors.chineseSilver} />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              fontFamily: "monospace",
              color: colors.oldRose,
            }}
          >
            88%
          </div>
          <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 4 }}>
            Or worse?
          </div>
        </div>
      </div>

      {/* Arms race callout */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: armsRaceOpacity,
          transform: `scale(${armsRaceScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 40,
            fontWeight: "bold",
            color: colors.white,
            backgroundColor: colors.darkCyra,
            padding: "16px 48px",
            borderRadius: 12,
          }}
        >
          An accuracy arms race
        </div>
      </div>
    </AbsoluteFill>
  );
};
