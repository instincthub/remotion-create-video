import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1DeepCodeIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  // Magnifying glass movement
  const magX = interpolate(frame, [0, 300, 600], [120, 200, 160], {
    extrapolateRight: "clamp",
  });
  const magY = interpolate(frame, [0, 300, 600], [60, 100, 80], {
    extrapolateRight: "clamp",
  });
  const magScale = interpolate(frame, [200, 400], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });

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
          gap: 30,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          Deep Code
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Mode</span>
        </div>

        {/* Code lines with magnifying glass */}
        <div style={{ position: "relative", width: 400, height: 260 }}>
          <svg width="400" height="260" viewBox="0 0 400 260" fill="none">
            {/* Code editor frame */}
            <rect x="20" y="10" width="360" height="240" rx="10" fill={`${colors.darkSlateGray}`} stroke={`${colors.tiffanyBlue}30`} strokeWidth={1.5} />
            {/* Title bar */}
            <rect x="20" y="10" width="360" height="28" rx="10" fill={`${colors.tiffanyBlue}08`} />
            <rect x="20" y="28" width="360" height="10" fill={`${colors.tiffanyBlue}08`} />
            <circle cx="38" cy="24" r="5" fill={colors.oldRose} opacity={0.5} />
            <circle cx="54" cy="24" r="5" fill={colors.corn} opacity={0.5} />
            <circle cx="70" cy="24" r="5" fill={colors.limeGreen} opacity={0.5} />

            {/* Code lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const widths = [180, 140, 220, 100, 160, 200, 120, 180];
              const indents = [0, 20, 20, 40, 40, 20, 0, 20];
              const lineColors = [colors.tiffanyBlue, colors.turkishRose, colors.tiffanyBlue, colors.corn, colors.caribbeanGreen, colors.tiffanyBlue, colors.turkishRose, colors.chineseSilver];
              return (
                <rect
                  key={i}
                  x={45 + indents[i]}
                  y={50 + i * 24}
                  width={widths[i]}
                  height={8}
                  rx={4}
                  fill={lineColors[i]}
                  opacity={0.25}
                />
              );
            })}

            {/* Magnifying glass */}
            <g style={{ transform: `translate(${magX}px, ${magY}px) scale(${magScale})` }}>
              <circle cx="0" cy="0" r="35" fill="none" stroke={colors.tiffanyBlue} strokeWidth={2.5} opacity={0.8} />
              <circle cx="0" cy="0" r="33" fill={`${colors.tiffanyBlue}06`} />
              <line x1="24" y1="24" x2="45" y2="45" stroke={colors.tiffanyBlue} strokeWidth={3} strokeLinecap="round" opacity={0.8} />
            </g>
          </svg>
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
          Dive into what you build
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
