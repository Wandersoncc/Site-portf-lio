import { content } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative border-t border-gold/20 bg-sky-soft/40 px-6 py-10 text-center">
      <p className="font-display text-xs uppercase tracking-[0.25em] text-ink-soft">
        {content.hero.name} · Feito à mão · MMXXVI
      </p>
      <p className="mt-2 font-body text-xs text-ink-soft/80">
        Música: trilha livre de direitos (placeholder) — veja o README para fontes
        (Pixabay, Free Music Archive, Incompetech) e a atribuição necessária.
      </p>
    </footer>
  );
}
