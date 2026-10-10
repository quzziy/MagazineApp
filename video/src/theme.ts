import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Farben und Schriften aus dem Shopify-Theme (config/settings_data.json, layout/theme.liquid)
export const colors = {
  ink: "#0d0d0e",
  paper: "#f7f4ef",
  surface: "#f0ece6",
  red: "#cc1a1a",
};

// Variable Fonts (Google Fonts, OFL) lokal in public/fonts, damit das Rendern offline funktioniert
loadFont({ family: "Bodoni Moda", url: staticFile("fonts/BodoniModa.woff2"), weight: "400 900", style: "normal" });
loadFont({ family: "Bodoni Moda", url: staticFile("fonts/BodoniModa-Italic.woff2"), weight: "400 900", style: "italic" });
loadFont({ family: "Jost", url: staticFile("fonts/Jost.woff2"), weight: "100 900", style: "normal" });

export const fonts = {
  serif: "'Bodoni Moda', Georgia, serif",
  sans: "Jost, Helvetica, sans-serif",
};
