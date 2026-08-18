# 🛍️ ReactShop

A minimalist e-commerce storefront built with **React, TypeScript, and Next.js**, focused on a full client-to-server rendering migration, SEO, faceted search, predictable cart state, and polished loading UX.

---

🎬 Preview

<p align="center"> 
  <img src="./screenshots/storefrontShowcase.gif" width="90%" />
</p>

---

## 🚀 Features

- **Product Catalog** with category filtering and price sorting.
- **Product Details** with dynamically calculated related products.
- **Shopping Cart** built with React Context + `useReducer`, including an **Undo** action for deleted items.
- **Advanced Search** with URL query parameters, multi-field matching, facets, filtering, and sorting.
- **SEO-Ready Product & Category Pages** using Next.js Server Components and dynamic metadata.
- **Skeleton Loading** with Tailwind's `animate-pulse` and route-level loading states.
- **Error & Empty States** for missing products, failed data loading, broken images, and empty search results.

---

## 🧠 Tech Stack

- **Frontend:** React, TypeScript, Next.js
- **Styling:** Tailwind CSS
- **Routing:** Next.js App Router
- **State Management:** React Context + `useReducer`
- **UI Feedback:** Sonner
- **Rendering:** Server Components + Client Components
- **Data:** Server-side JSON data access

---
## 🌐 Live Demo

👉 [ReactShop — Next.js](https://reactshop-next-ochre.vercel.app/)

Previous Vite version:

👉 [ReactShop — Vite](https://vite-react-ecommerce-jet.vercel.app/)

---

## 🧩 Architecture & Decisions

### 🔄 1. Full migration: Vite → Next.js

ReactShop was fully migrated from **Vite + React Router + TypeScript** to **Next.js App Router + TypeScript**.

| Before | After |
|---|---|
| Vite SPA | Next.js App Router |
| React Router DOM | File-system routing |
| Client-side data loading | Server Components |
| Global loading state | Route-level `loading.tsx` |
| Generic page metadata | Dynamic `generateMetadata()` |
| `<img>` | `next/image` |

### ❗ Problem: Client-Rendered Storefront

The original Vite application was a client-rendered SPA. The initial HTML sent to the browser was essentially only the application shell:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

The actual storefront content — products, categories, headings, navigation and other page elements — appeared after JavaScript loaded and React rendered the application.

Modern search engines such as Google can execute JavaScript and index client-rendered applications. However, this is still different from delivering the important content directly in the initial HTML response.

For an **e-commerce storefront**, that distinction matters because the content we want search engines to discover is also the content users search for:

- product names and descriptions;
- category content;
- prices;
- headings;
- internal links;
- page metadata.

#### ✅ Solution: Next.js App Router

Next.js allows important page content to be rendered on the server and included directly in the initial HTML response.

Instead of:

```text
HTML shell
   ↓
JavaScript
   ↓
React
   ↓
fetch data
   ↓
render page
```

the migrated architecture is closer to:

```text
Request
   ↓
Next.js Server Component
   ↓
load data
   ↓
render HTML
   ↓
browser receives meaningful content
   ↓
hydrate interactive parts
```

The initial response now contains the actual page content instead of starting from an empty React root.

For ReactShop, this creates a stronger foundation for **SEO, crawlability, and product discoverability**.

### 🧩 Server + Client on the Same Page

SEO does not require giving up client-side interaction.

A product page can keep important content on the server while interactive behavior stays in Client Components:

```text
Product Page
├── Server
│   ├── product data
│   ├── HTML content
│   ├── metadata
│   └── 404 handling
│
└── Client
    ├── add to cart
    ├── interactive controls
    ├── cart feedback
    └── browser-only state
```

Product metadata is generated from the actual product data:

```tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${product.title} — ReactShop`,
    description: product.description.slice(0, 160),
  };
}
```

Open Graph metadata is generated from the same product information.

This keeps **SEO and interactivity on the same URL**, with each responsibility handled where it belongs.

### 🛣️ Routing Migration

React Router:

```text
/category/:CategoryId/product/:ProductId
```

became Next.js file-system routing:

```text
/category/[categoryId]/product/[productId]
```

Dynamic segments are now part of the route structure rather than a central router configuration.

### 🔧 Other Migration Changes

The migration also introduced:

- `loading.tsx` for route-level loading states;
- `not-found.tsx` for proper product 404 handling;
- Server Components for catalog data;
- `next/image` for optimized image rendering;
- server-side data utilities for products and categories.

---

# 🔎 2. Advanced faceted search

### ❗ Problem: Limited Product Search

A simple title-only search is not enough for an e-commerce catalog. Users may search by product name, description, category, tags, or exact product ID.

The search experience also needs useful facets instead of making users manually inspect the result set.

### ✅ Solution: Multi-Field Search + Facets

The migrated search flow combines server-side query filtering with client-side facets, filtering, and sorting:

```text
URL query
   ↓
Server page.tsx
   ↓
filterProducts(...)
   ↓
filtered result set
   ↓
SearchClient.tsx
   ↓
facets + filters + sorting
```

The filtering utility supports:

- product title;
- description;
- category ID;
- nested tags;
- exact product ID.

Facets are derived from the current result set:

- category counts;
- minimum price;
- maximum price;
- discounted product count.

This keeps the filter UI synchronized with the actual search results instead of relying on hardcoded values.

### ⚡ `useMemo` Optimization

Derived search data is memoized so unchanged inputs do not trigger the same calculations again:

```tsx
const facets = useMemo(() => {
  // derive categories, price bounds and sale count
}, [filtered]);
```

The final filtered result set is memoized separately:

```tsx
const processedProducts = useMemo(() => {
  return filtered.filter((product) => {
    // category
    // sale
    // price range
  });
}, [filtered, selectedCategories, onlyOnSale, priceRange]);
```

The goal is **avoiding unnecessary recomputation during unrelated UI renders**.

The catalog currently contains 46 products, so this is not presented as a dramatic raw performance benchmark. The repository also does not contain a before/after React Profiler recording, so no artificial millisecond saving is claimed.

---

# 🛒 3. Reducer-Based Cart State + Undo

### ❗ Problem: Cart Feedback

Adding or removing items initially provided limited visual confirmation.

This made cart mutations less obvious and accidental removals harder to recover from.

### ✅ Solution: Reducer-Based Cart State with Undo Support

Cart state is centralized with **React Context + `useReducer`**, with explicit mutation actions such as:

```text
ADD_TO_CART
REMOVE_FROM_CART
INCREMENT
DECREMENT
CLEAR_CART
RESTORE_ITEM
```

Sonner is integrated directly with the cart flow to provide immediate mutation feedback.

#### 📦 Instant feedback

Adding a product immediately updates the cart and triggers a confirmation toast with a direct path to the cart.

#### ⏳ Undo rollback

Removing a product creates a temporary snapshot of the removed item.

The reducer can then restore it through:

```tsx
dispatch({
  type: "RESTORE_ITEM",
  payload: item,
});
```

This keeps cart mutations predictable while providing a lightweight undo flow without introducing a separate history system.

---

# ⏳ 4. Skeleton Loading

### ❗ Problem: Blank Loading States

Local JSON loads almost instantly, but real API requests can introduce noticeable delays.

A full-page spinner felt visually disruptive and could cause layout jumps.

### ✅ Solution: Skeleton Loading Screens

Reusable loading skeletons were created with Tailwind's `animate-pulse` and integrated with Next.js route-level `loading.tsx`.

The skeletons preserve the structure of the real interface:

```text
Hero
↓
Category Grid
↓
Product Grid
```

and for product content:

```text
Image
↓
Title
↓
Price
↓
Product information
```

Instead of replacing the interface with a blank loading state, the skeletons preserve the layout while data is loading.

This keeps the UI visually stable and makes loading feel less disruptive.

---

# 🧱 5. Architecture after migration

### Project Structure

```text
app/
├── (site)/                          # Route group — does not affect URLs
│   ├── page.tsx                     # Home
│   ├── category/[categoryId]/
│   │   ├── page.tsx                 # Server: load + filter category products
│   │   ├── CategoryClient.tsx       # Client: sorting + grid interactions
│   │   └── product/[productId]/
│   │       ├── page.tsx             # Server: product + related products
│   │       └── ProductDetailsClient.tsx
│   ├── search/
│   │   ├── page.tsx                 # Server: reads searchParams
│   │   └── SearchClient.tsx         # Client: facets, filters + sorting
│   ├── cart/page.tsx
│   ├── about/page.tsx
│   └── support/page.tsx
├── components/                      # Shared UI
├── context/CartProvider.tsx         # Cart state via useReducer
├── lib/data/                        # Server-side data access
└── types/                           # Shared TypeScript types
```

### Server / Client responsibilities

```
Server
├── route handling
├── catalog data
├── product lookup
├── SEO metadata
├── HTML content
└── 404 handling

Client
├── cart state
├── search filters
├── sorting
├── toasts
└── browser interactions
```

The architecture keeps the client focused on **state and interaction**, while server-rendered routes handle **content, data, routing, and SEO**.

---

# 📊 Result

ReactShop now uses a **server-first Next.js architecture** while keeping interactive UI on the client.

The migration introduced:

- Next.js App Router;
- Server Components for catalog data;
- dynamic SEO metadata;
- Server/Client Component separation;
- advanced faceted search;
- reducer-based cart state with undo;
- route-level skeleton loading;
- optimized image rendering.

---

# 🛠️ Installation

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

# 📌 Future improvements

- Add an explicit SEO strategy for search query URLs.
- Add `sitemap.ts` for product/category discovery.
- Add structured data such as `Product`, `Offer`, and `BreadcrumbList`.
- Profile search interactions in production mode to quantify the impact of `useMemo`.
- Consider static generation/caching for stable product and category routes.
