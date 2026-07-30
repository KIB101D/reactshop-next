function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-2xl animate-pulse">
      <div className="bg-gray-200 aspect-square" />

      <div className="p-4 space-y-3">
        <div className="w-3/4 h-4 bg-gray-200 rounded" />

        <div className="w-1/2 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
