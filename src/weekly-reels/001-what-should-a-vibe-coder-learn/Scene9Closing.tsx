import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Builder silhouette with foundation blocks
const BuilderIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 2 * fps, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Blocks building up
  const blocks = [
    { x: 80, y: 220, w: 100, delay: 3 * fps, label: "HTML" },
    { x: 190, y: 220, w: 100, delay: 3.5 * fps, label: "CSS" },
    { x: 120, y: 185, w: 110, delay: 4 * fps, label: "JS" },
    { x: 150, y: 150, w: 90, delay: 4.5 * fps, label: "API" },
    { x: 165, y: 118, w: 70, delay: 5 * fps, label: "DB" },
  ];

  return (
    <div style={{ opacity, position: "relative" }}>
      <svg width="380" height="280" viewBox="0 0 380 280" fill="none">
        {/* Ground line */}
        <line x1="40" y1="255" x2="340" y2="255" stroke={colors.tiffanyBlue} strokeWidth={2} opacity={0.3} />

        {/* Person silhouette standing on top */}
        <g opacity={interpolate(entrance, [0, 1], [0, 0.9])}>
          {/* Head */}
          <circle cx="200" cy="68" r="16" fill={colors.caribbeanGreen} />
          {/* Body */}
          <line x1="200" y1="84" x2="200" y2="115" stroke={colors.caribbeanGreen} strokeWidth={4} strokeLinecap="round" />
          {/* Arms raised (victory pose) */}
          <path d="M200 92 L175 72" stroke={colors.caribbeanGreen} strokeWidth={3.5} strokeLinecap="round" />
          <path d="M200 92 L225 72" stroke={colors.caribbeanGreen} strokeWidth={3.5} strokeLinecap="round" />
          {/* Legs */}
          <path d="M200 115 L185 140" stroke={colors.caribbeanGreen} strokeWidth={3.5} strokeLinecap="round" />
          <path d="M200 115 L215 140" stroke={colors.caribbeanGreen} strokeWidth={3.5} strokeLinecap="round" />

          {/* Star sparkles near hands */}
          {[
            { x: 168, y: 62 },
            { x: 232, y: 62 },
          ].map((star, i) => {
            const sparkle = Math.sin(frame * 0.15 + i * 2) * 0.5 + 0.5;
            return (
              <g key={i} opacity={sparkle}>
                <line x1={star.x - 5} y1={star.y} x2={star.x + 5} y2={star.y} stroke={colors.tiffanyBlue} strokeWidth={1.5} />
                <line x1={star.x} y1={star.y - 5} x2={star.x} y2={star.y + 5} stroke={colors.tiffanyBlue} strokeWidth={1.5} />
              </g>
            );
          })}
        </g>

        {/* Foundation blocks */}
        {blocks.map((block, i) => {
          const blockProgress = spring({
            frame,
            fps,
            delay: block.delay,
            config: { damping: 200 },
          });
          const blockOpacity = interpolate(blockProgress, [0, 1], [0, 1]);
          const blockY = interpolate(blockProgress, [0, 1], [30, 0]);

          return (
            <g key={i} opacity={blockOpacity} transform={`translate(0, ${blockY})`}>
              <rect
                x={block.x}
                y={block.y}
                width={block.w}
                height={30}
                rx={6}
                fill={`${colors.tiffanyBlue}20`}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
              />
              <text
                x={block.x + block.w / 2}
                y={block.y + 20}
                textAnchor="middle"
                fill={colors.tiffanyBlue}
                fontSize="13"
                fontWeight="bold"
                fontFamily="Inter, sans-serif"
              >
                {block.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Upward particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = [
    { x: 100, startY: 1600, speed: 1.8, size: 4, opacity: 0.35 },
    { x: 250, startY: 1700, speed: 2.2, size: 3, opacity: 0.25 },
    { x: 400, startY: 1550, speed: 1.5, size: 5, opacity: 0.4 },
    { x: 550, startY: 1650, speed: 2.0, size: 3, opacity: 0.3 },
    { x: 700, startY: 1750, speed: 1.7, size: 4, opacity: 0.35 },
    { x: 850, startY: 1580, speed: 2.3, size: 3, opacity: 0.25 },
    { x: 950, startY: 1670, speed: 1.6, size: 5, opacity: 0.3 },
    { x: 180, startY: 1800, speed: 1.9, size: 4, opacity: 0.2 },
    { x: 480, startY: 1720, speed: 1.4, size: 5, opacity: 0.25 },
    { x: 650, startY: 1780, speed: 2.4, size: 3, opacity: 0.2 },
  ];

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = p.startY - frame * p.speed;
        const fadeIn = interpolate(frame, [0, 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const sway = Math.sin((frame * 0.03 + i * 2) * 1.5) * 12;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + sway,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: colors.caribbeanGreen,
              opacity: p.opacity * fadeIn,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene9Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1
  const line1Progress = spring({ frame, fps, delay: fps, config: { damping: 200 } });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  // Line 2
  const line2Progress = spring({ frame, fps, delay: 3 * fps, config: { damping: 200 } });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Tagline
  const tagDelay = 8 * fps;
  const tagProgress = spring({ frame, fps, delay: tagDelay, config: { damping: 200 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);

  // Logo
  const logoDelay = 11 * fps;
  const logoProgress = spring({ frame, fps, delay: logoDelay, config: { damping: 200 } });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Ring
  const ringProgress = spring({ frame, fps, delay: logoDelay + 10, config: { damping: 12, stiffness: 100 } });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 1]);
  const ringOpacity = interpolate(ringProgress, [0, 1], [0, 0.6]);

  // Light sweep
  const sweepY = interpolate(frame, [0, fps * 15], [-400, 2400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkCyra, fontFamily }}>
      {/* Particles */}
      <Particles />

      {/* Sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: sweepY,
          width: "100%",
          height: 250,
          background: `linear-gradient(180deg, transparent, ${colors.tiffanyBlue}15, transparent)`,
          transform: "skewY(-5deg)",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 10,
        }}
      >
        {/* Main statement */}
        <div
          style={{
            textAlign: "center",
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          <div style={{ fontSize: 38, fontWeight: 400, color: colors.white, lineHeight: 1.5 }}>
            AI is your amplifier.
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 700, color: colors.white, lineHeight: 1.4 }}>
            Fundamentals are
            <br />
            your <span style={{ color: colors.caribbeanGreen }}>foundation</span>.
          </div>
        </div>

        {/* Builder illustration */}
        <BuilderIllustration />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: colors.tiffanyBlue,
            opacity: tagOpacity,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Control is what turns a trend
          <br />
          into a career.
        </div>

        {/* Logo */}
        <div
          style={{
            marginTop: 20,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: 60,
              border: `3px solid ${colors.tiffanyBlue}`,
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.deepGreenCyanTurquoise,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: colors.white,
              letterSpacing: 1,
            }}
          >
            InstinctHub
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
