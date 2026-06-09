import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors } from "../_shared/colors";
import { overpass } from "../_shared/fonts";
import { Bulb } from "../_shared/marks";

/**
 * Course thumbnail (16:9) for "Ideas Are Free, Execution Is Everything".
 * The Platform identity: yellow canvas, ink bars, the lightbulb motif, with
 * Tosin Eniolorunda's portrait (a frame lifted from the keynote footage).
 * Rendered locally via `npx remotion still te-thumbnail`.
 */
export const Thumbnail: React.FC<{ portraitSrc?: string }> = ({
  portraitSrc = "tp-te-tosin-portrait.jpg",
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
          Ideas are free.
        </span>
        <span style={{ fontWeight: 800, fontSize: 32, letterSpacing: 4, color: colors.yellow, textTransform: "uppercase" }}>
          Execution is everything.
        </span>
      </div>

      {/* left column — title block */}
      <div style={{ position: "absolute", left: 90, top: 184, width: 1080 }}>
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
            fontSize: 118,
            lineHeight: 0.92,
            letterSpacing: -4,
            color: colors.ink,
          }}
        >
          Ideas Are Free.
          <br />
          Execution Is
          <br />
          Everything.
        </div>
        <div
          style={{
            marginTop: 30,
            display: "inline-block",
            fontWeight: 900,
            fontSize: 50,
            letterSpacing: -1,
            color: colors.yellow,
            background: colors.ink,
            padding: "12px 28px",
            borderRadius: 14,
          }}
        >
          The seven principles
        </div>
      </div>

      {/* speaker credit */}
      <div style={{ position: "absolute", left: 96, bottom: 78, display: "flex", alignItems: "center", gap: 22 }}>
        <Bulb size={64} stroke={colors.ink} spark={colors.ink} lit={0} strokeWidth={5} />
        <div>
          <div style={{ fontWeight: 900, fontSize: 52, letterSpacing: -1.5, color: colors.ink, lineHeight: 1 }}>
            Tosin Eniolorunda
          </div>
          <div style={{ fontWeight: 600, fontSize: 31, color: colors.ink, opacity: 0.78, marginTop: 6 }}>
            Founder &amp; CEO, Moniepoint
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
          alt="Tosin Eniolorunda"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 16%" }}
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
