import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Footer } from "@/components/kreas/sections/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — KRIS" },
      { name: "description", content: "The story, timeline, team and values behind KRIS." },
      { property: "og:title", content: "About — KRIS" },
      { property: "og:description", content: "Built by a small team of operators, designers and engineers." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-black text-white">
      <CinematicSubtitles />
      <TimelinePath />
      <TeamExperimental />
      <ValuesAccordion />
      <Footer />
    </main>
  );
}

const lines = [
  "We started with one belief.",
  "That brand, product and growth aren't departments —",
  "they're a single system.",
  "KRIS is the studio that builds it.",
];

function CinematicSubtitles() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        {lines.map((l, i) => {
          const start = i / lines.length;
          const end = (i + 1) / lines.length;
          const a = Math.max(0, start - 0.05);
          const b = Math.max(a + 0.0001, start + 0.05);
          const d = Math.min(1, end);
          const c = Math.max(b + 0.0001, Math.min(d - 0.0001, end - 0.05));
          const opacity = useTransform(scrollYProgress, [a, b, c, d], [0, 1, 1, 0]);
          const y = useTransform(scrollYProgress, [start, end], [20, -20]);
          return (
            <motion.div
              key={i}
              style={{ opacity, y }}
              className="absolute max-w-4xl text-center font-display text-3xl font-black leading-tight md:text-6xl"
            >
              {l}
            </motion.div>
          );
        })}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          Subtitles · 01—04
        </div>
      </div>
    </section>
  );
}

const milestones = [
  { year: "2019", text: "Founded in Lisbon by two operators and a designer." },
  { year: "2021", text: "First exit. Brand + growth system at Northwind." },
  { year: "2023", text: "Brooklyn studio opens. Team of 12." },
  { year: "2025", text: "Launched the Lab. Open-source design tools." },
  { year: "2026", text: "You, here, reading this." },
];

function TimelinePath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="relative bg-[var(--bone)] px-6 py-32 text-[var(--ink)] md:px-12">
      <div className="font-mono text-xs uppercase tracking-[0.4em] opacity-50">Timeline · 2019—now</div>
      <div className="relative mt-16">
        <svg className="absolute left-6 top-0 h-full w-2" viewBox="0 0 4 1000" preserveAspectRatio="none">
          <motion.line
            x1="2" y1="0" x2="2" y2="1000"
            stroke="var(--ink)" strokeWidth="2"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        <ol className="space-y-16 pl-20">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <div className="absolute -left-[60px] top-2 h-3 w-3 rounded-full bg-[var(--ink)]" />
              <div className="font-mono text-sm opacity-60">{m.year}</div>
              <div className="mt-2 font-display text-3xl font-black md:text-5xl">{m.text}</div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TeamExperimental() {
  return (
    <section className="bg-[var(--ink)] px-6 py-32 text-white md:px-12">
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">Team · three behaviors</div>
      <h2 className="mt-6 font-display text-5xl font-black md:text-7xl">Hover each one.</h2>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <FlipCard name="Mira" role="Founder · Strategy" />
        <DistortCard name="Jules" role="Design · Director" />
        <MaskCard name="Theo" role="Engineering · Lead" />
      </div>
    </section>
  );
}

function FlipCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="group relative aspect-[3/4] [perspective:1000px]" data-cursor="hover">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--ultra)] to-[var(--ink)] p-8 [backface-visibility:hidden]">
          <div className="absolute bottom-6 left-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">{role}</div>
            <div className="font-display text-4xl font-black">{name}</div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-[var(--neon)] p-8 text-[var(--ink)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-serif text-2xl italic">"Strategy is just paying attention longer than everyone else."</p>
        </div>
      </div>
    </div>
  );
}

function DistortCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--acid)]" data-cursor="hover">
      <div className="absolute inset-0 transition-all duration-300 group-hover:animate-glitch group-hover:[filter:hue-rotate(45deg)_contrast(1.4)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">{role}</div>
        <div className="font-display text-4xl font-black text-white">{name}</div>
      </div>
    </div>
  );
}

function MaskCard({ name, role }: { name: string; role: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--ink)] border border-white/10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="hover"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--electric)] to-[var(--ultra)] transition-all duration-700"
        style={{ clipPath: hover ? "circle(120% at 50% 50%)" : "circle(0% at 50% 50%)" }}
      />
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/70">{role}</div>
        <div className="font-display text-4xl font-black text-white">{name}</div>
      </div>
    </div>
  );
}

const values = [
  { k: "Truth", v: "We tell the version that ships, not the version that flatters." },
  { k: "Compounding", v: "Every system we build pays interest forever." },
  { k: "Craft", v: "Pixels, prose, performance — no detail too small." },
  { k: "Speed", v: "Ship Monday, learn Tuesday, ship again Wednesday." },
];

function ValuesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[var(--bone)] px-6 py-32 text-[var(--ink)] md:px-12">
      <div className="font-mono text-xs uppercase tracking-[0.4em] opacity-50">Values · click to expand</div>
      <div className="mt-12 border-t border-[var(--ink)]/20">
        {values.map((val, i) => (
          <button
            key={val.k}
            onClick={() => setOpen(i)}
            data-cursor="hover"
            className="block w-full border-b border-[var(--ink)]/20 py-6 text-left"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-4xl font-black md:text-7xl">{val.k}</span>
              <span className="font-mono text-xs">{open === i ? "—" : "+"}</span>
            </div>
            <motion.div
              initial={false}
              animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <p className="mt-4 max-w-xl font-serif text-2xl italic">{val.v}</p>
            </motion.div>
          </button>
        ))}
      </div>
    </section>
  );
}