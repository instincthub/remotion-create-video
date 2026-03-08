import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Code block component
const CodeBlock: React.FC<{ delay: number; y: number; width: number }> = ({
  delay,
  y,
  width,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 80 },
  });

  const float = Math.sin(frame * 0.04 + delay * 0.3) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 80,
        transform: `translateX(${interpolate(entrance, [0, 1], [-200, 0])}px) translateY(${float}px)`,
        opacity: interpolate(entrance, [0, 1], [0, 0.6]),
      }}
    >
      <div
        style={{
          width,
          height: 12,
          borderRadius: 6,
          backgroundColor: `${colors.tiffanyBlue}40`,
          border: `1px solid ${colors.tiffanyBlue}25`,
        }}
      />
    </div>
  );
};

export const Scene3DevelopersAsJudges: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Coder (0-15s = 0-450 frames)
  // Phase 2: Judge (15s+ = 450+ frames)
  const isJudgePhase = frame > 450;

  const coderOpacity = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const judgeEntrance = spring({
    frame: Math.max(0, frame - 450),
    fps,
    delay: 5,
    config: { damping: 14, stiffness: 80 },
  });

  const gavelSlam = spring({
    frame: Math.max(0, frame - 520),
    fps,
    config: { damping: 8, stiffness: 120 },
  });
  const gavelRotation = interpolate(gavelSlam, [0, 1], [-45, 0]);

  // Checklist items
  const checklistItems = ["Critique", "Adjust", "Approve"];

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
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
          paddingLeft: 50,
          paddingRight: 50,
          gap: 24,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          From{" "}
          <span style={{ color: colors.tiffanyBlue }}>Creators</span>
          <br />
          To{" "}
          <span style={{ color: colors.turkishRose }}>Judges</span>
        </div>

        {/* Coder phase - typing animation */}
        {!isJudgePhase && (
          <div style={{ opacity: coderOpacity, position: "relative", width: 300, height: 220 }}>
            {/* Monitor */}
            <svg width="300" height="220" viewBox="0 0 300 220" fill="none">
              <rect
                x="30"
                y="10"
                width="240"
                height="160"
                rx="8"
                fill={`${colors.darkSlateGray}`}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
              />
              {/* Screen content - code lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const lineWidth = [160, 120, 180, 100, 140, 90][i];
                const lineDelay = i * 8;
                const lineOpacity = interpolate(
                  frame,
                  [lineDelay + 30, lineDelay + 45],
                  [0, 0.7],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <rect
                    key={i}
                    x="50"
                    y={30 + i * 22}
                    width={lineWidth}
                    height={8}
                    rx={4}
                    fill={colors.tiffanyBlue}
                    opacity={lineOpacity}
                  />
                );
              })}
              {/* Cursor blink */}
              <rect
                x="50"
                y={30 + 6 * 22}
                width={2}
                height={14}
                fill={colors.tiffanyBlue}
                opacity={Math.sin(frame * 0.2) > 0 ? 0.8 : 0}
              />
              {/* Stand */}
              <rect x="130" y="170" width="40" height="20" fill={colors.chineseSilver} opacity={0.3} />
              <rect x="110" y="190" width="80" height="6" rx="3" fill={colors.chineseSilver} opacity={0.3} />
            </svg>
          </div>
        )}

        {/* Judge phase - gavel */}
        {isJudgePhase && (
          <div
            style={{
              opacity: interpolate(judgeEntrance, [0, 1], [0, 1]),
              transform: `scale(${interpolate(judgeEntrance, [0, 1], [0.5, 1])})`,
            }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              {/* Gavel */}
              <g style={{ transform: `rotate(${gavelRotation}deg)`, transformOrigin: "130px 130px" }}>
                {/* Handle */}
                <rect x="90" y="80" width="12" height="100" rx="4" fill={colors.turkishRose} opacity={0.8} />
                {/* Head */}
                <rect x="70" y="65" width="60" height="30" rx="6" fill={colors.turkishRose} />
              </g>
              {/* Sound block */}
              <rect x="55" y="170" width="90" height="16" rx="4" fill={`${colors.turkishRose}40`} stroke={colors.turkishRose} strokeWidth={1.5} />
              {/* Impact lines */}
              {gavelSlam > 0.8 &&
                [0, 1, 2].map((i) => {
                  const lineOpacity = Math.sin(frame * 0.15 + i * 2) * 0.3 + 0.4;
                  return (
                    <line
                      key={i}
                      x1={40 - i * 8}
                      y1={160 + i * 8}
                      x2={30 - i * 8}
                      y2={155 + i * 8}
                      stroke={colors.turkishRose}
                      strokeWidth={2}
                      strokeLinecap="round"
                      opacity={lineOpacity}
                    />
                  );
                })}
            </svg>

            {/* Review checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
              {checklistItems.map((item, i) => {
                const itemEntrance = spring({
                  frame: Math.max(0, frame - 550 - i * 15),
                  fps,
                  config: { damping: 14, stiffness: 80 },
                });
                return (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      opacity: interpolate(itemEntrance, [0, 1], [0, 1]),
                      transform: `translateX(${interpolate(itemEntrance, [0, 1], [40, 0])}px)`,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="4" stroke={colors.turkishRose} strokeWidth={1.5} fill={`${colors.turkishRose}15`} />
                      <path d="M7 12 L10 15 L17 8" stroke={colors.turkishRose} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 24, color: colors.chineseSilver, fontWeight: 400 }}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* Floating code blocks in background */}
      <CodeBlock delay={15} y={200} width={180} />
      <CodeBlock delay={25} y={350} width={140} />
      <CodeBlock delay={35} y={500} width={200} />
      <CodeBlock delay={45} y={650} width={120} />
    </AbsoluteFill>
  );
};
