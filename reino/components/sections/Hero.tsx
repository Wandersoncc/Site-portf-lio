"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

export function Hero() {
  return (
    <section id="topo" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ilustração de fundo */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/art/castle.jpg)" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-soft/30 via-sky-soft/10 to-sky-soft/80" aria-hidden="true" />

      <motion.div
        className="relative z-10 px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="font-display text-xs uppercase tracking-[0.4em] text-gold-deep">
          Anno · Portfolio · MMXXVI
        </p>
        <h1 className="mt-4 font-display text-6xl leading-none text-gold drop-shadow-[0_3px_12px_rgba(255,255,255,.55)] md:text-8xl">
          {content.hero.name}
        </h1>
        <div className="mt-4">
          <OrnamentDivider />
        </div>
        <p className="mt-4 font-body text-xl italic text-ink">
          {content.hero.course} · {content.hero.institution}
        </p>
        <p className="mx-auto mt-3 max-w-xl font-body text-ink/90">
          Interfaces forjadas com cuidado de artesão — tipografia, ritmo e atmosfera,
          linha a linha, como páginas de um manuscrito.
        </p>
        <a
          href="#obras"
          className="mt-10 inline-block font-display text-sm uppercase tracking-[0.3em] text-gold-deep transition hover:text-gold"
        >
          Ver as Obras
          <span className="mt-2 block h-8 w-px animate-float bg-gold/60" aria-hidden="true" style={{ margin: "8px auto 0" }} />
        </a>
      </motion.div>
    </section>
  );
}
