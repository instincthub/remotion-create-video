import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Architecture diagram with connecting boxes
const ArchitectureDiagram: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const nodes = [
    { x: 960, y: 290, label: "AI MODEL", color: colors.darkCyra, w: 220 },
    { x: 560, y: 460, label: "DATABASE", color: colors.viridianGreen, w: 200 },
    { x: 960, y: 460, label: "APIs", color: colors.tiffanyBlue, w: 180 },
    { x: 1360, y: 460, label: "ERP / CRM", color: colors.metallicBlue, w: 200 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
      }}
    >
      <svg width="1920" height="1080">
        {/* Connection lines with animated dashes */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const dashOffset = (frame * 2) % 30;
          return (
            <line
              key={`conn-${i}`}
              x1={from.x}
              y1={from.y + 40}
              x2={to.x}
              y2={to.y - 40}
              stroke={`${colors.chineseSilver}`}
              strokeWidth={2}
              strokeDasharray="8 4"
              strokeDashoffset={-dashOffset}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pulse =
            i === 0
              ? Math.sin(frame * 0.05) * 0.1 + 0.9
              : 1;
          return (
            <g key={`node-${i}`}>
              <rect
                x={node.x - node.w / 2}
                y={node.y - 35}
                width={node.w}
                height={70}
                rx={12}
                fill={`${node.color}12`}
                stroke={node.color}
                strokeWidth={2.5}
                opacity={pulse}
              />
              <text
                x={node.x}
                y={node.y + 8}
                textAnchor="middle"
                fill={node.color}
                fontSize={24}
                fontWeight={700}
                fontFamily={fontFamily}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const Scene5Deploy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage badge
  const badgeProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.3),
    config: { damping: 12, stiffness: 100 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.8, 1]);

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Keywords
  const keywords = ["Integrate", "Secure", "Validate"];
  const keywordProgresses = keywords.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * (3 + i * 1)),
      config: { damping: 12, stiffness: 90 },
    }),
  );

  // Architecture diagram
  const archProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 6),
    config: { damping: 14, stiffness: 80 },
  });

  // Security/ethics icons
  const iconItems = [
    { label: "Security", icon: "shield", color: colors.oldRose },
    { label: "Ethics", icon: "balance", color: colors.viridianGreen },
    { label: "Testing", icon: "check", color: colors.darkCyra },
    { label: "Archival", icon: "archive", color: colors.metallicBlue },
  ];

  const iconProgresses = iconItems.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * (10 + i * 1.2)),
      config: { damping: 12, stiffness: 80 },
    }),
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Stage badge */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) scale(${badgeScale})`,
          opacity: badgeOpacity,
          background: colors.viridianGreen,
          color: colors.white,
          padding: "10px 32px",
          borderRadius: 30,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        STAGE 2
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Deploy
        </span>
      </div>

      {/* Keywords */}
      <div
        style={{
          position: "absolute",
          top: 550,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {keywords.map((word, i) => {
          const prog = keywordProgresses[i];
          const kOpacity = interpolate(prog, [0, 1], [0, 1]);
          const kY = interpolate(prog, [0, 1], [20, 0]);
          return (
            <div
              key={word}
              style={{
                opacity: kOpacity,
                transform: `translateY(${kY}px)`,
                fontSize: 28,
                fontWeight: 700,
                color: colors.viridianGreen,
                background: `${colors.viridianGreen}10`,
                padding: "8px 24px",
                borderRadius: 8,
                border: `2px solid ${colors.viridianGreen}30`,
              }}
            >
              {word}
            </div>
          );
        })}
      </div>

      {/* Architecture diagram */}
      <ArchitectureDiagram progress={archProgress} />

      {/* Bottom requirement icons */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {iconItems.map((item, i) => {
          const prog = iconProgresses[i];
          const iOpacity = interpolate(prog, [0, 1], [0, 1]);
          const iY = interpolate(prog, [0, 1], [20, 0]);
          return (
            <div
              key={item.label}
              style={{
                opacity: iOpacity,
                transform: `translateY(${iY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: `${item.color}12`,
                  border: `2px solid ${item.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24">
                  {item.icon === "shield" && (
                    <path
                      d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.3 4.6-1.15 8-6.05 8-11.3V6l-8-4z"
                      fill="none"
                      stroke={item.color}
                      strokeWidth={2}
                    />
                  )}
                  {item.icon === "balance" && (
                    <>
                      <line x1="12" y1="3" x2="12" y2="21" stroke={item.color} strokeWidth={2} />
                      <line x1="4" y1="8" x2="20" y2="8" stroke={item.color} strokeWidth={2} />
                      <path d="M4 8L6 14H2L4 8z" fill={item.color} opacity={0.5} />
                      <path d="M20 8L22 14H18L20 8z" fill={item.color} opacity={0.5} />
                    </>
                  )}
                  {item.icon === "check" && (
                    <polyline
                      points="4,12 10,18 20,6"
                      fill="none"
                      stroke={item.color}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {item.icon === "archive" && (
                    <>
                      <rect x="3" y="3" width="18" height="6" rx="2" fill="none" stroke={item.color} strokeWidth={2} />
                      <rect x="5" y="9" width="14" height="12" rx="2" fill="none" stroke={item.color} strokeWidth={2} />
                      <line x1="10" y1="14" x2="14" y2="14" stroke={item.color} strokeWidth={2} />
                    </>
                  )}
                </svg>
              </div>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
