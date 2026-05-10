import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/kreas/sections/Footer";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — KRIS Lab" },
      { name: "description", content: "Experiments, motion studies and UI demos from the KRIS lab." },
      { property: "og:title", content: "Playground — KRIS Lab" },
      { property: "og:description", content: "Live experiments and motion studies." },
    ],
  }),
  component: PlaygroundPage,
});

function PlaygroundPage() {
  return (
    <main className="bg-black text-white">
      <header className="border-b border-white/10 px-6 pt-40 pb-12 md:px-12">
        <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.4em] text-white/50">
          <span>KRIS / LAB · v0.26</span>
          <span>5 EXPERIMENTS</span>
        </div>
        <h1 className="mt-8 font-display text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter">
          THE LAB.
        </h1>
        <p className="mt-6 max-w-xl font-serif text-2xl italic text-white/70">
          Things we made on Fridays. Some shipped. Some shouldn't have. All of them taught us something.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Cell n={1} title="CURSOR_TRAIL"><CursorTrail /></Cell>
        <Cell n={2} title="SCROLL_WARP"><ScrollWarp /></Cell>
        <Cell n={3} title="CSS_3D_CUBE"><CubeDemo /></Cell>
        <Cell n={4} title="TEXT_MORPH"><TextMorph /></Cell>
        <Cell n={5} title="UI_CONCEPT" wide><UIConcept /></Cell>
      </div>
      <Footer />
    </main>
  );
}

function Cell({ n, title, children, wide = false }: { n: number; title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`relative min-h-[80vh] border-t border-white/10 ${!wide ? "md:border-r" : "md:col-span-2"} md:border-t md:[&:nth-child(-n+2)]:border-t-0`}>
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span>EXP_{String(n).padStart(2, "0")}</span><span>{title}</span>
      </div>
      <div className="relative h-[calc(80vh-37px)]">{children}</div>
    </div>
  );
}

/* 1 — cursor trail */
function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    const trail: { x: number; y: number; h: number; life: number }[] = [];
    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      trail.push({ x, y, h: (performance.now() / 20) % 360, life: 1 });
    };
    c.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.015;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * 30, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h}, 90%, 60%, ${p.life * 0.6})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); c.removeEventListener("mousemove", onMove); };
  }, []);
  return <div ref={ref} className="relative h-full"><canvas ref={canvasRef} className="absolute inset-0 h-full w-full" /><span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">move →</span></div>;
}

/* 2 — scroll warp */
function ScrollWarp() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: ref });
  const v = useVelocity(scrollY);
  const skew = useSpring(useTransform(v, [-1500, 1500], [-25, 25]), { stiffness: 200, damping: 30 });
  return (
    <div ref={ref} className="h-full overflow-y-auto bg-[var(--ink)]">
      <div className="space-y-4 px-6 py-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            style={{ skewY: skew }}
            className="font-display text-5xl font-black tracking-tighter"
          >
            <span className={i % 3 === 0 ? "text-[var(--neon)]" : ""}>SCROLL FAST</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 3 — CSS 3D cube */
function CubeDemo() {
  const [r, setR] = useState({ x: -20, y: 30 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      className="relative flex h-full items-center justify-center bg-gradient-to-br from-[var(--ultra)] to-black"
      onMouseDown={(e) => (drag.current = { x: e.clientX, y: e.clientY })}
      onMouseUp={() => (drag.current = null)}
      onMouseLeave={() => (drag.current = null)}
      onMouseMove={(e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x;
        const dy = e.clientY - drag.current.y;
        drag.current = { x: e.clientX, y: e.clientY };
        setR((p) => ({ x: p.x - dy * 0.5, y: p.y + dx * 0.5 }));
      }}
      data-cursor="hover"
    >
      <div className="[perspective:800px]">
        <div
          className="relative h-40 w-40 [transform-style:preserve-3d] transition-transform duration-100"
          style={{ transform: `rotateX(${r.x}deg) rotateY(${r.y}deg)` }}
        >
          {[
            { t: "translateZ(80px)", c: "var(--neon)" },
            { t: "rotateY(180deg) translateZ(80px)", c: "var(--acid)" },
            { t: "rotateY(90deg) translateZ(80px)", c: "var(--ultra)" },
            { t: "rotateY(-90deg) translateZ(80px)", c: "var(--electric)" },
            { t: "rotateX(90deg) translateZ(80px)", c: "var(--magenta)" },
            { t: "rotateX(-90deg) translateZ(80px)", c: "white" },
          ].map((f, i) => (
            <div key={i} className="absolute inset-0 border border-black/20" style={{ transform: f.t, background: f.c }} />
          ))}
        </div>
      </div>
      <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">drag to rotate</span>
    </div>
  );
}

/* 4 — text morph */
const morphWords = ["DESIGN", "BUILD", "GROW", "SCALE"];
function TextMorph() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % morphWords.length), 1600);
    return () => clearInterval(id);
  }, []);
  const word = morphWords[i];
  return (
    <div className="flex h-full items-center justify-center bg-[var(--bone)] text-[var(--ink)]">
      <div className="flex">
        {word.split("").map((ch, idx) => (
          <motion.span
            key={`${i}-${idx}`}
            initial={{ y: 80, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: idx * 0.06, type: "spring", stiffness: 120, damping: 14 }}
            className="font-display text-7xl font-black md:text-9xl"
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* 5 — ui concept (toggle pricing card) */
function UIConcept() {
  const [yearly, setYearly] = useState(true);
  const tiers = [
    { name: "Spark", m: 49, y: 470 },
    { name: "Engine", m: 199, y: 1900, hi: true },
    { name: "System", m: 499, y: 4790 },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-black via-[var(--ink)] to-[var(--ultra)]/40 p-8">
      <div className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]">
        <span className={!yearly ? "text-[var(--neon)]" : "opacity-50"}>Monthly</span>
        <button
          onClick={() => setYearly(!yearly)}
          data-cursor="hover"
          className="relative h-7 w-14 rounded-full border border-white/30"
        >
          <motion.div
            animate={{ x: yearly ? 28 : 0 }}
            className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-[var(--neon)]"
          />
        </button>
        <span className={yearly ? "text-[var(--neon)]" : "opacity-50"}>Yearly</span>
      </div>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <motion.div
            key={t.name}
            layout
            className={`rounded-2xl border p-6 ${t.hi ? "border-[var(--neon)] bg-[var(--neon)]/10" : "border-white/15"}`}
          >
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">{t.name}</div>
            <div className="mt-3 font-display text-5xl font-black">
              ${yearly ? t.y : t.m}<span className="text-base opacity-50">/{yearly ? "yr" : "mo"}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}