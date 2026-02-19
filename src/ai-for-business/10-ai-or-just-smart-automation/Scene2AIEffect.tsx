import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Floating product icons that pop in with "AI" labels that fade out
const FloatingDevices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const devices = [
    { label: "Vacuum", x: 260, y: 320, icon: "vacuum" },
    { label: "Fridge", x: 560, y: 240, icon: "fridge" },
    { label: "Phone", x: 860, y: 350, icon: "phone" },
    { label: "Toothbrush", x: 1160, y: 260, icon: "brush" },
    { label: "Speaker", x: 1460, y: 340, icon: "speaker" },
  ];

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {devices.map((device, i) => {
          const enterProgress = spring({
            frame,
            fps,
            delay: fps + i * 15,
            config: { damping: 12, stiffness: 100 },
          });
          const scale = interpolate(enterProgress, [0, 1], [0, 1]);
          const opacity = interpolate(enterProgress, [0, 1], [0, 1]);

          // "AI" label fades out after appearing
          const labelFadeStart = 8 * fps + i * 10;
          const labelOpacity = interpolate(
            frame,
            [labelFadeStart, labelFadeStart + 30],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Gentle float
          const floatY = Math.sin((frame - i * 10) * 0.04) * 6;

          // Device icon shapes
          const iconPaths: Record<string, React.ReactNode> = {
            vacuum: (
              <>
                <circle cx={0} cy={0} r={30} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
                <circle cx={0} cy={0} r={12} fill={colors.darkCyra} opacity={0.3} />
                <line x1={0} y1={30} x2={0} y2={55} stroke={colors.darkCyra} strokeWidth={3} />
              </>
            ),
            fridge: (
              <>
                <rect x={-22} y={-40} width={44} height={80} rx={4} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
                <line x1={-22} y1={-5} x2={22} y2={-5} stroke={colors.darkCyra} strokeWidth={1.5} />
                <line x1={15} y1={-28} x2={15} y2={-12} stroke={colors.darkCyra} strokeWidth={2} />
                <line x1={15} y1={8} x2={15} y2={28} stroke={colors.darkCyra} strokeWidth={2} />
              </>
            ),
            phone: (
              <>
                <rect x={-18} y={-32} width={36} height={64} rx={6} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
                <circle cx={0} cy={24} r={3} fill={colors.darkCyra} />
                <line x1={-6} y1={-24} x2={6} y2={-24} stroke={colors.darkCyra} strokeWidth={1.5} />
              </>
            ),
            brush: (
              <>
                <rect x={-8} y={-35} width={16} height={50} rx={8} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
                <rect x={-6} y={15} width={12} height={25} rx={2} fill="none" stroke={colors.darkCyra} strokeWidth={1.5} />
              </>
            ),
            speaker: (
              <>
                <circle cx={0} cy={0} r={28} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
                <circle cx={0} cy={0} r={10} fill={colors.darkCyra} opacity={0.3} />
                <circle cx={0} cy={-18} r={3} fill={colors.darkCyra} />
              </>
            ),
          };

          return (
            <g
              key={`device-${i}`}
              transform={`translate(${device.x}, ${device.y + floatY}) scale(${scale})`}
              opacity={opacity}
            >
              {/* Device icon */}
              {iconPaths[device.icon]}

              {/* Device label */}
              <text
                y={65}
                textAnchor="middle"
                fontSize={18}
                fill={colors.rhythm}
                fontFamily="Inter, sans-serif"
              >
                {device.label}
              </text>

              {/* AI badge that fades out */}
              <g opacity={labelOpacity}>
                <rect
                  x={20}
                  y={-55}
                  width={44}
                  height={24}
                  rx={12}
                  fill={colors.tiffanyBlue}
                />
                <text
                  x={42}
                  y={-38}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight="bold"
                  fill={colors.white}
                  fontFamily="Inter, sans-serif"
                >
                  AI
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene2AIEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headScale = interpolate(headProgress, [0, 1], [0.8, 1]);

  // Subheading appears later
  const subProgress = spring({
    frame,
    fps,
    delay: 12 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <FloatingDevices />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 280,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: headOpacity,
            transform: `scale(${headScale})`,
            fontSize: 52,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1100,
          }}
        >
          Not everything labeled{" "}
          <span style={{ color: colors.darkCyra }}>AI</span> is intelligent.
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 36,
            color: colors.tiffanyBlue,
            fontWeight: "bold",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Welcome to the AI effect.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
