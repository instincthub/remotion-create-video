import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Abstract investment graph — rises then crashes
const InvestmentGraph: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Graph line: rises from left, peaks at 60%, then drops sharply
  const points = [
    { x: 100, y: 500 },
    { x: 300, y: 420 },
    { x: 500, y: 320 },
    { x: 700, y: 200 },
    { x: 850, y: 140 },
    { x: 950, y: 120 }, // peak
    { x: 1050, y: 160 },
    { x: 1150, y: 320 },
    { x: 1250, y: 480 },
    { x: 1350, y: 520 },
  ];

  // Draw progress of the line
  const drawProgress = interpolate(progress, [0, 1], [0, points.length - 1], {
    extrapolateRight: "clamp",
  });

  const visiblePoints = points.slice(0, Math.ceil(drawProgress) + 1);
  const pathD = visiblePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Glow under the line (area fill)
  const areaD = pathD + ` L ${visiblePoints[visiblePoints.length - 1].x} 560 L 100 560 Z`;

  // Pulse effect on the peak
  const peakPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <svg
      width="1440"
      height="600"
      viewBox="0 1440 600"
      style={{ position: "absolute", bottom: 60, left: 240, opacity: progress }}
    >
      {/* Grid lines */}
      {[200, 300, 400, 500].map((y) => (
        <line
          key={y}
          x1={80}
          y1={y}
          x2={1400}
          y2={y}
          stroke={colors.chineseSilver}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Area glow */}
      <path d={areaD} fill={colors.darkCyra} opacity={0.08} />

      {/* Main line */}
      <path
        d={pathD}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Drop zone — red section after peak */}
      {drawProgress > 6 && (
        <path
          d={`M 950 120 L 1050 160 L 1150 320 L 1250 480 L 1350 520`}
          fill="none"
          stroke={colors.oldRose}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(drawProgress, [6, 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      )}

      {/* Peak marker */}
      {drawProgress > 5 && (
        <circle
          cx={950}
          cy={120}
          r={8}
          fill={colors.oldRose}
          opacity={peakPulse}
        />
      )}

      {/* Dollar signs floating up along the rise */}
      {drawProgress > 2 && (
        <>
          <text
            x={400}
            y={380 - (frame * 0.4) % 40}
            fill={colors.caribbeanGreen}
            fontSize="24"
            opacity={0.4}
          >
            $
          </text>
          <text
            x={650}
            y={260 - (frame * 0.3) % 35}
            fill={colors.caribbeanGreen}
            fontSize="20"
            opacity={0.3}
          >
            $
          </text>
        </>
      )}

      {/* X mark at the crash end */}
      {drawProgress > 8 && (
        <>
          <line
            x1={1320}
            y1={490}
            x2={1380}
            y2={550}
            stroke={colors.oldRose}
            strokeWidth={4}
            opacity={0.8}
          />
          <line
            x1={1380}
            y1={490}
            x2={1320}
            y2={550}
            stroke={colors.oldRose}
            strokeWidth={4}
            opacity={0.8}
          />
        </>
      )}
    </svg>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Millions spent."
  const line1Progress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const line1Scale = interpolate(line1Progress, [0, 1], [0.6, 1]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // Line 2: "Prototype built."
  const line2Progress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 150 },
  });
  const line2Scale = interpolate(line2Progress, [0, 1], [0.6, 1]);
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);

  // Line 3: "Project killed." (punchy, with color)
  const line3Progress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 8, stiffness: 120 },
  });
  const line3Scale = interpolate(line3Progress, [0, 1], [0.4, 1]);
  const line3Opacity = interpolate(line3Progress, [0, 1], [0, 1]);

  // Graph draws in from 1 second
  const graphProgress = interpolate(frame, [1 * fps, 10 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.chineseSilver}40 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Graph visual */}
      <InvestmentGraph progress={graphProgress} />

      {/* Main kinetic text — top portion */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 140,
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.darkCyra,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity,
          }}
        >
          Millions spent.
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.gunmetal,
            transform: `scale(${line2Scale})`,
            opacity: line2Opacity,
          }}
        >
          Prototype built.
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: colors.oldRose,
            transform: `scale(${line3Scale})`,
            opacity: line3Opacity,
          }}
        >
          Project killed.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
