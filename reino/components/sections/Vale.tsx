"use client";

import { motion } from "framer-motion";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

/** Interlúdio poético — "O caminho de pedra até a cidadela". */
export function Vale() {
  return (
    <section id="vale" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/art/meadow.jpg)" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-sky-soft/70" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl px-6 py-32 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
      >
        <p className="font-display text-xs uppercase tracking-[0.35em] text-gold-deep">— Interlúdio —</p>
        <h2 className="mt-4 font-display text-4xl text-gold drop-shadow-sm md:text-5xl">
          O caminho de pedra até a cidadela
        </h2>
        <div className="mt-5">
          <OrnamentDivider />
        </div>
        <p className="mt-6 font-body text-xl italic leading-relaxed text-ink">
          ⚑ EDITÁVEL: todo projeto começa como uma trilha estreita entre flores — um esboço,
          uma tipografia escolhida a dedo, uma paleta ainda cheia de tinta fresca. Ao fim do
          caminho, torres.
        </p>
      </motion.div>
    </section>
  );
}
