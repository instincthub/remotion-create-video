import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import { ILLUSTRATIONS } from "./illustrations";
import type { CutawayContent } from "./types";

/**
 * One full-frame illustrated cutaway. Opaque dark page so the illustration is
 * never competing with the footage (the speaker can't obstruct it). Renders
 * only inside its own window; fades the whole scene in/out at the edges and
 * hands the illustration an entrance progress `p` plus a local frame `t`.
 */
export const Cutaway: React.FC<{ data: CutawayContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.start;
  if (local < 0 || local > data.dur) return null;

  const Illu = ILLUSTRATIONS[data.key];

  const fadeIn = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(local, [data.dur - 14, data.dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const scene = fadeIn * fadeOut;

  const p = spring({ frame: local - 4, fps, config: { damping: 22, stiffness: 80 } });
  const eyebrowP = spring({ frame: local, fps, config: { damping: 20, stiffness: 90 } });
  const captionP = spring({ frame: local - 16, fps, config: { damping: 22, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ opacity: scene }}>
      <AbsoluteFill style={{ backgroundColor: colors.pageDark }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${colors.blue}4D 0%, transparent 62%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 120px 200px",
          gap: 34,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 5,
            color: colors.lightBlue,
            textTransform: "uppercase",
            padding: "10px 24px",
            border: `1.5px solid ${colors.lightBlue}55`,
            borderRadius: 999,
            background: `${colors.blue}29`,
            opacity: eyebrowP,
            transform: `translateY(${interpolate(eyebrowP, [0, 1], [-16, 0])}px)`,
          }}
        >
          {data.eyebrow}
        </div>

        <div style={{ height: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {Illu ? <Illu p={p} t={local} /> : null}
        </div>

        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 46,
            lineHeight: 1.2,
            color: colors.white,
            textAlign: "center",
            maxWidth: 1340,
            letterSpacing: -0.3,
            opacity: captionP,
            transform: `translateY(${interpolate(captionP, [0, 1], [18, 0])}px)`,
          }}
        >
          {data.caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
