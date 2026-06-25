import StitchDivider from "@/components/StitchDivider";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Anytime — our story, our craft, and our commitment to premium authentic leather shoes.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
          Our Story
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-ink mb-8">
          About Anytime
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-6 text-stone-soft leading-relaxed">
          <p>
            Anytime was started with a simple idea: a pair of shoes should be
            good enough to wear anywhere, and last long enough to be worn
            everywhere. No occasion-only shoes that sit in a box, no
            synthetic uppers that crack within a year &mdash; just honest,
            full-grain leather footwear built for daily life.
          </p>

          <p>
            Every pair we make starts with carefully selected leather,
            finished and stitched by hand. We keep our range focused &mdash;
            a small collection of formal shoes, loafers, and sneakers &mdash;
            so that every style gets the attention it deserves rather than
            being one of hundreds.
          </p>

          <p>
            We&apos;re based in India and ship across the country as well as
            internationally. Whether you&apos;re dressing for the office,
            travelling, or just heading out for the day &mdash; these are
            shoes meant to keep up.
          </p>
        </div>
      </Reveal>

      <div className="my-12">
        <StitchDivider />
      </div>

      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono text-xs uppercase tracking-widest">
          <div>
            <p className="text-cognac mb-2">Material</p>
            <p className="text-stone-soft">Full-grain genuine leather</p>
          </div>
          <div>
            <p className="text-cognac mb-2">Craft</p>
            <p className="text-stone-soft">Hand-finished, hand-stitched</p>
          </div>
          <div>
            <p className="text-cognac mb-2">Shipping</p>
            <p className="text-stone-soft">India &amp; Worldwide</p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}