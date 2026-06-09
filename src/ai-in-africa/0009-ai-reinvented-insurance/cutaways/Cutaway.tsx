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
import { colors } from "../colors";
import { display, mono } from "../fonts";
import type { Cutaway as CutawayData } from "../timing";
import { ILLUSTRATIONS } from "./scenes";

/* ───────────────────────── picture-in-picture ───────────────────────── */
const Pip: React.FC<{ data: CutawayData; scene: number; local: number }> = ({
  data,
  scene,
  local,
}) => {
  const { fps } = useVideoConfig();
  const enter = spring({ frame: local, fps, config: { damping: 22, stiffness: 110 } });
  const x = interpolate(enter, [0, 1], [-70, 0]);
  const push = interpolate(local, [0, data.dur], [1.04, 1.12]);

  const W = 726;
  const H = 408;
  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 64,
        width: W,
        opacity: scene,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
          border: `2px solid ${colors.tealLight}88`,
          boxShadow: `0 34px 80px -26px rgba(0,0,0,0.8), 0 0 0 6px ${colors.brandDark}AA`,
          background: colors.brandDark,
        }}
      >
        <AbsoluteFill style={{ transform: `scale(${push})` }}>
          {data.src ? (
            <OffthreadVideo
              src={staticFile(data.src)}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
        </AbsoluteFill>
        {/* corner accent + label */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            padding: "30px 22px 16px",
            background: `linear-gradient(to top, ${colors.brandDark}F2 0%, transparent 100%)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: mono,
              fontSize: 19,
              fontWeight: 500,
              letterSpacing: 2,
              color: colors.white,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: colors.amber,
                boxShadow: `0 0 12px ${colors.amber}`,
              }}
            />
            {data.eyebrow}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────── full-frame ─────────────────────────────── */
const Full: React.FC<{ data: CutawayData; scene: number; local: number }> = ({
  data,
  scene,
  local,
}) => {
  const { fps } = useVideoConfig();
  const eyebrowP = spring({ frame: local, fps, config: { damping: 20, stiffness: 90 } });
  const captionP = spring({ frame: local - 14, fps, config: { damping: 22, stiffness: 90 } });
  const p = spring({ frame: local - 4, fps, config: { damping: 22, stiffness: 80 } });
  const Illu = data.kind === "anim" ? ILLUSTRATIONS[data.key] : null;
  const stockScale = interpolate(local, [0, data.dur], [1.06, 1.15]);

  return (
    <AbsoluteFill style={{ opacity: scene }}>
      {data.kind === "stock" && data.src ? (
        <AbsoluteFill style={{ backgroundColor: colors.brandDark, overflow: "hidden" }}>
          <AbsoluteFill style={{ transform: `scale(${stockScale})` }}>
            <OffthreadVideo
              src={staticFile(data.src)}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              background: `linear-gradient(180deg, ${colors.brandDark}66 0%, transparent 26%, transparent 50%, ${colors.brandDark}F2 100%)`,
            }}
          />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
          <AbsoluteFill
            style={{
              background: `radial-gradient(ellipse at 50% 42%, ${colors.brandTeal}33 0%, transparent 62%)`,
            }}
          />
          <AbsoluteFill style={{ opacity: 0.05 }}>
            <svg width="1920" height="1080">
              <defs>
                <pattern id={`dots-${data.key}`} x="0" y="0" width="46" height="46" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill={colors.tealLight} />
                </pattern>
              </defs>
              <rect width="1920" height="1080" fill={`url(#dots-${data.key})`} />
            </svg>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: data.kind === "anim" ? "center" : "flex-start",
          justifyContent: data.kind === "anim" ? "center" : "flex-end",
          padding: data.kind === "anim" ? "96px 120px 210px" : "0 130px 120px",
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 5,
            color: colors.amber,
            textTransform: "uppercase",
            padding: "10px 22px",
            border: `1.5px solid ${colors.amber}66`,
            borderRadius: 999,
            background: `${colors.brandDark}AA`,
            opacity: eyebrowP,
            transform: `translateY(${interpolate(eyebrowP, [0, 1], [-16, 0])}px)`,
            position: data.kind === "stock" ? "absolute" : "relative",
            top: data.kind === "stock" ? 90 : undefined,
            left: data.kind === "stock" ? 130 : undefined,
          }}
        >
          {data.eyebrow}
        </div>

        {Illu ? (
          <div style={{ height: 440, display: "flex", alignItems: "center" }}>
            <Illu p={p} t={local} />
          </div>
        ) : null}

        {data.caption ? (
          <div
            style={{
              fontFamily: display,
              fontWeight: 800,
              fontSize: data.kind === "anim" ? 50 : 56,
              lineHeight: 1.14,
              color: colors.white,
              textAlign: data.kind === "anim" ? "center" : "left",
              maxWidth: data.kind === "anim" ? 1320 : 1380,
              letterSpacing: -0.8,
              opacity: captionP,
              transform: `translateY(${interpolate(captionP, [0, 1], [20, 0])}px)`,
              textShadow: data.kind === "stock" ? "0 4px 30px rgba(0,0,0,0.85)" : "none",
            }}
          >
            {data.caption}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** One b-roll insert — full-frame takeover or picture-in-picture. */
export const Cutaway: React.FC<{ data: CutawayData }> = ({ data }) => {
  const frame = useCurrentFrame();
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

  return data.mode === "pip" ? (
    <Pip data={data} scene={scene} local={local} />
  ) : (
    <Full data={data} scene={scene} local={local} />
  );
};
