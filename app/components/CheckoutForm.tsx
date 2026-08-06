"use client";

import type { FormEvent, ChangeEvent } from "react";

type CheckoutFormProps = {
  onClose: () => void;
  subtotal: number;
  savings?: number;
  shipping: number;
  total: number;
  itemsCount: number;
  handlePay: () => void;
};

function CheckoutForm({
  onClose,
  subtotal,
  savings = 0,
  shipping,
  total,
  itemsCount,
  handlePay,
}: CheckoutFormProps) {
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        handlePay();
      }}
    >
      {/* Title */}
      <h2 className="mb-5 text-2xl font-semibold text-gray-900 font-heading">
        Payment Details
      </h2>

      {/* Inputs */}
      <div className="space-y-4">
        {/* Name Fields */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block mb-1 text-xs font-medium text-gray-500">
              First name
            </label>
            <input
              type="text"
              placeholder="James"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 text-xs font-medium text-gray-500">
              Last name
            </label>
            <input
              type="text"
              placeholder="Jones"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-500">
            Card number
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 16)
                .replace(/(.{4})/g, "$1 ")
                .trim();

              e.target.value = value;
            }}
            placeholder="1234 5678 9012 3456"
            required
            className="w-full px-3 py-2 text-sm transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
        </div>

        {/* Expiry & CVC */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block mb-1 text-xs font-medium text-gray-500">
              Expiry
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 4) value = value.slice(0, 4);

                if (value.length >= 3) {
                  value = value.slice(0, 2) + "/" + value.slice(2);
                }

                e.target.value = value;
              }}
              className="w-full px-3 py-2 text-sm transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 text-xs font-medium text-gray-500">
              CVC
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123"
              required
              maxLength={3}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full px-3 py-2 text-sm transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4 mt-6 border border-gray-200 bg-gray-50 rounded-xl">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">
          Order summary
        </h3>

        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Items ({itemsCount})</span>
            <span className="font-medium text-gray-900">${subtotal}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between">
              <span>Savings</span>
              <span className="font-medium text-gray-900">-${savings}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium text-gray-900">${shipping}</span>
          </div>

          <div className="flex justify-between pt-2.5 mt-2 text-base font-bold text-gray-900 border-t border-gray-200">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-2">
        <button
          type="submit"
          className="w-full py-3 text-sm font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition active:scale-[0.985] cursor-pointer"
        >
          Pay
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
