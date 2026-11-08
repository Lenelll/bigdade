import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductPrice } from "./price";

type Props = {
  product: Product;
  /** Pin tilt in degrees, alternated by the grid. */
  tilt?: number;
  priority?: boolean;
};

/**
 * A product pinned like a portfolio photo. Logic is backend-agnostic beyond
 * the `Product` shape.
 */
export function ProductCard({ product, tilt = 0, priority = false }: Props) {
  const image = product.featuredImage ?? product.images[0] ?? null;
  const soldOut = !product.availableForSale;

  return (
    <article className="group">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="polaroid" style={{ ["--tilt" as string]: `${tilt}deg` }}>
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt || product.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                priority={priority}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="display flex h-full items-center justify-center p-6 text-center text-3xl text-ink/40">
                {product.title}
              </div>
            )}
            {soldOut ? (
              <span className="eyebrow absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-lime">
                Sold out
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="display text-xl leading-tight sm:text-2xl">{product.title}</h3>
          <ProductPrice min={product.priceRange.min} max={product.priceRange.max} className="shrink-0 text-base" />
        </div>
        {product.productType ? (
          <p className="eyebrow mt-1 text-fg-muted">{product.productType}</p>
        ) : null}
      </Link>
    </article>
  );
}
