import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface PanelData {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
  delay: number;
}

const PanelCard: React.FC<{ panel: PanelData; index: number }> = ({
  panel,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame,
    fps,
    delay: panel.delay * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const slideX = interpolate(slideProgress, [0, 1], [100, 0]);
  const panelOpacity = interpolate(slideProgress, [0, 1], [0, 1]);

  // Subtle float
  const floatY = interpolate(
    Math.sin(frame * 0.03 + index * 1.5),
    [-1, 1],
    [-4, 4]
  );

  return (
    <div
      style={{
        opacity: panelOpacity,
        transform: `translateX(${slideX}px) translateY(${floatY}px)`,
        width: 340,
        background: colors.white,
        borderRadius: 16,
        padding: "32px 28px",
        boxShadow: `0 8px 40px ${colors.gunmetal}15`,
        border: `1px solid ${panel.color}25`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${panel.color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {panel.icon}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: colors.gunmetal,
          textAlign: "center",
        }}
      >
        {panel.label}
      </div>
      <div
        style={{
          fontSize: 16,
          color: colors.rhythm,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {panel.sublabel}
      </div>
      {/* Status indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 4,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            background: colors.caribbeanGreen,
          }}
        />
        <span style={{ fontSize: 13, color: colors.caribbeanGreen, fontWeight: 700 }}>
          DEPLOYED
        </span>
      </div>
    </div>
  );
};

export const Scene2RealApplications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Decorative underline
  const lineWidth = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panels: PanelData[] = [
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36">
          <rect x="4" y="8" width="28" height="22" rx="3" fill="none" stroke={colors.darkCyra} strokeWidth="2.5" />
          <line x1="4" y1="14" x2="32" y2="14" stroke={colors.darkCyra} strokeWidth="2" />
          <rect x="8" y="18" width="8" height="4" rx="1" fill={colors.darkCyra} opacity={0.5} />
          <rect x="20" y="18" width="8" height="4" rx="1" fill={colors.darkCyra} opacity={0.5} />
          <rect x="8" y="24" width="20" height="3" rx="1" fill={colors.darkCyra} opacity={0.3} />
        </svg>
      ),
      label: "Banking",
      sublabel: "Fraud detection & loan approval",
      color: colors.darkCyra,
      delay: 2,
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path d="M18 4 L18 14 L28 14" fill="none" stroke={colors.viridianGreen} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="18" cy="18" r="14" fill="none" stroke={colors.viridianGreen} strokeWidth="2.5" />
          <path d="M10 22 L14 18 L18 24 L22 16 L26 20" fill="none" stroke={colors.viridianGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Healthcare",
      sublabel: "Patient risk scoring & diagnosis support",
      color: colors.viridianGreen,
      delay: 3.5,
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36">
          <rect x="6" y="16" width="10" height="16" rx="2" fill="none" stroke={colors.chineseBlue} strokeWidth="2.5" />
          <rect x="20" y="10" width="10" height="22" rx="2" fill="none" stroke={colors.chineseBlue} strokeWidth="2.5" />
          <path d="M11 8 L11 16" stroke={colors.chineseBlue} strokeWidth="2" strokeLinecap="round" />
          <path d="M25 4 L25 10" stroke={colors.chineseBlue} strokeWidth="2" strokeLinecap="round" />
          <circle cx="11" cy="6" r="2" fill={colors.chineseBlue} />
          <circle cx="25" cy="3" r="2" fill={colors.chineseBlue} />
        </svg>
      ),
      label: "Manufacturing",
      sublabel: "Predictive maintenance & quality control",
      color: colors.chineseBlue,
      delay: 5,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Subtle dot pattern */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.04 }}
      >
        {Array.from({ length: 24 }).map((_, xi) =>
          Array.from({ length: 14 }).map((_, yi) => (
            <circle
              key={`dot-${xi}-${yi}`}
              cx={40 + xi * 80}
              cy={40 + yi * 80}
              r={2}
              fill={colors.darkSlateGray}
            />
          ))
        )}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.gunmetal,
            textAlign: "center",
          }}
        >
          <span style={{ color: colors.darkCyra }}>Real</span>. Deployed. Used.
        </div>
        <div
          style={{
            width: lineWidth,
            height: 4,
            background: colors.darkCyra,
            borderRadius: 2,
            marginTop: 12,
          }}
        />
        <div
          style={{
            opacity: subOpacity,
            fontSize: 24,
            color: colors.rhythm,
            marginTop: 16,
          }}
        >
          Working AI systems inside real enterprises
        </div>
      </div>

      {/* Enterprise panels */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          paddingBottom: 200,
          zIndex: 2,
        }}
      >
        {panels.map((panel, i) => (
          <PanelCard key={`panel-${i}`} panel={panel} index={i} />
        ))}
      </div>

      {/* IAAI conference reference */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: interpolate(frame, [8 * fps, 9.5 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontSize: 18,
            color: colors.rhythm,
            background: `${colors.darkCyra}10`,
            padding: "10px 24px",
            borderRadius: 8,
            border: `1px solid ${colors.darkCyra}20`,
          }}
        >
          Source: IAAI Conference — Innovative Applications of AI
        </div>
      </div>
    </AbsoluteFill>
  );
};
