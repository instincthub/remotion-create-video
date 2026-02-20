import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface Layer {
  label: string;
  color: string;
  index: number;
}

const layers: Layer[] = [
  { label: "OCR", color: colors.policeBlue, index: 0 },
  { label: "NLP", color: colors.chineseBlue, index: 1 },
  { label: "Risk Model", color: colors.darkCyra, index: 2 },
  { label: "Human Review", color: colors.deepGreenCyanTurquoise, index: 3 },
];

// Single stacked layer component
const StackLayer: React.FC<{
  layer: Layer;
  progress: number;
  errorGlow: number;
  frame: number;
}> = ({ layer, progress, errorGlow, frame }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scaleY = interpolate(progress, [0, 1], [0.6, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  // Base glow
  const baseGlow = interpolate(Math.sin(frame * 0.04 + layer.index), [-1, 1], [6, 14]);

  // Error glow for affected layers (NLP = index 1 and above)
  const hasError = layer.index >= 1;
  const errorOpacity = hasError ? errorGlow : 0;
  const errorBorderColor = hasError
    ? `rgba(234, 95, 94, ${errorOpacity * 0.6})`
    : "transparent";
  const errorShadow = hasError && errorOpacity > 0
    ? `0 0 ${20 + errorOpacity * 30}px ${colors.oldRose}${Math.round(errorOpacity * 80) < 16 ? "0" : ""}${Math.round(errorOpacity * 80).toString(16)}`
    : `0 0 ${baseGlow}px ${layer.color}40`;

  // Y position (bottom to top stacking)
  const yBase = 560 - layer.index * 130;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: yBase,
        transform: `translate(-50%, ${translateY}px) scaleY(${scaleY})`,
        opacity,
        width: 700,
        height: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: layer.color,
        borderRadius: 16,
        border: `2px solid ${errorBorderColor === "transparent" ? `${colors.white}20` : errorBorderColor}`,
        boxShadow: errorShadow,
        zIndex: layer.index + 1,
      }}
    >
      {/* Layer number */}
      <div
        style={{
          position: "absolute",
          left: 24,
          fontSize: 14,
          fontWeight: "bold",
          color: `${colors.white}60`,
          letterSpacing: 2,
        }}
      >
        LAYER {layer.index + 1}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
        }}
      >
        {layer.label}
      </div>

      {/* Error indicator on NLP layer */}
      {layer.index === 1 && errorOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            right: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: errorOpacity,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle
              cx={14}
              cy={14}
              r={12}
              fill={colors.oldRose}
              opacity={0.9}
            />
            <text
              x={14}
              y={19}
              textAnchor="middle"
              fontSize={18}
              fontWeight="bold"
              fill={colors.white}
              fontFamily="Inter, sans-serif"
            >
              !
            </text>
          </svg>
          <div
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.oldRose,
            }}
          >
            ERROR
          </div>
        </div>
      )}

      {/* Error ripple propagation arrow for layers above NLP */}
      {layer.index > 1 && errorOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            right: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: errorOpacity * 0.8,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M 12 20 L 12 4"
              stroke={colors.oldRose}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 6 10 L 12 4 L 18 10"
              stroke={colors.oldRose}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: colors.oldRose,
              opacity: 0.9,
            }}
          >
            PROPAGATED
          </div>
        </div>
      )}
    </div>
  );
};

export const Scene8Layers: React.FC = () => {
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

  // Layer spring animations (bottom to top, staggered)
  const layerProgresses = layers.map((layer) =>
    spring({
      frame,
      fps,
      delay: (1.5 + layer.index * 1.5) * fps,
      config: { damping: 10, stiffness: 60, mass: 1.2 },
    })
  );

  // Error appears on NLP layer after all layers are visible
  const errorStart = 9 * fps;
  const errorNLP = interpolate(
    frame,
    [errorStart, errorStart + fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Error propagates upward with delay
  const errorRiskModel = interpolate(
    frame,
    [errorStart + 0.8 * fps, errorStart + 1.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const errorHumanReview = interpolate(
    frame,
    [errorStart + 1.6 * fps, errorStart + 2.6 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const errorGlows = [0, errorNLP, errorRiskModel, errorHumanReview];

  // Error pulse effect (after errors are shown)
  const errorPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.7, 1]
  );
  const activeErrorGlows = errorGlows.map((g) => g * errorPulse);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 13 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  // Background circuit pattern
  const circuitOpacity = interpolate(
    frame,
    [0, 2 * fps],
    [0, 0.04],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkNavy,
        fontFamily,
      }}
    >
      {/* Background circuit lines */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: circuitOpacity }}
      >
        {/* Vertical lines */}
        {[300, 500, 700, 960, 1220, 1420, 1620].map((x, i) => (
          <line
            key={`cv-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={1080}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {/* Horizontal lines */}
        {[200, 340, 470, 600, 730].map((y, i) => (
          <line
            key={`ch-${i}`}
            x1={0}
            y1={y}
            x2={1920}
            y2={y}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {/* Circuit dots at intersections */}
        {[300, 500, 700, 960, 1220, 1420, 1620].map((x, xi) =>
          [200, 340, 470, 600, 730].map((y, yi) => (
            <circle
              key={`cd-${xi}-${yi}`}
              cx={x}
              cy={y}
              r={3}
              fill={colors.tiffanyBlue}
              opacity={0.5}
            />
          ))
        )}
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
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
          }}
        >
          Layered{" "}
          <span style={{ color: colors.tiffanyBlue }}>Systems</span>
        </div>
      </div>

      {/* Stacked layers */}
      {layers.map((layer, i) => (
        <StackLayer
          key={`layer-${i}`}
          layer={layer}
          progress={layerProgresses[i]}
          errorGlow={activeErrorGlows[i]}
          frame={frame}
        />
      ))}

      {/* Error propagation arrow visualization (red dashed line going up) */}
      {errorNLP > 0 && (
        <svg
          width="40"
          height="400"
          viewBox="0 0 40 400"
          style={{
            position: "absolute",
            left: "calc(50% + 370px)",
            top: 200,
            opacity: interpolate(errorNLP, [0, 1], [0, 0.6]),
            zIndex: 10,
          }}
        >
          <line
            x1={20}
            y1={380}
            x2={20}
            y2={380 - errorHumanReview * 360}
            stroke={colors.oldRose}
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        </svg>
      )}

      {/* Bottom text */}
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
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            fontSize: 32,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          At every layer,{" "}
          <span style={{ color: colors.oldRose }}>errors can accumulate.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
