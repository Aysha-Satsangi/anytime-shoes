"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/privacy-terms", label: "Privacy & Terms" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session, status } = useSession();

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-ink/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-paper border-l border-line z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-line">
          <span className="font-display text-xl tracking-tight text-ink">
            MENU
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-ink hover:text-cognac transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-6 font-mono text-sm uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-ink hover:text-cognac transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-line mx-6" />

        <div className="flex flex-col px-6 py-8 gap-6 font-mono text-sm uppercase tracking-widest">
          {status === "loading" ? null : session ? (
            <>
              <Link
                href="/account"
                onClick={onClose}
                className="text-ink hover:text-cognac transition-colors"
              >
                {session.user?.name?.split(" ")[0] ?? "Account"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  signOut({ callbackUrl: "/" });
                }}
                className="text-left text-stone-soft hover:text-cognac transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="text-ink hover:text-cognac transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}