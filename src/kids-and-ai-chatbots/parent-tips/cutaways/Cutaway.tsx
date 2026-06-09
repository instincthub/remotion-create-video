import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "../colors";
import { nunito, dmMono } from "../fonts";
import type { Cutaway as CutawayData } from "../timing";
import { ILLUSTRATIONS } from "./scenes";

/**
 * One full-frame illustrated cutaway. Opaque Brand Dark background so the
 * illustration is never competing with the footage. Renders only inside its
 * own window; fades the whole scene in and out at the edges and hands the
 * illustration an entrance progress `p` (0→1) plus a local frame `t` for
 * ambient motion.
 */
export const Cutaway: React.FC<{ data: CutawayData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.start;
  if (local < 0 || local > data.dur) return null;

  const Illu = ILLUSTRATIONS[data.key];

  // Scene fade in / out at the window edges.
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

  // Content entrance + ambient time base.
  const p = spring({
    frame: local - 4,
    fps,
    config: { damping: 22, stiffness: 80 },
  });

  const eyebrowP = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  const captionP = spring({
    frame: local - 16,
    fps,
    config: { damping: 22, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ opacity: scene }}>
      {/* Opaque branded backdrop */}
      <AbsoluteFill style={{ backgroundColor: colors.brandDark }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 42%, ${colors.brandTeal}33 0%, transparent 62%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern
              id={`dots-${data.key}`}
              x="0"
              y="0"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill={`url(#dots-${data.key})`} />
        </svg>
      </AbsoluteFill>

      {/* Stacked content, kept above the bottom-200 subtitle band */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 120px 240px",
          gap: 36,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 5,
            color: colors.tealLight,
            textTransform: "uppercase",
            padding: "10px 22px",
            border: `1.5px solid ${colors.tealLight}55`,
            borderRadius: 999,
            background: `${colors.brandTeal}1F`,
            opacity: eyebrowP,
            transform: `translateY(${interpolate(eyebrowP, [0, 1], [-16, 0])}px)`,
          }}
        >
          {data.eyebrow}
        </div>

        {/* Illustration */}
        <div
          style={{
            height: 440,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Illu ? <Illu p={p} t={local} /> : null}
        </div>

        {/* Caption */}
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 46,
            lineHeight: 1.18,
            color: colors.white,
            textAlign: "center",
            maxWidth: 1320,
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
