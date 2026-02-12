import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Person manually correcting spreadsheet icon
const ManualIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const cursorBlink = frame % 30 < 15 ? 1 : 0.3;

  return (
    <svg width="300" height="300" viewBox="0 0 200 200" style={{ opacity }}>
      {/* Spreadsheet */}
      <rect x={30} y={20} width={140} height={140} rx={8} fill={colors.white} stroke={colors.chineseSilver} strokeWidth={2} />
      {/* Grid lines */}
      {[60, 100].map((y) => (
        <line key={y} x1={30} y1={y} x2={170} y2={y} stroke={colors.chineseSilver} strokeWidth={1} />
      ))}
      {[80, 130].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={160} stroke={colors.chineseSilver} strokeWidth={1} />
      ))}
      {/* Red cells */}
      <rect x={81} y={61} width={48} height={38} fill={`${colors.oldRose}25`} />
      <rect x={131} y={101} width={38} height={38} fill={`${colors.oldRose}25`} />
      {/* ERR text */}
      <text x={105} y={85} textAnchor="middle" fontSize="14" fill={colors.oldRose} fontWeight="bold">ERR</text>
      <text x={150} y={125} textAnchor="middle" fontSize="14" fill={colors.oldRose} fontWeight="bold">N/A</text>
      {/* Cursor */}
      <rect x={83} y={63} width={2} height={34} fill={colors.gunmetal} opacity={cursorBlink} />
      {/* Person silhouette */}
      <circle cx={100} cy={180} r={8} fill={colors.rhythm} opacity={0.5} />
    </svg>
  );
};

// Automated pipeline icon
const PipelineIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const stages = [
    { x: 20, label: "Raw", color: colors.oldRose },
    { x: 75, label: "Clean", color: colors.corn },
    { x: 130, label: "Valid", color: colors.caribbeanGreen },
  ];

  return (
    <svg width="300" height="300" viewBox="0 0 200 200" style={{ opacity: progress }}>
      {/* Pipeline stages */}
      {stages.map((stage, i) => {
        const stageProgress = interpolate(progress, [i * 0.25, i * 0.25 + 0.3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const pulse = Math.sin((frame * 0.08 + i) * 2) * 0.15 + 0.85;
        return (
          <g key={i} opacity={stageProgress}>
            <rect
              x={stage.x}
              y={70}
              width={50}
              height={60}
              rx={8}
              fill={`${stage.color}20`}
              stroke={stage.color}
              strokeWidth={2}
              opacity={pulse}
            />
            <text
              x={stage.x + 25}
              y={105}
              textAnchor="middle"
              fontSize="12"
              fill={stage.color}
              fontWeight="bold"
            >
              {stage.label}
            </text>
            {/* Arrow to next */}
            {i < stages.length - 1 && (
              <polygon
                points={`${stage.x + 55},95 ${stage.x + 70},100 ${stage.x + 55},105`}
                fill={colors.caribbeanGreen}
                opacity={stageProgress}
              />
            )}
          </g>
        );
      })}
      {/* Gear icon at top */}
      <circle cx={100} cy={40} r={18} fill="none" stroke={colors.darkCyra} strokeWidth={2} opacity={progress} />
      <circle cx={100} cy={40} r={6} fill={colors.darkCyra} opacity={progress} />
      {/* Gear teeth */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle + frame * 2) * (Math.PI / 180);
        return (
          <rect
            key={angle}
            x={100 + Math.cos(rad) * 18 - 4}
            y={40 + Math.sin(rad) * 18 - 4}
            width={8}
            height={8}
            rx={2}
            fill={colors.darkCyra}
            opacity={progress}
          />
        );
      })}
      {/* Auto label */}
      <text x={100} y={170} textAnchor="middle" fontSize="14" fill={colors.darkCyra} fontWeight="bold" opacity={progress}>
        Automated
      </text>
      {/* Repeat arrow */}
      <path
        d="M 60 155 A 40 20 0 1 1 140 155"
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={2}
        opacity={progress * 0.6}
        strokeDasharray="4 4"
      />
    </svg>
  );
};

export const Scene4AutomateClean: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Manual side
  const manualOpacity = interpolate(frame, [1.5 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Automated side
  const autoProgress = interpolate(frame, [4 * fps, 8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red X over manual
  const crossProgress = spring({
    frame,
    fps,
    delay: 10 * fps,
    config: { damping: 10, stiffness: 180 },
  });
  const crossOpacity = interpolate(crossProgress, [0, 1], [0, 0.8]);
  const crossScale = interpolate(crossProgress, [0, 1], [0.3, 1]);

  // Green check over automated
  const checkProgress = spring({
    frame,
    fps,
    delay: 12 * fps,
    config: { damping: 10, stiffness: 180 },
  });
  const checkOpacity = interpolate(checkProgress, [0, 1], [0, 1]);
  const checkScale = interpolate(checkProgress, [0, 1], [0.3, 1]);

  // Bottom question text
  const questionProgress = spring({
    frame,
    fps,
    delay: 15 * fps,
    config: { damping: 200 },
  });
  const questionOpacity = interpolate(questionProgress, [0, 1], [0, 1]);

  // Clock warning
  const clockPulse = Math.sin(frame * 0.1) * 0.2 + 0.8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: "bold",
          color: colors.darkSlateGray,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Can you{" "}
        <span style={{ color: colors.darkCyra }}>automate</span>{" "}
        your data cleaning?
      </div>

      {/* Split comparison */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 120,
        }}
      >
        {/* Manual side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: colors.gunmetal,
              marginBottom: 20,
              opacity: manualOpacity,
            }}
          >
            Manual Cleaning
          </div>
          <ManualIcon opacity={manualOpacity} />
          <div
            style={{
              fontSize: 20,
              color: colors.rhythm,
              marginTop: 16,
              opacity: manualOpacity,
              textAlign: "center",
            }}
          >
            Analysts fixing errors daily
          </div>

          {/* Clock warning */}
          <div
            style={{
              marginTop: 16,
              fontSize: 17,
              color: colors.oldRose,
              opacity: manualOpacity * clockPulse,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx={8} cy={8} r={7} fill="none" stroke={colors.oldRose} strokeWidth={1.5} />
              <line x1={8} y1={4} x2={8} y2={8} stroke={colors.oldRose} strokeWidth={1.5} />
              <line x1={8} y1={8} x2={11} y2={10} stroke={colors.oldRose} strokeWidth={1.5} />
            </svg>
            Slow, error-prone
          </div>

          {/* Red X */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{
              position: "absolute",
              top: 140,
              left: "50%",
              transform: `translateX(-50%) scale(${crossScale})`,
              opacity: crossOpacity,
            }}
          >
            <line x1={15} y1={15} x2={65} y2={65} stroke={colors.oldRose} strokeWidth={8} strokeLinecap="round" />
            <line x1={65} y1={15} x2={15} y2={65} stroke={colors.oldRose} strokeWidth={8} strokeLinecap="round" />
          </svg>
        </div>

        {/* VS divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            fontWeight: "bold",
            color: colors.rhythm,
            opacity: autoProgress,
          }}
        >
          VS
        </div>

        {/* Automated side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: colors.darkCyra,
              marginBottom: 20,
              opacity: autoProgress,
            }}
          >
            Automated Pipeline
          </div>
          <PipelineIcon progress={autoProgress} />
          <div
            style={{
              fontSize: 20,
              color: colors.rhythm,
              marginTop: 16,
              opacity: autoProgress,
              textAlign: "center",
            }}
          >
            Consistent, scalable process
          </div>

          {/* Green check */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{
              position: "absolute",
              top: 140,
              left: "50%",
              transform: `translateX(-50%) scale(${checkScale})`,
              opacity: checkOpacity,
            }}
          >
            <path d="M 15 40 L 32 57 L 65 20" fill="none" stroke={colors.caribbeanGreen} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Bottom question */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 26,
          color: colors.gunmetal,
          opacity: questionOpacity,
        }}
      >
        If you cannot automate the cleaning, you{" "}
        <span style={{ color: colors.oldRose, fontWeight: "bold" }}>
          cannot scale
        </span>{" "}
        the solution.
      </div>

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.darkCyra,
        }}
      />
    </AbsoluteFill>
  );
};
