# Quartey Bigland — artist site & shop

Portfolio-first website for mural artist and graffiti writer Quartey Bigland, with a
shop (own backend, Phase 4) and a reserved slot for the future interactive 3D "Dade Tse" character.

Stack: Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, `motion`.
Phase 4 adds an Express + MongoDB API with Paystack checkout; see `docs/phase-4-backend-plan.md`.

## Run

```bash
npm install
cp .env.example .env.local   # Phase 4 API variables are commented out until the backend exists
npm run dev
```

The shop (`/shop`) and cart currently render a "coming soon" state. The product, collection
and cart UI components are kept in `src/components/commerce/` for Phase 4 but are not mounted.

## Where things live

| Path | What |
| --- | --- |
| `src/content/` | Artist, mural, illustration and character content transcribed from the 2026 portfolio PDF. **Only add text that the artist has supplied.** |
| `src/content/artwork-manifest.json` | Generated: size + blur placeholder for every image in `public/artwork/`. |
| `public/artwork/` | Artwork extracted from the portfolio PDF (murals, illustrations, portrait). |
| `public/pattern/` | Adinkra symbol strip (SVG, `currentColor`) and grain texture used by the section backgrounds. |
| `src/fonts/` + `src/lib/fonts.ts` | Warxer (display) and Myriad Pro (text/condensed) via `next/font/local`. |
| `src/app/globals.css` | Design tokens and the three section themes: `ink`, `lime`, `paper`. |
| `src/components/ui/` | `Section` (themed band), `Polaroid`, `ScribbleArrow`, `Reveal`. |
| `src/components/sections/` | Home-page sections and the mural spread. |
| `src/components/character/` | `Character3D` integration point, placeholder, and the Phase 5 scene stub. |
| `src/components/commerce/` | Cart provider/drawer, product card/grid/gallery/purchase UI. |
| `src/lib/commerce/` | Backend-neutral domain types (`Product`, `Cart`, …) and the shop category list. The API client arrives in Phase 4. |

## Routes

`/` · `/murals` · `/dade-tse` · `/shop` (coming soon) · `/cart` (redirects to `/shop`)

Phase 4 restores `/shop/[collection]`, `/products/[handle]`, `/cart`, and adds `/checkout` and `/orders/[reference]`.

Shop categories live in `src/lib/commerce/config.ts`: `prints`, `merchandise`, `canvas-works`.
Murals are commissioned, not sold. Products tagged `dade-tse` will appear on the character page.

## Theming

Wrap any block in `<Section theme="ink" | "lime" | "paper">`. The `data-theme`
attribute remaps the semantic variables (`--bg`, `--fg`, `--accent`, …) so components
never hard-code a palette. `edges` draws the Adinkra strip, `grain` adds texture.

## 3D character (Phase 5)

`Character3D` renders `CharacterPlaceholder` until `NEXT_PUBLIC_CHARACTER_3D=on`.
Implement `src/components/character/character-3d-scene.tsx` with React Three Fiber
once the GLB exists; it is dynamically imported, client-only, so it never affects
the initial bundle until enabled.

## Regenerating artwork from the PDF

The extraction scripts lived in the session scratchpad; the output (`public/artwork/*`,
`src/content/artwork-manifest.json`, `public/pattern/adinkra-*.svg`) is committed.
Keys in `murals.ts` / `illustrations.ts` follow `<slug>-<n>`.
