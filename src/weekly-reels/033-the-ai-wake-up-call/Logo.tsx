import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Logo: React.FC<{ opacity?: number }> = ({ opacity = 0.7 }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 220,
        right: 80,
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity,
        fontFamily,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: colors.darkCyra,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2L16 6V12L9 16L2 12V6L9 2Z"
            stroke={colors.white}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="9" cy="9" r="2.5" fill={colors.caribbeanGreen} />
        </svg>
      </div>
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: colors.white,
          letterSpacing: 0.5,
        }}
      >
        InstinctHub
      </span>
    </div>
  );
};
