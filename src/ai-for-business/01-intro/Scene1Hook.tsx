import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Smart speaker illustration — outlined style, bright on dark
const SmartSpeaker: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <div style={{ opacity, position: "relative" }}>
      <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
        {/* Shadow / table surface */}
        <ellipse cx="90" cy="200" rx="55" ry="10" fill="rgba(15,171,188,0.12)" />
        {/* Speaker body */}
        <rect
          x="40" y="55" width="100" height="140" rx="14"
          fill="rgba(15,171,188,0.08)"
          stroke={colors.tiffanyBlue} strokeWidth={2.5}
        />
        {/* Top cap */}
        <ellipse
          cx="90" cy="55" rx="50" ry="14"
          fill="rgba(15,171,188,0.1)"
          stroke={colors.tiffanyBlue} strokeWidth={2.5}
        />
        {/* Mesh texture lines */}
        {[85, 105, 125, 145, 165].map((y) => (
          <line
            key={y} x1="48" y1={y} x2="132" y2={y}
            stroke={colors.tiffanyBlue} strokeWidth={1} opacity={0.25}
          />
        ))}
        {/* Glow ring on top */}
        <ellipse
          cx="90" cy="55" rx="38" ry="10"
          fill="none" stroke={colors.caribbeanGreen}
          strokeWidth={3} opacity={glowPulse}
        />
        {/* Glow dot */}
        <circle cx="90" cy="55" r="4" fill={colors.caribbeanGreen} opacity={glowPulse} />
        {/* Music notes floating up */}
        <text
          x="135" y={40 - (frame * 0.3) % 20}
          fill={colors.caribbeanGreen} fontSize="22" opacity={0.8}
        >♪</text>
        <text
          x="148" y={28 - (frame * 0.2) % 25}
          fill={colors.white} fontSize="16" opacity={0.5}
        >♫</text>
        <text
          x="28" y={35 - (frame * 0.25) % 22}
          fill={colors.tiffanyBlue} fontSize="18" opacity={0.6}
        >♩</text>
      </svg>
    </div>
  );
};

// Office building — outlined style, bright on dark with red failure overlay
const BoardroomIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <div style={{ opacity }}>
      <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
        {/* Building body */}
        <rect
          x="40" y="30" width="120" height="170" rx="6"
          fill="rgba(234,95,94,0.06)"
          stroke={colors.chineseSilver} strokeWidth={2.5}
        />
        {/* Roof / top */}
        <rect
          x="50" y="20" width="100" height="16" rx="3"
          fill="none" stroke={colors.chineseSilver} strokeWidth={2}
        />
        {/* Windows grid — white outlines so they pop */}
        {[52, 82, 112, 142].map((y) =>
          [60, 90, 120].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x} y={y} width="20" height="16" rx="2"
              fill={y === 142 && x === 120 ? "rgba(234,95,94,0.3)" : "rgba(255,255,255,0.12)"}
              stroke={y === 142 && x === 120 ? colors.oldRose : colors.chineseSilver}
              strokeWidth={1.5}
            />
          )),
        )}
        {/* Door */}
        <rect
          x="84" y="176" width="32" height="24" rx="3"
          fill="none" stroke={colors.chineseSilver} strokeWidth={2}
        />
        {/* Big red X overlay */}
        <line x1="60" y1="50" x2="140" y2="165" stroke={colors.oldRose} strokeWidth={4} opacity={0.7} />
        <line x1="140" y1="50" x2="60" y2="165" stroke={colors.oldRose} strokeWidth={4} opacity={0.7} />
      </svg>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "80%" dramatic scale-up with bounce
  const numberScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  // Deterministic glitch effect on the number
  const glitchCycle = frame % 45;
  const isGlitching = glitchCycle < 3 && frame > 15 && frame < 250;
  const glitchX = isGlitching ? ((frame * 7) % 11) - 5 : 0;
  const glitchR = isGlitching ? ((frame * 3) % 5) - 2 : 0;

  // Subtitle text slides up
  const subtitleProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [60, 0]);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Illustration entrance
  const illustrationDelay = 40;
  const illustrationProgress = spring({
    frame,
    fps,
    delay: illustrationDelay,
    config: { damping: 200 },
  });
  const illustrationOpacity = interpolate(
    illustrationProgress,
    [0, 1],
    [0, 1],
  );

  // VS label
  const vsProgress = spring({
    frame,
    fps,
    delay: illustrationDelay + 15,
    config: { damping: 200 },
  });
  const vsOpacity = interpolate(vsProgress, [0, 1], [0, 0.5]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Subtle grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
            `linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glitch shadow layers */}
      {isGlitching && (
        <>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 220,
            }}
          >
            <div
              style={{
                fontSize: 220,
                fontWeight: "bold",
                color: colors.tiffanyBlue,
                opacity: 0.4,
                transform: `scale(${numberScale}) translate(${glitchX + 6}px, ${-glitchR}px)`,
              }}
            >
              80%
            </div>
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 220,
            }}
          >
            <div
              style={{
                fontSize: 220,
                fontWeight: "bold",
                color: colors.oldRose,
                opacity: 0.3,
                transform: `scale(${numberScale}) translate(${-glitchX - 4}px, ${glitchR + 2}px)`,
              }}
            >
              80%
            </div>
          </AbsoluteFill>
        </>
      )}

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {/* 80% number */}
        <div
          style={{
            fontSize: 220,
            fontWeight: "bold",
            color: colors.oldRose,
            transform: `scale(${numberScale}) translateX(${glitchX}px)`,
            lineHeight: 1,
          }}
        >
          80%
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: colors.white,
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleOpacity,
            letterSpacing: 2,
          }}
        >
          of Enterprise AI Projects Fail
        </div>

        {/* Living room vs Boardroom illustration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 50,
            marginTop: 40,
          }}
        >
          {/* Smart speaker (living room) - with checkmark */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <SmartSpeaker opacity={illustrationOpacity} />
            <div
              style={{
                fontSize: 18,
                color: colors.caribbeanGreen,
                opacity: illustrationOpacity,
              }}
            >
              Living Room ✓
            </div>
          </div>

          {/* VS */}
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.white,
              opacity: vsOpacity,
            }}
          >
            vs
          </div>

          {/* Boardroom - with X */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <BoardroomIcon opacity={illustrationOpacity} />
            <div
              style={{
                fontSize: 18,
                color: colors.oldRose,
                opacity: illustrationOpacity,
              }}
            >
              Boardroom ✗
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
