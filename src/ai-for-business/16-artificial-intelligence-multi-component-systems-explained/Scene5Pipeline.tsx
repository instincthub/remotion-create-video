import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MicIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="14" y="6" width="12" height="20" rx="6" stroke={color} strokeWidth="2.5" />
    <path d="M8 22C8 28.6 13.4 34 20 34C26.6 34 32 28.6 32 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 34V38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const TextIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="4" y="8" width="32" height="24" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M10 16H30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 22H24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 28H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BrainIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 6C14 6 8 10 8 18C8 26 14 34 20 34C26 34 32 26 32 18C32 10 26 6 20 6Z" stroke={color} strokeWidth="2.5" />
    <path d="M20 6V34" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M12 14C14 16 16 14 18 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 14C24 16 26 14 28 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SpeakerIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M8 16H14L22 8V32L14 24H8V16Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M28 14C30 16 30 24 28 26" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 10C36 14 36 26 32 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const pipelineSteps = [
  { icon: MicIcon, label: "Speech-to-Text", description: "Voice input converted" },
  { icon: TextIcon, label: "Intent Detection", description: "Understanding the ask" },
  { icon: BrainIcon, label: "Question Answering", description: "Retrieving the answer" },
  { icon: SpeakerIcon, label: "Text-to-Speech", description: "Audio response output" },
];

export const Scene5Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Pipeline question
  const questionProgress = spring({
    frame,
    fps,
    delay: 1.8 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const questionOpacity = interpolate(questionProgress, [0, 1], [0, 1]);

  // Bottom note
  const noteProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const noteOpacity = interpolate(noteProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Chatbot <span style={{ color: colors.tiffanyBlue }}>Pipeline</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 26,
            color: `${colors.white}80`,
            marginTop: 12,
          }}
        >
          Not one model — a multi-layer system
        </div>
      </div>

      {/* Question bubble */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: questionOpacity,
        }}
      >
        <div
          style={{
            background: `${colors.tiffanyBlue}20`,
            border: `1px solid ${colors.tiffanyBlue}40`,
            borderRadius: 16,
            padding: "14px 32px",
            fontSize: 22,
            color: colors.tiffanyBlue,
            fontWeight: 700,
          }}
        >
          "Who is the president of the United States?"
        </div>
      </div>

      {/* Horizontal pipeline */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
        }}
      >
        {pipelineSteps.map((step, i) => {
          const stepDelay = 3 * fps + i * 20;
          const stepProgress = spring({
            frame,
            fps,
            delay: stepDelay,
            config: { damping: 12, stiffness: 70 },
          });
          const stepOpacity = interpolate(stepProgress, [0, 1], [0, 1]);
          const stepScale = interpolate(stepProgress, [0, 1], [0.8, 1]);

          const arrowProgress = spring({
            frame,
            fps,
            delay: stepDelay + 10,
            config: { damping: 10, stiffness: 80 },
          });
          const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 0.6]);

          const IconComponent = step.icon;

          return (
            <div
              key={`step-${i}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  opacity: stepOpacity,
                  transform: `scale(${stepScale})`,
                  width: 320,
                  background: `${colors.white}08`,
                  border: `1px solid ${colors.tiffanyBlue}30`,
                  borderRadius: 16,
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: `${colors.tiffanyBlue}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent color={colors.tiffanyBlue} />
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.white, marginBottom: 8 }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 16, color: `${colors.white}80` }}>
                  {step.description}
                </div>
              </div>

              {/* Arrow between steps */}
              {i < pipelineSteps.length - 1 && (
                <svg
                  width="40"
                  height="20"
                  viewBox="0 0 40 20"
                  style={{ opacity: arrowOpacity, flexShrink: 0 }}
                >
                  <path
                    d="M0 10H32M32 10L24 4M32 10L24 16"
                    stroke={colors.tiffanyBlue}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: noteOpacity,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: `${colors.white}cc` }}>
          This is not one model. It is a{" "}
          <span style={{ color: colors.tiffanyBlue }}>pipeline.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
