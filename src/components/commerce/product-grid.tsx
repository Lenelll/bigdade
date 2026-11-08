import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./product-card";

const TILTS = [-1.5, 1.2, -0.8, 1.8];

export function ProductGrid({ products, priorityCount = 4 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, i) => (
        <li key={product.id}>
          <ProductCard product={product} tilt={TILTS[i % TILTS.length]} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul aria-hidden="true" className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="animate-pulse">
          <div className="polaroid">
            <div className="aspect-[4/5] bg-paper-deep" />
          </div>
          <div className="mt-4 h-5 w-2/3 rounded bg-rule" />
          <div className="mt-2 h-3 w-1/3 rounded bg-rule" />
        </li>
      ))}
    </ul>
  );
}

type EmptyProps = {
  /** True when the store is not yet connected rather than simply empty. */
  unconfigured: boolean;
  title?: string;
};

/** Honest empty state: the shop is either not connected yet or has no items here. */
export function ProductGridEmpty({ unconfigured, title }: EmptyProps) {
  return (
    <div className="hairline py-16 text-center">
      <p className="eyebrow mb-3 text-fg-muted">{unconfigured ? "Coming soon" : "Nothing here yet"}</p>
      <h3 className="display text-4xl sm:text-5xl">
        {unconfigured ? "The shop is being set up." : `No ${title ?? "products"} listed right now.`}
      </h3>
      <p className="mx-auto mt-4 max-w-md text-fg-muted">
        {unconfigured
          ? "Prints, merchandise and canvas works will appear here once the store is live."
          : "Check back soon, or explore the murals and the character in the meantime."}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/murals" className="btn btn-outline">
          See the murals
        </Link>
        <Link href="/dade-tse" className="btn btn-outline">
          Meet Dade Tse
        </Link>
      </div>
    </div>
  );
}
