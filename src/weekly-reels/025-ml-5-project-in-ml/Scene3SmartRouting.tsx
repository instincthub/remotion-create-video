import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Route arrow with label
const RouteArrow: React.FC<{
  fromY: number;
  toY: number;
  label: string;
  color: string;
  delay: number;
}> = ({ fromY, toY, label, color, delay }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame - delay,
    [0, 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const midX = 350;
  const endX = 530;

  return (
    <g opacity={progress}>
      <path
        d={`M230 ${fromY} Q${midX} ${fromY} ${endX} ${toY}`}
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeDasharray="6 4"
        opacity={0.6}
      />
      <polygon
        points={`${endX - 5},${toY - 5} ${endX + 5},${toY} ${endX - 5},${toY + 5}`}
        fill={color}
        opacity={0.6}
      />
      <text
        x={midX}
        y={((fromY + toY) / 2) - 8}
        fontSize="12"
        fill={color}
        textAnchor="middle"
        fontWeight="700"
        opacity={0.8}
      >
        {label}
      </text>
    </g>
  );
};

export const Scene3SmartRouting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Diagram entrance
  const diagramEntrance = spring({ frame, fps, delay: 12, config: { damping: 200 } });
  const diagramOpacity = interpolate(diagramEntrance, [0, 1], [0, 1]);
  const diagramScale = interpolate(diagramEntrance, [0, 1], [0.8, 1]);

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
          paddingLeft: 30,
          paddingRight: 30,
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Smart
          <br />
          <span style={{ color: colors.caribbeanGreen }}>Routing</span>
        </div>

        {/* Routing diagram */}
        <div style={{ opacity: diagramOpacity, transform: `scale(${diagramScale})` }}>
          <svg width="750" height="380" viewBox="0 0 750 380" fill="none">
            {/* ML Analyzer box (left) */}
            <rect x="60" y="120" width="170" height="140" rx="16" fill={`${colors.tiffanyBlue}10`} stroke={colors.tiffanyBlue} strokeWidth={2} />
            <text x="145" y="180" fontSize="20" fontWeight="700" fill={colors.tiffanyBlue} textAnchor="middle">ML</text>
            <text x="145" y="205" fontSize="14" fill={colors.tiffanyBlue} textAnchor="middle">Analyzer</text>

            {/* Incoming messages (left side) */}
            {[0, 1, 2].map((i) => {
              const msgDelay = 15 + i * 12;
              const msgProgress = interpolate(
                frame - msgDelay,
                [0, 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              const msgX = interpolate(msgProgress, [0, 1], [-30, 25]);
              return (
                <g key={i} opacity={msgProgress}>
                  <rect
                    x={msgX}
                    y={148 + i * 35}
                    width={30}
                    height={22}
                    rx={4}
                    fill={`${colors.rhythm}30`}
                    stroke={colors.rhythm}
                    strokeWidth={1}
                  />
                  <path
                    d={`M${msgX + 30} ${159 + i * 35} L60 ${159 + i * 35}`}
                    stroke={colors.rhythm}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                </g>
              );
            })}

            {/* Team members (right side) */}
            {[
              { y: 100, label: "Sales", color: colors.limeGreen },
              { y: 190, label: "Support", color: colors.corn },
              { y: 280, label: "Urgent", color: colors.oldRose },
            ].map((member, i) => {
              const memberDelay = 30 + i * 15;
              const memberEntrance = spring({
                frame,
                fps,
                delay: memberDelay,
                config: { damping: 14, stiffness: 80 },
              });
              const memberScale = interpolate(memberEntrance, [0, 1], [0, 1]);
              const pulse = Math.sin(frame * 0.06 + i * 2) * 0.04 + 1;

              return (
                <g key={i} transform={`translate(550, ${member.y}) scale(${memberScale * pulse})`}>
                  {/* Person icon */}
                  <circle cx="0" cy="0" r="24" fill={`${member.color}15`} stroke={member.color} strokeWidth={2} />
                  <circle cx="0" cy="-5" r="7" fill={`${member.color}40`} />
                  <path d="M-12 12 Q-12 2 0 2 Q12 2 12 12" fill={`${member.color}30`} />
                  {/* Label */}
                  <text x="36" y="5" fontSize="16" fontWeight="700" fill={member.color}>{member.label}</text>
                </g>
              );
            })}

            {/* Routing arrows */}
            <RouteArrow fromY={160} toY={100} label="Positive" color={colors.limeGreen} delay={55} />
            <RouteArrow fromY={190} toY={190} label="Neutral" color={colors.corn} delay={70} />
            <RouteArrow fromY={220} toY={280} label="Urgent" color={colors.oldRose} delay={85} />
          </svg>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: diagramOpacity,
          }}
        >
          Route to the right person instantly
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
