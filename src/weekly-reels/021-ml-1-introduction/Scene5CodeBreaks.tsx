import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Growing code with line counter
const CodeTower: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lines grow over time
  const lineCount = Math.min(
    Math.floor(interpolate(frame, [0, 6 * fps], [3, 18], {
      extrapolateRight: "clamp",
    })),
    18,
  );

  const codeSamples = [
    "if (input === 'A') {",
    "  handleCaseA();",
    "} else if (input === 'B') {",
    "  handleCaseB();",
    "} else if (type === 1) {",
    "  processType1();",
    "} else if (type === 2) {",
    "  processType2();",
    "} else if (flag && !err) {",
    "  doSomethingElse();",
    "} else if (x > 100) {",
    "  overflow();",
    "} else if (mode === 'v2') {",
    "  legacyHandler();",
    "} else if (retry < 3) {",
    "  tryAgain();",
    "} else {",
    "  // what now???",
  ];

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: `${colors.gunmetal}`,
        borderRadius: 12,
        padding: "16px 20px",
        maxWidth: 520,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Line numbers + code */}
      {codeSamples.slice(0, lineCount).map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            fontSize: 14,
            fontFamily: "monospace",
            lineHeight: 1.8,
          }}
        >
          <span style={{ color: colors.rhythm, minWidth: 24, textAlign: "right" }}>
            {i + 1}
          </span>
          <span
            style={{
              color: line.includes("//")
                ? colors.oldRose
                : line.includes("if")
                  ? colors.tiffanyBlue
                  : line.includes("else")
                    ? colors.corn
                    : colors.chineseSilver,
            }}
          >
            {line}
          </span>
        </div>
      ))}

      {/* Counter overlay */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 16,
          fontSize: 16,
          fontWeight: 700,
          color: colors.oldRose,
          backgroundColor: `${colors.oldRose}20`,
          padding: "4px 10px",
          borderRadius: 6,
          opacity: interpolate(frame, [fps, 2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {lineCount}+ lines
      </div>
    </div>
  );
};

// User encountering error
const UserError: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 200 },
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Error shake
  const errorFrame = frame - 10 * fps;
  const isShaking = errorFrame > 0 && errorFrame < 2 * fps;
  const shakeX = isShaking ? Math.sin(errorFrame * 0.8) * 6 : 0;

  // Crack effect
  const crackProgress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 12, stiffness: 200 },
  });
  const crackOpacity = interpolate(crackProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${shakeX}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        marginTop: 20,
      }}
    >
      {/* User icon */}
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        {/* Person */}
        <circle cx="40" cy="20" r="12" fill={colors.rhythm} />
        <rect x="32" y="35" width="16" height="25" rx="4" fill={colors.rhythm} />

        {/* Arrow to screen */}
        <line
          x1="56"
          y1="35"
          x2="78"
          y2="35"
          stroke={colors.chineseSilver}
          strokeWidth={2}
          strokeDasharray="4 3"
        />

        {/* Phone/screen */}
        <rect
          x="80"
          y="10"
          width="30"
          height="50"
          rx="4"
          fill={colors.gunmetal}
          stroke={colors.darkSlateGray}
          strokeWidth={1.5}
        />

        {/* Error on screen */}
        <g opacity={crackOpacity}>
          <line
            x1="88"
            y1="25"
            x2="102"
            y2="45"
            stroke={colors.oldRose}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1="102"
            y1="25"
            x2="88"
            y2="45"
            stroke={colors.oldRose}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Error text */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.oldRose,
          textAlign: "center",
          opacity: crackOpacity,
        }}
      >
        Unhandled scenarios!
      </div>
    </div>
  );
};

export const Scene5CodeBreaks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);

  // "Code breaks" text
  const breakProgress = spring({
    frame,
    fps,
    delay: 13 * fps,
    config: { damping: 12, stiffness: 200 },
  });
  const breakOpacity = interpolate(breakProgress, [0, 1], [0, 1]);
  const breakScale = interpolate(breakProgress, [0, 1], [1.3, 1]);

  // Screen flash
  const flashFrame = frame - 11 * fps;
  const isFlashing = flashFrame > 0 && flashFrame < 8;
  const flashOpacity = isFlashing
    ? interpolate(flashFrame, [0, 4, 8], [0.3, 0, 0.15])
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.magnolia}, ${colors.white})`,
        fontFamily,
      }}
    >
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.oldRose,
          opacity: flashOpacity,
        }}
      />

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
          gap: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.rhythm,
            textAlign: "center",
            opacity: headerOpacity,
            marginBottom: 12,
          }}
        >
          Hundreds of lines later...
        </div>

        {/* Code tower */}
        <CodeTower />

        {/* User encounter */}
        <UserError />

        {/* CODE BREAKS */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.oldRose,
            textAlign: "center",
            opacity: breakOpacity,
            transform: `scale(${breakScale})`,
            marginTop: 10,
            letterSpacing: 2,
          }}
        >
          CODE BREAKS.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
