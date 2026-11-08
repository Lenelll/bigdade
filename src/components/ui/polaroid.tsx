import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { artwork } from "@/content/artwork";
import { cn } from "@/lib/utils";
import { Zoomable } from "./lightbox";

type PolaroidProps = {
  /** Artwork manifest key. */
  image: string;
  alt: string;
  /** Degrees of tilt, as in the portfolio's pinned photos. */
  tilt?: number;
  /** Aspect ratio to crop to; defaults to the image's own ratio. */
  ratio?: "natural" | "landscape" | "portrait" | "square";
  sizes?: string;
  priority?: boolean;
  caption?: ReactNode;
  /** Lightbox group; when set, clicking opens the full image. */
  zoomGroup?: string;
  className?: string;
};

const ratioClass: Record<NonNullable<PolaroidProps["ratio"]>, string> = {
  natural: "",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

/**
 * A photo pinned to the page the way the portfolio presents work: white
 * border, soft shadow, slight tilt that straightens on hover.
 */
export function Polaroid({
  image,
  alt,
  tilt = 0,
  ratio = "natural",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  caption,
  zoomGroup,
  className,
}: PolaroidProps) {
  const img = artwork(image);
  const style = { "--tilt": `${tilt}deg` } as CSSProperties;
  const cropped = ratio !== "natural";

  const picture = (
    <div className={cn("relative overflow-hidden bg-paper-deep", ratioClass[ratio])}>
      {cropped ? (
        <Image
          src={img.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className="object-cover"
        />
      ) : (
        <Image
          src={img.src}
          alt={alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className="h-auto w-full"
        />
      )}
    </div>
  );

  return (
    <figure className={cn("polaroid", className)} style={style}>
      {zoomGroup ? (
        <Zoomable
          group={zoomGroup}
          image={{
            src: img.src,
            alt,
            width: img.width,
            height: img.height,
            caption: typeof caption === "string" ? caption : undefined,
          }}
        >
          {picture}
        </Zoomable>
      ) : (
        picture
      )}
      {caption ? (
        <figcaption className="pt-2 font-sans text-xs text-ink/70">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
