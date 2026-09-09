import React from "react";
import { Composition, Folder } from "remotion";
import { Promo, totalFrames } from "./Promo";
import { FPS, Layout, layoutSpec } from "./theme";

/** Deliverable cuts (PROMO-SCRIPT §6). The 60 s and 30 s cuts come later. */
const LAYOUTS: Layout[] = ["16x9", "9x16", "1x1"];

export const KccPromoCompositions: React.FC = () => (
  <Folder name="kcc-promo">
    {LAYOUTS.map((layout) => {
      const L = layoutSpec(layout);
      return (
        <Composition
          key={layout}
          id={`kcc-promo-90-${layout}`}
          component={Promo}
          durationInFrames={totalFrames()}
          fps={FPS}
          width={L.W}
          height={L.H}
          defaultProps={{ layout }}
        />
      );
    })}
  </Folder>
);
