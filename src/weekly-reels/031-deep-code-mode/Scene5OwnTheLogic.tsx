import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const actions = [
  { label: "Investigate", color: colors.tiffanyBlue, icon: "magnify" },
  { label: "Verify", color: colors.caribbeanGreen, icon: "shield" },
  { label: "Own It", color: colors.darkCyra, icon: "crown" },
];

export const Scene5OwnTheLogic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Brain with code nodes */}
        <svg width="220" height="200" viewBox="0 0 220 200" fill="none">
          {/* Brain */}
          <path
            d="M110 30 Q85 30 78 50 Q65 48 63 65 Q52 70 55 88 Q52 100 62 108 Q60 118 72 125 Q78 135 95 135 Q105 140 110 137 Q115 140 125 135 Q142 135 148 125 Q160 118 158 108 Q168 100 165 88 Q168 70 157 65 Q155 48 142 50 Q135 30 110 30Z"
            fill={`${colors.darkCyra}10`}
            stroke={colors.darkCyra}
            strokeWidth={2.5}
          />
          {/* Code nodes connected to brain */}
          {[
            { x: 30, y: 60, bx: 78, by: 55 },
            { x: 190, y: 60, bx: 142, by: 55 },
            { x: 20, y: 130, bx: 65, by: 108 },
            { x: 200, y: 130, bx: 155, by: 108 },
            { x: 110, y: 175, bx: 110, by: 137 },
          ].map((node, i) => {
            const pulseOpacity = Math.sin(frame * 0.08 + i * 1.5) * 0.3 + 0.5;
            const nodeEntrance = spring({
              frame,
              fps,
              delay: 15 + i * 10,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <g key={i} opacity={interpolate(nodeEntrance, [0, 1], [0, 1])}>
                {/* Connection line */}
                <line
                  x1={node.bx}
                  y1={node.by}
                  x2={node.x}
                  y2={node.y}
                  stroke={colors.darkCyra}
                  strokeWidth={1.5}
                  opacity={pulseOpacity}
                  strokeDasharray="4 3"
                />
                {/* Node */}
                <circle cx={node.x} cy={node.y} r="12" fill={`${colors.darkCyra}20`} stroke={colors.darkCyra} strokeWidth={1.5} />
                {/* Code bracket inside */}
                <path
                  d={`M${node.x - 4} ${node.y - 4} L${node.x - 7} ${node.y} L${node.x - 4} ${node.y + 4}`}
                  stroke={colors.darkCyra}
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M${node.x + 4} ${node.y - 4} L${node.x + 7} ${node.y} L${node.x + 4} ${node.y + 4}`}
                  stroke={colors.darkCyra}
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Energy pulse */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={12 + Math.sin(frame * 0.1 + i) * 3}
                  fill="none"
                  stroke={colors.darkCyra}
                  strokeWidth={1}
                  opacity={pulseOpacity * 0.4}
                />
              </g>
            );
          })}
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Own the <span style={{ color: colors.darkCyra }}>Technology</span>
        </div>

        {/* Action items */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
          }}
        >
          {actions.map((action, i) => {
            const actionEntrance = spring({
              frame,
              fps,
              delay: 40 + i * 20,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={action.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 20px",
                  borderRadius: 14,
                  backgroundColor: `${action.color}08`,
                  border: `1.5px solid ${action.color}30`,
                  opacity: interpolate(actionEntrance, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(actionEntrance, [0, 1], [0.8, 1])})`,
                  minWidth: 110,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  {action.icon === "magnify" && (
                    <>
                      <circle cx="16" cy="16" r="10" stroke={action.color} strokeWidth={2} fill={`${action.color}10`} />
                      <line x1="24" y1="24" x2="32" y2="32" stroke={action.color} strokeWidth={2.5} strokeLinecap="round" />
                    </>
                  )}
                  {action.icon === "shield" && (
                    <>
                      <path d="M18 4 L32 12 L32 20 Q32 30 18 34 Q4 30 4 20 L4 12 Z" stroke={action.color} strokeWidth={2} fill={`${action.color}10`} />
                      <path d="M12 18 L16 22 L24 14" stroke={action.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {action.icon === "crown" && (
                    <path
                      d="M6 28 L6 14 L13 20 L18 8 L23 20 L30 14 L30 28 Z"
                      stroke={action.color}
                      strokeWidth={2}
                      fill={`${action.color}15`}
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                <span style={{ fontSize: 18, color: action.color, fontWeight: 700 }}>
                  {action.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
