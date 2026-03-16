import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame, fps, config: { damping: 200 } });
  const line2 = spring({ frame: frame - Math.round(fps * 1.5), fps, config: { damping: 200 } });
  const line3 = spring({ frame: frame - Math.round(fps * 4), fps, config: { damping: 200 } });
  const tagline = spring({ frame: frame - Math.round(fps * 7), fps, config: { damping: 200 } });

  // Pulsing accent circle
  const pulse = 0.95 + Math.sin(frame * 0.06) * 0.05;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Background glow orb */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: "50%",
          transform: `translateX(-50%) scale(${pulse})`,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}20 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* AI circuit lines (decorative) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.08 }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={0} y1={160 + i * 120}
            x2={1080} y2={160 + i * 120}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={90 + i * 82} y1={80}
            x2={90 + i * 82} y2={1620}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(line1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1, [0, 1], [24, 0])}px)`,
            fontSize: 18,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 5,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          EPISODE 1 · AI WAKE-UP CALL
        </div>

        {/* Main hook line 1 */}
        <div
          style={{
            opacity: interpolate(line2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2, [0, 1], [32, 0])}px)`,
            fontSize: 68,
            fontWeight: 900,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Your child is sitting in a{" "}
          <span style={{ color: colors.tiffanyBlue }}>classroom</span> right now.
        </div>

        {/* Divider */}
        <div
          style={{
            opacity: interpolate(line3, [0, 1], [0, 1]),
            width: 60,
            height: 3,
            background: colors.oldRose,
            borderRadius: 2,
            margin: "28px auto",
          }}
        />

        {/* Main hook line 2 */}
        <div
          style={{
            opacity: interpolate(line3, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line3, [0, 1], [24, 0])}px)`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.25,
            marginBottom: 40,
          }}
        >
          And somewhere in the world, a company just{" "}
          <span style={{ color: colors.oldRose }}>replaced an entire team</span>{" "}
          with AI.
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(tagline, [0, 1], [0, 1]),
            transform: `scale(${interpolate(tagline, [0, 0.7, 1], [0.9, 1.03, 1])})`,
            background: `${colors.darkCyra}25`,
            border: `1px solid ${colors.darkCyra}60`,
            borderRadius: 12,
            padding: "20px 36px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.white, lineHeight: 1.4 }}>
            These two facts are{" "}
            <span style={{ color: colors.darkCyra }}>connected</span>.
          </div>
          <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 8 }}>
            And most parents have no idea.
          </div>
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}50`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
