# React Shop — Next.js Migration 🚀

This project is a modern e-commerce application migrating from a Single Page Application (Vite + React Router) to **Next.js 15 (App Router)**.

---

## 🏗️ Migration Status & Architecture Overview

The migration shifts data-fetching and routing logic to the server side, leveraging Server Components (SSR) for improved SEO and performance, while keeping interactive components isolated on the client.

### 📄 Page Architecture Breakdown

- **Home (`/`)**: Server Component (`page.tsx`)
- **About (`/about`)**: Server Component (`page.tsx`)
- **Cart (`/cart`)**: Client Component (`page.tsx`)
- **Category (`/category/[categoryId]`)**: Server (`page.tsx`) + Client UI (`CategoryClient.tsx`)
- **Product Details (`/category/[categoryId]/product/[productId]`)**: Server (`page.tsx`) + Client UI (`ProductDetailsClient.tsx`)
- **Search (`/search`)**: Server (`page.tsx`) + Client UI (`SearchClient.tsx`)
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

### In Progress / Pending

- [ ] Add loaders (`loading.tsx`) and custom 404 page (`not-found.tsx`).
- [ ] Implement dynamic SEO metadata via `generateMetadata()`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context + `useReducer`

---

## 📁 Updated File Structure Highlights

```text
app/
 ├── (site)/                        # Main layout group
 │    ├── page.tsx                  # Home Page (Server Component)
 │    ├── category/
 │    │    └── [categoryId]/
 │    │         ├── page.tsx        # Async Server Component (Fetches category products)
 │    │         ├── CategoryClient.tsx # Client Component (Handles sorting, filter & grid UI)
 │    │         └── product/
 │    │              └── [productId]/
 │    │                   ├── page.tsx # Async Server Component (Fetches product & related items)
 │    │                   └── ProductDetailsClient.tsx # Client Component (Cart integration & UI)
 │    ├── cart/page.tsx             # Shopping Cart view (Client Component)
 │    ├── search/
 │    │    ├── page.tsx             # Async Server Component (Handles search params & fetching)
 │    │    └── SearchClient.tsx     # Client Component (Renders search UI & results)
 │    ├── about/page.tsx            # Static About view (Server Component)
 │    └── support/page.tsx          # Support view (Server Component)
 ├── utils/data.ts                  # Server-side data fetching helper methods
 ├── components/                    # Reusable UI elements (ProductImage, Header, Footer, Modals)
 ├── context/CartProvider.tsx       # Cart Context using useReducer (Client-side global state)
 └── types/index.ts                 # TypeScript type definitions
```
