"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/app/types";
import ProductImage from "@/app/components/ProductImage";
import { sortProductsByPrice } from "@/app/utils/filterProductsByPrice";
import SortToggleButton from "@/app/components/SortToggleButoon";

type CategoryPageProps = {
  products: Product[];
  categoryId: string;
};

export default function CategoryClient({
  products,
  categoryId,
}: CategoryPageProps) {
  const actualCategory = products.filter(
    (product) => product.categoryId?.toLowerCase() === categoryId.toLowerCase(),
  );

  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const sortedProducts = sortProductsByPrice(actualCategory, orderBy);

  if (sortedProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md text-center">
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 font-heading">
            Nothing found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-w-7xl">
      <div className="flex flex-row items-baseline justify-between">
        {/* Title */}
        <h1 className=" text-gray-800 capitalize font-heading font-semibold text-[clamp(1.8rem,3vw,3rem)]">
          {decodeURIComponent(categoryId)}
        </h1>
        <div className="flex items-center justify-end mb-5">
          <SortToggleButton
            orderBy={orderBy}
            onToggle={() => setOrderBy(orderBy === "asc" ? "desc" : "asc")}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(180px,240px))] xl:justify-stretch">
        {sortedProducts.map((product) => (
          <Link
            href={`/category/${categoryId}/product/${product.id}`}
            key={product.id}
            className="overflow-hidden transition bg-white shadow-sm rounded-lg animate-fade-in hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="relative *:overflow-hidden aspect-square">
              <ProductImage src={product.image} alt={product.title} />
            </div>

            <div className="p-2">
              <p className="text-[clamp(0.85rem,0.9vw,1.1rem)] text-gray-600 line-clamp-1">
                {product.title}
              </p>

              <p className="mt-1 font-semibold text-gray-900 text-[clamp(0.9rem,1vw,1.25rem)]">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
