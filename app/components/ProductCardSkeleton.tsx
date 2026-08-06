import { Skeleton } from "./ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-lg">
      <Skeleton className="w-full aspect-square rounded-none" />
      <div className="p-2 space-y-2">
        <Skeleton className="w-3/4 h-4 rounded" />
        <div className="flex items-baseline gap-1.5 mt-1">
          <Skeleton className="w-12 h-5 rounded" />
          <Skeleton className="w-8 h-3 rounded" />
        </div>
      </div>
    </div>
  );
}
