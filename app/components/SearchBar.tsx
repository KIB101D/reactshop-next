import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

function SearchBar({
  value,
  onChange,
  onKeyDown,
  onClear,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <div className="relative flex-1 sm:flex-initial w-full md:max-w-[220px] lg:max-w-[260px] group">
      {/* Background Glow */}
      <div className="absolute -inset-2 bg-indigo-100/30 rounded-[2.5rem] blur-2xl opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 pointer-events-none" />

      <div className="relative flex items-center overflow-hidden rounded-xl border border-gray-200/80 bg-white/50 transition-all duration-300 hover:border-gray-300 group-focus-within:border-gray-400 group-focus-within:bg-white group-focus-within:shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex-shrink-0 pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="
            w-full bg-transparent 
            pl-2 pr-8 py-2 
            text-sm text-gray-800 
            outline-none 
            placeholder:text-transparent
            min-[400px]:placeholder:text-gray-400
            font-light
          "
        />

        <div className="absolute right-0 flex items-center pr-1 -translate-y-1/2 top-1/2">
          <button
            type="button"
            onClick={onClear}
            className={`flex items-center justify-center p-2 text-gray-400 transition-all duration-200 hover:text-black ${
              value
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <span className="leading-none text-[10px]">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
