import localFont from "next/font/local";

/**
 * Warxer — the artist's display face, used for identity, section titles and
 * expressive typography only. One weight exists.
 */
export const warxer = localFont({
  src: "../fonts/Warxer.otf",
  variable: "--font-warxer",
  display: "swap",
  weight: "400",
  style: "normal",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
  adjustFontFallback: false,
});

/**
 * Myriad Pro — supporting text: body, navigation, product data, UI.
 */
export const myriad = localFont({
  src: [
    { path: "../fonts/MyriadPro-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/MyriadPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/MyriadPro-Semibold.otf", weight: "600", style: "normal" },
    { path: "../fonts/MyriadPro-SemiboldIt.otf", weight: "600", style: "italic" },
    { path: "../fonts/MyriadPro-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/MyriadPro-BoldIt.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-myriad",
  display: "swap",
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

/** Myriad Pro Bold Condensed — labels, eyebrows and compact UI text. */
export const myriadCondensed = localFont({
  src: "../fonts/MyriadPro-BoldCond.otf",
  variable: "--font-myriad-cond",
  display: "swap",
  weight: "700",
  style: "normal",
  fallback: ["Arial Narrow", "sans-serif"],
  adjustFontFallback: false,
});
