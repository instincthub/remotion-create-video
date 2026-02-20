import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MODEL_PROVIDERS = [
  { label: "GPT Service", x: 440, color: colors.tiffanyBlue },
  { label: "Custom ML", x: 720, color: colors.viridianGreen },
  { label: "Open Source", x: 1000, color: colors.caribbeanGreen },
  { label: "Specialist", x: 1280, color: colors.darkCyra },
];

export const Scene3Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Model boxes appear staggered
  const modelEntrances = MODEL_PROVIDERS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * 10,
      config: { damping: 12, stiffness: 90 },
    }),
  );

  // Arbitration layer slides in
  const arbProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 3),
    config: { damping: 12, stiffness: 70 },
  });
  const arbOpacity = interpolate(arbProgress, [0, 1], [0, 1]);
  const arbY = interpolate(arbProgress, [0, 1], [40, 0]);

  // Output box
  const outputProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 14, stiffness: 80 },
  });
  const outputOpacity = interpolate(outputProgress, [0, 1], [0, 1]);
  const outputScale = interpolate(outputProgress, [0, 1], [0.8, 1]);

  // Highlight: active selection pulse
  const activeModel = Math.floor((frame * 0.02) % MODEL_PROVIDERS.length);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 8),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.darkNavy} 0%, #0a2a2e 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Do Not{" "}
          <span style={{ color: colors.corn }}>Hard Wire</span> Models
        </div>
      </div>

      {/* Architecture diagram */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880" viewBox="0 0 1920 880">
          {/* Model provider boxes */}
          {MODEL_PROVIDERS.map((provider, i) => {
            const entrance = modelEntrances[i];
            const boxOpacity = interpolate(entrance, [0, 1], [0, 1]);
            const boxY = interpolate(entrance, [0, 1], [-40, 0]);
            const isActive = activeModel === i && frame > 5 * fps;
            const glowOpacity = isActive
              ? 0.6 + Math.sin(frame * 0.1) * 0.3
              : 0.3;

            return (
              <g
                key={provider.label}
                opacity={boxOpacity}
                transform={`translate(0, ${boxY})`}
              >
                {/* Glow behind active model */}
                {isActive && (
                  <rect
                    x={provider.x - 15}
                    y={195}
                    width={230}
                    height={110}
                    rx={16}
                    fill={provider.color}
                    opacity={glowOpacity * 0.15}
                  />
                )}
                <rect
                  x={provider.x}
                  y={210}
                  width={200}
                  height={80}
                  rx={12}
                  fill={`${provider.color}20`}
                  stroke={provider.color}
                  strokeWidth={isActive ? 3 : 2}
                />
                <text
                  x={provider.x + 100}
                  y={258}
                  textAnchor="middle"
                  fill={colors.white}
                  fontSize={22}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {provider.label}
                </text>
              </g>
            );
          })}

          {/* Connection lines to arbitration */}
          {MODEL_PROVIDERS.map((provider, i) => {
            const lineOpacity = interpolate(arbProgress, [0, 1], [0, 0.5]);
            const isActive = activeModel === i && frame > 5 * fps;
            // Spread target points evenly across arbitration box
            const targetX = 735 + i * 150;
            return (
              <line
                key={`line-${i}`}
                x1={provider.x + 100}
                y1={290}
                x2={targetX}
                y2={430}
                stroke={isActive ? provider.color : colors.white}
                strokeWidth={isActive ? 3 : 1.5}
                opacity={isActive ? 0.8 : lineOpacity}
                strokeDasharray={isActive ? "0" : "6 4"}
              />
            );
          })}

          {/* Arbitration layer */}
          <g
            opacity={arbOpacity}
            transform={`translate(0, ${arbY})`}
          >
            <rect
              x={660}
              y={430}
              width={600}
              height={90}
              rx={14}
              fill={`${colors.white}10`}
              stroke={colors.white}
              strokeWidth={2}
            />
            <text
              x={960}
              y={468}
              textAnchor="middle"
              fill={colors.white}
              fontSize={26}
              fontWeight={700}
              fontFamily={fontFamily}
            >
              Arbitration Layer
            </text>
            <text
              x={960}
              y={502}
              textAnchor="middle"
              fill={`${colors.white}70`}
              fontSize={18}
              fontFamily={fontFamily}
            >
              Evaluate &bull; Compare &bull; Select
            </text>
          </g>

          {/* Arrow from arbitration to output */}
          <line
            x1={960}
            y1={520}
            x2={960}
            y2={600}
            stroke={colors.white}
            strokeWidth={2}
            opacity={outputOpacity * 0.5}
            strokeDasharray="6 4"
          />
          <polygon
            points="952,595 960,612 968,595"
            fill={colors.white}
            opacity={outputOpacity * 0.5}
          />

          {/* Best output box */}
          <g opacity={outputOpacity}>
            <rect
              x={810}
              y={615}
              width={300}
              height={80}
              rx={12}
              fill={`${colors.limeGreen}20`}
              stroke={colors.limeGreen}
              strokeWidth={2}
            />
            <text
              x={960}
              y={663}
              textAnchor="middle"
              fill={colors.white}
              fontSize={24}
              fontWeight={700}
              fontFamily={fontFamily}
            >
              Best Output
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${colors.white}12`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.white}25`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.white,
              fontWeight: 700,
            }}
          >
            Service-based architecture. Constant automated evaluation.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
