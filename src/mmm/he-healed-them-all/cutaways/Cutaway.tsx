import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "../colors";
import { playfair, inter } from "../fonts";
import type { Cutaway as CutawayData } from "../timing";
import { ILLUSTRATIONS } from "./scenes";

/**
 * One full-frame illustrated cutaway. Opaque navy background so the
 * illustration is never competing with the footage. Renders only inside its
 * own window; fades the whole scene in/out at the edges and hands the
 * illustration an entrance progress `p` (0→1) plus a local frame `t` for
 * ambient motion.
 */
export const Cutaway: React.FC<{ data: CutawayData }> = ({ data }) => {
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
      {/* Opaque branded backdrop */}
      <AbsoluteFill style={{ backgroundColor: colors.brandDark }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 42%, ${colors.brandBlue}3D 0%, transparent 62%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern
              id={`cross-${data.key}`}
              x="0"
              y="0"
              width="58"
              height="58"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M29 16 v26 M18 27 h22"
                stroke={colors.skyLight}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill={`url(#cross-${data.key})`} />
        </svg>
      </AbsoluteFill>

      {/* Stacked content, kept above the subtitle band */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 120px 200px",
          gap: 38,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 5,
            color: colors.skyLight,
            textTransform: "uppercase",
            padding: "10px 24px",
            border: `1.5px solid ${colors.skyLight}55`,
            borderRadius: 999,
            background: `${colors.brandBlue}26`,
            opacity: eyebrowP,
            transform: `translateY(${interpolate(eyebrowP, [0, 1], [-16, 0])}px)`,
          }}
        >
          {data.eyebrow}
        </div>

        <div
          style={{
            height: 430,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Illu ? <Illu p={p} t={local} /> : null}
        </div>

        <div
          style={{
            fontFamily: playfair,
            fontWeight: 700,
            fontSize: 50,
            lineHeight: 1.18,
            color: colors.white,
            textAlign: "center",
            maxWidth: 1340,
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
