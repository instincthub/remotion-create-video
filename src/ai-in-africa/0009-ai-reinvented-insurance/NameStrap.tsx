import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { display, mono } from "./fonts";
import { NAME_STRAP, sec } from "./timing";

/**
 * CNN-style correction strap. The audio garbles the bank names ("Temada / UBS
 * Liu / Zenit Ziva"); this lower-third shows the correct names on screen while
 * he speaks the line, so the viewer reads the right thing.
 */
export const NameStrap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const start = sec(NAME_STRAP.start);
  const dur = sec(NAME_STRAP.dur);
  const local = frame - start;
  if (local < -6 || local > dur + 18) return null;

  const enter = spring({ frame: local, fps, config: { damping: 22, stiffness: 95 } });
  const exit = interpolate(local, [dur, dur + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const appear = enter * (1 - exit);

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 150,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [38, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "24px 30px",
          borderRadius: 22,
          background: `${colors.brandDark}E8`,
          border: `1.5px solid ${colors.tealLight}44`,
          boxShadow: `0 30px 80px -26px rgba(0,0,0,0.76)`,
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 17,
            letterSpacing: 3,
            color: colors.amber,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {NAME_STRAP.eyebrow}
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {NAME_STRAP.names.map((nm, i) => {
            const p = spring({ frame: local - 6 - i * 4, fps, config: { damping: 20, stiffness: 110 } });
            return (
              <div
                key={nm}
                style={{
                  padding: "12px 22px",
                  borderRadius: 12,
                  background: `${colors.panel}`,
                  border: `1.5px solid ${colors.tealLight}33`,
                  fontFamily: display,
                  fontWeight: 700,
                  fontSize: 30,
                  color: colors.white,
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`,
                }}
              >
                {nm}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
