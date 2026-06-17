import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors } from "../_shared/colors";
import { montserrat, nunito } from "../_shared/fonts";

/**
 * YouTube thumbnail (16:9) for "Technology: The #1 Access Point to Your
 * Children". InstinctHub identity — deep-ink canvas, Dark Cyra panels,
 * Montserrat display type — with a portrait of the speaker lifted from the
 * footage. Also held for 1s at the top of the video so YouTube can auto-pick
 * it. Render to PNG via `npx remotion still ih-tap-thumbnail`.
 */
export const Thumbnail: React.FC<{ portraitSrc?: string }> = ({
  portraitSrc = "ih-tap-portrait.jpg",
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep, fontFamily: nunito }}>
      {/* dot-grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.tiffany}14 3px, transparent 3px)`,
          backgroundSize: "56px 56px",
        }}
      />
      {/* cyan glow wash, bottom-left */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(960px 760px at 16% 86%, ${colors.cyan}40, transparent 70%)`,
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
          style={{ height: 52, width: "auto", display: "block" }}
        />
        <span
          style={{
            marginLeft: "auto",
            fontFamily: montserrat,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 4,
            color: `${colors.white}E6`,
            textTransform: "uppercase",
          }}
        >
          Digital Parenting
        </span>
      </div>

      {/* left column: headline block */}
      <div style={{ position: "absolute", left: 90, top: 176, width: 1080 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: montserrat,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.tiffany,
            background: `${colors.cyan}26`,
            border: `2px solid ${colors.cyan}73`,
            padding: "12px 26px",
            borderRadius: 999,
          }}
        >
          What every parent must know
        </span>

        <div
          style={{
            marginTop: 30,
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: 118,
            lineHeight: 0.96,
            letterSpacing: -3,
            color: colors.white,
          }}
        >
          The <span style={{ color: colors.tiffany }}>#1 Access</span>
          <br />
          Point to Your
          <br />
          Child
        </div>

        <div
          style={{
            marginTop: 30,
            display: "inline-block",
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 42,
            letterSpacing: -0.5,
            color: colors.white,
            background: colors.cyan,
            padding: "14px 30px",
            borderRadius: 14,
          }}
        >
          …and how to keep it safe
        </div>
      </div>

      {/* speaker credit */}
      <div style={{ position: "absolute", left: 96, bottom: 64 }}>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: -1,
            color: colors.white,
            lineHeight: 1,
          }}
        >
          Noah Olatoye
        </div>
        <div
          style={{ fontWeight: 600, fontSize: 27, color: colors.textMuted, marginTop: 8 }}
        >
          Founder · InstinctHub
        </div>
      </div>

      {/* portrait card */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 168,
          width: 640,
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
          alt="Noah Olatoye"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 22%",
          }}
        />
      </div>
      {/* corner tag on the portrait */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 168,
          background: colors.green,
          color: colors.inkDeep,
          fontFamily: montserrat,
          fontWeight: 800,
          fontSize: 25,
          letterSpacing: 3,
          textTransform: "uppercase",
          padding: "12px 24px",
          borderRadius: "36px 0 26px 0",
        }}
      >
        A True Story
      </div>
    </AbsoluteFill>
  );
};
