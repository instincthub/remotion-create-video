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

const KEY_PHRASES: Array<{
  text: string;
  delay: number;
  color: string;
  weight: number;
  size: number;
}> = [
  {
    text: "A practical AI education series.",
    delay: 510,
    color: colors.brandCharcoal,
    weight: 500,
    size: 36,
  },
  {
    text: "Learn by building. Not by watching.",
    delay: 600,
    color: colors.brandCharcoal,
    weight: 700,
    size: 44,
  },
  {
    text: "One concept. One tool. One workflow.",
    delay: 700,
    color: colors.darkCyra,
    weight: 700,
    size: 44,
  },
  {
    text: "Step by step. Today, not someday.",
    delay: 810,
    color: colors.brandCharcoal,
    weight: 500,
    size: 36,
  },
];

// Ambient floating orbs
const ORBS = [
  { x: 200, y: 180, r: 300, color: colors.darkCyra, speed: 0.007 },
  { x: 1500, y: 600, r: 350, color: colors.tiffanyBlue, speed: 0.005 },
  { x: 960, y: 80, r: 250, color: colors.caribbeanGreen, speed: 0.009 },
  { x: 1700, y: 150, r: 200, color: colors.viridianGreen, speed: 0.006 },
  { x: 100, y: 600, r: 280, color: colors.darkCyra, speed: 0.008 },
];

export const Scene05Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Phase 1: "So, I built..." build-up (0-150) ===
  const buildUpSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 30,
  });
  const buildUpOpacity = interpolate(
    frame,
    [0, 30, 120, 150],
    [0, 0, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const buildUpY = interpolate(buildUpSpring, [0, 1], [20, 0]);

  // === Phase 2: Logo reveal (150-480) ===
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
    delay: 150,
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.4, 1]);
  const logoOpacity = logoSpring;

  // Glow behind logo
  const glowOpacity = interpolate(frame, [150, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Horizontal accent rule below logo
  const ruleSpring = spring({
    frame,
    fps,
    delay: 220,
    config: { damping: 200 },
  });
  const ruleWidth = interpolate(ruleSpring, [0, 1], [0, 400]);

  // "THE AI PLAYBOOK" label above logo
  const labelSpring = spring({
    frame,
    fps,
    delay: 180,
    config: { damping: 200 },
  });

  // === Phase 3: Logo shifts up, key phrases appear (480+) ===
  const logoShiftY = interpolate(frame, [480, 530], [0, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoPhase3Scale = interpolate(frame, [480, 530], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rule fades in phase 3
  const ruleFade = interpolate(frame, [480, 530], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalLogoScale = frame < 150 ? 0 : logoScale * logoPhase3Scale;
  const finalLogoOpacity = frame < 150 ? 0 : logoOpacity;

  // Background orb fade-in
  const orbFade = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
      }}
    >
      {/* Ambient gradient orbs */}
      {ORBS.map((orb, i) => {
        const drift = Math.sin(frame * orb.speed + i * 1.5) * 25;
        const driftY = Math.cos(frame * orb.speed * 0.7 + i) * 18;
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
              background: `radial-gradient(circle, ${orb.color}10 0%, transparent 70%)`,
              opacity: orbFade,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Subtle diagonal texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 100px,
            rgba(0,131,143,0.015) 100px,
            rgba(0,131,143,0.015) 101px
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 50,
          width: 36,
          height: 36,
          borderTop: `2px solid ${colors.darkCyra}20`,
          borderRight: `2px solid ${colors.darkCyra}20`,
          opacity: orbFade,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 250,
          left: 50,
          width: 36,
          height: 36,
          borderBottom: `2px solid ${colors.darkCyra}20`,
          borderLeft: `2px solid ${colors.darkCyra}20`,
          opacity: orbFade,
        }}
      />

      {/* ===== Phase 1: Build-up text ===== */}
      {frame < 155 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 80,
              color: colors.brandCharcoal,
              opacity: buildUpOpacity,
              transform: `translateY(${buildUpY}px)`,
            }}
          >
            So, I built...
          </div>
        </div>
      )}

      {/* ===== Phase 2 & 3: Logo + phrases ===== */}
      {frame >= 150 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Radial glow behind logo */}
          <div
            style={{
              position: "absolute",
              width: 800,
              height: 500,
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${colors.darkCyra}0C 0%, transparent 70%)`,
              opacity: glowOpacity,
              transform: `translateY(${logoShiftY * 0.8}px)`,
              pointerEvents: "none",
            }}
          />

          {/* Small label above logo */}
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 16,
              color: colors.darkCyra,
              letterSpacing: 5,
              textTransform: "uppercase",
              marginBottom: 24,
              opacity: labelSpring * ruleFade,
              transform: `translateY(${logoShiftY}px)`,
            }}
          >
            Introducing
          </div>

          {/* Logo */}
          <div
            style={{
              transform: `translateY(${logoShiftY}px) scale(${finalLogoScale})`,
              opacity: finalLogoOpacity,
            }}
          >
            <AIPlaybookLogo scale={1.6} />
          </div>

          {/* Accent rule */}
          <div
            style={{
              width: ruleWidth,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${colors.darkCyra}, transparent)`,
              marginTop: 32,
              opacity: 0.35 * ruleFade,
              transform: `translateY(${logoShiftY}px)`,
            }}
          />

          {/* ===== Phase 3: Key phrases ===== */}
          {frame >= 480 && (
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              {KEY_PHRASES.map((phrase, i) => {
                const phraseSpring = spring({
                  frame,
                  fps,
                  config: { damping: 200 },
                  delay: phrase.delay,
                });
                const phraseY = interpolate(phraseSpring, [0, 1], [16, 0]);

                // Highlight emphasis line with a left accent bar
                const isHighlight = i === 1 || i === 2;

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      opacity: phraseSpring,
                      transform: `translateY(${phraseY}px)`,
                    }}
                  >
                    {isHighlight && (
                      <div
                        style={{
                          width: 4,
                          height: 36,
                          backgroundColor: colors.darkCyra,
                          borderRadius: 2,
                          opacity: 0.6,
                        }}
                      />
                    )}
                    <div
                      style={{
                        fontFamily:
                          phrase.weight >= 700 ? displayFont : bodyFont,
                        fontWeight: phrase.weight,
                        fontSize: phrase.size,
                        color: phrase.color,
                        textAlign: "center",
                      }}
                    >
                      {phrase.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
