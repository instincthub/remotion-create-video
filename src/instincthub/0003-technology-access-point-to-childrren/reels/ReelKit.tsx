import {
  AbsoluteFill,
  Img,
  staticFile,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../../_shared/colors";
import { montserrat, nunito } from "../../_shared/fonts";

/** Reel composition fps. */
export const FPS = 30;
/** Convert seconds on the talk's timeline → frames (for trims + durations). */
export const sec = (s: number): number => Math.round(s * FPS);
/** Cross-dissolve length between clips (0.3s). */
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

/** Pill eyebrow pinned to the top, clear of the face. */
export const Eyebrow: React.FC<{ children: React.ReactNode; p: number }> = ({
  children,
  p,
}) => (
  <div
    style={{
      position: "absolute",
      top: 140,
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

/** Accent span for the key words inside a caption. */
export const Hl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: colors.tiffany }}>{children}</span>
);

/* ----------------------------------------------------------------------- */
/* Background (opaque) for the outro card                                   */
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
              id="dots-tap-reel"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill={colors.tiffany} />
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#dots-tap-reel)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------------- */
/* Shared outro — 2026 Summer Coding Class · instinctHub.com/scc            */
/* ----------------------------------------------------------------------- */

/**
 * Branded CTA end card closing every reel. No footage. Drives parents to the
 * 2026 Summer Coding Class registration at instinctHub.com/scc.
 */
export const OutroSCC: React.FC<{ logoSrc?: string }> = ({
  logoSrc = "instincthub-logo-white.png",
}) => {
  const eb = useReveal(2, 18, 80);
  const title = useReveal(8, 18, 80);
  const weeks = useReveal(22);
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
            fontSize: 92,
            lineHeight: 1.04,
            letterSpacing: -1,
            color: colors.white,
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [24, 0])}px)`,
          }}
        >
          Give your child a<br />
          <span style={{ color: colors.tiffany }}>safe</span> head start.
        </div>

        <div
          style={{
            fontFamily: nunito,
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.2,
            color: colors.textDim,
            maxWidth: 820,
            opacity: weeks,
          }}
        >
          5 weeks of ethical, hands-on tech — then they{" "}
          <span style={{ color: colors.tiffany }}>demo it all to you</span> in
          week 6.
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
