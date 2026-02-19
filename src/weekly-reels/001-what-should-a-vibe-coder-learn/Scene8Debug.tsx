import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Bug illustration that gets squashed
const BugIllustration: React.FC<{ squashed: boolean }> = ({ squashed }) => {
  const frame = useCurrentFrame();

  // Wiggle when alive
  const wiggle = squashed ? 0 : Math.sin(frame * 0.2) * 3;
  const legWiggle = squashed ? 0 : Math.sin(frame * 0.3) * 5;

  const squashScale = squashed ? 0.3 : 1;
  const squashScaleX = squashed ? 1.8 : 1;

  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <g
        transform={`translate(${wiggle}, 0) scale(${squashScaleX}, ${squashScale})`}
        style={{ transformOrigin: "50px 60px" }}
      >
        {/* Body */}
        <ellipse cx="50" cy="45" rx="22" ry="18" fill={colors.oldRose} />
        {/* Head */}
        <circle cx="50" cy="24" r="12" fill={colors.oldRose} />
        {/* Eyes */}
        <circle cx="44" cy="22" r="3" fill={colors.white} />
        <circle cx="56" cy="22" r="3" fill={colors.white} />
        <circle cx="45" cy="22" r="1.5" fill={colors.gunmetal} />
        <circle cx="57" cy="22" r="1.5" fill={colors.gunmetal} />
        {/* Antennae */}
        <path d={`M44 14 L38 ${4 + legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <path d={`M56 14 L62 ${4 - legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <circle cx={38} cy={4 + legWiggle} r="2" fill={colors.oldRose} />
        <circle cx={62} cy={4 - legWiggle} r="2" fill={colors.oldRose} />
        {/* Legs */}
        <path d={`M32 38 L20 ${30 + legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <path d={`M68 38 L80 ${30 - legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <path d={`M30 48 L18 ${50 - legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <path d={`M70 48 L82 ${50 + legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <path d={`M34 56 L22 ${65 + legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
        <path d={`M66 56 L78 ${65 - legWiggle}`} stroke={colors.oldRose} strokeWidth={2} strokeLinecap="round" />
      </g>
      {/* Squash effect */}
      {squashed && (
        <>
          <text x="50" y="65" textAnchor="middle" fontSize="18" fill={colors.oldRose} opacity={0.6}>
            * * *
          </text>
        </>
      )}
    </svg>
  );
};

// Magnifying glass scanning code
const MagnifyingGlass: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 1.5 * fps, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Glass sweeps across
  const scanX = interpolate(frame, [2 * fps, 5 * fps], [40, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      style={{
        position: "absolute",
        right: 60,
        top: 140,
        opacity,
        transform: `translateX(${scanX - 120}px)`,
      }}
    >
      <circle cx="24" cy="24" r="18" stroke={colors.darkCyra} strokeWidth={3} fill={`${colors.darkCyra}10`} />
      <line x1="37" y1="37" x2="52" y2="52" stroke={colors.darkCyra} strokeWidth={4} strokeLinecap="round" />
      {/* Lens glint */}
      <path d="M16 16 Q20 12, 24 16" stroke={colors.white} strokeWidth={1.5} opacity={0.6} />
    </svg>
  );
};

export const Scene8Debug: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);

  // Terminal
  const errorDelay = 1 * fps;
  const errorProgress = spring({ frame, fps, delay: errorDelay, config: { damping: 200 } });
  const errorOpacity = interpolate(errorProgress, [0, 1], [0, 1]);
  const errorY = interpolate(errorProgress, [0, 1], [30, 0]);

  // Error text typewriter
  const errorText = "TypeError: Cannot read 'data' of undefined";
  const typeStart = 2 * fps;
  const charsPerFrame = 1.5;
  const visibleChars = Math.min(
    Math.max(0, Math.floor((frame - typeStart) * charsPerFrame)),
    errorText.length,
  );
  const displayError = errorText.slice(0, visibleChars);

  // Fix animation
  const fixDelay = 6 * fps;
  const fixProgress = spring({ frame, fps, delay: fixDelay, config: { damping: 200 } });
  const fixOpacity = interpolate(fixProgress, [0, 1], [0, 1]);
  const fixY = interpolate(fixProgress, [0, 1], [20, 0]);

  // Strikethrough
  const strikeProgress = interpolate(
    frame,
    [fixDelay, fixDelay + fps * 0.5],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bug squash moment
  const bugSquashed = frame > fixDelay + fps * 0.3;

  // Success
  const checkDelay = 8 * fps;
  const checkProgress = spring({ frame, fps, delay: checkDelay, config: { damping: 12, stiffness: 100 } });
  const checkScale = interpolate(checkProgress, [0, 1], [0, 1]);
  const checkOpacity = interpolate(checkProgress, [0, 1], [0, 1]);

  // Bug entrance
  const bugEntrance = spring({ frame, fps, delay: 1 * fps, config: { damping: 200 } });
  const bugOpacity = interpolate(bugEntrance, [0, 1], [0, 1]);

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
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: headingOpacity,
          }}
        >
          Break things.{" "}
          <span style={{ color: colors.darkCyra }}>Fix things.</span>
        </div>

        {/* Bug illustration */}
        <div style={{ opacity: bugOpacity }}>
          <BugIllustration squashed={bugSquashed} />
        </div>

        {/* Terminal window */}
        <div
          style={{
            width: "100%",
            maxWidth: 700,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            opacity: errorOpacity,
            transform: `translateY(${errorY}px)`,
            position: "relative",
          }}
        >
          {/* Magnifying glass */}
          <MagnifyingGlass />

          {/* Terminal header */}
          <div
            style={{
              backgroundColor: colors.gunmetal,
              padding: "12px 16px",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.oldRose }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.corn }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.limeGreen }} />
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 12, color: colors.rhythm, fontFamily: "monospace" }}>
              terminal
            </div>
          </div>

          {/* Terminal body */}
          <div
            style={{
              backgroundColor: colors.darkSlateGray,
              padding: "20px 18px",
              minHeight: 140,
            }}
          >
            {/* Error line */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: colors.oldRose,
                  lineHeight: 1.6,
                  wordBreak: "break-all",
                }}
              >
                <span style={{ color: colors.rhythm }}>$ </span>
                {displayError}
                {visibleChars < errorText.length && (
                  <span style={{ opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0, color: colors.white }}>|</span>
                )}
              </div>
              {strikeProgress > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: `${strikeProgress}%`,
                    height: 2,
                    backgroundColor: colors.caribbeanGreen,
                  }}
                />
              )}
            </div>

            {/* Fix line */}
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                color: colors.caribbeanGreen,
                opacity: fixOpacity,
                transform: `translateY(${fixY}px)`,
                marginTop: 14,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: colors.rhythm }}>$ </span>
              {"response?.data ?? fallback"}
            </div>
          </div>
        </div>

        {/* Success */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: checkOpacity,
            transform: `scale(${checkScale})`,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" fill={colors.caribbeanGreen} />
            <path d="M10 18l5 5 11-11" stroke={colors.white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 24, fontWeight: 700, color: colors.caribbeanGreen }}>
            Confidence comes from fixing.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
