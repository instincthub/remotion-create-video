import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Research papers stacking
const PaperStack: React.FC<{ progress: number }> = ({ progress }) => {
  const paperCount = Math.floor(progress * 8);

  return (
    <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
      {Array.from({ length: paperCount }, (_, i) => {
        const offsetY = i * 8;
        const offsetX = (i % 2) * 3 - 1;
        const rotation = (i % 3 - 1) * 2;
        return (
          <g key={i} transform={`translate(${offsetX}, ${200 - offsetY}) rotate(${rotation}, 100, 0)`}>
            <rect x="30" y="0" width="140" height="40" rx="3"
              fill="rgba(255,255,255,0.04)"
              stroke={colors.iceGray} strokeWidth={1}
            />
            <line x1="42" y1="12" x2="130" y2="12" stroke={colors.iceGray} strokeWidth={0.8} opacity={0.4} />
            <line x1="42" y1="22" x2="110" y2="22" stroke={colors.iceGray} strokeWidth={0.8} opacity={0.3} />
            <line x1="42" y1="32" x2="90" y2="32" stroke={colors.iceGray} strokeWidth={0.8} opacity={0.2} />
          </g>
        );
      })}
    </svg>
  );
};

// ChatGPT-like UI
const ChatUI: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{
    width: 280,
    backgroundColor: "rgba(0,131,143,0.08)",
    border: `2px solid ${colors.darkCyra}`,
    borderRadius: 16,
    padding: 20,
    opacity,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }}>
    <div style={{ fontSize: 14, fontWeight: "bold", color: colors.darkCyra, fontFamily }}>AI Chat</div>
    <div style={{
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 13,
      color: colors.white,
      fontFamily,
    }}>
      How does quantum computing work?
    </div>
    <div style={{
      backgroundColor: `${colors.darkCyra}20`,
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 13,
      color: colors.tiffanyBlue,
      fontFamily,
    }}>
      Quantum computing uses qubits that can exist in superposition...
    </div>
  </div>
);

// Self-driving car outline
const SelfDrivingCar: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="200" height="140" viewBox="0 0 200 140" fill="none" style={{ opacity }}>
    {/* Car body */}
    <path
      d="M30 90 L40 60 L80 40 L140 40 L170 65 L180 90"
      stroke={colors.darkCyra} strokeWidth={2.5} fill="none" strokeLinejoin="round"
    />
    <line x1="25" y1="90" x2="185" y2="90" stroke={colors.darkCyra} strokeWidth={2.5} />
    {/* Wheels */}
    <circle cx="60" cy="95" r="14" stroke={colors.darkCyra} strokeWidth={2} fill="none" />
    <circle cx="150" cy="95" r="14" stroke={colors.darkCyra} strokeWidth={2} fill="none" />
    {/* Sensor on top */}
    <rect x="95" y="30" width="20" height="12" rx="4" stroke={colors.tiffanyBlue} strokeWidth={1.5} fill="none" />
    {/* Sensor waves */}
    <path d="M85 25 C80 15, 70 10, 60 15" stroke={colors.tiffanyBlue} strokeWidth={1} fill="none" opacity={0.5} />
    <path d="M125 25 C130 15, 140 10, 150 15" stroke={colors.tiffanyBlue} strokeWidth={1} fill="none" opacity={0.5} />
    {/* Windows */}
    <path d="M85 60 L90 42 L130 42 L135 60" stroke={colors.darkCyra} strokeWidth={1.5} fill="none" />
    <line x1="110" y1="42" x2="110" y2="60" stroke={colors.darkCyra} strokeWidth={1} opacity={0.5} />
    {/* Label */}
    <text x="100" y="135" textAnchor="middle" fill={colors.iceGray} fontSize="12">Self-Driving</text>
  </svg>
);

// Medical AI scan
const MedicalScan: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="200" height="140" viewBox="0 0 200 140" fill="none" style={{ opacity }}>
    {/* Scan frame */}
    <rect x="30" y="10" width="140" height="100" rx="8"
      stroke={colors.darkCyra} strokeWidth={2} fill="none"
    />
    {/* Brain outline inside */}
    <ellipse cx="100" cy="55" r="40" ry="35"
      stroke={colors.tiffanyBlue} strokeWidth={1.5} fill="none"
    />
    <path d="M80 35 C85 45, 95 50, 100 40 C105 50, 115 45, 120 35"
      stroke={colors.tiffanyBlue} strokeWidth={1} fill="none" opacity={0.6}
    />
    {/* Scan line */}
    <line x1="35" y1="55" x2="165" y2="55" stroke={colors.caribbeanGreen} strokeWidth={1} opacity={0.5} />
    {/* Highlight markers */}
    <circle cx="80" cy="50" r="6" stroke={colors.caribbeanGreen} strokeWidth={1.5} fill="none" />
    <circle cx="115" cy="60" r="4" stroke={colors.caribbeanGreen} strokeWidth={1.5} fill="none" />
    {/* Label */}
    <text x="100" y="130" textAnchor="middle" fill={colors.iceGray} fontSize="12">Medical AI</text>
  </svg>
);

export const Scene9Evolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Warmth returns — background transitions from cold to warm
  const warmth = interpolate(
    frame,
    [0, 15 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Paper stack grows
  const paperProgress = interpolate(
    frame,
    [fps, 8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Title
  const titleProgress = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Modern AI reveals
  const chatDelay = 8 * fps;
  const chatProgress = spring({ frame, fps, delay: chatDelay, config: { damping: 200 } });
  const chatOpacity = interpolate(chatProgress, [0, 1], [0, 1]);

  const carDelay = 10 * fps;
  const carProgress = spring({ frame, fps, delay: carDelay, config: { damping: 200 } });
  const carOpacity = interpolate(carProgress, [0, 1], [0, 1]);

  const medDelay = 12 * fps;
  const medProgress = spring({ frame, fps, delay: medDelay, config: { damping: 200 } });
  const medOpacity = interpolate(medProgress, [0, 1], [0, 1]);

  // Neural network glow emerges
  const glowOpacity = interpolate(
    frame,
    [10 * fps, 18 * fps],
    [0, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Background transition: cold → warm */}
      <AbsoluteFill style={{ backgroundColor: colors.winterBlue, opacity: 1 - warmth }} />
      <AbsoluteFill style={{ backgroundColor: colors.darkNavy, opacity: warmth }} />

      {/* Neural network glow */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 50%, ${colors.darkCyra}30 0%, transparent 60%)`,
        opacity: glowOpacity,
      }} />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "60px 120px",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: "bold",
            color: colors.white,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          AI Never Actually Died
        </div>

        <div
          style={{
            fontSize: 20,
            color: colors.iceGray,
            opacity: titleOpacity * 0.8,
            textAlign: "center",
          }}
        >
          It kept evolving quietly in labs and research papers
        </div>

        {/* Papers → Modern AI layout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginTop: 20,
          }}
        >
          {/* Paper stack */}
          <PaperStack progress={paperProgress} />

          {/* Arrow */}
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none"
            style={{ opacity: chatOpacity }}
          >
            <line x1="5" y1="20" x2="65" y2="20" stroke={colors.darkCyra} strokeWidth={2.5} />
            <path d="M60 12 L72 20 L60 28" stroke={colors.darkCyra} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          </svg>

          {/* Modern AI trio */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ChatUI opacity={chatOpacity} />
            <div style={{ display: "flex", gap: 16 }}>
              <SelfDrivingCar opacity={carOpacity} />
              <MedicalScan opacity={medOpacity} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
