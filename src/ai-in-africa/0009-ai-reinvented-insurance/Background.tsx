import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { colors } from "./colors";
import { mono } from "./fonts";
import { shotAt } from "./shots";

/**
 * Background = the baked radio-edit footage (true CFR-30, so audio stays in
 * lip-sync) under a directed cinematic zoom from `shots.ts` — wide
 * establishing shots that push into tighter close-ups and pull back out,
 * with a gentle breathe so no take is ever static.
 */
export const Background: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  const frame = useCurrentFrame();

  if (videoSrc) {
    const { scale, ox, oy } = shotAt(frame);
    return (
      <AbsoluteFill style={{ backgroundColor: colors.brandDark, overflow: "hidden" }}>
        <AbsoluteFill
          style={{
            transform: `scale(${scale})`,
            transformOrigin: `${ox}% ${oy}%`,
          }}
        >
          <OffthreadVideo src={staticFile(videoSrc)} />
        </AbsoluteFill>
        {/* Scrims so lower-thirds and the chapter rail stay legible over the
            bright wall without dimming the face. */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, ${colors.brandDark}55 0%, transparent 18%, transparent 58%, ${colors.brandDark}AA 100%)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${colors.brandTeal}33 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 96,
          fontFamily: mono,
          fontSize: 18,
          letterSpacing: 3,
          color: `${colors.white}55`,
          textTransform: "uppercase",
        }}
      >
        Footage placeholder · set videoSrc to composite
      </div>
    </AbsoluteFill>
  );
};
