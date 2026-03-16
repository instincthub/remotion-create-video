import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";
import { ParticleGrid } from "./ParticleGrid";
import { Logo } from "./Logo";

const CounterStat: React.FC<{
  value: string;
  label: string;
  sublabel: string;
  color: string;
  progress: number;
}> = ({ value, label, sublabel, color, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 0.6, 1], [0.5, 1.1, 1]);
  const y = interpolate(progress, [0, 1], [60, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 160,
          fontWeight: 900,
          color,
          lineHeight: 1,
          letterSpacing: -4,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: colors.white,
          marginTop: 12,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          color: colors.rhythm,
          marginTop: 8,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
};

const NotOneText: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 0.5, 1], [0.3, 1.2, 1]);

  // Shake effect
  const shakeAmount = interpolate(progress, [0.4, 0.7, 1], [8, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 1.8) * shakeAmount;

  // Red pulse flash
  const flashOpacity = interpolate(progress, [0.3, 0.5, 0.7, 1], [0, 0.4, 0.1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* Flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: colors.oldRose,
          opacity: flashOpacity,
          borderRadius: 12,
        }}
      />
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateX(${shakeX}px)`,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: colors.oldRose,
            letterSpacing: 8,
            lineHeight: 1,
          }}
        >
          NOT ONE.
        </div>
        <div
          style={{
            fontSize: 24,
            color: `${colors.chineseSilver}80`,
            marginTop: 16,
          }}
        >
          Not a single conversation.
        </div>
      </div>
    </div>
  );
};

export const Scene2StatsBomb: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 22% stat (0-15s = 0-450 frames)
  const phase1Progress = spring({
    frame: frame - Math.round(fps * 1),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // WEF source (appears with stat)
  const sourceOpacity = interpolate(frame, [fps * 3, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "2030" tag
  const tagProgress = spring({
    frame: frame - Math.round(fps * 4),
    fps,
    config: { damping: 200 },
  });

  // Phase 2: "NOT ONE." (15-28s = 450-840 frames)
  const notOneProgress = spring({
    frame: frame - Math.round(fps * 15),
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // "half of parents" context
  const contextProgress = spring({
    frame: frame - Math.round(fps * 11),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.gunmetal,
        fontFamily,
      }}
    >
      <ParticleGrid />

      {/* Phase 1: 22% stat */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 80,
          right: 80,
          bottom: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
        }}
      >
        {/* Top section: WEF stat */}
        <div
          style={{
            opacity: interpolate(notOneProgress, [0, 0.5], [1, 0], {
              extrapolateRight: "clamp",
            }),
            textAlign: "center",
          }}
        >
          <CounterStat
            value="22%"
            label="of ALL jobs will be reshaped by AI"
            sublabel="World Economic Forum — by 2030"
            color={colors.caribbeanGreen}
            progress={phase1Progress}
          />

          <div
            style={{
              opacity: tagProgress > 0 ? interpolate(tagProgress, [0, 1], [0, 1]) : 0,
              transform: `translateY(${interpolate(tagProgress, [0, 1], [20, 0])}px)`,
              marginTop: 40,
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              background: `${colors.darkCyra}20`,
              border: `1px solid ${colors.darkCyra}60`,
              borderRadius: 8,
              padding: "12px 32px",
            }}
          >
            <div style={{ fontSize: 20, color: colors.tiffanyBlue, fontWeight: 700 }}>
              That is before most children today will start their careers.
            </div>
          </div>

          <div
            style={{
              opacity: sourceOpacity,
              fontSize: 14,
              color: colors.rhythm,
              marginTop: 16,
            }}
          >
            Source: World Economic Forum Future of Jobs Report
          </div>
        </div>

        {/* Context: "nearly half" bridge text */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            right: 80,
            opacity: interpolate(contextProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(contextProgress, [0, 1], [30, 0])}px)`,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            And yet, nearly{" "}
            <span style={{ color: colors.caribbeanGreen }}>half of all parents</span>
            {" "}have never had
          </div>
          <div
            style={{
              fontSize: 28,
              color: `${colors.chineseSilver}80`,
              marginBottom: 40,
            }}
          >
            a single conversation with their child about it.
          </div>
        </div>

        {/* Phase 2: NOT ONE */}
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NotOneText progress={notOneProgress} />
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
