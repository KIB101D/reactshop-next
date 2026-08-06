import Link from "next/link";
import Image from "next/image";
import type { Category } from "../types";

const gradients: Record<string, string> = {
  electronics: "bg-grad-electronics",
  clothing: "bg-grad-clothing",
  books: "bg-grad-books",
  furniture: "bg-grad-furniture",
  outdoor: "bg-grad-outdoor",
  games: "bg-grad-games",
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-gray-800 text-2xl">
          Categories
        </h2>
        <Link
          href="/search"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          See all
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 no-scrollbar lg:grid lg:gap-4 lg:grid-cols-6 lg:mx-0 lg:px-0 lg:pb-0">
        {categories.map((category) => {
          const gradClass = gradients[category.id] || "bg-grad-electronics";

          return (
            <Link
              key={category.id}
              href={`/category/${encodeURIComponent(category.name)}`}
              className={`relative group snap-start flex-shrink-0 w-[110px] h-[90px] sm:w-[150px] sm:h-[105px] lg:w-auto lg:h-auto ${gradClass} lg:aspect-[16/10] rounded-2xl flex items-end p-3 lg:p-4 overflow-hidden transition-transform duration-200 hover:scale-[1.02]`}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 1024px) 150px, 200px"
                  className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
              )}
              <span className="relative z-10 text-white text-xs sm:text-sm lg:text-base font-heading font-semibold drop-shadow">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
