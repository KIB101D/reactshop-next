# 🛍️ ReactShop — Next.js Edition

A minimalist boutique storefront, migrated from a Vite + React Router SPA to **Next.js App Router**, rebuilt around Server Components, streaming, and a faceted search/filter system.

This isn't a rewrite for the sake of a rewrite — it's a case study in moving a client-fetched, `useEffect`-driven SPA to a server-first architecture, and the trade-offs that come with it.

---

## 🎬 Preview

<p align="center">
  <img src="./screenshots/homeShowcase.gif" width="90%" />
</p>

---

## 🌐 Live Demo

👉 [ReactShop](reactshop-next-ochre.vercel.app)

Previous Vite version (for comparison): [ReactShop (Vite)](https://vite-react-ecommerce-jet.vercel.app/)

---

## 🚀 Features

- **Server-rendered product catalog** — categories, products, and search results are fetched and filtered on the server, not in `useEffect`.
- **Streaming with `Suspense`** — the homepage streams in Hero, Categories, Flash Sale, and Featured Products independently, with a matching skeleton fallback.
- **Faceted search & filtering** — dynamic category counts, a dual-thumb price range slider, and an "On Sale" toggle, all derived from the current result set (not hardcoded).
- **Flash Sale system** — products marked with `oldPrice` get a live countdown badge and a percentage-off badge, computed once and reused across the catalog, search, and product pages.
- **Shopping Cart** — React Context + `useReducer`, with an "Undo" action for removed items and savings passed through to checkout.
- **Dynamic SEO metadata** — `generateMetadata` per product/category page (title, description, Open Graph image), with `/search` explicitly excluded from indexing.
- **Image optimization** — `next/image` throughout, with `priority` on the LCP hero image and `sizes` tuned per breakpoint instead of shipping full-resolution images everywhere.
- **Proper error boundaries** — `not-found.tsx` and `error.tsx` per route segment instead of inline conditional JSX, so a missing product returns a real `404`.
- **Responsive from the ground up** — snap-scroll category rail on mobile, a collapsible search field in the header, and a slide-over filter drawer on small screens.

---

## 🧠 Tech Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config)
- **Data:** Local JSON, read server-side via `fs/promises` — no client-side fetching for initial data
- **State:** React Context + `useReducer` (cart), `useState` for UI-local state (filters, sort, search input)
- **UI:** Sonner (toasts), Lucide (icon library)

---

## 🧩 Architecture & Decisions

### ❗ Problem: Client-fetched data doesn't fit a server-first framework

The original SPA loaded `categories.json`/`products.json` via `useEffect` + `fetch`, with manual `isLoading`/`error` state in `App.tsx`. Ported as-is, this would fight Next.js rather than use it — `fetch("/data/products.json")` has no implicit origin on the server, and `navigator.onLine` doesn't exist outside a browser.

### ✅ Solution: Server Components read data directly, no client fetch layer

Data access was rewritten as plain async functions that read the local JSON via `fs/promises`, called directly inside Server Components (`page.tsx`, `layout.tsx`):

```ts
export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public/data/products.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}
```

Every page that needs data is an `async function` that `await`s it before rendering — so there's no `isLoading` state to manage, no loading spinner to coordinate, and no client-side waterfall. Where a route needs a loading state anyway (for perceived performance on a slower connection), it's handled by the `loading.tsx` file convention or an explicit `<Suspense>` boundary — not a `useState`.

---

### ❗ Problem: One route, two audiences — server data, client interactivity

Sorting, filtering, and cart mutations are inherently client-side, but fetching and filtering a 46-product catalog on every keystroke in the browser is wasteful, and shipping the *entire* catalog to the client so it can filter locally defeats the purpose of server rendering.

### ✅ Solution: Thin Server page + typed Client component pattern

Every interactive route is split into two files: a Server `page.tsx` that fetches and pre-filters data, and a Client `...Client.tsx` that owns only the interactive slice (sort order, filter state, cart actions):

```
category/[categoryId]/
├── page.tsx              // Server: fetch + narrow by categoryId
└── CategoryClient.tsx    // Client: sort toggle, rendering
```

The `/search` route takes this further with a `useMemo`-derived facet system — category counts, min/max price bounds, and sale-item count are all computed from the *current* filtered result set, so the sidebar always reflects what's actually on screen rather than the full catalog.

---

### ❗ Problem: Discount data was a hardcoded ID list

An early version of Flash Sale filtered by a literal array of product IDs (`[1, 2, 19, 23]`) baked into the data-fetching function — changing what's on sale meant editing TypeScript, not data.

### ✅ Solution: Discount state lives entirely in the data layer

`oldPrice?: number` was added as an optional field directly on `Product`. A product is "on sale" if and only if `oldPrice` exists, full stop — no second boolean field to keep in sync, no derived state to drift. The percentage-off badge, the countdown, and the crossed-out price all read from the same field:

```ts
const isOnSale = product.oldPrice && product.oldPrice > product.price;
```

`isFeatured` was considered as a separate flag but dropped in favor of computing it from `rating` — a field that's genuinely derived shouldn't also be manually maintained.

---

### ❗ Problem: Loading states didn't reflect the real page

An early skeleton mirrored a hero + promo + featured-products layout that didn't exist yet on the actual Home page — causing a jarring layout shift the moment real data replaced the skeleton.

### ✅ Solution: Skeletons are built *after* the real layout, not before

Every skeleton component (`HomeSkeleton`, `ProductCardSkeleton`, per-route `loading.tsx`) mirrors the exact grid, spacing, and section order of its real counterpart — built second, once the real JSX exists, specifically to keep Cumulative Layout Shift at zero.

---

## 📁 Project Structure

```
app/
├── (site)/                          # Route group — pages only, doesn't affect URLs
│   ├── page.tsx                     # Home (streams Hero/Categories/FlashSale/Featured)
│   ├── category/[categoryId]/
│   │   ├── page.tsx                 # Server: fetch + filter by category
│   │   ├── CategoryClient.tsx       # Client: sort + grid
│   │   └── product/[productId]/
│   │       ├── page.tsx             # Server: fetch product + related items
│   │       └── ProductDetailsClient.tsx
│   ├── search/
│   │   ├── page.tsx                 # Server: reads ?q= via searchParams
│   │   └── SearchClient.tsx         # Client: facets, filters, sort
│   ├── cart/page.tsx
│   ├── about/page.tsx
│   └── support/page.tsx
├── components/                      # Shared UI (Header, Footer, cards, badges…)
├── context/CartProvider.tsx         # Cart state (useReducer)
├── lib/data/                        # Server-side data access (fs-based)
└── types/                           # Shared TypeScript types
```

---

## 📦 Installation

```bash
npm install
npm run dev
```
