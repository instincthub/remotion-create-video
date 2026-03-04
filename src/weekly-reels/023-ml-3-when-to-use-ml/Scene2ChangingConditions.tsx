import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated toggle switch
const ToggleSwitch: React.FC<{
  delay: number;
  label: string;
  index: number;
}> = ({ delay, label, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [60, 0]);

  // Toggle flips back and forth
  const toggleCycle = Math.sin(frame * 0.04 + index * 2.5);
  const isOn = toggleCycle > 0;
  const knobX = isOn ? 38 : 6;
  const trackColor = isOn ? colors.caribbeanGreen : `${colors.rhythm}60`;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        width: "100%",
        maxWidth: 600,
      }}
    >
      {/* Toggle track */}
      <svg width="70" height="36" viewBox="0 0 70 36" style={{ flexShrink: 0 }}>
        <rect
          x="0"
          y="0"
          width="70"
          height="36"
          rx="18"
          fill={trackColor}
          style={{ transition: "fill 0.3s" }}
        />
        <circle
          cx={knobX + 12}
          cy="18"
          r="12"
          fill={colors.white}
        />
      </svg>

      {/* Label */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 400,
          color: colors.chineseSilver,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene2ChangingConditions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Rotating arrows icon
  const arrowRotation = frame * 1.2;
  const iconEntrance = spring({ frame, fps, delay: 8, config: { damping: 200 } });
  const iconScale = interpolate(iconEntrance, [0, 1], [0.5, 1]);
  const iconOpacity = interpolate(iconEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Subtle grid */}
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
          paddingLeft: 60,
          paddingRight: 60,
          gap: 30,
        }}
      >
        {/* Cycling arrows icon */}
        <div
          style={{
            opacity: iconOpacity,
            transform: `scale(${iconScale})`,
          }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <g transform={`rotate(${arrowRotation}, 80, 80)`}>
              <path
                d="M80 20 A60 60 0 0 1 140 80"
                stroke={colors.tiffanyBlue}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              <polygon
                points="140,70 140,90 155,80"
                fill={colors.tiffanyBlue}
              />
              <path
                d="M80 140 A60 60 0 0 1 20 80"
                stroke={colors.caribbeanGreen}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              <polygon
                points="20,90 20,70 5,80"
                fill={colors.caribbeanGreen}
              />
            </g>
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Conditions
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Change Often</span>
        </div>

        {/* Toggles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <ToggleSwitch delay={20} label="User preferences" index={0} />
          <ToggleSwitch delay={30} label="Market trends" index={1} />
          <ToggleSwitch delay={40} label="Data patterns" index={2} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
