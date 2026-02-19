import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Full visual flow diagram: Phone -> Cloud -> Database -> back
const FlowDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 1.5 * fps, config: { damping: 200 } });
  const diagramOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Animated data packet traveling through the flow
  const packetCycleDuration = 4 * fps;
  const packetPhase = ((frame - 4 * fps) / packetCycleDuration) % 1;
  const packetActive = frame > 4 * fps;

  // Path positions for the data packet (phone -> server -> db -> back)
  const packetX = packetActive
    ? interpolate(
        packetPhase,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [160, 160, 160, 160, 160, 160],
        { extrapolateRight: "clamp" },
      )
    : 160;
  const packetY = packetActive
    ? interpolate(
        packetPhase,
        [0, 0.25, 0.5, 0.75, 1],
        [100, 210, 330, 210, 100],
        { extrapolateRight: "clamp" },
      )
    : 100;

  // Each node lights up in sequence
  const nodeHighlight = (nodeIndex: number) => {
    if (!packetActive) return 0;
    const ranges: [number, number][] = [
      [0, 0.15],
      [0.2, 0.35],
      [0.4, 0.6],
      [0.65, 0.8],
    ];
    const [start, end] = ranges[nodeIndex] ?? [0, 0];
    if (packetPhase >= start && packetPhase <= end) {
      return interpolate(
        packetPhase,
        [start, (start + end) / 2, end],
        [0, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
    }
    return 0;
  };

  const nodes = [
    { label: "User", y: 60, icon: "user", nodeIdx: 0, delay: 2 * fps },
    { label: "Server", y: 175, icon: "server", nodeIdx: 1, delay: 3 * fps },
    { label: "Database", y: 290, icon: "db", nodeIdx: 2, delay: 4 * fps },
  ];

  return (
    <div style={{ opacity: diagramOpacity, position: "relative", width: 420, height: 440 }}>
      {/* Connection lines */}
      {nodes.slice(0, -1).map((node, i) => {
        const lineDelay = node.delay + fps * 0.5;
        const lineProgress = spring({ frame, fps, delay: lineDelay, config: { damping: 200 } });
        const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.4]);
        const nextNode = nodes[i + 1];
        return (
          <div key={`line-${i}`}>
            {/* Down arrow */}
            <svg
              style={{
                position: "absolute",
                left: 170,
                top: node.y + 80,
                opacity: lineOpacity,
              }}
              width="80"
              height={nextNode.y - node.y - 60}
              viewBox={`0 0 80 ${nextNode.y - node.y - 60}`}
              fill="none"
            >
              <line x1="40" y1="0" x2="40" y2={nextNode.y - node.y - 80} stroke={colors.darkCyra} strokeWidth={2} strokeDasharray="6 4" />
              <path d={`M30 ${nextNode.y - node.y - 85} L40 ${nextNode.y - node.y - 70} L50 ${nextNode.y - node.y - 85}`} stroke={colors.darkCyra} strokeWidth={2} fill="none" />
            </svg>
            {/* Return arrow (right side) */}
            <svg
              style={{
                position: "absolute",
                left: 290,
                top: node.y + 80,
                opacity: lineOpacity * 0.6,
              }}
              width="40"
              height={nextNode.y - node.y - 60}
              viewBox={`0 0 40 ${nextNode.y - node.y - 60}`}
              fill="none"
            >
              <line x1="20" y1={nextNode.y - node.y - 80} x2="20" y2="0" stroke={colors.caribbeanGreen} strokeWidth={2} strokeDasharray="6 4" />
              <path d={`M10 15 L20 0 L30 15`} stroke={colors.caribbeanGreen} strokeWidth={2} fill="none" />
            </svg>
          </div>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const nodeProgress = spring({ frame, fps, delay: node.delay, config: { damping: 200 } });
        const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
        const nodeScale = interpolate(nodeProgress, [0, 1], [0.7, 1]);
        const highlight = nodeHighlight(node.nodeIdx);
        const glowSize = highlight * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 60,
              top: node.y,
              width: 300,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: nodeOpacity,
              transform: `scale(${nodeScale})`,
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: highlight > 0 ? `${colors.darkCyra}20` : colors.magnolia,
                border: `3px solid ${highlight > 0 ? colors.darkCyra : colors.chineseSilver}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: highlight > 0 ? `0 0 ${glowSize}px ${colors.darkCyra}40` : "none",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                {node.icon === "user" && (
                  <>
                    <circle cx="18" cy="12" r="6" stroke={colors.darkCyra} strokeWidth={2.5} />
                    <path d="M6 30c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke={colors.darkCyra} strokeWidth={2.5} />
                  </>
                )}
                {node.icon === "server" && (
                  <>
                    <rect x="6" y="6" width="24" height="10" rx="3" stroke={colors.darkCyra} strokeWidth={2.5} fill={`${colors.darkCyra}10`} />
                    <rect x="6" y="20" width="24" height="10" rx="3" stroke={colors.darkCyra} strokeWidth={2.5} fill={`${colors.darkCyra}10`} />
                    <circle cx="12" cy="11" r="2" fill={colors.caribbeanGreen} />
                    <circle cx="12" cy="25" r="2" fill={colors.caribbeanGreen} />
                    <rect x="18" y="10" width="8" height="2" rx="1" fill={colors.darkCyra} opacity={0.4} />
                    <rect x="18" y="24" width="8" height="2" rx="1" fill={colors.darkCyra} opacity={0.4} />
                  </>
                )}
                {node.icon === "db" && (
                  <>
                    <ellipse cx="18" cy="10" rx="10" ry="5" stroke={colors.darkCyra} strokeWidth={2.5} fill={`${colors.darkCyra}10`} />
                    <path d="M8 10v14c0 2.8 4.5 5 10 5s10-2.2 10-5V10" stroke={colors.darkCyra} strokeWidth={2.5} />
                    <path d="M8 18c0 2.8 4.5 5 10 5s10-2.2 10-5" stroke={colors.darkCyra} strokeWidth={2.5} />
                  </>
                )}
              </svg>
            </div>
            {/* Label */}
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.darkSlateGray }}>
                {node.label}
              </div>
              <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 2 }}>
                {node.icon === "user" && "Clicks a button"}
                {node.icon === "server" && "Processes request"}
                {node.icon === "db" && "Stores & retrieves"}
              </div>
            </div>
          </div>
        );
      })}

      {/* Animated data packet */}
      {packetActive && (
        <div
          style={{
            position: "absolute",
            left: packetX,
            top: packetY,
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: colors.tiffanyBlue,
            boxShadow: `0 0 12px ${colors.tiffanyBlue}80, 0 0 24px ${colors.tiffanyBlue}40`,
          }}
        />
      )}
    </div>
  );
};

export const Scene4DataFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  // "Bug lives here" callout
  const bugDelay = 12 * fps;
  const bugProgress = spring({ frame, fps, delay: bugDelay, config: { damping: 200 } });
  const bugOpacity = interpolate(bugProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.magnolia}, ${colors.white})`,
        fontFamily,
      }}
    >
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
          gap: 20,
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
          Understand the flow
        </div>

        {/* Flow diagram */}
        <FlowDiagram />

        {/* Bug callout */}
        <div
          style={{
            padding: "14px 28px",
            borderRadius: 14,
            backgroundColor: `${colors.oldRose}10`,
            border: `2px solid ${colors.oldRose}40`,
            opacity: bugOpacity,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, color: colors.gunmetal, lineHeight: 1.5 }}>
            If one connection fails...{" "}
            <span style={{ fontWeight: 700, color: colors.oldRose }}>
              that{"'"}s where your bug lives.
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
