import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const appColors = [
  colors.tiffanyBlue,
  colors.turkishRose,
  colors.caribbeanGreen,
  colors.corn,
  colors.darkCyra,
  colors.maximumRedPurple,
  colors.metallicBlue,
  colors.viridianGreen,
];

export const Scene1MultipleApps: React.FC = () => {
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
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          7-8 Apps
          <br />
          <span style={{ color: colors.turkishRose }}>At Once</span>
        </div>

        {/* App grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
            maxWidth: 500,
          }}
        >
          {appColors.map((color, i) => {
            const entrance = spring({
              frame,
              fps,
              delay: 20 + i * 10,
              config: { damping: 14, stiffness: 80 },
            });
            const scale = interpolate(entrance, [0, 1], [0, 1]);
            const float = Math.sin(frame * 0.04 + i * 1.2) * 5;

            return (
              <div
                key={i}
                style={{
                  transform: `scale(${scale}) translateY(${float}px)`,
                }}
              >
                <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
                  {/* Window frame */}
                  <rect
                    x="2"
                    y="2"
                    width="96"
                    height="76"
                    rx="8"
                    fill={`${color}10`}
                    stroke={color}
                    strokeWidth={1.5}
                  />
                  {/* Title bar */}
                  <rect x="2" y="2" width="96" height="18" rx="8" fill={`${color}20`} />
                  <rect x="2" y="12" width="96" height="8" fill={`${color}20`} />
                  {/* Window dots */}
                  <circle cx="14" cy="11" r="3" fill={color} opacity={0.6} />
                  <circle cx="24" cy="11" r="3" fill={color} opacity={0.4} />
                  <circle cx="34" cy="11" r="3" fill={color} opacity={0.3} />
                  {/* Content lines */}
                  <rect x="12" y="28" width="60" height="4" rx="2" fill={color} opacity={0.3} />
                  <rect x="12" y="38" width="45" height="4" rx="2" fill={color} opacity={0.2} />
                  <rect x="12" y="48" width="70" height="4" rx="2" fill={color} opacity={0.15} />
                  <rect x="12" y="58" width="35" height="4" rx="2" fill={color} opacity={0.1} />
                </svg>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
