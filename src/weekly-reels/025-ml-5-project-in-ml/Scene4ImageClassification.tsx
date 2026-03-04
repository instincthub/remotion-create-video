import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Object card being classified
const ObjectCard: React.FC<{
  icon: string;
  label: string;
  delay: number;
  index: number;
  color: string;
}> = ({ icon, label, delay, index, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 80 },
  });
  const scale = interpolate(entrance, [0, 1], [0, 1]);

  // Label appears after card
  const labelEntrance = spring({
    frame,
    fps,
    delay: delay + 15,
    config: { damping: 200 },
  });
  const labelOpacity = interpolate(labelEntrance, [0, 1], [0, 1]);
  const labelY = interpolate(labelEntrance, [0, 1], [10, 0]);

  const float = Math.sin(frame * 0.04 + index * 1.8) * 4;

  const iconPaths: Record<string, string> = {
    cat: "M12 22 Q12 16 8 14 L4 4 L8 10 L12 4 L16 10 L20 4 L16 14 Q12 16 12 22 M9 16 L9 16.01 M15 16 L15 16.01 M10 19 Q12 21 14 19",
    car: "M4 16 L6 10 L10 8 L18 8 L22 10 L24 16 M6 18 A2 2 0 1 0 6 18.01 M22 18 A2 2 0 1 0 22 18.01 M4 16 L24 16",
    tree: "M14 22 L14 16 M8 16 L14 6 L20 16 Z M6 20 L14 10 L22 20 Z",
    robot: "M8 10 L20 10 L20 22 L8 22 Z M11 14 L11 14.01 M17 14 L17 14.01 M12 18 L16 18 M14 6 L14 10 M12 4 L16 4 M6 14 L8 14 M20 14 L22 14 M10 22 L10 26 M18 22 L18 26",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        transform: `scale(${scale}) translateY(${float}px)`,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 22,
          background: `${color}10`,
          border: `2px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 28 28" fill="none">
          <path
            d={iconPaths[icon]}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Scanning beam animation
const ScanBeam: React.FC = () => {
  const frame = useCurrentFrame();

  const scanY = (frame * 2) % 300;
  const beamOpacity = 0.15;

  return (
    <div
      style={{
        position: "absolute",
        top: 350 + scanY,
        left: 100,
        width: 880,
        height: 3,
        background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}, transparent)`,
        opacity: beamOpacity,
        borderRadius: 2,
      }}
    />
  );
};

export const Scene4ImageClassification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge
  const badgeEntrance = spring({ frame, fps, delay: 5, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0, 1]);

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Camera icon
  const cameraEntrance = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const cameraOpacity = interpolate(cameraEntrance, [0, 1], [0, 1]);
  const cameraScale = interpolate(cameraEntrance, [0, 1], [0.5, 1]);

  // Robotics tag
  const tagDelay = 10 * fps;
  const tagProgress = spring({ frame, fps, delay: tagDelay, config: { damping: 200 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);
  const tagY = interpolate(tagProgress, [0, 1], [15, 0]);

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

      <ScanBeam />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 20,
        }}
      >
        {/* "#5" badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `${colors.chineseBlue}20`,
            border: `2px solid ${colors.chineseBlue}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.chineseBlue,
          }}
        >
          #5
        </div>

        {/* Camera / eye icon */}
        <div style={{ opacity: cameraOpacity, transform: `scale(${cameraScale})` }}>
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
            {/* Camera body */}
            <rect x="20" y="30" width="120" height="80" rx="12" fill={`${colors.tiffanyBlue}10`} stroke={colors.tiffanyBlue} strokeWidth={2} />
            {/* Lens */}
            <circle cx="80" cy="70" r="25" fill={`${colors.tiffanyBlue}08`} stroke={colors.tiffanyBlue} strokeWidth={2} />
            <circle cx="80" cy="70" r="15" fill={`${colors.tiffanyBlue}15`} stroke={colors.tiffanyBlue} strokeWidth={1} />
            <circle cx="80" cy="70" r={5} fill={colors.tiffanyBlue} opacity={0.5} />
            {/* Flash */}
            <rect x="55" y="20" width="30" height="15" rx="4" fill={`${colors.tiffanyBlue}15`} stroke={colors.tiffanyBlue} strokeWidth={1} />
            {/* Recording dot */}
            <circle cx="130" cy="42" r={4} fill={colors.oldRose} opacity={Math.sin(frame * 0.1) * 0.4 + 0.6} />
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
            lineHeight: 1.2,
          }}
        >
          Image
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Classification</span>
        </div>

        {/* Object grid */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <ObjectCard icon="cat" label="Cat" delay={3 * 30} index={0} color={colors.caribbeanGreen} />
          <ObjectCard icon="car" label="Car" delay={4.5 * 30} index={1} color={colors.tiffanyBlue} />
          <ObjectCard icon="tree" label="Tree" delay={6 * 30} index={2} color={colors.limeGreen} />
          <ObjectCard icon="robot" label="Robot" delay={7.5 * 30} index={3} color={colors.corn} />
        </div>

        {/* Robotics & Industrial tag */}
        <div
          style={{
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            display: "flex",
            gap: 10,
          }}
        >
          {["Robotics", "Industrial"].map((tag, i) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: 12,
                background: `${colors.chineseBlue}12`,
                border: `1px solid ${colors.chineseBlue}35`,
                fontSize: 16,
                fontWeight: 700,
                color: colors.chineseBlue,
                transform: `scale(${Math.sin(frame * 0.06 + i * 2) * 0.03 + 1})`,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
