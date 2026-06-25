import Link from "next/link";
import StitchDivider from "@/components/StitchDivider";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
        Error 404
      </p>

      <h1 className="font-display font-bold text-7xl sm:text-9xl tracking-tight text-ink leading-none">
        Lost.
      </h1>

      <p className="mt-6 text-stone-soft max-w-sm leading-relaxed">
        This page doesn&apos;t exist — it may have been moved, deleted, or the
        link might be wrong.
      </p>

      <div className="w-48 my-8">
        <StitchDivider />
      </div>

      <Link
        href="/"
        className="btn-press bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-cognac transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}