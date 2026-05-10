import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function HiddenCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const r = btnRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      setProximity(Math.max(0, Math.min(1, 1 - d / 280)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative flex h-screen items-center justify-center bg-[var(--bone)] text-[var(--ink)]">
      <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.4em] md:left-12 md:top-12">06 / Find it</div>
      <div className="text-center">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.4em] opacity-50">
          {proximity > 0.5 ? "→ closer" : "move your cursor closer"}
        </p>
        <div ref={btnRef} className="inline-block">
          <Link
            to="/contact"
            data-cursor="hover"
            style={{
              opacity: proximity,
              transform: `scale(${0.4 + proximity * 0.6}) rotate(${(1 - proximity) * 8}deg)`,
              filter: `blur(${(1 - proximity) * 14}px)`,
              transition: "filter 0.15s",
            }}
            className="inline-block rounded-full bg-[var(--ink)] px-12 py-6 font-display text-2xl font-black uppercase text-[var(--neon)] md:text-4xl"
          >
            Begin →
          </Link>
        </div>
        <p className="mt-12 max-w-md mx-auto text-sm opacity-60">The button rewards attention. So do we.</p>
      </div>
    </section>
  );
}