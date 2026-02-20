import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Lifecycle stage data
interface LifecycleStage {
  label: string;
  angle: number;
  color: string;
}

const stages: LifecycleStage[] = [
  { label: "Train", angle: -90, color: colors.darkCyra },
  { label: "Deploy", angle: 0, color: colors.tiffanyBlue },
  { label: "Monitor", angle: 90, color: colors.caribbeanGreen },
  { label: "Retrain", angle: 180, color: colors.viridianGreen },
];

export const Scene7DataNeverSleeps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerX = 960;
  const centerY = 460;
  const radius = 220;

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Lifecycle loop rotation
  const loopRotation = interpolate(
    frame,
    [3 * fps, 25 * fps],
    [0, 360],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Circle arc draw
  const arcProgress = interpolate(
    frame,
    [2 * fps, 6 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Arrow heads on arc
  const arrowOpacity = interpolate(
    frame,
    [5 * fps, 6.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Questions section
  const questions = [
    { text: "Where does your data come from?", delay: 8 },
    { text: "Is it stable?", delay: 10 },
    { text: "Is it archived?", delay: 12 },
    { text: "Can you retrain when drift happens?", delay: 14 },
  ];

  // Living systems text
  const livingProgress = spring({
    frame,
    fps,
    delay: 18 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const livingOpacity = interpolate(livingProgress, [0, 1], [0, 1]);
  const livingY = interpolate(livingProgress, [0, 1], [20, 0]);

  // Traveling dot around the circle
  const dotAngle = loopRotation - 90;
  const dotRad = (dotAngle * Math.PI) / 180;
  const dotX = centerX + Math.cos(dotRad) * radius;
  const dotY = centerY + Math.sin(dotRad) * radius;

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle background circles */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.04 }}
      >
        {[150, 250, 350].map((r) => (
          <circle
            key={`bg-c-${r}`}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
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
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          Data{" "}
          <span style={{ color: colors.darkCyra }}>Never Sleeps</span>
        </div>
      </div>

      {/* Lifecycle loop circle */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        {/* Main circle arc */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={`${colors.darkCyra}25`}
          strokeWidth={4}
          strokeDasharray={`${arcProgress * 2 * Math.PI * radius} ${2 * Math.PI * radius}`}
          strokeLinecap="round"
        />

        {/* Directional arrows on the arc */}
        {stages.map((stage, i) => {
          const arrowAngle = stage.angle + 45;
          const arrowRad = (arrowAngle * Math.PI) / 180;
          const ax = centerX + Math.cos(arrowRad) * radius;
          const ay = centerY + Math.sin(arrowRad) * radius;

          return (
            <g key={`arrow-${i}`} opacity={arrowOpacity}>
              <circle cx={ax} cy={ay} r={6} fill={colors.darkCyra} />
            </g>
          );
        })}

        {/* Traveling data dot */}
        {frame > 3 * fps && (
          <circle
            cx={dotX}
            cy={dotY}
            r={8}
            fill={colors.caribbeanGreen}
            opacity={0.9}
          />
        )}
      </svg>

      {/* Stage nodes */}
      {stages.map((stage, i) => {
        const stageRad = (stage.angle * Math.PI) / 180;
        const nodeX = centerX + Math.cos(stageRad) * radius;
        const nodeY = centerY + Math.sin(stageRad) * radius;

        const nodeProgress = spring({
          frame,
          fps,
          delay: (3 + i * 1.5) * fps,
          config: { damping: 12, stiffness: 80 },
        });
        const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
        const nodeScale = interpolate(nodeProgress, [0, 1], [0, 1]);

        return (
          <div
            key={stage.label}
            style={{
              position: "absolute",
              left: nodeX - 65,
              top: nodeY - 35,
              width: 130,
              height: 70,
              opacity: nodeOpacity,
              transform: `scale(${nodeScale})`,
              background: colors.white,
              border: `2px solid ${stage.color}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 20px ${stage.color}20`,
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: stage.color,
              }}
            >
              {stage.label}
            </span>
          </div>
        );
      })}

      {/* Center label */}
      <div
        style={{
          position: "absolute",
          left: centerX - 60,
          top: centerY - 20,
          width: 120,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: interpolate(
              frame,
              [4 * fps, 5 * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
            fontSize: 16,
            fontWeight: 700,
            color: colors.rhythm,
            letterSpacing: 2,
          }}
        >
          LIFECYCLE
        </div>
      </div>

      {/* Questions on right */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 200,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 420,
          zIndex: 3,
        }}
      >
        {questions.map((q, i) => {
          const qProgress = spring({
            frame,
            fps,
            delay: q.delay * fps,
            config: { damping: 12, stiffness: 90 },
          });
          const qOpacity = interpolate(qProgress, [0, 1], [0, 1]);
          const qSlideX = interpolate(qProgress, [0, 1], [20, 0]);

          return (
            <div
              key={`q-${i}`}
              style={{
                opacity: qOpacity,
                transform: `translateX(${qSlideX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 22,
                color: colors.gunmetal,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: colors.darkCyra,
                  flexShrink: 0,
                }}
              />
              {q.text}
            </div>
          );
        })}
      </div>

      {/* Bottom living systems text */}
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
            opacity: livingOpacity,
            transform: `translateY(${livingY}px)`,
            fontSize: 28,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          AI systems are not install and forget.{" "}
          <span style={{ color: colors.darkCyra, fontWeight: 700 }}>
            They are living systems.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
