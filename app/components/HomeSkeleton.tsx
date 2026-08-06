import { Skeleton } from "./ui/Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="space-y-10 sm:space-y-16">
      {/*  Hero Section  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[220px] sm:h-[320px] lg:h-[400px]">
          <Skeleton className="w-full h-full rounded-3xl" />
        </div>
        <div className="grid grid-cols-2 gap-3 h-24 sm:h-28 md:h-32 lg:h-[400px] lg:flex lg:flex-col lg:gap-6">
          <Skeleton className="w-full h-full lg:h-1/2 rounded-2xl lg:rounded-3xl" />
          <Skeleton className="w-full h-full lg:h-1/2 rounded-2xl lg:rounded-3xl" />
        </div>
      </div>

      {/*  CategoryGrid  */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="w-36 sm:w-44 h-8 rounded-lg" />
          <Skeleton className="w-16 h-5 rounded-lg" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:grid lg:gap-4 lg:grid-cols-6 lg:mx-0 lg:px-0 lg:pb-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex-shrink-0 w-[110px] h-[90px] sm:w-[150px] sm:h-[105px] lg:w-auto lg:h-auto lg:aspect-[16/10] rounded-2xl"
            />
          ))}
        </div>
      </div>

      {/* FlashSale  */}
      <div className="p-4 sm:p-8 bg-slate-100 rounded-3xl space-y-4 sm:space-y-6">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <Skeleton className="w-32 sm:w-40 h-7 sm:h-8 rounded-lg" />
          <Skeleton className="w-28 sm:w-32 h-8 rounded-full" />{" "}
          {/* CountdownBadge */}
        </div>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 p-3 bg-white rounded-2xl">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/2 h-5 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. FeaturedProducts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="w-48 sm:w-56 h-8 rounded-lg" />
          <Skeleton className="w-16 h-5 rounded-lg" />
        </div>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 p-3 bg-white rounded-2xl border border-gray-100"
            >
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/3 h-5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
