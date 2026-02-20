import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene7ContinuousLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Feedback loop rotation
  const loopRotation = interpolate(frame, [0, 20 * fps], [0, 720], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Model box entrance
  const modelProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 80 },
  });
  const modelOpacity = interpolate(modelProgress, [0, 1], [0, 1]);
  const modelScale = interpolate(modelProgress, [0, 1], [0.7, 1]);

  // Feedback arrows entrance
  const arrowsProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const arrowsOpacity = interpolate(arrowsProgress, [0, 1], [0, 1]);

  // Tay warning box
  const tayProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const tayOpacity = interpolate(tayProgress, [0, 1], [0, 1]);
  const tayY = interpolate(tayProgress, [0, 1], [20, 0]);

  // Data drift indicator
  const driftProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const driftOpacity = interpolate(driftProgress, [0, 1], [0, 1]);

  // Rotating arrow segments for the feedback loop
  const arrowCount = 6;
  const loopRadius = 130;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #153d36 0%, #0d2420 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Continuous Learning ={" "}
          <span style={{ color: colors.corn }}>Continuous Risk</span>
        </div>
      </div>

      {/* Main feedback loop visualization */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          paddingTop: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 120,
            alignItems: "center",
          }}
        >
          {/* Left: Feedback loop */}
          <div
            style={{
              position: "relative",
              width: 400,
              height: 400,
            }}
          >
            <svg
              width={400}
              height={400}
              viewBox="0 0 400 400"
              style={{ opacity: arrowsOpacity }}
            >
              <defs>
                <filter id="loopGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Circular arrow segments */}
              {Array.from({ length: arrowCount }).map((_, i) => {
                const angle =
                  (i / arrowCount) * 360 + loopRotation * 0.3;
                const rad = (angle * Math.PI) / 180;
                const nextRad =
                  ((angle + 360 / arrowCount - 10) * Math.PI) / 180;
                const x1 = 200 + Math.cos(rad) * loopRadius;
                const y1 = 200 + Math.sin(rad) * loopRadius;
                const x2 = 200 + Math.cos(nextRad) * loopRadius;
                const y2 = 200 + Math.sin(nextRad) * loopRadius;

                const segmentColor = i % 2 === 0 ? colors.tiffanyBlue : colors.caribbeanGreen;

                return (
                  <g key={`arrow-${i}`} filter="url(#loopGlow)">
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={segmentColor}
                      strokeWidth={3}
                      opacity={0.7}
                    />
                    {/* Arrowhead */}
                    <circle
                      cx={x2}
                      cy={y2}
                      r={5}
                      fill={segmentColor}
                      opacity={0.9}
                    />
                  </g>
                );
              })}

              {/* Traveling dot on the loop */}
              {(() => {
                const dotAngle = (loopRotation * 1.5 * Math.PI) / 180;
                const dotX = 200 + Math.cos(dotAngle) * loopRadius;
                const dotY = 200 + Math.sin(dotAngle) * loopRadius;
                return (
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r={8}
                    fill={colors.corn}
                    filter="url(#loopGlow)"
                  />
                );
              })()}
            </svg>

            {/* Center model box */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${modelScale})`,
                opacity: modelOpacity,
                width: 140,
                height: 140,
                background: `${colors.white}15`,
                border: `2px solid ${colors.tiffanyBlue}60`,
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <svg width={40} height={40} viewBox="0 0 40 40">
                <rect
                  x={5}
                  y={5}
                  width={30}
                  height={30}
                  rx={6}
                  fill="none"
                  stroke={colors.tiffanyBlue}
                  strokeWidth={2}
                />
                <circle cx={15} cy={15} r={4} fill={colors.tiffanyBlue} opacity={0.6} />
                <circle cx={25} cy={15} r={4} fill={colors.tiffanyBlue} opacity={0.6} />
                <circle cx={20} cy={27} r={4} fill={colors.tiffanyBlue} opacity={0.6} />
              </svg>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                AI Model
              </div>
            </div>

            {/* Labels around the loop */}
            <div
              style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 20,
                color: colors.tiffanyBlue,
                fontWeight: 700,
                opacity: arrowsOpacity,
              }}
            >
              Learn
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 20,
                color: colors.caribbeanGreen,
                fontWeight: 700,
                opacity: arrowsOpacity,
              }}
            >
              Update
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: -40,
                transform: "translateY(-50%)",
                fontSize: 20,
                color: colors.tiffanyBlue,
                fontWeight: 700,
                opacity: arrowsOpacity,
              }}
            >
              Deploy
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: -50,
                transform: "translateY(-50%)",
                fontSize: 20,
                color: colors.caribbeanGreen,
                fontWeight: 700,
                opacity: arrowsOpacity,
              }}
            >
              Feedback
            </div>
          </div>

          {/* Right side: Warnings */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 580,
            }}
          >
            {/* Drift warning */}
            <div
              style={{
                opacity: driftOpacity,
                background: `${colors.corn}15`,
                border: `1px solid ${colors.corn}40`,
                borderRadius: 12,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <svg width={28} height={28} viewBox="0 0 28 28">
                <polygon
                  points="14,3 26,25 2,25"
                  fill="none"
                  stroke={colors.corn}
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
                <line
                  x1={14}
                  y1={11}
                  x2={14}
                  y2={18}
                  stroke={colors.corn}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <circle cx={14} cy={21} r={1.5} fill={colors.corn} />
              </svg>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  Data Drift
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: `${colors.white}90`,
                    marginTop: 6,
                  }}
                >
                  Biased data causes the model to drift silently
                </div>
              </div>
            </div>

            {/* Tay example */}
            <div
              style={{
                opacity: tayOpacity,
                transform: `translateY(${tayY}px)`,
                background: `${colors.oldRose}15`,
                border: `1px solid ${colors.oldRose}40`,
                borderRadius: 12,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <svg width={28} height={28} viewBox="0 0 28 28">
                <circle
                  cx={14}
                  cy={14}
                  r={12}
                  fill="none"
                  stroke={colors.oldRose}
                  strokeWidth={2}
                />
                <line
                  x1={9}
                  y1={9}
                  x2={19}
                  y2={19}
                  stroke={colors.oldRose}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <line
                  x1={19}
                  y1={9}
                  x2={9}
                  y2={19}
                  stroke={colors.oldRose}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  Remember Tay?
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: `${colors.white}90`,
                    marginTop: 6,
                  }}
                >
                  Learned from the public. Learned the wrong things.
                </div>
              </div>
            </div>

            {/* Governance needed */}
            <div
              style={{
                opacity: tayOpacity,
                transform: `translateY(${tayY}px)`,
                background: `${colors.darkCyra}20`,
                border: `1px solid ${colors.darkCyra}50`,
                borderRadius: 12,
                padding: "16px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: colors.white,
                  textAlign: "center",
                }}
              >
                Governance becomes essential
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
