import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

// Neural network nodes for AI visualisation
const NODES = [
  { x: 320, y: 280, layer: 0 },
  { x: 320, y: 440, layer: 0 },
  { x: 320, y: 600, layer: 0 },
  { x: 560, y: 200, layer: 1 },
  { x: 560, y: 360, layer: 1 },
  { x: 560, y: 520, layer: 1 },
  { x: 560, y: 680, layer: 1 },
  { x: 800, y: 300, layer: 2 },
  { x: 800, y: 480, layer: 2 },
  { x: 800, y: 660, layer: 2 },
  { x: 1020, y: 440, layer: 3 },
];

const CONNECTIONS = [
  [0, 3], [0, 4], [0, 5],
  [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 4], [2, 5], [2, 6],
  [3, 7], [3, 8],
  [4, 7], [4, 8], [4, 9],
  [5, 7], [5, 8], [5, 9],
  [6, 8], [6, 9],
  [7, 10], [8, 10], [9, 10],
];

export const Scene02AIEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-100): "What you do not see..." text
  const intro1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const intro1Y = interpolate(intro1Spring, [0, 1], [20, 0]);

  const intro2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 60 });
  const intro2Y = interpolate(intro2Spring, [0, 1], [20, 0]);

  // Phase 2 (100+): Neural network fades in
  const networkFade = interpolate(frame, [80, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "MILLISECONDS" counter
  const msCounterSpring = spring({ frame, fps, config: { damping: 200 }, delay: 200 });

  // Pulse through the network — a "signal" traveling right
  const signalProgress = ((frame - 100) / 240) % 1;

  // Decision output
  const decisionSpring = spring({ frame, fps, config: { damping: 200 }, delay: 360 });
  const decisionScale = interpolate(decisionSpring, [0, 1], [0.6, 1]);

  // "APPROVED" blink
  const isApproved = frame >= 400;
  const blinkOpacity = isApproved
    ? 0.7 + Math.sin(frame * 0.25) * 0.3
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.deepNight} 0%, #0A1520 60%, ${colors.gunmetal} 100%)`,
      }}
    >
      {/* Subtle radial glow at center-right */}
      <div
        style={{
          position: "absolute",
          left: 600,
          top: 200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}10 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Left text panel */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 0,
          width: 700,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Label */}
        <div
          style={{
            opacity: intro1Spring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: colors.tiffanyBlue,
            }}
          />
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 16,
              color: colors.tiffanyBlue,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Hidden layer
          </span>
        </div>

        {/* Main text */}
        <div
          style={{
            opacity: intro1Spring,
            transform: `translateY(${intro1Y}px)`,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 34,
            color: `${colors.white}88`,
            lineHeight: 1.5,
          }}
        >
          What you do not see is the
        </div>

        <div
          style={{
            opacity: intro1Spring,
            transform: `translateY(${intro1Y}px)`,
          }}
        >
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 52,
              color: colors.white,
              lineHeight: 1.2,
            }}
          >
            AI engine deciding
          </span>
        </div>

        <div
          style={{
            opacity: intro2Spring,
            transform: `translateY(${intro2Y}px)`,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 34,
            color: `${colors.white}88`,
            lineHeight: 1.5,
          }}
        >
          in
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 48,
              color: colors.sunsetAmber,
              margin: "0 12px",
              opacity: msCounterSpring,
            }}
          >
            milliseconds
          </span>
        </div>

        <div
          style={{
            opacity: intro2Spring,
            transform: `translateY(${intro2Y}px)`,
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 34,
            color: `${colors.white}88`,
            lineHeight: 1.5,
          }}
        >
          whether you qualify for a loan.
        </div>

        {/* Decision badge */}
        {frame >= 360 && (
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: decisionSpring,
              transform: `scale(${decisionScale})`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: colors.limeGreen,
                opacity: blinkOpacity,
                boxShadow: `0 0 12px ${colors.limeGreen}80`,
              }}
            />
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 32,
                color: colors.limeGreen,
                opacity: blinkOpacity,
              }}
            >
              APPROVED
            </span>
          </div>
        )}
      </div>

      {/* Neural network visualization */}
      <div
        style={{
          position: "absolute",
          left: 880,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: networkFade,
        }}
      >
        <svg
          width="900"
          height="1080"
          viewBox="0 0 900 1080"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {/* Connections */}
          {CONNECTIONS.map(([from, to], i) => {
            const fromNode = NODES[from];
            const toNode = NODES[to];
            const fx = fromNode.x - 880;
            const tx = toNode.x - 880;

            // Animate a "signal" along each connection
            const signalDelay = i * 0.03;
            const progress = Math.max(0, Math.min(1, signalProgress - signalDelay));
            const sigX = fx + (tx - fx) * progress;
            const sigY = fromNode.y + (toNode.y - fromNode.y) * progress;

            return (
              <g key={i}>
                <line
                  x1={fx}
                  y1={fromNode.y}
                  x2={tx}
                  y2={toNode.y}
                  stroke={`${colors.tiffanyBlue}25`}
                  strokeWidth={1.5}
                />
                {frame >= 100 && progress > 0 && progress < 1 && (
                  <circle
                    cx={sigX}
                    cy={sigY}
                    r={4}
                    fill={colors.sunsetAmber}
                    opacity={0.8}
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const nx = node.x - 880;
            const isOutput = node.layer === 3;
            const nodeGlow = isOutput && frame >= 360
              ? `0 0 16px ${colors.limeGreen}80`
              : `0 0 8px ${colors.darkCyra}60`;
            const nodeColor = isOutput && frame >= 360
              ? colors.limeGreen
              : node.layer === 0
              ? colors.sunsetAmber
              : node.layer === 1 || node.layer === 2
              ? colors.tiffanyBlue
              : colors.caribbeanGreen;

            const pulseR = isOutput
              ? 18 + Math.sin(frame * 0.15 + i) * 3
              : 14 + Math.sin(frame * 0.1 + i * 0.8) * 2;

            return (
              <g key={i}>
                {/* Glow ring */}
                <circle
                  cx={nx}
                  cy={node.y}
                  r={pulseR + 8}
                  fill="none"
                  stroke={nodeColor}
                  strokeWidth={1}
                  opacity={0.15}
                />
                {/* Node */}
                <circle
                  cx={nx}
                  cy={node.y}
                  r={pulseR}
                  fill={`${nodeColor}20`}
                  stroke={nodeColor}
                  strokeWidth={2}
                  style={{ filter: `drop-shadow(${nodeGlow})` }}
                />
              </g>
            );
          })}

          {/* Layer labels */}
          {[
            { x: -560 + 880, label: "Input", sublabel: "Transaction\nhistory" },
            { x: -320 + 880, label: "Hidden", sublabel: "Patterns" },
            { x: -80 + 880, label: "Hidden", sublabel: "Risk\nfeatures" },
            { x: 140 + 880, label: "Output", sublabel: "Decision" },
          ].map((layer, i) => (
            <g key={i}>
              <text
                x={layer.x - 880}
                y={820}
                textAnchor="middle"
                fill={`${colors.white}40`}
                fontSize={13}
                fontFamily="sans-serif"
              >
                {layer.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
