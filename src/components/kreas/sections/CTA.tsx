import { useEffect, useRef, useState } from "react";

interface Particle { x: number; y: number; vx: number; vy: number; life: number; }

export function CTA() {
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles: Particle[] = [];
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      if (mx > 0 && mx < r.width && my > 0 && my < r.height) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mx, y: my,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
          });
        }
      }
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.life -= 0.018;
        if (p.life <= 0) particles.splice(i, 1);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.life * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,255,80,${p.life})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <section
      id="contact"
      ref={wrap}
      onMouseMove={(e) => {
        const r = wrap.current!.getBoundingClientRect();
        const cx = r.width / 2, cy = r.height / 2;
        const dx = e.clientX - r.left - cx;
        const dy = e.clientY - r.top - cy;
        setPos({ x: dx * 0.15, y: dy * 0.15 });
      }}
      className="relative h-screen overflow-hidden bg-[var(--ink)]"
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">12 / Catch your growth</p>
        <h2 className="my-10 font-display text-5xl font-black leading-none md:text-9xl">
          CATCH YOUR<br/><span className="font-serif italic text-[var(--neon)]">growth</span>
        </h2>
        <button
          ref={btn}
          data-cursor="hover"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          className="rounded-full bg-[var(--neon)] px-12 py-6 font-display text-2xl font-black uppercase text-[var(--ink)] transition-transform duration-200"
        >
          Start Now →
        </button>
        <p className="mt-10 max-w-md text-balance text-sm text-white/60">
          Move your mouse. The button moves with you. So does the team behind it.
        </p>
      </div>
    </section>
  );
}
