import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ImageSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.05, 0.85]);
  const hue = useTransform(scrollYProgress, [0, 1], [120, 320]);
  const hue2 = useTransform(scrollYProgress, [0, 1], [180, 380]);
  const hue3 = useTransform(scrollYProgress, [0, 1], [300, 500]);
  const stop1 = useTransform(scrollYProgress, [0, 1], [20, 70]);
  const stop2 = useTransform(scrollYProgress, [0, 1], [60, 95]);
  const radius = useTransform(scrollYProgress, [0, 1], ["48%", "12%"]);
  const bg = useMotionTemplate`conic-gradient(from 0deg, hsl(${hue} 90% 55%), hsl(${hue2} 80% 60%) ${stop1}%, hsl(${hue3} 70% 45%) ${stop2}%, hsl(${hue} 90% 55%))`;

  return (
    <section ref={ref} className="relative h-[400vh] bg-[var(--bone)] text-[var(--ink)]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.4em] md:left-12 md:top-12">03 / Assemble</div>
      <motion.div
          style={{ rotate, scale, borderRadius: radius, background: bg }}
          className="h-[60vmin] w-[60vmin] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.4)]"
        />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.3em]">
          MODULE_01 → MODULE_04 · scroll to assemble
        </div>
      </div>
    </section>
  );
}