export function Footer() {
  return (
    <footer className="relative bg-white py-16 text-[var(--ink)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="font-display text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter text-stroke">
          BUILD WITH KRIS
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/40">Studio</div>
            <p>Lisbon · Brooklyn<br/>hello@kris.studio</p>
          </div>
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/40">Capabilities</div>
            <p>Brand · Product<br/>Growth · Content</p>
          </div>
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/40">Social</div>
            <p>Instagram · Are.na<br/>Read.cv · LinkedIn</p>
          </div>
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/40">© 2026</div>
            <p>KRIS — All worlds<br/>reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
