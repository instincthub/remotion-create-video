import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const FACTORY_ITEMS = [
  { label: "NLP Model", status: "pass", score: 94 },
  { label: "Vision Model", status: "test", score: 78 },
  { label: "Forecast", status: "pass", score: 91 },
  { label: "Classifier", status: "fail", score: 62 },
  { label: "Embeddings", status: "pass", score: 89 },
];

export const Scene8Factory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Conveyor belt movement
  const beltOffset = (frame * 1.2) % 60;

  // Factory items slide in from right
  const itemEntrances = FACTORY_ITEMS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * 18,
      config: { damping: 14, stiffness: 80 },
    }),
  );

  // Solutions list
  const solutions = [
    "Reusable Infrastructure",
    "Standardized Datasets",
    "Automated Benchmarking",
    "Synthetic Data Strategies",
  ];

  const solutionEntrances = solutions.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * 6) + i * 15,
      config: { damping: 12, stiffness: 80 },
    }),
  );

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 10),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const beltY = 300;
  const itemSpacing = 320;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.darkNavy} 0%, #0a2a2e 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          AI{" "}
          <span style={{ color: colors.tiffanyBlue }}>Factory</span>{" "}
          Mindset
        </div>
      </div>

      {/* Conveyor belt */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880" viewBox="0 0 1920 880">
          {/* Belt tracks */}
          <rect
            x={100}
            y={beltY}
            width={1720}
            height={8}
            rx={4}
            fill={`${colors.darkCyra}60`}
          />
          <rect
            x={100}
            y={beltY + 190}
            width={1720}
            height={8}
            rx={4}
            fill={`${colors.darkCyra}60`}
          />

          {/* Belt rollers */}
          {Array.from({ length: 30 }).map((_, i) => {
            const x = ((i * 60 - beltOffset) % 1800) + 100;
            return (
              <g key={`roller-${i}`}>
                <line
                  x1={x}
                  y1={beltY + 8}
                  x2={x}
                  y2={beltY + 190}
                  stroke={`${colors.darkCyra}25`}
                  strokeWidth={1}
                />
              </g>
            );
          })}

          {/* Factory items on belt */}
          {FACTORY_ITEMS.map((item, i) => {
            const entrance = itemEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const slideX = interpolate(entrance, [0, 1], [200, 0]);
            const x = 190 + i * itemSpacing;

            const statusColor =
              item.status === "pass"
                ? colors.limeGreen
                : item.status === "fail"
                  ? colors.oldRose
                  : colors.corn;

            const statusLabel =
              item.status === "pass"
                ? "PASS"
                : item.status === "fail"
                  ? "FAIL"
                  : "TESTING";

            return (
              <g
                key={item.label}
                opacity={opacity}
                transform={`translate(${x + slideX}, ${beltY + 15})`}
              >
                {/* Model card */}
                <rect
                  x={0}
                  y={0}
                  width={260}
                  height={160}
                  rx={14}
                  fill={`${colors.darkCyra}25`}
                  stroke={`${colors.tiffanyBlue}60`}
                  strokeWidth={2}
                />

                {/* Model name */}
                <text
                  x={130}
                  y={45}
                  textAnchor="middle"
                  fill={colors.white}
                  fontSize={26}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {item.label}
                </text>

                {/* Score */}
                <text
                  x={80}
                  y={100}
                  textAnchor="middle"
                  fill={`${colors.white}90`}
                  fontSize={20}
                  fontFamily={fontFamily}
                >
                  Score: {item.score}%
                </text>

                {/* Status badge */}
                <rect
                  x={145}
                  y={80}
                  width={85}
                  height={30}
                  rx={8}
                  fill={`${statusColor}30`}
                  stroke={statusColor}
                  strokeWidth={1.5}
                />
                <text
                  x={187}
                  y={101}
                  textAnchor="middle"
                  fill={statusColor}
                  fontSize={16}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {statusLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Solutions list */}
      <div
        style={{
          position: "absolute",
          top: 580,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {solutions.map((solution, i) => {
          const entrance = solutionEntrances[i];
          const opacity = interpolate(entrance, [0, 1], [0, 1]);
          const y = interpolate(entrance, [0, 1], [20, 0]);

          return (
            <div
              key={solution}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: `${colors.darkCyra}20`,
                padding: "10px 20px",
                borderRadius: 10,
                border: `1px solid ${colors.tiffanyBlue}40`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: colors.tiffanyBlue,
                }}
              />
              <span
                style={{
                  fontSize: 18,
                  color: colors.white,
                  fontWeight: 700,
                }}
              >
                {solution}
              </span>
            </div>
          );
        })}
      </div>

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
            background: `${colors.darkCyra}25`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.tiffanyBlue}40`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.white,
              fontWeight: 700,
            }}
          >
            Mature DevOps for AI. Careful data management.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
