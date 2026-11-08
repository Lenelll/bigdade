"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatMoney } from "@/lib/utils";
import { CartLines } from "./cart-lines";
import { useStore } from "./store-provider";

/** Slide-over cart using the native <dialog> for focus trapping and Escape handling. */
export function CartDrawer() {
  const { cart, status, error, isOpen, closeCart, isPending } = useStore();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const lines = cart?.lines ?? [];
  const empty = lines.length === 0;

  return (
    <dialog
      ref={ref}
      data-theme="paper"
      onClose={closeCart}
      onClick={(e) => {
        if (e.target === ref.current) closeCart();
      }}
      aria-labelledby="cart-drawer-title"
      className="m-0 ml-auto h-full max-h-none w-full max-w-md bg-surface p-0 text-fg shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      <div className="flex items-center justify-between border-b border-rule px-6 py-5">
        <h2 id="cart-drawer-title" className="display text-3xl">
          Cart{cart?.totalQuantity ? ` (${cart.totalQuantity})` : ""}
        </h2>
        <button
          type="button"
          onClick={closeCart}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-rule"
          aria-label="Close cart"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6" aria-busy={isPending || undefined}>
        {status === "unconfigured" ? (
          <p className="py-10 text-center text-fg-muted">The shop is being set up. Check back soon.</p>
        ) : empty ? (
          <div className="py-16 text-center">
            <p className="display text-3xl">Your cart is empty.</p>
            <Link href="/shop" onClick={closeCart} className="btn btn-outline mt-6">
              Browse the shop
            </Link>
          </div>
        ) : (
          <CartLines lines={lines} compact />
        )}
        {error ? (
          <p role="alert" className="mb-4 rounded border border-signal/40 bg-signal/10 px-4 py-3 text-sm">
            {error}
          </p>
        ) : null}
      </div>

      {!empty && cart ? (
        <div className="border-t border-rule px-6 py-5">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-fg-muted">Subtotal</span>
            <span className="display text-2xl">
              {formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
            </span>
          </div>
          <p className="mt-1 text-xs text-fg-muted">Shipping and taxes are calculated at checkout.</p>
          <form action="/api/cart/checkout" method="post" className="mt-4 grid gap-2">
            <button type="submit" className="btn btn-solid w-full" disabled={isPending}>
              Checkout
            </button>
            <Link href="/cart" onClick={closeCart} className="btn btn-outline w-full">
              View cart
            </Link>
          </form>
        </div>
      ) : null}
    </dialog>
  );
}
