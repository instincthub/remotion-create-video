import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const PERSONAS = [
  {
    label: "Developer",
    sub: "Build smarter tools",
    delay: 80,
    icon: "developer",
  },
  {
    label: "Business Pro",
    sub: "Drive real results",
    delay: 160,
    icon: "business",
  },
  {
    label: "Entrepreneur",
    sub: "Ship faster, cheaper",
    delay: 240,
    icon: "entrepreneur",
  },
  {
    label: "Manager",
    sub: "Lead AI adoption",
    delay: 320,
    icon: "manager",
  },
  {
    label: "Student",
    sub: "Get hands-on skills",
    delay: 400,
    icon: "student",
  },
];

const DeveloperIcon: React.FC = () => (
  <svg width="70" height="70" viewBox="0 0 60 60" fill="none">
    <polyline
      points="10,30 22,18 10,6"
      stroke={colors.darkCyra}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(6, 15)"
    />
    <polyline
      points="50,30 38,18 50,6"
      stroke={colors.darkCyra}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(-6, 15)"
    />
    <line x1="24" y1="42" x2="36" y2="42" stroke={colors.darkCyra} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const BusinessIcon: React.FC = () => (
  <svg width="70" height="70" viewBox="0 0 60 60" fill="none">
    <rect x="10" y="20" width="40" height="28" rx="3" stroke={colors.darkCyra} strokeWidth="2.5" />
    <path d="M20 20 L20 16 C20 13 23 10 26 10 L34 10 C37 10 40 13 40 16 L40 20" stroke={colors.darkCyra} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="32" x2="50" y2="32" stroke={colors.darkCyra} strokeWidth="2.5" />
    <circle cx="30" cy="32" r="3" stroke={colors.darkCyra} strokeWidth="2.5" />
  </svg>
);

const RocketIcon: React.FC = () => (
  <svg width="70" height="70" viewBox="0 0 60 60" fill="none">
    <path d="M30 8 C30 8 24 20 24 34 L36 34 C36 20 30 8 30 8Z" stroke={colors.darkCyra} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M24 34 L20 42 L26 38" stroke={colors.darkCyra} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M36 34 L40 42 L34 38" stroke={colors.darkCyra} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="30" cy="24" r="3" stroke={colors.darkCyra} strokeWidth="2.5" />
    <path d="M27 42 L30 50 L33 42" stroke={colors.darkCyra} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OrgChartIcon: React.FC = () => (
  <svg width="70" height="70" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="14" r="6" stroke={colors.darkCyra} strokeWidth="2.5" />
    <line x1="30" y1="20" x2="30" y2="28" stroke={colors.darkCyra} strokeWidth="2.5" />
    <line x1="14" y1="28" x2="46" y2="28" stroke={colors.darkCyra} strokeWidth="2.5" />
    <line x1="14" y1="28" x2="14" y2="34" stroke={colors.darkCyra} strokeWidth="2.5" />
    <circle cx="14" cy="40" r="6" stroke={colors.darkCyra} strokeWidth="2.5" />
    <line x1="46" y1="28" x2="46" y2="34" stroke={colors.darkCyra} strokeWidth="2.5" />
    <circle cx="46" cy="40" r="6" stroke={colors.darkCyra} strokeWidth="2.5" />
    <line x1="30" y1="28" x2="30" y2="34" stroke={colors.darkCyra} strokeWidth="2.5" />
    <circle cx="30" cy="40" r="6" stroke={colors.darkCyra} strokeWidth="2.5" />
  </svg>
);

const BookIcon: React.FC = () => (
  <svg width="70" height="70" viewBox="0 0 60 60" fill="none">
    <path
      d="M10 14 L10 46 C16 42 24 42 30 46 C36 42 44 42 50 46 L50 14 C44 18 36 18 30 14 C24 18 16 18 10 14Z"
      stroke={colors.darkCyra} strokeWidth="2.5" strokeLinejoin="round"
    />
    <line x1="30" y1="14" x2="30" y2="46" stroke={colors.darkCyra} strokeWidth="2.5" />
  </svg>
);

const ICON_MAP: Record<string, React.FC> = {
  developer: DeveloperIcon,
  business: BusinessIcon,
  entrepreneur: RocketIcon,
  manager: OrgChartIcon,
  student: BookIcon,
};

export const Scene07WhoItsFor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 20,
  });

  const cardsOpacity = interpolate(frame, [840, 900], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardsShiftY = interpolate(frame, [840, 900], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const reassurance1Spring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 880,
  });
  const reassurance1Y = interpolate(reassurance1Spring, [0, 1], [30, 0]);

  const reassurance2Spring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 960,
  });
  const reassurance2Y = interpolate(reassurance2Spring, [0, 1], [30, 0]);

  const topRow = PERSONAS.slice(0, 2);
  const bottomRow = PERSONAS.slice(2);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.magnolia}, ${colors.white})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          right: 80,
          bottom: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 56,
            color: colors.brandCharcoal,
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
            marginBottom: 50,
          }}
        >
          Who is this for?
        </div>

        {/* Persona Cards */}
        <div
          style={{
            opacity: cardsOpacity,
            transform: `translateY(${cardsShiftY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          {/* Top Row */}
          <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
            {topRow.map((persona, i) => {
              const cardSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: persona.delay,
              });
              const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
              const IconComponent = ICON_MAP[persona.icon];

              return (
                <div
                  key={i}
                  style={{
                    width: 380,
                    height: 220,
                    borderRadius: 20,
                    backgroundColor: colors.white,
                    border: `2px solid ${colors.darkCyra}30`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    opacity: cardSpring,
                    transform: `translateY(${cardY}px)`,
                  }}
                >
                  {IconComponent && <IconComponent />}
                  <div
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 700,
                      fontSize: 28,
                      color: colors.brandCharcoal,
                    }}
                  >
                    {persona.label}
                  </div>
                  <div
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 400,
                      fontSize: 20,
                      color: colors.darkSlateGray,
                    }}
                  >
                    {persona.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row */}
          <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
            {bottomRow.map((persona, i) => {
              const cardSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: persona.delay,
              });
              const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
              const IconComponent = ICON_MAP[persona.icon];

              return (
                <div
                  key={i}
                  style={{
                    width: 380,
                    height: 220,
                    borderRadius: 20,
                    backgroundColor: colors.white,
                    border: `2px solid ${colors.darkCyra}30`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    opacity: cardSpring,
                    transform: `translateY(${cardY}px)`,
                  }}
                >
                  {IconComponent && <IconComponent />}
                  <div
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 700,
                      fontSize: 28,
                      color: colors.brandCharcoal,
                    }}
                  >
                    {persona.label}
                  </div>
                  <div
                    style={{
                      fontFamily: bodyFont,
                      fontWeight: 400,
                      fontSize: 20,
                      color: colors.darkSlateGray,
                    }}
                  >
                    {persona.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2: Reassurance */}
        {frame >= 840 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 36,
              backgroundColor: colors.white,
            }}
          >
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 60,
                color: colors.brandCharcoal,
                opacity: reassurance1Spring,
                transform: `translateY(${reassurance1Y}px)`,
                textAlign: "center",
                maxWidth: 1400,
              }}
            >
              You do not need to be an ML engineer.
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: 42,
                color: colors.darkCyra,
                opacity: reassurance2Spring,
                transform: `translateY(${reassurance2Y}px)`,
                textAlign: "center",
                maxWidth: 1400,
              }}
            >
              You just need to show up — and build something.
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
