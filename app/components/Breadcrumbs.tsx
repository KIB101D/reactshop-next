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

  if (pathname === "/") return null;

  const product = products.find((p) => p.id === Number(productId));

  return (
    <div className="mt-4 text-sm text-gray-500 animate-slide-in">
      <Link href="/" className="transition hover:text-indigo-600">
        Home
      </Link>

      {categoryId && (
        <>
          <span className="mx-2">/</span>
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
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.title}</span>
        </>
      )}
    </div>
  );
}

export default Breadcrumbs;
