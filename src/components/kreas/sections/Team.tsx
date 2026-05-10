import { motion } from "framer-motion";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";

const team = [
  { img: t1, name: "Mira Solis", role: "Founder · Strategy", trait: "Reads tarot for fintechs" },
  { img: t2, name: "Theo Vance", role: "Design Director", trait: "Built fonts for breakfast" },
  { img: t3, name: "Aiya Park", role: "Head of Engineering", trait: "Once shipped on a flight" },
];

export function Team() {
  return (
    <section id="studio" className="relative bg-[var(--bone)] py-32 text-[var(--ink)]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <p className="mb-16 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/50">10 / Studio</p>
        <h2 className="mb-20 max-w-3xl font-display text-5xl font-black leading-[0.9] md:text-8xl">
          The humans <span className="font-serif italic text-[var(--acid)]">behind</span> the worlds.
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {team.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              data-cursor="hover"
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--ink)]/10">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end justify-center bg-[var(--ink)]/80 p-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="font-serif text-2xl italic">"{p.trait}"</p>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <span className="font-mono text-xs text-[var(--ink)]/50">0{i + 1}</span>
              </div>
              <p className="text-sm text-[var(--ink)]/60">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
