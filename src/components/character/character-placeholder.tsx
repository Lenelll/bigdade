import Image from "next/image";
import { artwork } from "@/content/artwork";
import { character } from "@/content/character";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "hero" | "inline";
  loading?: boolean;
  className?: string;
};

/**
 * Static stand-in for the 3D character: the artist's own illustration,
 * pinned like a portfolio page. Used until the model ships and as the
 * reduced-motion / no-WebGL fallback afterwards.
 */
export function CharacterPlaceholder({ variant = "hero", loading = false, className }: Props) {
  const img = artwork(character.heroImage);
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        variant === "hero" ? "max-w-xl" : "max-w-sm",
        className,
      )}
      aria-busy={loading || undefined}
    >
      <div
        className="polaroid"
        style={{ ["--tilt" as string]: variant === "hero" ? "-3deg" : "2deg" }}
      >
        <Image
          src={img.src}
          alt={`${character.name} — illustration “Gona Boy” by Quartey Bigland`}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 40vw, 90vw"
          priority={variant === "hero"}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
