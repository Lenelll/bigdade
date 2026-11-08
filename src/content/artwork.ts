import manifest from "./artwork-manifest.json";

export type ArtworkImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const images = manifest as Record<string, ArtworkImage>;

/** Look up an extracted artwork image by its manifest key. */
export function artwork(key: string): ArtworkImage {
  const entry = images[key];
  if (!entry) {
    throw new Error(
      `Unknown artwork key "${key}" — regenerate src/content/artwork-manifest.json`,
    );
  }
  return entry;
}

export function hasArtwork(key: string): boolean {
  return key in images;
}
