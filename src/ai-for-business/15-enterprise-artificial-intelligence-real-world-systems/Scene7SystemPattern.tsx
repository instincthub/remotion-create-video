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
  icon: string;
  color: string;
  description: string;
}

const layers: Layer[] = [
  { label: "Data", icon: "01", color: colors.deepGreenCyanTurquoise, description: "Collect, clean, and prepare quality data" },
  { label: "Model", icon: "02", color: colors.darkCyra, description: "Train or configure the right AI model" },
  { label: "Integration", icon: "03", color: colors.viridianGreen, description: "Embed into existing business workflows" },
  { label: "Impact", icon: "04", color: colors.caribbeanGreen, description: "Measure real, quantifiable outcomes" },
];

export const Scene7SystemPattern: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Grid positions: [row][col] -> top-left, top-right, bottom-left, bottom-right
  const gridPositions = [
    { row: 0, col: 0 }, // Data
    { row: 0, col: 1 }, // Model
    { row: 1, col: 0 }, // Integration
    { row: 1, col: 1 }, // Impact
  ];

  const cardWidth = 700;
  const cardGapX = 40;
  const cardGapY = 30;
  const gridLeft = (1920 - cardWidth * 2 - cardGapX) / 2;
  const gridTop = 300;
  const cardHeight = 120;

  // Arrow animations
  const arrow1Progress = spring({ frame, fps, delay: 3 * fps, config: { damping: 10, stiffness: 60 } });
  const arrow2Progress = spring({ frame, fps, delay: 3.5 * fps, config: { damping: 10, stiffness: 60 } });
  const arrow3Progress = spring({ frame, fps, delay: 4 * fps, config: { damping: 10, stiffness: 60 } });

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle background grid */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.04 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`g-${i}`}
            x1={0}
            y1={i * 60}
            x2={1920}
            y2={i * 60}
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <line
            key={`gv-${i}`}
            x1={i * 60}
            y1={0}
            x2={i * 60}
            y2={1080}
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Pattern Across{" "}
          <span style={{ color: colors.darkCyra }}>All Cases</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 30,
            color: colors.rhythm,
            marginTop: 14,
          }}
        >
          Data → Model → Integration → Impact
        </div>
      </div>

      {/* 2x2 Grid of cards */}
      {layers.map((layer, i) => {
        const pos = gridPositions[i];
        const layerDelay = 2 * fps + i * 12;
        const layerProgress = spring({
          frame,
          fps,
          delay: layerDelay,
          config: { damping: 12, stiffness: 70 },
        });
        const layerOpacity = interpolate(layerProgress, [0, 1], [0, 1]);
        const layerScale = interpolate(layerProgress, [0, 1], [0.9, 1]);

        const left = gridLeft + pos.col * (cardWidth + cardGapX);
        const top = gridTop + pos.row * (cardHeight + cardGapY + 50);

        return (
          <div
            key={`layer-${i}`}
            style={{
              position: "absolute",
              left,
              top,
              width: cardWidth,
              opacity: layerOpacity,
              transform: `scale(${layerScale})`,
              background: `linear-gradient(135deg, ${layer.color} 0%, ${layer.color}dd 100%)`,
              borderRadius: 16,
              padding: "28px 36px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: `0 4px 20px ${layer.color}30`,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: `${colors.white}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: colors.white,
                flexShrink: 0,
              }}
            >
              {layer.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                {layer.label}
              </div>
              <div
                style={{
                  fontSize: 19,
                  color: `${colors.white}cc`,
                  marginTop: 4,
                }}
              >
                {layer.description}
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows between cards */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Arrow 1: Data (top-left) → Model (top-right) */}
        <g opacity={interpolate(arrow1Progress, [0, 1], [0, 0.7])}>
          <defs>
            <marker id="arrowhead-1" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={colors.darkCyra} />
            </marker>
          </defs>
          <line
            x1={gridLeft + cardWidth + 8}
            y1={gridTop + cardHeight / 2}
            x2={gridLeft + cardWidth + cardGapX - 8}
            y2={gridTop + cardHeight / 2}
            stroke={colors.darkCyra}
            strokeWidth={3}
            markerEnd="url(#arrowhead-1)"
          />
        </g>

        {/* Arrow 2: Model (top-right) → Integration (bottom-left) — diagonal */}
        <g opacity={interpolate(arrow2Progress, [0, 1], [0, 0.7])}>
          <defs>
            <marker id="arrowhead-2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={colors.darkCyra} />
            </marker>
          </defs>
          <line
            x1={gridLeft + cardWidth + cardGapX + cardWidth / 2}
            y1={gridTop + cardHeight + 8}
            x2={gridLeft + cardWidth / 2}
            y2={gridTop + cardHeight + cardGapY + 50 - 8}
            stroke={colors.darkCyra}
            strokeWidth={3}
            markerEnd="url(#arrowhead-2)"
          />
        </g>

        {/* Arrow 3: Integration (bottom-left) → Impact (bottom-right) */}
        <g opacity={interpolate(arrow3Progress, [0, 1], [0, 0.7])}>
          <defs>
            <marker id="arrowhead-3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={colors.darkCyra} />
            </marker>
          </defs>
          <line
            x1={gridLeft + cardWidth + 8}
            y1={gridTop + cardHeight + cardGapY + 50 + cardHeight / 2}
            x2={gridLeft + cardWidth + cardGapX - 8}
            y2={gridTop + cardHeight + cardGapY + 50 + cardHeight / 2}
            stroke={colors.darkCyra}
            strokeWidth={3}
            markerEnd="url(#arrowhead-3)"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
