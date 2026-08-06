"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import ProductImage from "@/app/components/ProductImage";
import type { Product } from "@/app/types";
import { sortProductsByPrice } from "@/app/utils/filterProductsByPrice";
import SortToggleButton from "@/app/components/SortToggleButoon";
import FilterSidebar from "@/app/components/FilterSidebar";
import { SaleBadge } from "@/app/components/SaleBadge";

type SearchClientProps = {
  filtered: Product[];
  query: string;
};

export default function SearchClient({ filtered, query }: SearchClientProps) {
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  const isSearching = Boolean(query.trim());

  // 1. Compute dynamic facets derived from the initial searched products
  const facets = useMemo(() => {
    if (filtered.length === 0) {
      return {
        categories: [],
        minPrice: 0,
        maxPrice: 0,
        saleCount: 0,
      };
    }

    const categoryMap = new Map<string, number>();
    let saleCount = 0;
    let minPrice = filtered[0].price;
    let maxPrice = filtered[0].price;

    filtered.forEach((product) => {
      const currentCount = categoryMap.get(product.categoryId) || 0;
      categoryMap.set(product.categoryId, currentCount + 1);

      if (product.oldPrice && product.oldPrice > product.price) {
        saleCount++;
      }

      if (product.price < minPrice) minPrice = product.price;
      if (product.price > maxPrice) maxPrice = product.price;
    });

    const categories = Array.from(categoryMap.entries()).map(([id, count]) => ({
      id,
      count,
    }));

    return { categories, minPrice, maxPrice, saleCount };
  }, [filtered]);

  // 2. Apply active filters to the searched products
  const processedProducts = useMemo(() => {
    return filtered.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.categoryId)
      ) {
        return false;
      }

      if (onlyOnSale) {
        const isOnSale = product.oldPrice && product.oldPrice > product.price;
        if (!isOnSale) return false;
      }

      if (priceRange.min > 0 && product.price < priceRange.min) {
        return false;
      }
      if (priceRange.max > 0 && product.price > priceRange.max) {
        return false;
      }

      return true;
    });
  }, [filtered, selectedCategories, onlyOnSale, priceRange]);

  // 3. Sort final products
  const sortedProducts = sortProductsByPrice(processedProducts, orderBy);

  // Handlers
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleSaleToggle = () => {
    setOnlyOnSale((prev) => !prev);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setOnlyOnSale(false);
    setPriceRange({ min: 0, max: 0 });
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    onlyOnSale ||
    priceRange.min > 0 ||
    priceRange.max > 0;

  return (
    <div className="w-full mx-auto max-w-7xl">
      {/* Header section */}
      <div className="flex flex-row items-baseline justify-between gap-4 mb-8 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-gray-900 font-heading font-semibold tracking-tight text-[clamp(1.6rem,3vw,2.8rem)]">
            {isSearching ? "Search Results" : "All Products"}
          </h1>
          <p className="mt-1 text-gray-500">
            {isSearching ? (
              <>
                Showing results for{" "}
                <span className="italic font-medium text-indigo-600">
                  {query}
                </span>
              </>
            ) : (
              "Explore our complete catalog"
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter toggle button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg lg:hidden hover:bg-gray-200 transition cursor-pointer"
          >
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-indigo-600 rounded-full" />
            )}
          </button>

          <span className="hidden px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full md:block">
            {processedProducts.length}{" "}
            {processedProducts.length === 1 ? "item" : "items"}
          </span>

          <SortToggleButton
            orderBy={orderBy}
            onToggle={() => setOrderBy(orderBy === "asc" ? "desc" : "asc")}
          />
        </div>
      </div>

      {/* Main Content: Product Grid (Left) + Desktop Sidebar (Right) */}
      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        {/* Product Grid Area */}
        <main>
          {sortedProducts.length === 0 ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="max-w-md text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 font-heading">
                  No products found
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting or resetting your filter criteria.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* 4 columns on desktop, 3 on tablet, 2 on mobile */
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {sortedProducts.map((product) => (
                <Link
                  href={`/category/${product.categoryId}/product/${product.id}`}
                  key={product.id}
                  className="overflow-hidden transition bg-white shadow-sm rounded-lg animate-fade-in hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <ProductImage src={product.image} alt={product.title} />
                    {product.oldPrice && product.oldPrice > product.price && (
                      <SaleBadge
                        price={product.price}
                        oldPrice={product.oldPrice}
                        size="md"
                      />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-[clamp(0.85rem,0.9vw,1.1rem)] text-gray-600 line-clamp-1">
                      {product.title}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <p className="font-semibold text-gray-900 text-[clamp(0.9rem,1vw,1.25rem)]">
                        ${product.price}
                      </p>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* Desktop Sidebar Filters (Right Side) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSidebar
              categories={facets.categories}
              selectedCategories={selectedCategories}
              minPriceBound={facets.minPrice}
              maxPriceBound={facets.maxPrice}
              priceRange={priceRange}
              onlyOnSale={onlyOnSale}
              saleCount={facets.saleCount}
              hasActiveFilters={hasActiveFilters}
              onCategoryToggle={handleCategoryToggle}
              onPriceChange={handlePriceChange}
              onSaleToggle={handleSaleToggle}
              onReset={handleResetFilters}
            />
          </div>
        </aside>
      </div>

      {/* Mobile Drawer Slide-over */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 font-heading">
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-4">
              <FilterSidebar
                categories={facets.categories}
                selectedCategories={selectedCategories}
                minPriceBound={facets.minPrice}
                maxPriceBound={facets.maxPrice}
                priceRange={priceRange}
                onlyOnSale={onlyOnSale}
                saleCount={facets.saleCount}
                hasActiveFilters={hasActiveFilters}
                onCategoryToggle={handleCategoryToggle}
                onPriceChange={handlePriceChange}
                onSaleToggle={handleSaleToggle}
                onReset={handleResetFilters}
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 text-sm font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition cursor-pointer"
              >
                Show {processedProducts.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
