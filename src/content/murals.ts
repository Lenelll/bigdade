/**
 * Mural projects, in portfolio order. Titles are transcribed from the PDF.
 * The portfolio gives titles and photographs only; location, client, year and
 * descriptions are NOT in the source and stay null until supplied.
 */
export type MuralProject = {
  slug: string;
  title: string;
  /** Keys into the artwork manifest, lead image first. */
  images: string[];
  location: string | null;
  year: number | null;
  description: string | null;
  /** True when the Dade Tse character appears in the work. */
  featuresDadeTse: boolean;
  /** Subset of `images` to show on the Dade Tse page; all of them when omitted. */
  dadeTseImages?: string[];
};

const project = (
  slug: string,
  title: string,
  imageCount: number,
  featuresDadeTse = false,
  dadeTseImages?: number[],
): MuralProject => ({
  slug,
  title,
  images: Array.from({ length: imageCount }, (_, i) => `${slug}-${i + 1}`),
  location: null,
  year: null,
  description: null,
  featuresDadeTse,
  ...(dadeTseImages ? { dadeTseImages: dadeTseImages.map((n) => `${slug}-${n}`) } : {}),
});

export const murals: MuralProject[] = [
  project("novo-apartments", "Novo Apartments", 4),
  project("sanctuary-mural", "Sanctuary Mural", 3),
  project("nationalism-park", "Nationalism Park", 1),
  project("adanko-studios", "Adanko Studios", 2),
  project("jiljil-academy", "Jiljil Academy", 4),
  project("grills-and-wines", "Grills and Wines", 4),
  project("tsadidi-festival", "Tsadidi Festival", 3, true, [2, 3]),
  project("leukaemia-project-foundation", "Leukaemia Project Foundation", 3),
  project("kabaka-tennis-court", "Kabaka Tennis Court", 3),
  project("deon-recreational-center", "Deon Recreational Center", 2),
  project("wash-n-ready", "Wash ‘N’ Ready", 3),
  project("wash-n-ready-2", "Wash ‘N’ Ready 2", 3),
  project("dadets3-001", "Dadets3 001", 3, true),
  project("nkosuo-nkwan", "Nkosuo Nkwan", 3),
  project("trendshub-studio", "Trendshub Studio", 3),
];

/** Curated subset for the home page, in display order. */
export const featuredMuralSlugs = [
  "nkosuo-nkwan",
  "wash-n-ready",
  "novo-apartments",
  "sanctuary-mural",
  "nationalism-park",
  "kabaka-tennis-court",
] as const;

export function getMural(slug: string): MuralProject | undefined {
  return murals.find((m) => m.slug === slug);
}

export function getFeaturedMurals(): MuralProject[] {
  return featuredMuralSlugs
    .map((slug) => getMural(slug))
    .filter((m): m is MuralProject => Boolean(m));
}
