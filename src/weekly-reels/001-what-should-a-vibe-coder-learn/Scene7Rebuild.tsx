import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Mini wireframe apps illustrating what to rebuild
const TodoAppWireframe: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="180" height="200" viewBox="0 0 180 200" fill="none" opacity={opacity}>
    <rect x="10" y="10" width="160" height="180" rx="12" fill={colors.white} stroke={colors.darkCyra} strokeWidth={2} />
    {/* Title bar */}
    <rect x="10" y="10" width="160" height="32" rx="12" fill={colors.darkCyra} />
    <rect x="10" y="30" width="160" height="12" fill={colors.darkCyra} />
    <text x="90" y="32" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif">To-Do</text>
    {/* Todo items */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="24" y={55 + i * 34} width="14" height="14" rx="3" stroke={colors.darkCyra} strokeWidth={1.5} fill={i < 2 ? `${colors.caribbeanGreen}30` : "none"} />
        {i < 2 && <path d={`M27 ${62 + i * 34} l3 3 5-5`} stroke={colors.caribbeanGreen} strokeWidth={1.5} />}
        <rect x="46" y={57 + i * 34} width={70 + (i % 2) * 20} height="8" rx="4" fill={i < 2 ? colors.chineseSilver : colors.darkSlateGray} opacity={i < 2 ? 0.5 : 0.3} />
      </g>
    ))}
    {/* Add button */}
    <circle cx="140" cy="165" r="18" fill={colors.darkCyra} />
    <line x1="132" y1="165" x2="148" y2="165" stroke={colors.white} strokeWidth={2} />
    <line x1="140" y1="157" x2="140" y2="173" stroke={colors.white} strokeWidth={2} />
  </svg>
);

const APIWireframe: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="180" height="200" viewBox="0 0 180 200" fill="none" opacity={opacity}>
    <rect x="10" y="10" width="160" height="180" rx="12" fill={colors.darkSlateGray} stroke={colors.tiffanyBlue} strokeWidth={2} />
    {/* Terminal style */}
    <g>
      <circle cx="28" cy="26" r="4" fill={colors.oldRose} />
      <circle cx="40" cy="26" r="4" fill={colors.corn} />
      <circle cx="52" cy="26" r="4" fill={colors.limeGreen} />
    </g>
    {/* API endpoints */}
    <text x="22" y="55" fill={colors.caribbeanGreen} fontSize="11" fontFamily="monospace">GET</text>
    <text x="52" y="55" fill={colors.chineseSilver} fontSize="11" fontFamily="monospace">/api/users</text>
    <rect x="22" y="62" width="140" height="1" fill={`${colors.chineseSilver}30`} />
    <text x="22" y="80" fill={colors.tiffanyBlue} fontSize="11" fontFamily="monospace">POST</text>
    <text x="56" y="80" fill={colors.chineseSilver} fontSize="11" fontFamily="monospace">/api/data</text>
    <rect x="22" y="87" width="140" height="1" fill={`${colors.chineseSilver}30`} />
    {/* JSON response */}
    <text x="22" y="110" fill={colors.rhythm} fontSize="10" fontFamily="monospace">{"{"}</text>
    <text x="30" y="124" fill={colors.tiffanyBlue} fontSize="10" fontFamily="monospace">"status"</text>
    <text x="82" y="124" fill={colors.chineseSilver} fontSize="10" fontFamily="monospace">: 200,</text>
    <text x="30" y="138" fill={colors.tiffanyBlue} fontSize="10" fontFamily="monospace">"data"</text>
    <text x="72" y="138" fill={colors.chineseSilver} fontSize="10" fontFamily="monospace">: [...]</text>
    <text x="22" y="152" fill={colors.rhythm} fontSize="10" fontFamily="monospace">{"}"}</text>
    {/* Status indicator */}
    <circle cx="148" cy="172" r="8" fill={colors.caribbeanGreen} opacity={0.8} />
  </svg>
);

const LoginWireframe: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="180" height="200" viewBox="0 0 180 200" fill="none" opacity={opacity}>
    <rect x="10" y="10" width="160" height="180" rx="12" fill={colors.white} stroke={colors.viridianGreen} strokeWidth={2} />
    {/* Lock icon */}
    <circle cx="90" cy="50" r="18" fill={`${colors.viridianGreen}15`} stroke={colors.viridianGreen} strokeWidth={2} />
    <rect x="82" y="48" width="16" height="12" rx="2" fill={`${colors.viridianGreen}30`} stroke={colors.viridianGreen} strokeWidth={1.5} />
    <path d="M85 48v-4a5 5 0 0110 0v4" stroke={colors.viridianGreen} strokeWidth={1.5} fill="none" />
    <circle cx="90" cy="54" r="2" fill={colors.viridianGreen} />
    {/* Email field */}
    <rect x="28" y="82" width="124" height="30" rx="8" fill={colors.magnolia} stroke={colors.chineseSilver} strokeWidth={1.5} />
    <text x="40" y="102" fill={colors.rhythm} fontSize="11" fontFamily="Inter, sans-serif">Email</text>
    {/* Password field */}
    <rect x="28" y="120" width="124" height="30" rx="8" fill={colors.magnolia} stroke={colors.chineseSilver} strokeWidth={1.5} />
    <text x="40" y="140" fill={colors.rhythm} fontSize="11" fontFamily="Inter, sans-serif">Password</text>
    {/* Login button */}
    <rect x="28" y="162" width="124" height="18" rx="9" fill={colors.viridianGreen} />
    <text x="90" y="175" textAnchor="middle" fill={colors.white} fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Login</text>
  </svg>
);

export const Scene7Rebuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);
  const headingY = interpolate(headingProgress, [0, 1], [40, 0]);

  // Wireframe cards entrance (staggered)
  const wireframes = [
    { delay: 2 * fps, label: "To-do app" },
    { delay: 3.5 * fps, label: "Small API" },
    { delay: 5 * fps, label: "Login system" },
  ];

  // "Feel the friction" text
  const frictionDelay = 9 * fps;
  const frictionProgress = spring({ frame, fps, delay: frictionDelay, config: { damping: 200 } });
  const frictionOpacity = interpolate(frictionProgress, [0, 1], [0, 1]);
  const frictionScale = interpolate(frictionProgress, [0, 1], [0.9, 1]);

  // "Without AI" badge
  const badgeDelay = 1.5 * fps;
  const badgeProgress = spring({ frame, fps, delay: badgeDelay, config: { damping: 12, stiffness: 100 } });
  const badgeScale = interpolate(badgeProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily }}>
      {/* Grid background */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(${colors.chineseSilver}10 1px, transparent 1px),
            linear-gradient(90deg, ${colors.chineseSilver}10 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

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
          Rebuild something
          <br />
          <span style={{ color: colors.darkCyra }}>simple</span>
        </div>

        {/* "Without AI" badge */}
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 20,
            backgroundColor: colors.magnolia,
            border: `2px solid ${colors.oldRose}40`,
            transform: `scale(${badgeScale})`,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: colors.oldRose,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Without AI
          </div>
        </div>

        {/* Wireframe apps row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {wireframes.map((wf, i) => {
            const wfProgress = spring({ frame, fps, delay: wf.delay, config: { damping: 200 } });
            const wfOpacity = interpolate(wfProgress, [0, 1], [0, 1]);
            const wfY = interpolate(wfProgress, [0, 1], [40, 0]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  opacity: wfOpacity,
                  transform: `translateY(${wfY}px)`,
                }}
              >
                {i === 0 && <TodoAppWireframe opacity={1} />}
                {i === 1 && <APIWireframe opacity={1} />}
                {i === 2 && <LoginWireframe opacity={1} />}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.darkSlateGray,
                    textAlign: "center",
                  }}
                >
                  {wf.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* "Feel the friction" */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.darkCyra,
            opacity: frictionOpacity,
            transform: `scale(${frictionScale})`,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Feel the friction.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
