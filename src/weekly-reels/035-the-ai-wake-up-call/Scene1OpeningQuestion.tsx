import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const WORDS = ["Coding.", "Mathematics.", "A second language."];
const WORD_START_FRAMES = [15, 45, 75]; // 0.5s, 1.5s, 2.5s

const WordLine: React.FC<{
  text: string;
  frame: number;
  fps: number;
  startFrame: number;
  dimmed: boolean;
}> = ({ text, frame, fps, startFrame, dimmed }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const opacity = interpolate(progress, [0, 1], [0, dimmed ? 0.4 : 1]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        fontSize: 80,
        fontWeight: 700,
        color: colors.white,
        fontFamily,
        lineHeight: 1.2,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

export const Scene1OpeningQuestion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Strikethrough draws at ~3.5s
  const strikeStart = fps * 3.5;
  const strikeProgress = interpolate(frame, [strikeStart, strikeStart + fps * 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtext appears at ~5s
  const subtextProgress = spring({
    frame: frame - fps * 5,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const subtextOpacity = interpolate(subtextProgress, [0, 1], [0, 1]);
  const subtextY = interpolate(subtextProgress, [0, 1], [30, 0]);

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Which words are dimmed (all dim once strikethrough appears)
  const allVisible = frame >= WORD_START_FRAMES[2] + 15;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Radial spotlight center */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, #3D4A52 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Words stacked center */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 20,
        }}
      >
        {WORDS.map((word, i) => (
          <WordLine
            key={word}
            text={word}
            frame={frame}
            fps={fps}
            startFrame={WORD_START_FRAMES[i]}
            dimmed={allVisible && strikeProgress > 0}
          />
        ))}

        {/* Strikethrough SVG overlay */}
        {strikeProgress > 0 && (
          <svg
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <line
              x1={80}
              y1={540}
              x2={80 + (1760 * strikeProgress)}
              y2={540}
              stroke={colors.oldRose}
              strokeWidth={6}
            />
          </svg>
        )}

        {/* Subtext */}
        <div
          style={{
            opacity: subtextOpacity,
            transform: `translateY(${subtextY}px)`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
            textAlign: "center",
            marginTop: 32,
          }}
        >
          Good answers. Not the right answer.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 14,
          fontWeight: 700,
          color: colors.white,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
