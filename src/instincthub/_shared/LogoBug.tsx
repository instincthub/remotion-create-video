import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { colors } from "./colors";
import { montserrat, nunito } from "./fonts";
import { Cap } from "./marks";

/**
 * Persistent InstinctHub logo bug, top-right. Fades in once and holds.
 *
 * Pass `logoSrc` to use the official wordmark image (placed on a near-white
 * chip so the coloured mark stays legible over bright footage). With no asset,
 * a branded fallback chip renders — the graduation-cap mark + "instincthub"
 * wordmark — so the system is usable before the logo file is added.
 */
export const LogoBug: React.FC<{ logoSrc?: string }> = ({ logoSrc }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chip = {
    position: "absolute" as const,
    top: 48,
    right: 64,
    opacity: appear,
    transform: `translateY(${interpolate(appear, [0, 1], [-14, 0])}px)`,
    display: "flex",
    alignItems: "center",
  };

  if (logoSrc) {
    return (
      <div
        style={{
          ...chip,
          padding: "14px 22px",
          borderRadius: 14,
          background: `${colors.white}F2`,
          boxShadow: `0 14px 36px -18px rgba(0,0,0,0.65)`,
          border: `1px solid ${colors.white}`,
        }}
      >
        <Img
          src={staticFile(logoSrc)}
          alt="InstinctHub"
          style={{ height: 46, width: "auto", display: "block" }}
        />
      </div>
    );
  }

  // Drawn fallback — gunmetal chip, cap mark, lowercase wordmark.
  return (
    <div
      style={{
        ...chip,
        gap: 14,
        padding: "12px 22px 12px 16px",
        borderRadius: 14,
        background: `${colors.gunmetal}F2`,
        boxShadow: `0 16px 40px -18px rgba(0,0,0,0.7)`,
        border: `1.5px solid ${colors.cyan}59`,
      }}
    >
      <Cap size={40} stroke={colors.white} accent={colors.tiffany} strokeWidth={4} />
      <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 24,
            color: colors.white,
            letterSpacing: -0.5,
          }}
        >
          instinct
        </span>
        <span
          style={{
            fontFamily: nunito,
            fontWeight: 600,
            fontSize: 24,
            color: colors.tiffany,
            letterSpacing: -0.5,
          }}
        >
          hub
        </span>
      </div>
    </div>
  );
};
