import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene7Lifecycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Three pipeline stages
  const stages = [
    {
      label: "Develop",
      sublabel: "Proves feasibility",
      color: colors.darkCyra,
      icon: "dev",
      delay: 3,
    },
    {
      label: "Deploy",
      sublabel: "Creates real usage",
      color: colors.viridianGreen,
      icon: "deploy",
      delay: 7,
    },
    {
      label: "Sustain",
      sublabel: "Keeps performance stable",
      color: colors.deepGreenCyanTurquoise,
      icon: "sustain",
      delay: 11,
    },
  ];

  const stageWidth = 420;
  const stageHeight = 300;
  const stageY = 280;
  const gap = 70;
  const totalWidth = stages.length * stageWidth + (stages.length - 1) * gap;
  const startX = (1920 - totalWidth) / 2;

  // Warning text
  const warningProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 16),
    config: { damping: 12, stiffness: 80 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);
  const warningY = interpolate(warningProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          <span style={{ color: colors.darkCyra }}>Develop</span>.{" "}
          <span style={{ color: colors.viridianGreen }}>Deploy</span>.{" "}
          <span style={{ color: colors.deepGreenCyanTurquoise }}>Sustain</span>.
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 135,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: colors.gunmetal,
          }}
        >
          The full lifecycle matters
        </span>
      </div>

      {/* Pipeline stages */}
      {stages.map((stage, i) => {
        const stageProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * stage.delay),
          config: { damping: 12, stiffness: 80 },
        });
        const stageOpacity = interpolate(stageProgress, [0, 1], [0, 1]);
        const stageXAnim = interpolate(stageProgress, [0, 1], [-60, 0]);

        const x = startX + i * (stageWidth + gap);

        return (
          <div key={stage.label}>
            {/* Stage card */}
            <div
              style={{
                position: "absolute",
                top: stageY,
                left: x,
                width: stageWidth,
                height: stageHeight,
                opacity: stageOpacity,
                transform: `translateX(${stageXAnim}px)`,
                background: `${stage.color}12`,
                border: `3px solid ${stage.color}45`,
                borderRadius: 18,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
              }}
            >
              {/* Icon */}
              <svg width="100" height="100" viewBox="0 0 80 80">
                {stage.icon === "dev" && (
                  <>
                    <rect x={14} y={14} width={52} height={36} rx={4} fill={`${stage.color}20`} stroke={stage.color} strokeWidth={2.5} />
                    <rect x={8} y={50} width={64} height={6} rx={3} fill={`${stage.color}25`} stroke={stage.color} strokeWidth={2} />
                    <text x={28} y={38} fill={stage.color} fontSize={18} fontWeight={700} fontFamily={fontFamily}>
                      {"</>"}
                    </text>
                  </>
                )}
                {stage.icon === "deploy" && (
                  <>
                    <path
                      d="M18 48 Q18 30 32 30 Q34 20 44 20 Q56 20 58 32 Q68 34 66 48 Z"
                      fill={`${stage.color}20`}
                      stroke={stage.color}
                      strokeWidth={2.5}
                    />
                    <line x1={40} y1={42} x2={40} y2={56} stroke={stage.color} strokeWidth={3} />
                    <polygon points="32,42 40,32 48,42" fill={stage.color} />
                  </>
                )}
                {stage.icon === "sustain" && (
                  <>
                    <rect x={10} y={10} width={60} height={50} rx={6} fill={`${stage.color}18`} stroke={stage.color} strokeWidth={2.5} />
                    <polyline
                      points="20,44 30,30 40,38 50,22 60,28"
                      fill="none"
                      stroke={stage.color}
                      strokeWidth={3}
                    />
                    <circle
                      cx={60}
                      cy={28}
                      r={5}
                      fill={stage.color}
                      opacity={Math.sin(frame * 0.08) * 0.3 + 0.7}
                    />
                  </>
                )}
              </svg>

              {/* Label */}
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: stage.color,
                }}
              >
                {stage.label}
              </span>

              {/* Sublabel */}
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  color: colors.gunmetal,
                  textAlign: "center",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                {stage.sublabel}
              </span>
            </div>

            {/* Arrow to next stage */}
            {i < stages.length - 1 && (
              <svg
                width={gap}
                height="40"
                viewBox={`0 0 ${gap} 40`}
                style={{
                  position: "absolute",
                  top: stageY + stageHeight / 2 - 20,
                  left: x + stageWidth,
                  opacity: stageOpacity,
                }}
              >
                <line
                  x1={10}
                  y1={20}
                  x2={gap - 18}
                  y2={20}
                  stroke={stage.color}
                  strokeWidth={3.5}
                  strokeDasharray="7 5"
                  strokeDashoffset={-(frame * 1.5) % 24}
                />
                <polygon
                  points={`${gap - 18},10 ${gap - 4},20 ${gap - 18},30`}
                  fill={stage.color}
                />
              </svg>
            )}
          </div>
        );
      })}

      {/* Warning line at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          width: "100%",
          textAlign: "center",
          opacity: warningOpacity,
          transform: `translateY(${warningY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: colors.oldRose,
          }}
        >
          Stop at development? You have a prototype.
        </span>
        <br />
        <span
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: colors.oldRose,
            marginTop: 12,
            display: "inline-block",
          }}
        >
          Deploy without sustainment? You have technical debt.
        </span>
      </div>
    </AbsoluteFill>
  );
};
