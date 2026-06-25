"use client";

import { useEffect } from "react";
import StitchDivider from "@/components/StitchDivider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
        Something went wrong
      </p>

      <h1 className="font-display font-bold text-7xl sm:text-9xl tracking-tight text-ink leading-none">
        Oops.
      </h1>

      <p className="mt-6 text-stone-soft max-w-sm leading-relaxed">
        An unexpected error occurred. You can try again, or head back home if
        the problem persists.
      </p>

      <div className="w-48 my-8">
        <StitchDivider />
      </div>

      <div className="flex gap-4">
        <button
          onClick={reset}
          className="btn-press bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-cognac transition-colors"
        >
          Try Again
        </button>

        <a
          href="/"
          className="btn-press border border-ink text-ink font-mono text-xs uppercase tracking-widest px-8 py-4 hover:border-cognac hover:text-cognac transition-colors"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
