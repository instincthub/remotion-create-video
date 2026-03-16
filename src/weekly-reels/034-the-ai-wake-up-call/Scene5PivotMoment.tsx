import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene5PivotMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: STOP PANICKING (0–9s)
  const stopProgress = spring({ frame, fps, config: { damping: 200 } });
  const stopOpacity = interpolate(stopProgress, [0, 1], [0, 1]);

  // Phase 2: START PREPARING (9s onward)
  const startProgress = spring({
    frame: frame - fps * 9,
    fps,
    config: { damping: 200 },
  });
  const startOpacity = interpolate(startProgress, [0, 1], [0, 1]);

  // Crossfade: stop fades out as start fades in
  const stopFadeOut = interpolate(
    frame,
    [fps * 8, fps * 9 + 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // DarkCyra overlay fades in during second half
  const overlayOpacity = interpolate(
    frame,
    [fps * 8, fps * 11],
    [0, 0.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* DarkCyra tinted overlay for second half */}
      <AbsoluteFill
        style={{
          background: colors.darkCyra,
          opacity: overlayOpacity,
          pointerEvents: "none",
        }}
      />

      {/* STOP PANICKING */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          opacity: stopOpacity * stopFadeOut,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: colors.oldRose,
            textAlign: "center",
            letterSpacing: 2,
            lineHeight: 1.1,
            fontFamily,
          }}
        >
          STOP
          <br />
          PANICKING.
        </div>
      </AbsoluteFill>

      {/* START PREPARING */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          opacity: startOpacity,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: colors.caribbeanGreen,
            textAlign: "center",
            letterSpacing: 2,
            lineHeight: 1.1,
            fontFamily,
          }}
        >
          START
          <br />
          PREPARING.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
