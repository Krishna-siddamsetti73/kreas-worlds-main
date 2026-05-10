import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", t: "Listen", d: "Two weeks deep with you & your team." },
  { n: "02", t: "Map", d: "We chart the system — brand, product, growth." },
  { n: "03", t: "Build", d: "Designers + engineers + strategists in one room." },
  { n: "04", t: "Ship", d: "We launch in cycles, measured, never quiet." },
  { n: "05", t: "Compound", d: "We stay. The system keeps paying off." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" ref={ref} className="relative bg-[var(--bone)] py-32 text-[var(--ink)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/50">06 / Process</p>
          <h2 className="max-w-2xl text-balance text-right font-display text-4xl font-black md:text-7xl">
            How we <span className="font-serif italic">build</span>.
          </h2>
        </div>

        <div className="relative grid grid-cols-[80px_1fr] gap-6 md:grid-cols-[120px_1fr] md:gap-12">
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--ink)]/15" />
            <motion.div style={{ height: lineH }} className="absolute left-1/2 top-0 w-px bg-[var(--acid)]" />
          </div>
          <div className="space-y-20">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="grid grid-cols-12 items-baseline gap-4"
              >
                <div className="col-span-2 font-mono text-sm">{s.n}</div>
                <div className="col-span-10 md:col-span-6">
                  <div className="font-display text-5xl font-black md:text-7xl">{s.t}</div>
                </div>
                <div className="col-span-12 max-w-md text-balance text-base text-[var(--ink)]/70 md:col-span-4">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
