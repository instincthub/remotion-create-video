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
const WORD_START_FRAMES = [15, 55, 95]; // staggered: 0.5s, ~1.8s, ~3.2s

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
        fontSize: 76,
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

  // Strikethrough draws at ~4.2s (after all words visible)
  const strikeStart = Math.round(fps * 4.2);
  const strikeProgress = interpolate(
    frame,
    [strikeStart, strikeStart + Math.round(fps * 1.2)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtext appears at ~6s
  const subtextProgress = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const subtextOpacity = interpolate(subtextProgress, [0, 1], [0, 1]);
  const subtextY = interpolate(subtextProgress, [0, 1], [30, 0]);

  // Watermark fade in
  const watermarkOpacity = interpolate(frame, [Math.round(fps * 1), Math.round(fps * 2)], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Words dim once strikethrough starts
  const allVisible = frame >= WORD_START_FRAMES[2] + 20;

  // The three word blocks span roughly y=680 to y=1060 in portrait
  // strikethrough should cross horizontally through the middle of that stack
  // Using a single line at ~y=870 (center of word stack area)
  const strikeY = 870;
  const strikeX1 = 80;
  const strikeX2 = 1000;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Soft center spotlight */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 46%, #3D4A52 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Words stacked vertically center */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 320,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 32,
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
            fontSize: 44,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
            textAlign: "center",
            marginTop: 40,
            lineHeight: 1.35,
          }}
        >
          Good answers. Not the right answer.
        </div>
      </AbsoluteFill>

      {/* Strikethrough SVG — drawn over the words */}
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
            strokeWidth={7}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 328,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 15,
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
