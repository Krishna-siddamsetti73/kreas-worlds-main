import { motion } from "framer-motion";
import e1 from "@/assets/editorial-1.jpg";
import e2 from "@/assets/editorial-2.jpg";
import b1 from "@/assets/brutalist-1.jpg";

export function Editorial() {
  return (
    <section className="relative bg-[var(--bone)] py-32 text-[var(--ink)]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <p className="mb-16 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]/50">07 / Manifesto</p>

        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="col-span-12 md:col-span-7"
          >
            <h2 className="font-serif text-5xl italic leading-[1.05] md:text-8xl">
              We don't make<br/>brochures.<br/>
              <span className="font-display not-italic">We make</span><br/>
              <span className="text-[var(--acid)]">machines.</span>
            </h2>
          </motion.div>
          <motion.img
            src={e1} alt="" loading="lazy" width={1280} height={1600}
            initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
            className="col-span-12 aspect-[3/4] w-full rounded-2xl object-cover md:col-span-5"
          />
          <div className="col-span-12 my-16 grid grid-cols-12 gap-6">
            <img src={e2} alt="" loading="lazy" width={1280} height={1600} className="col-span-12 aspect-[4/5] rounded-2xl object-cover md:col-span-4" />
            <div className="col-span-12 space-y-6 self-center md:col-span-5">
              <p className="font-serif text-2xl italic md:text-3xl">
                The good stuff lives in the friction between disciplines — strategy that designs, design that ships, code that sells.
              </p>
              <p className="text-sm text-[var(--ink)]/60">— Founders' note, KREAS Quarterly Vol. 04</p>
            </div>
            <img src={b1} alt="" loading="lazy" width={1600} height={1280} className="col-span-12 mt-12 aspect-[16/10] rounded-2xl object-cover md:col-span-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
