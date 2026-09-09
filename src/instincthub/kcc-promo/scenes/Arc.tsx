// Act 2 — the generated arc: age 10 -> 13 -> 16 -> the whiteboard.
//
// Every clip here is AI-generated. It is labelled once as a dramatisation, the
// narration frames it as a projection ("none of that has happened yet"), and
// the platform AI-content flags are ticked at upload. See PROMO-SCRIPT §2 —
// all three ship together.
//
// Note on hooks: anything reading useCurrentFrame must live INSIDE its
// <Sequence>, otherwise it reads the parent timeline and the animation never
// fires. Hence the small components below rather than inline hook calls.
import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { colors, sec, SHOTS, VO, DRAMATISATION, TURN } from "../theme";
import { DramatisationLabel, Scrim, useWindow, YearTag } from "../bits";

const F = (s: number) => sec(s);
const span = (k: keyof typeof SHOTS) => ({
  from: F(SHOTS[k].from),
  dur: F(SHOTS[k].to - SHOTS[k].from),
});

/** One generated clip, full-frame, with a short cross-fade at each end. */
const Clip: React.FC<{
  src: string;
  durF: number;
  /** Trim into the source, to start past a slow first second. */
  startFrom?: number;
  children?: React.ReactNode;
}> = ({ src, durF, startFrom = 0, children }) => {
  const fade = useWindow(0, durF, 9);
  return (
    <AbsoluteFill style={{ opacity: fade, backgroundColor: colors.inkDeep }}>
      <OffthreadVideo
        src={staticFile(src)}
        startFrom={startFrom}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Scrim opacity={0.5} />
      {children}
    </AbsoluteFill>
  );
};

/** A clip carrying one of the arc's year markers. */
const TaggedClip: React.FC<{ src: string; durF: number; label: string; startFrom?: number }> = ({
  src,
  durF,
  label,
  startFrom = 0,
}) => {
  const p = useWindow(10, durF, 9);
  return (
    <Clip src={src} durF={durF} startFrom={startFrom}>
      <YearTag label={label} p={p} />
    </Clip>
  );
};

/** The adult shot carries "13 YEARS", then line 14, then fades to black. */
const AdultAndFade: React.FC<{ durF: number }> = ({ durF }) => {
  const frame = useCurrentFrame();
  // Black arrives exactly as the music dies, so picture and bed go out
  // together rather than one trailing the other.
  const fadeStart = F(TURN.fade_from - SHOTS.adult.from);
  const fadeEnd = F(TURN.silent_from - SHOTS.adult.from);
  const black = interpolate(frame, [fadeStart, fadeEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // The tag clears before line 14 lands; the last words play over bare picture.
  const tag = useWindow(10, F(VO["13"].end - SHOTS.adult.from) + 12, 10);
  return (
    <AbsoluteFill>
      <Clip src="kcc-promo/gen-adult.mp4" durF={durF}>
        <YearTag label="13 YEARS" p={tag} />
      </Clip>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: black }} />
    </AbsoluteFill>
  );
};

const Label: React.FC<{ durF: number }> = ({ durF }) => (
  <AbsoluteFill>
    <DramatisationLabel p={useWindow(0, durF, 10)} />
  </AbsoluteFill>
);

export const Arc: React.FC = () => {
  const a10a = span("age10a");
  const a10b = span("age10b");
  const a13 = span("age13");
  const a16 = span("age16");
  const adult = span("adult");
  const labelDur = F(DRAMATISATION.to - DRAMATISATION.from);

  return (
    <AbsoluteFill>
      {/* Age 10, two angles of one night: the 8 s clip cannot cover a 12.6 s
          beat, so the Hailuo take of the same character carries the back half. */}
      <Sequence from={a10a.from} durationInFrames={a10a.dur}>
        <Clip src="kcc-promo/gen-age10a.mp4" durF={a10a.dur} />
      </Sequence>
      <Sequence from={a10b.from} durationInFrames={a10b.dur}>
        <Clip src="kcc-promo/gen-age10b.mp4" durF={a10b.dur} startFrom={8} />
      </Sequence>

      <Sequence from={a13.from} durationInFrames={a13.dur}>
        <TaggedClip src="kcc-promo/gen-age13.mp4" durF={a13.dur} label="3 YEARS" startFrom={24} />
      </Sequence>
      <Sequence from={a16.from} durationInFrames={a16.dur}>
        <TaggedClip src="kcc-promo/gen-age16.mp4" durF={a16.dur} label="6 YEARS" startFrom={20} />
      </Sequence>
      <Sequence from={adult.from} durationInFrames={adult.dur}>
        <AdultAndFade durF={adult.dur} />
      </Sequence>

      {/* Disclosure label: once, briefly, as the arc opens. */}
      <Sequence from={F(DRAMATISATION.from)} durationInFrames={labelDur}>
        <Label durF={labelDur} />
      </Sequence>
    </AbsoluteFill>
  );
};
