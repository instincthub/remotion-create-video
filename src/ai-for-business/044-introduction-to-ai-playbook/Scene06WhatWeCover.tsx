import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const ITEMS = [
  { icon: "clock-gear", label: "AI workflows that save you time", delay: 30 },
  {
    icon: "brain-shield",
    label: "LLMs without hallucinations",
    delay: 200,
  },
  { icon: "robot-arm", label: "Automate your manual tasks", delay: 370 },
  {
    icon: "head-lightbulb",
    label: "Think like a practitioner",
    delay: 540,
  },
  { icon: "wrench-doc", label: "Real examples. Real tools.", delay: 710 },
];

const ClockGearIcon: React.FC = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="36" cy="36" r="22" stroke="white" strokeWidth="2.5" />
    <line x1="36" y1="36" x2="36" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="36" y1="36" x2="46" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="36" cy="36" r="2" stroke="white" strokeWidth="2" />
    <circle cx="58" cy="58" r="12" stroke="white" strokeWidth="2.5" />
    <circle cx="58" cy="58" r="6" stroke="white" strokeWidth="2" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 58 + Math.cos(rad) * 12;
      const y1 = 58 + Math.sin(rad) * 12;
      const x2 = 58 + Math.cos(rad) * 16;
      const y2 = 58 + Math.sin(rad) * 16;
      return (
        <line
          key={angle}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="white" strokeWidth="2.5" strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const BrainShieldIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
    <path
      d="M40 16 C30 16 22 20 20 28 C18 36 20 42 24 46 C28 50 30 54 30 60 L50 60 C50 54 52 50 56 46 C60 42 62 36 60 28 C58 20 50 16 40 16Z"
      stroke="white" strokeWidth="2.5" strokeLinejoin="round"
    />
    <path d="M40 20 C40 30 36 36 40 44" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 28 C36 30 38 34 34 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 28 C44 30 42 34 46 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M56 50 L56 62 C56 68 50 72 50 72 C50 72 44 68 44 62 L44 50 Z"
      stroke="white" strokeWidth="2.5" strokeLinejoin="round"
    />
    <polyline points="47,58 50,61 55,55" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RobotArmIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
    <rect x="12" y="62" width="20" height="6" rx="2" stroke="white" strokeWidth="2.5" />
    <line x1="22" y1="62" x2="34" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="34" cy="40" r="4" stroke="white" strokeWidth="2.5" />
    <line x1="34" y1="40" x2="52" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="52" cy="24" r="4" stroke="white" strokeWidth="2.5" />
    <line x1="52" y1="24" x2="62" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="62" y1="18" x2="68" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="62" y1="18" x2="68" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const HeadLightbulbIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
    <path
      d="M24 60 L24 44 C24 30 32 20 44 20 C52 20 56 26 56 34 L56 38 C56 42 52 44 50 44 L46 44 C44 44 42 46 42 48 L42 60 Z"
      stroke="white" strokeWidth="2.5" strokeLinejoin="round"
    />
    <circle cx="46" cy="32" r="2" stroke="white" strokeWidth="2" />
    <path
      d="M40 4 C35 4 32 8 32 12 C32 15 34 17 36 18 L44 18 C46 17 48 15 48 12 C48 8 45 4 40 4Z"
      stroke="white" strokeWidth="2.5" strokeLinejoin="round"
    />
    <line x1="36" y1="18" x2="44" y2="18" stroke="white" strokeWidth="2" />
    <line x1="40" y1="0" x2="40" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="4" x2="52" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="30" y1="4" x2="28" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WrenchDocIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
    <rect x="28" y="12" width="36" height="48" rx="4" stroke="white" strokeWidth="2.5" />
    <line x1="36" y1="24" x2="56" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="36" y1="32" x2="56" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="36" y1="40" x2="48" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 58 L28 42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M12 58 C10 60 10 64 12 66 C14 68 18 68 20 66 L22 64"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="28" cy="42" r="6" stroke="white" strokeWidth="2.5" />
  </svg>
);

const ICON_MAP: Record<string, React.FC> = {
  "clock-gear": ClockGearIcon,
  "brain-shield": BrainShieldIcon,
  "robot-arm": RobotArmIcon,
  "head-lightbulb": HeadLightbulbIcon,
  "wrench-doc": WrenchDocIcon,
};

export const Scene06WhatWeCover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
      }}
    >
      {/* Showcase Phase: frames 0-860 */}
      {frame < 860 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            bottom: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ITEMS.map((item, i) => {
            const itemStart = item.delay;
            const nextStart =
              i < ITEMS.length - 1 ? ITEMS[i + 1].delay : 860;
            const fadeOutStart = nextStart - 20;

            const entranceSpring = spring({
              frame,
              fps,
              config: { damping: 15, stiffness: 100 },
              delay: itemStart,
            });

            const exitOpacity =
              i < ITEMS.length - 1
                ? interpolate(
                    frame,
                    [fadeOutStart, fadeOutStart + 20],
                    [1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )
                : 1;

            const scale = interpolate(entranceSpring, [0, 1], [0.7, 1]);
            const opacity = entranceSpring * exitOpacity;

            if (frame < itemStart || opacity <= 0) return null;

            const IconComponent = ICON_MAP[item.icon];

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 40,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    border: "2.5px solid rgba(255,255,255,0.25)",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {IconComponent && <IconComponent />}
                </div>
                {/* Label */}
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 500,
                    fontSize: 48,
                    color: colors.white,
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Collect Phase: frames 860-1065 */}
      {frame >= 860 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            bottom: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
          }}
        >
          {/* Header */}
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 600,
              fontSize: 48,
              color: colors.caribbeanGreen,
            }}
          >
            We cover things like:
          </div>
          {/* Icon row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 50,
            }}
          >
            {ITEMS.map((item, i) => {
              const badgeSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 860 + i * 15,
              });

              const IconComponent = ICON_MAP[item.icon];

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    opacity: badgeSpring,
                    transform: `scale(${interpolate(badgeSpring, [0, 1], [0.5, 1])})`,
                  }}
                >
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      border: "2.5px solid rgba(255,255,255,0.25)",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ transform: "scale(0.6)" }}>
                      {IconComponent && <IconComponent />}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 400,
                      fontSize: 18,
                      color: colors.white,
                      textAlign: "center",
                      maxWidth: 160,
                      opacity: 0.8,
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
