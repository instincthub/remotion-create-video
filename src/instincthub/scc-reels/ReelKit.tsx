import {
  AbsoluteFill,
  Img,
  staticFile,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../_shared/colors";
import { montserrat, nunito } from "../_shared/fonts";

/**
 * Shared 9:16 reel kit for the SCC (Summer Coding Class) reel series.
 *
 * These reels are SILENT, b-roll-driven: previous-training photos (Ken Burns)
 * and short clips, cross-dissolved, with animated captions carrying the script.
 * The components below mirror the proven 0003 reel kit so the whole InstinctHub
 * reel system stays visually consistent — same frosted-gunmetal legibility
 * panels, same Tiffany accent, same Montserrat/Nunito pairing.
 */

/** Reel composition fps. */
export const FPS = 30;
/** Convert seconds → frames (durations, trims). */
export const sec = (s: number): number => Math.round(s * FPS);
/** Cross-dissolve length between scenes (0.3s). */
export const TD = 9;

/** Spring eased 0→1 with an entry delay (frames). */
export const useReveal = (delay: number, damping = 18, stiffness = 80) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness } });
};

/* ----------------------------------------------------------------------- */
/* Overlays                                                                 */
/* ----------------------------------------------------------------------- */

/** Pill eyebrow pinned to the top, clear of faces. */
export const Eyebrow: React.FC<{ children: React.ReactNode; p: number }> = ({
  children,
  p,
}) => (
  <div
    style={{
      position: "absolute",
      top: 150,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [-16, 0])}px)`,
    }}
  >
    <div
      style={{
        fontFamily: montserrat,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: 4,
        color: colors.tiffany,
        textTransform: "uppercase",
        padding: "12px 26px",
        border: `2px solid ${colors.tiffany}66`,
        borderRadius: 999,
        background: `${colors.inkDeep}AA`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Frosted caption box pinned to the lower third — its bottom sits at 360px,
 * keeping the entire bottom 300px subtitle-safe zone clear.
 */
export const LowerThird: React.FC<{ p: number; children: React.ReactNode }> = ({
  p,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: 70,
      right: 70,
      bottom: 360,
      display: "flex",
      justifyContent: "center",
      opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`,
    }}
  >
    <div
      style={{
        padding: "30px 38px",
        borderRadius: 26,
        background: `${colors.gunmetal}F0`,
        border: `1.5px solid ${colors.tiffany}44`,
        boxShadow: `0 26px 70px -22px rgba(0,0,0,0.78)`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  </div>
);

/** Big legible caption line used inside LowerThird. */
export const Caption: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 72 }) => (
  <div
    style={{
      fontFamily: nunito,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.08,
      color: colors.white,
    }}
  >
    {children}
  </div>
);

/** Smaller supporting line beneath a Caption (delayed-reveal friendly). */
export const Sub: React.FC<{
  children: React.ReactNode;
  p?: number;
  size?: number;
}> = ({ children, p = 1, size = 40 }) => (
  <div
    style={{
      marginTop: 16,
      fontFamily: nunito,
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1.18,
      color: colors.textDim,
      opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`,
    }}
  >
    {children}
  </div>
);

/** Accent span for the key words inside a caption. */
export const Hl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: colors.tiffany }}>{children}</span>
);

/** Green accent span for outcome / success words. */
export const Win: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: colors.green }}>{children}</span>
);

/* ----------------------------------------------------------------------- */
/* Outcome checklist (the "different choice" payoff)                        */
/* ----------------------------------------------------------------------- */

const Check: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill={colors.green} />
    <path
      d="M7 12.5l3.2 3.2L17 9"
      stroke={colors.inkDeep}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A frosted card listing the outcomes, each row springing in on a stagger with
 * a green check. Pinned above the subtitle-safe zone.
 */
export const ListReveal: React.FC<{
  items: React.ReactNode[];
  /** Frame each row starts revealing (staggered). */
  startDelay?: number;
  stagger?: number;
}> = ({ items, startDelay = 6, stagger = 16 }) => (
  <div
    style={{
      position: "absolute",
      left: 64,
      right: 64,
      bottom: 330,
      padding: "34px 36px",
      borderRadius: 28,
      background: `${colors.gunmetal}F2`,
      border: `1.5px solid ${colors.tiffany}44`,
      boxShadow: `0 28px 72px -22px rgba(0,0,0,0.8)`,
      display: "flex",
      flexDirection: "column",
      gap: 22,
    }}
  >
    {items.map((it, i) => (
      <Row key={i} delay={startDelay + i * stagger}>
        {it}
      </Row>
    ))}
  </div>
);

const Row: React.FC<{ delay: number; children: React.ReactNode }> = ({
  delay,
  children,
}) => {
  const p = useReveal(delay, 20, 90);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-26, 0])}px)`,
      }}
    >
      <div style={{ flexShrink: 0, display: "flex" }}>
        <Check />
      </div>
      <div
        style={{
          fontFamily: nunito,
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.12,
          color: colors.white,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------- */
/* Stat pop (the "200 children" proof)                                      */
/* ----------------------------------------------------------------------- */

/** A big animated number that pops + counts up, over a frosted card. */
export const StatPop: React.FC<{
  value: number;
  unit?: string;
  label: React.ReactNode;
}> = ({ value, unit = "", label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 12, stiffness: 120 } });
  const count = Math.round(
    interpolate(frame, [4, 4 + fps * 0.9], [0, value], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 360,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "34px 44px",
          borderRadius: 28,
          background: `${colors.gunmetal}F2`,
          border: `1.5px solid ${colors.tiffany}44`,
          boxShadow: `0 28px 72px -22px rgba(0,0,0,0.8)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: -2,
            color: colors.green,
            transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`,
          }}
        >
          {count}
          {unit}
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 46,
            color: colors.white,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------- */
/* Opaque branded background for the outro card                             */
/* ----------------------------------------------------------------------- */

export const ReelBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const gy = 42 + Math.sin(frame / 40) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% ${gy}%, ${colors.cyan}55 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1080" height="1920">
          <defs>
            <pattern
              id="dots-scc-reel"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill={colors.tiffany} />
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#dots-scc-reel)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------------- */
/* Shared outro — Summer Coding Class 2026 · instinctHub.com/scc            */
/* ----------------------------------------------------------------------- */

/**
 * Branded CTA end card closing every SCC reel. No footage. Drives parents to
 * register for the 2026 Summer Coding Class at instinctHub.com/scc.
 */
export const OutroSCC: React.FC<{ logoSrc?: string }> = ({
  logoSrc = "instincthub-logo-white.png",
}) => {
  const eb = useReveal(2, 18, 80);
  const title = useReveal(8, 18, 80);
  const line = useReveal(22);
  const pill = useReveal(34);
  const brand = useReveal(48);

  return (
    <AbsoluteFill>
      <ReelBackground />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 86px 300px",
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 5,
            color: colors.tiffany,
            textTransform: "uppercase",
            padding: "12px 28px",
            border: `2px solid ${colors.tiffany}66`,
            borderRadius: 999,
            background: `${colors.inkDeep}88`,
            opacity: eb,
            transform: `translateY(${interpolate(eb, [0, 1], [-16, 0])}px)`,
          }}
        >
          Summer Coding Class · 2026
        </div>

        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 88,
            lineHeight: 1.04,
            letterSpacing: -1,
            color: colors.white,
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [24, 0])}px)`,
          }}
        >
          Make this summer
          <br />
          <span style={{ color: colors.tiffany }}>the one that counts.</span>
        </div>

        <div
          style={{
            fontFamily: nunito,
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.2,
            color: colors.textDim,
            maxWidth: 840,
            opacity: line,
          }}
        >
          Real Python, real AI, a real app,{" "}
          <span style={{ color: colors.tiffany }}>built by your child.</span>{" "}
          200 spots. Lagos &amp; virtual.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: montserrat,
            fontWeight: 700,
            fontSize: 48,
            color: colors.white,
            padding: "24px 52px",
            borderRadius: 999,
            background: colors.cyan,
            border: `1.5px solid ${colors.tiffany}88`,
            boxShadow: `0 24px 60px -20px ${colors.cyan}`,
            opacity: pill,
            transform: `translateY(${interpolate(pill, [0, 1], [16, 0])}px)`,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11.5 4.5"
              stroke={colors.white}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
            <path
              d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L12.5 19.5"
              stroke={colors.white}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </svg>
          instinctHub.com/scc
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: brand,
          }}
        >
          <Img
            src={staticFile(logoSrc)}
            style={{ height: 44, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: montserrat,
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 3,
              color: colors.textMuted,
              textTransform: "uppercase",
            }}
          >
            Link in bio &amp; description
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
