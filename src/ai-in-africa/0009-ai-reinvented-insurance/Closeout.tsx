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
import { CLOSEOUT_IN, CLOSEOUT_BEATS, type CloseoutBeat } from "./timing";

const Beat: React.FC<{ data: CloseoutBeat }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - data.start;
  if (local < -6 || local > data.dur) return null;

  const kP = spring({ frame: local, fps, config: { damping: 20, stiffness: 90 } });
  const l1 = spring({ frame: local - 6, fps, config: { damping: 22, stiffness: 85 } });
  const l2 = spring({ frame: local - 16, fps, config: { damping: 22, stiffness: 85 } });
  const exit = interpolate(local, [data.dur - 14, data.dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exit,
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 160px",
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: 24,
          letterSpacing: 7,
          color: colors.amber,
          textTransform: "uppercase",
          marginBottom: 30,
          opacity: kP,
        }}
      >
        {data.kicker}
      </div>
      <div
        style={{
          fontFamily: display,
          fontWeight: 800,
          fontSize: 72,
          lineHeight: 1.1,
          color: colors.white,
          letterSpacing: -1.2,
          opacity: l1,
          transform: `translateY(${interpolate(l1, [0, 1], [22, 0])}px)`,
          maxWidth: 1480,
        }}
      >
        {data.lines[0]}
      </div>
      <div
        style={{
          fontFamily: display,
          fontWeight: 800,
          fontSize: 72,
          lineHeight: 1.1,
          color: colors.tealLight,
          letterSpacing: -1.2,
          opacity: l2,
          transform: `translateY(${interpolate(l2, [0, 1], [22, 0])}px)`,
          maxWidth: 1480,
          marginTop: 12,
        }}
      >
        {data.lines[1]}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Opaque branded backdrop that covers the black voiceover tail (cut ≥401.3s)
 * and carries the closeout text beats. Held to the very last frame.
 */
export const Closeout: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < CLOSEOUT_IN - 4) return null;

  const fade = interpolate(frame, [CLOSEOUT_IN, CLOSEOUT_IN + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // ambient drift for the radial glow
  const t = frame - CLOSEOUT_IN;
  const gx = 50 + Math.sin(t / 120) * 6;

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <AbsoluteFill style={{ backgroundColor: colors.brandDark }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${gx}% 40%, ${colors.brandTeal}33 0%, transparent 60%), radial-gradient(ellipse at 18% 86%, ${colors.savannahGold}22 0%, transparent 55%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern id="dots-closeout" x="0" y="0" width="46" height="46" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#dots-closeout)" />
        </svg>
      </AbsoluteFill>

      {CLOSEOUT_BEATS.map((b, i) => (
        <Beat key={i} data={b} />
      ))}
    </AbsoluteFill>
  );
};
