import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated phone with UI that cracks and falls apart
const CrackingPhone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 8, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // UI elements start intact, then break
  const breakDelay = 4 * fps;
  const breakProgress = spring({
    frame,
    fps,
    delay: breakDelay,
    config: { damping: 200 },
  });

  // Elements scatter
  const scatter1 = interpolate(breakProgress, [0, 1], [0, -25]);
  const scatter2 = interpolate(breakProgress, [0, 1], [0, 18]);
  const scatter3 = interpolate(breakProgress, [0, 1], [0, -12]);
  const rotateScatter = interpolate(breakProgress, [0, 1], [0, -8]);
  const scatterOpacity = interpolate(breakProgress, [0, 1], [1, 0.4]);

  // Glitch flicker
  const glitchCycle = frame % 50;
  const isGlitching = glitchCycle < 2 && frame > breakDelay;

  // Pulsing error indicator
  const errorPulse =
    frame > breakDelay ? Math.sin((frame - breakDelay) * 0.15) * 0.3 + 0.7 : 0;

  return (
    <div style={{ opacity, position: "relative" }}>
      <svg width="320" height="480" viewBox="0 0 320 480" fill="none">
        {/* Phone body */}
        <rect
          x="60"
          y="20"
          width="200"
          height="420"
          rx="24"
          fill={colors.gunmetal}
          stroke={colors.darkSlateGray}
          strokeWidth={2}
        />
        {/* Screen */}
        <rect
          x="72"
          y="50"
          width="176"
          height="360"
          rx="8"
          fill={isGlitching ? `${colors.oldRose}30` : colors.white}
        />

        {/* Status bar */}
        <rect x="72" y="50" width="176" height="30" rx="8" fill={colors.magnolia} />
        <circle cx="92" cy="65" r="4" fill={colors.caribbeanGreen} />
        <rect x="180" y="62" width="30" height={6} rx={3} fill={colors.chineseSilver} />
        <rect x="215" y="62" width="20" height={6} rx={3} fill={colors.caribbeanGreen} />

        {/* Header bar */}
        <g
          transform={`translate(${scatter1}, ${scatter3}) rotate(${rotateScatter}, 160, 100)`}
          opacity={scatterOpacity}
        >
          <rect x="82" y="90" width="156" height="40" rx="8" fill={colors.darkCyra} />
          <rect x="96" y="103" width="80" height="6" rx="3" fill={`${colors.white}CC`} />
          <rect x="96" y="113" width="50" height="4" rx="2" fill={`${colors.white}66`} />
        </g>

        {/* Content card 1 */}
        <g
          transform={`translate(${scatter2}, ${scatter1})`}
          opacity={scatterOpacity}
        >
          <rect
            x="82"
            y="145"
            width="156"
            height="70"
            rx="10"
            fill={colors.magnolia}
            stroke={`${colors.chineseSilver}80`}
            strokeWidth={1}
          />
          <rect x="96" y="160" width="100" height="6" rx="3" fill={colors.darkSlateGray} />
          <rect x="96" y="172" width="70" height="5" rx="2.5" fill={colors.rhythm} />
          <rect x="96" y="183" width="85" height="5" rx="2.5" fill={colors.rhythm} />
          <rect x="96" y="194" width="55" height="5" rx="2.5" fill={colors.rhythm} />
        </g>

        {/* Button */}
        <g
          transform={`translate(${scatter3}, ${scatter2}) rotate(${-rotateScatter}, 160, 250)`}
          opacity={scatterOpacity}
        >
          <rect x="92" y="230" width="136" height="40" rx="20" fill={colors.darkCyra} />
          <rect x="130" y="246" width="60" height="6" rx="3" fill={`${colors.white}CC`} />
        </g>

        {/* Content card 2 */}
        <g
          transform={`translate(${-scatter1}, ${scatter3})`}
          opacity={scatterOpacity}
        >
          <rect
            x="82"
            y="285"
            width="156"
            height="55"
            rx="10"
            fill={colors.magnolia}
            stroke={`${colors.chineseSilver}80`}
            strokeWidth={1}
          />
          <circle cx="104" cy="312" r="14" fill={`${colors.tiffanyBlue}30`} stroke={colors.tiffanyBlue} strokeWidth={1.5} />
          <rect x="128" y="303" width="90" height="5" rx="2.5" fill={colors.darkSlateGray} />
          <rect x="128" y="314" width="65" height="4" rx="2" fill={colors.rhythm} />
        </g>

        {/* Bottom nav */}
        <g
          transform={`translate(0, ${scatter2 * 0.5})`}
          opacity={scatterOpacity}
        >
          <rect x="72" y="365" width="176" height="45" rx="0" fill={colors.magnolia} />
          {[100, 140, 180, 220].map((x, i) => (
            <circle key={i} cx={x} cy="387" r="8" fill={`${colors.chineseSilver}80`} />
          ))}
        </g>

        {/* Error overlay after break */}
        {breakProgress > 0.1 && (
          <g opacity={errorPulse}>
            {/* Red error circle */}
            <circle cx="160" cy="230" r="40" fill={colors.oldRose} opacity={0.9} />
            <path
              d="M145 215 L175 245 M175 215 L145 245"
              stroke={colors.white}
              strokeWidth={4}
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Notch */}
        <rect x="130" y="26" width="60" height="14" rx="7" fill={colors.darkSlateGray} />
      </svg>
    </div>
  );
};

export const Scene2Fragile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text
  const textProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [30, 0]);

  // Glitch on "fragile"
  const glitchCycle = frame % 60;
  const isGlitching = glitchCycle < 3 && frame > 3 * fps && frame < 15 * fps;
  const glitchX = isGlitching ? ((frame * 7) % 9) - 4 : 0;

  // Failure items
  const failures = [
    { text: "API failed", delay: 8 * fps, icon: "plug" },
    { text: "Auth broken", delay: 10 * fps, icon: "lock" },
    { text: "State chaos", delay: 12 * fps, icon: "zap" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Scan lines */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${colors.gunmetal}03 3px, ${colors.gunmetal}03 4px)`,
        }}
      />

      {/* Content */}
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
        {/* Text */}
        <div
          style={{
            textAlign: "center",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <div style={{ fontSize: 46, fontWeight: 700, color: colors.darkSlateGray, lineHeight: 1.4 }}>
            Speed without
          </div>
          <div style={{ fontSize: 46, fontWeight: 700, color: colors.darkSlateGray, lineHeight: 1.4 }}>
            understanding is
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: colors.oldRose,
              lineHeight: 1.4,
              transform: `translateX(${glitchX}px)`,
            }}
          >
            fragile.
          </div>
        </div>

        {/* Cracking phone */}
        <CrackingPhone />

        {/* Failure list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          {failures.map((f, i) => {
            const fProgress = spring({ frame, fps, delay: f.delay, config: { damping: 200 } });
            const fOpacity = interpolate(fProgress, [0, 1], [0, 1]);
            const fX = interpolate(fProgress, [0, 1], [-30, 0]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: fOpacity,
                  transform: `translateX(${fX}px)`,
                  padding: "8px 24px",
                  borderRadius: 12,
                  backgroundColor: `${colors.oldRose}10`,
                  border: `1.5px solid ${colors.oldRose}30`,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" fill={colors.oldRose} />
                  <path d="M7 7l6 6M13 7l-6 6" stroke={colors.white} strokeWidth={1.5} strokeLinecap="round" />
                </svg>
                <div style={{ fontSize: 26, color: colors.gunmetal, fontWeight: 700 }}>
                  {f.text}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
