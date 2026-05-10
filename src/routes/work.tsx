import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/kreas/sections/Footer";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — KRIS" },
      { name: "description", content: "Selected case studies and live results from KRIS." },
      { property: "og:title", content: "Work — KRIS" },
      { property: "og:description", content: "Brand, product and growth case studies." },
    ],
  }),
  component: WorkPage,
});

const projects = [
  { id: "northwind", title: "Northwind", tag: "Brand · Product", color: "var(--neon)" },
  { id: "altair", title: "Altair", tag: "Growth", color: "var(--ultra)" },
  { id: "kindred", title: "Kindred", tag: "App", color: "var(--acid)" },
  { id: "lumen", title: "Lumen", tag: "Identity", color: "var(--electric)" },
  { id: "nova", title: "Nova", tag: "Web", color: "var(--magenta)" },
  { id: "atlas", title: "Atlas", tag: "Strategy", color: "var(--neon)" },
];

function WorkPage() {
  return (
    <main className="bg-[var(--ink)] text-white">
      <header className="px-6 pt-40 pb-16 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">Selected work · 2019—2026</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter">
          PROOF.
        </h1>
      </header>
      <ProjectGrid />
      <CaseStudyFilm />
      <LiveMetrics />
      <InteractiveDemo />
      <Footer />
    </main>
  );
}

function ProjectGrid() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="px-6 pb-24 md:px-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <motion.button
            key={p.id}
            data-cursor="hover"
            layoutId={`card-${p.id}`}
            onClick={() => setOpen(p.id)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 text-left"
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 30% 30%, ${p.color}, transparent 70%), var(--ink)` }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">{p.tag}</div>
              <div className="mt-2 font-display text-4xl font-black">{p.title}</div>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur"
          >
            <motion.div
              layoutId={`card-${open}`}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl"
              style={{ background: `radial-gradient(circle at 30% 30%, ${projects.find(p => p.id === open)?.color}, transparent 70%), var(--ink)` }}
            >
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">{projects.find(p => p.id === open)?.tag}</div>
                <div className="mt-2 font-display text-7xl font-black">{projects.find(p => p.id === open)?.title}</div>
                <p className="mt-4 max-w-md text-white/70">A full case study lives here. Click anywhere to close.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseStudyFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scenes = [
    { tag: "Problem", line: "Conversion was leaking.", bg: "linear-gradient(135deg, oklch(0.18 0.1 25), black)", color: "var(--acid)" },
    { tag: "Solution", line: "We rebuilt the funnel.", bg: "linear-gradient(135deg, var(--ink), var(--ultra))", color: "white" },
    { tag: "Result", line: "+312% qualified leads.", bg: "linear-gradient(135deg, var(--neon), oklch(0.95 0.05 130))", color: "var(--ink)" },
  ];
  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {scenes.map((s, i) => {
          const start = i / scenes.length;
          const end = (i + 1) / scenes.length;
          const a = Math.max(0, start - 0.05);
          const b = Math.max(a + 0.0001, start);
          const d = Math.min(1, end);
          const c = Math.max(b + 0.0001, Math.min(d - 0.0001, end - 0.05));
          const opacity = useTransform(scrollYProgress, [a, b, c, d], [0, 1, 1, 0]);
          return (
            <motion.div
              key={i}
              style={{ opacity, background: s.bg, color: s.color }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <div className="font-mono text-xs uppercase tracking-[0.5em] opacity-70">Case · {s.tag}</div>
              <div className={`mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-black leading-[0.95] ${i === 0 ? "animate-glitch" : ""}`}>
                {s.line}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1600);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function LiveMetrics() {
  return (
    <section className="bg-[var(--bone)] px-6 py-32 text-[var(--ink)] md:px-12">
      <div className="font-mono text-xs uppercase tracking-[0.4em] opacity-50">Live metrics</div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          { label: "Avg ROI", n: 412, s: "%" },
          { label: "Projects", n: 86, s: "" },
          { label: "Countries", n: 17, s: "" },
        ].map((m) => (
          <div key={m.label} className="border-t border-[var(--ink)]/20 pt-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">{m.label}</div>
            <div className="mt-4 font-display text-7xl font-black md:text-9xl">
              <Counter to={m.n} suffix={m.s} />
            </div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 800 200" className="mt-16 w-full">
        <motion.path
          d="M 0 180 Q 100 160 200 130 T 400 80 T 600 50 T 800 20"
          stroke="var(--ink)" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2 }}
        />
        <motion.path
          d="M 0 180 Q 100 160 200 130 T 400 80 T 600 50 T 800 20 L 800 200 L 0 200 Z"
          fill="var(--neon)" opacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2 }}
        />
      </svg>
    </section>
  );
}

function InteractiveDemo() {
  const [intensity, setIntensity] = useState(50);
  const [variant, setVariant] = useState<"a" | "b" | "c">("a");
  return (
    <section className="bg-[var(--ink)] px-6 py-32 text-white md:px-12">
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">Try it · live</div>
      <h2 className="mt-6 max-w-2xl font-display text-5xl font-black md:text-7xl">Play with a fragment of what we ship.</h2>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6 rounded-2xl border border-white/10 p-8">
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">Intensity · {intensity}</label>
            <input
              type="range" min={0} max={100} value={intensity}
              onChange={(e) => setIntensity(+e.target.value)}
              className="mt-3 w-full accent-[var(--neon)]"
            />
          </div>
          <div className="flex gap-2">
            {(["a", "b", "c"] as const).map((v) => (
              <button
                key={v} data-cursor="hover"
                onClick={() => setVariant(v)}
                className={`rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] ${variant === v ? "bg-[var(--neon)] text-[var(--ink)]" : ""}`}
              >Variant {v}</button>
            ))}
          </div>
        </div>
        <div
          className="relative h-80 overflow-hidden rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${variant === "a" ? "30%" : variant === "b" ? "70%" : "50%"} 50%, var(--neon), var(--ink))`,
            filter: `hue-rotate(${intensity * 3}deg) contrast(${1 + intensity / 200})`,
          }}
        >
          <div className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.3em] text-white">
            preview · {variant} · {intensity}
          </div>
        </div>
      </div>
    </section>
  );
}