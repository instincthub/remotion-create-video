// Act 1 — 1968. Designed typography, no footage.
//
// Deliberately NOT generated "archive" film: this act is about a real, living
// person and a real school, and fabricated footage of either would be a lie
// dressed as evidence (PROMO-SCRIPT §2). Type on a dark ground, a teletype
// cadence, and the brand's own colours do the work instead.
import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { colors, montserrat, nunito, useLayout, sec, VO, SUM_1968 } from "../theme";
import { Display, Ground, Naira, Typed, useWindow } from "../bits";

/** Frames, relative to this act, for a narration line. */
const at = (id: keyof typeof VO) => ({
  from: sec(VO[id].start),
  dur: sec(VO[id].end - VO[id].start),
});

/** Big year marker that sits behind the act and drifts very slowly. */
const YearPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const p = interpolate(frame, [0, 26], [0, 1], { extrapolateRight: "clamp" });
  const drift = interpolate(frame, [0, sec(31)], [0, -26]);
  return (
    <div
      style={{
        position: "absolute",
        top: L.portrait ? "16%" : "13%",
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: montserrat,
        fontWeight: 900,
        fontSize: (L.portrait ? 260 : 300) * L.k,
        lineHeight: 1,
        letterSpacing: -8,
        color: colors.white,
        opacity: p * 0.07,
        transform: `translateY(${drift}px)`,
      }}
    >
      1968
    </div>
  );
};

/** Line 01 — the rummage sale, typed on. */
const Sale: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const { dur } = at("01");
  const p = interpolate(frame, [6, dur - 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = useWindow(0, dur + sec(0.3), 10);
  return (
    <div style={{ padding: `0 ${L.margin}px`, opacity: out, maxWidth: L.portrait ? "100%" : "76%" }}>
      <div
        style={{
          fontFamily: montserrat,
          fontWeight: 700,
          fontSize: 26 * L.k,
          letterSpacing: 4,
          color: colors.tiffany,
          textTransform: "uppercase",
          marginBottom: 22,
        }}
      >
        Seattle · 1968
      </div>
      <Typed text="A group of mothers held a rummage sale." p={p} size={62 * L.k} />
    </div>
  );
};

/** Line 02 — the sum, and what it is worth now. */
const Sum: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const { dur } = at("02");
  const a = interpolate(frame, [4, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b = interpolate(frame, [sec(2.2), sec(3.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = useWindow(0, dur + sec(0.3), 10);
  const big = (L.portrait ? 108 : 132) * L.k;
  return (
    <div style={{ padding: `0 ${L.margin}px`, opacity: out, textAlign: L.portrait ? "left" : "center" }}>
      <Display size={big} p={a}>
        {SUM_1968.usd}
      </Display>
      <div
        style={{
          fontFamily: nunito,
          fontWeight: 600,
          fontSize: 30 * L.k,
          color: colors.textMuted,
          marginTop: 10,
          opacity: a,
        }}
      >
        raised at one jumble sale
      </div>
      {/* the naira equivalent arrives second, as the penny-drop */}
      <div style={{ opacity: b, transform: `translateY(${(1 - b) * 18}px)`, marginTop: 40 }}>
        <div
          style={{
            display: "inline-block",
            padding: "16px 30px",
            borderRadius: 16,
            border: `2px solid ${colors.tiffany}`,
            background: `${colors.cyan}22`,
          }}
        >
          <span style={{ fontFamily: montserrat, fontWeight: 800, fontSize: 62 * L.k, color: colors.white }}>
            ≈ <Naira />
            {SUM_1968.naira}
          </span>
          <span style={{ fontFamily: nunito, fontWeight: 600, fontSize: 28 * L.k, color: colors.textDim, marginLeft: 16 }}>
            today
          </span>
        </div>
      </div>
    </div>
  );
};

/** Line 03 — what they bought. A teletype printing one line at a time. */
const Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const { dur } = at("03");
  const out = useWindow(0, dur + sec(0.3), 10);
  // Only what the sources agree on. They differ on whether the machine was a
  // Teletype Model 30 or a Model 33 ASR, so no model number goes on screen.
  const ROWS = [
    "> TELETYPE TERMINAL",
    "> LEASED: GE COMPUTER TIME",
    "> LAKESIDE SCHOOL, SEATTLE",
    "> PAID FOR BY: THE MOTHERS' CLUB",
    "> TERMINALS: ONE, FOR EVERYONE",
  ];
  return (
    <div style={{ padding: `0 ${L.margin}px`, opacity: out }}>
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 40 * L.k,
          lineHeight: 1.75,
          color: colors.green,
        }}
      >
        {ROWS.map((r, i) => {
          const start = sec(0.45) + i * sec(0.72);
          const p = interpolate(frame, [start, start + 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // each row snaps in like a print head striking, then settles
          return (
            <div key={r} style={{ opacity: p, transform: `translateX(${(1 - p) * -18}px)` }}>
              {r}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Lines 04 + 05 — the boy, then the name. The hold before it is the point. */
const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const nameAt = sec(VO["05"].start - VO["04"].start);
  const a = useWindow(4, nameAt + sec(0.1), 10);
  const b = interpolate(frame, [nameAt, nameAt + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outAll = useWindow(0, sec(VO["05"].end - VO["04"].start) + sec(0.5), 12);
  return (
    <div style={{ padding: `0 ${L.margin}px`, opacity: outAll, textAlign: L.portrait ? "left" : "center" }}>
      <div style={{ opacity: a }}>
        <Display size={(L.portrait ? 62 : 74) * L.k} align={L.portrait ? "left" : "center"}>
          One of the boys who used it
          <br />
          was thirteen.
        </Display>
      </div>
      <div style={{ opacity: b, transform: `translateY(${(1 - b) * 26}px)`, marginTop: 44 }}>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: (L.portrait ? 96 : 118) * L.k,
            color: colors.tiffany,
            letterSpacing: -3,
          }}
        >
          BILL GATES
        </div>
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 600,
            fontSize: 30 * L.k,
            letterSpacing: 5,
            color: colors.textMuted,
            marginTop: 12,
          }}
        >
          AGE 13 · 1968
        </div>
      </div>
    </div>
  );
};

/** Lines 06 + 08 — the thesis, and the fact that line 07 used to carry. */
const Thesis: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const gapAt = sec(VO["08"].start - VO["06"].start);
  const a = useWindow(4, gapAt + sec(0.2), 10);
  const b = interpolate(frame, [gapAt, gapAt + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // The "thousands of hours" fact moved here from cut narration line 07.
  const c = interpolate(frame, [gapAt + sec(1.5), gapAt + sec(2.1)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outAll = useWindow(0, sec(VO["08"].end - VO["06"].start) + sec(0.5), 12);
  return (
    <div style={{ padding: `0 ${L.margin}px`, opacity: outAll, textAlign: L.portrait ? "left" : "center" }}>
      <div style={{ opacity: a }}>
        <Display size={(L.portrait ? 60 : 70) * L.k} align={L.portrait ? "left" : "center"} color={colors.textDim}>
          He wasn't a genius yet.
          <br />
          He was just early.
        </Display>
      </div>
      <div style={{ opacity: b, transform: `scale(${0.97 + 0.03 * b})`, marginTop: 46 }}>
        <Display size={(L.portrait ? 78 : 104) * L.k} align={L.portrait ? "left" : "center"}>
          The gap was never
          <br />
          <span style={{ color: colors.tiffany }}>talent.</span>
        </Display>
      </div>
      <div
        style={{
          opacity: c * 0.9,
          marginTop: 34,
          fontFamily: nunito,
          fontWeight: 600,
          fontSize: 32 * L.k,
          color: colors.textMuted,
        }}
      >
        Thousands of hours, years before anyone else
      </div>
    </div>
  );
};

export const Act1968: React.FC = () => {
  const L = useLayout();
  const seq = (id: keyof typeof VO, C: React.FC, pad = 0.6) => {
    const { from, dur } = at(id);
    return (
      <Sequence from={from} durationInFrames={dur + sec(pad)}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <C />
        </AbsoluteFill>
      </Sequence>
    );
  };
  return (
    <Ground>
      <YearPlate />
      {seq("01", Sale)}
      {seq("02", Sum)}
      {seq("03", Terminal)}
      {/* 04 and 05 render together so the hold between them is inside one shot */}
      <Sequence from={sec(VO["04"].start)} durationInFrames={sec(VO["05"].end - VO["04"].start) + sec(0.6)}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Reveal />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={sec(VO["06"].start)} durationInFrames={sec(VO["08"].end - VO["06"].start) + sec(0.6)}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Thesis />
        </AbsoluteFill>
      </Sequence>
    </Ground>
  );
};
