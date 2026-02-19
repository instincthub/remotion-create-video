import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated data stream lines
const DataStreams: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const streams = Array.from({ length: 20 }, (_, i) => ({
    x: 80 + i * 96,
    speed: 0.8 + (i % 4) * 0.4,
    offset: i * 40,
    width: 1 + (i % 3) * 0.5,
  }));

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {streams.map((s, i) => {
          const y = ((frame * s.speed + s.offset) % 1200) - 60;
          return (
            <g key={`stream-${i}`}>
              <line
                x1={s.x}
                y1={y}
                x2={s.x}
                y2={y + 80}
                stroke={colors.darkCyra}
                strokeWidth={s.width}
                opacity={0.3}
              />
              <circle cx={s.x} cy={y} r={2} fill={colors.tiffanyBlue} opacity={0.5} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Company icon (abstract shapes) with label
const CompanyIcon: React.FC<{
  type: "search" | "cart" | "social" | "voice";
  label: string;
  delay: number;
  x: number;
  y: number;
}> = ({ type, label, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const scale = interpolate(enterProgress, [0, 1], [0, 1]);
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const floatY = Math.sin((frame - delay) * 0.025) * 4;

  const renderIcon = () => {
    switch (type) {
      case "search":
        return (
          <>
            <circle cx={0} cy={-2} r={14} fill="none" stroke={colors.darkCyra} strokeWidth={3} />
            <line x1={10} y1={10} x2={20} y2={20} stroke={colors.darkCyra} strokeWidth={3} strokeLinecap="round" />
          </>
        );
      case "cart":
        return (
          <>
            <path d="M -18 -12 L -12 -12 L -4 14 L 16 14" fill="none" stroke={colors.darkCyra} strokeWidth={3} strokeLinecap="round" />
            <circle cx={0} cy={22} r={4} fill={colors.darkCyra} />
            <circle cx={14} cy={22} r={4} fill={colors.darkCyra} />
            <path d="M -10 -4 L 18 -4 L 16 10 L -6 10 Z" fill="none" stroke={colors.darkCyra} strokeWidth={2} />
          </>
        );
      case "social":
        return (
          <>
            <circle cx={0} cy={-8} r={8} fill="none" stroke={colors.darkCyra} strokeWidth={2.5} />
            <circle cx={-18} cy={8} r={6} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
            <circle cx={18} cy={8} r={6} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
            <line x1={-6} y1={-2} x2={-13} y2={4} stroke={colors.darkCyra} strokeWidth={1.5} />
            <line x1={6} y1={-2} x2={13} y2={4} stroke={colors.darkCyra} strokeWidth={1.5} />
          </>
        );
      case "voice":
        return (
          <>
            <rect x={-6} y={-18} width={12} height={24} rx={6} fill="none" stroke={colors.darkCyra} strokeWidth={2.5} />
            <path d="M -14 0 C -14 14, 14 14, 14 0" fill="none" stroke={colors.darkCyra} strokeWidth={2.5} />
            <line x1={0} y1={14} x2={0} y2={22} stroke={colors.darkCyra} strokeWidth={2.5} />
            <line x1={-8} y1={22} x2={8} y2={22} stroke={colors.darkCyra} strokeWidth={2.5} strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <g transform={`translate(${x}, ${y + floatY}) scale(${scale})`} opacity={opacity}>
      <circle cx={0} cy={0} r={50} fill={colors.darkCyra} opacity={0.08} />
      <circle cx={0} cy={0} r={50} fill="none" stroke={colors.darkCyra} strokeWidth={1.5} opacity={0.3} />
      {renderIcon()}
      {/* Label directly under icon */}
      <text
        y={80}
        textAnchor="middle"
        fontSize={28}
        fontWeight="bold"
        fill={colors.rhythm}
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </g>
  );
};

export const Scene2WebDominance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headY = interpolate(headProgress, [0, 1], [30, 0]);

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  const icons: { type: "search" | "cart" | "social" | "voice"; label: string; x: number; y: number }[] = [
    { type: "search", label: "Search", x: 360, y: 480 },
    { type: "cart", label: "Shopping", x: 720, y: 480 },
    { type: "social", label: "Social", x: 1200, y: 480 },
    { type: "voice", label: "Voice", x: 1560, y: 480 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      <DataStreams />

      {/* Icons */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {icons.map((icon, i) => (
            <CompanyIcon
              key={`icon-${i}`}
              type={icon.type}
              label={icon.label}
              delay={2 * fps + i * 0.8 * fps}
              x={icon.x}
              y={icon.y}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Heading */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 120,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            fontSize: 56,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Web companies{" "}
          <span style={{ color: colors.darkCyra }}>dominate</span> AI
        </div>
      </AbsoluteFill>

      {/* Bottom text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 240,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 32,
            color: colors.rhythm,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          They control the platforms,{" "}
          <span style={{ color: colors.tiffanyBlue }}>the users</span>, and the
          data.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
