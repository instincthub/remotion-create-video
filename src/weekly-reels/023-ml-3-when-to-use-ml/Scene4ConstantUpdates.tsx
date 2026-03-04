import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Update item that appears with stagger
const UpdateItem: React.FC<{
  label: string;
  delay: number;
  index: number;
  icon: "refresh" | "edit" | "patch";
}> = ({ label, delay, index, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [-40, 0]);

  const pulse = Math.sin(frame * 0.06 + index * 2) * 0.06 + 1;

  const iconPaths: Record<string, string> = {
    refresh: "M20 6 A14 14 0 1 1 6 20 M20 6 L20 14 L12 6",
    edit: "M8 30 L8 32 L10 32 L28 14 L26 12 L8 30 M24 10 L30 16",
    patch: "M6 10 L6 30 L34 30 L34 10 L6 10 M6 18 L34 18 M20 10 L20 30",
  };

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px) scale(${pulse})`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: "100%",
        maxWidth: 600,
        padding: "14px 20px",
        borderRadius: 16,
        background: `${colors.corn}08`,
        border: `1px solid ${colors.corn}20`,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
        <path
          d={iconPaths[icon]}
          stroke={colors.corn}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div style={{ fontSize: 24, color: colors.chineseSilver, lineHeight: 1.3 }}>
        {label}
      </div>
    </div>
  );
};

export const Scene4ConstantUpdates: React.FC = () => {
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

  // "ML Shines" text at the end
  const shineDelay = 5 * fps;
  const shineProgress = spring({
    frame,
    fps,
    delay: shineDelay,
    config: { damping: 14, stiffness: 80 },
  });
  const shineOpacity = interpolate(shineProgress, [0, 1], [0, 1]);
  const shineScale = interpolate(shineProgress, [0, 1], [0.6, 1]);

  // Fade out updates to make room for shine text
  const updatesOpacity = interpolate(
    frame,
    [shineDelay - 15, shineDelay],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const glowPulse = Math.sin(frame * 0.08) * 0.1 + 0.9;

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

      {/* Updates section */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 18,
          opacity: updatesOpacity,
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
            marginBottom: 20,
          }}
        >
          Constant
          <br />
          <span style={{ color: colors.corn }}>Updates Needed</span>
        </div>

        <UpdateItem icon="refresh" label="Update conditions frequently" delay={15} index={0} />
        <UpdateItem icon="edit" label="Tweak rules to meet expectations" delay={30} index={1} />
        <UpdateItem icon="patch" label="Patch edge cases endlessly" delay={45} index={2} />
      </AbsoluteFill>

      {/* ML Shines section */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 20,
          opacity: shineOpacity,
        }}
      >
        {/* Glow circle */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.tiffanyBlue}20, transparent 70%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${shineScale * glowPulse})`,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Star/shine icon */}
            {[0, 1, 2, 3].map((i) => {
              const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const x1 = 60 + Math.cos(angle) * 15;
              const y1 = 60 + Math.sin(angle) * 15;
              const x2 = 60 + Math.cos(angle) * 45;
              const y2 = 60 + Math.sin(angle) * 45;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              );
            })}
            {/* Diagonal rays */}
            {[0, 1, 2, 3].map((i) => {
              const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
              const x1 = 60 + Math.cos(angle) * 18;
              const y1 = 60 + Math.sin(angle) * 18;
              const x2 = 60 + Math.cos(angle) * 32;
              const y2 = 60 + Math.sin(angle) * 32;
              return (
                <line
                  key={`d-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={0.5}
                />
              );
            })}
            <circle cx="60" cy="60" r="12" fill={colors.tiffanyBlue} opacity={0.9} />
          </svg>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            transform: `scale(${shineScale})`,
            lineHeight: 1.2,
          }}
        >
          This Is Where
          <br />
          <span style={{ color: colors.tiffanyBlue }}>ML Shines</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
