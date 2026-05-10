import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  { n: "01", title: "ATLAS / FINTECH", tag: "Brand + product", color: "from-[var(--ink)] to-[#1a1a2e]" },
  { n: "02", title: "NOVA / AI HEALTH", tag: "Identity system", color: "from-[var(--acid)] to-[#ff6b35]" },
  { n: "03", title: "ORBIT / SPACE-TECH", tag: "Web platform", color: "from-[var(--ultra)] to-[#0a0a23]" },
  { n: "04", title: "RIVET / D2C", tag: "Growth + content", color: "from-[var(--neon)] to-[#7fb800]" },
  { n: "05", title: "HALO / CREATOR", tag: "Product OS", color: "from-[#ff006e] to-[#8338ec]" },
];

export function HorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  return (
    <section ref={ref} className="relative h-[400vh] bg-[var(--ink)] text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50 md:left-12">
          04 / Recent work — scroll →
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-12">
          {projects.map((p) => (
            <div key={p.n} className="relative h-[70vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl md:w-[60vw]">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
              <div className="absolute inset-0 grain" />
              <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                <div className="flex justify-between font-mono text-xs uppercase tracking-[0.3em]">
                  <span>{p.n}</span><span>{p.tag}</span>
                </div>
                <div className="font-display text-5xl font-black md:text-8xl">{p.title}</div>
              </div>
            </div>
          ))}
          <div className="w-[20vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
