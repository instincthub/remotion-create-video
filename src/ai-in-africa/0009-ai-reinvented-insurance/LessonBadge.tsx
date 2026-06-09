import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { display, mono } from "./fonts";
import { LESSON_BADGES, sec, type LessonBadge as Badge } from "./timing";

const HOLD = sec(5.0);

const One: React.FC<{ data: Badge }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const start = sec(data.start);
  const local = frame - start;
  if (local < -6 || local > HOLD + 20) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 21, stiffness: 90 },
  });
  const exit = interpolate(local, [HOLD, HOLD + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const appear = enter * (1 - exit);
  const accent = data.n === 2 ? colors.amber : colors.tealLight;

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 150,
        width: 760,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [42, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "26px 34px",
          borderRadius: 22,
          background: `${colors.brandDark}E6`,
          border: `1.5px solid ${accent}55`,
          boxShadow: `0 30px 80px -26px rgba(0,0,0,0.74)`,
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 96,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 15,
              letterSpacing: 3,
              color: colors.neutral400,
              textTransform: "uppercase",
            }}
          >
            Lesson
          </div>
          <div
            style={{
              fontFamily: display,
              fontWeight: 800,
              fontSize: 84,
              lineHeight: 0.95,
              color: accent,
            }}
          >
            {data.n}
          </div>
        </div>
        <div
          style={{
            width: 2,
            alignSelf: "stretch",
            background: `${accent}44`,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.2,
            color: colors.white,
          }}
        >
          {data.text}
        </div>
      </div>
    </div>
  );
};

export const LessonBadges: React.FC = () => (
  <>
    {LESSON_BADGES.map((b) => (
      <One key={b.n} data={b} />
    ))}
  </>
);
