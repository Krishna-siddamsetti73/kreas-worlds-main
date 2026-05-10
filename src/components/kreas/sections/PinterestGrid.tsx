import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import e1 from "@/assets/editorial-1.jpg";
import e2 from "@/assets/editorial-2.jpg";
import c1 from "@/assets/chrome-1.jpg";
import b1 from "@/assets/brutalist-1.jpg";
import g1 from "@/assets/gradient-mesh.jpg";

const tiles = [
  { src: e1, h: "h-72", c: "col-span-2" },
  { src: c1, h: "h-96", c: "col-span-2 md:col-span-1" },
  { src: g1, h: "h-56", c: "col-span-2 md:col-span-1" },
  { src: b1, h: "h-80", c: "col-span-2" },
  { src: e2, h: "h-96", c: "col-span-2 md:col-span-1" },
  { src: c1, h: "h-64", c: "col-span-2 md:col-span-1" },
];

export function PinterestGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--ink)] py-32 text-white">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-12 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">09 / Mood board</p>
          <h2 className="font-display text-4xl font-black md:text-6xl">Visual <span className="font-serif italic">notebook</span></h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              style={{ y: i % 2 === 0 ? y1 : y2 }}
              className={`relative overflow-hidden rounded-xl ${t.h} ${t.c}`}
            >
              <img src={t.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
