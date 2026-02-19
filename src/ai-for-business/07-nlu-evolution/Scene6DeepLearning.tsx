import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Neural network animation with flowing connections
const NeuralNetwork: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const layers = [
    { x: 200, nodes: 6, label: "Input" },
    { x: 500, nodes: 8, label: "Hidden 1" },
    { x: 800, nodes: 8, label: "Hidden 2" },
    { x: 1100, nodes: 5, label: "Hidden 3" },
    { x: 1400, nodes: 3, label: "Output" },
  ];

  const networkOpacity = interpolate(frame, [fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getNodeY = (layerIdx: number, nodeIdx: number, nodeCount: number) => {
    const spacing = 400 / (nodeCount + 1);
    return 180 + spacing * (nodeIdx + 1);
  };

  return (
    <AbsoluteFill style={{ opacity: networkOpacity }}>
      <svg width="1920" height="700" viewBox="0 0 1600 600">
        <defs>
          <filter id="nodeGlow7">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections between layers */}
        {layers.slice(0, -1).map((layer, li) => {
          const nextLayer = layers[li + 1];
          const connectionProgress = interpolate(
            frame,
            [(1.5 + li * 0.8) * fps, (2.5 + li * 0.8) * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const connections: React.ReactNode[] = [];
          for (let ni = 0; ni < layer.nodes; ni++) {
            for (let nj = 0; nj < nextLayer.nodes; nj++) {
              const y1 = getNodeY(li, ni, layer.nodes);
              const y2 = getNodeY(li + 1, nj, nextLayer.nodes);
              const signalProgress = Math.sin(
                frame * 0.08 + ni * 0.5 + nj * 0.3 + li * 2
              ) * 0.3 + 0.4;
              connections.push(
                <line
                  key={`conn-${li}-${ni}-${nj}`}
                  x1={layer.x}
                  y1={y1}
                  x2={nextLayer.x}
                  y2={y2}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={0.5}
                  opacity={connectionProgress * signalProgress}
                />
              );
            }
          }
          return connections;
        })}

        {/* Nodes */}
        {layers.map((layer, li) => {
          const layerProgress = spring({
            frame,
            fps,
            delay: (1 + li * 0.6) * fps,
            config: { damping: 200 },
          });
          const nodeOpacity = interpolate(layerProgress, [0, 1], [0, 1]);

          return Array.from({ length: layer.nodes }).map((_, ni) => {
            const y = getNodeY(li, ni, layer.nodes);
            const pulse = Math.sin(frame * 0.1 + ni * 1.5 + li * 2) * 0.3 + 0.7;

            return (
              <g key={`node-${li}-${ni}`} opacity={nodeOpacity}>
                <circle
                  cx={layer.x}
                  cy={y}
                  r="12"
                  fill={`${colors.darkCyra}40`}
                  stroke={colors.tiffanyBlue}
                  strokeWidth="1.5"
                  filter="url(#nodeGlow7)"
                />
                <circle
                  cx={layer.x}
                  cy={y}
                  r="5"
                  fill={colors.caribbeanGreen}
                  opacity={pulse}
                />
              </g>
            );
          });
        })}

        {/* Layer labels */}
        {layers.map((layer, li) => {
          const labelProgress = interpolate(
            frame,
            [(2 + li * 0.6) * fps, (3 + li * 0.6) * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <text
              key={`label-${li}`}
              x={layer.x}
              y={580}
              textAnchor="middle"
              fill={colors.rhythm}
              fontSize="14"
              fontWeight="bold"
              opacity={labelProgress}
            >
              {layer.label}
            </text>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Layered text showing different levels of understanding
const UnderstandingLayers: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const layers = [
    { text: "Words", color: colors.chineseSilver, delay: 8 },
    { text: "Sentences", color: colors.tiffanyBlue, delay: 10 },
    { text: "Concepts", color: colors.caribbeanGreen, delay: 12 },
    { text: "Context", color: colors.corn, delay: 14 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 240,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {layers.map((layer, i) => {
        const progress = spring({
          frame,
          fps,
          delay: layer.delay * fps,
          config: { damping: 12, stiffness: 100 },
        });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const scale = interpolate(progress, [0, 1], [0.7, 1]);
        const translateY = interpolate(progress, [0, 1], [20, 0]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                backgroundColor: `${layer.color}15`,
                border: `2px solid ${layer.color}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: "bold",
                color: layer.color,
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: layer.color,
              }}
            >
              {layer.text}
            </div>
          </div>
        );
      })}

      {/* Connecting arrows between levels */}
      {layers.slice(0, -1).map((_, i) => {
        const arrowProgress = interpolate(
          frame,
          [(10 + i * 2) * fps, (11 + i * 2) * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={`arrow-${i}`}
            style={{
              position: "absolute",
              left: `calc(${25 + i * 16.7}% + 60px)`,
              top: 20,
              opacity: arrowProgress,
            }}
          >
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
              <line x1="0" y1="10" x2="22" y2="10" stroke={colors.white} strokeWidth="1.5" opacity={0.3} />
              <polygon points="20,5 30,10 20,15" fill={colors.white} opacity={0.3} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export const Scene6DeepLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Neural network background */}
      <NeuralNetwork frame={frame} fps={fps} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: "bold",
          color: colors.white,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: `0 0 40px ${colors.darkCyra}40`,
          zIndex: 2,
        }}
      >
        <span style={{ color: colors.tiffanyBlue }}>Deep Learning</span> Changed Everything
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 300,
          right: 300,
          textAlign: "center",
          fontSize: 24,
          color: colors.chineseSilver,
          opacity: subOpacity,
          lineHeight: 1.5,
          zIndex: 2,
        }}
      >
        Instead of manually programming rules, engineers began training systems
        on <span style={{ color: colors.tiffanyBlue, fontWeight: "bold" }}>massive amounts of text</span>
      </div>

      {/* Understanding layers */}
      <UnderstandingLayers frame={frame} fps={fps} />

      {/* Bottom insight */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 200,
          right: 200,
          textAlign: "center",
          fontSize: 26,
          color: colors.magnolia,
          lineHeight: 1.5,
          zIndex: 2,
          opacity: interpolate(frame, [18 * fps, 20 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        From simple{" "}
        <span style={{ color: colors.chineseSilver, fontWeight: "bold" }}>keyword tricks</span> to
        deeper{" "}
        <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
          semantic understanding
        </span>
      </div>
    </AbsoluteFill>
  );
};
