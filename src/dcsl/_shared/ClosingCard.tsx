import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { ClosingContent } from "./types";

/**
 * Closing recap / "up next" card — the course equivalent of a CTA. Lower-left
 * frosted Deep Blue panel over the footage, so it never collides with the
 * talk's own outro card. Recedes before `out` (set `out` just before any
 * built-in end card begins).
 */
export const ClosingCard: React.FC<{ data: ClosingContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  if (local < 0 || frame > data.out + 26) return null;

  const enter = spring({ frame: local, fps, config: { damping: 20, stiffness: 80 } });
  const sub = spring({ frame: local - 14, fps, config: { damping: 22, stiffness: 90 } });
  const chips = spring({ frame: local - 26, fps, config: { damping: 22, stiffness: 90 } });
  const exit = interpolate(frame, [data.out, data.out + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 200,
        display: "inline-block",
        maxWidth: 1180,
        padding: "34px 50px 40px",
        borderRadius: 26,
        background: `${colors.deepBlue}EE`,
        border: `1.5px solid ${colors.lightBlue}40`,
        boxShadow: `0 28px 70px -24px rgba(0,0,0,0.75), 0 0 0 7px ${colors.blue}1F`,
        opacity: enter * (1 - exit),
        transform: `translateY(${interpolate(enter, [0, 1], [44, 0]) + exit * 40}px)`,
      }}
    >
      <div
        style={{
          fontFamily: inter,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: 4,
          color: colors.lightBlue,
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {data.eyebrow}
      </div>
      <div
        style={{
          fontFamily: inter,
          fontWeight: 700,
          fontSize: 72,
          lineHeight: 1.06,
          color: colors.white,
          letterSpacing: -0.5,
          textShadow: "0 6px 30px rgba(0,0,0,0.5)",
        }}
      >
        {data.title}
        {data.titleAccent ? (
          <span style={{ color: colors.orange }}> {data.titleAccent}</span>
        ) : null}
      </div>
      {data.subtitle ? (
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: 32,
            color: colors.textDim,
            marginTop: 18,
            maxWidth: 1040,
            opacity: sub,
            transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
          }}
        >
          {data.subtitle}
        </div>
      ) : null}
      {data.chips && data.chips.length ? (
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 26,
            opacity: chips,
            transform: `translateY(${interpolate(chips, [0, 1], [14, 0])}px)`,
          }}
        >
          {data.chips.map((c) => (
            <div
              key={c}
              style={{
                fontFamily: inter,
                fontSize: 24,
                fontWeight: 600,
                color: colors.white,
                padding: "12px 26px",
                borderRadius: 999,
                background: `${colors.blue}F0`,
                border: `1.5px solid ${colors.lightBlue}55`,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
