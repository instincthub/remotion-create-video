import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const HYPE_CARDS = [
  { text: "10 AI TOOLS YOU NEED", x: 120, y: 80, rotation: -4, speed: 0.02, offset: 0, amplitude: 12 },
  { text: "AI WILL REPLACE YOU", x: 1480, y: 140, rotation: 3, speed: 0.025, offset: 1.2, amplitude: 10 },
  { text: "This one prompt...", x: 300, y: 340, rotation: -2, speed: 0.018, offset: 2.4, amplitude: 14 },
  { text: "THREAD: \u{1F9F5}", x: 1300, y: 380, rotation: 5, speed: 0.03, offset: 0.8, amplitude: 8 },
  { text: "Change your life!", x: 160, y: 580, rotation: 2, speed: 0.022, offset: 3.1, amplitude: 11 },
  { text: "GPT just changed EVERYTHING", x: 1100, y: 620, rotation: -3, speed: 0.016, offset: 1.9, amplitude: 13 },
  { text: "You're falling behind", x: 700, y: 160, rotation: 1, speed: 0.028, offset: 0.5, amplitude: 9 },
  { text: "AI side hustle $10k/month", x: 800, y: 700, rotation: -5, speed: 0.02, offset: 2.7, amplitude: 15 },
];

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerTextOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const centerTextY = interpolate(
    spring({ frame, fps, delay: 60, config: { damping: 200 } }),
    [0, 1],
    [30, 0]
  );

  const centerTextFadeOut = interpolate(frame, [180, 220], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardsFadeOut = interpolate(frame, [240, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const noiseScale = spring({
    frame,
    fps,
    delay: 270,
    config: { damping: 8, stiffness: 100 },
  });

  const isGlitching = frame % 45 < 3 && frame > 280;
  const glitchX = isGlitching ? Math.sin(frame * 13) * 8 : 0;
  const glitchR = isGlitching ? Math.cos(frame * 17) * 4 : 0;

  return (
    <AbsoluteFill>
      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        }}
      />

      {/* Grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating hype cards */}
      {HYPE_CARDS.map((card, i) => {
        const driftY = Math.sin(frame * card.speed + card.offset) * card.amplitude;
        const driftX = Math.cos(frame * card.speed * 0.7 + card.offset) * card.amplitude * 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: card.x + driftX,
              top: card.y + driftY,
              transform: `rotate(${card.rotation}deg)`,
              width: 240,
              height: 60,
              borderRadius: 12,
              backgroundColor: "rgba(255,255,255,0.04)",
              border: `1px solid ${colors.chineseSilver}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
              opacity: cardsFadeOut,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 16,
                color: colors.chineseSilver,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {card.text}
            </span>
          </div>
        );
      })}

      {/* Center text: "Everyone is talking about AI." */}
      {frame >= 60 && frame < 240 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          <div
            style={{
              opacity: centerTextOpacity * centerTextFadeOut,
              transform: `translateY(${centerTextY}px)`,
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 56,
              color: colors.white,
              textAlign: "center",
            }}
          >
            Everyone is talking about AI.
          </div>
        </AbsoluteFill>
      )}

      {/* "NOISE" reveal */}
      {frame >= 270 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          {/* Glitch layer 1 — tiffanyBlue offset */}
          <div
            style={{
              position: "absolute",
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 200,
              color: colors.tiffanyBlue,
              opacity: isGlitching ? 0.4 : 0,
              transform: `scale(${noiseScale}) translate(${glitchX + 6}px, ${-glitchR}px)`,
            }}
          >
            NOISE
          </div>

          {/* Glitch layer 2 — oldRose offset */}
          <div
            style={{
              position: "absolute",
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 200,
              color: colors.oldRose,
              opacity: isGlitching ? 0.3 : 0,
              transform: `scale(${noiseScale}) translate(${-glitchX - 4}px, ${glitchR + 2}px)`,
            }}
          >
            NOISE
          </div>

          {/* Main NOISE text */}
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 200,
              color: colors.oldRose,
              transform: `scale(${noiseScale})`,
            }}
          >
            NOISE
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
