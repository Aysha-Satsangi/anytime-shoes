"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Product = {
  slug: string;
  name: string;
  images: { url: string; altText: string | null }[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroIntro({ featured }: { featured?: Product }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs uppercase tracking-widest text-cognac mb-4"
        >
          Full-Grain Leather &mdash; Handcrafted
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-wide text-ink"
        >
          BUILT TO LAST.
          <br />
          <span className="text-cognac">WORN ANYTIME.</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-stone-soft max-w-md"
        >
          Every pair is cut from genuine leather and finished by hand. No
          shortcuts, no synthetic substitutes &mdash; shoes meant to be worn in,
          not worn out.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="#collection"
            className="inline-block mt-8 bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300 hover:bg-cognac"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>

      {featured?.images[0] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square bg-paper rounded-sm overflow-hidden border border-line"
        >
          <Image
            src={featured.images[0].url}
            alt={featured.images[0].altText ?? featured.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
            priority
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-paper/90 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest text-ink px-3 py-2 border border-line">
            Featured &mdash; {featured.name}
          </div>
        </motion.div>
      )}
    </section>
  );
}
