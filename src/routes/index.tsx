import { createFileRoute } from "@tanstack/react-router";
import { CinematicHero } from "@/components/kris/CinematicHero";
import { TypoDistort } from "@/components/kris/TypoDistort";
import { ImageSequence } from "@/components/kris/ImageSequence";
import { SplitProblemSolution } from "@/components/kris/SplitProblemSolution";
import { FullscreenTakeover } from "@/components/kris/FullscreenTakeover";
import { HiddenCTA } from "@/components/kris/HiddenCTA";
import { Footer } from "@/components/kreas/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KRIS — Enter the system" },
      { name: "description", content: "A cinematic creative studio. Brand, product, and growth systems engineered for ambitious founders." },
      { property: "og:title", content: "KRIS — Enter the system" },
      { property: "og:description", content: "Brand, product, and growth systems for ambitious founders." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <CinematicHero />
      <TypoDistort />
      <ImageSequence />
      <SplitProblemSolution />
      <FullscreenTakeover />
      <HiddenCTA />
      <Footer />
    </main>
  );
}
