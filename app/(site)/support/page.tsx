function Support() {
  return (
    <div className="w-full max-w-4xl py-6 mx-auto sm:py-10 animate-fade-in">
      <div className="pb-6 border-b border-gray-100">
        <h1 className="text-gray-900 font-heading font-semibold tracking-tight text-[clamp(1.8rem,3vw,3rem)]">
          Support
        </h1>

        <p className="max-w-xl mt-3 text-base leading-relaxed text-gray-500">
          This page contains the most common support information for ReactShop.
        </p>
      </div>

      <div className="grid gap-4 mt-8 md:grid-cols-2">
        <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
            Shipping
          </p>

          <p className="mt-3 leading-relaxed text-gray-600">
            Orders are usually processed within 1–2 business days.
          </p>
        </div>

        <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
            Returns
          </p>

          <p className="mt-3 leading-relaxed text-gray-600">
            Returns are accepted within 14 days after delivery.
          </p>
        </div>

        <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
            Payments
          </p>

          <p className="mt-3 leading-relaxed text-gray-600">
            Visa, Mastercard and PayPal are supported.
          </p>
        </div>

        <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
            Found a bug?
          </p>

          <p className="mt-3 leading-relaxed text-gray-600">
            Feel free to open an issue or contact me through GitHub.
          </p>

          <a
            href="https://github.com/KIB101D"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
          >
            github.com/KIB101D
          </a>
        </div>
      </div>
    </div>
  );
}

export default Support;
