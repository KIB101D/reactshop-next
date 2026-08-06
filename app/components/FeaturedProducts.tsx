import Link from "next/link";
import Image from "next/image";
import type { Product } from "../types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-gray-800 text-2xl">
          Featured products
        </h2>
        <Link
          href="/search"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          See all
        </Link>
      </div>

      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`category/${product.categoryId}/product/${product.id}`}
            className="group space-y-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full product-ph" />
              )}
            </div>
            <p className="text-sm text-gray-700 line-clamp-1">
              {product.title}
            </p>
            <p className="font-semibold text-gray-900">${product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
