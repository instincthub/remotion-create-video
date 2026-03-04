import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated brain with gear icon
const BrainGear: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const gearRotation = frame * 0.8;
  const pulse = Math.sin(frame * 0.08) * 0.04 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale * pulse})`,
      }}
    >
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
        {/* Brain outline */}
        <path
          d="M140 40 Q100 40 80 70 Q60 55 50 80 Q30 85 30 110 Q25 130 40 150
             Q35 170 50 185 Q50 210 75 220 Q85 245 115 245 Q130 255 140 250
             Q150 255 165 245 Q195 245 205 220 Q230 210 230 185 Q245 170 240 150
             Q255 130 250 110 Q250 85 230 80 Q220 55 200 70 Q180 40 140 40Z"
          fill={`${colors.tiffanyBlue}12`}
          stroke={colors.tiffanyBlue}
          strokeWidth={2.5}
        />
        {/* Brain center line */}
        <path
          d="M140 60 Q140 140 140 240"
          stroke={`${colors.tiffanyBlue}30`}
          strokeWidth={1.5}
          strokeDasharray="6 4"
        />
        {/* Brain folds left */}
        <path
          d="M130 90 Q100 100 85 120 Q75 140 80 160"
          stroke={`${colors.tiffanyBlue}40`}
          strokeWidth={1.5}
          fill="none"
        />
        {/* Brain folds right */}
        <path
          d="M150 90 Q180 100 195 120 Q205 140 200 160"
          stroke={`${colors.tiffanyBlue}40`}
          strokeWidth={1.5}
          fill="none"
        />

        {/* Gear in center */}
        <g transform={`translate(140, 145) rotate(${gearRotation})`}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * 22;
            const y = Math.sin(angle) * 22;
            return (
              <rect
                key={i}
                x={x - 5}
                y={y - 5}
                width={10}
                height={10}
                rx={2}
                fill={colors.caribbeanGreen}
                transform={`rotate(${(angle * 180) / Math.PI}, ${x}, ${y})`}
              />
            );
          })}
          <circle r={15} fill={colors.gunmetal} stroke={colors.caribbeanGreen} strokeWidth={2} />
          <circle r={5} fill={colors.caribbeanGreen} />
        </g>

        {/* Decorative orbiting dots */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2 + frame * 0.02;
          const cx = 140 + Math.cos(angle) * 130;
          const cy = 145 + Math.sin(angle) * 130;
          const dotOpacity = Math.sin(frame * 0.1 + i * 1.5) * 0.3 + 0.5;
          return (
            <circle
              key={i}
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

// Animated question mark
const QuestionMark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 14, stiffness: 80 },
  });
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const float = Math.sin(frame * 0.06) * 8;

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        right: 100,
        transform: `scale(${scale}) translateY(${float}px)`,
        fontSize: 120,
        fontWeight: 700,
        color: `${colors.corn}80`,
        fontFamily,
      }}
    >
      ?
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  const subProgress = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [25, 0]);

  const bgPulse = Math.sin(frame * 0.03) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
        transform: `scale(${bgPulse})`,
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
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              left: i * 90,
              width: 1,
              height: "100%",
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <QuestionMark />

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
          gap: 24,
        }}
      >
        <BrainGear />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
            letterSpacing: 3,
          }}
        >
          WHEN
          <br />
          <span style={{ fontSize: 42, color: colors.chineseSilver }}>
            to use
          </span>
          <br />
          <span style={{ color: colors.tiffanyBlue }}>MACHINE LEARNING</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            lineHeight: 1.5,
          }}
        >
          The Right Moment to Apply ML
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
