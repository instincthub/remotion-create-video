import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ENGINES = [
  { label: "Engine A", subtitle: "Risk Scoring", color: colors.darkCyra, x: 280 },
  { label: "Engine B", subtitle: "Fraud Analysis", color: colors.viridianGreen, x: 960 },
  { label: "Engine C", subtitle: "Compliance", color: colors.metallicBlue, x: 1640 },
];

export const Scene8Federation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Engine boxes entrance
  const engineEntrances = ENGINES.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * 15,
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // Central arbitrator entrance
  const arbProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const arbOpacity = interpolate(arbProgress, [0, 1], [0, 1]);
  const arbScale = interpolate(arbProgress, [0, 1], [0.6, 1]);

  // Connection lines
  const connProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const connOpacity = interpolate(connProgress, [0, 1], [0, 1]);

  // Output arrow
  const outputProgress = spring({
    frame,
    fps,
    delay: 5.5 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const outputOpacity = interpolate(outputProgress, [0, 1], [0, 1]);

  // Data pulse animation
  const pulsePhase = frame * 0.04;

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Metallic blue overlay pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, ${colors.metallicBlue}08 0%, transparent 40%, transparent 60%, ${colors.metallicBlue}05 100%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Federated{" "}
          <span style={{ color: colors.metallicBlue }}>Decision Systems</span>
        </div>
      </div>

      {/* Federation architecture */}
      <AbsoluteFill style={{ paddingBottom: 200, paddingTop: 60 }}>
        <svg width="1920" height="800" viewBox="0 0 1920 800">
          <defs>
            <filter id="fedGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Engine boxes */}
          {ENGINES.map((engine, i) => {
            const entrance = engineEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const scale = interpolate(entrance, [0, 1], [0.7, 1]);
            const boxW = 280;
            const boxH = 160;

            return (
              <g
                key={engine.label}
                opacity={opacity}
                transform={`translate(${engine.x}, 250) scale(${scale}) translate(${-engine.x}, -250)`}
              >
                <rect
                  x={engine.x - boxW / 2}
                  y={250 - boxH / 2}
                  width={boxW}
                  height={boxH}
                  rx={16}
                  fill={colors.white}
                  stroke={engine.color}
                  strokeWidth={3}
                />
                {/* Icon */}
                <circle
                  cx={engine.x}
                  cy={250 - 25}
                  r={20}
                  fill={`${engine.color}15`}
                  stroke={engine.color}
                  strokeWidth={2}
                />
                <circle
                  cx={engine.x}
                  cy={250 - 25}
                  r={8}
                  fill={engine.color}
                  opacity={0.6}
                />
                {/* Label */}
                <text
                  x={engine.x}
                  y={250 + 20}
                  textAnchor="middle"
                  fill={colors.darkSlateGray}
                  fontSize={22}
                  fontFamily={fontFamily}
                  fontWeight={700}
                >
                  {engine.label}
                </text>
                <text
                  x={engine.x}
                  y={250 + 48}
                  textAnchor="middle"
                  fill={colors.rhythm}
                  fontSize={16}
                  fontFamily={fontFamily}
                >
                  {engine.subtitle}
                </text>
              </g>
            );
          })}

          {/* Connection lines from engines to arbitrator */}
          {ENGINES.map((engine, i) => {
            const pulse = Math.sin(pulsePhase + i * 1.5) * 0.3 + 0.7;

            return (
              <g key={`conn-${i}`} opacity={connOpacity}>
                <line
                  x1={engine.x}
                  y1={330}
                  x2={960}
                  y2={500}
                  stroke={engine.color}
                  strokeWidth={2.5}
                  opacity={pulse}
                  strokeDasharray="8 4"
                />
                {/* Data pulse dot */}
                {(() => {
                  const t = ((frame * 0.015 + i * 0.33) % 1);
                  const px = engine.x + (960 - engine.x) * t;
                  const py = 330 + (500 - 330) * t;
                  return (
                    <circle
                      cx={px}
                      cy={py}
                      r={5}
                      fill={engine.color}
                      opacity={0.9}
                      filter="url(#fedGlow)"
                    />
                  );
                })()}
              </g>
            );
          })}

          {/* Central arbitrator */}
          <g
            opacity={arbOpacity}
            transform={`translate(960, 550) scale(${arbScale}) translate(-960, -550)`}
          >
            {/* Outer glow ring */}
            <circle
              cx={960}
              cy={550}
              r={75}
              fill="none"
              stroke={colors.darkCyra}
              strokeWidth={2}
              opacity={0.3 + Math.sin(frame * 0.05) * 0.15}
              filter="url(#fedGlow)"
            />
            {/* Main box */}
            <rect
              x={860}
              y={495}
              width={200}
              height={110}
              rx={20}
              fill={colors.darkCyra}
            />
            {/* Icon */}
            <svg x={935} y={505} width={50} height={40} viewBox="0 0 50 40">
              <rect
                x={5}
                y={5}
                width={40}
                height={30}
                rx={4}
                fill="none"
                stroke={colors.white}
                strokeWidth={2}
              />
              <line
                x1={5}
                y1={15}
                x2={45}
                y2={15}
                stroke={colors.white}
                strokeWidth={1.5}
              />
              <line
                x1={25}
                y1={15}
                x2={25}
                y2={35}
                stroke={colors.white}
                strokeWidth={1.5}
              />
            </svg>
            <text
              x={960}
              y={575}
              textAnchor="middle"
              fill={colors.white}
              fontSize={18}
              fontFamily={fontFamily}
              fontWeight={700}
            >
              Arbitrator
            </text>
          </g>

          {/* Output arrow */}
          <g opacity={outputOpacity}>
            <line
              x1={960}
              y1={610}
              x2={960}
              y2={700}
              stroke={colors.caribbeanGreen}
              strokeWidth={3}
            />
            <polygon
              points="950,700 960,720 970,700"
              fill={colors.caribbeanGreen}
            />
            <text
              x={960}
              y={750}
              textAnchor="middle"
              fill={colors.caribbeanGreen}
              fontSize={20}
              fontFamily={fontFamily}
              fontWeight={700}
            >
              Final Decision
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
