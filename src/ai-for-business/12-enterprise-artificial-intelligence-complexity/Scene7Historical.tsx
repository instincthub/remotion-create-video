import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface TimelineMarker {
  year: string;
  label: string;
  description: string;
  highlightColor: string;
  xPercent: number;
}

const markers: TimelineMarker[] = [
  {
    year: "1960s",
    label: "Various unnamed conditions",
    description: "Old medical records, inconsistent terms",
    highlightColor: colors.chineseSilver,
    xPercent: 0.08,
  },
  {
    year: "1976",
    label: "Fibromyalgia formally defined",
    description: "Medical terminology standardised",
    highlightColor: colors.caribbeanGreen,
    xPercent: 0.33,
  },
  {
    year: "1990s",
    label: "Digital records begin",
    description: "Paper to electronic transition",
    highlightColor: colors.tiffanyBlue,
    xPercent: 0.58,
  },
  {
    year: "2020",
    label: "AI must understand all of this",
    description: "60 years of evolving terminology",
    highlightColor: colors.corn,
    xPercent: 0.83,
  },
];

// Old-style paper texture card
const RecordCard: React.FC<{
  marker: TimelineMarker;
  index: number;
  progress: number;
  frame: number;
}> = ({ marker, index, progress, frame }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const slideY = interpolate(progress, [0, 1], [40, 0]);
  const isAbove = index % 2 === 0;

  // Subtle term morph glow for highlighted marker
  const glowIntensity =
    marker.highlightColor === colors.caribbeanGreen
      ? interpolate(Math.sin(frame * 0.06), [-1, 1], [8, 20])
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: `${marker.xPercent * 100}%`,
        top: isAbove ? 200 : 540,
        transform: `translate(-50%, ${slideY}px)`,
        opacity,
        width: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: `${colors.white}08`,
          border: `1px solid ${marker.highlightColor}50`,
          borderRadius: 12,
          padding: "20px 24px",
          boxShadow: glowIntensity > 0
            ? `0 0 ${glowIntensity}px ${marker.highlightColor}40`
            : "none",
          width: "100%",
        }}
      >
        {/* Year badge */}
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: marker.highlightColor,
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          {marker.year}
        </div>
        {/* Label */}
        <div
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.white,
            lineHeight: 1.4,
            marginBottom: 6,
          }}
        >
          {marker.label}
        </div>
        {/* Description */}
        <div
          style={{
            fontSize: 16,
            color: colors.chineseSilver,
            lineHeight: 1.4,
          }}
        >
          {marker.description}
        </div>
      </div>

      {/* Connector line to timeline */}
      <div
        style={{
          width: 2,
          height: isAbove ? 60 : 0,
          background: `linear-gradient(180deg, transparent, ${marker.highlightColor})`,
          marginTop: isAbove ? 0 : -60,
          order: isAbove ? 1 : -1,
        }}
      />
      {!isAbove && (
        <div
          style={{
            width: 2,
            height: 60,
            background: `linear-gradient(180deg, ${marker.highlightColor}, transparent)`,
            position: "absolute",
            top: -60,
          }}
        />
      )}
    </div>
  );
};

export const Scene7Historical: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-20, 0]);

  // Timeline line draw
  const timelineDrawProgress = interpolate(
    frame,
    [1.5 * fps, 5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Marker timings (each appears sequentially)
  const markerProgresses = markers.map((_, i) =>
    spring({
      frame,
      fps,
      delay: (2.5 + i * 3.5) * fps,
      config: { damping: 12, stiffness: 80 },
    })
  );

  // Decade labels along timeline
  const decades = ["1960", "1970", "1980", "1990", "2000", "2010", "2020"];
  const decadeSpacing = 1 / (decades.length - 1);

  // Corn highlight dots on markers
  const dotPulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.6, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 16 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  // Timeline Y position
  const timelineY = 470;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCharcoal,
        fontFamily,
      }}
    >
      {/* Background subtle dots */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 30 }).map((_, row) =>
          Array.from({ length: 50 }).map((__, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={col * 40 + 20}
              cy={row * 40 + 20}
              r={1.5}
              fill={colors.tiffanyBlue}
            />
          ))
        )}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
          }}
        >
          Historical Data{" "}
          <span style={{ color: colors.corn }}>Complexity</span>
        </div>
      </div>

      {/* Sub-heading */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            fontSize: 22,
            color: colors.chineseSilver,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Medical terminology evolves. AI must keep up.
        </div>
      </div>

      {/* Timeline horizontal line */}
      <svg
        width="1920"
        height="20"
        viewBox="0 0 1920 20"
        style={{ position: "absolute", top: timelineY - 10, left: 0, zIndex: 2 }}
      >
        <line
          x1={100}
          y1={10}
          x2={100 + timelineDrawProgress * 1720}
          y2={10}
          stroke={colors.darkCyra}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>

      {/* Decade labels */}
      {decades.map((decade, i) => {
        const xPos = 100 + i * decadeSpacing * 1720;
        const decadeOpacity = interpolate(
          timelineDrawProgress,
          [i * decadeSpacing - 0.02, i * decadeSpacing + 0.05],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={`decade-${i}`}
            style={{
              position: "absolute",
              left: xPos,
              top: timelineY + 12,
              transform: "translateX(-50%)",
              opacity: decadeOpacity,
              zIndex: 2,
            }}
          >
            {/* Tick mark */}
            <div
              style={{
                width: 2,
                height: 10,
                background: colors.darkCyra,
                margin: "0 auto 6px",
              }}
            />
            <div
              style={{
                fontSize: 14,
                color: colors.chineseSilver,
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              {decade}
            </div>
          </div>
        );
      })}

      {/* Marker dots on timeline */}
      {markers.map((marker, i) => {
        const markerOpacity = interpolate(markerProgresses[i], [0, 1], [0, 1]);
        const xPos = 100 + marker.xPercent * 1720;
        return (
          <div
            key={`marker-dot-${i}`}
            style={{
              position: "absolute",
              left: xPos,
              top: timelineY - 8,
              transform: "translateX(-50%)",
              zIndex: 3,
              opacity: markerOpacity,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle
                cx={8}
                cy={8}
                r={7}
                fill={marker.highlightColor}
                opacity={marker.highlightColor === colors.corn ? dotPulse : 1}
              />
              <circle
                cx={8}
                cy={8}
                r={3}
                fill={colors.darkCharcoal}
              />
            </svg>
          </div>
        );
      })}

      {/* Record cards */}
      {markers.map((marker, i) => (
        <RecordCard
          key={`card-${i}`}
          marker={marker}
          index={i}
          progress={markerProgresses[i]}
          frame={frame}
        />
      ))}

      {/* Bottom insight text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        <div
          style={{
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            fontSize: 34,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Your model must{" "}
          <span style={{ color: colors.corn }}>understand history.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
