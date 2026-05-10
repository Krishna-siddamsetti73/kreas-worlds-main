import { motion } from "framer-motion";

export function VideoBg() {
  return (
    <section className="relative h-screen overflow-hidden bg-[var(--ink)] text-white">
      {/* simulated video background using animated gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ff006e_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#3a86ff_0%,transparent_45%),radial-gradient(circle_at_50%_50%,#8338ec_0%,transparent_60%)] animate-pulse" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage:
              "conic-gradient(from 0deg at 50% 50%, #ff006e, #8338ec, #3a86ff, #06ffa5, #ff006e)",
            backgroundSize: "200% 200%",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div>
          <div className="mb-6 inline-block rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.3em]">
            ⊙ Live · streaming growth
          </div>
          <h2 className="font-display text-6xl font-black leading-[0.85] tracking-tight md:text-[12rem]">
            BUILD <br />
            <span className="font-serif italic">with</span> <br />
            KREAS.
          </h2>
        </div>
      </div>
    </section>
  );
}
