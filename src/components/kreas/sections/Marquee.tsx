export function Marquee() {
  const items = ["WE FIX BUSINESSES", "★", "WE BUILD BRANDS", "★", "WE GROW PRODUCTS", "★", "WE SHIP FAST", "★"];
  return (
    <section className="relative overflow-hidden bg-[var(--neon)] py-6 text-[var(--ink)]">
      <div className="marquee-track whitespace-nowrap font-display text-7xl font-black uppercase tracking-tight md:text-9xl">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-6">{t}</span>
        ))}
      </div>
    </section>
  );
}
