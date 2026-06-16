import StitchDivider from "@/components/StitchDivider";

export default function PrivacyTermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
        Legal
      </p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-ink mb-8">
        PRIVACY &amp; TERMS
      </h1>

      <div className="space-y-10 text-stone-soft leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            PRIVACY POLICY
          </h2>
          <p>
            We collect the information you provide when creating an
            account or placing an order &mdash; including your name,
            email address, shipping address, and phone number &mdash; in
            order to process and deliver your orders and provide customer
            support.
          </p>
          <p className="mt-3">
            Payment details are processed directly by our payment
            providers (Razorpay and Stripe) and are never stored on our
            servers. We do not sell or share your personal information
            with third parties for marketing purposes.
          </p>
          <p className="mt-3">
            You may request access to, correction of, or deletion of your
            personal data at any time by contacting us at{" "}
            <a
              href="mailto:hello@anytime.example"
              className="text-cognac hover:underline"
            >
              hello@anytime.example
            </a>
            .
          </p>
        </section>

        <div>
          <StitchDivider />
        </div>

        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            TERMS OF SERVICE
          </h2>
          <p>
            By using this website and placing an order, you agree to
            provide accurate information, and that all product
            descriptions, images, and prices are subject to change without
            notice. We reserve the right to refuse or cancel any order at
            our discretion, including in cases of suspected fraud or
            errors in pricing/availability.
          </p>
          <p className="mt-3">
            All content on this site &mdash; including text, images, and
            the Anytime name and logo &mdash; is the property of Anytime
            and may not be reproduced without permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink tracking-wide mb-3">
            GOVERNING LAW
          </h2>
          <p>
            These terms are governed by the laws of India. Any disputes
            will be subject to the exclusive jurisdiction of the courts
            in [Your City], India.
          </p>
        </section>

        <p className="font-mono text-xs uppercase tracking-widest text-stone-soft pt-4">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </main>
  );
}