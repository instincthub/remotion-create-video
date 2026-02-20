import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const DocumentIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 36,
}) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect x="6" y="3" width="24" height="30" rx="3" stroke={color} strokeWidth="2" />
    <path d="M11 11H25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 16H25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 21H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DatabaseIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 36,
}) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <ellipse cx="18" cy="9" rx="12" ry="5" stroke={color} strokeWidth="2" />
    <path d="M6 9V27C6 29.76 11.37 32 18 32C24.63 32 30 29.76 30 27V9" stroke={color} strokeWidth="2" />
    <path d="M6 18C6 20.76 11.37 23 18 23C24.63 23 30 20.76 30 18" stroke={color} strokeWidth="2" />
  </svg>
);

export const Scene4Data: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Unstructured panel
  const unstructuredProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 70 },
  });
  const unstructuredOpacity = interpolate(unstructuredProgress, [0, 1], [0, 1]);
  const unstructuredX = interpolate(unstructuredProgress, [0, 1], [-40, 0]);

  // Structured panel
  const structuredProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const structuredOpacity = interpolate(structuredProgress, [0, 1], [0, 1]);
  const structuredX = interpolate(structuredProgress, [0, 1], [40, 0]);

  // Central AI node
  const aiNodeProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const aiNodeOpacity = interpolate(aiNodeProgress, [0, 1], [0, 1]);
  const aiNodeScale = interpolate(aiNodeProgress, [0, 1], [0.6, 1]);

  // Flow lines
  const flowProgress = interpolate(frame, [4.5 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse on AI node
  const pulse = frame > 4 * fps
    ? interpolate(Math.sin((frame - 4 * fps) * 0.06), [-1, 1], [0.8, 1])
    : 0.8;

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const unstructuredItems = [
    { label: "Policies", sub: "Text documents" },
    { label: "Reports", sub: "Quarterly, annual" },
    { label: "Emails", sub: "Communication logs" },
  ];

  const structuredItems = [
    { label: "Relational DB", sub: "Customer records" },
    { label: "Transactions", sub: "Purchase history" },
    { label: "CRM Data", sub: "Tickets, contacts" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}10 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}10 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: colors.darkCyra,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            B
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Data
          </div>
          <div style={{ fontSize: 26, color: colors.rhythm }}>
            Unstructured + Structured
          </div>
        </div>
      </div>

      {/* Two columns + central node */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 60,
          right: 60,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Unstructured column */}
        <div
          style={{
            opacity: unstructuredOpacity,
            transform: `translateX(${unstructuredX}px)`,
            width: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <DocumentIcon color={colors.darkCyra} size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, color: colors.darkCyra }}>
              Unstructured
            </div>
          </div>
          {unstructuredItems.map((item, i) => {
            const itemProgress = spring({
              frame,
              fps,
              delay: 2 * fps + i * 12,
              config: { damping: 12, stiffness: 70 },
            });
            return (
              <div
                key={item.label}
                style={{
                  opacity: interpolate(itemProgress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                  background: colors.white,
                  border: `1px solid ${colors.chineseSilver}50`,
                  borderRadius: 14,
                  padding: "18px 24px",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.gunmetal }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 17, color: colors.rhythm, marginTop: 4 }}>
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Central AI node */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 60,
          }}
        >
          {/* Flow arrows */}
          <svg width="300" height="260" viewBox="0 0 300 260" style={{ position: "absolute" }}>
            {/* Left arrow */}
            <path
              d="M0 130 H120"
              stroke={colors.tiffanyBlue}
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset={300 - 300 * flowProgress}
              opacity={0.5}
            />
            {/* Right arrow */}
            <path
              d="M180 130 H300"
              stroke={colors.tiffanyBlue}
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset={300 - 300 * flowProgress}
              opacity={0.5}
            />
          </svg>

          <div
            style={{
              opacity: aiNodeOpacity,
              transform: `scale(${aiNodeScale * pulse})`,
              width: 140,
              height: 140,
              borderRadius: 70,
              background: `linear-gradient(135deg, ${colors.darkCyra}, ${colors.tiffanyBlue})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px ${colors.darkCyra}40`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 6C14 6 8 12 8 20C8 28 14 34 24 34C34 34 40 28 40 20C40 12 34 6 24 6Z"
                stroke={colors.white}
                strokeWidth="2.5"
              />
              <path d="M24 6V34" stroke={colors.white} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="18" cy="18" r="2.5" fill={colors.white} />
              <circle cx="30" cy="18" r="2.5" fill={colors.white} />
              <path d="M18 26C20 28 28 28 30 26" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.white, marginTop: 6 }}>
              AI Model
            </div>
          </div>
        </div>

        {/* Structured column */}
        <div
          style={{
            opacity: structuredOpacity,
            transform: `translateX(${structuredX}px)`,
            width: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <DatabaseIcon color={colors.caribbeanGreen} size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, color: colors.caribbeanGreen }}>
              Structured
            </div>
          </div>
          {structuredItems.map((item, i) => {
            const itemProgress = spring({
              frame,
              fps,
              delay: 2.5 * fps + i * 12,
              config: { damping: 12, stiffness: 70 },
            });
            return (
              <div
                key={item.label}
                style={{
                  opacity: interpolate(itemProgress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                  background: colors.white,
                  border: `1px solid ${colors.chineseSilver}50`,
                  borderRadius: 14,
                  padding: "18px 24px",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.gunmetal }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 17, color: colors.rhythm, marginTop: 4 }}>
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom note */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: colors.gunmetal }}>
          Your assistant is only as good as the{" "}
          <span style={{ color: colors.darkCyra }}>data you feed it.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
