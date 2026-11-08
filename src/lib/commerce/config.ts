/**
 * Shop categories. Murals are not sold here: they are commissioned, so they
 * stay a contact enquiry on the murals page.
 *
 * Phase 4 (Express + MongoDB) will read collections from the API; until then
 * this list is the single source of truth for the UI.
 */

export type ShopCollectionHandle = "prints" | "merchandise" | "canvas-works";

export type ShopCollectionConfig = {
  readonly handle: ShopCollectionHandle;
  readonly title: string;
  readonly description: string;
};

export const SHOP_COLLECTIONS: readonly ShopCollectionConfig[] = [
  { handle: "prints", title: "Prints", description: "" },
  { handle: "merchandise", title: "Merchandise", description: "" },
  { handle: "canvas-works", title: "Canvas works", description: "" },
];

export function isShopCollectionHandle(value: string): value is ShopCollectionHandle {
  return SHOP_COLLECTIONS.some((collection) => collection.handle === value);
}

/** Flip to true in Phase 4 once the backend is live. */
export const SHOP_LIVE = false;
