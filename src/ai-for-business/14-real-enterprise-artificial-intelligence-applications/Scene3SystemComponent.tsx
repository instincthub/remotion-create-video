import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface SystemLayer {
  label: string;
  color: string;
  isAI: boolean;
}

const layers: SystemLayer[] = [
  { label: "User Interface", color: colors.policeBlue, isAI: false },
  { label: "Security Layer", color: colors.chineseBlue, isAI: false },
  { label: "AI Model", color: colors.darkCyra, isAI: true },
  { label: "Database", color: colors.deepGreenCyanTurquoise, isAI: false },
  { label: "Compliance Rules", color: colors.metallicBlue, isAI: false },
  { label: "Logging & Monitoring", color: colors.darkSlateGray, isAI: false },
];

export const Scene3SystemComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-20, 0]);

  // Layers build sequentially
  const layerProgresses = layers.map((_, i) =>
    spring({
      frame,
      fps,
      delay: (1.5 + i * 1.2) * fps,
      config: { damping: 10, stiffness: 70, mass: 1.1 },
    })
  );

  // AI highlight glow (after all layers visible)
  const aiGlow = interpolate(
    frame,
    [9 * fps, 10.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const aiPulse = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.6, 1]);

  // "AI is only one part" text
  const captionProgress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const captionOpacity = interpolate(captionProgress, [0, 1], [0, 1]);
  const captionY = interpolate(captionProgress, [0, 1], [20, 0]);

  // Surrounding elements labels
  const surroundLabels = [
    { text: "Human Workflows", x: 100, y: 200, delay: 12 },
    { text: "Business Logic", x: 1500, y: 200, delay: 12.5 },
    { text: "Data Pipelines", x: 100, y: 700, delay: 13 },
    { text: "Governance", x: 1500, y: 700, delay: 13.5 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0e1b30 100%)`,
        fontFamily,
      }}
    >
      {/* Circuit background */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`bg-h-${i}`}
            x1={0}
            y1={i * 100}
            x2={1920}
            y2={i * 100}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`bg-v-${i}`}
            x1={i * 100}
            y1={0}
            x2={i * 100}
            y2={1080}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          AI Inside a{" "}
          <span style={{ color: colors.tiffanyBlue }}>Bigger Machine</span>
        </div>
      </div>

      {/* Architecture stack */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 3,
        }}
      >
        {layers.map((layer, i) => {
          const progress = layerProgresses[i];
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const slideY = interpolate(progress, [0, 1], [30, 0]);
          const scaleX = interpolate(progress, [0, 1], [0.8, 1]);

          const isAI = layer.isAI;
          const glowIntensity = isAI ? aiGlow * aiPulse : 0;

          return (
            <div
              key={`layer-${i}`}
              style={{
                opacity,
                transform: `translateY(${slideY}px) scaleX(${scaleX})`,
                width: 700,
                height: 90,
                background: isAI
                  ? `linear-gradient(90deg, ${layer.color}, ${colors.viridianGreen})`
                  : layer.color,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: isAI
                  ? `2px solid ${colors.tiffanyBlue}`
                  : `1px solid ${colors.white}15`,
                boxShadow: isAI
                  ? `0 0 ${20 + glowIntensity * 30}px ${colors.tiffanyBlue}${Math.round(glowIntensity * 60).toString(16).padStart(2, "0")}`
                  : "none",
              }}
            >
              {/* Layer number */}
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `${colors.white}50`,
                  letterSpacing: 2,
                }}
              >
                {isAI ? "AI" : `L${i + 1}`}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                {layer.label}
              </div>
              {isAI && (
                <div
                  style={{
                    position: "absolute",
                    right: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.corn,
                    background: `${colors.corn}20`,
                    padding: "3px 10px",
                    borderRadius: 8,
                    opacity: glowIntensity,
                  }}
                >
                  ONE COMPONENT
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Surrounding labels */}
      {surroundLabels.map((item, i) => {
        const labelProgress = spring({
          frame,
          fps,
          delay: item.delay * fps,
          config: { damping: 12, stiffness: 80 },
        });
        const labelOpacity = interpolate(labelProgress, [0, 1], [0, 0.6]);

        return (
          <div
            key={`surround-${i}`}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              opacity: labelOpacity,
              fontSize: 18,
              fontWeight: 700,
              color: colors.chineseSilver,
              letterSpacing: 1,
            }}
          >
            {item.text}
          </div>
        );
      })}

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: captionOpacity,
            transform: `translateY(${captionY}px)`,
            fontSize: 34,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          AI is{" "}
          <span style={{ color: colors.tiffanyBlue }}>only one part</span>{" "}
          of the application.
        </div>
      </div>
    </AbsoluteFill>
  );
};
