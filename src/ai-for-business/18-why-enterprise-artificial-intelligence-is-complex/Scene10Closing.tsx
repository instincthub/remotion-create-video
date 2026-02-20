import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Messy node graph (chaotic)
const MessyGraph: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 300, y: 250 }, { x: 500, y: 180 }, { x: 420, y: 380 },
    { x: 650, y: 300 }, { x: 350, y: 450 }, { x: 550, y: 420 },
    { x: 700, y: 200 }, { x: 480, y: 280 }, { x: 380, y: 160 },
    { x: 620, y: 380 },
  ];

  // Chaotic connections (many-to-many)
  const edges = [
    [0,1],[0,2],[0,3],[1,3],[1,7],[2,4],[2,5],[3,6],[3,9],
    [4,5],[5,9],[6,7],[7,8],[8,0],[9,6],[4,7],[1,5],[8,3],
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        opacity,
      }}
    >
      <svg width="960" height="700" viewBox="0 0 960 700">
        {edges.map(([from, to], i) => {
          const n1 = nodes[from];
          const n2 = nodes[to];
          const wobble = Math.sin(frame * 0.03 + i) * 3;
          return (
            <line
              key={`me-${i}`}
              x1={n1.x}
              y1={n1.y + wobble}
              x2={n2.x}
              y2={n2.y - wobble}
              stroke={colors.oldRose}
              strokeWidth={1.5}
              opacity={0.4}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={`mn-${i}`}
            cx={n.x}
            cy={n.y}
            r={8}
            fill={`${colors.oldRose}40`}
            stroke={colors.oldRose}
            strokeWidth={2}
          />
        ))}
      </svg>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 20,
          color: colors.rhythm,
          fontWeight: 700,
          fontFamily,
        }}
      >
        Unmanaged Complexity
      </div>
    </div>
  );
};

// Clean structured architecture
const CleanArchitecture: React.FC<{ opacity: number }> = ({ opacity }) => {
  const layers = [
    { y: 160, label: "Data Layer", width: 600, color: colors.darkCyra },
    { y: 280, label: "Processing Layer", width: 520, color: colors.viridianGreen },
    { y: 400, label: "Decision Layer", width: 440, color: colors.deepGreenCyanTurquoise },
    { y: 520, label: "Monitoring", width: 360, color: colors.tiffanyBlue },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        opacity,
      }}
    >
      <svg width="960" height="700" viewBox="0 0 960 700">
        {layers.map((layer, i) => {
          const lx = (960 - layer.width) / 2;
          return (
            <g key={`cl-${i}`}>
              <rect
                x={lx}
                y={layer.y}
                width={layer.width}
                height={80}
                rx={12}
                fill={`${layer.color}15`}
                stroke={layer.color}
                strokeWidth={2}
              />
              <text
                x={960 / 2}
                y={layer.y + 46}
                textAnchor="middle"
                fill={layer.color}
                fontSize={20}
                fontFamily={fontFamily}
                fontWeight={700}
              >
                {layer.label}
              </text>
              {/* Arrow to next layer */}
              {i < layers.length - 1 && (
                <g>
                  <line
                    x1={960 / 2}
                    y1={layer.y + 80}
                    x2={960 / 2}
                    y2={layers[i + 1].y}
                    stroke={`${layer.color}60`}
                    strokeWidth={2}
                    strokeDasharray="4 3"
                  />
                  <polygon
                    points={`${960 / 2 - 5},${layers[i + 1].y - 3} ${960 / 2},${layers[i + 1].y + 5} ${960 / 2 + 5},${layers[i + 1].y - 3}`}
                    fill={`${layer.color}60`}
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 20,
          color: colors.darkCyra,
          fontWeight: 700,
          fontFamily,
        }}
      >
        Engineered Architecture
      </div>
    </div>
  );
};

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Diagrams fade in
  const diagramProgress = spring({
    frame,
    fps,
    delay: fps * 0.5,
    config: { damping: 14, stiffness: 80 },
  });
  const diagramOpacity = interpolate(diagramProgress, [0, 1], [0, 1]);

  // Transition: messy fades out, clean remains
  const messyFade = interpolate(
    frame,
    [6 * fps, 8 * fps],
    [1, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cleanGlow = interpolate(
    frame,
    [6 * fps, 8 * fps],
    [1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Main closing text
  const textProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 10, stiffness: 70 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  // Divider line
  const dividerOpacity = interpolate(
    frame,
    [fps, 2 * fps],
    [0, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Left: Messy graph */}
      <div style={{ opacity: diagramOpacity * messyFade }}>
        <MessyGraph opacity={1} />
      </div>

      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          top: 120,
          bottom: 280,
          left: "50%",
          width: 2,
          background: colors.chineseSilver,
          opacity: dividerOpacity,
        }}
      />

      {/* Right: Clean architecture */}
      <div style={{ opacity: diagramOpacity * cleanGlow }}>
        <CleanArchitecture opacity={1} />
      </div>

      {/* Closing text overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 230,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: colors.darkSlateGray,
              lineHeight: 1.4,
            }}
          >
            Tools{" "}
            <span style={{ color: colors.rhythm }}>Impress</span>.
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: colors.darkSlateGray,
              lineHeight: 1.4,
            }}
          >
            Systems{" "}
            <span style={{ color: colors.darkCyra }}>Endure</span>.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
