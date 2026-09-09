// Act 3 — the real Lagos classroom.
//
// Summer Coding Class 2026 closing ceremony. Faces cleared for publication by
// Noah on 2026-09-09. The no-legible-names rule still stands: the certificate
// group photo only ever pulls OUT, because pushing in makes children's names
// readable at the source resolution (PROMO-SCRIPT §2).
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { colors, montserrat, nunito, sec, useLayout, FACTS, SHOTS } from "../theme";
import { KenBurns, Naira, Panel, Scrim, useWindow } from "../bits";

const F = (s: number) => sec(s);
const span = (k: keyof typeof SHOTS) => ({
  from: F(SHOTS[k].from),
  dur: F(SHOTS[k].to - SHOTS[k].from),
});

const Footage: React.FC<{ src: string; durF: number; startFrom?: number; children?: React.ReactNode }> = ({
  src,
  durF,
  startFrom = 0,
  children,
}) => {
  const fade = useWindow(0, durF, 8);
  return (
    <AbsoluteFill style={{ opacity: fade, backgroundColor: colors.inkDeep }}>
      <OffthreadVideo
        src={staticFile(src)}
        startFrom={startFrom}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Scrim />
      {children}
    </AbsoluteFill>
  );
};

const Still: React.FC<{
  src: string;
  durF: number;
  dir?: "in" | "out";
  originY?: string;
  children?: React.ReactNode;
}> = ({ src, durF, dir = "out", originY = "50%", children }) => {
  const fade = useWindow(0, durF, 8);
  return (
    <AbsoluteFill style={{ opacity: fade, backgroundColor: colors.inkDeep }}>
      <KenBurns src={src} durationF={durF} dir={dir} originY={originY} />
      <Scrim />
      {children}
    </AbsoluteFill>
  );
};

/** The three proof figures, from config.ts and nowhere else. */
const ProofCard: React.FC<{ durF: number }> = ({ durF }) => {
  const L = useLayout();
  const p = useWindow(12, durF, 10);
  const items = [
    [FACTS.students.toLocaleString(), "children"],
    [FACTS.assessments.toLocaleString(), "assessments"],
    [FACTS.projects.toLocaleString(), "projects built"],
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: L.margin,
        right: L.margin,
        bottom: L.safeBottom + L.captionBand + 40,
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px)`,
        display: "flex",
        justifyContent: L.portrait ? "flex-start" : "center",
      }}
    >
      <Panel>
        <div style={{ display: "flex", gap: L.portrait ? 34 : 60, flexWrap: "wrap" }}>
          {items.map(([n, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: montserrat,
                  fontWeight: 900,
                  fontSize: 68 * L.k,
                  lineHeight: 1,
                  color: colors.green,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: nunito,
                  fontWeight: 600,
                  fontSize: 26 * L.k,
                  color: colors.textDim,
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};

/** Ages and price, carried under line 17. */
const OfferCard: React.FC<{ durF: number }> = ({ durF }) => {
  const L = useLayout();
  const p = useWindow(10, durF, 10);
  return (
    <div
      style={{
        position: "absolute",
        left: L.margin,
        right: L.margin,
        bottom: L.safeBottom + L.captionBand + 40,
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px)`,
        display: "flex",
        justifyContent: L.portrait ? "flex-start" : "center",
      }}
    >
      <Panel>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 48 * L.k,
            color: colors.white,
            whiteSpace: "nowrap",
          }}
        >
          {FACTS.ages}
          <span style={{ color: colors.tiffany, margin: "0 18px" }}>·</span>
          From <Naira />
          {FACTS.price}/month
        </div>
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 600,
            fontSize: 28 * L.k,
            color: colors.textMuted,
            marginTop: 10,
          }}
        >
          Saturdays · Ikoyi or online, anywhere in the world
        </div>
      </Panel>
    </div>
  );
};

/** "1968" returning small over the Lagos room — the callback (line 18). */
const Callback1968: React.FC<{ durF: number }> = ({ durF }) => {
  const L = useLayout();
  const p = useWindow(14, durF, 12);
  return (
    <div
      style={{
        position: "absolute",
        top: L.safeTop + 50,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: p * 0.9,
      }}
    >
      <div
        style={{
          fontFamily: montserrat,
          fontWeight: 900,
          fontSize: 120 * L.k,
          color: colors.white,
          letterSpacing: -4,
          textShadow: "0 10px 40px rgba(0,0,0,0.8)",
        }}
      >
        1968
      </div>
    </div>
  );
};

export const Real: React.FC = () => {
  const room = span("realRoom");
  const group = span("stillGroup");
  const python = span("realPython");
  const present = span("stillPresent");
  const parents = span("realParents");
  const audience = span("realAudience");

  return (
    <AbsoluteFill>
      {/* The hard cut on "But this has" — real children, no card, nothing
          between the viewer and the room. */}
      <Sequence from={room.from} durationInFrames={room.dur}>
        <Footage src="kcc-promo/real-room.mp4" durF={room.dur} startFrom={10} />
      </Sequence>

      <Sequence from={group.from} durationInFrames={group.dur}>
        {/* PULL OUT only: pushing in makes the certificate names legible. */}
        <Still src="kcc-promo/still-group.jpg" durF={group.dur} dir="out">
          <ProofCard durF={group.dur} />
        </Still>
      </Sequence>

      <Sequence from={python.from} durationInFrames={python.dur}>
        <Footage src="kcc-promo/real-python.mp4" durF={python.dur} startFrom={12} />
      </Sequence>

      <Sequence from={present.from} durationInFrames={present.dur}>
        <Still src="kcc-promo/still-present.jpg" durF={present.dur} dir="in" originY="42%">
          <OfferCard durF={present.dur} />
        </Still>
      </Sequence>

      <Sequence from={parents.from} durationInFrames={parents.dur}>
        <Footage src="kcc-promo/real-parents.mp4" durF={parents.dur} startFrom={16}>
          <Callback1968 durF={parents.dur} />
        </Footage>
      </Sequence>

      <Sequence from={audience.from} durationInFrames={audience.dur}>
        <Footage src="kcc-promo/real-audience.mp4" durF={audience.dur} startFrom={20} />
      </Sequence>
    </AbsoluteFill>
  );
};
