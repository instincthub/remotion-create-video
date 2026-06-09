import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors } from "../_shared/colors";
import { overpass } from "../_shared/fonts";
import { Bulb } from "../_shared/marks";

/**
 * Course thumbnail (16:9) for "Unlocking the Second Half Advantage".
 * The Platform identity: yellow canvas, ink bars, the lightbulb motif, with
 * Prof. Modupe Elebute-Odunsi's portrait (a frame lifted from the keynote).
 * Rendered locally via `npx remotion still me-thumbnail`.
 */
export const Thumbnail: React.FC<{ portraitSrc?: string }> = ({
  portraitSrc = "tp-me-modupe-portrait.jpg",
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.yellow, fontFamily: overpass }}>
      {/* dot grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.ink}1A 3px, transparent 3px)`,
          backgroundSize: "54px 54px",
          opacity: 0.5,
        }}
      />
      {/* faint ghost bulb motif */}
      <div style={{ position: "absolute", top: 70, right: 600, opacity: 0.16, transform: "rotate(8deg)" }}>
        <Bulb size={190} stroke={colors.ink} spark={colors.ink} lit={0} strokeWidth={6} />
      </div>

      {/* top ink bar — the brand line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 104,
          background: colors.ink,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 70px",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 32, letterSpacing: 4, color: colors.white, textTransform: "uppercase" }}>
          Is this all I'm meant to do?
        </span>
        <span style={{ fontWeight: 800, fontSize: 32, letterSpacing: 4, color: colors.yellow, textTransform: "uppercase" }}>
          Go for it.
        </span>
      </div>

      {/* left column — title block */}
      <div style={{ position: "absolute", left: 90, top: 184, width: 1090 }}>
        <span
          style={{
            display: "inline-block",
            fontWeight: 800,
            fontSize: 29,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.ink,
            background: `${colors.ink}14`,
            padding: "12px 26px",
            borderRadius: 999,
            border: `2px solid ${colors.ink}3D`,
          }}
        >
          The Platform Nigeria · Keynote
        </span>
        <div
          style={{
            marginTop: 30,
            fontWeight: 900,
            fontSize: 100,
            lineHeight: 0.94,
            letterSpacing: -3,
            color: colors.ink,
          }}
        >
          Unlocking the
          <br />
          Second Half
          <br />
          Advantage
        </div>
        <div
          style={{
            marginTop: 28,
            display: "inline-block",
            fontWeight: 900,
            fontSize: 46,
            letterSpacing: -0.5,
            color: colors.yellow,
            background: colors.ink,
            padding: "12px 28px",
            borderRadius: 14,
          }}
        >
          Transition · Impact · Legacy
        </div>
      </div>

      {/* speaker credit */}
      <div style={{ position: "absolute", left: 96, bottom: 74, display: "flex", alignItems: "center", gap: 22 }}>
        <Bulb size={64} stroke={colors.ink} spark={colors.ink} lit={0} strokeWidth={5} />
        <div>
          <div style={{ fontWeight: 900, fontSize: 46, letterSpacing: -1.5, color: colors.ink, lineHeight: 1 }}>
            Prof. Modupe Elebute-Odunsi
          </div>
          <div style={{ fontWeight: 600, fontSize: 29, color: colors.ink, opacity: 0.78, marginTop: 6 }}>
            Founder &amp; CEO, Marcelle Ruth Cancer Centre
          </div>
        </div>
      </div>

      {/* portrait card */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 168,
          width: 700,
          height: 770,
          borderRadius: 40,
          border: `12px solid ${colors.ink}`,
          overflow: "hidden",
          background: colors.ink,
          boxShadow: `0 40px 90px -28px ${colors.ink}99`,
        }}
      >
        <Img
          src={staticFile(portraitSrc)}
          alt="Prof. Modupe Elebute-Odunsi"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "46% 10%" }}
        />
      </div>
      {/* magenta corner tag */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 168,
          background: colors.magenta,
          color: colors.white,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 3,
          textTransform: "uppercase",
          padding: "12px 24px",
          borderRadius: "40px 0 28px 0",
        }}
      >
        Keynote
      </div>
    </AbsoluteFill>
  );
};
