# 🛍️ ReactShop

A minimalist e-commerce storefront built with **React, TypeScript, and Next.js** — migrated from a Vite + React Router SPA to the App Router, with a focus on server-first rendering, SEO, faceted search, predictable cart state, and polished loading UX.

---

## 🎬 Preview

<p align="center">
  <img src="./screenshots/homeShowcase.gif" width="90%" />
</p>

---

## 🌐 Live Demo

👉 [ReactShop — Next.js](https://reactshop-next-ochre.vercel.app/)

Previous Vite version, kept live for comparison: [ReactShop — Vite](https://vite-react-ecommerce-jet.vercel.app/)

---

## 🚀 Features

- **Product Catalog** with category filtering and price sorting.
- **Product Details** with dynamically calculated related products.
- **Shopping Cart** — React Context + `useReducer`, with an **Undo** action for removed items.
- **Faceted Search** — multi-field matching, dynamic category counts, dual-thumb price range, sale filter.
- **Dynamic SEO Metadata** — per-product/category `generateMetadata`, Open Graph included.
- **Skeleton Loading** — route-level `loading.tsx` + `Suspense`, matched 1:1 to the real layout.
- **Error & Empty States** — real `404`s via `not-found.tsx`, broken-image fallback, empty search results.

---

## 🧠 Tech Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config)
- **Data:** Local JSON, read server-side via `fs/promises` — no client-side fetch for initial data
- **State:** React Context + `useReducer` (cart), `useState`/`useMemo` for UI-local state (filters, sort, facets)
- **UI:** Sonner (toasts), Lucide (icons)

---

## 🧩 Architecture & Decisions

### 🔄 Migration: Vite SPA → Next.js App Router

| Before (Vite) | After (Next.js) |
|---|---|
| Client-rendered SPA | Server Components + streaming |
| React Router DOM | File-system routing (`app/`) |
| `useEffect` + `fetch` for data | `fs/promises` read directly in Server Components |
| Global `isLoading` state | Route-level `loading.tsx` + `Suspense` |
| Static, generic `<title>` | Dynamic `generateMetadata()` per page |
| `<img>` | `next/image` with `priority`/`sizes` |

---

#### ❗ Problem: client-rendered shell

The Vite SPA shipped an essentially empty <body>:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

There's the issue: product data, categories, prices, and headings only existed after JS loaded.

Google does render JavaScript, but on a separate, delayed render queue — indexing can lag days or weeks behind raw HTML, which gets indexed immediately. Link-preview crawlers don't render JS at all: Open Graph scrapers for Slack, Twitter, and Facebook read raw HTML only, so a product link pasted into a chat would show a blank preview. And Google's JS rendering isn't the baseline either — Bing, DuckDuckGo, and others have weaker or no JS rendering support.

#### ✅ Solution: Server Components render the initial HTML

```
Request → Server Component → read data → render HTML → browser gets real content 
```

[Server page:](https://github.com/KIB101D/reactshop-next/blob/main/app/(site)/category/%5BcategoryId%5D/page.tsx):
```ts
export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const products = await getProducts();

  return <CategoryClient products={products} categoryId={categoryId} />;
}
```

💡 Because this runs on the server before the response is sent, the crawler and the OG scraper both receive the same fully-formed HTML the browser does — there's no JS execution step for them to skip.

---

#### 🧩 Server + Client on the same URL

SEO doesn't require giving up interactivity. Every route that needs both is split into a thin server `page.tsx` (data + metadata) and a `*Client.tsx` (interactive slice):

```
category/[categoryId]/product/[productId]/
├── [page.tsx](https://github.com/KIB101D/reactshop-next/blob/main/app/(site)/category/%5BcategoryId%5D/product/%5BproductId%5D/page.tsx)                # Server: product lookup, generateMetadata, 404
└── ProductDetailsClient.tsx  # Client: add to cart, gallery, quantity
```

👉 Result:
<p align="center">
  <img src="./screenshots/openGraphSocials.png" width="90%" />
</p>

---

#### 🛣️ Routing

React Router's `/category/:categoryId/product/:productId` became file-system routing: `app/(site)/category/[categoryId]/product/[productId]/page.tsx`. Dynamic segments live in the folder structure instead of a central router config.

#### 🔧 Other migration changes

- [`loading.tsx`](https://github.com/KIB101D/reactshop-next/blob/main/app/(site)/category/%5BcategoryId%5D/loading.tsx) per route instead of one global spinner
- [`not-found.tsx`](https://github.com/KIB101D/reactshop-next/blob/main/app/(site)/category/%5BcategoryId%5D/product/%5BproductId%5D/not-found.tsx) for a real `404` on a missing product
- `next/image` with `priority` on the LCP hero image ([`Hero.tsx`](https://github.com/KIB101D/reactshop-next/blob/main/app/components/Hero.tsx)) and per-breakpoint `sizes` elsewhere

---

### ❗ Problem: Limited Search Feedback & Discovery

The original search could find products, but gave users limited feedback and control over the result set.

A query returned matching products, but the interface did not show:

* how results were distributed across categories;
* what price range was available;
* how many products were on sale;
* which filters were relevant to the current results.

---

#### ✅ Solution: Dynamic Faceted Search

The search experience was redesigned around the **current result set**.

The pipeline is intentionally split into three stages:

```text
1. getProducts()
   ↓
   All products

2. filterProductsByQuery(query)
   ↓
   searchedProducts — products matching the query
   │
   └──→ computeFacets(searchedProducts)
             ↓
             available categories
             min/max price
             sale count

3. filterBySelectedOptions(selectedFilters)
   ↓
   finalProducts — rendered product grid
```

Facets are derived from `searchedProducts`, so the available categories, price range, and sale count always reflect the current search results rather than the full catalog.

---

#### ⚡ Multi-Field Search

The query matches multiple product fields:

```ts
const filtered = products.filter(
  (product) =>
    product.title.toLowerCase().includes(normalizedQuery) ||
    product.tags.some((tag) => tag.includes(normalizedQuery)) ||
    product.description.toLowerCase().includes(normalizedQuery) ||
    product.categoryId.toLowerCase().includes(normalizedQuery) ||
    String(product.id) === query,
);
```

This allows discovery through titles, descriptions, tags, category IDs, or exact product IDs.

---

### ❗ Problem: Lack of Cart Feedback

Adding or removing items from the cart initially provided no visual confirmation. 
This made interactions feel unclear, especially when removing products accidentally.

#### ✅ Solution: Reducer-Based Cart State with Undo Support

Integrated Sonner toast notifications directly with a centralized cart state powered by `useReducer` and React Context to handle mutation feedback.

#### 📦 1. Seamless Item Addition
Adding a product instantly triggers a confirmation toast with a deep-link shortcut to the cart page.
<p align="center">
  <img src="./screenshots/addToCartImg.png" width="60%" alt="Add to cart toast" />
</p>

#### ⏳ 2. Undo Rollback
Removing a product creates a temporary state snapshot, allowing the reducer to restore items through a dedicated `RESTORE_ITEM` action.

<p align="center">
  <img src="./screenshots/undoCartImg.png" width="60%" alt="Undo action toast" />
</p>

---

### ❗ Problem: Blank Loading States

Although local JSON loading is nearly instant, real API requests can introduce noticeable delays. Using a full-page spinner felt visually disruptive and caused layout jumps.

#### ✅ Solution

`HomeSkeleton`, `ProductCardSkeleton`, and per-route `loading.tsx` files mirror the real layout exactly, built *after* the real JSX existed — specifically to keep Cumulative Layout Shift at zero.

<p align="center">
  <img src="./screenshots/loadingSkeleton.gif" width="90%" />
  <br />
  <sub>Home page skeleton state</sub>
</p>

<p align="center">
  <img src="./screenshots/loadingSkelotonsProduct.gif" width="90%" />
  <br />
  <sub>Product page skeleton state</sub>
</p>

---

## 🧱 Project Structure

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

## 🛠️ Installation

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

---
