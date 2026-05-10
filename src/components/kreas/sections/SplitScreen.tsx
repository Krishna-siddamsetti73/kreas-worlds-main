import { useState } from "react";
import chromeImg from "@/assets/chrome-1.jpg";
import editorialImg from "@/assets/editorial-1.jpg";
import gradientImg from "@/assets/gradient-mesh.jpg";

const items = [
  { id: "brand", label: "Brand identity", img: editorialImg, color: "bg-[var(--ink)]" },
  { id: "product", label: "Product design", img: chromeImg, color: "bg-[var(--acid)]" },
  { id: "growth", label: "Growth systems", img: gradientImg, color: "bg-[var(--ultra)]" },
];

export function SplitScreen() {
  const [active, setActive] = useState(0);
  return (
    <section id="work" className="relative grid min-h-screen grid-cols-1 bg-[var(--ink)] text-white md:grid-cols-2">
      {/* LEFT */}
      <div className="flex flex-col justify-between border-r border-white/10 p-8 md:p-16">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">03 / Capabilities</div>
        <div>
          {items.map((it, i) => (
            <button
              key={it.id}
              onMouseEnter={() => setActive(i)}
              data-cursor="hover"
              className="group block w-full border-t border-white/10 py-8 text-left last:border-b"
            >
              <div className="flex items-baseline justify-between">
                <span
                  className={`font-display text-4xl font-black tracking-tight transition-all md:text-7xl ${
                    active === i ? "translate-x-4 text-[var(--neon)]" : ""
                  }`}
                >
                  {it.label}
                </span>
                <span className="font-mono text-xs">0{i + 1}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="max-w-md text-sm text-white/60">
          Hover the rows. Each capability is a stand-alone studio practice — together they compound.
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative overflow-hidden">
        {items.map((it, i) => (
          <div
            key={it.id}
            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
              active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={it.img} alt={it.label} loading="lazy" className="h-full w-full object-cover" />
            <div className={`absolute inset-0 mix-blend-multiply opacity-60 ${it.color}`} />
            <div className="absolute bottom-10 left-10 font-display text-6xl font-black uppercase">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
