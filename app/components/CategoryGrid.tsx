import Link from "next/link";
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
    <main className="flex-1 px-10 py-12 bg-white">
      <h1 className="mb-6 sm:mb-8 text-[clamp(2rem,6vw,3.2rem)] font-semibold text-center text-gray-700 font-heading">
        Categories
      </h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            href={`category/${category.name}`}
            key={category.id}
            className="group relative flex items-center justify-center overflow-hidden text-3xl font-semibold text-white aspect-square rounded-xl transition duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl font-heading"
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div
              className={`absolute inset-0 ${gradients[category.id] || "bg-grad-default"} opacity-50`}
            />
            <span className="relative z-10 drop-shadow-md">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
