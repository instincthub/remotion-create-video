import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "../parent-tips/colors";
import { nunito, dmSans, dmMono } from "../parent-tips/fonts";
import { ReelBackground } from "./Background";
import { ClipScene } from "./ClipScene";

/* ----------------------------------------------------------------------- */
/* Shared helpers                                                          */
/* ----------------------------------------------------------------------- */

const useSpring = (delay: number, damping = 20, stiffness = 90) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness } });
};

const Eyebrow: React.FC<{ children: React.ReactNode; p: number }> = ({
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
        fontFamily: dmMono,
        fontSize: 26,
        fontWeight: 500,
        letterSpacing: 5,
        color: colors.tealLight,
        textTransform: "uppercase",
        padding: "12px 26px",
        border: `2px solid ${colors.tealLight}66`,
        borderRadius: 999,
        background: `${colors.brandDark}99`,
      }}
    >
      {children}
    </div>
  </div>
);

/** Frosted caption box pinned to the lower third (above the 300px safe zone). */
const LowerThird: React.FC<{ p: number; children: React.ReactNode }> = ({
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
        background: `${colors.brandDark}E6`,
        border: `1.5px solid ${colors.tealLight}44`,
        boxShadow: `0 26px 70px -22px rgba(0,0,0,0.75)`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  </div>
);

/* ----------------------------------------------------------------------- */
/* Footage clips                                                           */
/* ----------------------------------------------------------------------- */

type ClipProps = { videoSrc: string };

// 1 — HOOK · "Your child is already using AI, but you may not know."
export const SceneHook: React.FC<ClipProps> = ({ videoSrc }) => {
  const eb = useSpring(2);
  const t = useSpring(8, 18, 80);
  return (
    <ClipScene videoSrc={videoSrc} trimBefore={6} trimAfter={138}>
      <Eyebrow p={eb}>Parents, watch this</Eyebrow>
      <LowerThird p={t}>
        <div style={{ fontFamily: nunito, fontWeight: 700, fontSize: 74, lineHeight: 1.06, color: colors.white }}>
          Your child is{" "}
          <span style={{ color: colors.tealLight }}>already using AI.</span>
        </div>
      </LowerThird>
    </ClipScene>
  );
};

// 2 — STAKES · "...they're likely to do something that would harm them."
export const SceneStakes: React.FC<ClipProps> = ({ videoSrc }) => {
  const t = useSpring(6, 18, 80);
  return (
    <ClipScene videoSrc={videoSrc} trimBefore={1011} trimAfter={1200}>
      <LowerThird p={t}>
        <div style={{ fontFamily: nunito, fontWeight: 700, fontSize: 70, lineHeight: 1.08, color: colors.white }}>
          Left unguided, AI can{" "}
          <span style={{ color: colors.tealLight }}>harm them.</span>
        </div>
      </LowerThird>
    </ClipScene>
  );
};

// 3 — STAT · "40% of children don't have any issue following AI's advice."
export const SceneStat: React.FC<ClipProps> = ({ videoSrc }) => {
  const num = useSpring(4, 16, 70);
  const count = Math.round(interpolate(num, [0, 1], [0, 40]));
  const t = useSpring(20, 18, 80);
  return (
    <ClipScene videoSrc={videoSrc} trimBefore={13611} trimAfter={13775} dim={0.28}>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: nunito,
          fontWeight: 700,
          fontSize: 260,
          lineHeight: 1,
          color: colors.tealLight,
          transform: `scale(${interpolate(num, [0, 1], [0.7, 1])})`,
          textShadow: `0 24px 80px ${colors.brandTeal}`,
        }}
      >
        {count}%
      </div>
      <LowerThird p={t}>
        <div style={{ fontFamily: nunito, fontWeight: 700, fontSize: 56, lineHeight: 1.1, color: colors.white }}>
          of kids follow AI&rsquo;s advice
          <br />
          <span style={{ color: colors.tealLight }}>without question.</span>
        </div>
      </LowerThird>
    </ClipScene>
  );
};

// 4 — WRONG · "AI ... is not always correct."
export const SceneWrong: React.FC<ClipProps> = ({ videoSrc }) => {
  const t = useSpring(6, 18, 80);
  return (
    <ClipScene videoSrc={videoSrc} trimBefore={8790} trimAfter={8958}>
      <LowerThird p={t}>
        <div style={{ fontFamily: nunito, fontWeight: 700, fontSize: 72, lineHeight: 1.08, color: colors.white }}>
          And it can be{" "}
          <span style={{ color: colors.tealLight }}>confidently wrong.</span>
        </div>
      </LowerThird>
    </ClipScene>
  );
};

// 5 — TEASE · "five simple tips that you can start practising from now on."
const TIP_LABELS = [
  "Use AI together first",
  "Make the humans-first rule",
  "Spot when it's confidently wrong",
  "Check the age + controls",
  "Keep the door open",
];

export const SceneTease: React.FC<ClipProps> = ({ videoSrc }) => {
  const title = useSpring(2, 18, 80);
  const caption = useSpring(96);
  return (
    <ClipScene videoSrc={videoSrc} trimBefore={2160} trimAfter={2328} dim={0.55}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px 300px",
          gap: 34,
        }}
      >
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 68,
            lineHeight: 1.06,
            color: colors.white,
            textAlign: "center",
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [22, 0])}px)`,
          }}
        >
          5 things every parent
          <br />
          should do this week
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 900 }}>
          {TIP_LABELS.map((label, i) => (
            <TipCard key={i} index={i} label={label} />
          ))}
        </div>

        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 40,
            color: colors.tealLight,
            opacity: caption,
          }}
        >
          Here&rsquo;s #1 — the rest are in the video.
        </div>
      </AbsoluteFill>
    </ClipScene>
  );
};

const TipCard: React.FC<{ index: number; label: string }> = ({ index, label }) => {
  const enter = useSpring(18 + index * 7, 20, 90);
  const locked = index > 0;
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "22px 28px",
        borderRadius: 20,
        background: locked ? `${colors.neutral800}88` : colors.brandTeal,
        border: `1.5px solid ${locked ? colors.neutral600 : colors.tealLight}`,
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [-28, 0])}px)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 50,
          height: 50,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: nunito,
          fontWeight: 700,
          fontSize: 30,
          color: colors.white,
          background: locked ? colors.neutral800 : colors.tealDeeper,
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          fontFamily: nunito,
          fontWeight: 700,
          fontSize: 34,
          color: colors.white,
          textAlign: "left",
          filter: locked ? "blur(9px)" : "none",
          opacity: locked ? 0.7 : 1,
        }}
      >
        {label}
      </div>
      {locked ? (
        <div style={{ position: "absolute", right: 26, top: "50%", transform: "translateY(-50%)" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="11" rx="2.5" stroke={colors.neutral200} strokeWidth="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={colors.neutral200} strokeWidth="2" />
          </svg>
        </div>
      ) : null}
    </div>
  );
};

/* ----------------------------------------------------------------------- */
/* 6 — END CARD · CTA to the full YouTube video                            */
/* ----------------------------------------------------------------------- */

export const SceneEndCard: React.FC = () => {
  const mark = useSpring(2, 18, 80);
  const title = useSpring(8, 18, 80);
  const pill = useSpring(26);
  const brand = useSpring(40);
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
          gap: 34,
        }}
      >
        <div style={{ opacity: mark, transform: `scale(${interpolate(mark, [0, 1], [0.8, 1])})` }}>
          <svg width="200" height="180" viewBox="0 0 200 180">
            <path
              d="M40 20 H170 a24 24 0 0 1 24 24 v70 a24 24 0 0 1 -24 24 H110 l-34 34 v-34 H40 a24 24 0 0 1 -24 -24 V44 a24 24 0 0 1 24 -24 Z"
              fill="none"
              stroke={colors.white}
              strokeWidth={6}
              strokeLinejoin="round"
            />
            <circle cx="80" cy="78" r="13" fill={colors.tealLight} />
            <circle cx="130" cy="78" r="13" fill={colors.tealLight} />
            <path d="M74 108 q31 22 62 0" stroke={colors.tealLight} strokeWidth={6} fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 1.06,
            color: colors.white,
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [22, 0])}px)`,
          }}
        >
          Watch the full version
          <br />
          <span style={{ color: colors.tealLight }}>on YouTube.</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 38,
            color: colors.white,
            padding: "18px 40px",
            borderRadius: 999,
            background: colors.brandTeal,
            border: `1.5px solid ${colors.tealLight}66`,
            opacity: pill,
            transform: `translateY(${interpolate(pill, [0, 1], [14, 0])}px)`,
          }}
        >
          <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
            <rect x="1.5" y="1.5" width="41" height="29" rx="8" fill={colors.error} />
            <path d="M18 9 L29 16 L18 23 Z" fill={colors.white} />
          </svg>
          youtube.com/instincthub
        </div>
        <div
          style={{
            fontFamily: dmMono,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 3,
            color: colors.neutral400,
            textTransform: "uppercase",
            opacity: brand,
          }}
        >
          Kids Can Code · InstinctHub
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
