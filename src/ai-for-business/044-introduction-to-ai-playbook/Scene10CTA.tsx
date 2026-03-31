import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

// Animated concentric rings behind the subscribe button
const PulseRing: React.FC<{ frame: number; delay: number; size: number }> = ({
  frame,
  delay,
  size,
}) => {
  const cycle = Math.max(0, frame - delay) % 90;
  const scale = interpolate(cycle, [0, 90], [0.8, 1.6]);
  const opacity = interpolate(cycle, [0, 90], [0.5, 0]);
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${colors.white}`,
        transform: `scale(${scale})`,
        opacity: frame > delay ? opacity : 0,
      }}
    />
  );
};

export const Scene10CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === PHASE 1: Subscribe (0-450) ===
  const phase1Opacity = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscribe button entrance
  const btnSpring = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 12, stiffness: 80 },
  });
  const btnScale = interpolate(btnSpring, [0, 1], [0.3, 1]);

  // Bell wobble
  const bellSpring = spring({
    frame,
    fps,
    delay: 80,
    config: { damping: 200 },
  });

  // "Every week, a new session" text
  const weeklySpring = spring({
    frame,
    fps,
    delay: 160,
    config: { damping: 200 },
  });
  const weeklyY = interpolate(weeklySpring, [0, 1], [20, 0]);

  // "Missing it means missing the work" text
  const missingSpring = spring({
    frame,
    fps,
    delay: 240,
    config: { damping: 200 },
  });

  // === PHASE 2: Community (450-780) ===
  const phase2Opacity = interpolate(frame, [450, 490], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Exit = interpolate(frame, [730, 780], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const communityTitleSpring = spring({
    frame,
    fps,
    delay: 480,
    config: { damping: 200 },
  });

  // Three avatar circles stagger in
  const avatar1 = spring({ frame, fps, delay: 510, config: { damping: 200 } });
  const avatar2 = spring({ frame, fps, delay: 540, config: { damping: 200 } });
  const avatar3 = spring({ frame, fps, delay: 570, config: { damping: 200 } });

  const linkSpring = spring({
    frame,
    fps,
    delay: 600,
    config: { damping: 200 },
  });

  const freeTagSpring = spring({
    frame,
    fps,
    delay: 650,
    config: { damping: 12, stiffness: 100 },
  });

  // === PHASE 3: Closing rally (780-1155) ===
  const phase3Opacity = interpolate(frame, [780, 820], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const seriousSpring = spring({
    frame,
    fps,
    delay: 820,
    config: { damping: 200 },
  });
  const seriousY = interpolate(seriousSpring, [0, 1], [30, 0]);

  const partOfItSpring = spring({
    frame,
    fps,
    delay: 920,
    config: { damping: 200 },
  });
  const partOfItY = interpolate(partOfItSpring, [0, 1], [20, 0]);

  const letsGoSpring = spring({
    frame,
    fps,
    delay: 1020,
    config: { damping: 10, stiffness: 100 },
  });
  const letsGoScale = interpolate(letsGoSpring, [0, 1], [0.6, 1]);

  // Divider line for phase 3
  const dividerSpring = spring({
    frame,
    fps,
    delay: 880,
    config: { damping: 200 },
  });

  // Background gradient shift across phases
  const bgHue = interpolate(frame, [0, 450, 780, 1155], [0, 0.3, 0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgR1 = Math.round(interpolate(bgHue, [0, 1], [15, 10]));
  const bgG1 = Math.round(interpolate(bgHue, [0, 1], [26, 20]));
  const bgB1 = Math.round(interpolate(bgHue, [0, 1], [23, 18]));
  const bgR2 = Math.round(interpolate(bgHue, [0, 1], [32, 26]));
  const bgG2 = Math.round(interpolate(bgHue, [0, 1], [58, 50]));
  const bgB2 = Math.round(interpolate(bgHue, [0, 1], [53, 43]));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, rgb(${bgR2},${bgG2},${bgB2}), rgb(${bgR1},${bgG1},${bgB1}))`,
      }}
    >
      {/* Subtle diagonal lines pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.015) 80px,
            rgba(255,255,255,0.015) 81px
          )`,
        }}
      />

      {/* ===== PHASE 1: Subscribe ===== */}
      {frame < 460 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase1Opacity,
          }}
        >
          {/* Big subscribe button */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {/* Pulse rings */}
            <PulseRing frame={frame} delay={60} size={320} />
            <PulseRing frame={frame} delay={90} size={320} />
            <PulseRing frame={frame} delay={120} size={320} />

            {/* Button */}
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: 80,
                paddingLeft: 72,
                paddingRight: 72,
                paddingTop: 28,
                paddingBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `scale(${btnScale})`,
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="6,2 28,16 6,30" fill={colors.darkCyra} />
              </svg>
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 56,
                  color: colors.brandCharcoal,
                  letterSpacing: -1,
                }}
              >
                Subscribe
              </div>
            </div>
          </div>

          {/* Bell with wobble */}
          <div
            style={{
              opacity: bellSpring,
              transform: `rotate(${Math.sin(frame * 0.15) * (frame > 80 ? 12 : 0)}deg)`,
              marginBottom: 36,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 4C24 4 14 8 14 20L14 28L10 32L10 34L38 34L38 32L34 28L34 20C34 8 24 4 24 4Z"
                stroke={colors.caribbeanGreen}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M20 34C20 37 22 40 24 40C26 40 28 37 28 34"
                stroke={colors.caribbeanGreen}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="24" cy="4" r="2" fill={colors.caribbeanGreen} />
            </svg>
          </div>

          {/* Supporting text */}
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 32,
              color: colors.white,
              opacity: weeklySpring * 0.9,
              transform: `translateY(${weeklyY}px)`,
              textAlign: "center",
            }}
          >
            Every week, there is a new session.
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 300,
              fontSize: 26,
              color: colors.caribbeanGreen,
              opacity: missingSpring * 0.8,
              marginTop: 12,
              textAlign: "center",
            }}
          >
            Missing it means missing the work.
          </div>
        </div>
      )}

      {/* ===== PHASE 2: Community ===== */}
      {frame >= 450 && frame < 790 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase2Opacity * phase2Exit,
          }}
        >
          {/* Avatar row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {[
              { progress: avatar1, color: colors.darkCyra },
              { progress: avatar2, color: colors.viridianGreen },
              { progress: avatar3, color: colors.tiffanyBlue },
            ].map((av, i) => (
              <div
                key={i}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: av.color,
                  border: `3px solid ${colors.brandCharcoal}`,
                  marginLeft: i === 0 ? 0 : -20,
                  opacity: av.progress,
                  transform: `translateY(${interpolate(av.progress, [0, 1], [20, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3 - i,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="12" r="6" stroke="white" strokeWidth="2" />
                  <path
                    d="M8 32 C8 24 12 20 18 20 C24 20 28 24 28 32"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 56,
              color: colors.white,
              opacity: communityTitleSpring,
              transform: `translateY(${interpolate(communityTitleSpring, [0, 1], [20, 0])}px)`,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Join the AI Playbook community
          </div>

          {/* Link text */}
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 28,
              color: colors.caribbeanGreen,
              opacity: linkSpring,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            The link is in the description below.
          </div>

          {/* FREE tag pill */}
          <div
            style={{
              backgroundColor: colors.caribbeanGreen,
              borderRadius: 40,
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 14,
              paddingBottom: 14,
              opacity: freeTagSpring,
              transform: `scale(${interpolate(freeTagSpring, [0, 1], [0.6, 1])})`,
            }}
          >
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 24,
                color: colors.brandCharcoal,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Free to join
            </div>
          </div>
        </div>
      )}

      {/* ===== PHASE 3: Closing rally ===== */}
      {frame >= 780 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase3Opacity,
          }}
        >
          {/* "We are building something serious" */}
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 64,
              color: colors.white,
              opacity: seriousSpring,
              transform: `translateY(${seriousY}px)`,
              textAlign: "center",
              maxWidth: 1200,
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            We are building something serious here.
          </div>

          {/* Thin horizontal rule */}
          <div
            style={{
              width: interpolate(dividerSpring, [0, 1], [0, 300]),
              height: 2,
              background: `linear-gradient(90deg, transparent, ${colors.caribbeanGreen}, transparent)`,
              marginBottom: 28,
            }}
          />

          {/* "And I want you to be part of it!" */}
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 38,
              color: colors.white,
              opacity: partOfItSpring * 0.9,
              transform: `translateY(${partOfItY}px)`,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            And I want you to be part of it!
          </div>

          {/* "Let us get to work" badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: "rgba(255,255,255,0.12)",
              border: `2px solid ${colors.caribbeanGreen}`,
              borderRadius: 60,
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 18,
              paddingBottom: 18,
              opacity: letsGoSpring,
              transform: `scale(${letsGoScale})`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M4 14 L22 14 M16 8 L22 14 L16 20"
                stroke={colors.caribbeanGreen}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 32,
                color: colors.caribbeanGreen,
                letterSpacing: 1,
              }}
            >
              Let us get to work.
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
