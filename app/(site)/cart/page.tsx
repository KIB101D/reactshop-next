"use client";

import { useCart } from "@/app/hooks/useCart";
import deleteIcon from "@/app/assets/delete-bin.svg";
import Link from "next/link";
import { useState } from "react";
import CheckoutModal from "@/app/components/CheckoutModal";
import { SaleBadge } from "@/app/components/SaleBadge";

function Cart() {
  const { cart, removeFromCart, increment, decrement, removeAllFromCart } =
    useCart();

  const subtotal = cart.reduce((sum, item) => {
    const originalPrice =
      item.oldPrice && item.oldPrice > item.price ? item.oldPrice : item.price;
    return sum + originalPrice * item.quantity;
  }, 0);

  const totalSavings = cart.reduce((sum, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return sum + (item.oldPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const discountedSubtotal = subtotal - totalSavings;

  const shipping = discountedSubtotal >= 50 || cart.length === 0 ? 0 : 10;

  const total = cart.length === 0 ? 0 : subtotal - totalSavings + shipping;

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = Object.keys(cart).length === 0;

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto sm:px-6">
      <h1 className="mb-10 text-3xl font-semibold text-gray-800 font-heading">
        Your Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr] animate-fade-in">
        {/* 🛒 Items List */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full space-y-4 max-w-none">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="mb-2 text-base font-medium text-gray-800 sm:text-xl">
                  Your cart is empty 🛒
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Looks like you haven’t added anything yet.{" "}
                  <Link
                    href="/"
                    className="text-gray-800 hover:underline hover:text-indigo-600"
                  >
                    Continue shopping
                  </Link>
                </p>
              </div>
            ) : (
              cart.map((product) => {
                const isOnSale =
                  product.oldPrice && product.oldPrice > product.price;

                return (
                  <div
                    key={product.id}
                    className="relative p-4 transition bg-white border border-gray-200 rounded-2xl hover:shadow-md"
                  >
                    {/* Delete Icon */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="absolute flex items-center justify-center text-gray-400 transition border border-gray-200 rounded-lg top-4 right-4 w-8 h-8 hover:text-red-500 hover:border-red-200 hover:bg-red-50 cursor-pointer z-10"
                    >
                      <img
                        src={deleteIcon.src}
                        alt="delete"
                        className="w-4 h-4 opacity-60 hover:opacity-100"
                      />
                    </button>

                    <div className="flex gap-4">
                      {/* Product Thumbnail */}
                      <div className="relative shrink-0">
                        <Link
                          href={`/category/${product.categoryId}/product/${product.id}`}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="object-cover w-20 h-20 transition bg-gray-50 rounded-xl hover:opacity-80"
                          />
                        </Link>
                        {isOnSale && (
                          <SaleBadge
                            price={product.price}
                            oldPrice={product.oldPrice}
                            size="md"
                          />
                        )}
                      </div>

                      {/* Info & Controls */}
                      <div className="flex flex-col justify-between flex-1 min-w-0 pr-8">
                        <div>
                          <Link
                            href={`/category/${product.categoryId}/product/${product.id}`}
                            className="font-semibold text-gray-900 transition hover:text-indigo-600 line-clamp-1"
                          >
                            {product.title}
                          </Link>

                          <Link
                            href={`/category/${product.categoryId}`}
                            className="inline-block mt-1 px-2 py-0.5 text-[11px] font-medium text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 capitalize"
                          >
                            {product.categoryId}
                          </Link>
                        </div>

                        {/* Controls & Price Row */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                            <button
                              onClick={() => decrement(product.id)}
                              className="flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-700 transition bg-white rounded-md shadow-xs hover:bg-gray-100 cursor-pointer"
                            >
                              −
                            </button>
                            <span className="px-1 text-xs font-semibold text-gray-800">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() => increment(product.id)}
                              className="flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-700 transition bg-white rounded-md shadow-xs hover:bg-gray-100 cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            {isOnSale && (
                              <span className="text-xs text-gray-400 line-through">
                                ${product.oldPrice! * product.quantity}
                              </span>
                            )}
                            <span className="text-base font-bold text-gray-900">
                              ${product.price * product.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 💳 Summary */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm h-fit rounded-2xl lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 font-heading">
            Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${subtotal}</span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between font-medium text-gray-900">
                <span>Savings</span>
                <span>-${totalSavings}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">${shipping}</span>
            </div>

            <div className="flex justify-between pt-3 mt-3 text-base font-bold text-gray-900 border-t border-gray-100">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={isEmpty}
            className={`w-full py-3.5 mt-6 text-sm font-semibold rounded-xl transition cursor-pointer 
          ${
            isEmpty
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 active:scale-[0.985]"
          }`}
          >
            Checkout
          </button>

          {isCheckoutOpen && (
            <CheckoutModal
              onClose={() => setIsCheckoutOpen(false)}
              subtotal={discountedSubtotal}
              shipping={shipping}
              savings={totalSavings}
              total={total}
              itemsCount={itemsCount}
              removeAllFromCart={removeAllFromCart}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
