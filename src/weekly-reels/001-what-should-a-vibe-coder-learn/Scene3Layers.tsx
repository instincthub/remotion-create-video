import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const LAYERS = [
  { label: "Frontend", color: colors.caribbeanGreen },
  { label: "Backend", color: colors.tiffanyBlue },
  { label: "Database", color: colors.viridianGreen },
  { label: "APIs", color: colors.darkCyra },
  { label: "Hosting", color: colors.deepGreenCyanTurquoise },
];

// Animated data particles flowing between layers
const DataParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  if (!active) return null;

  const particles = [
    { startX: 200, lane: 0 },
    { startX: 260, lane: 1 },
    { startX: 320, lane: 2 },
    { startX: 170, lane: 0 },
    { startX: 380, lane: 1 },
  ];

  return (
    <>
      {particles.map((p, i) => {
        const speed = 2.5 + i * 0.3;
        const y = ((frame * speed + i * 60) % 320);
        const opacity = interpolate(y, [0, 40, 280, 320], [0, 0.6, 0.6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.startX + Math.sin(frame * 0.04 + i) * 20,
              top: 440 + y,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.tiffanyBlue,
              opacity,
              boxShadow: `0 0 8px ${colors.tiffanyBlue}60`,
            }}
          />
        );
      })}
    </>
  );
};

export const Scene3Layers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  // Are all layers visible?
  const allLayersDelay = 2 * fps + LAYERS.length * fps * 0.7;
  const allVisible = frame > allLayersDelay + fps;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily }}>
      {/* Dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.chineseSilver}25 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Data particles flowing through layers */}
      <DataParticles active={allVisible} />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 30,
        }}
      >
        {/* Heading */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          Every app has layers
        </div>

        {/* 3D-style layer stack */}
        <div style={{ position: "relative", width: 500, height: 420 }}>
          {LAYERS.map((layer, i) => {
            const layerDelay = 2 * fps + i * fps * 0.7;
            const layerProgress = spring({
              frame,
              fps,
              delay: layerDelay,
              config: { damping: 200 },
            });
            const layerOpacity = interpolate(layerProgress, [0, 1], [0, 1]);
            const layerY = interpolate(layerProgress, [0, 1], [80, 0]);

            // Hover effect when active
            const isHighlighted =
              frame > layerDelay + fps * 0.5 && frame < layerDelay + fps * 2;
            const hoverScale = isHighlighted
              ? interpolate(
                  Math.sin((frame - layerDelay) * 0.1),
                  [-1, 1],
                  [1, 1.03],
                )
              : 1;

            const yPos = 10 + i * 78;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 20 + i * 6,
                  top: yPos,
                  width: 460 - i * 12,
                  opacity: layerOpacity,
                  transform: `translateY(${layerY}px) scale(${hoverScale})`,
                }}
              >
                {/* Layer block with 3D depth effect */}
                <div style={{ position: "relative" }}>
                  {/* Shadow/depth */}
                  <div
                    style={{
                      position: "absolute",
                      left: 6,
                      top: 6,
                      width: "100%",
                      height: 60,
                      borderRadius: 14,
                      backgroundColor: `${layer.color}20`,
                    }}
                  />
                  {/* Main block */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 24px",
                      borderRadius: 14,
                      backgroundColor: colors.white,
                      border: `2.5px solid ${layer.color}`,
                      boxShadow: isHighlighted
                        ? `0 4px 20px ${layer.color}30`
                        : "0 2px 8px rgba(0,0,0,0.04)",
                      position: "relative",
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        backgroundColor: `${layer.color}15`,
                        border: `2px solid ${layer.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        {i === 0 && (
                          <>
                            <rect x="3" y="3" width="16" height="12" rx="2" stroke={layer.color} strokeWidth={2} />
                            <line x1="11" y1="15" x2="11" y2="19" stroke={layer.color} strokeWidth={2} />
                            <line x1="7" y1="19" x2="15" y2="19" stroke={layer.color} strokeWidth={2} />
                          </>
                        )}
                        {i === 1 && (
                          <>
                            <rect x="3" y="4" width="16" height="6" rx="2" stroke={layer.color} strokeWidth={2} />
                            <rect x="3" y="12" width="16" height="6" rx="2" stroke={layer.color} strokeWidth={2} />
                            <circle cx="7" cy="7" r="1.5" fill={layer.color} />
                            <circle cx="7" cy="15" r="1.5" fill={layer.color} />
                          </>
                        )}
                        {i === 2 && (
                          <>
                            <ellipse cx="11" cy="7" rx="7" ry="3" stroke={layer.color} strokeWidth={2} />
                            <path d="M4 7v8c0 1.7 3.1 3 7 3s7-1.3 7-3V7" stroke={layer.color} strokeWidth={2} />
                          </>
                        )}
                        {i === 3 && (
                          <>
                            <circle cx="6" cy="11" r="4" stroke={layer.color} strokeWidth={2} />
                            <circle cx="16" cy="11" r="4" stroke={layer.color} strokeWidth={2} />
                            <line x1="10" y1="11" x2="12" y2="11" stroke={layer.color} strokeWidth={2} />
                          </>
                        )}
                        {i === 4 && (
                          <path
                            d="M5 16c-2 0-3.5-1.5-3.5-3.5 0-1.6 1.1-3 2.6-3.4C4.5 6.5 6.3 5 8.5 5c2.3 0 4.2 1.7 4.6 3.9C15.3 9.2 17 11 17 13.2c0 1.5-1.2 2.8-2.8 2.8H5z"
                            stroke={layer.color}
                            strokeWidth={2}
                            fill={`${layer.color}15`}
                          />
                        )}
                      </svg>
                    </div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: layer.color }}>
                      {layer.label}
                    </div>
                    {/* Connection line down */}
                    {i < LAYERS.length - 1 && allVisible && (
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          bottom: -20,
                          width: 2,
                          height: 18,
                          background: `linear-gradient(180deg, ${layer.color}60, ${LAYERS[i + 1].color}60)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
