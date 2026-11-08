/**
 * Artist identity — every string here is taken from the 2026 portfolio PDF.
 * Do not add biography or claims that are not in the source material.
 */
export const artist = {
  /** Display name as shown on the portfolio cover. */
  name: "Quartey Bigland",
  /** Full name as it appears in the portfolio footer. */
  fullName: "Quartey Bigland Nii Ayi",
  /** How the artist introduces himself in the portfolio. */
  selfIntroductionName: "Bigland Quartey",
  roles: ["Mural artist", "Graffiti writer"],
  /** Verbatim bio from the "Meet the artist" page, split into two paragraphs. */
  bio: [
    "I go by the name Bigland Quartey. I am a mural artist and a graffiti writer. Moulded by my journey through Kwame Nkrumah University of Science and Technology.",
    "My work merges urban culture with African heritage, aiming to transform spaces and spark meaningful conversations through bold, expressive art.",
  ],
  /** Short line lifted from the bio for hero and SEO use. */
  tagline: "Merging urban culture with African heritage.",
  education: "Kwame Nkrumah University of Science and Technology",
  contact: {
    email: "qbigland4000@gmail.com",
    phone: "+233 50 140 3778",
    phoneHref: "tel:+233501403778",
    instagram: "biglanddontero_",
    instagramUrl: "https://www.instagram.com/biglanddontero_/",
  },
  portfolioYear: 2026,
  /** Disciplines shown in the portfolio, in its own section order. */
  disciplines: ["Murals", "Digital illustrations", "Graphic design"],
} as const;
