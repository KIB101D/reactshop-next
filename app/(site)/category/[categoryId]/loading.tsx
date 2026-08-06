import { Skeleton } from "@/app/components/ui/Skeleton";
import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div className="w-full mx-auto max-w-7xl">
      <div className="flex flex-row items-center justify-between">
        <Skeleton className="w-40 sm:w-50 md:w-60 h-9 sm:h-8 md:h-10 rounded-lg" />
        <div className="flex items-center justify-end mb-5">
          <Skeleton className="w-28 sm:w-32 h-9 rounded-lg" />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(180px,240px))] xl:justify-stretch">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
