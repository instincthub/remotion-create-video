import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Molecule diagram that assembles through animated lines
const MoleculeAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const atoms = [
    { x: 960, y: 400, label: "C", color: colors.tiffanyBlue },
    { x: 860, y: 320, label: "H", color: colors.white },
    { x: 1060, y: 320, label: "O", color: colors.oldRose },
    { x: 860, y: 480, label: "N", color: colors.caribbeanGreen },
    { x: 1060, y: 480, label: "C", color: colors.tiffanyBlue },
    { x: 760, y: 400, label: "H", color: colors.white },
    { x: 1160, y: 400, label: "O", color: colors.oldRose },
    { x: 960, y: 560, label: "H", color: colors.white },
    { x: 1160, y: 540, label: "C", color: colors.tiffanyBlue },
    { x: 1260, y: 480, label: "H", color: colors.white },
  ];

  const bonds = [
    [0, 1], [0, 2], [0, 3], [0, 5],
    [3, 4], [4, 6], [3, 7], [4, 8], [8, 9],
  ];

  const overallOpacity = interpolate(frame, [2 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: overallOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id="molGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bonds animate in */}
        {bonds.map(([a, b], i) => {
          const from = atoms[a];
          const to = atoms[b];
          const bondDelay = 3 * fps + i * 6;
          const bondProgress = interpolate(
            frame,
            [bondDelay, bondDelay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={`bond-${i}`}
              x1={from.x}
              y1={from.y}
              x2={from.x + (to.x - from.x) * bondProgress}
              y2={from.y + (to.y - from.y) * bondProgress}
              stroke={`${colors.tiffanyBlue}80`}
              strokeWidth={3}
            />
          );
        })}

        {/* Atoms */}
        {atoms.map((atom, i) => {
          const atomProgress = spring({
            frame,
            fps,
            delay: 2.5 * fps + i * 5,
            config: { damping: 200 },
          });
          const atomOpacity = interpolate(atomProgress, [0, 1], [0, 1]);

          // Subtle vibration
          const vibX = Math.sin(frame * 0.1 + i * 2) * 2;
          const vibY = Math.cos(frame * 0.08 + i * 1.5) * 2;

          return (
            <g
              key={`atom-${i}`}
              opacity={atomOpacity}
              filter="url(#molGlow)"
            >
              <circle
                cx={atom.x + vibX}
                cy={atom.y + vibY}
                r={24}
                fill={`${atom.color}30`}
                stroke={atom.color}
                strokeWidth={2}
              />
              <text
                x={atom.x + vibX}
                y={atom.y + vibY + 6}
                textAnchor="middle"
                fontSize={18}
                fontWeight="bold"
                fill={atom.color}
                fontFamily="Inter, sans-serif"
              >
                {atom.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Mass spectrometry waveform
const MassSpecWaveform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const waveOpacity = interpolate(frame, [5 * fps, 6 * fps], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const peakHeights = [30, 60, 20, 90, 15, 45, 80, 25, 55, 70, 35, 65, 10, 50, 40];

  const drawProgress = interpolate(frame, [5 * fps, 8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visiblePeaks = Math.floor(drawProgress * peakHeights.length);

  return (
    <AbsoluteFill style={{ opacity: waveOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Baseline */}
        <line
          x1={200}
          y1={900}
          x2={1720}
          y2={900}
          stroke={colors.chineseSilver}
          strokeWidth={1}
        />
        {/* Peaks */}
        {peakHeights.slice(0, visiblePeaks).map((h, i) => {
          const x = 280 + i * 100;
          const peakH = h * 2.5;

          return (
            <g key={`peak-${i}`}>
              <line
                x1={x}
                y1={900}
                x2={x}
                y2={900 - peakH}
                stroke={colors.tiffanyBlue}
                strokeWidth={3}
              />
              <circle
                cx={x}
                cy={900 - peakH}
                r={3}
                fill={colors.tiffanyBlue}
              />
            </g>
          );
        })}
        {/* Axis label */}
        <text
          x={960}
          y={950}
          textAnchor="middle"
          fontSize={16}
          fill={colors.rhythm}
          fontFamily="Inter, sans-serif"
        >
          m/z ratio
        </text>
      </svg>
    </AbsoluteFill>
  );
};

export const Scene4Dendral: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // "Rediscovered" highlight
  const highlightProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const highlightOpacity = interpolate(highlightProgress, [0, 1], [0, 1]);
  const highlightScale = interpolate(highlightProgress, [0, 1], [0.8, 1]);

  // Caveat
  const caveatProgress = spring({
    frame,
    fps,
    delay: 8.5 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const caveatOpacity = interpolate(caveatProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkSlateGray}, ${colors.gunmetal})`,
        fontFamily,
      }}
    >
      <MoleculeAnimation />
      <MassSpecWaveform />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          DENDRAL:{" "}
          <span style={{ color: colors.tiffanyBlue }}>
            The Chemistry Expert
          </span>
        </div>
        <div
          style={{
            fontSize: 22,
            color: colors.chineseSilver,
            marginTop: 8,
          }}
        >
          Determining molecular structures from mass spectrometry
        </div>
      </div>

      {/* Rediscovered insight */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: highlightOpacity,
          transform: `scale(${highlightScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 32px",
            backgroundColor: `${colors.caribbeanGreen}20`,
            border: `2px solid ${colors.caribbeanGreen}`,
            borderRadius: 12,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.caribbeanGreen,
            }}
          >
            Rediscovered known rules &amp; found new ones
          </span>
        </div>
      </div>

      {/* Caveat */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: caveatOpacity,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: colors.corn,
            fontWeight: "bold",
          }}
        >
          But it depended on carefully handcrafted expert knowledge.
        </div>
      </div>
    </AbsoluteFill>
  );
};
