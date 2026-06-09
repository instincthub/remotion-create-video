import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../parent-tips/colors";

/**
 * Shared opaque backdrop for the teaser reel: Brand Dark, a slowly drifting
 * teal glow, and a faint dot grid — the same visual family as the main video's
 * cutaways so the teaser feels of-a-piece.
 */
export const ReelBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const gy = 40 + Math.sin(frame / 40) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% ${gy}%, ${colors.brandTeal}40 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05 }}>
        <svg width="1080" height="1920">
          <defs>
            <pattern
              id="dots-reel"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#dots-reel)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
