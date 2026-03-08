import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const cycles = [
  { label: "Code", color: colors.darkCyra, icon: "code" },
  { label: "Think", color: colors.turkishRose, icon: "brain" },
  { label: "Rest", color: colors.caribbeanGreen, icon: "pause" },
  { label: "Code", color: colors.darkCyra, icon: "code" },
  { label: "Think", color: colors.turkishRose, icon: "brain" },
  { label: "Rest", color: colors.caribbeanGreen, icon: "pause" },
];

export const Scene4MixIntermittently: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  const subProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });

  // Active state indicator
  const activeIndex = Math.floor(frame / 120) % cycles.length;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 36,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Mix &{" "}
          <span style={{ color: colors.darkCyra }}>Repeat</span>
        </div>

        {/* Timeline blocks */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {cycles.map((cycle, i) => {
            const blockEntrance = spring({
              frame,
              fps,
              delay: 20 + i * 12,
              config: { damping: 14, stiffness: 80 },
            });
            const isActive = i === activeIndex;
            const widths = { code: "70%", brain: "35%", pause: "20%" };
            const blockWidth = widths[cycle.icon as keyof typeof widths];

            return (
              <div
                key={`${cycle.label}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: interpolate(blockEntrance, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(blockEntrance, [0, 1], [-40, 0])}px)`,
                }}
              >
                {/* Icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  {cycle.icon === "code" && (
                    <>
                      <path d="M12 10 L6 16 L12 22" stroke={cycle.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 10 L26 16 L20 22" stroke={cycle.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {cycle.icon === "brain" && (
                    <circle cx="16" cy="16" r="10" stroke={cycle.color} strokeWidth={2} fill={`${cycle.color}10`} />
                  )}
                  {cycle.icon === "pause" && (
                    <>
                      <rect x="10" y="8" width="4" height="16" rx="1" fill={cycle.color} opacity={0.7} />
                      <rect x="18" y="8" width="4" height="16" rx="1" fill={cycle.color} opacity={0.7} />
                    </>
                  )}
                </svg>

                {/* Bar */}
                <div
                  style={{
                    height: 36,
                    width: blockWidth,
                    borderRadius: 8,
                    backgroundColor: isActive ? cycle.color : `${cycle.color}30`,
                    border: `1.5px solid ${cycle.color}`,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 12,
                    transition: "background-color 0.3s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: isActive ? colors.white : cycle.color,
                    }}
                  >
                    {cycle.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Person state icons */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
        >
          {[
            { icon: "typing", color: colors.darkCyra, label: "Code" },
            { icon: "thinking", color: colors.turkishRose, label: "Think" },
            { icon: "relaxing", color: colors.caribbeanGreen, label: "Rest" },
          ].map((state, i) => {
            const isStateActive =
              (i === 0 && cycles[activeIndex].icon === "code") ||
              (i === 1 && cycles[activeIndex].icon === "brain") ||
              (i === 2 && cycles[activeIndex].icon === "pause");

            return (
              <div
                key={state.label}
                style={{
                  textAlign: "center",
                  opacity: isStateActive ? 1 : 0.3,
                }}
              >
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <circle
                    cx="25"
                    cy="25"
                    r="22"
                    fill={isStateActive ? `${state.color}20` : "transparent"}
                    stroke={state.color}
                    strokeWidth={isStateActive ? 2.5 : 1.5}
                  />
                  <circle cx="25" cy="20" r="6" stroke={state.color} strokeWidth={1.5} fill="none" />
                  <path d="M15 40 Q15 30 25 30 Q35 30 35 40" stroke={state.color} strokeWidth={1.5} fill="none" />
                </svg>
                <div style={{ fontSize: 14, color: state.color, fontWeight: 700, marginTop: 4 }}>
                  {state.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(subProgress, [0, 1], [0, 1]),
          }}
        >
          Sustainable AI-assisted development
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
