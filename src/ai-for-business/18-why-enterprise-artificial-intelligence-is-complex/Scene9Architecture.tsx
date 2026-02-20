import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const BLUEPRINT_ITEMS = [
  { label: "Multiple Models", icon: "models" },
  { label: "Real Time", icon: "clock" },
  { label: "Stateful", icon: "state" },
  { label: "Continuous Learning", icon: "loop" },
  { label: "Federated", icon: "fed" },
];

const PRINCIPLES = [
  "Think in systems",
  "Map data flow",
  "Measure error propagation",
  "Design for observability",
  "Assume failure",
  "Build interruption mechanisms",
];

export const Scene9Architecture: React.FC = () => {
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

  // Blueprint items entrance
  const itemEntrances = BLUEPRINT_ITEMS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * 10,
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // Principles appear
  const principleEntrances = PRINCIPLES.map((_, i) =>
    spring({
      frame,
      fps,
      delay: 4 * fps + i * 12,
      config: { damping: 14, stiffness: 120 },
    }),
  );

  // Connecting lines from left to right
  const lineProgress = interpolate(frame, [2 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #004a52 0%, #002a30 100%)`,
        fontFamily,
      }}
    >
      {/* Blueprint grid background */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1920" height="1080">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`bpv-${i}`}
              x1={i * 100}
              y1={0}
              x2={i * 100}
              y2={1080}
              stroke={colors.white}
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`bph-${i}`}
              x1={0}
              y1={i * 100}
              x2={1920}
              y2={i * 100}
              stroke={colors.white}
              strokeWidth={1}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          AI Is{" "}
          <span style={{ color: colors.corn }}>Architecture</span>
        </div>
      </div>

      {/* Two-column layout */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          paddingTop: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 80,
            alignItems: "flex-start",
          }}
        >
          {/* Left: Blueprint items (complexity factors) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: colors.tiffanyBlue,
                marginBottom: 10,
                opacity: titleOpacity,
              }}
            >
              COMPLEXITY FACTORS
            </div>
            {BLUEPRINT_ITEMS.map((item, i) => {
              const entrance = itemEntrances[i];
              const opacity = interpolate(entrance, [0, 1], [0, 1]);
              const xOffset = interpolate(entrance, [0, 1], [-30, 0]);

              return (
                <div
                  key={item.label}
                  style={{
                    opacity,
                    transform: `translateX(${xOffset}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: `${colors.white}10`,
                    border: `1px solid ${colors.tiffanyBlue}30`,
                    borderRadius: 12,
                    padding: "18px 28px",
                    width: 400,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${colors.tiffanyBlue}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width={20} height={20} viewBox="0 0 20 20">
                      <rect
                        x={3}
                        y={3}
                        width={14}
                        height={14}
                        rx={3}
                        fill="none"
                        stroke={colors.tiffanyBlue}
                        strokeWidth={2}
                      />
                      <circle cx={10} cy={10} r={3} fill={colors.tiffanyBlue} />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 26,
                      color: colors.white,
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center: connecting arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: 100,
            }}
          >
            <svg width={80} height={40} viewBox="0 0 80 40">
              <line
                x1={0}
                y1={20}
                x2={60}
                y2={20}
                stroke={colors.corn}
                strokeWidth={3}
                strokeDasharray={`${lineProgress * 60} 60`}
              />
              <polygon
                points="58,10 78,20 58,30"
                fill={colors.corn}
                opacity={lineProgress}
              />
            </svg>
          </div>

          {/* Right: Principles */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: colors.caribbeanGreen,
                marginBottom: 10,
                opacity: interpolate(
                  frame,
                  [3.5 * fps, 4 * fps],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
              }}
            >
              DESIGN PRINCIPLES
            </div>
            {PRINCIPLES.map((principle, i) => {
              const entrance = principleEntrances[i];
              const opacity = interpolate(entrance, [0, 1], [0, 1]);
              const xOffset = interpolate(entrance, [0, 1], [30, 0]);

              return (
                <div
                  key={principle}
                  style={{
                    opacity,
                    transform: `translateX(${xOffset}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 20px",
                  }}
                >
                  <svg width={28} height={28} viewBox="0 0 20 20">
                    <circle
                      cx={10}
                      cy={10}
                      r={8}
                      fill="none"
                      stroke={colors.caribbeanGreen}
                      strokeWidth={2}
                    />
                    <polyline
                      points="6,10 9,13 14,7"
                      fill="none"
                      stroke={colors.caribbeanGreen}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontSize: 28,
                      color: colors.white,
                      fontWeight: 700,
                    }}
                  >
                    {principle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
