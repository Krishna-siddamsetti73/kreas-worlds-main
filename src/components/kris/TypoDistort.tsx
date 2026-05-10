import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = ["BUILD", "BREAK", "SHIP", "REPEAT"];

export function TypoDistort() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="relative bg-[var(--ink)] py-40 text-white overflow-hidden">
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 px-6 md:px-12">02 / Loop</div>
      <div className="mt-12 space-y-2">
        {words.map((w, i) => {
          const stretch = useTransform(scrollYProgress, [0, 1], [0.6 + i * 0.1, 1.6 - i * 0.15]);
          const skew = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -8 : 8, 0]);
          const x = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? "-10%" : "10%", "0%"]);
          return (
            <motion.div
              key={w}
              style={{ scaleX: stretch, skewY: skew, x }}
              className="font-display text-[clamp(4rem,18vw,20rem)] font-black leading-[0.78] tracking-[-0.05em] origin-left px-6 md:px-12"
            >
              {i === 2 ? <span className="font-serif italic text-[var(--neon)]">{w}</span> : w}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}