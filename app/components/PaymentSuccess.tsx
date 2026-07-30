type PaymentSuccessProps = {
  onContinue: () => void;
};

function PaymentSuccess({ onContinue }: PaymentSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* Checkmark */}
      <div className="flex items-center justify-center w-12 h-12 mb-4 border border-gray-300 rounded-full">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="none">
          <path
            d="M6 12l4 4 8-8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-path"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-sm font-medium text-gray-900 animate-[fadeIn_0.3s_ease_0.3s_forwards] opacity-0">
        Payment successful
      </p>

      <p className="mt-1 text-xs text-gray-500 opacity-0 animate-[fadeIn_0.4s_ease_0.5s_forwards]">
        Your order has been processed
      </p>

      {/* Re-direct button */}
      <button
        onClick={onContinue}
        className="px-5 py-2.5 mt-6 text-base font-medium text-white transition bg-black rounded-lg hover:bg-gray-800 active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  );
}

export default PaymentSuccess;
