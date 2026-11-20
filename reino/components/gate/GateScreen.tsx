"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReino } from "@/lib/store";
import { audio } from "@/lib/audio";
import { content } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Portões do Reino: tela de entrada com escolha de som. */
export function GateScreen() {
  const { entered, enter, setSoundOn, volume } = useReino();
  const reduced = useReducedMotion();

  const start = (withSound: boolean) => {
    setSoundOn(withSound);
    if (withSound) audio.startAmbient(volume);
    audio.play("chime");
    enter();
  };

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dawn-sky"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: reduced ? 0.3 : 0.9, ease: "easeInOut" }}
        >
          {/* ilustração atmosférica de fundo (castelo pintado) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/art/castle.jpg)", opacity: 0.5 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-soft/40 via-transparent to-sky-soft/70" aria-hidden="true" />

          <motion.div
            className="relative z-10 px-6 text-center"
            initial={reduced ? {} : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold-deep">
              Anno · Portfolio · MMXXVI
            </p>
            <h1 className="mt-4 font-display text-5xl text-gold drop-shadow-[0_2px_10px_rgba(255,255,255,.5)] md:text-7xl">
              {content.hero.name}
            </h1>
            <p className="mt-3 font-body text-lg italic text-ink">{content.hero.tagline}</p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => start(true)}
                className="rounded-full bg-gradient-to-b from-dawn to-gold px-8 py-3 font-display text-sm uppercase tracking-widest text-wood-deep shadow-glow transition hover:-translate-y-0.5"
              >
                Iniciar Jornada · com som 🔊
              </button>
              <button
                onClick={() => start(false)}
                className="font-display text-xs uppercase tracking-widest text-ink-soft underline-offset-4 transition hover:text-gold-deep hover:underline"
              >
                entrar em silêncio
              </button>
              <a
                href="/simples"
                className="mt-2 font-body text-xs text-ink-soft/80 underline underline-offset-2 hover:text-gold-deep"
              >
                Ver versão simples (acessível)
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
