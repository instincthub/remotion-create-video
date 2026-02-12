import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Algorithm code panel
const CodePanel: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const lines = [
    "def train_model(data):",
    "    model = NeuralNet(layers=8)",
    "    model.fit(data, epochs=100)",
    "    loss = model.evaluate()",
    "    return model if loss < 0.01",
    "",
    "# Accuracy: 97.3%",
    "# Status: WORKING",
  ];

  const visibleChars = Math.floor(frame * 1.2);

  let charCount = 0;
  return (
    <div
      style={{
        opacity,
        backgroundColor: colors.gunmetal,
        borderRadius: 12,
        padding: 32,
        width: 520,
        fontFamily: "monospace",
        fontSize: 18,
        lineHeight: 1.8,
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.oldRose }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.corn }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.limeGreen }} />
      </div>

      {lines.map((line, i) => {
        const lineStart = charCount;
        charCount += line.length;
        const lineVisible = Math.max(
          0,
          Math.min(line.length, visibleChars - lineStart),
        );

        const isComment = line.startsWith("#");
        const isStatus = line.includes("WORKING");

        return (
          <div
            key={i}
            style={{
              color: isStatus
                ? colors.limeGreen
                : isComment
                  ? colors.caribbeanGreen
                  : colors.white,
              opacity: lineVisible > 0 ? 1 : 0.2,
              minHeight: 22,
            }}
          >
            {line.slice(0, lineVisible)}
            {lineVisible > 0 && lineVisible < line.length && (
              <span
                style={{
                  color: colors.caribbeanGreen,
                  opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                }}
              >
                |
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Confused business team icons
const BusinessTeam: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const people = [
    { x: 100, y: 180, label: "CEO" },
    { x: 260, y: 200, label: "CFO" },
    { x: 420, y: 170, label: "PM" },
  ];

  return (
    <div style={{ opacity, position: "relative", width: 520, height: 400 }}>
      <svg width="520" height="400" viewBox="0 0 520 400">
        {/* Confused question marks floating */}
        {[
          { x: 80, y: 80 },
          { x: 230, y: 60 },
          { x: 380, y: 90 },
          { x: 160, y: 40 },
          { x: 320, y: 50 },
        ].map((pos, i) => (
          <text
            key={i}
            x={pos.x}
            y={pos.y - (frame * 0.3 + i * 5) % 30}
            fill={colors.oldRose}
            fontSize={28 + (i % 3) * 8}
            opacity={0.3 + Math.sin(frame * 0.08 + i) * 0.2}
            fontFamily={fontFamily}
            fontWeight="bold"
          >
            ?
          </text>
        ))}

        {/* People silhouettes */}
        {people.map((p, i) => {
          const wobble = Math.sin(frame * 0.06 + i * 2) * 3;
          return (
            <g key={i} transform={`translate(${p.x}, ${p.y + wobble})`}>
              {/* Head */}
              <circle cx={0} cy={0} r={28} fill="none" stroke={colors.rhythm} strokeWidth={2.5} />
              {/* Body */}
              <line x1={0} y1={28} x2={0} y2={90} stroke={colors.rhythm} strokeWidth={2.5} />
              {/* Arms (shrug pose) */}
              <line x1={0} y1={50} x2={-30} y2={35} stroke={colors.rhythm} strokeWidth={2.5} />
              <line x1={0} y1={50} x2={30} y2={35} stroke={colors.rhythm} strokeWidth={2.5} />
              {/* Legs */}
              <line x1={0} y1={90} x2={-20} y2={130} stroke={colors.rhythm} strokeWidth={2.5} />
              <line x1={0} y1={90} x2={20} y2={130} stroke={colors.rhythm} strokeWidth={2.5} />
              {/* Confused eyes */}
              <circle cx={-8} cy={-5} r={3} fill={colors.rhythm} />
              <circle cx={8} cy={-5} r={3} fill={colors.rhythm} />
              {/* Squiggly mouth */}
              <path
                d={`M -8 8 Q -4 ${12 + wobble} 0 8 Q 4 ${4 - wobble} 8 8`}
                fill="none"
                stroke={colors.rhythm}
                strokeWidth={2}
              />
              {/* Label */}
              <text
                x={0}
                y={155}
                textAnchor="middle"
                fill={colors.rhythm}
                fontSize={16}
                fontFamily={fontFamily}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const Scene2Failure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text slides in
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleX = interpolate(titleProgress, [0, 1], [-80, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Glitch effect on "did not fail"
  const glitchCycle = frame % 60;
  const isGlitching = glitchCycle < 3 && frame > 2 * fps && frame < 15 * fps;
  const glitchX = isGlitching ? ((frame * 5) % 9) - 4 : 0;

  // Split panels enter
  const leftPanelProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 200 },
  });
  const leftPanelOpacity = interpolate(leftPanelProgress, [0, 1], [0, 1]);

  const rightPanelProgress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 200 },
  });
  const rightPanelOpacity = interpolate(rightPanelProgress, [0, 1], [0, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.gunmetal,
            opacity: titleOpacity,
            transform: `translateX(${titleX + glitchX}px)`,
          }}
        >
          AI did{" "}
          <span style={{ color: colors.darkCyra }}>not</span> fail.
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.oldRose,
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
            marginTop: 8,
          }}
        >
          The project did.
        </div>
      </div>

      {/* Split screen panels */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          alignItems: "flex-start",
        }}
      >
        {/* Left: code panel */}
        <div style={{ textAlign: "center" }}>
          <CodePanel opacity={leftPanelOpacity} />
          <div
            style={{
              marginTop: 16,
              fontSize: 20,
              color: colors.caribbeanGreen,
              fontWeight: "bold",
              opacity: leftPanelOpacity,
            }}
          >
            The Algorithm Works
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.rhythm,
            opacity: Math.min(leftPanelOpacity, rightPanelOpacity),
            alignSelf: "center",
          }}
        >
          vs
        </div>

        {/* Right: confused team */}
        <div style={{ textAlign: "center" }}>
          <BusinessTeam opacity={rightPanelOpacity} />
          <div
            style={{
              marginTop: 16,
              fontSize: 20,
              color: colors.oldRose,
              fontWeight: "bold",
              opacity: rightPanelOpacity,
            }}
          >
            The Business Doesn&apos;t
          </div>
        </div>
      </div>

      {/* Bottom subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: colors.rhythm,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        Another AI winter is unlikely. But many projects still fail.
      </div>
    </AbsoluteFill>
  );
};
