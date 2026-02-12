import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const NAME_CARDS = [
  { name: "John McCarthy", role: "Coined \"Artificial Intelligence\"", delay: 60 },
  { name: "Marvin Minsky", role: "Pioneer of neural networks", delay: 105 },
  { name: "Claude Shannon", role: "Father of information theory", delay: 150 },
  { name: "Nathaniel Rochester", role: "IBM researcher", delay: 195 },
];

const NameCard: React.FC<{ name: string; role: string }> = ({ name, role }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const scale = interpolate(entrance, [0, 1], [0.6, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 131, 143, 0.12)",
        border: `2px solid ${colors.darkCyra}`,
        borderRadius: 16,
        padding: "16px 28px",
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div style={{ fontSize: 24, fontWeight: "bold", color: colors.white, fontFamily }}>
        {name}
      </div>
      <div style={{ fontSize: 14, color: colors.iceGray, fontFamily }}>
        {role}
      </div>
    </div>
  );
};

// Digital particle text effect for "Artificial Intelligence"
const ParticleText: React.FC<{ progress: number }> = ({ progress }) => {
  const text = "Artificial Intelligence";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Glow behind */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          background: `radial-gradient(ellipse, ${colors.darkCyra}30 0%, transparent 70%)`,
          opacity: progress,
        }}
      />
      <div
        style={{
          fontSize: 68,
          fontWeight: "bold",
          color: colors.darkCyra,
          opacity: progress,
          position: "relative",
          fontFamily,
          letterSpacing: 2,
        }}
      >
        {text.split("").map((char, i) => {
          const charDelay = i * 0.03;
          const charOpacity = Math.min(1, Math.max(0, (progress - charDelay) * 3));
          return (
            <span
              key={i}
              style={{
                opacity: charOpacity,
                display: "inline-block",
                transform: `translateY(${(1 - charOpacity) * 10}px)`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Scene3Dartmouth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Year badge
  const yearProgress = spring({ frame, fps, config: { damping: 200 } });
  const yearOpacity = interpolate(yearProgress, [0, 1], [0, 1]);

  // "Artificial Intelligence" text
  const aiTextDelay = 8 * fps;
  const aiTextProgress = interpolate(
    frame,
    [aiTextDelay, aiTextDelay + 2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Academic room illustration (simple interior)
  const roomOpacity = interpolate(frame, [0, 30], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCharcoal,
        fontFamily,
      }}
    >
      {/* Academic room background */}
      <AbsoluteFill style={{ opacity: roomOpacity }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Chalkboard */}
          <rect x="400" y="100" width="1120" height="600" rx="8" fill="#1a2e1a" stroke={colors.chineseSilver} strokeWidth={3} />
          {/* Board frame */}
          <rect x="390" y="90" width="1140" height="620" rx="10" fill="none" stroke="#8B7355" strokeWidth={6} />
          {/* Chalk scribbles */}
          <line x1="500" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
          <line x1="500" y1="300" x2="750" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} />
          <line x1="500" y1="350" x2="700" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
          {/* Podium */}
          <rect x="860" y="720" width="200" height="200" rx="4" fill="#2a2015" />
        </svg>
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 160px",
          gap: 40,
        }}
      >
        {/* Year + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: yearOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: colors.darkCyra,
              padding: "8px 24px",
              borderRadius: 30,
              fontSize: 22,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            1956
          </div>
          <div style={{ fontSize: 20, color: colors.iceGray }}>
            Dartmouth College, New Hampshire
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: "bold",
            color: colors.white,
            opacity: yearOpacity,
            textAlign: "center",
          }}
        >
          The Workshop That Started Everything
        </div>

        {/* Name cards grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            maxWidth: 800,
            marginTop: 10,
          }}
        >
          {NAME_CARDS.map((card) => (
            <div key={card.name}>
              {frame >= card.delay ? (
                <NameCard name={card.name} role={card.role} />
              ) : null}
            </div>
          ))}
        </div>

        {/* "Artificial Intelligence" particle text */}
        <div style={{ marginTop: 30 }}>
          <ParticleText progress={aiTextProgress} />
        </div>

        {/* Coined label */}
        {aiTextProgress > 0.8 && (
          <div style={{ fontSize: 18, color: colors.iceGray, opacity: aiTextProgress }}>
            The term was officially coined
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
