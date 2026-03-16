import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const BANDS = [
  {
    bg: colors.darkCyra,
    text: "Pushes through difficulty",
    tag: "Human Drive",
    delay: 0,
  },
  {
    bg: colors.caribbeanGreen,
    text: "Makes something new",
    tag: "Originality",
    delay: 24, // 0.8s
  },
  {
    bg: colors.turkishRose,
    text: "Comforts a friend",
    tag: "Empathy",
    delay: 48, // 1.6s
  },
];

const Band: React.FC<{
  bg: string;
  text: string;
  tag: string;
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ bg, text, tag, frame, fps, startFrame }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  const tx = interpolate(progress, [0, 1], [-600, 0]);
  const opacity = interpolate(progress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${tx}px)`,
        background: bg,
        borderRadius: 12,
        padding: "20px 40px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: colors.white,
          fontFamily,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: `${colors.white}CC`,
          fontFamily,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
        }}
      >
        → {tag}
      </div>
    </div>
  );
};

export const Scene8EverydayMoments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const BAND_START = fps * 1;

  // "Most powerful classroom" text after all bands settle (~5s)
  const classroomProgress = spring({
    frame: frame - fps * 5,
    fps,
    config: { damping: 16, stiffness: 65 },
  });
  const classroomOpacity = interpolate(classroomProgress, [0, 1], [0, 1]);
  const classroomScale = interpolate(classroomProgress, [0, 1], [0.95, 1]);

  // Warm ambient glow pulse
  const glowPulse = interpolate(
    frame % (fps * 3),
    [0, fps * 1.5, fps * 3],
    [0.2, 0.45, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Warm ambient glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.darkCyra}50 0%, transparent 60%)`,
          opacity: glowPulse,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 20,
        }}
      >
        {/* Bands */}
        {BANDS.map((band) => (
          <Band
            key={band.tag}
            bg={band.bg}
            text={band.text}
            tag={band.tag}
            frame={frame}
            fps={fps}
            startFrame={BAND_START + band.delay}
          />
        ))}

        {/* Classroom quote */}
        <div
          style={{
            opacity: classroomOpacity,
            transform: `scale(${classroomScale})`,
            fontSize: 38,
            fontWeight: 700,
            fontStyle: "italic",
            color: colors.white,
            fontFamily,
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.4,
            marginTop: 20,
          }}
        >
          The most powerful classroom is already in your home.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
