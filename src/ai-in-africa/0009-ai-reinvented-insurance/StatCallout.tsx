import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { display, body } from "./fonts";
import { STATS, BEATS, sec, type Stat } from "./timing";

const Card: React.FC<{ stat: Stat }> = ({ stat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const start = sec(stat.start);
  const local = frame - start;
  const hold = BEATS.statHold;
  if (local < -6 || local > hold + 22) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  const exit = interpolate(local, [hold, hold + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const appear = enter * (1 - exit);

  const from = stat.from ?? 0;
  const count =
    stat.to === null
      ? 0
      : Math.round(
          interpolate(local, [6, 40], [from, stat.to], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })
        );

  const accent = stat.accent === "amber" ? colors.amber : colors.tealLight;
  const numberText =
    stat.to === null
      ? stat.value ?? ""
      : `${stat.prefix ?? ""}${count.toLocaleString("en-US")}${stat.suffix ?? ""}`;

  const pos =
    stat.side === "left"
      ? { left: 96 as const }
      : { right: 64 as const };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 150,
        width: 600,
        ...pos,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [44, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "30px 36px",
          borderRadius: 24,
          background: `${colors.brandDark}E6`,
          border: `1.5px solid ${accent}55`,
          boxShadow: `0 30px 80px -26px rgba(0,0,0,0.74), 0 0 0 7px ${accent}12`,
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 104,
            lineHeight: 0.92,
            color: accent,
            letterSpacing: -2,
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {numberText}
        </div>
        <div
          style={{
            fontFamily: body,
            fontWeight: 400,
            fontSize: 27,
            lineHeight: 1.32,
            color: colors.neutral200,
          }}
        >
          {stat.label}
        </div>
      </div>
    </div>
  );
};

/** All stat callouts; each shows only inside its own window. */
export const StatCallout: React.FC = () => (
  <>
    {STATS.map((s, i) => (
      <Card key={i} stat={s} />
    ))}
  </>
);
