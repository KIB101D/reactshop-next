# React Shop — Next.js Migration 🚀

This project is a modern e-commerce application migrating from a Single Page Application (Vite + React Router) to **Next.js 15 (App Router)**.

---

## 🏗️ Migration Status & Architecture Overview

The migration shifts data-fetching and routing logic to the server side, leveraging Server Components (SSR) for improved SEO and performance, while keeping interactive components isolated on the client.

### 📄 Page Architecture Breakdown

- **Home (`/`)**: Server Component (`page.tsx`) + `Suspense` fallback (`HomeSkeleton.tsx`)
- **About (`/about`)**: Server Component (`page.tsx`)
- **Cart (`/cart`)**: Client Component (`page.tsx`)
- **Category (`/category/[categoryId]`)**: Server (`page.tsx`) + Client UI (`CategoryClient.tsx`) + Category Loading (`loading.tsx`)
- **Product Details (`/category/[categoryId]/product/[productId]`)**: Server (`page.tsx`) + Client UI (`ProductDetailsClient.tsx`)
- **Search (`/search`)**: Server (`page.tsx`) + Client UI (`SearchClient.tsx`) + Elastic SVG Loader (`loading.tsx`)
- **Support (`/support`)**: Server Component (`page.tsx`)

---

## 📊 Migration Progress

### Completed

- [x] Unified `App.tsx` entry logic into `app/layout.tsx`.
- [x] Integrated `CartProvider` global state.
- [x] Migrated core routing: Home, Cart, Category, Product, Search, About, Support pages.
- [x] Completed dynamic route migration (`/category/[categoryId]`, `/product/[productId]`, `/search`).
- [x] Implemented Server/Client separation for data-heavy pages (Category, ProductDetails, Search).
- [x] Replaced standard `<img>` tags with `next/image` optimization (`ProductImage`) across all main views.
- [x] Restructured project layout (`api/data.ts` moved to `utils/data.ts`).
- [x] **UI Loading States & Skeletons:** Added instant feedback with custom loaders (`search/loading.tsx`, `category/loading.tsx`), reusable `Skeleton` primitives, and custom Tailwind v4 animations in `globals.css`.
- [x] Implement dynamic SEO metadata via `generateMetadata()`.

### In Progress / Pending

- [ ] Add custom 404 page (`not-found.tsx`).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React Context + `useReducer`

---

## 📁 Updated File Structure Highlights

```text
app/
 ├── layout.tsx                     # Root layout (Fonts, Providers, Global UI)
 ├── globals.css                    # Tailwind v4 theme & custom animation keyframes
 ├── (site)/                        # Main layout group
 │    ├── page.tsx                  # Home Page (Server Component with Suspense)
 │    ├── category/
 │    │    └── [categoryId]/
 │    │         ├── page.tsx        # Async Server Component
 │    │         ├── loading.tsx     # Loading fallback for category route
 │    │         ├── CategoryClient.tsx # Client Component
 │    │         └── product/
 │    │              └── [productId]/
 │    │                   ├── page.tsx
 │    │                   └── ProductDetailsClient.tsx
 │    ├── cart/page.tsx
 │    ├── search/
 │    │    ├── page.tsx             # Async Server Component with Suspense keying
 │    │    ├── loading.tsx          # Elastic SVG spinner fallback
 │    │    └── SearchClient.tsx
 ├── components/                    # Reusable UI elements
 │    ├── ui/
 │    │    └── Skeleton.tsx         # Atomic pulse-skeleton component
 │    ├── HomeSkeleton.tsx          # Skeleton layout for homepage
 │    └── ProductCardSkeleton.tsx   # Refactored skeleton wrapper for product cards
 ├── utils/data.ts
 ├── context/CartProvider.tsx
 └── types/index.ts
```
