import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Tangled code lines visualization
const TangledCode: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  const wobble = Math.sin(frame * 0.05) * 3;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${wobble}px)`,
      }}
    >
      <svg width="340" height="260" viewBox="0 0 340 260" fill="none">
        {/* Code block background */}
        <rect
          x="10"
          y="10"
          width="320"
          height="240"
          rx="12"
          fill={`${colors.darkSlateGray}`}
          stroke={`${colors.oldRose}40`}
          strokeWidth={1.5}
        />
        {/* Title bar dots */}
        <circle cx="35" cy="32" r="6" fill={colors.oldRose} opacity={0.7} />
        <circle cx="55" cy="32" r="6" fill={colors.corn} opacity={0.7} />
        <circle cx="75" cy="32" r="6" fill={colors.limeGreen} opacity={0.7} />

        {/* Tangled if-else lines */}
        <text x="30" y="65" fontSize="16" fill={colors.oldRose} fontFamily="monospace" opacity={0.9}>
          if (cond_A &amp;&amp; cond_B)
        </text>
        <text x="40" y="85" fontSize="16" fill={colors.chineseSilver} fontFamily="monospace" opacity={0.6}>
          {"  "}else if (cond_C)
        </text>
        <text x="50" y="105" fontSize="16" fill={colors.chineseSilver} fontFamily="monospace" opacity={0.6}>
          {"    "}else if (cond_D)
        </text>
        <text x="60" y="125" fontSize="16" fill={colors.chineseSilver} fontFamily="monospace" opacity={0.5}>
          {"      "}else if (cond_E)
        </text>
        <text x="70" y="145" fontSize="16" fill={colors.chineseSilver} fontFamily="monospace" opacity={0.4}>
          {"        "}else if ...
        </text>
        <text x="80" y="165" fontSize="16" fill={colors.chineseSilver} fontFamily="monospace" opacity={0.3}>
          {"          "}else ...
        </text>
        <text x="90" y="185" fontSize="16" fill={colors.chineseSilver} fontFamily="monospace" opacity={0.2}>
          {"            "}...
        </text>

        {/* Red X overlay */}
        <g opacity={Math.sin(frame * 0.06) * 0.15 + 0.5}>
          <line x1="120" y1="80" x2="240" y2="190" stroke={colors.oldRose} strokeWidth={3} strokeLinecap="round" />
          <line x1="240" y1="80" x2="120" y2="190" stroke={colors.oldRose} strokeWidth={3} strokeLinecap="round" />
        </g>

        {/* Label */}
        <text x="170" y="230" fontSize="14" fill={colors.oldRose} textAnchor="middle" fontFamily="monospace">
          Too Many Rules!
        </text>
      </svg>
    </div>
  );
};

// Clean ML model box
const MLModelBox: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const glow = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="260" height="140" viewBox="0 0 260 140" fill="none">
        {/* Clean box */}
        <rect
          x="10"
          y="10"
          width="240"
          height="120"
          rx="16"
          fill={`${colors.caribbeanGreen}12`}
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
          opacity={glow}
        />
        {/* ML icon */}
        <text x="130" y="55" fontSize="28" fill={colors.caribbeanGreen} textAnchor="middle" fontWeight="700" fontFamily="monospace">
          ML Model
        </text>
        {/* Arrow in */}
        <path d="M60 90 L100 90" stroke={colors.tiffanyBlue} strokeWidth={2} markerEnd="url(#arrowG)" />
        {/* Arrow out */}
        <path d="M160 90 L200 90" stroke={colors.caribbeanGreen} strokeWidth={2} markerEnd="url(#arrowG)" />
        {/* Labels */}
        <text x="80" y="110" fontSize="14" fill={colors.chineseSilver} textAnchor="middle">
          Data In
        </text>
        <text x="180" y="110" fontSize="14" fill={colors.caribbeanGreen} textAnchor="middle">
          Result
        </text>

        <defs>
          <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill={colors.caribbeanGreen} />
          </marker>
        </defs>

        {/* Checkmark */}
        <path
          d="M110 82 L122 94 L150 66"
          stroke={colors.limeGreen}
          strokeWidth={0}
          fill="none"
        />
      </svg>
    </div>
  );
};

export const Scene3ComplexToCode: React.FC = () => {
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

  // Arrow from tangled to ML
  const arrowDelay = 2.5 * fps;
  const arrowProgress = spring({ frame, fps, delay: arrowDelay, config: { damping: 200 } });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Subtle grid */}
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
          paddingLeft: 40,
          paddingRight: 40,
          gap: 16,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
            marginBottom: 10,
          }}
        >
          Too Complex
          <br />
          <span style={{ color: colors.oldRose }}>to Code Manually</span>
        </div>

        {/* Tangled code */}
        <TangledCode delay={12} />

        {/* Arrow down */}
        <div style={{ opacity: arrowOpacity }}>
          <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
            <path d="M20 0 L20 35" stroke={colors.tiffanyBlue} strokeWidth={2} />
            <polygon points="12,30 20,45 28,30" fill={colors.tiffanyBlue} />
          </svg>
        </div>

        {/* ML solution */}
        <MLModelBox delay={Math.round(arrowDelay + 10)} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
