// KCC-PROMO-01 "The Rummage Sale" — the 90 s master.
//
// The audio is laid first and never moves; every scene boundary in theme.ts is
// cut against the MEASURED narration cues in timeline.ts (studio contract 1).
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { colors, FPS, Layout, LayoutContext, layoutSpec, sec, SHOTS, TOTAL } from "./theme";
import { Act1968 } from "./scenes/Act1968";
import { Arc } from "./scenes/Arc";
import { Real } from "./scenes/Real";
import { EndCard } from "./scenes/EndCard";
import { Captions } from "./Captions";

export const totalFrames = () => sec(TOTAL);

export const Promo: React.FC<{ layout: Layout }> = ({ layout }) => {
  const L = layoutSpec(layout);
  const endFrom = sec(SHOTS.endCard.from);
  const endDur = totalFrames() - endFrom;

  return (
    <LayoutContext.Provider value={L}>
      {/* Opaque ground: a dropped frame must never render transparent. */}
      <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
        <Audio src={staticFile("kcc-promo/master.wav")} />

        <Sequence from={0} durationInFrames={sec(SHOTS.act1968.to)}>
          <Act1968 />
        </Sequence>

        <Arc />
        <Real />

        <Sequence from={endFrom} durationInFrames={endDur}>
          <EndCard durF={endDur} />
        </Sequence>

        {/* Burned only on the social cuts; 16:9 ships the .srt sidecar. */}
        {layout !== "16x9" && <Captions />}
      </AbsoluteFill>
    </LayoutContext.Provider>
  );
};
