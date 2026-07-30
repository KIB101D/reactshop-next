# React Shop — Next.js Migration 🚀

This project is a modern e-commerce application who's migrate from a Single Page Application (Vite + React Router) to **Next.js 15 (App Router)**.

---

## 🏗️ Migration Status & Architecture Overview

The migration shifts data-fetching and routing logic to the server side, leveraging Server Components (SSR) for improved SEO and performance, while keeping interactive components isolated on the client.

## 📊 Migration Progress

### Completed

- [x] Unified `App.tsx` entry logic into `app/layout.tsx`.
- [x] Integrated `CartProvider`.
- [x] Migrated core routing: Home, Cart, Category, Product, About pages.
- [x] Completed dynamic route migration (`/product/[id]`, `/categories/[slug]`).

### In Progress / Pending

- [ ] Migrate Search, Support pages on Next.
- [ ] Add loaders and 404 page
- [ ] Replace standard `<img>` tags with `next/image` optimization.
- [ ] Implement dynamic SEO via `generateMetadata()`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context + `useReducer`

---

## 📁 Updated File Structure Highlights

```text
app/
 ├── (site)/                        # Main layout group
 │    ├── page.tsx                  # Home Page (Renders Category Grid)
 │    ├── category/
 │    │    └── [categoryId]/
 │    │         ├── page.tsx        # Async Server Component (Fetches category products)
 │    │         ├── CategoryClient.tsx # Client Component (Handles sorting & grid UI)
 │    │         └── product/
 │    │              └── [productId]/
 │    │                   ├── page.tsx # Async Server Component (Fetches single product & related items)
 │    │                   └── ProductDetailsClient.tsx # Client Component (Cart integration & routing)
 │    ├── cart/page.tsx             # Shopping Cart view
 │    ├── search/page.tsx           # Product search page
 │    ├── about/page.tsx            # Static About view
 │    └── support/page.tsx          # Support view
 ├── api/data.ts                    # Server-side data fetching helper methods
 ├── components/                    # Reusable UI elements (Header, Footer, Modals, Breadcrumbs)
 ├── context/CartProvider.tsx       # Cart Context using useReducer (Client-side global state)
 └── types/index.ts                 # TypeScript type definition
```

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```
