import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/kreas/sections/Footer";
import e1 from "@/assets/editorial-1.jpg";
import e2 from "@/assets/editorial-2.jpg";
import c1 from "@/assets/chrome-1.jpg";
import b1 from "@/assets/brutalist-1.jpg";
import g1 from "@/assets/gradient-mesh.jpg";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab+ — KRIS Experiments" },
      { name: "description", content: "An expanded playground of experimental UI: liquid grids, curved type, magnetic stacks, snap panels, morphing blobs and more." },
      { property: "og:title", content: "Lab+ — KRIS Experiments" },
      { property: "og:description", content: "Experimental UI showcase." },
    ],
  }),
  component: LabPage,
});

const IMAGES = [e1, e2, c1, b1, g1, t1, t2, t3];

function LabPage() {
  return (
    <main className="relative bg-black text-white">
      <CursorParticles />
      <Intro />
      <LiquidGrid />
      <CurvedText />
      <MagneticStack />
      <NoiseQuote />
      <SnapPanels />
      <MorphBlob />
      <MaskedReveal />
      <FlowDiagram />
      <ProjectScroll />
      <ParallaxStack />
      <LogoWall />
      <BigQuote />
      <NumbersStory />
      <LiquidButtons />
      <DragDock />
      <FormJourney />
      <Footer />
    </main>
  );
}

/* ---------- Intro ---------- */
function Intro() {
  return (
    <section className="flex min-h-screen flex-col justify-end border-b border-white/10 px-6 pb-16 pt-40 md:px-12">
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">KRIS / LAB+ · 17 EXPERIMENTS</div>
      <h1 className="mt-6 font-display text-[clamp(3rem,14vw,14rem)] font-black leading-[0.85] tracking-tighter">
        FEEL <span className="font-serif italic text-[var(--neon)]">it.</span>
      </h1>
      <p className="mt-6 max-w-xl font-serif text-2xl italic text-white/60">
        Scroll. Hover. Drag. Click. Everything reacts.
      </p>
    </section>
  );
}

/* ---------- 1. Liquid distortion grid ---------- */
function LiquidGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tilt = useSpring(0, { stiffness: 80, damping: 14 });
  return (
    <Section title="01 / LIQUID GRID" sub="hover warps · click expands">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
          tilt.set(((e.clientX - r.left) / r.width - 0.5) * 6);
        }}
        className="relative grid grid-cols-2 gap-2 p-2 md:grid-cols-4"
        style={{ perspective: 1200 }}
      >
        <svg width="0" height="0" className="absolute">
          <filter id="liquid">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3">
              <animate attributeName="baseFrequency" dur="8s" values="0.015;0.03;0.015" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="18" />
          </filter>
        </svg>
        {IMAGES.map((src, i) => (
          <motion.button
            key={i}
            layoutId={`lg-${i}`}
            onClick={() => setOpen(i)}
            data-cursor="hover"
            style={{ rotateY: tilt }}
            className="group relative aspect-[4/5] overflow-hidden rounded-md bg-white/5"
          >
            <motion.img
              src={src}
              alt=""
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{ filter: "url(#liquid)" }}
              whileHover={{ scale: 1.15 }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] opacity-0 transition group-hover:opacity-100">
              0{i + 1} →
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img layoutId={`lg-${open}`} src={IMAGES[open]} alt="" className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- 2. Curved text on path ---------- */
function CurvedText() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [off, setOff] = useState(100);
  useEffect(() => scrollYProgress.on("change", (v) => setOff(100 - v * 200)), [scrollYProgress]);
  return (
    <Section title="02 / CURVED TYPE" sub="text rides the path">
      <div ref={ref} className="flex min-h-[60vh] items-center justify-center px-6">
        <svg viewBox="0 0 1000 300" className="w-full max-w-5xl">
          <defs>
            <path id="curve" d="M 20 220 Q 250 20 500 180 T 980 100" fill="none" />
          </defs>
          <path d="M 20 220 Q 250 20 500 180 T 980 100" stroke="white" strokeOpacity="0.1" strokeWidth="1" fill="none" />
          <text className="font-display fill-white" fontSize="64" fontWeight="900">
            <textPath href="#curve" startOffset={`${off}%`}>
              DESIGN · BUILD · SCALE · REPEAT · DESIGN · BUILD · SCALE · REPEAT ·
            </textPath>
          </text>
        </svg>
      </div>
    </Section>
  );
}

/* ---------- 3. Magnetic overlapping image stack ---------- */
function MagneticStack() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [hover, setHover] = useState(false);
  const sx = useSpring(mx, { stiffness: 90, damping: 12 });
  const sy = useSpring(my, { stiffness: 90, damping: 12 });
  const stack = [c1, e1, b1, g1, e2];
  return (
    <Section title="03 / MAGNETIC STACK" sub="cursor pulls layers apart">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width - 0.5) * 60);
          my.set(((e.clientY - r.top) / r.height - 0.5) * 60);
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex min-h-[80vh] items-center justify-center"
        style={{ perspective: 1400 }}
      >
        {stack.map((src, i) => {
          const depth = i - (stack.length - 1) / 2;
          return (
            <motion.img
              key={i}
              src={src}
              alt=""
              data-cursor="hover"
              animate={{ y: hover ? depth * -40 : [0, -10, 0] }}
              transition={hover ? { type: "spring", stiffness: 80 } : { duration: 4 + i, repeat: Infinity }}
              style={{
                x: useTransform(sx, (v) => v + depth * (hover ? 70 : 18)),
                rotate: depth * 4,
                zIndex: 10 + i,
              }}
              className="absolute h-72 w-56 rounded-lg object-cover shadow-2xl ring-1 ring-white/10 md:h-96 md:w-72"
            />
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- 4. Noise + flicker quote ---------- */
function NoiseQuote() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-[var(--ink)] py-40 grain">
      <motion.div
        animate={{ opacity: [0.85, 1, 0.92, 1] }}
        transition={{ duration: 0.4, repeat: Infinity }}
        className="mx-auto max-w-5xl px-6 text-center"
      >
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-white/40">04 / TEXTURE</div>
        <motion.h3
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="font-display text-5xl font-black md:text-8xl"
        >
          Not just design. <span className="font-serif italic text-[var(--neon)]">Engineered growth.</span>
        </motion.h3>
      </motion.div>
    </section>
  );
}

/* ---------- 5. Snap panels ---------- */
function SnapPanels() {
  const panels = [
    { t: "IDEA", c: "var(--ultra)" },
    { t: "BUILD", c: "var(--neon)" },
    { t: "LAUNCH", c: "var(--acid)" },
    { t: "SCALE", c: "var(--electric)" },
  ];
  return (
    <section className="relative">
      <div className="border-b border-white/10 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:px-12">05 / SNAP PANELS · scroll inside ↓</div>
      <div className="h-[80vh] snap-y snap-mandatory overflow-y-auto">
        {panels.map((p, i) => (
          <motion.div
            key={p.t}
            className="flex h-[80vh] snap-start items-center justify-center"
            style={{ background: p.c, color: i === 1 ? "#000" : "#fff" }}
          >
            <motion.h3
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ root: undefined, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="font-display text-7xl font-black md:text-[12rem]"
            >
              0{i + 1} {p.t}
            </motion.h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 6. Morphing blob ---------- */
function MorphBlob() {
  const shapes = [
    "M60,-50C70,-30,60,0,45,25C30,50,0,70,-25,60C-50,50,-70,20,-65,-10C-60,-40,-30,-65,5,-65C40,-65,55,-65,60,-50Z",
    "M50,-60C65,-45,80,-25,75,0C70,25,55,45,30,60C5,75,-25,75,-50,60C-75,45,-90,20,-85,-10C-80,-40,-55,-65,-25,-75C5,-85,35,-75,50,-60Z",
    "M70,-40C80,-15,75,20,55,45C35,70,5,80,-25,70C-55,60,-80,30,-75,-5C-70,-40,-40,-75,-5,-75C30,-75,60,-65,70,-40Z",
  ];
  const [i, setI] = useState(0);
  const [hue, setHue] = useState(280);
  useEffect(() => {
    const id = setInterval(() => { setI((p) => (p + 1) % shapes.length); setHue((h) => (h + 50) % 360); }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <Section title="06 / MORPH" sub="hover services to react">
      <div className="grid min-h-[80vh] grid-cols-1 items-center md:grid-cols-2">
        <div className="flex justify-center">
          <svg viewBox="-100 -100 200 200" className="h-80 w-80 md:h-[28rem] md:w-[28rem]">
            <defs>
              <radialGradient id="bg" cx="50%" cy="50%">
                <stop offset="0%" stopColor={`hsl(${hue}, 90%, 60%)`} />
                <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 90%, 30%)`} />
              </radialGradient>
            </defs>
            <motion.path
              fill="url(#bg)"
              animate={{ d: shapes[i], rotate: i * 30 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <ul className="space-y-3 px-6 font-display text-3xl font-black md:text-5xl">
          {["Brand", "Product", "Growth", "Story"].map((s, k) => (
            <li
              key={s}
              data-cursor="hover"
              onMouseEnter={() => { setI(k % shapes.length); setHue((k * 90) % 360); }}
              className="cursor-pointer border-b border-white/10 py-3 transition hover:translate-x-3 hover:text-[var(--neon)]"
            >
              {s}.
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- 7. Masked text reveal ---------- */
function MaskedReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.2, 0.8], ["100%", "-5%"]);
  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/10 bg-white py-40 text-black">
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-50">07 / MASK REVEAL</div>
        <div className="relative mt-8">
          <h3 className="font-display text-[clamp(3rem,12vw,12rem)] font-black leading-[0.9] tracking-tighter">
            QUIET. PRECISE. <em className="font-serif">obvious.</em>
          </h3>
          <motion.div style={{ x }} className="absolute inset-0 bg-black" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Flow diagram ---------- */
function FlowDiagram() {
  const [active, setActive] = useState(0);
  const nodes = ["DISCOVER", "DESIGN", "BUILD", "LAUNCH", "GROW"];
  return (
    <Section title="08 / FLOW" sub="hover nodes to highlight path">
      <div className="px-6 pb-16 pt-8 md:px-12">
        <svg viewBox="0 0 1000 200" className="w-full">
          {nodes.map((_, i) => i < nodes.length - 1 && (
            <motion.line
              key={i}
              x1={100 + i * 200} y1={100} x2={300 + i * 200} y2={100}
              stroke={active === i ? "var(--neon)" : "rgba(255,255,255,0.2)"}
              strokeWidth={active === i ? 3 : 1}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.2 }}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={n} onMouseEnter={() => setActive(i)} style={{ cursor: "none" }}>
              <motion.circle
                cx={100 + i * 200} cy={100} r={active === i ? 32 : 22}
                fill={active === i ? "var(--neon)" : "white"}
                animate={active === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 1.2, repeat: active === i ? Infinity : 0 }}
              />
              <text x={100 + i * 200} y={150} textAnchor="middle" className="fill-white font-mono" fontSize="11">{n}</text>
            </g>
          ))}
        </svg>
      </div>
    </Section>
  );
}

/* ---------- 9. Project full-screen scroll ---------- */
function ProjectScroll() {
  const projects = [
    { src: e1, name: "OBSIDIAN", tag: "BRAND" },
    { src: c1, name: "FLUX", tag: "PRODUCT" },
    { src: g1, name: "ATLAS", tag: "GROWTH" },
  ];
  return (
    <section className="relative">
      <div className="border-y border-white/10 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 md:px-12">09 / IMMERSIVE PROJECTS</div>
      {projects.map((p) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.4 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex h-screen items-center justify-center overflow-hidden"
        >
          <img src={p.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/70">{p.tag}</div>
            <h3 className="mt-3 font-display text-7xl font-black md:text-[10rem]">{p.name}</h3>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

/* ---------- 10. Parallax stack ---------- */
function ParallaxStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const layers = [
    { src: b1, y: y1, c: "left-[10%] top-10 w-1/3" },
    { src: e2, y: y2, c: "right-[12%] top-32 w-2/5" },
    { src: t2, y: y3, c: "left-1/3 top-72 w-1/4" },
  ];
  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden border-t border-white/10 bg-[var(--ink)]">
      <div className="px-6 py-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 md:px-12">10 / PARALLAX STACK</div>
      {layers.map((l, i) => (
        <motion.img key={i} src={l.src} style={{ y: l.y }} className={`absolute aspect-[3/4] rounded-lg object-cover shadow-2xl ${l.c}`} alt="" />
      ))}
    </section>
  );
}

/* ---------- 11. Floating logo wall ---------- */
function LogoWall() {
  const logos = ["NORTH", "FLUX", "ATLAS", "OBSIDIAN", "ION", "HALO", "VECTOR", "ORBIT", "PRISM", "NOVA", "ECHO", "SOLUS"];
  return (
    <Section title="11 / TRUSTED" sub="logos breathe">
      <div className="grid grid-cols-3 gap-px bg-white/10 md:grid-cols-6">
        {logos.map((l, i) => (
          <motion.div
            key={l}
            animate={{ opacity: [0.4, 1, 0.6, 1, 0.4] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            className="flex aspect-square items-center justify-center bg-black font-display text-xl font-black tracking-tight md:text-2xl"
          >
            {l}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 12. Big quote ---------- */
function BigQuote() {
  const words = ["We", "don't", "build", "products.", "We", "build", "growth."];
  return (
    <section className="border-t border-white/10 px-6 py-40 md:px-12">
      <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">12 / POSITIONING</div>
      <h3 className="mt-8 max-w-6xl font-display text-5xl font-black leading-[1] tracking-tight md:text-9xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="mr-4 inline-block"
          >
            {i === words.length - 1 ? <em className="font-serif text-[var(--neon)]">{w}</em> : w}
          </motion.span>
        ))}
      </h3>
    </section>
  );
}

/* ---------- 13. Numbers ---------- */
function NumbersStory() {
  const stats = [
    { n: 9, s: "+", l: "Years" },
    { n: 142, s: "", l: "Projects" },
    { n: 67, s: "", l: "Clients" },
    { n: 38, s: "M", l: "Revenue" },
  ];
  return (
    <Section title="13 / CREDIBILITY" sub="">
      <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
        {stats.map((s) => <Stat key={s.l} {...s} />)}
      </div>
    </Section>
  );
}
function Stat({ n, s, l }: { n: number; s: string; l: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es[0].isIntersecting && (() => {
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1500, 1);
        setV(Math.floor((1 - Math.pow(1 - p, 3)) * n));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    })(), { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [n]);
  return (
    <div ref={ref} className="bg-black p-8 md:p-12">
      <div className="font-display text-5xl font-black md:text-8xl">{v}{s}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">{l}</div>
    </div>
  );
}

/* ---------- 14. Cursor particles (global on this page) ---------- */
function CursorParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const parts: { x: number; y: number; vx: number; vy: number; life: number; h: number }[] = [];
    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) parts.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
        life: 1, h: (performance.now() / 30) % 360,
      });
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy; p.life -= 0.018;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * 6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},90%,60%,${p.life * 0.7})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen" />;
}

/* ---------- 15. Liquid buttons ---------- */
function LiquidButtons() {
  return (
    <Section title="15 / LIQUID UI" sub="hover the buttons">
      <div className="flex flex-wrap items-center justify-center gap-8 py-24">
        {["START", "EXPLORE", "CONTACT"].map((t, i) => <LiquidBtn key={t} label={t} hue={i * 90} />)}
      </div>
    </Section>
  );
}
function LiquidBtn({ label, hue }: { label: string; hue: number }) {
  const [h, setH] = useState(false);
  return (
    <button
      data-cursor="hover"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      className="group relative overflow-hidden rounded-full border border-white/30 px-10 py-5 font-mono text-xs uppercase tracking-[0.4em]"
    >
      <motion.span
        animate={h ? { scale: 4, opacity: 1 } : { scale: 0, opacity: 0.6 }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
        className="absolute left-1/2 top-1/2 -ml-32 -mt-32 h-64 w-64 rounded-full"
        style={{ background: `radial-gradient(circle, hsl(${hue},90%,60%), hsl(${hue + 40},90%,40%))` }}
      />
      <span className="relative z-10">{label} →</span>
    </button>
  );
}

/* ---------- 16. Drag dock ---------- */
function DragDock() {
  return (
    <Section title="16 / DRAG IT" sub="grab and snap">
      <div className="relative h-[60vh] overflow-hidden border-y border-white/10 bg-gradient-to-br from-[var(--ultra)]/30 to-black">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.6}
            dragSnapToOrigin
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            data-cursor="hover"
            className="absolute flex h-28 w-28 items-center justify-center rounded-2xl bg-white font-mono text-xs uppercase tracking-[0.3em] text-black shadow-2xl md:h-36 md:w-36"
            style={{ left: `${10 + i * 22}%`, top: `${20 + (i % 2) * 30}%` }}
          >
            DRAG_0{i + 1}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 17. Form journey w/ progress + confetti ---------- */
function FormJourney() {
  const steps = ["Project type", "Budget", "Timeline", "Email"];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const progress = done ? 100 : (step / steps.length) * 100;
  return (
    <Section title="17 / GUIDED FLOW" sub="step · submit · celebrate">
      <div className="relative px-6 py-16 md:px-12">
        <div className="mb-12 h-1 w-full rounded-full bg-white/10">
          <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-[var(--neon)]" />
        </div>
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">Step {step + 1} / {steps.length}</div>
              <h4 className="mt-6 font-display text-4xl font-black md:text-6xl">{steps[step]}</h4>
              <input
                className="mt-10 w-full border-b border-white/30 bg-transparent pb-3 text-center text-2xl outline-none focus:border-[var(--neon)]"
                placeholder="Type your answer…"
              />
              <div className="mt-10 flex justify-center gap-4">
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} data-cursor="hover" className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.3em]">← Back</button>
                )}
                <button
                  data-cursor="hover"
                  onClick={() => step < steps.length - 1 ? setStep(step + 1) : setDone(true)}
                  className="rounded-full bg-[var(--neon)] px-8 py-3 text-xs uppercase tracking-[0.3em] text-black"
                >
                  {step < steps.length - 1 ? "Next →" : "Submit ✨"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto max-w-3xl py-16 text-center"
            >
              <Confetti />
              <motion.div
                animate={{ boxShadow: ["0 0 0 rgba(217,255,0,0)", "0 0 120px rgba(217,255,0,0.6)", "0 0 0 rgba(217,255,0,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mx-auto h-24 w-24 rounded-full bg-[var(--neon)]"
              />
              <h4 className="mt-10 font-display text-4xl font-black md:text-7xl">Your growth starts now.</h4>
              <p className="mt-4 font-serif text-xl italic text-white/60">We'll be in touch within 24 hours.</p>
              <button onClick={() => { setDone(false); setStep(0); }} className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-white">↻ Restart</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
function Confetti() {
  const pieces = Array.from({ length: 60 });
  const colors = ["var(--neon)", "var(--acid)", "var(--ultra)", "var(--electric)", "var(--magenta)"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
          animate={{ y: 600 + Math.random() * 200, x: (Math.random() - 0.5) * 600, rotate: Math.random() * 720, opacity: 0 }}
          transition={{ duration: 2 + Math.random() * 1.5, ease: "easeOut" }}
          className="absolute left-1/2 top-1/3 h-2 w-3"
          style={{ background: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}

/* ---------- shared section ---------- */
function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10">
      <div className="flex items-baseline justify-between border-b border-white/10 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 md:px-12">
        <span>{title}</span>
        <span>{sub}</span>
      </div>
      {children}
    </section>
  );
}