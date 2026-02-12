import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Data blocks that reshuffle into different shapes
const DataBlocks: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const blocksOpacity = interpolate(frame, [2 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Two sets of data blocks — same data, different order
  const dataValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const reorderedValues = ["C", "F", "A", "H", "B", "E", "D", "G"];

  // Shuffle happens
  const shuffleStart = 5 * fps;
  const shuffleDuration = 2 * fps;
  // Glitch effect during shuffle
  const isShuffling = frame >= shuffleStart && frame <= shuffleStart + shuffleDuration;
  const glitchX = isShuffling ? ((frame * 11) % 7) - 3 : 0;
  const glitchColor = isShuffling && frame % 4 < 2;

  // Second model appears
  const model2Progress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const model2Opacity = interpolate(model2Progress, [0, 1], [0, 1]);
  const model2Scale = interpolate(model2Progress, [0, 1], [0.8, 1]);

  const blockSize = 52;
  const gap = 8;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 100,
        opacity: blocksOpacity,
      }}
    >
      {/* Training Run 1 */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.tiffanyBlue,
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          TRAINING RUN 1
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(4, ${blockSize}px)`,
            gap,
            transform: `translateX(${glitchX}px)`,
          }}
        >
          {dataValues.map((val, i) => (
            <div
              key={i}
              style={{
                width: blockSize,
                height: blockSize,
                backgroundColor: glitchColor ? colors.oldRose : colors.darkCyra,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "monospace",
                color: colors.white,
              }}
            >
              {val}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          <svg width="60" height="40" viewBox="0 0 60 40">
            <line x1={30} y1={0} x2={30} y2={28} stroke={colors.tiffanyBlue} strokeWidth={2} />
            <polygon points="22,28 38,28 30,40" fill={colors.tiffanyBlue} />
          </svg>
        </div>
        <div
          style={{
            width: 220,
            height: 60,
            backgroundColor: colors.darkCyra,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          Model Alpha
        </div>
      </div>

      {/* Not equals sign */}
      <div
        style={{
          fontSize: 56,
          fontWeight: "bold",
          color: colors.oldRose,
          opacity: model2Opacity,
          alignSelf: "center",
          marginTop: 60,
        }}
      >
        ≠
      </div>

      {/* Training Run 2 (reordered) */}
      <div style={{ textAlign: "center", opacity: model2Opacity, transform: `scale(${model2Scale})` }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.caribbeanGreen,
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          TRAINING RUN 2
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(4, ${blockSize}px)`,
            gap,
          }}
        >
          {reorderedValues.map((val, i) => {
            const originalIndex = dataValues.indexOf(val);
            const reorderHighlight = originalIndex !== i;
            return (
              <div
                key={i}
                style={{
                  width: blockSize,
                  height: blockSize,
                  backgroundColor: reorderHighlight
                    ? colors.caribbeanGreen
                    : colors.viridianGreen,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: colors.white,
                }}
              >
                {val}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 20 }}>
          <svg width="60" height="40" viewBox="0 0 60 40">
            <line x1={30} y1={0} x2={30} y2={28} stroke={colors.caribbeanGreen} strokeWidth={2} />
            <polygon points="22,28 38,28 30,40" fill={colors.caribbeanGreen} />
          </svg>
        </div>
        <div
          style={{
            width: 220,
            height: 60,
            backgroundColor: colors.caribbeanGreen,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          Model Beta
        </div>
      </div>
    </div>
  );
};

export const Scene7NonDeterministic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 10, stiffness: 100 },
  });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);

  // Sub text
  const subProgress = spring({
    frame,
    fps,
    delay: 1 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [15, 0]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 10 * fps,
    config: { damping: 200 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  // Background glitch streaks
  const glitchFrame = frame % 60;
  const showGlitch = glitchFrame < 3 && frame > 4 * fps && frame < 12 * fps;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.gunmetal} 0%, #1e2d36 100%)`,
        fontFamily,
      }}
    >
      {/* Glitch streak overlays */}
      {showGlitch && (
        <AbsoluteFill>
          <div
            style={{
              position: "absolute",
              top: (frame * 37) % 800,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: colors.oldRose,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: (frame * 53) % 900 + 100,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: colors.tiffanyBlue,
              opacity: 0.3,
            }}
          />
        </AbsoluteFill>
      )}

      {/* Heading */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: "bold",
            color: colors.white,
            opacity: headingOpacity,
          }}
        >
          Not always{" "}
          <span style={{ color: colors.oldRose }}>deterministic</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            marginTop: 10,
          }}
        >
          Same data. Different model.
        </div>
      </div>

      {/* Data blocks visualization */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DataBlocks frame={frame} fps={fps} />
      </div>

      {/* Bottom callout */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 20,
            color: colors.corn,
            fontWeight: "bold",
            backgroundColor: `${colors.corn}12`,
            padding: "12px 32px",
            borderRadius: 8,
            border: `1px solid ${colors.corn}30`,
          }}
        >
          This challenges a core assumption of software engineering
        </div>
      </div>
    </AbsoluteFill>
  );
};
