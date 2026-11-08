"use client";

/**
 * Client-side cart state backed by `/api/cart`. The server owns the cart; the
 * provider only mirrors the latest payload it received, so there is no
 * client-side price math and no localStorage fallback.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Cart, CartApiAction, CartApiPayload } from "@/lib/commerce/types";

export type StoreStatus =
  | "idle"
  | "loading"
  | "ready"
  | "unconfigured"
  | "error";

export type StoreContextValue = {
  cart: Cart | null;
  /**
   * `loading` until the first `/api/cart` response, then `ready`,
   * `unconfigured` (shop not connected) or `error` (no usable cart).
   */
  status: StoreStatus;
  /** Message from the most recent failed request, cleared on the next success. */
  error: string | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** Resolves true on success and opens the drawer. */
  addItem: (variantId: string, quantity?: number) => Promise<boolean>;
  /** A quantity of 0 or less removes the line. */
  updateLine: (lineId: string, quantity: number) => Promise<boolean>;
  removeLine: (lineId: string) => Promise<boolean>;
  refresh: () => Promise<void>;
  /** Line ids with an in-flight update/remove, for per-row spinners. */
  pendingLineIds: Set<string>;
  /** True while any cart mutation or refresh is in flight. */
  isPending: boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const GENERIC_ERROR = "Your cart could not be updated. Please try again.";

type CartRequestResult = {
  ok: boolean;
  httpStatus: number;
  payload: CartApiPayload;
};

function isCartApiPayload(value: unknown): value is CartApiPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<CartApiPayload>;

  return (
    (candidate.status === "ready" ||
      candidate.status === "unconfigured" ||
      candidate.status === "error") &&
    "cart" in candidate
  );
}

async function requestCart(action?: CartApiAction): Promise<CartRequestResult> {
  const networkFailure: CartRequestResult = {
    ok: false,
    httpStatus: 0,
    payload: { status: "error", cart: null, error: GENERIC_ERROR },
  };
  let response: Response;

  try {
    response = await fetch("/api/cart", {
      method: action ? "POST" : "GET",
      headers: action ? { "Content-Type": "application/json" } : undefined,
      body: action ? JSON.stringify(action) : undefined,
      cache: "no-store",
      credentials: "same-origin",
    });
  } catch {
    return networkFailure;
  }

  const body: unknown = await response.json().catch(() => null);

  if (!isCartApiPayload(body)) {
    return { ...networkFailure, httpStatus: response.status };
  }

  return {
    ok: response.ok && body.status === "ready",
    httpStatus: response.status,
    payload: body,
  };
}

type CartState = {
  cart: Cart | null;
  status: StoreStatus;
  error: string | null;
};

/** Derives the next client state from a server response. */
function reduceCartState(
  previous: CartState,
  { payload, httpStatus }: CartRequestResult,
): CartState {
  if (payload.status === "unconfigured") {
    return {
      cart: null,
      status: "unconfigured",
      error: payload.error ?? null,
    };
  }

  if (payload.status === "error") {
    // A 409 carries the server's authoritative view of the cart (the current
    // cart, or null when it expired). Other failures keep the last known cart
    // so a transient upstream error does not blank the drawer.
    const cart =
      httpStatus === 409 ? payload.cart : (payload.cart ?? previous.cart);

    return {
      cart,
      status: cart ? "ready" : "error",
      error: payload.error ?? GENERIC_ERROR,
    };
  }

  return { cart: payload.cart, status: "ready", error: null };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  // The mount effect fetches immediately, so the first paint is "loading".
  const [{ cart, status, error }, setCartState] = useState<CartState>({
    cart: null,
    status: "loading",
    error: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLineIds, setPendingLineIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [inFlight, setInFlight] = useState(0);

  // Responses can resolve out of order; only the newest one may update state.
  const sequenceRef = useRef(0);
  const appliedRef = useRef(0);
  const unconfiguredRef = useRef(false);

  const applyPayload = useCallback(
    (sequence: number, result: CartRequestResult) => {
      if (sequence < appliedRef.current) {
        return;
      }

      appliedRef.current = sequence;

      if (result.payload.status === "unconfigured") {
        unconfiguredRef.current = true;
      }

      setCartState((previous) => reduceCartState(previous, result));
    },
    [],
  );

  // Initial hydration from the HttpOnly cookie cart.
  useEffect(() => {
    let active = true;
    const sequence = ++sequenceRef.current;

    void requestCart().then((result) => {
      if (active) {
        applyPayload(sequence, result);
      }
    });

    return () => {
      active = false;
    };
  }, [applyPayload]);

  const run = useCallback(
    async (
      action: CartApiAction | undefined,
      lineId?: string,
    ): Promise<boolean> => {
      if (unconfiguredRef.current) {
        return false;
      }

      const sequence = ++sequenceRef.current;
      setInFlight((count) => count + 1);

      if (lineId) {
        setPendingLineIds((current) => new Set(current).add(lineId));
      }

      try {
        const result = await requestCart(action);
        applyPayload(sequence, result);
        return result.ok;
      } finally {
        setInFlight((count) => Math.max(0, count - 1));

        if (lineId) {
          setPendingLineIds((current) => {
            if (!current.has(lineId)) {
              return current;
            }

            const next = new Set(current);
            next.delete(lineId);
            return next;
          });
        }
      }
    },
    [applyPayload],
  );

  const refresh = useCallback(async () => {
    await run(undefined);
  }, [run]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      const added = await run({
        action: "add",
        variantId,
        quantity: Math.max(1, Math.trunc(quantity)),
      });

      if (added) {
        setIsOpen(true);
      }

      return added;
    },
    [run],
  );

  const updateLine = useCallback(
    (lineId: string, quantity: number) => {
      const normalized = Math.trunc(quantity);

      return normalized <= 0
        ? run({ action: "remove", lineId }, lineId)
        : run({ action: "update", lineId, quantity: normalized }, lineId);
    },
    [run],
  );

  const removeLine = useCallback(
    (lineId: string) => run({ action: "remove", lineId }, lineId),
    [run],
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      status,
      error,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateLine,
      removeLine,
      refresh,
      pendingLineIds,
      isPending: inFlight > 0,
    }),
    [
      addItem,
      cart,
      closeCart,
      error,
      inFlight,
      isOpen,
      openCart,
      pendingLineIds,
      refresh,
      removeLine,
      status,
      updateLine,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside <StoreProvider>.");
  }

  return context;
}
