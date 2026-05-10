import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let r = 0;
    const start = performance.now();
    const dur = 1800;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) r = requestAnimationFrame(step);
    };
    r = requestAnimationFrame(step);
    return () => cancelAnimationFrame(r);
  }, [inView, to]);
  return <div ref={ref} className="font-display text-7xl font-black md:text-9xl">{n}{suffix}</div>;
}

export function Numbers() {
  const items = [
    { n: 142, s: "+", l: "Projects shipped" },
    { n: 38, s: "M", l: "Revenue generated" },
    { n: 12, s: "", l: "Worlds built" },
    { n: 99, s: "%", l: "Founder rebookings" },
  ];
  return (
    <section className="relative bg-white py-24 text-[var(--ink)] md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl font-display text-5xl font-black md:text-7xl"
        >
          GET RESULTS <span className="font-serif italic text-[var(--acid)]">like this.</span>
        </motion.h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.l} className="border-t-2 border-[var(--ink)] pt-6">
              <Counter to={it.n} suffix={it.s} />
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-[var(--ink)]/60">{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
