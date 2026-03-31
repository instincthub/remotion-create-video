import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

export const Scene02Different: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mainTextProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });
  const mainTextY = interpolate(mainTextProgress, [0, 1], [40, 0]);
  const mainTextOpacity = mainTextProgress;

  const subTextProgress = spring({
    frame,
    fps,
    delay: 150,
    config: { damping: 200 },
  });
  const subTextY = interpolate(subTextProgress, [0, 1], [20, 0]);
  const subTextOpacity = subTextProgress;

  const sweepLeft = interpolate(frame, [0, 405], [-400, 2400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.brandCharcoal,
      }}
    >
      {/* Light sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: sweepLeft,
          width: 300,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}20, transparent)`,
          transform: "skewX(-15deg)",
        }}
      />

      {/* Centered content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          {/* Horizontal accent line */}
          <div
            style={{
              width: lineWidth,
              height: 3,
              backgroundColor: colors.tiffanyBlue,
              borderRadius: 2,
            }}
          />

          {/* Main text */}
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 72,
              color: colors.white,
              opacity: mainTextOpacity,
              transform: `translateY(${mainTextY}px)`,
              textAlign: "center",
            }}
          >
            This channel is different.
          </div>

          {/* Subtext */}
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: 32,
              color: colors.caribbeanGreen,
              opacity: subTextOpacity,
              transform: `translateY(${subTextY}px)`,
              textAlign: "center",
            }}
          >
            The most useful thing you will watch this year.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
