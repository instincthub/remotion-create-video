import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const PROBLEM_CARDS = [
  {
    delay: 90,
    label: "Theory without practice",
    icon: "graduation",
  },
  {
    delay: 210,
    label: "Features without workflows",
    icon: "monitor",
  },
  {
    delay: 330,
    label: "Built for Silicon Valley",
    icon: "globe",
  },
];

const CITIES = [
  { name: "Lagos", cx: 152, cy: 270, delay: 570 },
  { name: "Nairobi", cx: 260, cy: 248, delay: 600 },
  { name: "Accra", cx: 132, cy: 234, delay: 630 },
];

const GraduationCapIcon: React.FC = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path
      d="M32 12L4 28L32 44L60 28L32 12Z"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M16 36V48L32 56L48 48V36"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56 28V44"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* Red X overlay */}
    <path
      d="M20 18L44 42M44 18L20 42"
      stroke={colors.oldRose}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </svg>
);

const MonitorPlayIcon: React.FC = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect
      x="8"
      y="8"
      width="48"
      height="36"
      rx="4"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
    />
    <path
      d="M28 20L40 28L28 36V20Z"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M24 52H40"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path
      d="M32 44V52"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* Red X overlay */}
    <path
      d="M20 18L44 42M44 18L20 42"
      stroke={colors.oldRose}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </svg>
);

const GlobeIcon: React.FC = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="24" stroke={colors.tiffanyBlue} strokeWidth={2} />
    <ellipse cx="32" cy="32" rx="12" ry="24" stroke={colors.tiffanyBlue} strokeWidth={2} />
    <path
      d="M8 32H56"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
    />
    <path
      d="M12 18H52"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
    />
    <path
      d="M12 46H52"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
    />
    {/* Red X overlay */}
    <path
      d="M20 18L44 42M44 18L20 42"
      stroke={colors.oldRose}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </svg>
);

const ICON_MAP: Record<string, React.FC> = {
  graduation: GraduationCapIcon,
  monitor: MonitorPlayIcon,
  globe: GlobeIcon,
};

// Simplified Africa outline path
const AFRICA_PATH =
  "M200,20 L220,15 L240,25 L260,20 L280,30 L295,25 L310,40 L320,60 L330,80 L340,100 L345,130 L350,160 L355,180 L360,200 L365,220 L370,240 L368,260 L360,280 L350,300 L340,320 L325,340 L310,355 L290,370 L270,380 L250,385 L235,390 L220,385 L210,375 L195,360 L180,345 L165,325 L155,305 L145,280 L140,260 L135,240 L130,220 L128,200 L130,180 L135,160 L140,140 L148,120 L155,100 L160,80 L165,60 L170,45 L180,30 L190,22 Z";

export const Scene03Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    delay: 0,
    config: { damping: 200 },
  });

  // Phase 2 fade
  const phase1Opacity = interpolate(frame, [520, 560], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase2Opacity = interpolate(frame, [540, 580], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const africaScale = spring({
    frame,
    fps,
    delay: 550,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill>
      {/* Background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${colors.gunmetal}, ${colors.brandCharcoal})`,
        }}
      />

      {/* Phase 1: Problem Cards */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 880,
          opacity: phase1Opacity,
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 44,
            color: colors.white,
            opacity: headerProgress,
            transform: `translateY(${interpolate(headerProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          Here is what I kept seeing.
        </div>

        {/* Cards row */}
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {PROBLEM_CARDS.map((card, i) => {
            const cardSpring = spring({
              frame,
              fps,
              delay: card.delay,
              config: { damping: 15, stiffness: 100 },
            });
            const cardScale = interpolate(cardSpring, [0, 1], [0.7, 1]);
            const cardOpacity = cardSpring;
            const IconComponent = ICON_MAP[card.icon];

            return (
              <div
                key={i}
                style={{
                  width: 440,
                  height: 300,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 28,
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                }}
              >
                <IconComponent />
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 500,
                    fontSize: 24,
                    color: colors.white,
                    textAlign: "center",
                    padding: "0 24px",
                  }}
                >
                  {card.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase 2: Africa Map */}
      {frame >= 520 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
            opacity: phase2Opacity,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 400,
              height: 450,
              transform: `scale(${africaScale})`,
            }}
          >
            {/* Africa outline */}
            <svg
              width="400"
              height="450"
              viewBox="100 0 300 420"
              fill="none"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <path
                d={AFRICA_PATH}
                stroke={colors.tiffanyBlue}
                strokeWidth={2.5}
                fill="none"
                strokeLinejoin="round"
              />
            </svg>

            {/* City dots and labels */}
            {CITIES.map((city) => {
              const dotProgress = spring({
                frame,
                fps,
                delay: city.delay,
                config: { damping: 200 },
              });

              // Pulsing ring animation
              const ringFrame = frame - city.delay;
              const ringCycle = ringFrame > 0 ? ringFrame % 60 : 0;
              const ringScale = interpolate(ringCycle, [0, 59], [1, 2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const ringOpacity =
                ringFrame > 0
                  ? interpolate(ringCycle, [0, 59], [0.8, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : 0;

              return (
                <div key={city.name}>
                  {/* Expanding ring */}
                  <div
                    style={{
                      position: "absolute",
                      left: city.cx - 8,
                      top: city.cy - 8,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: `2px solid ${colors.caribbeanGreen}`,
                      opacity: ringOpacity * dotProgress,
                      transform: `scale(${ringScale})`,
                    }}
                  />

                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: city.cx - 8,
                      top: city.cy - 8,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: colors.caribbeanGreen,
                      opacity: dotProgress,
                      transform: `scale(${dotProgress})`,
                    }}
                  />

                  {/* City name */}
                  <div
                    style={{
                      position: "absolute",
                      left: city.cx - 40,
                      top: city.cy + 14,
                      width: 80,
                      textAlign: "center",
                      fontFamily: displayFont,
                      fontWeight: 600,
                      fontSize: 28,
                      color: colors.caribbeanGreen,
                      opacity: dotProgress,
                      transform: `translateY(${interpolate(dotProgress, [0, 1], [10, 0])}px)`,
                    }}
                  >
                    {city.name}
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
