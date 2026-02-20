import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene6Complexity: React.FC = () => {
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

  // Central system icon
  const coreProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 12, stiffness: 80 },
  });
  const coreOpacity = interpolate(coreProgress, [0, 1], [0, 1]);
  const coreScale = interpolate(coreProgress, [0, 1], [0.7, 1]);

  // Surrounding complexity icons
  const complexities = [
    {
      label: "Biased Data",
      color: colors.oldRose,
      angle: -70,
      delay: 4,
      icon: "bias",
    },
    {
      label: "Data Drift",
      color: colors.metallicBlue,
      angle: 10,
      delay: 6,
      icon: "drift",
    },
    {
      label: "Regulation",
      color: colors.deepGreenCyanTurquoise,
      angle: 70,
      delay: 8,
      icon: "shield",
    },
    {
      label: "User Resistance",
      color: colors.turkishRose,
      angle: 140,
      delay: 10,
      icon: "user",
    },
    {
      label: "Vendor Lock-in",
      color: colors.policeBlue,
      angle: 200,
      delay: 12,
      icon: "cloud",
    },
  ];

  const cx = 960;
  const cy = 480;
  const radius = 260;

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
          Complexity Hides{" "}
          <span style={{ color: colors.oldRose }}>Everywhere</span>
        </span>
      </div>

      {/* Central AI system icon */}
      <div
        style={{
          position: "absolute",
          top: cy - 75,
          left: cx - 75,
          width: 150,
          height: 150,
          opacity: coreOpacity,
          transform: `scale(${coreScale})`,
        }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle
            cx={75}
            cy={75}
            r={70}
            fill={`${colors.darkCyra}15`}
            stroke={colors.darkCyra}
            strokeWidth={3.5}
          />
          <circle
            cx={75}
            cy={75}
            r={42}
            fill={`${colors.darkCyra}20`}
            stroke={colors.darkCyra}
            strokeWidth={2.5}
          />
          <path
            d="M57 75 Q75 53 93 75 Q75 97 57 75"
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={3}
          />
        </svg>
      </div>

      {/* AI System label below circle */}
      <div
        style={{
          position: "absolute",
          top: cy + 82,
          left: cx - 80,
          width: 160,
          textAlign: "center",
          opacity: coreOpacity,
          transform: `scale(${coreScale})`,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.darkCyra,
          }}
        >
          AI System
        </span>
      </div>

      {/* Complexity nodes */}
      {complexities.map((comp, i) => {
        const compProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * comp.delay),
          config: { damping: 12, stiffness: 80 },
        });
        const compOpacity = interpolate(compProgress, [0, 1], [0, 1]);
        const compScale = interpolate(compProgress, [0, 1], [0.5, 1]);
        const pulse =
          Math.sin(frame * 0.04 + i * 1.3) * 0.08 + 0.92;

        const rad = (comp.angle * Math.PI) / 180;
        const nodeX = cx + Math.cos(rad) * radius;
        const nodeY = cy + Math.sin(rad) * radius;

        return (
          <div key={comp.label}>
            {/* Connection line to center */}
            <svg
              width="1920"
              height="1080"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: compOpacity * 0.6,
              }}
            >
              <line
                x1={cx}
                y1={cy}
                x2={nodeX}
                y2={nodeY}
                stroke={comp.color}
                strokeWidth={2.5}
                strokeDasharray="8 5"
              />
            </svg>

            {/* Node */}
            <div
              style={{
                position: "absolute",
                top: nodeY - 55,
                left: nodeX - 80,
                width: 160,
                opacity: compOpacity * pulse,
                transform: `scale(${compScale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <svg width="72" height="72" viewBox="0 0 72 72">
                {comp.icon === "bias" && (
                  <>
                    <circle cx={36} cy={36} r={32} fill={`${comp.color}20`} stroke={comp.color} strokeWidth={2.5} />
                    <path d="M20 48 L36 16 L52 48" fill="none" stroke={comp.color} strokeWidth={3} />
                    <line x1={36} y1={28} x2={36} y2={38} stroke={comp.color} strokeWidth={3} />
                    <circle cx={36} cy={43} r={2} fill={comp.color} />
                  </>
                )}
                {comp.icon === "drift" && (
                  <>
                    <circle cx={36} cy={36} r={32} fill={`${comp.color}20`} stroke={comp.color} strokeWidth={2.5} />
                    <path d="M14 42 Q24 24 36 36 Q48 48 58 28" fill="none" stroke={comp.color} strokeWidth={3} />
                  </>
                )}
                {comp.icon === "shield" && (
                  <>
                    <path d="M36 6 L58 18 L58 40 Q58 56 36 64 Q14 56 14 40 L14 18 Z" fill={`${comp.color}20`} stroke={comp.color} strokeWidth={2.5} />
                    <path d="M28 36 L33 41 L44 28" fill="none" stroke={comp.color} strokeWidth={3} />
                  </>
                )}
                {comp.icon === "user" && (
                  <>
                    <circle cx={36} cy={36} r={32} fill={`${comp.color}20`} stroke={comp.color} strokeWidth={2.5} />
                    <circle cx={36} cy={28} r={10} fill="none" stroke={comp.color} strokeWidth={2.5} />
                    <path d="M18 58 Q26 42 36 42 Q46 42 54 58" fill="none" stroke={comp.color} strokeWidth={2.5} />
                    <line x1={24} y1={22} x2={48} y2={22} stroke={comp.color} strokeWidth={2.5} />
                  </>
                )}
                {comp.icon === "cloud" && (
                  <>
                    <circle cx={36} cy={36} r={32} fill={`${comp.color}20`} stroke={comp.color} strokeWidth={2.5} />
                    <path d="M18 40 Q18 26 30 26 Q32 18 40 18 Q50 18 52 28 Q60 30 58 40 Z" fill="none" stroke={comp.color} strokeWidth={2.5} />
                    <line x1={28} y1={48} x2={28} y2={54} stroke={comp.color} strokeWidth={2} />
                    <line x1={36} y1={46} x2={36} y2={54} stroke={comp.color} strokeWidth={2} />
                    <line x1={44} y1={48} x2={44} y2={54} stroke={comp.color} strokeWidth={2} />
                  </>
                )}
              </svg>

              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: comp.color,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {comp.label}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
