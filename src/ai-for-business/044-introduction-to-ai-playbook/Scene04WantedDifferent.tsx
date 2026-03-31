import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

export const Scene04WantedDifferent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Vertical accent bar height
  const barHeight = interpolate(frame, [0, 60], [0, 440], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [30, 0]);

  // Bullet 1
  const bullet1Progress = spring({
    frame,
    fps,
    delay: 100,
    config: { damping: 200 },
  });
  const bullet1Y = interpolate(bullet1Progress, [0, 1], [20, 0]);

  // Bullet 2
  const bullet2Progress = spring({
    frame,
    fps,
    delay: 160,
    config: { damping: 200 },
  });
  const bullet2Y = interpolate(bullet2Progress, [0, 1], [20, 0]);

  // Emphasis
  const emphasisProgress = spring({
    frame,
    fps,
    delay: 250,
    config: { damping: 12, stiffness: 100 },
  });
  const emphasisScale = interpolate(emphasisProgress, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.deepGreenCyanTurquoise,
      }}
    >
      {/* Vertical accent bar */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 180,
          width: 6,
          height: barHeight,
          backgroundColor: colors.brandTeal,
          borderRadius: 3,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          paddingLeft: 160,
          paddingTop: 200,
          paddingRight: 80,
          maxWidth: 1400,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 64,
            color: colors.white,
            opacity: headlineProgress,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          I wanted something different.
        </div>

        {/* Bullet 1 */}
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 36,
            color: colors.white,
            opacity: bullet1Progress,
            transform: `translateY(${bullet1Y}px)`,
          }}
        >
          AI as a practical skill. Not a buzzword.
        </div>

        {/* Bullet 2 */}
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 400,
            fontSize: 36,
            color: colors.caribbeanGreen,
            opacity: bullet2Progress,
            transform: `translateY(${bullet2Y}px)`,
          }}
        >
          Built for the global workforce.
        </div>

        {/* Emphasis */}
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 32,
            color: colors.tiffanyBlue,
            opacity: emphasisProgress,
            transform: `scale(${emphasisScale})`,
            transformOrigin: "left center",
          }}
        >
          African professionals at the centre.
        </div>
      </div>
    </AbsoluteFill>
  );
};
