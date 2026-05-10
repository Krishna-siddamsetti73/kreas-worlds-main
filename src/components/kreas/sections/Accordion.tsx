import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const items = [
  { q: "Who is KREAS for?", a: "Founders raising or scaling, brands at an inflection point, and creative teams that want a partner — not a vendor." },
  { q: "What does an engagement look like?", a: "12-week sprints. One brand lead, one product lead, one growth lead. Weekly demos, monthly board reviews, daily Slack." },
  { q: "How much does it cost?", a: "We work in fixed-scope retainers from $40k/mo. Equity-shared engagements available for breakout-stage founders." },
  { q: "Where are you located?", a: "Studios in Lisbon and Brooklyn. We work async with founders across 14 timezones." },
  { q: "Do you take equity?", a: "Sometimes. We're picky. The bar is: would we have invested anyway?" },
];

export function AccordionFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-white py-32 text-[var(--ink)]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <h2 className="mb-16 font-display text-4xl font-black md:text-7xl">FAQ <span className="font-serif italic text-[var(--ink)]/40">— ask us anything</span></h2>
        <div>
          {items.map((it, i) => (
            <div key={i} className="border-t border-[var(--ink)]/15 last:border-b">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor="hover"
                className="flex w-full items-center justify-between py-7 text-left"
              >
                <span className="font-display text-2xl font-bold md:text-4xl">{it.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-3xl">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-7 text-lg text-[var(--ink)]/70">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
