import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Dashboard with anomaly indicators
const AnomalyDashboard: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Confidence bar shrinking animation
  const barShrink = interpolate(
    frame,
    [0, 12 * 30],
    [0.92, 0.45],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Flickering number
  const numberFlicker = Math.sin(frame * 0.15) > 0.3;
  const displayedConfidence = Math.round(barShrink * 100);

  // Entity count shift
  const entityShift = interpolate(
    frame,
    [0, 10 * 30],
    [1847, 923],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Warning pulse
  const warningPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
        width: 900,
      }}
    >
      {/* Dashboard frame */}
      <div
        style={{
          background: `${colors.darkNavy}`,
          borderRadius: 16,
          padding: 40,
          border: `2px solid ${colors.chineseSilver}30`,
        }}
      >
        {/* Dashboard header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.white,
              fontFamily,
            }}
          >
            AI Model Dashboard
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: warningPulse,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: colors.oldRose,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.oldRose,
                fontFamily,
              }}
            >
              ANOMALY DETECTED
            </span>
          </div>
        </div>

        {/* Metrics row */}
        <div
          style={{
            display: "flex",
            gap: 24,
          }}
        >
          {/* Confidence score */}
          <div
            style={{
              flex: 1,
              background: `${colors.white}08`,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${colors.chineseSilver}15`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: colors.rhythm,
                marginBottom: 8,
                fontFamily,
              }}
            >
              Confidence Score
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color:
                  displayedConfidence < 60
                    ? colors.oldRose
                    : colors.corn,
                fontFamily,
                opacity: numberFlicker ? 1 : 0.7,
              }}
            >
              {displayedConfidence}%
            </div>
            {/* Confidence bar */}
            <div
              style={{
                width: "100%",
                height: 8,
                background: `${colors.white}10`,
                borderRadius: 4,
                marginTop: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${barShrink * 100}%`,
                  height: "100%",
                  background:
                    barShrink < 0.6
                      ? colors.oldRose
                      : colors.corn,
                  borderRadius: 4,
                  transition: "none",
                }}
              />
            </div>
          </div>

          {/* Entity count */}
          <div
            style={{
              flex: 1,
              background: `${colors.white}08`,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${colors.chineseSilver}15`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: colors.rhythm,
                marginBottom: 8,
                fontFamily,
              }}
            >
              Entity Count
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: colors.corn,
                fontFamily,
              }}
            >
              {Math.round(entityShift)}
            </div>
            <div
              style={{
                fontSize: 14,
                color: colors.oldRose,
                marginTop: 12,
                fontFamily,
                fontWeight: 700,
              }}
            >
              -50% from baseline
            </div>
          </div>

          {/* Pattern match */}
          <div
            style={{
              flex: 1,
              background: `${colors.white}08`,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${colors.chineseSilver}15`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: colors.rhythm,
                marginBottom: 8,
                fontFamily,
              }}
            >
              Pattern Match
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: colors.oldRose,
                fontFamily,
              }}
            >
              LOW
            </div>
            <div
              style={{
                fontSize: 14,
                color: colors.rhythm,
                marginTop: 12,
                fontFamily,
              }}
            >
              Distribution shift
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene8Drift: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Dashboard
  const dashProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 14, stiffness: 80 },
  });

  // Warning text
  const warningProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 8),
    config: { damping: 10, stiffness: 70 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Subtle red warning accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${colors.oldRose}40, transparent)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${colors.oldRose}40, transparent)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Performance{" "}
          <span style={{ color: colors.oldRose }}>shifts</span>.
        </span>
        <br />
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Confidence{" "}
          <span style={{ color: colors.oldRose }}>drops</span>.
        </span>
      </div>

      {/* Dashboard */}
      <AnomalyDashboard progress={dashProgress} />

      {/* Bottom warning */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          width: "100%",
          textAlign: "center",
          opacity: warningOpacity,
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: colors.rhythm,
          }}
        >
          The model may not crash. But it stops being{" "}
          <span style={{ color: colors.oldRose }}>useful</span>.
        </span>
      </div>
    </AbsoluteFill>
  );
};
