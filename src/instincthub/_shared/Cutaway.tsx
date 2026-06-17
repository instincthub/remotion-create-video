import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { montserrat, DISPLAY_TRACKING } from "./fonts";
import { ILLUSTRATIONS } from "./illustrations";
import type { CutawayContent } from "./types";

/**
 * One full-frame cutaway ("B-roll") that takes over the frame on top of the
 * footage. Two flavours, chosen by the content:
 *
 *   • illustrated (default) — an opaque deep-ink page with a drawn line
 *     illustration (`data.key` → ILLUSTRATIONS). The instructor can't obstruct
 *     it because it's a full takeover.
 *   • live-action (`data.videoSrc` set) — real trimmed b-roll plays full-frame,
 *     cover-cropped and muted, behind cinematic top/bottom scrims, with the
 *     brand eyebrow pill up top and the caption in a frosted gunmetal box.
 *
 * Renders only inside its own window; fades the whole scene in/out at the edges.
 */
export const Cutaway: React.FC<{ data: CutawayContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.start;
  if (local < 0 || local > data.dur) return null;

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

  // ----- Live-action b-roll cutaway -----
  if (data.videoSrc) {
    // Gentle Ken Burns push so the still-ish stock clip never feels frozen.
    const zoom = interpolate(local, [0, data.dur], [1.06, 1.13], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return (
      <AbsoluteFill style={{ opacity: scene, backgroundColor: colors.inkDeep }}>
        <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
          <OffthreadVideo
            src={staticFile(data.videoSrc)}
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: data.videoFocus ?? "50% 50%",
            }}
          />
        </AbsoluteFill>

        {/* Cinematic scrims: darken top (for the eyebrow) and bottom (caption),
            with a cool brand tint so the live footage still reads as on-brand. */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, ${colors.inkDeep}D9 0%, transparent 26%, transparent 50%, ${colors.inkDeep}D9 84%, ${colors.inkDeep}F2 100%)`,
            pointerEvents: "none",
          }}
        />
        <AbsoluteFill
          style={{
            background: `radial-gradient(120% 80% at 50% 50%, transparent 52%, ${colors.cyan}1F 100%)`,
            pointerEvents: "none",
          }}
        />

        {/* Eyebrow pill, top-center */}
        <div
          style={{
            position: "absolute",
            top: 84,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: montserrat,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 5,
              color: colors.white,
              textTransform: "uppercase",
              padding: "12px 28px",
              borderRadius: 999,
              background: `${colors.cyan}E6`,
              boxShadow: `0 14px 40px -14px ${colors.cyan}`,
              opacity: eyebrowP,
              transform: `translateY(${interpolate(eyebrowP, [0, 1], [-18, 0])}px)`,
            }}
          >
            {data.eyebrow}
          </div>
        </div>

        {/* Caption — frosted gunmetal box, lower third */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 168,
            display: "flex",
            justifyContent: "center",
            padding: "0 120px",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              padding: "26px 46px",
              borderRadius: 22,
              background: `${colors.gunmetal}E6`,
              border: `1.5px solid ${colors.cyan}59`,
              boxShadow: `0 28px 70px -24px rgba(0,0,0,0.8)`,
              fontFamily: montserrat,
              fontWeight: 800,
              fontSize: 48,
              lineHeight: 1.16,
              color: colors.white,
              textAlign: "center",
              letterSpacing: DISPLAY_TRACKING,
              opacity: captionP,
              transform: `translateY(${interpolate(captionP, [0, 1], [22, 0])}px)`,
            }}
          >
            {data.caption}
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // ----- Illustrated cutaway (default) -----
  const Illu = ILLUSTRATIONS[data.key];
  return (
    <AbsoluteFill style={{ opacity: scene }}>
      <AbsoluteFill style={{ backgroundColor: colors.inkDeep }} />
      {/* faint dot grid + a cool brand glow, echoing the platform canvas */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.white}0F 1.5px, transparent 1.5px)`,
          backgroundSize: "46px 46px",
          opacity: 0.6,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 38%, ${colors.cyan}33 0%, transparent 60%)`,
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
            fontFamily: montserrat,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 5,
            color: colors.tiffany,
            textTransform: "uppercase",
            padding: "10px 24px",
            border: `1.5px solid ${colors.cyan}73`,
            borderRadius: 999,
            background: `${colors.cyan}1F`,
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
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 46,
            lineHeight: 1.18,
            color: colors.white,
            textAlign: "center",
            maxWidth: 1340,
            letterSpacing: DISPLAY_TRACKING,
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
