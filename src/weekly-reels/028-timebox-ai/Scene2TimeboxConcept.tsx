import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2TimeboxConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Clock hands rotation
  const minuteHand = frame * 2;

  const leftEntrance = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 14, stiffness: 80 },
  });

  const rightEntrance = spring({
    frame,
    fps,
    delay: 40,
    config: { damping: 14, stiffness: 80 },
  });

  // Dividing line pulse
  const linePulse = Math.sin(frame * 0.06) * 0.2 + 0.8;

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
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Timebox
          <br />
          <span style={{ color: colors.tiffanyBlue }}>AI Programming</span>
        </div>

        {/* Clock */}
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <circle cx="70" cy="70" r="60" fill={`${colors.tiffanyBlue}08`} stroke={colors.tiffanyBlue} strokeWidth={2.5} />
          {/* Hour marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x1 = 70 + Math.cos(angle) * 50;
            const y1 = 70 + Math.sin(angle) * 50;
            const x2 = 70 + Math.cos(angle) * 55;
            const y2 = 70 + Math.sin(angle) * 55;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
          {/* Minute hand */}
          <g style={{ transform: `rotate(${minuteHand}deg)`, transformOrigin: "70px 70px" }}>
            <line x1="70" y1="70" x2="70" y2="25" stroke={colors.tiffanyBlue} strokeWidth={2.5} strokeLinecap="round" />
          </g>
          {/* Hour hand */}
          <g style={{ transform: `rotate(${minuteHand / 12}deg)`, transformOrigin: "70px 70px" }}>
            <line x1="70" y1="70" x2="70" y2="38" stroke={colors.white} strokeWidth={3} strokeLinecap="round" />
          </g>
          {/* Center dot */}
          <circle cx="70" cy="70" r="4" fill={colors.tiffanyBlue} />
        </svg>

        {/* Two sides */}
        <div
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
            maxWidth: 600,
            alignItems: "center",
          }}
        >
          {/* AI side */}
          <div
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              backgroundColor: `${colors.tiffanyBlue}08`,
              border: `1px solid ${colors.tiffanyBlue}25`,
              textAlign: "center",
              opacity: interpolate(leftEntrance, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(leftEntrance, [0, 1], [-30, 0])}px)`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 8px" }}>
              <rect x="8" y="8" width="32" height="32" rx="8" stroke={colors.tiffanyBlue} strokeWidth={2} fill={`${colors.tiffanyBlue}10`} />
              <circle cx="18" cy="22" r="3" fill={colors.tiffanyBlue} />
              <circle cx="30" cy="22" r="3" fill={colors.tiffanyBlue} />
              <path d="M18 32 Q24 36 30 32" stroke={colors.tiffanyBlue} strokeWidth={2} fill="none" strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 18, color: colors.tiffanyBlue, fontWeight: 700 }}>AI does the work</div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 2,
              height: 80,
              backgroundColor: colors.chineseSilver,
              opacity: linePulse,
              borderRadius: 1,
            }}
          />

          {/* Human side */}
          <div
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              backgroundColor: `${colors.turkishRose}08`,
              border: `1px solid ${colors.turkishRose}25`,
              textAlign: "center",
              opacity: interpolate(rightEntrance, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(rightEntrance, [0, 1], [30, 0])}px)`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 8px" }}>
              <circle cx="24" cy="16" r="8" stroke={colors.turkishRose} strokeWidth={2} fill={`${colors.turkishRose}10`} />
              <path d="M12 40 Q12 28 24 28 Q36 28 36 40" stroke={colors.turkishRose} strokeWidth={2} fill="none" strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 18, color: colors.turkishRose, fontWeight: 700 }}>You do the work</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
