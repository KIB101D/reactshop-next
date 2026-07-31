import { HTMLAttributes } from "react";

export function Skeleton({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-xl ${className}`}
      {...props}
    />
  );
}
