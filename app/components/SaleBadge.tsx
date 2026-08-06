export function SaleBadge({
  price,
  oldPrice,
  size = "md",
}: {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
}) {
  if (!oldPrice || oldPrice <= price) return null;
  const percent = Math.round(((oldPrice - price) / oldPrice) * 100);
  const sizeClasses = {
    sm: "text-[8px] px-1 py-0.5 top-1 left-1",
    md: "text-[10px] px-2 py-0.5 top-2 left-2",
    lg: "text-xs px-2.5 py-1 top-3 left-3",
  };
  return (
    <span
      className={`absolute z-10 font-bold text-white bg-rose-500 rounded-md shadow-sm ${sizeClasses[size]}`}
    >
      -{percent}%
    </span>
  );
}
