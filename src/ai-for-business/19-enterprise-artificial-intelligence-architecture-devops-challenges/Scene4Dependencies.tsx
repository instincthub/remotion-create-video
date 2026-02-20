import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const COMPONENTS = [
  { label: "Model A", version: "v2.0", x: 400, y: 300, color: colors.darkCyra },
  { label: "Model B", version: "v3.4", x: 960, y: 300, color: colors.viridianGreen },
  { label: "Model C", version: "v1.1", x: 1500, y: 300, color: colors.tiffanyBlue },
];

const DEPENDENCIES: [number, number][] = [[0, 1], [1, 2]];

export const Scene4Dependencies: React.FC = () => {
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

  // Component entrances
  const compEntrances = COMPONENTS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * 20,
      config: { damping: 12, stiffness: 80 },
    }),
  );

  // Connection lines
  const lineProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 3),
    config: { damping: 14, stiffness: 60 },
  });

  // Version mismatch warning phase
  const warningPhase = interpolate(
    frame,
    [6 * fps, 7 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Warning shake
  const shakeAmount = warningPhase > 0.5 ? Math.sin(frame * 0.4) * 3 : 0;

  // Cascade error animation
  const cascadeProgress = interpolate(
    frame,
    [8 * fps, 10 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 10),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
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
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Dependencies Create{" "}
          <span style={{ color: colors.oldRose }}>Fragility</span>
        </div>
      </div>

      {/* Dependency diagram */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880" viewBox="0 0 1920 880">
          {/* Dependency lines */}
          {DEPENDENCIES.map(([from, to], i) => {
            const fromComp = COMPONENTS[from];
            const toComp = COMPONENTS[to];
            const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.6]);
            const isBroken = warningPhase > 0.5 && i === 0;

            return (
              <g key={`dep-${i}`}>
                <line
                  x1={fromComp.x + 120}
                  y1={fromComp.y + 50}
                  x2={toComp.x - 120}
                  y2={toComp.y + 50}
                  stroke={isBroken ? colors.oldRose : colors.chineseSilver}
                  strokeWidth={isBroken ? 3 : 2}
                  opacity={lineOpacity}
                  strokeDasharray={isBroken ? "8 5" : "6 4"}
                />
                {/* Arrow head */}
                <polygon
                  points={`${toComp.x - 125},${toComp.y + 43} ${toComp.x - 112},${toComp.y + 50} ${toComp.x - 125},${toComp.y + 57}`}
                  fill={isBroken ? colors.oldRose : colors.chineseSilver}
                  opacity={lineOpacity}
                />
                {/* "depends on" label */}
                <text
                  x={(fromComp.x + toComp.x) / 2}
                  y={fromComp.y + 30}
                  textAnchor="middle"
                  fill={isBroken ? colors.oldRose : colors.rhythm}
                  fontSize={16}
                  fontFamily={fontFamily}
                  opacity={lineOpacity}
                >
                  depends on
                </text>
              </g>
            );
          })}

          {/* Component boxes */}
          {COMPONENTS.map((comp, i) => {
            const entrance = compEntrances[i];
            const boxOpacity = interpolate(entrance, [0, 1], [0, 1]);
            const boxScale = interpolate(entrance, [0, 1], [0.7, 1]);
            const hasWarning = warningPhase > 0.5 && i < 2;
            const hasCascadeError = cascadeProgress > i * 0.3 && warningPhase > 0.5;

            return (
              <g
                key={comp.label}
                opacity={boxOpacity}
                transform={`translate(${comp.x}, ${comp.y + shakeAmount * (hasWarning ? 1 : 0)}) scale(${boxScale})`}
                style={{ transformOrigin: `${comp.x + 100}px ${comp.y + 50}px` }}
              >
                {/* Box */}
                <rect
                  x={-100}
                  y={0}
                  width={200}
                  height={100}
                  rx={12}
                  fill={hasCascadeError ? `${colors.oldRose}10` : `${comp.color}10`}
                  stroke={hasCascadeError ? colors.oldRose : comp.color}
                  strokeWidth={2}
                />
                {/* Label */}
                <text
                  x={0}
                  y={40}
                  textAnchor="middle"
                  fill={colors.gunmetal}
                  fontSize={24}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {comp.label}
                </text>
                {/* Version badge */}
                <rect
                  x={-35}
                  y={55}
                  width={70}
                  height={28}
                  rx={6}
                  fill={hasCascadeError ? `${colors.oldRose}20` : `${comp.color}20`}
                />
                <text
                  x={0}
                  y={75}
                  textAnchor="middle"
                  fill={hasCascadeError ? colors.oldRose : comp.color}
                  fontSize={18}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {comp.version}
                </text>

                {/* Warning icon */}
                {hasWarning && warningPhase > 0 && (
                  <g opacity={warningPhase}>
                    <circle
                      cx={85}
                      cy={10}
                      r={16}
                      fill={colors.oldRose}
                    />
                    <text
                      x={85}
                      y={16}
                      textAnchor="middle"
                      fill={colors.white}
                      fontSize={18}
                      fontWeight={700}
                      fontFamily={fontFamily}
                    >
                      !
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Version coupling callout */}
          {warningPhase > 0 && (
            <g opacity={warningPhase}>
              <rect
                x={560}
                y={460}
                width={400}
                height={50}
                rx={8}
                fill={`${colors.corn}20`}
                stroke={colors.corn}
                strokeWidth={1.5}
              />
              <text
                x={760}
                y={492}
                textAnchor="middle"
                fill={colors.gunmetal}
                fontSize={22}
                fontWeight={700}
                fontFamily={fontFamily}
              >
                Version Coupling Detected
              </text>
            </g>
          )}

          {/* Cascade error callout */}
          {cascadeProgress > 0.5 && (
            <g opacity={cascadeProgress}>
              <rect
                x={1080}
                y={460}
                width={380}
                height={50}
                rx={8}
                fill={`${colors.oldRose}15`}
                stroke={colors.oldRose}
                strokeWidth={1.5}
              />
              <text
                x={1270}
                y={492}
                textAnchor="middle"
                fill={colors.oldRose}
                fontSize={22}
                fontWeight={700}
                fontFamily={fontFamily}
              >
                Errors Cascade Downstream
              </text>
            </g>
          )}
        </svg>
      </AbsoluteFill>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${colors.oldRose}12`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.oldRose}30`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.gunmetal,
              fontWeight: 700,
            }}
          >
            Measure impact at the system level. Not the component level.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
