import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Messy experimental view (left)
const MessyLab: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 120, y: 180 }, { x: 280, y: 140 }, { x: 200, y: 300 },
    { x: 350, y: 250 }, { x: 150, y: 380 }, { x: 320, y: 350 },
    { x: 400, y: 180 }, { x: 250, y: 220 }, { x: 180, y: 260 },
  ];

  const edges = [
    [0,1],[0,2],[1,3],[2,4],[2,5],[3,6],[4,5],[5,7],[7,8],[8,0],[6,7],[1,8],
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        left: 80,
        width: "40%",
        height: "55%",
        opacity,
      }}
    >
      <svg width="500" height="500" viewBox="0 0 500 500">
        {edges.map(([from, to], i) => {
          const n1 = nodes[from];
          const n2 = nodes[to];
          const wobble = Math.sin(frame * 0.03 + i) * 3;
          return (
            <line
              key={`e-${i}`}
              x1={n1.x}
              y1={n1.y + wobble}
              x2={n2.x}
              y2={n2.y - wobble}
              stroke={colors.oldRose}
              strokeWidth={1.5}
              opacity={0.35}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={7}
            fill={`${colors.oldRose}30`}
            stroke={colors.oldRose}
            strokeWidth={2}
          />
        ))}
      </svg>

      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          color: colors.rhythm,
          marginTop: -40,
          fontFamily,
        }}
      >
        Models Change
      </div>
    </div>
  );
};

// Clean architecture blueprint (right)
const CleanBlueprint: React.FC<{ opacity: number }> = ({ opacity }) => {
  const layers = [
    { y: 120, label: "Evaluation Layer", width: 380, color: colors.darkCyra },
    { y: 210, label: "Versioning Layer", width: 340, color: colors.viridianGreen },
    { y: 300, label: "Traceability Layer", width: 300, color: colors.deepGreenCyanTurquoise },
    { y: 390, label: "Modular Architecture", width: 260, color: colors.tiffanyBlue },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        right: 80,
        width: "40%",
        height: "55%",
        opacity,
      }}
    >
      <svg width="500" height="500" viewBox="0 0 500 500">
        {layers.map((layer, i) => {
          const lx = (500 - layer.width) / 2;
          return (
            <g key={`l-${i}`}>
              <rect
                x={lx}
                y={layer.y}
                width={layer.width}
                height={65}
                rx={10}
                fill={`${layer.color}12`}
                stroke={layer.color}
                strokeWidth={2}
              />
              <text
                x={250}
                y={layer.y + 38}
                textAnchor="middle"
                fill={layer.color}
                fontSize={18}
                fontWeight={700}
                fontFamily={fontFamily}
              >
                {layer.label}
              </text>
              {i < layers.length - 1 && (
                <g>
                  <line
                    x1={250}
                    y1={layer.y + 65}
                    x2={250}
                    y2={layers[i + 1].y}
                    stroke={`${layer.color}50`}
                    strokeWidth={2}
                    strokeDasharray="4 3"
                  />
                  <polygon
                    points={`${245},${layers[i + 1].y - 3} ${250},${layers[i + 1].y + 4} ${255},${layers[i + 1].y - 3}`}
                    fill={`${layer.color}50`}
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          color: colors.darkCyra,
          marginTop: -40,
          fontFamily,
        }}
      >
        Architecture Sustains
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
    delay: Math.round(fps * 0.5),
    config: { damping: 14, stiffness: 80 },
  });
  const diagramOpacity = interpolate(diagramProgress, [0, 1], [0, 1]);

  // Messy fades, clean remains
  const messyFade = interpolate(
    frame,
    [6 * fps, 8 * fps],
    [1, 0.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Divider
  const dividerOpacity = interpolate(
    frame,
    [fps, 2 * fps],
    [0, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Main closing text
  const textProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 4),
    config: { damping: 10, stiffness: 70 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  // Tagline
  const tagProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 7),
    config: { damping: 14, stiffness: 80 },
  });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Left: Messy lab */}
      <div style={{ opacity: diagramOpacity * messyFade }}>
        <MessyLab opacity={1} />
      </div>

      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          top: 140,
          bottom: 280,
          left: "50%",
          width: 2,
          background: colors.chineseSilver,
          opacity: dividerOpacity,
        }}
      />

      {/* Right: Clean architecture */}
      <div style={{ opacity: diagramOpacity }}>
        <CleanBlueprint opacity={1} />
      </div>

      {/* Closing text */}
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
              fontSize: 52,
              fontWeight: 700,
              color: colors.darkSlateGray,
              lineHeight: 1.4,
            }}
          >
            Models{" "}
            <span style={{ color: colors.rhythm }}>Change</span>.
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: colors.darkSlateGray,
              lineHeight: 1.4,
            }}
          >
            Architecture{" "}
            <span style={{ color: colors.darkCyra }}>Sustains</span>.
          </div>
        </div>

        <div
          style={{
            opacity: tagOpacity,
            marginTop: 20,
            fontSize: 30,
            fontWeight: 700,
            color: colors.darkCyra,
          }}
        >
          Speed wins. But only with control.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
