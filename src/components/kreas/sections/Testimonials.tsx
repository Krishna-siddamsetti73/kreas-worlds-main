import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const quotes = [
  {
    q: "kriyas rebuilt our entire growth engine in 90 days. We tripled MRR.",
    a: "Sam K. — CEO, Atlas",
  },
  {
    q: "Their brand work made us look ten years older — in the best way.",
    a: "Lina M. — Founder, Nova",
  },
  { q: "We hired kriyas instead of a CMO. Best decision we made.", a: "Devon T. — CEO, Orbit" },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xRight = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);
  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--neon)] py-32 text-[var(--ink)]"
    >
      <p className="mb-12 px-6 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/60 md:px-12">
        11 / Words from clients
      </p>
      <div className="space-y-16">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            style={{ x: i % 2 === 0 ? xRight : xLeft }}
            className="whitespace-nowrap"
          >
            <span className="font-serif text-5xl italic md:text-8xl">"{q.q}"</span>
            <span className="ml-12 font-mono text-sm uppercase tracking-[0.2em]">— {q.a}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
