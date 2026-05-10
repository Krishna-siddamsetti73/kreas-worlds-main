import { useState } from "react";

export function SplitProblemSolution() {
  const [side, setSide] = useState<"left" | "right" | null>(null);
  return (
    <section className="relative grid h-screen grid-cols-2 overflow-hidden bg-black text-white">
      <div
        onMouseEnter={() => setSide("left")}
        onMouseLeave={() => setSide(null)}
        data-cursor="hover"
        className={`relative flex flex-col justify-between p-10 transition-all duration-700 ${side === "left" ? "flex-[1.4]" : side === "right" ? "flex-[0.6]" : "flex-1"}`}
        style={{ background: "linear-gradient(135deg, oklch(0.18 0.08 25), oklch(0.08 0.02 0))" }}
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">04 / Problem</div>
        <div>
          <div className={`font-display text-6xl font-black md:text-8xl ${side === "left" ? "animate-glitch" : ""}`}>
            CHAOS<span className="text-[var(--acid)]">.</span>
          </div>
          <p className="mt-6 max-w-sm text-white/60">Disconnected tools. Slow shipping. Brand drift. Growth that stalls at month three.</p>
        </div>
      </div>
      <div
        onMouseEnter={() => setSide("right")}
        onMouseLeave={() => setSide(null)}
        data-cursor="hover"
        className={`relative flex flex-col justify-between p-10 transition-all duration-700 ${side === "right" ? "flex-[1.4]" : side === "left" ? "flex-[0.6]" : "flex-1"}`}
        style={{ background: "linear-gradient(135deg, oklch(0.96 0.05 130), oklch(0.85 0.18 130))", color: "var(--ink)" }}
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">04 / Solution</div>
        <div>
          <div className="font-display text-6xl font-black md:text-8xl">
            CLARITY<span className="font-serif italic">.</span>
          </div>
          <p className="mt-6 max-w-sm opacity-70">One studio. One system. Brand, product and growth compounded into a single engine.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white">
        Hover ↔
      </div>
    </section>
  );
}