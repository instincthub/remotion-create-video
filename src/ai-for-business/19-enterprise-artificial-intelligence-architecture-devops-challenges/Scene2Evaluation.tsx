import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MODELS = [
  { name: "Model A", provider: "Provider 1", color: colors.darkCyra },
  { name: "Model B", provider: "Provider 2", color: colors.viridianGreen },
];

// Performance meter that animates
const PerformanceMeter: React.FC<{
  label: string;
  value: number;
  color: string;
  entrance: number;
  frame: number;
}> = ({ label, value, color, entrance, frame }) => {
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const animatedValue = interpolate(entrance, [0, 1], [0, value]);
  const barWidth = interpolate(animatedValue, [0, 100], [0, 260]);

  // Subtle fluctuation to show "real-time" updates
  const fluctuation = Math.sin(frame * 0.08) * 3;
  const displayValue = Math.round(animatedValue + (entrance > 0.9 ? fluctuation : 0));

  return (
    <div style={{ opacity, marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          fontSize: 18,
          fontWeight: 700,
          color: colors.gunmetal,
        }}
      >
        <span>{label}</span>
        <span style={{ color }}>{Math.min(100, Math.max(0, displayValue))}%</span>
      </div>
      <div
        style={{
          width: 260,
          height: 14,
          background: `${colors.chineseSilver}40`,
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: barWidth + (entrance > 0.9 ? fluctuation : 0),
            height: "100%",
            background: color,
            borderRadius: 7,
          }}
        />
      </div>
    </div>
  );
};

// Model card panel
const ModelPanel: React.FC<{
  model: typeof MODELS[0];
  side: "left" | "right";
  entrance: number;
  frame: number;
}> = ({ model, side, entrance, frame }) => {
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const slideX = interpolate(
    entrance,
    [0, 1],
    [side === "left" ? -60 : 60, 0],
  );

  const metrics = [
    { label: "Accuracy", value: side === "left" ? 92 : 87 },
    { label: "Latency", value: side === "left" ? 78 : 94 },
    { label: "Cost Efficiency", value: side === "left" ? 65 : 82 },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        width: 360,
        background: colors.white,
        borderRadius: 14,
        padding: 28,
        boxShadow: `0 4px 24px ${colors.darkCyra}15`,
        border: `2px solid ${model.color}30`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: model.color,
          }}
        />
        <div style={{ fontSize: 24, fontWeight: 700, color: colors.gunmetal }}>
          {model.name}
        </div>
        <div
          style={{
            fontSize: 15,
            color: colors.rhythm,
            marginLeft: "auto",
          }}
        >
          {model.provider}
        </div>
      </div>

      {/* Metrics */}
      {metrics.map((metric, i) => {
        const metricEntrance = spring({
          frame,
          fps: 30,
          delay: 45 + i * 15,
          config: { damping: 14, stiffness: 80 },
        });
        return (
          <PerformanceMeter
            key={metric.label}
            label={metric.label}
            value={metric.value}
            color={model.color}
            entrance={entrance * metricEntrance}
            frame={frame}
          />
        );
      })}
    </div>
  );
};

export const Scene2Evaluation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Left panel
  const leftEntrance = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Right panel
  const rightEntrance = spring({
    frame,
    fps,
    delay: Math.round(fps * 1.5),
    config: { damping: 12, stiffness: 80 },
  });

  // "VS" badge
  const vsProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 10, stiffness: 120 },
  });
  const vsOpacity = interpolate(vsProgress, [0, 1], [0, 1]);
  const vsScale = interpolate(vsProgress, [0, 1], [0.5, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 8),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
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
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Continuous Evaluation Is{" "}
          <span style={{ color: colors.darkCyra }}>Mandatory</span>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          bottom: 310,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <ModelPanel
          model={MODELS[0]}
          side="left"
          entrance={leftEntrance}
          frame={frame}
        />

        {/* VS badge */}
        <div
          style={{
            opacity: vsOpacity,
            transform: `scale(${vsScale})`,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: colors.darkSlateGray,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 700,
            color: colors.white,
            flexShrink: 0,
          }}
        >
          VS
        </div>

        <ModelPanel
          model={MODELS[1]}
          side="right"
          entrance={rightEntrance}
          frame={frame}
        />
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${colors.darkCyra}12`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.darkCyra}30`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.gunmetal,
              fontWeight: 700,
            }}
          >
            You do not marry a model. You benchmark it.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
