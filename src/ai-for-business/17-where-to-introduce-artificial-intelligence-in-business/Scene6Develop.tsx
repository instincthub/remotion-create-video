import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const loopSteps = [
  { label: "Feature\nExtraction", angle: 0 },
  { label: "Model\nSelection", angle: 72 },
  { label: "Model\nOptimization", angle: 144 },
  { label: "Human\nInsight", angle: 216 },
  { label: "Robustness\nTesting", angle: 288 },
];

export const Scene6Develop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Loop ring rotation
  const ringRotation = interpolate(frame, [0, 25 * fps], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center AI box
  const centerProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const centerOpacity = interpolate(centerProgress, [0, 1], [0, 1]);
  const centerScale = interpolate(centerProgress, [0, 1], [0.7, 1]);

  // Stress test prompts
  const stressPrompts = [
    { text: "Ambiguous query", delay: 7 * fps },
    { text: "Hostile input", delay: 8.5 * fps },
    { text: "Sensitive topic", delay: 10 * fps },
  ];

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 12 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const cx = 960;
  const cy = 500;
  const radius = 185;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}10 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}10 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: colors.tiffanyBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Develop
          </div>
          <div style={{ fontSize: 26, color: colors.rhythm }}>
            Test Before You Trust
          </div>
        </div>
      </div>

      {/* Circular feedback loop */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {/* Rotating arc indicator */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Outer ring */}
          <circle
            cx={cx}
            cy={cy}
            r={radius + 30}
            fill="none"
            stroke={`${colors.tiffanyBlue}15`}
            strokeWidth="3"
          />
          {/* Rotating accent arc */}
          <circle
            cx={cx}
            cy={cy}
            r={radius + 30}
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth="3"
            strokeDasharray="80 520"
            strokeDashoffset={-ringRotation * 1.67}
            opacity={0.4}
          />
          {/* Connection lines between steps */}
          {loopSteps.map((step, i) => {
            const nextIdx = (i + 1) % loopSteps.length;
            const angleRad1 = ((step.angle - 90) * Math.PI) / 180;
            const angleRad2 = ((loopSteps[nextIdx].angle - 90) * Math.PI) / 180;
            const x1 = cx + Math.cos(angleRad1) * radius;
            const y1 = cy + Math.sin(angleRad1) * radius;
            const x2 = cx + Math.cos(angleRad2) * radius;
            const y2 = cy + Math.sin(angleRad2) * radius;

            const lineProgress = spring({
              frame,
              fps,
              delay: 2.5 * fps + i * 14,
              config: { damping: 12, stiffness: 70 },
            });

            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.darkCyra}
                strokeWidth="2"
                opacity={interpolate(lineProgress, [0, 1], [0, 0.3])}
                strokeDasharray="6 4"
              />
            );
          })}
        </svg>

        {/* Loop step nodes */}
        {loopSteps.map((step, i) => {
          const angleRad = ((step.angle - 90) * Math.PI) / 180;
          const x = cx + Math.cos(angleRad) * radius;
          const y = cy + Math.sin(angleRad) * radius;

          const nodeProgress = spring({
            frame,
            fps,
            delay: 2 * fps + i * 14,
            config: { damping: 12, stiffness: 70 },
          });
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
          const nodeScale = interpolate(nodeProgress, [0, 1], [0.7, 1]);

          return (
            <div
              key={step.label}
              style={{
                position: "absolute",
                left: x - 85,
                top: y - 40,
                width: 170,
                opacity: nodeOpacity,
                transform: `scale(${nodeScale})`,
                background: colors.white,
                border: `2px solid ${colors.darkCyra}35`,
                borderRadius: 14,
                padding: "16px 14px",
                textAlign: "center",
                boxShadow: `0 4px 16px ${colors.darkCyra}10`,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.gunmetal,
                  whiteSpace: "pre-line",
                  lineHeight: 1.3,
                }}
              >
                {step.label}
              </div>
            </div>
          );
        })}

        {/* Center model box */}
        <div
          style={{
            position: "absolute",
            left: cx - 65,
            top: cy - 45,
            width: 130,
            height: 90,
            opacity: centerOpacity,
            transform: `scale(${centerScale})`,
            background: `linear-gradient(135deg, ${colors.darkCyra}, ${colors.tiffanyBlue})`,
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 30px ${colors.darkCyra}30`,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.white }}>
            MODEL
          </div>
        </div>
      </div>

      {/* Stress test prompts — centered row below diagram */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {stressPrompts.map((prompt) => {
          const promptProgress = spring({
            frame,
            fps,
            delay: prompt.delay,
            config: { damping: 12, stiffness: 70 },
          });
          const promptOpacity = interpolate(promptProgress, [0, 1], [0, 1]);
          const promptY = interpolate(promptProgress, [0, 1], [20, 0]);

          return (
            <div
              key={prompt.text}
              style={{
                opacity: promptOpacity,
                transform: `translateY(${promptY}px)`,
                background: `${colors.oldRose}10`,
                border: `1px solid ${colors.oldRose}30`,
                borderRadius: 12,
                padding: "12px 28px",
                fontSize: 20,
                color: colors.oldRose,
                fontWeight: 700,
              }}
            >
              {prompt.text}
            </div>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, color: colors.darkSlateGray }}>
          You must know before{" "}
          <span style={{ color: colors.darkCyra }}>deployment.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
