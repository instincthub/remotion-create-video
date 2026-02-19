import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Rules that multiply rapidly and overwhelm the screen
const RuleExplosion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rules = [
    "IF fever THEN check_infection",
    "IF age < 5 THEN reduce_dose",
    "IF allergy THEN avoid_penicillin",
    "IF cough AND fever THEN x_ray",
    "IF bp > 140 THEN prescribe_med",
    "IF diabetes THEN monitor_sugar",
    "IF headache THEN check_bp",
    "IF rash THEN dermatology",
    "IF chest_pain THEN ECG",
    "IF pregnant THEN adjust_all",
    "IF elderly THEN lower_dose",
    "IF smoker THEN lung_screen",
    "IF obese THEN diet_plan",
    "IF anemic THEN iron_supp",
    "IF insomnia THEN sleep_study",
    "IF joint_pain THEN rheumatology",
    "IF vision_blur THEN eye_exam",
    "IF dizzy THEN neuro_check",
    "IF nausea THEN GI_consult",
    "IF fatigue THEN thyroid_test",
    "IF swelling THEN ultrasound",
    "IF bleeding THEN coag_test",
    "IF weight_loss THEN full_panel",
    "IF numbness THEN nerve_test",
    "IF tremor THEN brain_scan",
    "IF shortness_breath THEN pulmonary",
    "IF back_pain THEN spine_MRI",
    "IF ear_pain THEN ENT_referral",
    "IF anxiety THEN psych_eval",
    "IF memory_loss THEN cognitive",
  ];

  // Exponential growth of visible rules
  const growthStart = 2 * fps;
  const growthEnd = 8 * fps;
  const growthProgress = interpolate(frame, [growthStart, growthEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Starts slow, accelerates
  const visibleCount = Math.floor(Math.pow(growthProgress, 2) * rules.length);

  // Screen shake when rules overwhelm
  const shakeIntensity =
    growthProgress > 0.7 ? (growthProgress - 0.7) * 15 : 0;
  const shakeX = Math.sin(frame * 0.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 0.7) * shakeIntensity;

  // Positions for the rule boxes - scattered around the screen
  const positions = rules.map((_, i) => ({
    x: 80 + ((i * 347) % 1600),
    y: 160 + ((i * 193) % 700),
    rotation: ((i * 23) % 20) - 10,
    scale: 0.7 + ((i * 7) % 4) * 0.1,
  }));

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {rules.slice(0, visibleCount).map((rule, i) => {
        const pos = positions[i];
        const entryProgress = spring({
          frame: Math.max(0, frame - growthStart - i * 3),
          fps,
          config: { damping: 15, stiffness: 120 },
        });
        const opacity = interpolate(entryProgress, [0, 1], [0, 0.9]);
        const scale = interpolate(entryProgress, [0, 1], [0.3, pos.scale]);

        // Redden as we get more overwhelmed
        const urgency = i / rules.length;
        const bgColor =
          urgency > 0.7
            ? `${colors.oldRose}30`
            : urgency > 0.4
              ? `${colors.corn}20`
              : `${colors.white}E0`;
        const borderColor =
          urgency > 0.7
            ? colors.oldRose
            : urgency > 0.4
              ? colors.corn
              : colors.chineseSilver;

        return (
          <div
            key={`rule-${i}`}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              padding: "8px 14px",
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "monospace",
              color: colors.gunmetal,
              opacity,
              transform: `scale(${scale}) rotate(${pos.rotation}deg)`,
              whiteSpace: "nowrap",
            }}
          >
            {rule}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Warning icon
const WarningIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const warningDelay = 7 * fps;
  const warningProgress = spring({
    frame,
    fps,
    delay: warningDelay,
    config: { damping: 8, stiffness: 100 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);
  const warningScale = interpolate(warningProgress, [0, 1], [0.3, 1]);

  // Pulse
  const pulse = frame > warningDelay ? Math.sin(frame * 0.1) * 0.1 + 1 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${warningScale * pulse})`,
        opacity: warningOpacity,
        zIndex: 10,
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        <polygon
          points="60,10 110,100 10,100"
          fill={colors.corn}
          stroke={colors.gunmetal}
          strokeWidth={3}
        />
        <text
          x={60}
          y={82}
          textAnchor="middle"
          fontSize={50}
          fontWeight="bold"
          fill={colors.gunmetal}
          fontFamily="Inter, sans-serif"
        >
          !
        </text>
      </svg>
    </div>
  );
};

export const Scene6KnowledgeBottleneck: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // "Did not scale" text
  const scaleProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const scaleOpacity = interpolate(scaleProgress, [0, 1], [0, 1]);

  // Overlay darkens as rules accumulate
  const overlayOpacity = interpolate(frame, [5 * fps, 9 * fps], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <RuleExplosion />

      {/* Darkening overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.gunmetal,
          opacity: overlayOpacity,
          pointerEvents: "none",
        }}
      />

      <WarningIcon />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textShadow: `0 2px 20px ${colors.white}`,
          }}
        >
          The{" "}
          <span style={{ color: colors.oldRose }}>Knowledge Bottleneck</span>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: scaleOpacity,
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 32px",
            backgroundColor: `${colors.gunmetal}E0`,
            borderRadius: 10,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: colors.oldRose,
            }}
          >
            Slow. Expensive. Did not scale.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
