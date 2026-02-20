import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Pipeline step box component
const PipelineStep: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sublabel: string;
  color: string;
  progress: number;
  glowColor: string;
  children?: React.ReactNode;
}> = ({ x, y, width, height, label, sublabel, color, progress, glowColor, children }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const slideX = interpolate(progress, [0, 1], [-80, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x + slideX,
        top: y,
        width,
        height,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `${color}18`,
        border: `2px solid ${color}`,
        borderRadius: 16,
        boxShadow: `0 0 24px ${glowColor}30, 0 0 60px ${glowColor}10`,
        padding: 16,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -14,
          left: 16,
          background: colors.darkNavy,
          padding: "2px 12px",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: "bold",
          color: colors.tiffanyBlue,
          letterSpacing: 2,
        }}
      >
        {sublabel}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
};

// Connecting arrow between pipeline steps
const PipelineArrow: React.FC<{
  x1: number;
  x2: number;
  y: number;
  progress: number;
}> = ({ x1, x2, y, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const drawLength = interpolate(progress, [0, 1], [0, x2 - x1]);

  return (
    <svg
      style={{ position: "absolute", left: x1, top: y - 2, opacity }}
      width={x2 - x1}
      height={4}
      viewBox={`0 0 ${x2 - x1} 4`}
    >
      <line
        x1={0}
        y1={2}
        x2={drawLength}
        y2={2}
        stroke={colors.darkCyra}
        strokeWidth={3}
        strokeDasharray="8 4"
      />
      <polygon
        points={`${drawLength - 8},0 ${drawLength},2 ${drawLength - 8},4`}
        fill={colors.darkCyra}
        opacity={interpolate(progress, [0, 0.8, 1], [0, 0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
    </svg>
  );
};

// Paper document icon SVG
const DocumentIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const scanLineY = interpolate(progress, [0, 1], [-10, 70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width="60" height="72" viewBox="0 0 60 72">
      {/* Paper */}
      <rect
        x={4}
        y={2}
        width={48}
        height={66}
        rx={4}
        fill={`${colors.white}15`}
        stroke={colors.chineseSilver}
        strokeWidth={1.5}
      />
      {/* Folded corner */}
      <path d="M 38 2 L 52 16" fill="none" stroke={colors.chineseSilver} strokeWidth={1} />
      <path d="M 38 2 L 38 16 L 52 16" fill={`${colors.white}10`} stroke={colors.chineseSilver} strokeWidth={1} />
      {/* Text lines */}
      <rect x={12} y={24} width={32} height={3} rx={1} fill={`${colors.chineseSilver}60`} />
      <rect x={12} y={32} width={28} height={3} rx={1} fill={`${colors.chineseSilver}40`} />
      <rect x={12} y={40} width={30} height={3} rx={1} fill={`${colors.chineseSilver}40`} />
      <rect x={12} y={48} width={24} height={3} rx={1} fill={`${colors.chineseSilver}30`} />
      <rect x={12} y={56} width={20} height={3} rx={1} fill={`${colors.chineseSilver}30`} />
      {/* Scan line */}
      {progress > 0 && (
        <rect
          x={6}
          y={scanLineY}
          width={44}
          height={2}
          fill={colors.tiffanyBlue}
          opacity={0.8}
        />
      )}
    </svg>
  );
};

// Risk gauge meter
const RiskGauge: React.FC<{ fillProgress: number }> = ({ fillProgress }) => {
  const fillAngle = interpolate(fillProgress, [0, 1], [-120, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gaugeColor = interpolate(fillProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const color =
    gaugeColor < 0.33
      ? colors.caribbeanGreen
      : gaugeColor < 0.66
        ? colors.corn
        : colors.oldRose;

  const needleX = 50 + 35 * Math.cos((fillAngle * Math.PI) / 180);
  const needleY = 55 + 35 * Math.sin((fillAngle * Math.PI) / 180);

  return (
    <svg width="100" height="70" viewBox="0 0 100 70">
      {/* Gauge arc background */}
      <path
        d="M 15 55 A 35 35 0 0 1 85 55"
        fill="none"
        stroke={`${colors.chineseSilver}30`}
        strokeWidth={8}
        strokeLinecap="round"
      />
      {/* Gauge arc fill */}
      <path
        d="M 15 55 A 35 35 0 0 1 85 55"
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${fillProgress * 110} 200`}
      />
      {/* Needle */}
      <line
        x1={50}
        y1={55}
        x2={needleX}
        y2={needleY}
        stroke={colors.white}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx={50} cy={55} r={4} fill={colors.white} />
      {/* Score text */}
      <text
        x={50}
        y={68}
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
        fill={color}
        fontFamily="Inter, sans-serif"
      >
        {Math.round(fillProgress * 100)}%
      </text>
    </svg>
  );
};

// Highlighted medical terms
const MedicalTerms: React.FC<{ progress: number }> = ({ progress }) => {
  const terms = [
    { text: "heart attack", delay: 0 },
    { text: "smoking history", delay: 0.2 },
    { text: "diabetes Type II", delay: 0.4 },
    { text: "hypertension", delay: 0.6 },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
      {terms.map((term, i) => {
        const termProgress = interpolate(
          progress,
          [term.delay, term.delay + 0.3],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <span
            key={`term-${i}`}
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.white,
              background: `${colors.tiffanyBlue}${Math.round(termProgress * 200) < 16 ? "0" : ""}${Math.round(termProgress * 200).toString(16)}`,
              padding: "4px 10px",
              borderRadius: 6,
              opacity: termProgress,
            }}
          >
            {term.text}
          </span>
        );
      })}
    </div>
  );
};

export const Scene6Insurance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Pipeline step timings (in seconds)
  const step1Start = 2 * fps;
  const step2Start = 7 * fps;
  const step3Start = 12 * fps;
  const step4Start = 18 * fps;

  // Step 1: Document / OCR
  const step1Progress = spring({
    frame,
    fps,
    delay: step1Start,
    config: { damping: 12, stiffness: 80 },
  });

  // Scan animation for document
  const scanProgress = interpolate(
    frame,
    [step1Start + fps, step1Start + 3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow 1 (between step 1 and 2)
  const arrow1Progress = spring({
    frame,
    fps,
    delay: step2Start - fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Step 2: NLP
  const step2Progress = spring({
    frame,
    fps,
    delay: step2Start,
    config: { damping: 12, stiffness: 80 },
  });

  // Arrow 2
  const arrow2Progress = spring({
    frame,
    fps,
    delay: step3Start - fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Step 3: Medical terms
  const step3Progress = spring({
    frame,
    fps,
    delay: step3Start,
    config: { damping: 12, stiffness: 80 },
  });

  // Medical term highlight progress
  const termHighlightProgress = interpolate(
    frame,
    [step3Start + fps, step3Start + 4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow 3
  const arrow3Progress = spring({
    frame,
    fps,
    delay: step4Start - fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Step 4: Risk score
  const step4Progress = spring({
    frame,
    fps,
    delay: step4Start,
    config: { damping: 12, stiffness: 80 },
  });

  // Risk gauge fill
  const gaugeFill = interpolate(
    frame,
    [step4Start + fps, step4Start + 5 * fps],
    [0, 0.78],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background grid animation
  const gridOffset = (frame * 0.3) % 60;

  // Subtitle text
  const subtitleProgress = spring({
    frame,
    fps,
    delay: 24 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  // Pipeline row Y position
  const pipelineY = 340;
  const stepWidth = 320;
  const stepHeight = 240;
  const gapWidth = 60;
  // Center: (1920 - (4*320 + 3*60)) / 2 = 230
  const startX = 230;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkNavy,
        fontFamily,
      }}
    >
      {/* Background grid */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.04 }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <line
            key={`vl-${i}`}
            x1={i * 60 + gridOffset}
            y1={0}
            x2={i * 60 + gridOffset}
            y2={1080}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`hl-${i}`}
            x1={0}
            y1={i * 60 + gridOffset}
            x2={1920}
            y2={i * 60 + gridOffset}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 56,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
          }}
        >
          Insurance{" "}
          <span style={{ color: colors.caribbeanGreen }}>Example</span>
        </div>
      </div>

      {/* Pipeline description */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          AI Underwriting Pipeline
        </div>
      </div>

      {/* Pipeline horizontal line */}
      <div
        style={{
          position: "absolute",
          left: startX,
          top: pipelineY + stepHeight / 2 - 1,
          width: interpolate(
            frame,
            [step1Start, step4Start + 2 * fps],
            [0, 1920 - startX * 2],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
          height: 2,
          background: `${colors.darkCyra}30`,
          zIndex: 0,
        }}
      />

      {/* Step 1: OCR Document */}
      <PipelineStep
        x={startX}
        y={pipelineY}
        width={stepWidth}
        height={stepHeight}
        label="Paper Document"
        sublabel="STEP 1 — OCR"
        color={colors.darkCyra}
        progress={step1Progress}
        glowColor={colors.darkCyra}
      >
        <div style={{ marginTop: 12 }}>
          <DocumentIcon progress={scanProgress} />
        </div>
      </PipelineStep>

      {/* Arrow 1 */}
      <PipelineArrow
        x1={startX + stepWidth + 10}
        x2={startX + stepWidth + gapWidth - 10}
        y={pipelineY + stepHeight / 2}
        progress={arrow1Progress}
      />

      {/* Step 2: NLP */}
      <PipelineStep
        x={startX + stepWidth + gapWidth}
        y={pipelineY}
        width={stepWidth}
        height={stepHeight}
        label="Text Extraction"
        sublabel="STEP 2 — NLP"
        color={colors.viridianGreen}
        progress={step2Progress}
        glowColor={colors.viridianGreen}
      >
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
          {[0.8, 0.6, 0.9, 0.5].map((w, i) => {
            const lineOpacity = interpolate(
              frame,
              [step2Start + fps + i * 8, step2Start + fps + i * 8 + 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={`line-${i}`}
                style={{
                  height: 8,
                  width: `${w * 100}%`,
                  borderRadius: 4,
                  background: `${colors.tiffanyBlue}${Math.round(lineOpacity * 100) < 16 ? "0" : ""}${Math.round(lineOpacity * 100).toString(16)}`,
                  opacity: lineOpacity,
                  alignSelf: "flex-start",
                  marginLeft: 16,
                }}
              />
            );
          })}
        </div>
      </PipelineStep>

      {/* Arrow 2 */}
      <PipelineArrow
        x1={startX + 2 * (stepWidth + gapWidth) - gapWidth + 10}
        x2={startX + 2 * (stepWidth + gapWidth) - 10}
        y={pipelineY + stepHeight / 2}
        progress={arrow2Progress}
      />

      {/* Step 3: Medical Terms */}
      <PipelineStep
        x={startX + 2 * (stepWidth + gapWidth)}
        y={pipelineY}
        width={stepWidth}
        height={stepHeight}
        label="Medical Terms"
        sublabel="STEP 3 — EXTRACT"
        color={colors.tiffanyBlue}
        progress={step3Progress}
        glowColor={colors.tiffanyBlue}
      >
        <div style={{ marginTop: 12 }}>
          <MedicalTerms progress={termHighlightProgress} />
        </div>
      </PipelineStep>

      {/* Arrow 3 */}
      <PipelineArrow
        x1={startX + 3 * (stepWidth + gapWidth) - gapWidth + 10}
        x2={startX + 3 * (stepWidth + gapWidth) - 10}
        y={pipelineY + stepHeight / 2}
        progress={arrow3Progress}
      />

      {/* Step 4: Risk Score */}
      <PipelineStep
        x={startX + 3 * (stepWidth + gapWidth)}
        y={pipelineY}
        width={stepWidth}
        height={stepHeight}
        label="Risk Assessment"
        sublabel="STEP 4 — SCORE"
        color={colors.caribbeanGreen}
        progress={step4Progress}
        glowColor={colors.caribbeanGreen}
      >
        <div style={{ marginTop: 8 }}>
          <RiskGauge fillProgress={gaugeFill} />
        </div>
      </PipelineStep>

      {/* Bottom insight text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontSize: 30,
            color: colors.chineseSilver,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Each step adds complexity.{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
            Each step must be auditable.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
