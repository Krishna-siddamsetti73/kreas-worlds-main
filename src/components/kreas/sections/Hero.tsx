import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [-1, 1], [-20, 20]);
  const ty = useTransform(my, [-1, 1], [-12, 12]);
  const [time, setTime] = useState("");
  useEffect(() => {
    const i = setInterval(() => setTime(new Date().toLocaleTimeString("en-GB")), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[var(--ink)] text-white grain"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(180,255,80,0.15),transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-32 md:px-12">
        <div className="grid grid-cols-12 gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
          <div className="col-span-3">[01] Studio</div>
          <div className="col-span-6 text-balance">
            A multi-disciplinary creative studio crafting brands, products & growth systems for
            ambitious founders.
          </div>
          <div className="col-span-3 text-right font-mono">{time} GMT</div>
        </div>

        <div className="mt-auto pb-12">
          <motion.h1
            style={{ x: tx, y: ty }}
            className="font-display text-[clamp(4rem,16vw,18rem)] font-black leading-[0.82] tracking-[-0.04em]"
          >
            <motion.span
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
              className="block"
            >
              kriyas BUILDS
            </motion.span>
            <motion.span
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.7, 0, 0.2, 1] }}
              className="block"
            >
              WHAT <span className="font-serif italic text-[var(--neon)]">others</span>
            </motion.span>
            <motion.span
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.7, 0, 0.2, 1] }}
              className="block"
            >
              CAN'T.
            </motion.span>
          </motion.h1>

          <div className="mt-12 grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 md:col-span-4 text-sm text-white/60">
              ↓ Scroll to enter the worlds
            </div>
            <div className="col-span-12 md:col-span-4 text-center text-xs uppercase tracking-[0.3em] text-white/40">
              EST · 2019 · LISBON / NYC
            </div>
            <div className="col-span-12 md:col-span-4 text-right text-xs uppercase tracking-[0.3em] text-white/60">
              12 worlds · 1 studio
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
