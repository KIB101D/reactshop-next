"use client";

import { toast } from "sonner";
import Link from "next/link";
import type { Product } from "../types";
export const showAddToCartToast = (product: Product) => {
  toast(
    <div className="flex items-center gap-4 py-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-10 h-10 border border-gray-100 rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-gray-900">
          {product.title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Added to cart</span>
          <span className="text-gray-300">•</span>
          <Link
            href="/cart"
            className="text-xs font-semibold text-indigo-600 underline-offset-2 hover:underline"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>,
    {
      className:
        "rounded-2xl border-none shadow-md bg-white/95 backdrop-blur-md px-4 py-3",
      duration: 3000,
    },
  );
};

export const showRemoveFromCartToast = (item: Product, onUndo: () => void) => {
  const id = toast.info(
    <div className="flex items-center justify-center w-full gap-2 text-xs text-gray-700 sm:gap-3 sm:text-sm">
      <span className="truncate">
        <span className="font-medium text-gray-900">{item.title}</span> removed
      </span>

      <button
        onClick={() => {
          onUndo();
          toast.dismiss(id);
        }}
        className="text-xs font-medium text-indigo-600 active:opacity-70 sm:px-3 sm:py-1 sm:border sm:border-gray-200 sm:rounded-md sm:hover:bg-gray-50 whitespace-nowrap"
      >
        Undo
      </button>
    </div>,
    {
      duration: 3000,
      position: "top-center",
      className: "flex justify-center w-full px-2 sm:px-0",
    },
  );
};
