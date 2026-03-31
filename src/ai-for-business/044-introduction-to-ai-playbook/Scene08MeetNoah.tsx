import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const NOAH_IMAGE_URL =
  "https://noaholatoye.nyc3.cdn.digitaloceanspaces.com/gallery/noaholatoye-speaking-2-min.jpg";

const MapPinIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
    <path
      d="M20 4 C13 4 8 9 8 16 C8 26 20 36 20 36 C20 36 32 26 32 16 C32 9 27 4 20 4Z"
      stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinejoin="round"
    />
    <circle cx="20" cy="16" r="5" stroke={colors.caribbeanGreen} strokeWidth="2" />
  </svg>
);

const GearChartIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
    <circle cx="16" cy="16" r="8" stroke={colors.caribbeanGreen} strokeWidth="2" />
    <circle cx="16" cy="16" r="4" stroke={colors.caribbeanGreen} strokeWidth="2" />
    {[0, 60, 120, 180, 240, 300].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={angle}
          x1={16 + Math.cos(rad) * 8} y1={16 + Math.sin(rad) * 8}
          x2={16 + Math.cos(rad) * 11} y2={16 + Math.sin(rad) * 11}
          stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinecap="round"
        />
      );
    })}
    <line x1="28" y1="36" x2="28" y2="24" stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinecap="round" />
    <line x1="33" y1="36" x2="33" y2="28" stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="36" x2="38" y2="20" stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CheckShieldIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
    <path
      d="M20 4 L32 10 L32 22 C32 30 26 36 20 38 C14 36 8 30 8 22 L8 10 Z"
      stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinejoin="round"
    />
    <polyline
      points="14,20 18,26 26,16"
      stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const CARDS = [
  { icon: MapPinIcon, text: "5,000+ learners across Africa and beyond.", delay: 180 },
  { icon: GearChartIcon, text: "Digital transformation consultant.", delay: 300 },
  { icon: CheckShieldIcon, text: "Not here to sell you AI hype.", delay: 420 },
];

export const Scene08MeetNoah: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sweepX = interpolate(frame, [0, 1125], [-400, 2400]);

  // Photo entrance
  const photoSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 40,
  });
  const photoScale = interpolate(photoSpring, [0, 1], [0.9, 1]);

  // Name entrance
  const nameSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 100,
  });
  const nameY = interpolate(nameSpring, [0, 1], [20, 0]);

  // Title entrance
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 140,
  });
  const titleY = interpolate(titleSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.deepGreenCyanTurquoise}, ${colors.brandCharcoal})`,
      }}
    >
      {/* Light sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: sweepX,
          width: 300,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}33, transparent)`,
          transform: "skewX(-15deg)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 200,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Left Side - Photo + Name */}
        <div
          style={{
            width: "40%",
            paddingLeft: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Photo with circular mask */}
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: "50%",
              overflow: "hidden",
              border: `4px solid ${colors.caribbeanGreen}`,
              opacity: photoSpring,
              transform: `scale(${photoScale})`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.3)`,
            }}
          >
            <Img
              src={NOAH_IMAGE_URL}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 48,
              color: colors.white,
              opacity: nameSpring,
              transform: `translateY(${nameY}px)`,
            }}
          >
            Noah Olatoye
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 26,
              color: colors.caribbeanGreen,
              opacity: titleSpring,
              transform: `translateY(${titleY}px)`,
            }}
          >
            Founder, InstinctHub
          </div>
        </div>

        {/* Right Side - Credentials */}
        <div
          style={{
            width: "55%",
            paddingRight: 120,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {CARDS.map((card, i) => {
            const cardSpring = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: card.delay,
            });
            const cardX = interpolate(cardSpring, [0, 1], [40, 0]);
            const IconComponent = card.icon;

            return (
              <div
                key={i}
                style={{
                  width: "100%",
                  height: 110,
                  borderRadius: 16,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 28,
                  paddingLeft: 32,
                  paddingRight: 32,
                  opacity: cardSpring,
                  transform: `translateX(${cardX}px)`,
                }}
              >
                <IconComponent />
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 500,
                    fontSize: 28,
                    color: colors.white,
                  }}
                >
                  {card.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
