/**
 * Domain contract for the commerce layer. UI code depends on these shapes, not
 * on any one backend. Keep names and shapes stable.
 */

export type Money = { amount: number; currencyCode: string };

export type ProductImage = {
  id: string | null;
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export type ProductOption = { name: string; values: string[] };

export type SelectedOption = { name: string; value: string };

export type ProductVariant = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: ProductImage | null;
};

export type ProductCollectionRef = { handle: string; title: string };

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  /**
   * Options with the single placeholder value "Default Title" are removed, so
   * an empty array means "no variant choice needed".
   */
  options: ProductOption[];
  images: ProductImage[];
  featuredImage: ProductImage | null;
  variants: ProductVariant[];
  priceRange: { min: Money; max: Money };
  availableForSale: boolean;
  collections: ProductCollectionRef[];
  publishedAt: string | null;
  seo: { title: string | null; description: string | null };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: ProductImage | null;
  seo: { title: string | null; description: string | null };
};

export type CartLineMerchandise = {
  variantId: string;
  title: string;
  selectedOptions: SelectedOption[];
  price: Money;
  image: ProductImage | null;
  product: { id: string; handle: string; title: string };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandise;
  cost: { totalAmount: Money };
};

export type Cart = {
  id: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
};

export type PageInfo = { hasNextPage: boolean; endCursor: string | null };

/* -------------------------------------------------------------------------- */
/* Supporting types shared by the catalog, the cart API route and the client. */
/* -------------------------------------------------------------------------- */

/** Sort choices the catalog API accepts. */
export type ProductSort =
  | "featured"
  | "newest"
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

/** JSON payload returned by `/api/cart` (GET and POST). */
export type CartApiStatus = "ready" | "unconfigured" | "error";

export type CartApiPayload = {
  status: CartApiStatus;
  cart: Cart | null;
  error?: string;
};

/** Request body accepted by `POST /api/cart`. */
export type CartApiAction =
  | { action: "add"; variantId: string; quantity: number }
  | { action: "update"; lineId: string; quantity: number }
  | { action: "remove"; lineId: string }
  | { action: "clear" };
