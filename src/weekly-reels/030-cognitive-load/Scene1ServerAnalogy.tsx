import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1ServerAnalogy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Traffic meter progression
  const meterValue = interpolate(frame, [60, 400], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const meterColor =
    meterValue < 40 ? colors.limeGreen : meterValue < 70 ? colors.corn : colors.oldRose;

  // Crash animation
  const isCrashing = meterValue > 90;
  const crashShake = isCrashing ? Math.sin(frame * 0.8) * 4 : 0;

  // Server lights
  const light1 = Math.sin(frame * 0.2) > 0;
  const light2 = Math.sin(frame * 0.15 + 1) > 0;
  const light3 = isCrashing ? Math.sin(frame * 0.5) > 0 : true;

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
          transform: `translateX(${crashShake}px)`,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Cognitive
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Load</span>
        </div>

        {/* Server rack */}
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          {/* Rack frame */}
          <rect x="30" y="10" width="140" height="220" rx="8" fill={`${colors.darkSlateGray}`} stroke={colors.chineseSilver} strokeWidth={2} opacity={0.6} />

          {/* Server units */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x="40"
                y={25 + i * 50}
                width="120"
                height="38"
                rx="4"
                fill={`${colors.metallicBlue}20`}
                stroke={colors.metallicBlue}
                strokeWidth={1.5}
              />
              {/* Status lights */}
              <circle
                cx="55"
                cy={44 + i * 50}
                r="4"
                fill={i === 0 ? (light1 ? colors.limeGreen : `${colors.limeGreen}30`) : colors.limeGreen}
                opacity={isCrashing && i > 1 ? 0.3 : 0.8}
              />
              <circle
                cx="68"
                cy={44 + i * 50}
                r="4"
                fill={i === 1 ? (light2 ? colors.corn : `${colors.corn}30`) : colors.tiffanyBlue}
                opacity={isCrashing && i > 2 ? 0.3 : 0.6}
              />
              <circle
                cx="81"
                cy={44 + i * 50}
                r="4"
                fill={isCrashing ? (light3 ? colors.oldRose : `${colors.oldRose}30`) : colors.tiffanyBlue}
                opacity={0.5}
              />
              {/* Lines */}
              <rect x="100" y={38 + i * 50} width="50" height="3" rx="1.5" fill={colors.chineseSilver} opacity={0.2} />
              <rect x="100" y={46 + i * 50} width="35" height="3" rx="1.5" fill={colors.chineseSilver} opacity={0.15} />
            </g>
          ))}
        </svg>

        {/* Traffic meter */}
        <div style={{ width: "100%", maxWidth: 500 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 18, color: colors.chineseSilver }}>Traffic Load</span>
            <span style={{ fontSize: 18, color: meterColor, fontWeight: 700 }}>
              {Math.round(meterValue)}%
            </span>
          </div>
          <div
            style={{
              height: 28,
              borderRadius: 14,
              backgroundColor: `${meterColor}15`,
              border: `1px solid ${meterColor}30`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${meterValue}%`,
                height: "100%",
                borderRadius: 14,
                backgroundColor: meterColor,
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(
              spring({ frame, fps, delay: 30, config: { damping: 200 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Just like a server under pressure
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
