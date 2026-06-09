import { AbsoluteFill } from "remotion";
import { colors } from "./colors";

type SceneBackgroundProps = {
  glow: string; // hex color used for the radial glow
  patternColor?: string;
  glowPosition?: string; // CSS position for the radial gradient origin
};

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  glow,
  patternColor = colors.tiffanyBlue,
  glowPosition = "50% 30%",
}) => (
  <>
    <AbsoluteFill
      style={{ background: colors.surfaceDarker, pointerEvents: "none" }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at ${glowPosition}, ${glow}55 0%, transparent 60%)`,
        pointerEvents: "none",
      }}
    />
    <AbsoluteFill style={{ opacity: 0.06, pointerEvents: "none" }}>
      <svg width="1080" height="1920">
        <defs>
          <pattern
            id={`dots-${patternColor.replace("#", "")}`}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill={patternColor} />
          </pattern>
        </defs>
        <rect
          width="1080"
          height="1920"
          fill={`url(#dots-${patternColor.replace("#", "")})`}
        />
      </svg>
    </AbsoluteFill>
  </>
);
