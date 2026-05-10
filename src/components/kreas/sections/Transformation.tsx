import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, 0]);
  const hue = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const filter = useTransform([blur, hue], ([b, h]: number[]) => `blur(${b}px) hue-rotate(${h}deg)`);
  const stage = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);

  return (
    <section ref={ref} className="relative bg-[var(--bone)] py-32 text-[var(--ink)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/50">02 / Transformation</p>
          <h2 className="max-w-2xl text-balance font-display text-4xl font-black md:text-7xl">
            From <span className="font-serif italic text-[var(--acid)]">chaos</span> to clarity.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* MESSY */}
          <motion.div
            style={{ skewX: skew, filter }}
            className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[var(--ink)] p-6 text-white animate-glitch"
          >
            <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_4px)]" />
            <div className="relative">
              <div className="text-xs font-mono">BEFORE</div>
              <div className="mt-3 flex flex-wrap gap-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="h-3 w-8 bg-white/40" style={{ transform: `rotate(${(i * 23) % 30 - 15}deg)` }} />
                ))}
              </div>
              <div className="mt-6 font-display text-3xl font-black">N0!se</div>
              <div className="mt-2 text-xs">{"<<error>> chaos /// no system"}</div>
            </div>
          </motion.div>

          {/* MORPH */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--acid)] to-[var(--ultra)] p-6 text-white">
            <div className="text-xs font-mono">PROCESS</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/60"
            />
            <motion.div
              style={{ scale: useTransform(stage, [0, 1, 2], [0.6, 1, 1.2]) }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-black"
            >
              ⟶
            </motion.div>
            <div className="absolute bottom-6 left-6 right-6 font-display text-xl font-bold leading-tight">
              We rebuild the system from the inside.
            </div>
          </div>

          {/* CLEAN */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white p-8 text-[var(--ink)]">
            <div className="text-xs font-mono text-[var(--ink)]/50">AFTER</div>
            <div className="mt-6 space-y-3">
              {["Brand system", "Product UX", "Growth engine", "Content OS"].map((t) => (
                <div key={t} className="flex items-center justify-between border-b border-[var(--ink)]/15 pb-3">
                  <span className="text-sm">{t}</span>
                  <span className="text-xs text-[var(--neon)]">●●●●</span>
                </div>
              ))}
            </div>
            <div className="mt-10 font-display text-4xl font-black">Clarity.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
