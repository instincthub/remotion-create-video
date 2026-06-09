import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { display, mono } from "./fonts";
import { SECTION_CARDS, type SectionCard as Card } from "./timing";

const One: React.FC<{ data: Card }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.start;
  if (local < 0 || local > data.dur) return null;

  const fadeIn = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(local, [data.dur - 14, data.dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const scene = fadeIn * fadeOut;

  const titleP = spring({
    frame: local - 3,
    fps,
    config: { damping: 22, stiffness: 85 },
  });
  const subP = spring({
    frame: local - 12,
    fps,
    config: { damping: 24, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ opacity: scene }}>
      <AbsoluteFill style={{ backgroundColor: colors.brandDark }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 44%, ${colors.brandTeal}30 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 160px",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 26,
            letterSpacing: 8,
            color: colors.amber,
            textTransform: "uppercase",
            marginBottom: 26,
            opacity: titleP,
          }}
        >
          Chapter {data.index}
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 116,
            lineHeight: 1.02,
            color: colors.white,
            whiteSpace: "pre-line",
            letterSpacing: -2,
            transform: `translateX(${interpolate(titleP, [0, 1], [-50, 0])}px)`,
            opacity: titleP,
          }}
        >
          {data.title}
        </div>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: subP,
          }}
        >
          <span
            style={{
              width: 64,
              height: 4,
              borderRadius: 2,
              background: colors.tealLight,
            }}
          />
          <span
            style={{
              fontFamily: display,
              fontWeight: 600,
              fontSize: 36,
              color: colors.neutral200,
            }}
          >
            {data.subtitle}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SectionCards: React.FC = () => (
  <>
    {SECTION_CARDS.map((c) => (
      <One key={c.index} data={c} />
    ))}
  </>
);
