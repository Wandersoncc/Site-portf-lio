import { content } from "@/data/content";

/**
 * Placeholder da Fase 0/1 — será substituído pelo orquestrador
 * (Portões → Mapa → Lugares) nas próximas fases.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 text-center">
      <div className="max-w-xl rounded-2xl border border-gold/40 bg-parchment/80 p-10 shadow-parchment backdrop-blur">
        <p className="font-rune text-gold-deep tracking-widest">⚜ O REINO ⚜</p>
        <h1 className="font-display text-4xl text-ink mt-2">{content.hero.name}</h1>
        <p className="font-body text-ink-soft mt-3">{content.hero.tagline}</p>
        <p className="mt-6 text-sm text-ink-soft/80">
          Fundação pronta. Os Portões, o Mapa e os Lugares chegam nas próximas fases.
        </p>
      </div>
    </main>
  );
}
