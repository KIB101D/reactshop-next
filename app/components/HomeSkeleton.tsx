import { Skeleton } from "./ui/Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-16">
      {/* 1. Hero Section (Split Layout: Акційний баннер + 2 малі картки) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[320px] sm:h-[400px]">
          <Skeleton className="w-full h-full rounded-3xl" />
        </div>
        <div className="hidden lg:flex flex-col gap-6 h-[400px]">
          <Skeleton className="w-full h-1/2 rounded-3xl" />
          <Skeleton className="w-full h-1/2 rounded-3xl" />
        </div>
      </div>

      {/* 2. Compact Categories (Більш компактні, не беруть багато висоти) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="w-48 h-8 rounded-lg" />
          <Skeleton className="w-24 h-6 rounded-lg" />{" "}
          {/* Посилання "Дивитися всі" */}
        </div>
        {/* aspect-[16/9] замість aspect-square збереже купу місця */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[16/10] rounded-2xl" />
          ))}
        </div>
      </div>

      {/* 3. Promo Strip / Flash Sales Break (Злам ритму - контрастний блок) */}
      <div className="p-8 bg-slate-100 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="w-56 h-8 rounded-lg" />
          <Skeleton className="w-32 h-8 rounded-full" /> {/* Таймер */}
        </div>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 p-3 bg-white rounded-2xl">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/2 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Featured Products (8 товарів замість 4, щоб заповнити екран) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="w-64 h-8 rounded-lg" />
          <Skeleton className="w-28 h-6 rounded-lg" />
        </div>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-2xl" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/3 h-5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
