import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Blueprint / clipboard icon
const BlueprintIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const float = Math.sin(frame * 0.05) * 6;

  return (
    <div style={{ opacity, transform: `scale(${scale}) translateY(${float}px)` }}>
      <svg width="240" height="280" viewBox="0 0 240 280" fill="none">
        {/* Clipboard body */}
        <rect
          x="30"
          y="40"
          width="180"
          height="220"
          rx="14"
          fill={`${colors.darkSlateGray}`}
          stroke={colors.tiffanyBlue}
          strokeWidth={2.5}
        />
        {/* Clipboard clip */}
        <rect
          x="85"
          y="25"
          width="70"
          height="30"
          rx="8"
          fill={colors.gunmetal}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
        />
        <circle cx="120" cy="40" r="5" fill={colors.tiffanyBlue} />

        {/* Blueprint lines */}
        <rect x="55" y="80" width="130" height="4" rx="2" fill={`${colors.tiffanyBlue}30`} />
        <rect x="55" y="100" width="100" height="4" rx="2" fill={`${colors.tiffanyBlue}20`} />
        <rect x="55" y="120" width="115" height="4" rx="2" fill={`${colors.tiffanyBlue}20`} />

        {/* Thinking dots */}
        {[0, 1, 2].map((i) => {
          const dotOpacity = Math.sin(frame * 0.15 + i * 1.2) * 0.3 + 0.5;
          return (
            <circle
              key={i}
              cx={85 + i * 25}
              cy={170}
              r={8}
              fill={colors.tiffanyBlue}
              opacity={dotOpacity}
            />
          );
        })}

        {/* ML label */}
        <text
          x="120"
          y="220"
          fontSize="24"
          fontWeight="700"
          fill={colors.tiffanyBlue}
          textAnchor="middle"
          fontFamily="monospace"
        >
          ML Project
        </text>

        {/* Decorative dots */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2 + frame * 0.02;
          const cx = 120 + Math.cos(angle) * 110;
          const cy = 150 + Math.sin(angle) * 130;
          const dotOpacity = Math.sin(frame * 0.08 + i * 1.5) * 0.3 + 0.4;
          return (
            <circle
              key={`d-${i}`}
              cx={cx}
              cy={cy}
              r={3}
              fill={colors.tiffanyBlue}
              opacity={dotOpacity}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const Scene2ProjectPlanning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const subProgress = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

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
          gap: 20,
        }}
      >
        <BlueprintIcon />

        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          Let's Build
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Something Real</span>
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            lineHeight: 1.5,
          }}
        >
          But first... some considerations
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
