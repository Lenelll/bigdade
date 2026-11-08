"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import { useStore } from "./store-provider";

/** Variant selection, quantity and add-to-cart for a product page. */
export function ProductPurchase({ product }: { product: Product }) {
  const { addItem, isPending, status } = useStore();
  const hasOptions = product.options.length > 0;

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const first = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
    return Object.fromEntries((first?.selectedOptions ?? []).map((o) => [o.name, o.value]));
  });
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const variant: ProductVariant | undefined = useMemo(
    () =>
      product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ??
      (hasOptions ? undefined : product.variants[0]),
    [product.variants, selected, hasOptions],
  );

  const isAvailable = (name: string, value: string) =>
    product.variants.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.every((o) => (o.name === name ? o.value === value : selected[o.name] === o.value)),
    );

  const canBuy = Boolean(variant?.availableForSale) && status !== "unconfigured";
  const maxQty = variant?.quantityAvailable && variant.quantityAvailable > 0 ? Math.min(variant.quantityAvailable, 50) : 50;

  async function onAdd() {
    if (!variant) return;
    setMessage(null);
    const ok = await addItem(variant.id, quantity);
    setMessage(ok ? `${product.title} added to your cart.` : "Could not add to cart. Please try again.");
  }

  return (
    <div className="space-y-8">
      <div className="display text-3xl">
        {variant ? <Price price={variant.price} compareAt={variant.compareAtPrice} /> : null}
      </div>

      {product.options.map((option) => (
        <fieldset key={option.name}>
          <legend className="eyebrow mb-3 text-fg-muted">{option.name}</legend>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const active = selected[option.name] === value;
              const available = isAvailable(option.name, value);
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected((s) => ({ ...s, [option.name]: value }))}
                  className={cn(
                    "btn btn-outline min-h-10 px-4 text-xs",
                    active && "bg-accent text-accent-fg border-accent",
                    !available && "line-through opacity-50",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center rounded-full border border-rule">
          <span className="sr-only">Quantity</span>
          <button type="button" className="h-11 w-11" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span className="min-w-8 text-center tabular-nums" aria-live="polite">{quantity}</span>
          <button type="button" className="h-11 w-11" aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}>
            +
          </button>
        </label>
        <button type="button" className="btn btn-solid flex-1 sm:flex-none sm:min-w-56" disabled={!canBuy || isPending} onClick={onAdd}>
          {status === "unconfigured" ? "Shop opening soon" : variant?.availableForSale ? "Add to cart" : "Sold out"}
        </button>
      </div>

      {variant?.quantityAvailable != null && variant.quantityAvailable > 0 && variant.quantityAvailable <= 5 ? (
        <p className="text-sm text-fg-muted">Only {variant.quantityAvailable} left.</p>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-fg-muted">
        {message}
      </p>
    </div>
  );
}
