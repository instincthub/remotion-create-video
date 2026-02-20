import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene4SystemLayers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Layer definitions (bottom to top)
  const layers = [
    { label: "Data Selection & Cleaning", color: colors.deepGreenCyanTurquoise },
    { label: "Feature Engineering", color: colors.viridianGreen },
    { label: "Model Training & Evaluation", color: colors.darkCyra },
    { label: "API & Integration", color: colors.tiffanyBlue },
    { label: "User Interface", color: colors.caribbeanGreen },
    { label: "Business Action", color: colors.metallicBlue },
  ];

  const layerHeight = 84;
  const layerGap = 14;
  const layerWidth = 680;
  const centerX = 960;
  const totalStackHeight = layers.length * layerHeight + (layers.length - 1) * layerGap;
  const startY = 830 - (830 - 160 - totalStackHeight) / 2;

  // Right side flow labels
  const flowLabels = [
    { label: "Prediction", delay: 14 },
    { label: "Decision", delay: 16 },
    { label: "Impact", delay: 18 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          AI Is a{" "}
          <span style={{ color: colors.darkCyra }}>System</span>
        </span>
      </div>

      {/* Layer stack */}
      {layers.map((layer, i) => {
        const layerProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * (2 + i * 1.5)),
          config: { damping: 14, stiffness: 80 },
        });
        const layerOpacity = interpolate(layerProgress, [0, 1], [0, 1]);
        const layerYAnim = interpolate(layerProgress, [0, 1], [60, 0]);

        const y = startY - i * (layerHeight + layerGap);

        return (
          <div key={layer.label}>
            <div
              style={{
                position: "absolute",
                top: y,
                left: centerX - layerWidth / 2,
                width: layerWidth,
                height: layerHeight,
                opacity: layerOpacity,
                transform: `translateY(${layerYAnim}px)`,
                background: `${layer.color}18`,
                border: `3px solid ${layer.color}50`,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: layer.color,
                }}
              >
                {layer.label}
              </span>
            </div>

            {/* Connecting arrow to layer above */}
            {i < layers.length - 1 && (
              <svg
                width="24"
                height={layerGap + 2}
                viewBox={`0 0 24 ${layerGap + 2}`}
                style={{
                  position: "absolute",
                  top: y - layerGap,
                  left: centerX - 12,
                  opacity: layerOpacity,
                }}
              >
                <polygon
                  points={`12,0 24,${layerGap} 0,${layerGap}`}
                  fill={layer.color}
                  opacity={0.7}
                />
              </svg>
            )}
          </div>
        );
      })}

      {/* Right side: Flow labels */}
      {flowLabels.map((fl, i) => {
        const flProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * fl.delay),
          config: { damping: 12, stiffness: 80 },
        });
        const flOpacity = interpolate(flProgress, [0, 1], [0, 1]);
        const flX = interpolate(flProgress, [0, 1], [40, 0]);

        return (
          <div
            key={fl.label}
            style={{
              position: "absolute",
              top: 280 + i * 160,
              right: 140,
              opacity: flOpacity,
              transform: `translateX(${flX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30">
              <polygon
                points="0,5 20,15 0,25"
                fill={colors.darkCyra}
                opacity={0.8}
              />
            </svg>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: colors.darkCyra,
              }}
            >
              {fl.label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
