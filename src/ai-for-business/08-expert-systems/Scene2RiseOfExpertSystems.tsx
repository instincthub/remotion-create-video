import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Floating rule boxes that slide in
const RuleBox: React.FC<{
  text: string;
  delay: number;
  x: number;
  y: number;
  width?: number;
}> = ({ text, delay, x, y, width = 400 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 80 },
  });

  const slideX = interpolate(progress, [0, 1], [-200, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Subtle float
  const floatY = Math.sin((frame - delay) * 0.03) * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        padding: "16px 24px",
        backgroundColor: `${colors.white}F0`,
        border: `1px solid ${colors.chineseSilver}80`,
        borderLeft: `4px solid ${colors.darkCyra}`,
        borderRadius: 8,
        opacity,
        transform: `translateX(${slideX}px) translateY(${floatY}px)`,
        fontSize: 22,
        color: colors.gunmetal,
        fontFamily: "monospace",
        boxShadow: `0 4px 20px ${colors.darkCyra}15`,
      }}
    >
      {text}
    </div>
  );
};

// Flowchart diagram
const FlowChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartOpacity = interpolate(frame, [4 * fps, 5 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxes = [
    { x: 960, y: 250, label: "INPUT", w: 120, h: 40 },
    { x: 960, y: 340, label: "IF…THEN", w: 140, h: 40 },
    { x: 760, y: 450, label: "Rule A", w: 120, h: 40 },
    { x: 1160, y: 450, label: "Rule B", w: 120, h: 40 },
    { x: 960, y: 560, label: "OUTPUT", w: 130, h: 40 },
  ];

  const connections = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];

  return (
    <AbsoluteFill style={{ opacity: chartOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {connections.map(([a, b], i) => {
          const from = boxes[a];
          const to = boxes[b];
          const drawProgress = interpolate(
            frame,
            [5 * fps + i * 8, 5 * fps + i * 8 + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <line
              key={`flow-conn-${i}`}
              x1={from.x}
              y1={from.y + from.h / 2}
              x2={from.x + (to.x - from.x) * drawProgress}
              y2={
                from.y +
                from.h / 2 +
                (to.y - to.h / 2 - from.y - from.h / 2) * drawProgress
              }
              stroke={colors.darkCyra}
              strokeWidth={2}
              opacity={0.5}
            />
          );
        })}
        {boxes.map((box, i) => {
          const boxProgress = spring({
            frame,
            fps,
            delay: 4.5 * fps + i * 10,
            config: { damping: 200 },
          });
          return (
            <g key={`flow-box-${i}`} opacity={boxProgress}>
              <rect
                x={box.x - box.w / 2}
                y={box.y - box.h / 2}
                width={box.w}
                height={box.h}
                rx={6}
                fill={`${colors.darkCyra}20`}
                stroke={colors.darkCyra}
                strokeWidth={1.5}
              />
              <text
                x={box.x}
                y={box.y + 5}
                textAnchor="middle"
                fontSize={16}
                fontWeight="bold"
                fill={colors.darkSlateGray}
                fontFamily="Inter, sans-serif"
              >
                {box.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene2RiseOfExpertSystems: React.FC = () => {
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
  const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 14, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <FlowChart />

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
            fontSize: 56,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          The Rise of{" "}
          <span style={{ color: colors.darkCyra }}>Expert Systems</span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subOpacity,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: colors.rhythm,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          Instead of learning from data, AI tried to manually encode human
          expertise into software.
        </div>
      </div>

      {/* Rule boxes slide in */}
      <RuleBox
        text='IF fever AND bacteria THEN prescribe_antibiotic'
        delay={2 * fps}
        x={100}
        y={600}
        width={520}
      />
      <RuleBox
        text='IF symptom = "cough" THEN check_lungs'
        delay={2.5 * fps}
        x={700}
        y={680}
        width={460}
      />
      <RuleBox
        text='IF result > threshold THEN alert_doctor'
        delay={3 * fps}
        x={1300}
        y={620}
        width={480}
      />
      <RuleBox
        text='IF patient_age < 12 THEN adjust_dosage'
        delay={3.5 * fps}
        x={400}
        y={780}
        width={480}
      />
    </AbsoluteFill>
  );
};
