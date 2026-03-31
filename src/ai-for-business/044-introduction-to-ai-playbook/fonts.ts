import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

const { fontFamily: displayFont } = loadNunito("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

const { fontFamily: bodyFont } = loadDMSans("normal", {
  weights: ["300", "400", "500"],
  subsets: ["latin"],
});

export { displayFont, bodyFont };
