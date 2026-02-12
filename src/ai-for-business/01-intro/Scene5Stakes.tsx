import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Smart speaker illustration with music notes (Alexa in living room)
const SmartSpeakerCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating music notes
  const note1Y = (frame * 0.4) % 40;
  const note2Y = ((frame + 15) * 0.3) % 50;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg width="160" height="200" viewBox="0 0 160 200" fill="none">
        {/* Living room context - table surface */}
        <ellipse
          cx="80"
          cy="180"
          rx="70"
          ry="12"
          fill="rgba(0, 197, 162, 0.1)"
        />

        {/* Speaker body */}
        <rect
          x="45"
          y="70"
          width="70"
          height="100"
          rx="10"
          fill="rgba(0, 197, 162, 0.12)"
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
        />
        <ellipse
          cx="80"
          cy="70"
          rx="35"
          ry="10"
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
        />

        {/* Mesh lines on speaker */}
        {[90, 105, 120, 135, 150].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="110"
            y2={y}
            stroke={colors.caribbeanGreen}
            strokeWidth={0.8}
            opacity={0.3}
          />
        ))}

        {/* Glow ring - active */}
        <ellipse
          cx="80"
          cy="70"
          rx="28"
          ry="8"
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={2.5}
          opacity={0.7 + Math.sin(frame * 0.1) * 0.3}
        />

        {/* Music notes floating up */}
        <text
          x="120"
          y={55 - note1Y}
          fill={colors.caribbeanGreen}
          fontSize="22"
          opacity={Math.max(0, 0.8 - note1Y / 50)}
        >
          ♪
        </text>
        <text
          x="130"
          y={45 - note2Y}
          fill={colors.caribbeanGreen}
          fontSize="16"
          opacity={Math.max(0, 0.6 - note2Y / 60)}
        >
          ♫
        </text>
        <text
          x="25"
          y={50 - ((frame * 0.35) % 45)}
          fill={colors.caribbeanGreen}
          fontSize="18"
          opacity={Math.max(0, 0.7 - ((frame * 0.35) % 45) / 55)}
        >
          ♩
        </text>
      </svg>
    </div>
  );
};

// Medical / diagnostic illustration (stethoscope + heartbeat)
const MedicalCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Flatline effect - heartbeat that goes flat
  const isFlatline = frame > 30;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg width="160" height="200" viewBox="0 0 160 200" fill="none">
        {/* Medical cross */}
        <rect
          x="57"
          y="20"
          width="46"
          height="100"
          rx="6"
          fill="none"
          stroke={colors.oldRose}
          strokeWidth={2}
        />
        <rect
          x="30"
          y="47"
          width="100"
          height="46"
          rx="6"
          fill="none"
          stroke={colors.oldRose}
          strokeWidth={2}
        />
        {/* Inner cross fill */}
        <rect
          x="62"
          y="25"
          width="36"
          height="90"
          rx="4"
          fill="rgba(234, 95, 94, 0.12)"
        />
        <rect
          x="35"
          y="52"
          width="90"
          height="36"
          rx="4"
          fill="rgba(234, 95, 94, 0.12)"
        />

        {/* Heartbeat / EKG line */}
        <path
          d={
            isFlatline
              ? `M 10 170 L ${60 + Math.min(frame - 30, 90)} 170`
              : `M 10 170 L 30 170 L 40 155 L 50 185 L 60 160 L 70 175 L 80 170`
          }
          stroke={colors.oldRose}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* Stethoscope outline */}
        <path
          d="M55 130 C55 150, 80 165, 80 145 C80 165, 105 150, 105 130"
          stroke={colors.oldRose}
          strokeWidth={2}
          fill="none"
          opacity={0.5}
        />
        <circle
          cx="80"
          cy="148"
          r="8"
          stroke={colors.oldRose}
          strokeWidth={2}
          fill="none"
          opacity={0.5}
        />
      </svg>
    </div>
  );
};

export const Scene5Stakes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient shifts from light to dark as stakes escalate
  const bgDarken = interpolate(frame, [0, 12 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card 1: "Wrong song?" - casual slide in
  const card1Delay = 2 * fps;
  const card1Progress = spring({
    frame,
    fps,
    delay: card1Delay,
    config: { damping: 200 },
  });
  const card1X = interpolate(card1Progress, [0, 1], [-600, 0]);
  const card1Opacity = interpolate(card1Progress, [0, 1], [0, 1]);

  // Card 2: "Wrong diagnosis?" - slam in with impact
  const card2Delay = 12 * fps;
  const card2Progress = spring({
    frame,
    fps,
    delay: card2Delay,
    config: { damping: 12, stiffness: 200 },
  });
  const card2Scale = interpolate(card2Progress, [0, 1], [2, 1]);
  const card2Opacity = interpolate(card2Progress, [0, 1], [0, 1]);

  // Screen shake on card 2 impact
  const shakeFrame = frame - card2Delay;
  const isShaking = shakeFrame >= 0 && shakeFrame < 15;
  const shakeX = isShaking
    ? Math.sin(shakeFrame * 2.5) * (15 - shakeFrame) * 0.8
    : 0;
  const shakeY = isShaking
    ? Math.cos(shakeFrame * 3) * (15 - shakeFrame) * 0.5
    : 0;

  // VS divider
  const vsProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 200 },
  });
  const vsOpacity = interpolate(vsProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        fontFamily,
      }}
    >
      {/* Animated gradient background */}
      <AbsoluteFill style={{ backgroundColor: colors.viridianGreen }} />
      <AbsoluteFill
        style={{ backgroundColor: colors.gunmetal, opacity: bgDarken }}
      />

      {/* Content layout */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          padding: 100,
        }}
      >
        {/* Card 1: Wrong song */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${card1X}px)`,
            opacity: card1Opacity,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 197, 162, 0.12)",
              border: `3px solid ${colors.caribbeanGreen}`,
              borderRadius: 24,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <SmartSpeakerCard />
            <div
              style={{
                fontSize: 42,
                fontWeight: "bold",
                color: colors.caribbeanGreen,
                textAlign: "center",
              }}
            >
              Wrong song?
            </div>
            <div
              style={{
                fontSize: 22,
                color: colors.white,
                opacity: 0.7,
                textAlign: "center",
              }}
            >
              You laugh about it at dinner
            </div>
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
            opacity: vsOpacity * 0.6,
          }}
        >
          vs
        </div>

        {/* Card 2: Wrong diagnosis */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card2Scale})`,
            opacity: card2Opacity,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(234, 95, 94, 0.12)",
              border: `3px solid ${colors.oldRose}`,
              borderRadius: 24,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <MedicalCard />
            <div
              style={{
                fontSize: 42,
                fontWeight: "bold",
                color: colors.oldRose,
                textAlign: "center",
              }}
            >
              Wrong diagnosis?
            </div>
            <div
              style={{
                fontSize: 22,
                color: colors.white,
                opacity: 0.7,
                textAlign: "center",
              }}
            >
              That&apos;s someone&apos;s life
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
