"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? null;

  if (!current) {
    return (
      <div className="polaroid">
        <div className="display flex aspect-[4/5] items-center justify-center bg-paper-deep p-8 text-center text-4xl text-ink/40">
          {title}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="polaroid" style={{ ["--tilt" as string]: "-1deg" }}>
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
          <Image
            key={current.url}
            src={current.url}
            alt={current.alt || title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover"
          />
        </div>
      </div>
      {images.length > 1 ? (
        <ul className="flex gap-3 overflow-x-auto pb-1" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={`Show image ${i + 1}`}
                className={cn(
                  "relative block h-20 w-16 overflow-hidden border-2 bg-paper-deep",
                  i === index ? "border-accent" : "border-transparent",
                )}
              >
                <Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
