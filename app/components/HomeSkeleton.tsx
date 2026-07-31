import { Skeleton } from "./ui/Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="space-y-12">
      {/* Hero / Promo Banner Skeleton */}
      <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* 2. Categories Section Skeleton */}
      <div className="space-y-6">
        <Skeleton className="w-48 h-9 mx-auto" />
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>

      {/* 3. Featured Products / Best Sellers Skeleton */}
      <div className="space-y-6">
        <Skeleton className="w-64 h-8" />
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
