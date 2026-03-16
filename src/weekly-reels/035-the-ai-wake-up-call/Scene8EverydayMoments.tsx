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
  { text: "Pushes through difficulty → Human Drive", bg: colors.darkCyra },
  { text: "Makes something new → Originality", bg: colors.caribbeanGreen },
  { text: "Comforts a friend → Empathy", bg: colors.turkishRose },
];

const Band: React.FC<{
  text: string;
  bg: string;
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ text, bg, frame, fps, startFrame }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 75 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const tx = interpolate(progress, [0, 1], [-400, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${tx}px)`,
        width: "100%",
        height: 60,
        background: bg,
        display: "flex",
        alignItems: "center",
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <span
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: colors.white,
          fontFamily,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene8EverydayMoments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const BAND_STARTS = [fps * 0.5, fps * 1.5, fps * 2.5];

  // Closing line appears after all bands
  const closingProgress = spring({
    frame: frame - fps * 4,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingY = interpolate(closingProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Soft ambient warm light */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, #3A3028 0%, transparent 60%)`,
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
          gap: 0,
        }}
      >
        {/* Three bands */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 12,
            marginBottom: 48,
          }}
        >
          {BANDS.map((band, i) => (
            <Band
              key={band.text}
              text={band.text}
              bg={band.bg}
              frame={frame}
              fps={fps}
              startFrame={BAND_STARTS[i]}
            />
          ))}
        </div>

        {/* Closing line */}
        <div
          style={{
            opacity: closingOpacity,
            transform: `translateY(${closingY}px)`,
            fontSize: 36,
            fontWeight: 700,
            fontStyle: "italic",
            color: colors.white,
            fontFamily,
            textAlign: "center",
            paddingLeft: 80,
            paddingRight: 80,
            lineHeight: 1.4,
          }}
        >
          The most powerful classroom is already in your home.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
