import StitchDivider from "@/components/StitchDivider";

export default function ShippingReturnsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
        Policies
      </p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-ink mb-8">
        SHIPPING &amp; RETURNS
      </h1>

      <div className="space-y-10 text-stone-soft leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            SHIPPING &mdash; INDIA
          </h2>
          <p>
            Orders within India are typically dispatched within 1-2
            business days and delivered within 3-7 business days,
            depending on your location. You&apos;ll receive a tracking
            link by email once your order ships.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            SHIPPING &mdash; INTERNATIONAL
          </h2>
          <p>
            International orders are dispatched within 2-4 business days
            and generally arrive within 7-15 business days depending on
            the destination country and customs processing. Any import
            duties or taxes charged by your country are the
            responsibility of the customer.
          </p>
        </section>

        <div>
          <StitchDivider />
        </div>

        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            RETURNS &amp; EXCHANGES
          </h2>
          <p>
            If your shoes don&apos;t fit or you&apos;re not happy with
            them, you can request a return or exchange within{" "}
            <strong className="text-ink">7 days</strong> of delivery.
            Items must be unworn, in their original packaging, with all
            tags attached.
          </p>
          <p className="mt-3">
            To start a return, contact us at{" "}
            <a
              href="mailto:hello@anytime.example"
              className="text-cognac hover:underline"
            >
              hello@anytime.example
            </a>{" "}
            with your order ID. Once we receive and inspect the returned
            item, refunds are processed to your original payment method
            within 5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            DAMAGED OR INCORRECT ITEMS
          </h2>
          <p>
            If your order arrives damaged or you received the wrong item,
            contact us within 48 hours of delivery with photos of the
            product and packaging, and we&apos;ll arrange a replacement
            or refund at no extra cost.
          </p>
        </section>
      </div>
    </main>
  );
}