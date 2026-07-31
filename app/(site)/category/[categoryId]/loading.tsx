import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div className="py-6">
      <div className="w-48 h-9 mb-6 bg-gray-200 rounded-lg animate-pulse" />

      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
