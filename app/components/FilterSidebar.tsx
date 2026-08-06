"use client";

type CategoryFacet = {
  id: string;
  count: number;
};

type FilterSidebarProps = {
  categories: CategoryFacet[];
  selectedCategories: string[];
  minPriceBound: number;
  maxPriceBound: number;
  priceRange: { min: number; max: number };
  onlyOnSale: boolean;
  saleCount: number;
  hasActiveFilters: boolean;
  onCategoryToggle: (categoryId: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onSaleToggle: () => void;
  onReset: () => void;
};

export default function FilterSidebar({
  categories,
  selectedCategories,
  minPriceBound,
  maxPriceBound,
  priceRange,
  onlyOnSale,
  saleCount,
  hasActiveFilters,
  onCategoryToggle,
  onPriceChange,
  onSaleToggle,
  onReset,
}: FilterSidebarProps) {
  const safeMinBound = Math.max(0, minPriceBound);
  const safeMaxBound = Math.max(0, maxPriceBound);

  const currentMin = priceRange.min > 0 ? priceRange.min : safeMinBound;
  const currentMax = priceRange.max > 0 ? priceRange.max : safeMaxBound;

  const priceSpan = safeMaxBound - safeMinBound || 1;
  const minPercent = Math.max(
    0,
    Math.min(100, ((currentMin - safeMinBound) / priceSpan) * 100),
  );
  const maxPercent = Math.max(
    0,
    Math.min(100, ((currentMax - safeMinBound) / priceSpan) * 100),
  );
  const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 font-heading">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-medium text-rose-600 transition hover:text-rose-700 cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* 1. On Sale Toggle */}
      {saleCount > 0 && (
        <div className="pb-5 border-b border-gray-100">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                On Sale
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold text-rose-600 bg-rose-50 rounded">
                {saleCount}
              </span>
            </div>
            <input
              type="checkbox"
              checked={onlyOnSale}
              onChange={onSaleToggle}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
            />
          </label>
        </div>
      )}

      {/* 2. Dynamic Categories */}
      {categories.length > 0 && (
        <div className="pb-5 border-b border-gray-100">
          <h4 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
            Categories
          </h4>
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {categories.map((cat) => {
              const isChecked = selectedCategories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between text-sm cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onCategoryToggle(cat.id)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span
                      className={`capitalize transition ${
                        isChecked
                          ? "font-semibold text-indigo-600"
                          : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {cat.id}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {cat.count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Dual Range Slider + Protected Inputs */}
      <div>
        <h4 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Price Range
        </h4>

        {/* Range Slider Track */}
        <div className="relative w-full h-5 flex items-center mb-4">
          <div className="absolute w-full h-1.5 bg-gray-200 rounded-lg" />
          <div
            className="absolute h-1.5 bg-indigo-600 rounded-lg"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Range Input MIN */}
          <input
            type="range"
            min={safeMinBound}
            max={safeMaxBound}
            value={currentMin}
            onChange={(e) => {
              const val = Math.max(
                0,
                Math.min(Number(e.target.value), currentMax),
              );
              onPriceChange(val, priceRange.max);
            }}
            className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:rounded-full"
            style={{ zIndex: currentMin > safeMaxBound - 10 ? 5 : 3 }}
          />

          {/* Range Input MAX */}
          <input
            type="range"
            min={safeMinBound}
            max={safeMaxBound}
            value={currentMax}
            onChange={(e) => {
              const val = Math.max(
                0,
                Math.max(Number(e.target.value), currentMin),
              );
              onPriceChange(priceRange.min, val);
            }}
            className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:rounded-full"
            style={{ zIndex: 4 }}
          />
        </div>

        {/* Inputs */}
        {/* Inputs */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute text-xs text-gray-400 transform -translate-y-1/2 left-2.5 top-1/2">
              $
            </span>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChar} // <-- Блокуємо математичні оператори
              placeholder={String(safeMinBound)}
              value={priceRange.min || ""}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                onPriceChange(val, priceRange.max);
              }}
              className="w-full py-1.5 pl-6 pr-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-gray-300">–</span>
          <div className="relative flex-1">
            <span className="absolute text-xs text-gray-400 transform -translate-y-1/2 left-2.5 top-1/2">
              $
            </span>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChar} // <-- Блокуємо математичні оператори
              placeholder={String(safeMaxBound)}
              value={priceRange.max || ""}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                onPriceChange(priceRange.min, val);
              }}
              className="w-full py-1.5 pl-6 pr-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
