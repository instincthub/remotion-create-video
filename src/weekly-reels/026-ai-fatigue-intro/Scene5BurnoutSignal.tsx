import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene5BurnoutSignal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Battery drain animation
  const batteryLevel = interpolate(frame, [0, 300, 600, 900], [100, 65, 30, 5], {
    extrapolateRight: "clamp",
  });

  const batteryColor =
    batteryLevel > 60
      ? colors.limeGreen
      : batteryLevel > 25
        ? colors.corn
        : colors.oldRose;

  const criticalBlink =
    batteryLevel < 15 ? (Math.sin(frame * 0.3) > 0 ? 1 : 0.3) : 1;

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Warning signs
  const warnings = [
    { icon: "lightning", text: "Constant context switching", delay: 200 },
    { icon: "refresh", text: "Prompting in circles", delay: 350 },
    { icon: "tired", text: "Mental exhaustion after short sessions", delay: 500 },
  ];

  // Stay tuned
  const stayTunedProgress = spring({
    frame,
    fps,
    delay: 900,
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
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            lineHeight: 1.2,
          }}
        >
          When Does
          <br />
          <span style={{ color: colors.oldRose }}>Burnout Hit?</span>
        </div>

        {/* Battery icon */}
        <div style={{ opacity: criticalBlink }}>
          <svg width="180" height="100" viewBox="0 0 180 100" fill="none">
            {/* Battery body */}
            <rect
              x="10"
              y="15"
              width="140"
              height="70"
              rx="10"
              fill="none"
              stroke={batteryColor}
              strokeWidth={3}
            />
            {/* Battery cap */}
            <rect
              x="150"
              y="32"
              width="16"
              height="36"
              rx="4"
              fill={batteryColor}
              opacity={0.5}
            />
            {/* Battery fill */}
            <rect
              x="18"
              y="23"
              width={interpolate(batteryLevel, [0, 100], [0, 124])}
              height={54}
              rx={6}
              fill={batteryColor}
              opacity={0.7}
            />
            {/* Percentage text */}
            <text
              x="80"
              y="58"
              textAnchor="middle"
              fill={batteryLevel > 50 ? colors.gunmetal : batteryColor}
              fontSize="24"
              fontWeight="700"
              fontFamily={fontFamily}
            >
              {Math.round(batteryLevel)}%
            </text>
          </svg>
        </div>

        {/* Warning signs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            maxWidth: 650,
          }}
        >
          {warnings.map((warning, i) => {
            const warnEntrance = spring({
              frame: Math.max(0, frame - warning.delay),
              fps,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={warning.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 20px",
                  borderRadius: 12,
                  backgroundColor: `${colors.oldRose}08`,
                  border: `1px solid ${colors.oldRose}25`,
                  opacity: interpolate(warnEntrance, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(warnEntrance, [0, 1], [20, 0])}px)`,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  {warning.icon === "lightning" && (
                    <path
                      d="M18 4 L10 16 L16 16 L14 28 L22 16 L16 16 Z"
                      stroke={colors.corn}
                      strokeWidth={2}
                      fill={`${colors.corn}20`}
                      strokeLinejoin="round"
                    />
                  )}
                  {warning.icon === "refresh" && (
                    <>
                      <path
                        d="M6 16 A10 10 0 0 1 26 16"
                        stroke={colors.oldRose}
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M26 16 A10 10 0 0 1 6 16"
                        stroke={colors.oldRose}
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path d="M24 10 L26 16 L20 16" stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {warning.icon === "tired" && (
                    <>
                      <circle cx="16" cy="16" r="12" stroke={colors.turkishRose} strokeWidth={2} fill={`${colors.turkishRose}10`} />
                      <line x1="11" y1="12" x2="14" y2="14" stroke={colors.turkishRose} strokeWidth={2} strokeLinecap="round" />
                      <line x1="21" y1="12" x2="18" y2="14" stroke={colors.turkishRose} strokeWidth={2} strokeLinecap="round" />
                      <path d="M11 22 Q16 18 21 22" stroke={colors.turkishRose} strokeWidth={2} fill="none" strokeLinecap="round" />
                    </>
                  )}
                </svg>
                <span
                  style={{
                    fontSize: 22,
                    color: colors.chineseSilver,
                    fontWeight: 400,
                  }}
                >
                  {warning.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stay tuned */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            textAlign: "center",
            opacity: interpolate(stayTunedProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(stayTunedProgress, [0, 1], [0.8, 1])})`,
          }}
        >
          Stay tuned...
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
