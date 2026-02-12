import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const CHECKLIST_ITEMS = [
  {
    text: "Is our data production ready?",
    icon: "database",
    delay: 3,
  },
  {
    text: "Can we automate data cleaning?",
    icon: "gear",
    delay: 6,
  },
  {
    text: "Are we prepared for mistakes?",
    icon: "shield",
    delay: 9,
  },
  {
    text: "Testing for generalisation, not perfection?",
    icon: "chart",
    delay: 12,
  },
];

// Small SVG icons per card
const CardIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconColor = colors.caribbeanGreen;
  if (type === "database") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <ellipse cx={18} cy={10} rx={12} ry={5} fill="none" stroke={iconColor} strokeWidth={2.5} />
        <path d="M6 10 v8 c0 2.8 5.4 5 12 5 s12-2.2 12-5 v-8" fill="none" stroke={iconColor} strokeWidth={2.5} />
        <path d="M6 18 v8 c0 2.8 5.4 5 12 5 s12-2.2 12-5 v-8" fill="none" stroke={iconColor} strokeWidth={2.5} />
      </svg>
    );
  }
  if (type === "gear") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx={18} cy={18} r={6} fill="none" stroke={iconColor} strokeWidth={2.5} />
        <circle cx={18} cy={18} r={12} fill="none" stroke={iconColor} strokeWidth={2.5} strokeDasharray="6 5.5" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <path d="M18 4 L30 10 V20 C30 26 24 31 18 33 C12 31 6 26 6 20 V10 Z" fill="none" stroke={iconColor} strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M13 18 L16.5 21.5 L23 15" fill="none" stroke={iconColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // chart
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <polyline points="4,28 12,18 20,22 32,8" fill="none" stroke={iconColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={4} y1={32} x2={32} y2={32} stroke={iconColor} strokeWidth={2.5} />
    </svg>
  );
};

const ChecklistCard: React.FC<{ text: string; icon: string }> = ({
  text,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const enterOpacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const enterY = interpolate(enterProgress, [0, 1], [30, 0]);

  // Checkmark pop after card enters
  const checkProgress = spring({
    frame,
    fps,
    delay: 1.2 * fps,
    config: { damping: 10, stiffness: 180 },
  });
  const checkScale = interpolate(checkProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity: enterOpacity,
        transform: `translateY(${enterY}px)`,
        backgroundColor: `${colors.white}10`,
        border: `1px solid ${colors.white}18`,
        borderRadius: 16,
        padding: "28px 30px",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          backgroundColor: `${colors.caribbeanGreen}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CardIcon type={icon} />
      </div>

      {/* Text */}
      <div
        style={{
          fontSize: 26,
          color: colors.white,
          fontWeight: "bold",
          lineHeight: 1.3,
          flex: 1,
        }}
      >
        {text}
      </div>

      {/* Checkmark */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{
          transform: `scale(${checkScale})`,
          flexShrink: 0,
        }}
      >
        <circle cx={16} cy={16} r={14} fill={`${colors.caribbeanGreen}30`} stroke={colors.caribbeanGreen} strokeWidth={2} />
        <path
          d="M 9 16 L 14 21 L 23 11"
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Scene7BuildForReality: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title zoom in
  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 10, stiffness: 100 },
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.5, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Subtle background pulse
  const bgPulse = Math.sin(frame * 0.03) * 0.03 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCyra,
        fontFamily,
      }}
    >
      {/* Gradient overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${colors.deepGreenCyanTurquoise}40 100%)`,
          transform: `scale(${bgPulse})`,
        }}
      />

      {/* Dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.white}08 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 72,
          fontWeight: "bold",
          color: colors.white,
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
        }}
      >
        Build for{" "}
        <span style={{ color: colors.caribbeanGreen }}>reality</span>,
        not perfection.
      </div>

      {/* 2-column grid */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 140,
          right: 140,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
        }}
      >
        {CHECKLIST_ITEMS.map((item, i) => (
          <Sequence key={i} from={item.delay * fps} layout="none">
            <ChecklistCard text={item.text} icon={item.icon} />
          </Sequence>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.caribbeanGreen,
        }}
      />
    </AbsoluteFill>
  );
};
