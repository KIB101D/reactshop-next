export default function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="relative w-12 h-12">
        <svg
          className="w-full h-full animate-spin text-indigo-600"
          viewBox="0 0 50 50"
          fill="none"
        >
          <circle
            cx="25"
            cy="25"
            r="22"
            stroke="currentColor"
            strokeWidth="1.4"
            className="opacity-15"
          />

          <circle
            cx="25"
            cy="25"
            r="22"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="opacity-90 animate-elastic-line"
          />
        </svg>
      </div>

      <p className="text-xs font-light tracking-widest text-gray-400 font-heading uppercase">
        Searching...
      </p>
    </div>
  );
}
