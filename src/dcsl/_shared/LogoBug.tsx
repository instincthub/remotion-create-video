import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { colors } from "./colors";

/**
 * Persistent DCSL logo bug, top-right, inside a small frosted chip so the
 * coloured wordmark stays legible over bright footage. Fades in once and holds.
 *
 * The chip respects logo clear space; the mark itself is never recoloured —
 * we place the light (colour) logo on a near-white chip per the logo rules.
 */
export const LogoBug: React.FC<{ logoSrc?: string }> = ({ logoSrc }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (!logoSrc) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        right: 64,
        padding: "14px 22px",
        borderRadius: 14,
        background: `${colors.white}F2`,
        boxShadow: `0 14px 36px -18px rgba(0,0,0,0.65)`,
        border: `1px solid ${colors.white}`,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [-14, 0])}px)`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Img
        src={staticFile(logoSrc)}
        alt="DCSL logo"
        style={{ height: 46, width: "auto", display: "block" }}
      />
    </div>
  );
};
