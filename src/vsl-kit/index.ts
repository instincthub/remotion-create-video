import React from "react";
import { Horizontal } from "./Horizontal";
import { Vertical } from "./Vertical";
import { VslConfig } from "./types";
import { fr } from "./util";

export * from "./types";

/**
 * One config, two compositions. Register both in Root.tsx:
 *   const X = makeVsl(config);
 *   <Composition id="<slug>-vsl" component={X.Horizontal} durationInFrames={X.frames} fps={30} width={1920} height={1080} />
 *   <Composition id="<slug>-vsl-vertical" component={X.Vertical} durationInFrames={X.frames} fps={30} width={1080} height={1920} />
 */
export const makeVsl = (c: VslConfig) => ({
  Horizontal: () => React.createElement(Horizontal, { c }),
  Vertical: () => React.createElement(Vertical, { c }),
  frames: fr(c.endCard.end),
});
