import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Modular architecture diagram with swappable model blocks
const ArchitectureDiagram: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  // System box appears
  const systemProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const systemOpacity = interpolate(systemProgress, [0, 1], [0, 1]);

  // Model A appears
  const modelAProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 12, stiffness: 120 },
  });
  const modelAOpacity = interpolate(modelAProgress, [0, 1], [0, 1]);

  // Model A slides out, Model B slides in
  const swapStart = 10 * fps;
  const swapDuration = 2 * fps;
  const swapProgress = interpolate(
    frame,
    [swapStart, swapStart + swapDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const modelAX = interpolate(swapProgress, [0, 1], [0, -300]);
  const modelASwapOpacity = interpolate(swapProgress, [0, 0.5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const modelBX = interpolate(swapProgress, [0, 1], [300, 0]);
  const modelBOpacity = interpolate(swapProgress, [0.3, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Swap back (Model B out, Model C in)
  const swap2Start = 15 * fps;
  const swap2Progress = interpolate(
    frame,
    [swap2Start, swap2Start + swapDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const modelBX2 = interpolate(swap2Progress, [0, 1], [0, -300]);
  const modelBSwapOpacity = interpolate(swap2Progress, [0, 0.5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const modelCX = interpolate(swap2Progress, [0, 1], [300, 0]);
  const modelCOpacity = interpolate(swap2Progress, [0.3, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showSwap2 = frame >= swap2Start;
  const showSwap1 = frame >= swapStart;

  return (
    <div
      style={{
        position: "relative",
        width: 900,
        height: 500,
        opacity: systemOpacity,
      }}
    >
      {/* System container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 100,
          width: 700,
          height: 500,
          border: `2px solid ${colors.darkCyra}40`,
          borderRadius: 20,
          backgroundColor: `${colors.magnolia}80`,
        }}
      >
        {/* System label */}
        <div
          style={{
            position: "absolute",
            top: -16,
            left: 30,
            backgroundColor: colors.magnolia,
            padding: "2px 16px",
            fontSize: 16,
            fontWeight: "bold",
            color: colors.darkCyra,
            letterSpacing: 2,
          }}
        >
          YOUR AI SYSTEM
        </div>

        {/* Input block */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 50,
            width: 160,
            height: 70,
            backgroundColor: colors.white,
            border: `2px solid ${colors.tiffanyBlue}`,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          Data Input
        </div>

        {/* Arrow from input to model slot */}
        <svg
          style={{ position: "absolute", top: 85, left: 220 }}
          width="100"
          height="20"
          viewBox="0 0 100 20"
        >
          <line x1={0} y1={10} x2={75} y2={10} stroke={colors.rhythm} strokeWidth={2} />
          <polygon points="75,4 95,10 75,16" fill={colors.rhythm} />
        </svg>

        {/* Model slot (swappable area) */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 320,
            width: 200,
            height: 130,
            border: `2px dashed ${colors.darkCyra}`,
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Model A */}
          {!showSwap1 && (
            <div
              style={{
                opacity: modelAOpacity,
                width: 180,
                height: 100,
                backgroundColor: colors.darkCyra,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              Model A
            </div>
          )}

          {/* Model A sliding out / Model B sliding in */}
          {showSwap1 && !showSwap2 && (
            <>
              <div
                style={{
                  position: "absolute",
                  opacity: modelASwapOpacity,
                  transform: `translateX(${modelAX}px)`,
                  width: 180,
                  height: 100,
                  backgroundColor: colors.darkCyra,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                Model A
              </div>
              <div
                style={{
                  position: "absolute",
                  opacity: modelBOpacity,
                  transform: `translateX(${modelBX}px)`,
                  width: 180,
                  height: 100,
                  backgroundColor: colors.caribbeanGreen,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                Model B
              </div>
            </>
          )}

          {/* Model B sliding out / Model C sliding in */}
          {showSwap2 && (
            <>
              <div
                style={{
                  position: "absolute",
                  opacity: modelBSwapOpacity,
                  transform: `translateX(${modelBX2}px)`,
                  width: 180,
                  height: 100,
                  backgroundColor: colors.caribbeanGreen,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                Model B
              </div>
              <div
                style={{
                  position: "absolute",
                  opacity: modelCOpacity,
                  transform: `translateX(${modelCX}px)`,
                  width: 180,
                  height: 100,
                  backgroundColor: colors.tiffanyBlue,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                Model C
              </div>
            </>
          )}
        </div>

        {/* Slot label */}
        <div
          style={{
            position: "absolute",
            top: 168,
            left: 340,
            fontSize: 13,
            color: colors.rhythm,
            letterSpacing: 1,
            fontWeight: "bold",
          }}
        >
          SWAPPABLE SLOT
        </div>

        {/* Arrow from model to output */}
        <svg
          style={{ position: "absolute", top: 85, left: 530 }}
          width="100"
          height="20"
          viewBox="0 0 100 20"
        >
          <line x1={0} y1={10} x2={75} y2={10} stroke={colors.rhythm} strokeWidth={2} />
          <polygon points="75,4 95,10 75,16" fill={colors.rhythm} />
        </svg>

        {/* Output block */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 30,
            width: 100,
            height: 70,
            backgroundColor: colors.white,
            border: `2px solid ${colors.tiffanyBlue}`,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          Output
        </div>

        {/* Monitoring / Experimentation layer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 50,
            right: 50,
            height: 80,
            border: `1px solid ${colors.viridianGreen}60`,
            borderRadius: 12,
            backgroundColor: `${colors.viridianGreen}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {["Monitor", "Compare", "Swap"].map((label, i) => {
            const delay = 6 * fps + i * 15;
            const p = spring({ frame, fps, delay, config: { damping: 200 } });
            return (
              <div
                key={label}
                style={{
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.viridianGreen,
                  backgroundColor: `${colors.viridianGreen}15`,
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: `1px solid ${colors.viridianGreen}30`,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Scene3Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 120 },
  });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);

  // Sub text
  const subProgress = spring({
    frame,
    fps,
    delay: 1.2 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Header */}
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
            color: colors.darkSlateGray,
            opacity: headingOpacity,
          }}
        >
          Design for{" "}
          <span style={{ color: colors.darkCyra }}>experimentation</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: colors.rhythm,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            marginTop: 10,
          }}
        >
          Swap models in. Swap models out. Continuous improvement.
        </div>
      </div>

      {/* Architecture diagram */}
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
        <ArchitectureDiagram frame={frame} fps={fps} />
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: colors.darkCyra,
          transform: `scaleX(${interpolate(frame, [fps, 8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
