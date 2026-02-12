import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Overfitting curve animation — large version
const OverfitGraph: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const W = 1200;
  const H = 560;
  const padL = 90;
  const padR = 60;
  const padT = 50;
  const padB = 70;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // Training curve (keeps improving)
  const trainPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const loss = 0.9 - 0.8 * t + 0.12 * t * t;
    trainPoints.push({
      x: padL + t * plotW,
      y: padT + loss * plotH,
    });
  }

  // Validation curve (improves then worsens — U-shape)
  const valPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const loss = 0.9 - 0.45 * t + 0.75 * t * t;
    valPoints.push({
      x: padL + t * plotW,
      y: padT + Math.min(loss, 1) * plotH,
    });
  }

  // Draw progress
  const trainDraw = Math.floor(
    interpolate(progress, [0, 0.7], [0, trainPoints.length - 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const valDraw = Math.floor(
    interpolate(progress, [0.1, 0.8], [0, valPoints.length - 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const trainPath = trainPoints
    .slice(0, trainDraw + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const valPath = valPoints
    .slice(0, valDraw + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Sweet spot line
  const sweetSpotX = padL + 0.33 * plotW;
  const sweetSpotOpacity = interpolate(progress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overfit zone highlight
  const overfitOpacity = interpolate(progress, [0.8, 1], [0, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((frac) => (
        <line
          key={frac}
          x1={padL}
          y1={padT + frac * plotH}
          x2={padL + plotW}
          y2={padT + frac * plotH}
          stroke={colors.chineseSilver}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Axes */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke={colors.gunmetal} strokeWidth={2} />
      <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke={colors.gunmetal} strokeWidth={2} />

      {/* Axis labels */}
      <text x={padL + plotW / 2} y={H - 10} textAnchor="middle" fontSize="20" fill={colors.gunmetal} fontWeight="bold">
        Training Epochs →
      </text>
      <text
        x={20}
        y={padT + plotH / 2}
        textAnchor="middle"
        fontSize="20"
        fill={colors.gunmetal}
        fontWeight="bold"
        transform={`rotate(-90 20 ${padT + plotH / 2})`}
      >
        Error Rate →
      </text>

      {/* Overfit zone */}
      <rect
        x={sweetSpotX}
        y={padT}
        width={padL + plotW - sweetSpotX}
        height={plotH}
        fill={colors.oldRose}
        opacity={overfitOpacity}
        rx={4}
      />

      {/* Sweet spot vertical line */}
      <line
        x1={sweetSpotX}
        y1={padT}
        x2={sweetSpotX}
        y2={padT + plotH}
        stroke={colors.caribbeanGreen}
        strokeWidth={3}
        strokeDasharray="10 6"
        opacity={sweetSpotOpacity * pulse}
      />
      <text
        x={sweetSpotX}
        y={padT - 14}
        textAnchor="middle"
        fontSize="20"
        fill={colors.caribbeanGreen}
        fontWeight="bold"
        opacity={sweetSpotOpacity}
      >
        Sweet Spot
      </text>

      {/* Overfit label */}
      {overfitOpacity > 0.03 && (
        <text
          x={sweetSpotX + (padL + plotW - sweetSpotX) / 2}
          y={padT + 30}
          textAnchor="middle"
          fontSize="20"
          fill={colors.oldRose}
          fontWeight="bold"
          opacity={Math.min(overfitOpacity * 10, 1)}
        >
          Overfitting Zone
        </text>
      )}

      {/* Training curve */}
      <path d={trainPath} fill="none" stroke={colors.darkCyra} strokeWidth={4} strokeLinecap="round" />

      {/* Validation curve */}
      <path d={valPath} fill="none" stroke={colors.oldRose} strokeWidth={4} strokeLinecap="round" strokeDasharray="12 6" />

      {/* Legend */}
      <g opacity={progress > 0.2 ? 1 : 0}>
        <line x1={padL + plotW - 320} y1={padT + 24} x2={padL + plotW - 280} y2={padT + 24} stroke={colors.darkCyra} strokeWidth={4} />
        <text x={padL + plotW - 268} y={padT + 30} fontSize="18" fill={colors.gunmetal} fontWeight="bold">Training Error</text>

        <line x1={padL + plotW - 320} y1={padT + 58} x2={padL + plotW - 280} y2={padT + 58} stroke={colors.oldRose} strokeWidth={4} strokeDasharray="10 5" />
        <text x={padL + plotW - 268} y={padT + 64} fontSize="18" fill={colors.gunmetal} fontWeight="bold">Validation Error</text>
      </g>
    </svg>
  );
};

export const Scene6Generalisation: React.FC = () => {
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

  // Graph progress
  const graphProgress = interpolate(frame, [2 * fps, 14 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom insight
  const insightProgress = spring({
    frame,
    fps,
    delay: 16 * fps,
    config: { damping: 200 },
  });
  const insightOpacity = interpolate(insightProgress, [0, 1], [0, 1]);
  const insightY = interpolate(insightProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Grid background */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.chineseSilver}15 1px, transparent 1px), linear-gradient(90deg, ${colors.chineseSilver}15 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span style={{ fontSize: 72, fontWeight: "bold", color: colors.darkCyra }}>
          Generalisation
        </span>
        <span style={{ fontSize: 72, fontWeight: "bold", color: colors.rhythm, margin: "0 24px" }}>
          vs
        </span>
        <span style={{ fontSize: 72, fontWeight: "bold", color: colors.oldRose }}>
          Memorisation
        </span>
      </div>

      {/* Graph — large and centered */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <OverfitGraph progress={graphProgress} />
      </div>

      {/* Bottom insight */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: colors.rhythm,
          opacity: insightOpacity,
          transform: `translateY(${insightY}px)`,
        }}
      >
        Engineers deliberately design models that are{" "}
        <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>not perfect</span>
        . They aim for balance.
      </div>
    </AbsoluteFill>
  );
};
