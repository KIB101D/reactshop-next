import { Skeleton } from "@/app/components/ui/Skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <main className="pt-0 pb-10">
      <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-[minmax(280px,420px)_1fr] lg:grid-cols-[minmax(340px,520px)_1fr]">
        {/* Product Image */}
        <Skeleton className="aspect-square rounded-2xl lg:max-w-[620px]" />

        {/* Product Info */}
        <div className="flex gap-4 lg:min-h-full lg:py-6">
          <div className="flex flex-col flex-1">
            <div>
              {/* Category label */}
              <Skeleton className="w-24 h-3 rounded" />

              {/* Title */}
              <Skeleton className="mt-3 h-12 w-3/4 rounded-lg" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-14 h-6 rounded-md" />
                <Skeleton className="w-20 h-6 rounded-md" />
              </div>
            </div>

            <div className="flex-1 hidden lg:block" />

            <div className="flex flex-col gap-5">
              {/* Price + Rating */}
              <div className="flex items-end gap-4">
                <Skeleton className="h-12 w-28 rounded-lg" />
                <Skeleton className="h-5 w-12 rounded mb-1" />
              </div>

              {/* Description */}
              <div className="max-w-lg space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>

              {/* Stock + Add to Cart */}
              <div className="flex flex-col items-start gap-3 pt-2">
                <Skeleton className="w-20 h-4 rounded" />
                <Skeleton className="w-full h-14 rounded-xl lg:min-w-[400px] lg:w-auto" />
              </div>
            </div>

            <div className="flex-1 hidden lg:block" />
          </div>

          {/* Related Products */}
          <div className="hidden xl:flex xl:flex-col xl:w-52">
            <Skeleton className="w-24 h-3 mb-4 rounded" />

            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-2">
                  <Skeleton className="w-18 h-18 rounded-xl shrink-0" />
                  <div className="flex flex-col justify-center min-w-0 gap-2 flex-1">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-12 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
