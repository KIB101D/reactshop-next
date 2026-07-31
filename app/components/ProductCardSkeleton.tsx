import { Skeleton } from "./ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-2xl">
      <Skeleton className="w-full aspect-square rounded-none" />

      <div className="p-4 space-y-3">
        <Skeleton className="w-3/4 h-4 rounded" />

        <Skeleton className="w-1/2 h-4 rounded" />
      </div>
    </div>
  );
}
