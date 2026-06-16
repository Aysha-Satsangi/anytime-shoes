import Link from "next/link";
import StitchDivider from "@/components/StitchDivider";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <StitchDivider />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl tracking-wide text-ink">
            ANYTIME
          </p>
          <p className="text-sm text-stone-soft mt-2 max-w-xs">
            Full-grain leather shoes, built to be worn every day, anywhere
            you go.
          </p>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-stone-soft">
          <p className="text-cognac mb-3">Company</p>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-cognac transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cognac transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-stone-soft">
          <p className="text-cognac mb-3">Policies</p>
          <ul className="space-y-2">
            <li>
              <Link href="/shipping-returns" className="hover:text-cognac transition-colors">
                Shipping &amp; Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy-terms" className="hover:text-cognac transition-colors">
                Privacy &amp; Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 font-mono text-xs text-stone-soft/70">
        &copy; {new Date().getFullYear()} Anytime. All rights reserved.
      </div>
    </footer>
  );
}