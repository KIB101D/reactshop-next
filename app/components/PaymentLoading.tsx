import arasakaIcon from "../assets/arasaka-logo-lite.png";

function PaymentLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin" />

      <p className="text-sm text-gray-700">Processing payment...</p>

      <div className="flex items-center justify-center mt-6 text-sm tracking-wide text-gray-900">
        <img
          src={arasakaIcon}
          alt="Arasaka"
          className="object-contain w-7 h-7"
        />
        <span className="mx-2 ml-1">•</span>
        <span>secure your soul</span>
      </div>
    </div>
  );
}

export default PaymentLoading;
