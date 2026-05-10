import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function CinematicHero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dotScale = useTransform(scrollYProgress, [0, 0.4], [1, 80]);
  const bloom = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.7], ["80%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const camBlur = useTransform(scrollYProgress, [0.3, 1], ["0px", "6px"]);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 320;
    const particles = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 0.6 + 0.2;
      return { x: c.width / 2, y: c.height / 2, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: Math.random() * 1.6 + 0.3 };
    });
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(8,8,10,0.18)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width || p.y < 0 || p.y > c.height) {
          p.x = c.width / 2; p.y = c.height / 2;
          const a = Math.random() * Math.PI * 2;
          const s = Math.random() * 0.6 + 0.2;
          p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,255,170,0.85)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.canvas ref={canvasRef} style={{ opacity: bloom }} className="absolute inset-0 h-full w-full" />
        <motion.div style={{ filter: camBlur }} className="absolute inset-0">
          <motion.div
            style={{ scale: dotScale }}
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon)] shadow-[0_0_60px_30px_rgba(180,255,80,0.6)]"
          />
        </motion.div>
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-white/50">Scene 01 / Origin</p>
          <h1 className="font-display text-[clamp(2.5rem,9vw,9rem)] font-black leading-[0.9] tracking-tighter">
            KRIS CREATES<br/>
            <span className="font-serif italic text-[var(--neon)]">digital growth</span><br/>
            SYSTEMS
          </h1>
          <p className="mt-8 max-w-md text-sm text-white/60">Scroll to enter the system →</p>
        </motion.div>
      </div>
    </section>
  );
}