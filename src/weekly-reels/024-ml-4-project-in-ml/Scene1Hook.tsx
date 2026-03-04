import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Megaphone icon for "noise"
const MegaphoneIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Sound waves pulse
  const wave1 = Math.sin(frame * 0.12) * 0.3 + 0.5;
  const wave2 = Math.sin(frame * 0.12 + 1) * 0.3 + 0.5;
  const wave3 = Math.sin(frame * 0.12 + 2) * 0.3 + 0.5;

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
        {/* Megaphone body */}
        <path
          d="M30 70 L70 55 L70 125 L30 110 Z"
          fill={`${colors.oldRose}25`}
          stroke={colors.oldRose}
          strokeWidth={2.5}
        />
        <path
          d="M70 55 L130 25 L130 155 L70 125 Z"
          fill={`${colors.oldRose}15`}
          stroke={colors.oldRose}
          strokeWidth={2}
        />
        {/* Handle */}
        <rect x="15" y="75" width="15" height="30" rx="4" fill={`${colors.oldRose}30`} stroke={colors.oldRose} strokeWidth={1.5} />

        {/* Sound waves */}
        <path d="M140 60 Q160 90 140 120" stroke={colors.oldRose} strokeWidth={2} fill="none" opacity={wave1} />
        <path d="M155 45 Q180 90 155 135" stroke={colors.oldRose} strokeWidth={2} fill="none" opacity={wave2} />
        <path d="M170 30 Q200 90 170 150" stroke={colors.oldRose} strokeWidth={2} fill="none" opacity={wave3} />

        {/* Red X over it */}
        <line x1="20" y1="20" x2="180" y2="160" stroke={colors.oldRose} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
      </svg>
    </div>
  );
};

// Wrench + Gear icon for "building"
const BuildIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 25, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const gearRotation = frame * 0.6;
  const pulse = Math.sin(frame * 0.06) * 0.04 + 1;

  return (
    <div style={{ opacity, transform: `scale(${scale * pulse})` }}>
      <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
        {/* Gear */}
        <g transform={`translate(100, 90) rotate(${gearRotation})`}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 40;
            const y = Math.sin(angle) * 40;
            return (
              <rect
                key={i}
                x={x - 8}
                y={y - 8}
                width={16}
                height={16}
                rx={3}
                fill={colors.caribbeanGreen}
                transform={`rotate(${(angle * 180) / Math.PI}, ${x}, ${y})`}
              />
            );
          })}
          <circle r={28} fill={colors.gunmetal} stroke={colors.caribbeanGreen} strokeWidth={2.5} />
          <circle r={10} fill={colors.caribbeanGreen} />
        </g>

        {/* Wrench */}
        <path
          d="M45 130 L80 95 Q90 85 85 75 Q80 65 90 60 L95 55
             Q105 50 110 60 Q115 70 105 80 L100 85 Q95 95 100 100 L135 135"
          stroke={colors.tiffanyBlue}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          opacity={0.7}
        />

        {/* Checkmark */}
        <path
          d="M150 60 L165 75 L190 45"
          stroke={colors.limeGreen}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  const subProgress = spring({
    frame,
    fps,
    delay: 35,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

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

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 16,
        }}
      >
        {/* Icons side by side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <MegaphoneIcon />
          {/* VS divider */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: colors.rhythm,
              opacity: subOpacity,
            }}
          >
            vs
          </div>
          <BuildIcon />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
            marginTop: 20,
          }}
        >
          Stop Talking
          <br />
          <span style={{ color: colors.caribbeanGreen }}>Start Building</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            lineHeight: 1.5,
          }}
        >
          ML without practice is just noise
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
