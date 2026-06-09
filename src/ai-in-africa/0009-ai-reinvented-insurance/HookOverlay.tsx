import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { display, mono } from "./fonts";
import { BEATS, HOOK } from "./timing";

/**
 * Opening hook lower-third. White type sits in a frosted brand-dark box so it
 * stays readable over the bright wall (a drop shadow alone would not).
 */
export const HookOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < BEATS.hookIn - 6 || frame > BEATS.hookOut + 24) return null;

  const enter = spring({
    frame: frame - BEATS.hookIn,
    fps,
    config: { damping: 22, stiffness: 90 },
  });
  const exit = interpolate(
    frame,
    [BEATS.hookOut, BEATS.hookOut + 22],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );
  const appear = enter * (1 - exit);

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 132,
        width: 1080,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "34px 44px 38px",
          borderRadius: 28,
          background: `${colors.brandDark}E8`,
          border: `1.5px solid ${colors.tealLight}44`,
          boxShadow: `0 36px 90px -28px rgba(0,0,0,0.78), 0 0 0 8px ${colors.brandTeal}12`,
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontFamily: mono,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 4,
            color: colors.amber,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 30,
              height: 3,
              borderRadius: 2,
              background: colors.amber,
            }}
          />
          {HOOK.kicker}
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 58,
            lineHeight: 1.12,
            color: colors.white,
            whiteSpace: "pre-line",
            letterSpacing: -0.5,
          }}
        >
          {HOOK.line}
        </div>
      </div>
    </div>
  );
};
