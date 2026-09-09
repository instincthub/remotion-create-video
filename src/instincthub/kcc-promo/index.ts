import { registerRoot } from "remotion";
import React from "react";
import { KccPromoCompositions } from "./Root";
import "../../index.css";

// Standalone entry so renders bundle only this film:
//   npx remotion render src/instincthub/kcc-promo/index.ts kcc-promo-90-16x9 out/x.mp4
registerRoot(() => React.createElement(KccPromoCompositions));
