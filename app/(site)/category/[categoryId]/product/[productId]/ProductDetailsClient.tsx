"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";
import type { Product } from "@/app/types";
import ProductImage from "@/app/components/ProductImage";
import { SaleBadge } from "@/app/components/SaleBadge";

type ProductDetailsClientProps = {
  product: Product;
  relatedProducts: Product[];
  categoryId: string;
};

export default function ProductDetailsClient({
  product,
  relatedProducts,
  categoryId,
}: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const isOnSale = product.oldPrice && product.oldPrice > product.price;

  return (
    <main key={product.id} className="pt-0 pb-10">
      <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-[minmax(280px,420px)_1fr] lg:grid-cols-[minmax(340px,520px)_1fr]">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-white shadow-sm rounded-2xl aspect-square lg:max-w-[620px] animate-fade-in">
          <ProductImage src={product.image} alt={product.title} />

          {isOnSale && (
            <SaleBadge
              price={product.price}
              oldPrice={product.oldPrice}
              size="lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex gap-4 lg:min-h-full lg:py-6 animate-fade-in">
          <div className="flex flex-col flex-1">
            <div>
              <Link
                href={`/category/${categoryId}`}
                className="text-[11px] font-semibold tracking-[0.18em] text-indigo-600 uppercase transition hover:opacity-70 w-fit"
              >
                {categoryId}
              </Link>

              <h1 className="mt-3 text-5xl md:text-4xl lg:text-5xl font-semibold leading-[0.95] tracking-tight text-gray-900 font-heading">
                {product.title}
              </h1>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {product.tags?.map((tag) => (
                  <button
                    key={tag}
                    className="px-2.5 py-1 text-[11px] text-gray-500 transition bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      router.push(`/search?q=${tag}`);
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              {/* Status & Rating line */}
              <div className="flex items-center gap-2 text-sm">
                {product.rating && (
                  <>
                    <div className="flex items-center gap-1 font-semibold text-gray-700">
                      <span className="text-amber-400">★</span>
                      <span>{product.rating}</span>
                    </div>
                  </>
                )}
                <span className="text-gray-300">•</span>
                <span className="font-bold text-green-600">In stock</span>
              </div>
            </div>

            <div className="flex-1 hidden lg:block" />

            <div className="flex flex-col gap-5">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <p className="text-5xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                  ${product.price}
                </p>

                {isOnSale && (
                  <span className="text-2xl font-normal text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                {product.description}
              </p>

              {/* Add to Cart Button */}
              <div className="flex flex-col items-start gap-3 pt-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-8 py-4 text-base font-medium text-white transition-all bg-black rounded-xl hover:bg-gray-800 active:scale-[0.985] lg:min-w-[400px] lg:w-auto cursor-pointer"
                >
                  Add to cart
                </button>
              </div>
            </div>

            <div className="flex-1 hidden lg:block" />
          </div>

          {/* Related Products */}
          <div className="hidden xl:flex xl:flex-col xl:w-52">
            <h3 className="mb-4 text-xs font-bold tracking-[0.18em] text-gray-400 uppercase">
              Related products
            </h3>

            <div className="space-y-4">
              {relatedProducts.map((item) => {
                const itemOnSale = item.oldPrice && item.oldPrice > item.price;
                return (
                  <Link
                    key={item.id}
                    href={`/category/${item.categoryId}/product/${item.id}`}
                    className="flex gap-3 p-2 transition rounded-2xl hover:bg-gray-50"
                  >
                    <div className="relative overflow-hidden bg-gray-100 rounded-xl w-18 h-18 shrink-0">
                      <ProductImage src={item.image} alt={item.title} />
                      {itemOnSale && (
                        <span className="absolute top-1 left-1 z-10 px-1 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded">
                          Sale
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.title}
                      </p>

                      <div className="flex items-baseline gap-1.5 mt-1">
                        <p className="text-sm font-semibold text-gray-900">
                          ${item.price}
                        </p>
                        {itemOnSale && (
                          <span className="text-xs text-gray-400 line-through">
                            ${item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
