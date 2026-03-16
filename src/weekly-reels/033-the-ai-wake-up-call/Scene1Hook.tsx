import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";
import { Logo } from "./Logo";

const ClassroomSide: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 140,
        width: 760,
        height: 660,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <svg width="760" height="660" viewBox="0 0 760 660">
        {/* Chalkboard */}
        <rect
          x={60} y={40} width={640} height={340}
          rx={8}
          fill={`${colors.darkSlateGray}AA`}
          stroke={`${colors.tiffanyBlue}40`}
          strokeWidth={2}
        />
        {/* Board lines */}
        {[120, 200, 280, 360].map((y, i) => (
          <line
            key={i}
            x1={100} y1={y} x2={660} y2={y}
            stroke={`${colors.tiffanyBlue}20`}
            strokeWidth={1}
          />
        ))}
        {/* Equation-like dashes */}
        <text x={110} y={160} fill={`${colors.chineseSilver}60`} fontSize={28} fontFamily="monospace">
          AI + Education = ?
        </text>
        <text x={110} y={240} fill={`${colors.chineseSilver}40`} fontSize={20} fontFamily="monospace">
          ∑ Future Skills
        </text>
        {/* Desk row silhouettes */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={`desk-${i}`}
            x={80 + i * 155}
            y={450}
            width={120}
            height={14}
            rx={4}
            fill={`${colors.rhythm}60`}
          />
        ))}
        {/* Person silhouettes (abstract) */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={`head-${i}`}
            cx={140 + i * 155}
            cy={420}
            r={18}
            fill={`${colors.rhythm}50`}
          />
        ))}
        {/* "CLASSROOM" label */}
        <text
          x={380} y={620}
          fill={`${colors.tiffanyBlue}70`}
          fontSize={16}
          textAnchor="middle"
          fontFamily="sans-serif"
          letterSpacing={4}
        >
          YOUR CHILD'S WORLD
        </text>
      </svg>
    </div>
  );
};

const AISide: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [40, 0]);

  const glowPulse = Math.sin(frame * 0.06) * 0.2 + 0.8;

  return (
    <div
      style={{
        position: "absolute",
        right: 80,
        top: 140,
        width: 760,
        height: 660,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <svg width="760" height="660" viewBox="0 0 760 660">
        {/* Central AI orb */}
        <circle
          cx={380} cy={260}
          r={120}
          fill={`${colors.darkCyra}15`}
          stroke={colors.darkCyra}
          strokeWidth={2}
          opacity={glowPulse}
        />
        <circle
          cx={380} cy={260}
          r={80}
          fill={`${colors.darkCyra}25`}
          stroke={colors.tiffanyBlue}
          strokeWidth={1.5}
          opacity={glowPulse}
        />
        <circle
          cx={380} cy={260}
          r={40}
          fill={`${colors.darkCyra}50`}
          opacity={glowPulse}
        />
        {/* Orbiting nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2 + frame * 0.015;
          const nx = 380 + Math.cos(angle) * 150;
          const ny = 260 + Math.sin(angle) * 150;
          return (
            <g key={i}>
              <line
                x1={380} y1={260} x2={nx} y2={ny}
                stroke={`${colors.caribbeanGreen}40`}
                strokeWidth={1}
              />
              <circle
                cx={nx} cy={ny} r={8}
                fill={colors.caribbeanGreen}
                opacity={0.7}
              />
            </g>
          );
        })}
        {/* Data flow lines */}
        {[100, 200, 300, 460, 560, 660].map((x, i) => {
          const progress2 = (frame * 2 + i * 40) % 660;
          return (
            <line
              key={`flow-${i}`}
              x1={x} y1={progress2 % 500}
              x2={x} y2={(progress2 % 500) + 30}
              stroke={colors.darkCyra}
              strokeWidth={1}
              opacity={0.3}
            />
          );
        })}
        {/* "AI" text */}
        <text
          x={380} y={272}
          fill={colors.white}
          fontSize={36}
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          AI
        </text>
        {/* Worker replacement label */}
        <text
          x={380} y={460}
          fill={`${colors.oldRose}90`}
          fontSize={18}
          textAnchor="middle"
          fontFamily="sans-serif"
          letterSpacing={2}
        >
          ENTRY-LEVEL JOBS
        </text>
        <text
          x={380} y={490}
          fill={`${colors.chineseSilver}60`}
          fontSize={16}
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          → replaced ←
        </text>
        {/* Label */}
        <text
          x={380} y={620}
          fill={`${colors.tiffanyBlue}70`}
          fontSize={16}
          textAnchor="middle"
          fontFamily="sans-serif"
          letterSpacing={4}
        >
          THE WORLD OUTSIDE
        </text>
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const dividerOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const rightProgress = spring({
    frame: frame - Math.round(fps * 0.4),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const textProgress = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 200 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.015;

  return (
    <AbsoluteFill
      style={{
        background: colors.gunmetal,
        fontFamily,
        opacity: bgOpacity,
      }}
    >
      {/* Subtle vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, ${colors.gunmetal}CC 100%)`,
        }}
      />

      {/* Split screen content */}
      <ClassroomSide progress={leftProgress} />
      <AISide progress={rightProgress} />

      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 80,
          bottom: 220,
          width: 2,
          background: `linear-gradient(to bottom, transparent, ${colors.tiffanyBlue}60, transparent)`,
          opacity: dividerOpacity,
          transform: "translateX(-50%)",
        }}
      />

      {/* Center text overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale * pulseScale})`,
            background: `${colors.gunmetal}CC`,
            padding: "20px 48px",
            borderRadius: 8,
            border: `1px solid ${colors.tiffanyBlue}40`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: colors.white,
              letterSpacing: 1,
              lineHeight: 1.3,
            }}
          >
            These two facts are{" "}
            <span style={{ color: colors.darkCyra }}>connected</span>.
          </div>
          <div
            style={{
              fontSize: 22,
              color: `${colors.chineseSilver}80`,
              marginTop: 12,
              fontWeight: 400,
            }}
          >
            And most parents have no idea.
          </div>
        </div>
      </AbsoluteFill>

      <Logo />
    </AbsoluteFill>
  );
};
