# Phase 4 — Own backend (Express + MongoDB + Paystack)

Decided 2026-11-08. Replaces the Shopify Storefront plan. Redis dropped (no caching layer).

## Architecture

```
Browser ── Next.js 16 (site + /api/cart proxy) ──X-Api-Key──> Express API ──> MongoDB Atlas
                                                                  ^
                                                   Paystack ──────┘ (webhook, public)
```

- `server/` inside this repo, own `package.json`, deployed separately (Render / Railway).
- Express 5 + TypeScript, Mongoose 8, zod (validation), pino (logs), helmet, cors.
- Next talks to Express server-side only. Browser never calls Express directly.
- Only public Express endpoint: `POST /webhooks/paystack`. Everything else requires `X-Api-Key`.
- Currency: GHS. Prices stored as integer pesewas.

## MongoDB collections

| Collection | Purpose | Notes |
| --- | --- | --- |
| `products` | Catalog | handle, title, description, type (print / merch / canvas), tags, collections[], images[], options[], variants[] (sku, price, compareAt, stock, options), status (draft / active) |
| `collections` | Shop categories | handle, title, description, image, sortOrder |
| `carts` | Server-owned guest carts | lines[], createdAt; TTL index 30 days; id stored in `bigdade_cart` cookie |
| `orders` | Checkout + payment state | reference, status (pending / paid / failed / fulfilled / cancelled), lines snapshot (title, price at purchase), totals, customer (name, email, phone), delivery address, paystack {accessCode, authorizationUrl, transactionId, channel, paidAt} |
| `webhook_events` | Idempotency | paystack event id, receivedAt; TTL 30 days |

## Express API

```
GET  /catalog/collections
GET  /catalog/collections/:handle/products?sort=&page=
GET  /catalog/products?tag=&sort=&page=
GET  /catalog/products/:handle

POST /carts                      create
GET  /carts/:id
POST /carts/:id/lines            add
PATCH /carts/:id/lines/:lineId   update qty
DELETE /carts/:id/lines/:lineId
DELETE /carts/:id                clear

POST /checkout                   cart id + customer + delivery -> order(pending) + Paystack init -> { authorizationUrl, reference }
GET  /orders/:reference          public-safe order summary (for the thank-you page)
POST /webhooks/paystack          verify x-paystack-signature (HMAC SHA512, secret key), charge.success -> order paid, decrement stock
```

Checkout rules:
- Totals computed server-side from `products` at checkout time; browser sends no prices.
- Redirect from Paystack never marks an order paid. Only the webhook (or a server-side `GET /transaction/verify/:reference` fallback) does, after signature check and amount match.
- Stock decremented once, on first `charge.success` for that reference.

## Next.js changes

- `src/lib/shopify/` -> `src/lib/commerce/`. Keep `types.ts` almost as is (drop Shopify-only fields such as `checkoutUrl`, `vendor`). Replace client/queries/mappers with a thin fetch client for Express.
- `src/app/api/cart/*` becomes a proxy to Express cart routes; cookie handling stays.
- New `/checkout` page: customer + delivery form -> `POST /api/checkout` -> redirect to Paystack.
- New `/orders/[reference]` thank-you page, polls order status until `paid` or shows "payment pending".
- Commerce UI components keep working; `Price` formats GHS.
- `.env.example`: drop `SHOPIFY_*`, add `COMMERCE_API_URL`, `COMMERCE_API_KEY`.

## Steps

| Step | Scope | Done when |
| --- | --- | --- |
| 4a | Express skeleton, Mongo models, catalog routes, seed script, Next commerce client; Shopify code removed | `/shop`, `/shop/[collection]`, `/products/[handle]` render seeded products |
| 4b | Cart routes in Express; Next `/api/cart` proxies | Add / update / remove works in the drawer and `/cart` |
| 4c | Checkout + Paystack test mode, webhook, order page | A test MoMo / card payment turns an order `paid` and reduces stock |
| 4d | Admin (required for launch): password-protected product + order management, image uploads (Cloudinary) | Artist can add a product without a deploy |

Each step ends with a report and sign-off before the next starts.

## Env

Express: `PORT`, `MONGODB_URI`, `API_KEY`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`, `SITE_URL` (for Paystack callback_url), `CORS_ORIGIN`.
Next: `COMMERCE_API_URL`, `COMMERCE_API_KEY`, `NEXT_PUBLIC_SITE_URL`.

## Decisions (2026-11-08)

- Delivery: Ghana only. Fee model (flat / pickup / per region) still to be set before 4c.
- Sold: prints, merchandise, canvas works. Murals stay a commission enquiry.
- The artist adds products himself, so 4d (admin) is required for launch, not optional.
- Email receipts ship in 4c (Resend or Nodemailer, decide at 4c).
- Paystack live keys arrive after the business is registered. Build and test in test mode.
- Until the backend exists the site shows a "coming soon" shop (`ShopComingSoon`), `/cart` redirects to `/shop`, and the cart provider / drawer / button are unmounted but kept in `src/components/commerce/`.

## Still open

1. Delivery fee model (needed for 4c totals).
2. Who owns the Paystack account.
