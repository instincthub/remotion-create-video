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
// Staggered entrances: 0.5s, 2.5s, 4.5s (2s apart as spec requires)
const WORD_START_FRAMES = [15, 75, 135];

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
  const scale = interpolate(progress, [0, 1], [0.88, 1]);

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

  // All words visible once 3rd word has entered (~4.5s + settle)
  const allVisible = frame >= WORD_START_FRAMES[2] + 20;

  // Strikethrough draws at ~6.5s (after all words visible + brief pause)
  const strikeStart = Math.round(fps * 6.5);
  const strikeProgress = interpolate(
    frame,
    [strikeStart, strikeStart + Math.round(fps * 1.2)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtext appears at ~8.5s
  const subtextProgress = spring({
    frame: frame - Math.round(fps * 8.5),
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const subtextOpacity = interpolate(subtextProgress, [0, 1], [0, 1]);
  const subtextY = interpolate(subtextProgress, [0, 1], [30, 0]);

  // Watermark fade in
  const watermarkOpacity = interpolate(
    frame,
    [Math.round(fps * 1), Math.round(fps * 2)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Strike line sweeps through the center of the stacked word block
  // Words are vertically centered in the 1920px height (minus 320px bottom safe zone)
  // Effective center area is around y=780
  const strikeY = 790;
  const strikeX1 = 80;
  const strikeX2 = 1000;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Soft radial glow at center */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 44%, #3D4A52 0%, transparent 62%)`,
          pointerEvents: "none",
        }}
      />

      {/* Words stacked vertically, centered */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px 340px",
          gap: 36,
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

        {/* Subtext */}
        <div
          style={{
            opacity: subtextOpacity,
            transform: `translateY(${subtextY}px)`,
            fontSize: 48,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
            textAlign: "center",
            marginTop: 48,
            lineHeight: 1.35,
          }}
        >
          Good answers. Not the right answer.
        </div>
      </AbsoluteFill>

      {/* Strikethrough SVG — drawn across word block */}
      {strikeProgress > 0 && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <line
            x1={strikeX1}
            y1={strikeY}
            x2={strikeX1 + (strikeX2 - strikeX1) * strikeProgress}
            y2={strikeY}
            stroke={colors.oldRose}
            strokeWidth={8}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 60,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
