"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const { totalItems } = useCart();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl sm:text-3xl tracking-wide text-ink"
        >
          ANYTIME
        </Link>

        <nav className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-stone-soft">
          <Link href="/" className="hover:text-cognac transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-cognac transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-cognac transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest">
          {status === "loading" ? null : session ? (
            <div className="hidden sm:flex items-center gap-5">
              <Link
                href="/account"
                className="text-stone-soft hover:text-cognac transition-colors"
              >
                {session.user?.name?.split(" ")[0] ?? "Account"}
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-stone-soft hover:text-cognac transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline text-stone-soft hover:text-cognac transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-ink hover:text-cognac transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-2 -right-3 sm:-right-5 bg-cognac text-paper text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-sans"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Hamburger - mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="sm:hidden text-ink hover:text-cognac transition-colors"
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
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}