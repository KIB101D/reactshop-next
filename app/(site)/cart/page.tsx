"use client";

import { useCart } from "@/app/hooks/useCart";
import deleteIcon from "@/app/assets/delete-bin.svg";
import Link from "next/link";
import { useState } from "react";
import CheckoutModal from "@/app/components/CheckoutModal";

function Cart() {
  const { cart, removeFromCart, increment, decrement, removeAllFromCart } =
    useCart();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = Object.keys(cart).length === 0;

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto sm:px-6">
      <h1 className="mb-10 text-3xl font-semibold text-gray-800 font-heading">
        Your Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr] animate-fade-in">
        {/* 🛒 Items */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full space-y-6 max-w-none">
            {/* Item */}
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
              cart.map((product) => (
                <div
                  key={product.id}
                  className="relative p-5 transition bg-white border rounded-xl hover:shadow-lg"
                >
                  {/* 🗑 ICON */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="absolute flex items-center justify-center text-gray-400 transition border border-gray-300 rounded-md top-3 right-3 w-7 h-7 hover:text-red-500 hover:border-red-300 hover:bg-red-50"
                  >
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className="w-4 h-4 opacity-70 hover:opacity-100"
                    />
                  </button>
                  <div className="flex gap-4">
                    <Link
                      href={`/category/${product.categoryId}/product/${product.id}`}
                    >
                      <img
                        src={product.image}
                        className="object-cover w-20 h-20 transition bg-gray-100 rounded-lg shrink-0 hover:opacity-80"
                      />
                    </Link>

                    <div className="flex flex-col justify-between flex-1">
                      {/* title */}
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/category/${product.categoryId}/product/${product.id}`}
                          className="font-medium text-gray-800 transition w-fit hover:text-indigo-600"
                        >
                          {product.title}
                        </Link>

                        <Link
                          href={`/category/${product.categoryId}`}
                          className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md w-fit hover:bg-gray-200"
                        >
                          {product.categoryId}
                        </Link>
                      </div>

                      {/* controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decrement(product.id)}
                            className="flex items-center justify-center text-gray-800 transition bg-gray-200 rounded-lg w-7 h-7 hover:bg-gray-300"
                          >
                            −
                          </button>

                          <span className="text-sm font-medium">
                            {product.quantity}
                          </span>

                          <button
                            onClick={() => increment(product.id)}
                            className="flex items-center justify-center text-gray-800 transition bg-gray-200 rounded-lg w-7 h-7 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-semibold ">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 💳 Summary */}
        <div className="p-6 bg-white border shadow-sm h-fit rounded-xl lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Summary</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>

            <div className="flex justify-between pt-3 mt-3 text-base font-semibold text-gray-900 border-t">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={isEmpty}
            className={`w-full py-3 mt-6 rounded-xl transition 
          ${
            isEmpty
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:scale-[1.01] hover:bg-gray-800"
          }`}
          >
            Checkout
          </button>
          {isCheckoutOpen && (
            <CheckoutModal
              onClose={() => setIsCheckoutOpen(false)}
              subtotal={subtotal}
              shipping={shipping}
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
