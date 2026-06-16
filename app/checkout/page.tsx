"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPriceINR } from "@/lib/format";
import { createOrder } from "@/lib/actions/order";
import StitchDivider from "@/components/StitchDivider";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const orderId = await createOrder({
        cartItems: items.map((i) => ({
          variantId: i.variantId,
          quantity: i.quantity,
        })),
        shipping: form,
      });

      clearCart();
      router.push(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-soft">
          Your cart is empty &mdash; add something before checking out.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl tracking-wide text-ink mb-8">
        CHECKOUT
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
          <p className="font-mono text-xs uppercase tracking-widest text-cognac">
            Shipping Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <Input
            label="Address Line 1"
            name="line1"
            value={form.line1}
            onChange={handleChange}
            required
          />
          <Input
            label="Address Line 2 (Optional)"
            name="line2"
            value={form.line2}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
            <Input
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
            />
            <Input
              label="Postal Code"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border border-line bg-paper px-3 py-3 text-sm focus:outline-none focus:border-cognac"
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && (
            <p className="font-mono text-xs uppercase tracking-widest text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ink text-paper font-mono text-xs uppercase tracking-widest py-4 hover:bg-cognac transition-colors disabled:bg-line disabled:text-stone-soft"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order summary */}
        <div className="h-fit">
          <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
            Order Summary
          </p>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex justify-between text-sm gap-2"
              >
                <span className="text-stone-soft">
                  {item.productName}
                  <span className="block font-mono text-xs uppercase tracking-widest mt-0.5">
                    {item.color}, {item.size} &times; {item.quantity}
                  </span>
                </span>
                <span className="font-mono text-ink whitespace-nowrap">
                  {formatPriceINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <StitchDivider />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-display text-xl tracking-wide text-ink">
              TOTAL
            </span>
            <span className="font-mono text-lg text-cognac">
              {formatPriceINR(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-line bg-paper px-3 py-3 text-sm focus:outline-none focus:border-cognac"
      />
    </div>
  );
}