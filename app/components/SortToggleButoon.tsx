type SortToggleButtonProps = {
  orderBy: "asc" | "desc";
  onToggle: () => void;
};

function SortToggleButton({ orderBy, onToggle }: SortToggleButtonProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 whitespace-nowrap"
      >
        {/* Mobile */}
        <span className="sm:hidden">
          {orderBy === "asc" ? "Price ↑" : "Price ↓"}
        </span>

        {/* Tablet/Desktop */}
        <span className="hidden sm:inline">
          {orderBy === "asc" ? "Lowest first ↑" : "Highest first ↓"}
        </span>
      </button>
    </>
  );
}

export default SortToggleButton;
