import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Spam keyword badges
const SpamBadge: React.FC<{
  text: string;
  delay: number;
  x: number;
  y: number;
}> = ({ text, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 80 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const float = Math.sin(frame * 0.05 + delay * 0.5) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${scale}) translateY(${float}px)`,
        opacity,
        fontSize: 22,
        fontWeight: 700,
        color: colors.oldRose,
        backgroundColor: `${colors.oldRose}12`,
        border: `1.5px solid ${colors.oldRose}40`,
        borderRadius: 12,
        padding: "10px 20px",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

export const Scene5SpamPatterns: React.FC = () => {
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

  // Envelope with warning
  const envEntrance = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const envOpacity = interpolate(envEntrance, [0, 1], [0, 1]);
  const envScale = interpolate(envEntrance, [0, 1], [0.7, 1]);

  // Warning triangle pulse
  const warnPulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

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
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Detecting
          <br />
          <span style={{ color: colors.oldRose }}>Spam Keywords</span>
        </div>

        {/* Email with warning */}
        <div
          style={{
            opacity: envOpacity,
            transform: `scale(${envScale})`,
          }}
        >
          <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
            {/* Envelope */}
            <rect
              x="20"
              y="30"
              width="160"
              height="110"
              rx="10"
              fill={`${colors.darkSlateGray}`}
              stroke={`${colors.oldRose}60`}
              strokeWidth={1.5}
            />
            <path
              d="M20 30 L100 90 L180 30"
              fill="none"
              stroke={`${colors.oldRose}60`}
              strokeWidth={1.5}
            />
            {/* Warning triangle */}
            <g transform={`scale(${warnPulse})`} style={{ transformOrigin: "165px 25px" }}>
              <path
                d="M155 5 L175 40 L135 40 Z"
                fill={colors.oldRose}
                opacity={0.9}
              />
              <text
                x="155"
                y="35"
                textAnchor="middle"
                fill={colors.white}
                fontSize="22"
                fontWeight={700}
              >
                !
              </text>
            </g>
          </svg>
        </div>

        {/* Spam keyword badges */}
        <div style={{ position: "relative", width: 500, height: 300 }}>
          <SpamBadge text="Purchase Now!" delay={30} x={-100} y={-80} />
          <SpamBadge text="Subscribe Now" delay={45} x={80} y={-40} />
          <SpamBadge text="Click Here" delay={60} x={-60} y={20} />
          <SpamBadge text="Limited Offer" delay={75} x={100} y={70} />
          <SpamBadge text="Act Fast!" delay={90} x={-30} y={110} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
