import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { CountdownBadge } from "./CountdownBadge";

const FLASH_SALE_ENDS_AT = new Date(
  Date.now() + 4 * 60 * 60 * 1000 + 12 * 60 * 1000 + 33 * 1000,
).toISOString();

export function FlashSale({ products }: { products: Product[] }) {
  return (
    <section className="p-4 sm:p-8 bg-slate-100 rounded-3xl space-y-4 sm:space-y-6">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h2 className="font-heading font-semibold text-gray-800 text-lg sm:text-2xl">
          Flash sale
        </h2>
        <CountdownBadge endTime={FLASH_SALE_ENDS_AT} />
      </div>

      <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/category/${product.categoryId}/product/${product.id}`}
            className="group space-y-3 p-3 bg-white rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full product-ph" />
              )}
            </div>
            <p className="text-sm text-gray-700 line-clamp-1">
              {product.title}
            </p>
            <p className="font-semibold text-gray-900">
              ${product.price}{" "}
              <span className="text-xs text-gray-400 line-through font-normal ml-1">
                ${product.oldPrice}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
