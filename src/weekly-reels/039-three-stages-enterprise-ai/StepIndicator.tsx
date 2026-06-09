import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./colors";
import { dmMono } from "./fonts";

type StepIndicatorProps = {
  active: 1 | 2 | 3;
  activeColor: string;
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  active,
  activeColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay: 2,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [12, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: dmMono,
          fontSize: 22,
          fontWeight: 500,
          color: activeColor,
          letterSpacing: 4,
        }}
      >
        STAGE 0{active} / 03
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              width: n === active ? 56 : 18,
              height: 6,
              borderRadius: 999,
              backgroundColor:
                n === active ? activeColor : `${colors.white}33`,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};
