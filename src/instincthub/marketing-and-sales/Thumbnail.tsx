import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors } from "../_shared/colors";
import { montserrat, nunito } from "../_shared/fonts";

/**
 * Course thumbnail (16:9) for "Marketing and Sales: Find Your Customer First".
 * InstinctHub identity: deep ink canvas, Dark Cyra panel language, Montserrat
 * display type, with a portrait frame lifted from the lecture footage.
 * Rendered locally via `npx remotion still ih-ms-thumbnail`.
 */
export const Thumbnail: React.FC<{ portraitSrc?: string }> = ({
  portraitSrc = "ih-ms-speaker-portrait.jpg",
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep, fontFamily: nunito }}>
      {/* subtle dot grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.tiffany}14 3px, transparent 3px)`,
          backgroundSize: "56px 56px",
        }}
      />
      {/* cyan glow wash, bottom-left */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at 18% 88%, ${colors.cyan}33, transparent 70%)`,
        }}
      />

      {/* top brand bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: colors.cyan,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 70px",
        }}
      >
        <Img
          src={staticFile("instincthub-logo-white.png")}
          alt="InstinctHub"
          style={{ height: 54, width: "auto", display: "block" }}
        />
        <span
          style={{
            marginLeft: "auto",
            fontFamily: montserrat,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 4,
            color: `${colors.white}D9`,
            textTransform: "uppercase",
          }}
        >
          Marketing &amp; Sales
        </span>
      </div>

      {/* left column: title block */}
      <div style={{ position: "absolute", left: 90, top: 190, width: 1060 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: montserrat,
            fontWeight: 700,
            fontSize: 27,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.tiffany,
            background: `${colors.cyan}26`,
            border: `2px solid ${colors.cyan}66`,
            padding: "12px 26px",
            borderRadius: 999,
          }}
        >
          15 lessons · 2 real product launches
        </span>
        <div
          style={{
            marginTop: 32,
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: 112,
            lineHeight: 0.96,
            letterSpacing: -3,
            color: colors.white,
          }}
        >
          Find Your
          <br />
          Customer
          <br />
          <span style={{ color: colors.tiffany }}>First</span>
        </div>
        <div
          style={{
            marginTop: 30,
            display: "inline-block",
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: -0.5,
            color: colors.white,
            background: colors.cyan,
            padding: "14px 30px",
            borderRadius: 14,
          }}
        >
          The only non-negotiable
        </div>
      </div>

      {/* speaker credit */}
      <div style={{ position: "absolute", left: 96, bottom: 70 }}>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 46,
            letterSpacing: -1,
            color: colors.white,
            lineHeight: 1,
          }}
        >
          Bob Jones
        </div>
        <div style={{ fontWeight: 600, fontSize: 28, color: colors.textMuted, marginTop: 8 }}>
          Serial Entrepreneur · MIT Sloan
        </div>
      </div>

      {/* portrait card */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 170,
          width: 660,
          height: 760,
          borderRadius: 36,
          border: `10px solid ${colors.cyan}`,
          overflow: "hidden",
          background: colors.gunmetal,
          boxShadow: `0 40px 100px -28px rgba(0,0,0,0.85), 0 0 0 6px ${colors.tiffany}33`,
        }}
      >
        <Img
          src={staticFile(portraitSrc)}
          alt="Bob Jones lecturing"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%" }}
        />
      </div>
      {/* corner tag on the portrait */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 170,
          background: colors.green,
          color: colors.inkDeep,
          fontFamily: montserrat,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 3,
          textTransform: "uppercase",
          padding: "12px 24px",
          borderRadius: "36px 0 26px 0",
        }}
      >
        Case Study
      </div>
    </AbsoluteFill>
  );
};
