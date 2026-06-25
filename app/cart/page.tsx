"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPriceINR } from "@/lib/format";
import StitchDivider from "@/components/StitchDivider";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display font-bold text-4xl tracking-tight text-ink mb-3">
          Your Cart
        </h1>
        <p className="text-stone-soft mb-8">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-cognac transition-colors"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-4xl tracking-tight text-ink mb-8">
        Your Cart
      </h1>

      <div className="divide-y divide-line">
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-4 py-6">
            <div className="relative w-24 h-24 bg-paper border border-line overflow-hidden flex-shrink-0">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  sizes="96px"
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <Link
                href={`/products/${item.productSlug}`}
                className="text-ink hover:text-cognac transition-colors"
              >
                {item.productName}
              </Link>
              <p className="font-mono text-xs uppercase tracking-widest text-stone-soft mt-1">
                {item.color} / Size {item.size}
              </p>
              <p className="font-mono text-sm text-cognac mt-1">
                {formatPriceINR(item.price)}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity - 1)
                  }
                  className="w-7 h-7 border border-line text-ink hover:border-cognac transition-colors font-mono"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity + 1)
                  }
                  className="w-7 h-7 border border-line text-ink hover:border-cognac transition-colors font-mono"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.variantId)}
                  className="ml-4 font-mono text-xs uppercase tracking-widest text-stone-soft hover:text-cognac transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="text-right font-mono text-sm text-ink">
              {formatPriceINR(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <StitchDivider />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="font-display font-bold text-2xl tracking-tight text-ink">
          Total
        </span>
        <span className="font-mono text-xl text-cognac">
          {formatPriceINR(totalPrice)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="block w-full mt-6 bg-ink text-paper font-mono text-xs uppercase tracking-widest py-4 hover:bg-cognac transition-colors text-center"
      >
        Proceed to Checkout
      </Link>
    </main>
  );
}