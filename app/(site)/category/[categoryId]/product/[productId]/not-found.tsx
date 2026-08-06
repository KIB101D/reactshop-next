import Link from "next/link";
import { PackageSearch, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] px-4 py-12 text-center">
      <div className="flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-slate-100 text-slate-400">
        <PackageSearch className="w-10 h-10" />
      </div>

      {/* Heading */}
      <h1 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mb-2">
        Product Not Found
      </h1>

      {/* 3. Description */}
      <p className="max-w-md text-sm sm:text-base text-gray-500 mb-8 leading-relaxed">
        Sorry, the product you are looking for doesn’t exist, has been removed,
        or is temporarily unavailable.
      </p>

      {/* 4. Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Search className="w-4 h-4" />
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}
