"use client";

import { useStore } from "@/components/commerce/store-provider";

/** Header cart trigger. Shows a count badge and opens the drawer. */
export function CartButton() {
  const { cart, openCart } = useStore();
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-lime transition-colors hover:bg-lime/10"
      aria-label={count ? `Open cart, ${count} item${count === 1 ? "" : "s"}` : "Open cart"}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M4 7h16l-1.2 10.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 7V5.5a3 3 0 0 1 6 0V7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1 font-cond text-[11px] font-bold text-ink">
          {count}
        </span>
      ) : null}
    </button>
  );
}
