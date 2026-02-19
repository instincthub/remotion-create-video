import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const CONCEPTS = [
  {
    label: "REST API",
    desc: "How apps talk",
    color: colors.darkCyra,
  },
  {
    label: "State",
    desc: "Where data lives",
    color: colors.viridianGreen,
  },
  {
    label: "Auth",
    desc: "Who gets access",
    color: colors.tiffanyBlue,
  },
  {
    label: "Latency",
    desc: "Why things feel slow",
    color: colors.caribbeanGreen,
  },
  {
    label: "Git",
    desc: "How you track changes",
    color: colors.deepGreenCyanTurquoise,
  },
];

export const Scene6Fundamentals: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  // Bottom tag
  const tagDelay = 2 * fps + CONCEPTS.length * fps * 0.9 + fps;
  const tagProgress = spring({ frame, fps, delay: tagDelay, config: { damping: 200 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);
  const tagScale = interpolate(tagProgress, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.magnolia}, ${colors.white}, ${colors.magnolia})`,
        fontFamily,
      }}
    >
      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 24,
        }}
      >
        {/* Heading */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          Learn the fundamentals
        </div>

        {/* Concept cards with large icons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
            maxWidth: 650,
          }}
        >
          {CONCEPTS.map((concept, i) => {
            const conceptDelay = 2 * fps + i * fps * 0.8;
            const conceptProgress = spring({
              frame,
              fps,
              delay: conceptDelay,
              config: { damping: 200 },
            });
            const conceptOpacity = interpolate(conceptProgress, [0, 1], [0, 1]);
            const conceptX = interpolate(conceptProgress, [0, 1], [i % 2 === 0 ? -50 : 50, 0]);

            // Highlight when it appears
            const isHighlighted =
              frame > conceptDelay + 10 && frame < conceptDelay + fps * 1.5;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 22px",
                  borderRadius: 16,
                  backgroundColor: isHighlighted ? `${concept.color}08` : colors.white,
                  border: `2.5px solid ${isHighlighted ? concept.color : `${concept.color}30`}`,
                  boxShadow: isHighlighted
                    ? `0 4px 16px ${concept.color}20`
                    : "0 2px 8px rgba(0,0,0,0.03)",
                  opacity: conceptOpacity,
                  transform: `translateX(${conceptX}px)`,
                }}
              >
                {/* Large icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: `${concept.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    {i === 0 && (
                      <>
                        <rect x="3" y="4" width="22" height="20" rx="4" stroke={concept.color} strokeWidth={2} />
                        <path d="M10 11h8M10 15h5" stroke={concept.color} strokeWidth={2} strokeLinecap="round" />
                        <circle cx="21" cy="5" r="4" fill={colors.caribbeanGreen} />
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <circle cx="14" cy="14" r="10" stroke={concept.color} strokeWidth={2} />
                        <path d="M9 14h4l2-5 3 10 2-5h3" stroke={concept.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <rect x="6" y="13" width="16" height="11" rx="3" stroke={concept.color} strokeWidth={2} />
                        <path d="M9 13V9a5 5 0 0110 0v4" stroke={concept.color} strokeWidth={2} />
                        <circle cx="14" cy="19" r="2" fill={concept.color} />
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <circle cx="14" cy="14" r="10" stroke={concept.color} strokeWidth={2} />
                        <path d="M14 7v7l4 4" stroke={concept.color} strokeWidth={2} strokeLinecap="round" />
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <circle cx="14" cy="7" r="3.5" stroke={concept.color} strokeWidth={2} />
                        <circle cx="7" cy="21" r="3.5" stroke={concept.color} strokeWidth={2} />
                        <circle cx="21" cy="21" r="3.5" stroke={concept.color} strokeWidth={2} />
                        <line x1="14" y1="10.5" x2="14" y2="14" stroke={concept.color} strokeWidth={2} />
                        <line x1="11" y1="16" x2="8.5" y2="18" stroke={concept.color} strokeWidth={2} />
                        <line x1="17" y1="16" x2="19.5" y2="18" stroke={concept.color} strokeWidth={2} />
                      </>
                    )}
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: colors.gunmetal }}>
                    {concept.label}
                  </div>
                  <div style={{ fontSize: 18, color: colors.rhythm, marginTop: 2 }}>
                    {concept.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tag */}
        <div
          style={{
            fontSize: 28,
            color: colors.darkCyra,
            fontWeight: 700,
            opacity: tagOpacity,
            transform: `scale(${tagScale})`,
            textAlign: "center",
          }}
        >
          Fundamentals create control.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
