/**
 * Digital illustrations from the portfolio. Titles transcribed from the PDF;
 * the PDF has no descriptions, so none are included.
 */
export type Illustration = {
  slug: string;
  title: string;
  /** Portfolio sub-section the piece sits under. */
  series: "digital" | "dade-tse" | "kfc-art-competition";
  note: string | null;
  images: string[];
  featuresDadeTse: boolean;
};

export const illustrations: Illustration[] = [
  { slug: "peace-of-mind", title: "Peace of Mind", series: "digital", note: "Cover art", images: ["peace-of-mind-1", "peace-of-mind-2"], featuresDadeTse: false },
  { slug: "gona-boy", title: "Gona Boy", series: "dade-tse", note: null, images: ["gona-boy"], featuresDadeTse: true },
  { slug: "ghana-boy", title: "Ghana Boy", series: "dade-tse", note: null, images: ["ghana-boy"], featuresDadeTse: true },
  { slug: "gringo", title: "Gringo", series: "dade-tse", note: null, images: ["gringo"], featuresDadeTse: true },
  { slug: "love-brews", title: "Love Brews", series: "dade-tse", note: null, images: ["love-brews"], featuresDadeTse: true },
  { slug: "gyakie", title: "Gyakie", series: "dade-tse", note: null, images: ["gyakie"], featuresDadeTse: true },
  { slug: "pop-star", title: "Pop Star", series: "dade-tse", note: null, images: ["pop-star"], featuresDadeTse: false },
  { slug: "kofi-for-chop", title: "Kofi for Chop", series: "kfc-art-competition", note: "KFC Art Competition", images: ["kofi-for-chop"], featuresDadeTse: false },
  { slug: "khadija-for-chop", title: "Khadija for Chop", series: "kfc-art-competition", note: "KFC Art Competition", images: ["khadija-for-chop"], featuresDadeTse: false },
];
