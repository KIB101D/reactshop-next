"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import type { Product } from "../types";

type BreadcrumbsProps = {
  products: Product[];
};

function Breadcrumbs({ products }: BreadcrumbsProps) {
  const pathname = usePathname();
  const { categoryId, productId } = useParams<{
    categoryId?: string;
    productId?: string;
  }>();

  if (pathname === "/" || pathname === "/search") return null;

  const categoryExists = categoryId
    ? products.some(
        (p) => p.categoryId?.toLowerCase() === categoryId.toLowerCase(),
      )
    : false;

  const product = productId
    ? products.find((p) => p.id === Number(productId))
    : undefined;

  if (categoryId && !categoryExists) return null;
  if (productId && !product) return null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mt-4 pb-1 text-sm text-gray-500 animate-slide-in">
        <Link href="/" className="transition hover:text-indigo-600">
          Home
        </Link>

        {categoryId && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={`/category/${categoryId}`}
              className="capitalize transition hover:text-indigo-600"
            >
              {categoryId}
            </Link>
          </>
        )}

        {productId && product && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{product.title}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Breadcrumbs;
