import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface RegulationDoc {
  title: string;
  subtitle: string;
  lines: number; // decorative text lines
  delay: number; // seconds
  offsetX: number; // horizontal offset for stacking
}

const regulations: RegulationDoc[] = [
  {
    title: "Banking Regulations",
    subtitle: "Basel III / Dodd-Frank / Fair Lending",
    lines: 6,
    delay: 3,
    offsetX: -40,
  },
  {
    title: "Healthcare Privacy",
    subtitle: "HIPAA / Patient Consent / PHI Rules",
    lines: 5,
    delay: 6,
    offsetX: 0,
  },
  {
    title: "Data Protection",
    subtitle: "GDPR / CCPA / Data Sovereignty",
    lines: 7,
    delay: 9,
    offsetX: 40,
  },
];

// Background document texture/watermark
const BackgroundDocTexture: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Faint document outlines in background */}
        {Array.from({ length: 6 }, (_, i) => {
          const x = 100 + i * 300;
          const y = 80 + (i % 3) * 280;
          const rot = -5 + (i % 4) * 3;
          return (
            <g key={`bg-doc-${i}`} transform={`translate(${x}, ${y}) rotate(${rot})`}>
              <rect
                width="220"
                height="280"
                rx="4"
                fill="none"
                stroke={colors.darkSlateGray}
                strokeWidth="1"
              />
              {Array.from({ length: 8 }, (_, j) => (
                <rect
                  key={j}
                  x="20"
                  y={40 + j * 28}
                  width={140 + (j % 3) * 20}
                  height="4"
                  rx="2"
                  fill={colors.darkSlateGray}
                  opacity={0.3}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// A single document rectangle component
const DocumentCard: React.FC<{
  doc: RegulationDoc;
  index: number;
  stackIndex: number;
}> = ({ doc, index, stackIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({
    frame,
    fps,
    delay: doc.delay * fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Slide in from right and stack
  const slideX = interpolate(cardProgress, [0, 1], [600, doc.offsetX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideY = interpolate(cardProgress, [0, 1], [-100, stackIndex * -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardRotation = interpolate(cardProgress, [0, 1], [8, stackIndex * -1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Document line colors
  const accentColors = [colors.darkCyra, colors.viridianGreen, colors.tiffanyBlue];
  const accentColor = accentColors[index % accentColors.length];

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateX(${slideX}px) translateY(${slideY}px) rotate(${cardRotation}deg)`,
        width: 480,
        background: colors.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: `0 8px 32px ${colors.gunmetal}25, 0 2px 8px ${colors.gunmetal}15`,
        position: "absolute",
      }}
    >
      {/* Document header bar */}
      <div
        style={{
          background: accentColor,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Document icon */}
        <svg width="22" height="22" viewBox="0 0 22 22">
          <rect x="3" y="1" width="16" height="20" rx="2" fill="none" stroke={colors.white} strokeWidth="1.5" />
          <line x1="7" y1="6" x2="15" y2="6" stroke={colors.white} strokeWidth="1" />
          <line x1="7" y1="10" x2="15" y2="10" stroke={colors.white} strokeWidth="1" />
          <line x1="7" y1="14" x2="12" y2="14" stroke={colors.white} strokeWidth="1" />
        </svg>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
          }}
        >
          {doc.title}
        </div>
      </div>

      {/* Document subtitle */}
      <div
        style={{
          padding: "12px 24px 8px",
          fontSize: 13,
          color: colors.rhythm,
          fontFamily,
          fontWeight: 700,
        }}
      >
        {doc.subtitle}
      </div>

      {/* Decorative text lines */}
      <div style={{ padding: "4px 24px 20px" }}>
        {Array.from({ length: doc.lines }, (_, j) => {
          const lineWidth = 70 + ((j * 17 + index * 13) % 30);
          return (
            <div
              key={j}
              style={{
                height: 6,
                width: `${lineWidth}%`,
                background: `${colors.chineseSilver}50`,
                borderRadius: 3,
                marginBottom: 10,
              }}
            />
          );
        })}
      </div>

      {/* Stamp/seal decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 20,
          width: 48,
          height: 48,
          borderRadius: 24,
          border: `2px solid ${accentColor}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <polyline
            points="4,10 8,14 16,6"
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const Scene5Regulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Count of stacked documents (for z-index ordering)
  const stackedCount = regulations.reduce((count, doc) => {
    const appeared = frame >= doc.delay * fps ? 1 : 0;
    return count + appeared;
  }, 0);

  // Bottom text
  const bottomDelay = 13 * fps;
  const bottomProgress = spring({
    frame,
    fps,
    delay: bottomDelay,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "risky" word emphasis
  const riskyProgress = spring({
    frame,
    fps,
    delay: 15 * fps,
    config: { damping: 8, stiffness: 100 },
  });
  const riskyScale = interpolate(riskyProgress, [0, 1], [1.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Warning icon pulse
  const warningPulse = interpolate(
    frame,
    [15 * fps, 15 * fps + 10, 15 * fps + 20, 15 * fps + 30],
    [0, 1, 0.7, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      <BackgroundDocTexture />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.gunmetal,
            textAlign: "center",
          }}
        >
          Regulation and{" "}
          <span style={{ color: colors.darkCyra }}>Auditability</span>
        </div>
      </div>

      {/* Document stack area */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 560,
            height: 400,
          }}
        >
          {regulations.map((doc, i) => (
            <div
              key={doc.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                zIndex: i + 1,
              }}
            >
              <DocumentCard doc={doc} index={i} stackIndex={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Side decoration: small regulation badges */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 100,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 1,
        }}
      >
        {["SOX", "PCI", "AML", "KYC"].map((badge, i) => {
          const badgeProgress = spring({
            frame,
            fps,
            delay: (4 + i * 2) * fps,
            config: { damping: 14, stiffness: 100 },
          });
          const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const badgeX = interpolate(badgeProgress, [0, 1], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={badge}
              style={{
                opacity: badgeOpacity,
                transform: `translateX(${badgeX}px)`,
                padding: "6px 16px",
                borderRadius: 8,
                background: `${colors.darkCyra}15`,
                border: `1px solid ${colors.darkCyra}30`,
                fontSize: 14,
                fontWeight: 700,
                color: colors.darkCyra,
                fontFamily,
              }}
            >
              {badge}
            </div>
          );
        })}
      </div>

      {/* Right side decoration: more badges */}
      <div
        style={{
          position: "absolute",
          top: 260,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "flex-end",
          zIndex: 1,
        }}
      >
        {["FCRA", "ECOA", "GLBA"].map((badge, i) => {
          const badgeProgress = spring({
            frame,
            fps,
            delay: (5 + i * 2.5) * fps,
            config: { damping: 14, stiffness: 100 },
          });
          const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const badgeX = interpolate(badgeProgress, [0, 1], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={badge}
              style={{
                opacity: badgeOpacity,
                transform: `translateX(${badgeX}px)`,
                padding: "6px 16px",
                borderRadius: 8,
                background: `${colors.viridianGreen}15`,
                border: `1px solid ${colors.viridianGreen}30`,
                fontSize: 14,
                fontWeight: 700,
                color: colors.viridianGreen,
                fontFamily,
              }}
            >
              {badge}
            </div>
          );
        })}
      </div>

      {/* Bottom warning text */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 36,
            color: colors.gunmetal,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {/* Warning icon */}
          <div style={{ opacity: warningPulse }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <polygon
                points="18,4 34,32 2,32"
                fill="none"
                stroke={colors.oldRose}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <line
                x1="18"
                y1="14"
                x2="18"
                y2="22"
                stroke={colors.oldRose}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="18" cy="27" r="1.5" fill={colors.oldRose} />
            </svg>
          </div>

          <span>
            Black box models are{" "}
            <span
              style={{
                color: colors.oldRose,
                transform: `scale(${riskyScale})`,
                display: "inline-block",
                transformOrigin: "center bottom",
                marginLeft: 4,
              }}
            >
              risky
            </span>
            .
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
