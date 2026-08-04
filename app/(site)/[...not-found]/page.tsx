import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 w-full min-h-[60vh] flex-col items-center justify-center text-center px-4 py-12 my-auto">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        404 error
      </span>

      <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        Page Not Found
      </h1>

      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
