import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";
import { AIPlaybookLogo } from "./Logo";

// Floating orbs for ambient motion
const ORBS = [
  { x: 180, y: 200, r: 280, color: colors.darkCyra, speed: 0.008 },
  { x: 1600, y: 650, r: 320, color: colors.tiffanyBlue, speed: 0.006 },
  { x: 900, y: 100, r: 200, color: colors.caribbeanGreen, speed: 0.01 },
  { x: 1400, y: 180, r: 180, color: colors.darkCyra, speed: 0.007 },
  { x: 300, y: 700, r: 240, color: colors.viridianGreen, speed: 0.009 },
];

// Thin accent lines for geometric detail
const ACCENT_LINES = [
  { x1: 0, y1: 280, x2: 320, y2: 280, delay: 40 },
  { x1: 1600, y1: 180, x2: 1920, y2: 180, delay: 60 },
  { x1: 0, y1: 720, x2: 260, y2: 720, delay: 80 },
  { x1: 1660, y1: 640, x2: 1920, y2: 640, delay: 100 },
];

export const Scene11BrandSignoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient reveal
  const bgReveal = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo entrance — deliberate, confident
  const logoProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 20, stiffness: 80 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);

  // Horizontal rule under logo
  const ruleWidth = interpolate(frame, [80, 140], [0, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const taglineProgress = spring({
    frame,
    fps,
    delay: 140,
    config: { damping: 200 },
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [24, 0]);

  // "The AI Playbook" label above logo
  const labelProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const labelY = interpolate(labelProgress, [0, 1], [-20, 0]);

  // Footer
  const footerProgress = spring({
    frame,
    fps,
    delay: 260,
    config: { damping: 200 },
  });

  // Subscribe CTA
  const ctaProgress = spring({
    frame,
    fps,
    delay: 320,
    config: { damping: 15, stiffness: 100 },
  });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
      }}
    >
      {/* Ambient gradient orbs */}
      {ORBS.map((orb, i) => {
        const drift = Math.sin(frame * orb.speed + i * 1.5) * 20;
        const driftY = Math.cos(frame * orb.speed * 0.7 + i) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orb.x - orb.r + drift,
              top: orb.y - orb.r + driftY,
              width: orb.r * 2,
              height: orb.r * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}12 0%, transparent 70%)`,
              opacity: bgReveal,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Geometric accent lines */}
      {ACCENT_LINES.map((line, i) => {
        const lineProgress = spring({
          frame,
          fps,
          delay: line.delay,
          config: { damping: 200 },
        });
        const lineWidth = interpolate(
          lineProgress,
          [0, 1],
          [0, Math.abs(line.x2 - line.x1)]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: line.x1,
              top: line.y1,
              width: lineWidth,
              height: 1.5,
              backgroundColor: `${colors.darkCyra}18`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Subtle top-right corner mark */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 40,
          height: 40,
          borderTop: `2px solid ${colors.darkCyra}25`,
          borderRight: `2px solid ${colors.darkCyra}25`,
          opacity: bgReveal,
        }}
      />
      {/* Bottom-left corner mark */}
      <div
        style={{
          position: "absolute",
          bottom: 260,
          left: 60,
          width: 40,
          height: 40,
          borderBottom: `2px solid ${colors.darkCyra}25`,
          borderLeft: `2px solid ${colors.darkCyra}25`,
          opacity: bgReveal,
        }}
      />

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 200,
        }}
      >
        {/* Small label above logo */}
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 18,
            color: colors.darkCyra,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 40,
            opacity: labelProgress,
            transform: `translateY(${labelY}px)`,
          }}
        >
          The AI Playbook
        </div>

        {/* Logo — large and prominent */}
        <div
          style={{
            opacity: logoProgress,
            transform: `scale(${logoScale})`,
          }}
        >
          <AIPlaybookLogo scale={1.5} />
        </div>

        {/* Horizontal accent rule */}
        <div
          style={{
            width: ruleWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.darkCyra}, transparent)`,
            marginTop: 44,
            opacity: 0.4,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 38,
            color: colors.brandCharcoal,
            marginTop: 36,
            transform: `translateY(${taglineY}px)`,
            opacity: taglineProgress,
            textAlign: "center",
            letterSpacing: -0.5,
          }}
        >
          Practical AI education for the global workforce.
        </div>

        {/* Subscribe pill button */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: colors.darkCyra,
            paddingLeft: 36,
            paddingRight: 36,
            paddingTop: 16,
            paddingBottom: 16,
            borderRadius: 50,
            opacity: ctaProgress,
            transform: `scale(${ctaScale})`,
          }}
        >
          {/* Play icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon points="4,2 18,10 4,18" fill={colors.white} />
          </svg>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 20,
              color: colors.white,
              letterSpacing: 1,
            }}
          >
            Subscribe
          </div>
        </div>

        {/* Footer URL */}
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 18,
            color: colors.rhythm,
            marginTop: 28,
            opacity: interpolate(footerProgress, [0, 1], [0, 0.6]),
            textAlign: "center",
          }}
        >
          instincthub.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
