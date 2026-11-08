import { illustrations } from "./illustrations";
import { murals } from "./murals";

/**
 * The created character. Name confirmed by the project owner; the portfolio
 * titles its illustration section "DADE TSE" and the artist spells it
 * "Dadetsɛ" in the story below, which is his own text, verbatim.
 */
export const character = {
  name: "Dade Tse",
  /** Visible trait confirmed by the project owner. */
  signature: "The recurring figure wearing a metal pot as a helmet.",
  /** Paragraphs of the character's story, in the artist's words. */
  story: [
    "“Dadetsɛ” is a figure that wears the “dadesen,” a locally made cauldron, as a headpiece, with two round ear hoops extending over the head. Transformed from its everyday function, the cauldron becomes an icon that expresses the invisible weight of the burdens one carries and a sense of cultural familiarity, while exploring the relationship between the self and the navigation of known and unknown external societal pressures.",
  ] as readonly string[] | null,
  /** Product tag that will link shop items to the character (Phase 4). */
  productTag: "dade-tse",
  /** Graffiti wordmark cut-out, shown on its yellow backdrop at the top of the page. */
  wordmark: "dade-wordmark",
  /** The finished illustration shown on its own below the wordmark. */
  mainImage: "dade-main",
  /** Illustration used by the home-page teaser / 3D placeholder. */
  heroImage: "gona-boy",
  /** Keys of images used in the character page gallery, in order. */
  galleryOrder: ["ghana-boy", "gringo", "love-brews", "gyakie", "dadets3-001-1", "dadets3-001-2"],
} as const;

export function getCharacterIllustrations() {
  return illustrations.filter((i) => i.featuresDadeTse);
}

export function getCharacterMurals() {
  return murals.filter((m) => m.featuresDadeTse);
}
