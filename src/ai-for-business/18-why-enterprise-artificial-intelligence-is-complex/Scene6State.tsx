import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const TIMELINE_EVENTS = [
  { label: "User Login", time: "09:01", icon: "user", color: colors.darkCyra },
  { label: "Product View", time: "09:03", icon: "eye", color: colors.viridianGreen },
  { label: "Add to Cart", time: "09:05", icon: "cart", color: colors.tiffanyBlue },
  { label: "Price Check", time: "09:07", icon: "tag", color: colors.caribbeanGreen },
  { label: "Checkout", time: "09:12", icon: "check", color: colors.darkCyra },
  { label: "Payment", time: "09:14", icon: "card", color: colors.viridianGreen },
];

export const Scene6State: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Timeline events appear sequentially
  const eventEntrances = TIMELINE_EVENTS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps * 1.5 + i * fps * 0.7,
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // "Deep Blue" context box
  const deepBlueProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const deepBlueOpacity = interpolate(deepBlueProgress, [0, 1], [0, 1]);
  const deepBlueY = interpolate(deepBlueProgress, [0, 1], [20, 0]);

  // Growing state trail effect
  const trailLength = interpolate(
    frame,
    [2 * fps, 12 * fps],
    [0, TIMELINE_EVENTS.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          State Changes{" "}
          <span style={{ color: colors.darkCyra }}>Everything</span>
        </div>
      </div>

      {/* Timeline visualization */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          paddingTop: 80,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 1400,
            height: 500,
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              top: 100,
              left: 80,
              right: 80,
              height: 4,
              background: `${colors.chineseSilver}60`,
              borderRadius: 2,
            }}
          />

          {/* Active trail on timeline */}
          <div
            style={{
              position: "absolute",
              top: 100,
              left: 80,
              width: `${Math.min(trailLength / TIMELINE_EVENTS.length, 1) * (1400 - 160)}px`,
              height: 4,
              background: colors.darkCyra,
              borderRadius: 2,
            }}
          />

          {/* Timeline events */}
          {TIMELINE_EVENTS.map((event, i) => {
            const entrance = eventEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const scale = interpolate(entrance, [0, 1], [0.6, 1]);
            const eventX = 80 + (i / (TIMELINE_EVENTS.length - 1)) * (1400 - 160);

            return (
              <div
                key={event.label}
                style={{
                  position: "absolute",
                  top: 60,
                  left: eventX - 55,
                  width: 110,
                  opacity,
                  transform: `scale(${scale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Node dot */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: event.color,
                    border: `3px solid ${colors.white}`,
                    boxShadow: `0 0 0 3px ${event.color}40`,
                    marginBottom: 16,
                    zIndex: 2,
                  }}
                />
                {/* Event card */}
                <div
                  style={{
                    background: colors.white,
                    border: `2px solid ${event.color}30`,
                    borderRadius: 12,
                    padding: "14px 20px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    minWidth: 140,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      color: colors.rhythm,
                      marginBottom: 6,
                    }}
                  >
                    {event.time}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: colors.darkSlateGray,
                    }}
                  >
                    {event.label}
                  </div>
                </div>
              </div>
            );
          })}

          {/* State accumulation indicator */}
          <div
            style={{
              position: "absolute",
              top: 320,
              left: 80,
              right: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                opacity: deepBlueOpacity,
                transform: `translateY(${deepBlueY}px)`,
                display: "flex",
                gap: 40,
                alignItems: "stretch",
              }}
            >
              {/* Stateless box */}
              <div
                style={{
                  background: colors.white,
                  border: `2px solid ${colors.chineseSilver}`,
                  borderRadius: 16,
                  padding: "24px 36px",
                  textAlign: "center",
                  width: 360,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: colors.rhythm,
                    marginBottom: 10,
                  }}
                >
                  Stateless
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: colors.rhythm,
                    lineHeight: 1.5,
                  }}
                >
                  Each decision is standalone. No memory of the past.
                </div>
              </div>

              {/* VS */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 32,
                  fontWeight: 700,
                  color: colors.darkSlateGray,
                }}
              >
                vs
              </div>

              {/* Stateful box */}
              <div
                style={{
                  background: colors.white,
                  border: `2px solid ${colors.darkCyra}`,
                  borderRadius: 16,
                  padding: "24px 36px",
                  textAlign: "center",
                  width: 360,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: colors.darkCyra,
                    marginBottom: 10,
                  }}
                >
                  Stateful
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: colors.gunmetal,
                    lineHeight: 1.5,
                  }}
                >
                  Must understand what happened and how it got there.
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
