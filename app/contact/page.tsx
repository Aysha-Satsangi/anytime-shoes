import StitchDivider from "@/components/StitchDivider";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
        Get In Touch
      </p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-ink mb-8">
        CONTACT US
      </h1>

      <p className="text-stone-soft leading-relaxed max-w-xl">
        Have a question about an order, sizing, or anything else? Reach
        out &mdash; we usually respond within 1-2 business days.
      </p>

      <div className="my-12">
        <StitchDivider />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="space-y-6 font-mono text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-cognac mb-1">
              Email
            </p>
            <a
              href="mailto:hello@anytime.example"
              className="text-ink hover:text-cognac transition-colors"
            >
              hello@anytime.example
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-cognac mb-1">
              Phone
            </p>
            <p className="text-ink">+91 00000 00000</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-cognac mb-1">
              Hours
            </p>
            <p className="text-ink">Mon &ndash; Sat, 10am &ndash; 6pm IST</p>
          </div>
        </div>

        {/* Simple mailto-based contact form - opens the user's email client */}
        <form
          action="mailto:hello@anytime.example"
          method="post"
          encType="text/plain"
          className="space-y-4"
        >
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-soft mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:border-cognac"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-soft mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:border-cognac"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-soft mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:border-cognac"
            />
          </div>
          <button
            type="submit"
            className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-cognac transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}