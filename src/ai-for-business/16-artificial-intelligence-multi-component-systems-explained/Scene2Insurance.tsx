import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const HealthIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 8V40" stroke={colors.darkCyra} strokeWidth="3" strokeLinecap="round" />
    <path d="M8 24H40" stroke={colors.darkCyra} strokeWidth="3" strokeLinecap="round" />
    <rect x="6" y="6" width="36" height="36" rx="8" stroke={colors.darkCyra} strokeWidth="2.5" fill="none" />
  </svg>
);

const BehaviourIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="16" r="8" stroke={colors.viridianGreen} strokeWidth="2.5" fill="none" />
    <path d="M10 42C10 34 16 28 24 28C32 28 38 34 38 42" stroke={colors.viridianGreen} strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const FinanceIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6V42" stroke={colors.caribbeanGreen} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 14C32 10.7 28.4 8 24 8C19.6 8 16 10.7 16 14C16 17.3 19.6 20 24 20C28.4 20 32 22.7 32 26C32 29.3 28.4 32 24 32C19.6 32 16 29.3 16 26" stroke={colors.caribbeanGreen} strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const panels = [
  {
    icon: HealthIcon,
    label: "Health Records",
    description: "Medical history, test results, conditions",
    color: colors.darkCyra,
  },
  {
    icon: BehaviourIcon,
    label: "Behaviour Data",
    description: "Lifestyle, habits, risk patterns",
    color: colors.viridianGreen,
  },
  {
    icon: FinanceIcon,
    label: "Financial Data",
    description: "Income, assets, credit history",
    color: colors.caribbeanGreen,
  },
];

export const Scene2Insurance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Problem text
  const problemProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const problemOpacity = interpolate(problemProgress, [0, 1], [0, 1]);
  const problemY = interpolate(problemProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle grid background */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.04 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 60}
            x2={1920}
            y2={i * 60}
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 60}
            y1={0}
            x2={i * 60}
            y2={1080}
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Life Insurance{" "}
          <span style={{ color: colors.darkCyra }}>Underwriting</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 28,
            color: colors.rhythm,
            marginTop: 14,
          }}
        >
          Predicting mortality risk — accurately and fast
        </div>
      </div>

      {/* Data panels */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {panels.map((panel, i) => {
          const panelProgress = spring({
            frame,
            fps,
            delay: 2 * fps + i * 12,
            config: { damping: 12, stiffness: 80 },
          });
          const panelOpacity = interpolate(panelProgress, [0, 1], [0, 1]);
          const panelX = interpolate(panelProgress, [0, 1], [60, 0]);
          const IconComponent = panel.icon;

          return (
            <div
              key={`panel-${i}`}
              style={{
                opacity: panelOpacity,
                transform: `translateX(${panelX}px)`,
                width: 380,
                background: colors.white,
                borderRadius: 16,
                padding: "36px 32px",
                boxShadow: `0 8px 40px ${colors.gunmetal}12`,
                border: `2px solid ${panel.color}25`,
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <IconComponent />
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.gunmetal,
                  marginBottom: 8,
                }}
              >
                {panel.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: colors.rhythm,
                  lineHeight: 1.5,
                }}
              >
                {panel.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Problem statement */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: problemOpacity,
          transform: `translateY(${problemY}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: 48,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {["Slow.", "Expensive.", "Inconsistent."].map((word, i) => (
            <span
              key={`word-${i}`}
              style={{ color: colors.oldRose }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
