import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { montserrat, nunito, DISPLAY_TRACKING } from "./fonts";
import { panel, ENTER_SPRING, CHILD_SPRING } from "./theme";
import { Cap } from "./marks";
import type { ClosingContent } from "./types";

/**
 * Closing recap / "up next" sign-off — the course CTA. Lower-left frosted
 * gunmetal panel over the footage, led by the graduation-cap mark, so it never
 * collides with the lesson's own outro. Chips follow the brand's primary-button
 * pattern: DarkCyan fill + white text. Recedes before `out` (set `out` just
 * before any built-in end card begins, or beyond TOTAL_FRAMES to hold to the
 * end).
 */
export const ClosingCard: React.FC<{ data: ClosingContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  if (local < 0 || frame > data.out + 26) return null;

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
  const sub = spring({ frame: local - 14, fps, config: CHILD_SPRING });
  const chips = spring({ frame: local - 26, fps, config: CHILD_SPRING });
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
        maxWidth: 1220,
        padding: "34px 50px 40px",
        ...panel,
        borderRadius: 26,
        opacity: enter * (1 - exit),
        transform: `translateY(${interpolate(enter, [0, 1], [44, 0]) + exit * 40}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <Cap size={36} stroke={colors.white} accent={colors.tiffany} strokeWidth={4} lit={enter} />
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 4,
            color: colors.tiffany,
            textTransform: "uppercase",
          }}
        >
          {data.eyebrow}
        </div>
      </div>
      <div
        style={{
          fontFamily: montserrat,
          fontWeight: 800,
          fontSize: 70,
          lineHeight: 1.06,
          color: colors.white,
          letterSpacing: DISPLAY_TRACKING,
          textShadow: "0 6px 30px rgba(0,0,0,0.5)",
        }}
      >
        {data.title}
        {data.titleAccent ? (
          <span style={{ color: colors.tiffany }}> {data.titleAccent}</span>
        ) : null}
      </div>
      {data.subtitle ? (
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 400,
            fontSize: 32,
            color: colors.textDim,
            marginTop: 18,
            maxWidth: 1060,
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
            flexWrap: "wrap",
            opacity: chips,
            transform: `translateY(${interpolate(chips, [0, 1], [14, 0])}px)`,
          }}
        >
          {data.chips.map((c) => (
            <div
              key={c}
              style={{
                fontFamily: nunito,
                fontSize: 24,
                fontWeight: 700,
                color: colors.white,
                padding: "12px 26px",
                borderRadius: 999,
                background: colors.cyan,
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
