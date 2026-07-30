import type { FormEvent, ChangeEvent } from "react";

type CheckoutFormProps = {
  onClose: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  itemsCount: number;
  handlePay: () => void;
};

function CheckoutForm({
  onClose,
  subtotal,
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
      <h2 className="mb-5 text-2xl font-semibold text-gray-900">
        Payment Details
      </h2>

      {/* Inputs */}
      <div className="space-y-4">
        {/* Name */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block mb-1 text-xs text-gray-500">
              First name
            </label>
            <input
              placeholder="James"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 text-xs text-gray-500">
              Last name
            </label>
            <input
              placeholder="Jones"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Card */}
        <div>
          <label className="block mb-1 text-xs text-gray-500">
            Card number
          </label>
          <input
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
            className="w-full px-3 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
        </div>

        {/* Expiry + CVC */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block mb-1 text-xs text-gray-500">Expiry</label>
            <input
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
              className="w-full px-3 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 text-xs text-gray-500">CVC</label>
            <input
              inputMode="numeric"
              placeholder="123"
              required
              maxLength={3}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full px-3 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 mt-6 border border-gray-200 bg-gray-50 rounded-xl">
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          Order summary
        </h3>

        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Items</span>
            <span>
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>

          <div className="flex justify-between pt-2 mt-2 text-base font-semibold text-gray-900 border-t">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-2">
        <button
          type="submit"
          className="w-full py-2.5 text-white bg-black rounded-xl hover:bg-gray-800 transition active:scale-[0.99]"
        >
          Pay
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
