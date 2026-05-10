import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Footer } from "@/components/kreas/sections/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — KRIS" },
      { name: "description", content: "Each KRIS service is a full-screen experience: web, app, marketing, SEO, and consulting." },
      { property: "og:title", content: "Services — KRIS" },
      { property: "og:description", content: "Five disciplines. One growth engine." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="bg-[var(--ink)] text-white">
      <header className="flex h-[60vh] items-end px-6 pb-12 md:px-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">Capabilities · 05</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter">
            FIVE <span className="font-serif italic text-[var(--neon)]">worlds</span>
          </h1>
        </div>
      </header>
      <WebDev />
      <AppDev />
      <Marketing />
      <SEO />
      <Consulting />
      <Footer />
    </main>
  );
}

function Section({ children, bg = "var(--ink)", fg = "white", index, label }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  return (
    <section ref={ref} style={{ background: bg, color: fg }} className="relative min-h-screen overflow-hidden px-6 py-24 md:px-12">
      <div className="mb-12 flex items-center justify-between font-mono text-xs uppercase tracking-[0.4em] opacity-50">
        <span>SVC_0{index}</span><span>{label}</span>
      </div>
      <div data-inview={inView}>{children}</div>
    </section>
  );
}

function WebDev() {
  const blocks = Array.from({ length: 12 });
  return (
    <Section index={1} label="WEB DEVELOPMENT" bg="var(--ink)" fg="white">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-6xl font-black md:text-8xl">Interfaces<br/>that <span className="font-serif italic text-[var(--neon)]">build themselves</span>.</h2>
          <p className="mt-6 max-w-md text-white/60">Production-grade React, edge-rendered, animated by default.</p>
        </div>
        <div className="grid grid-cols-4 gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
          {blocks.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
              className={`aspect-square rounded ${i % 3 === 0 ? "bg-[var(--neon)]" : "bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function AppDev() {
  return (
    <Section index={2} label="APP DEVELOPMENT" bg="var(--bone)" fg="var(--ink)">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto h-[500px] w-[260px] rounded-[2.5rem] border-8 border-[var(--ink)] bg-[var(--ink)] p-2 shadow-2xl">
          <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-[var(--ultra)] to-[var(--ink)]">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? -200 : 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
                style={{ top: `${10 + i * 22}%` }}
                className="absolute left-3 right-3 h-[18%] rounded-xl bg-white/15 backdrop-blur"
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-6xl font-black md:text-8xl">Apps that <span className="font-serif italic">snap</span> together.</h2>
          <p className="mt-6 max-w-md opacity-70">React Native, swift releases, and a UI system that moves like silk.</p>
        </div>
      </div>
    </Section>
  );
}

function Marketing() {
  return (
    <Section index={3} label="MARKETING" bg="var(--ultra)" fg="white">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-6xl font-black md:text-8xl">Data that <span className="font-serif italic text-[var(--neon)]">flows</span>.</h2>
          <p className="mt-6 max-w-md text-white/70">Acquisition, lifecycle, retention. One funnel, measured end-to-end.</p>
        </div>
        <svg viewBox="0 0 400 300" className="w-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M ${20 + i * 30} 0 Q 200 ${100 + i * 10} 200 280`}
              stroke="var(--neon)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.6, delay: i * 0.15 }}
            />
          ))}
          <circle cx="200" cy="280" r="14" fill="var(--neon)" />
        </svg>
      </div>
    </Section>
  );
}

function SEO() {
  const ranks = ["kris.studio", "competitor-a", "competitor-b", "competitor-c", "competitor-d"];
  const heights = [90, 60, 45, 35, 28];
  return (
    <Section index={4} label="SEO" bg="white" fg="var(--ink)">
      <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-6xl font-black md:text-8xl">Rankings that <span className="font-serif italic">climb</span>.</h2>
          <p className="mt-6 max-w-md opacity-60">Technical SEO, content engines, and links built like infrastructure.</p>
          <ol className="mt-8 space-y-2 font-mono text-sm">
            {ranks.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className={i === 0 ? "text-[var(--ultra)] font-bold" : ""}
              >
                {String(i + 1).padStart(2, "0")} · {r}
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="flex h-[400px] items-end gap-3">
          {heights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
              className={`flex-1 ${i === 0 ? "bg-[var(--ultra)]" : "bg-[var(--ink)]/20"}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Consulting() {
  const nodes = [
    { x: 200, y: 80 }, { x: 80, y: 180 }, { x: 320, y: 180 },
    { x: 140, y: 280 }, { x: 260, y: 280 }, { x: 200, y: 200 },
  ];
  return (
    <Section index={5} label="CONSULTING" bg="var(--ink)" fg="white">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-6xl font-black md:text-8xl">Networks of <span className="font-serif italic text-[var(--neon)]">decisions</span>.</h2>
          <p className="mt-6 max-w-md text-white/60">We sit beside your team and connect the dots others miss.</p>
        </div>
        <svg viewBox="0 0 400 360" className="w-full">
          {nodes.map((n, i) =>
            nodes.slice(i + 1).map((m, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                stroke="var(--neon)" strokeWidth="0.6" opacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: (i + j) * 0.05 }}
              />
            )),
          )}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x} cy={n.y} r="8"
              fill="var(--neon)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
          ))}
        </svg>
      </div>
    </Section>
  );
}