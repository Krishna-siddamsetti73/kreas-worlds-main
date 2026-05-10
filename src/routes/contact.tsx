import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KRIS" },
      { name: "description", content: "Tell us about your project. Four questions, one minute." },
      { property: "og:title", content: "Contact — KRIS" },
      { property: "og:description", content: "A conversation, not a form." },
    ],
  }),
  component: ContactPage,
});

const steps = [
  { id: "type", q: "What are you building?", opts: ["Brand", "Product", "Growth", "Everything"] },
  { id: "budget", q: "Budget range?", opts: ["< $25k", "$25–75k", "$75–200k", "$200k+"] },
  { id: "when", q: "When do you start?", opts: ["This week", "This month", "This quarter", "Exploring"] },
  { id: "email", q: "Where do we reply?", input: true },
];

const moodByAnswer: Record<string, string> = {
  Brand: "var(--ultra)",
  Product: "var(--electric)",
  Growth: "var(--neon)",
  Everything: "var(--magenta)",
};

function ContactPage() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  const accent = moodByAnswer[answers.type] ?? "var(--neon)";
  const step = steps[i];

  const choose = (val: string) => {
    setAnswers((a) => ({ ...a, [step.id]: val }));
    if (i < steps.length - 1) setI(i + 1);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswers((a) => ({ ...a, email }));
    setDone(true);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white transition-colors duration-700"
      style={{ background: `radial-gradient(circle at 30% 30%, ${accent}, var(--ink) 70%)` }}
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-32 md:px-12">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.4em] text-white/60">
          <span>Conversation · Step {Math.min(i + 1, steps.length)} / {steps.length}</span>
          <div className="flex gap-1">
            {steps.map((_, k) => (
              <span key={k} className={`h-1 w-8 rounded ${k <= i ? "bg-[var(--neon)]" : "bg-white/20"}`} />
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--neon)]">Brief received</p>
                <h2 className="mt-6 font-display text-5xl font-black md:text-8xl">
                  We'll be in touch<br/><span className="font-serif italic">within 48h.</span>
                </h2>
                <div className="mt-12 max-w-xl rounded-2xl border border-white/15 bg-black/30 p-6 backdrop-blur">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Your brief</div>
                  <ul className="mt-3 space-y-1 text-sm">
                    <li>Type · {answers.type}</li>
                    <li>Budget · {answers.budget}</li>
                    <li>Start · {answers.when}</li>
                    <li>Email · {email}</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
                className="w-full"
              >
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">Q.0{i + 1}</p>
                <h2 className="mt-6 max-w-3xl font-display text-5xl font-black leading-[0.95] md:text-8xl">
                  {step.q}
                </h2>
                {step.input ? (
                  <form onSubmit={submit} className="mt-12 flex max-w-2xl gap-4">
                    <input
                      type="email" required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@studio.com"
                      className="flex-1 border-b border-white/40 bg-transparent pb-3 font-display text-2xl outline-none placeholder:text-white/30"
                    />
                    <button data-cursor="hover" type="submit" className="rounded-full bg-[var(--neon)] px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink)]">
                      Send →
                    </button>
                  </form>
                ) : (
                  <div className="mt-12 flex flex-wrap gap-3">
                    {step.opts!.map((o) => (
                      <button
                        key={o}
                        data-cursor="hover"
                        onClick={() => choose(o)}
                        className="rounded-full border border-white/30 bg-white/5 px-6 py-3 font-display text-xl backdrop-blur transition hover:bg-[var(--neon)] hover:text-[var(--ink)]"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}
                {i > 0 && (
                  <button
                    onClick={() => setI(i - 1)}
                    data-cursor="hover"
                    className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
                  >
                    ← back
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="pb-8 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
          KRIS · hello@kris.studio · Lisbon / Brooklyn
        </footer>
      </div>
    </main>
  );
}