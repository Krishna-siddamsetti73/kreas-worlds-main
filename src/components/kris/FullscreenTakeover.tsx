import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const scenes = [
  { tag: "ACT I", line: "We start with truth.", bg: "var(--ink)", fg: "white" },
  { tag: "ACT II", line: "We design the system.", bg: "var(--ultra)", fg: "white" },
  { tag: "ACT III", line: "We compound the result.", bg: "var(--neon)", fg: "var(--ink)" },
];

export function FullscreenTakeover() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {scenes.map((s, i) => {
          const start = i / scenes.length;
          const end = (i + 1) / scenes.length;
          const fadeIn = Math.max(0, start - 0.05);
          const fadeOut = Math.min(1, end);
          const holdStart = Math.max(fadeIn + 0.0001, start);
          const holdEnd = Math.max(holdStart + 0.0001, Math.min(fadeOut - 0.0001, end - 0.05));
          const opacity = useTransform(scrollYProgress, [fadeIn, holdStart, holdEnd, fadeOut], [0, 1, 1, 0]);
          const y = useTransform(scrollYProgress, [start, end], ["20%", "-20%"]);
          return (
            <motion.div
              key={i}
              style={{ opacity, background: s.bg, color: s.fg }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <motion.div style={{ y }}>
                <div className="font-mono text-xs uppercase tracking-[0.5em] opacity-60">{s.tag}</div>
                <div className="mt-8 font-display text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.95] tracking-tight">
                  {s.line}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white mix-blend-difference">
          Takeover · keep scrolling
        </div>
      </div>
    </section>
  );
}