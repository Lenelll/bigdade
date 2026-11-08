"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/utils";
import { useStore } from "./store-provider";

/** Line items shared by the drawer and the cart page. */
export function CartLines({ lines, compact = false }: { lines: CartLine[]; compact?: boolean }) {
  const { updateLine, removeLine, pendingLineIds } = useStore();

  return (
    <ul className="divide-y divide-rule">
      {lines.map((line) => {
        const pending = pendingLineIds.has(line.id);
        const m = line.merchandise;
        const options = m.selectedOptions
          .filter((o) => o.value !== "Default Title")
          .map((o) => o.value)
          .join(" · ");
        return (
          <li key={line.id} className="flex gap-4 py-5" aria-busy={pending || undefined}>
            <Link
              href={`/products/${m.product.handle}`}
              className="relative block h-24 w-20 shrink-0 overflow-hidden bg-paper-deep"
            >
              {m.image ? (
                <Image src={m.image.url} alt={m.image.alt || m.product.title} fill sizes="80px" className="object-cover" />
              ) : null}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/products/${m.product.handle}`} className="display block truncate text-lg">
                    {m.product.title}
                  </Link>
                  {options ? <p className="text-sm text-fg-muted">{options}</p> : null}
                </div>
                <p className="shrink-0 text-base">
                  {formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="inline-flex items-center rounded-full border border-rule">
                  <button
                    type="button"
                    className="h-9 w-9 disabled:opacity-40"
                    aria-label={`Decrease quantity of ${m.product.title}`}
                    disabled={pending || line.quantity <= 1}
                    onClick={() => updateLine(line.id, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className="h-9 w-9 disabled:opacity-40"
                    aria-label={`Increase quantity of ${m.product.title}`}
                    disabled={pending}
                    onClick={() => updateLine(line.id, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="eyebrow text-fg-muted underline-offset-4 hover:underline disabled:opacity-40"
                  disabled={pending}
                  onClick={() => removeLine(line.id)}
                >
                  {compact ? "Remove" : "Remove item"}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
