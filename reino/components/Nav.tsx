"use client";

import { AudioControls } from "./hud/AudioControls";
import { audio } from "@/lib/audio";

const LINKS = [
  { href: "#obras", label: "Obras" },
  { href: "#vale", label: "Vale" },
  { href: "#oficio", label: "Ofício" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3 md:px-8">
      <a href="#topo" className="font-display text-lg tracking-widest text-gold-deep drop-shadow-sm" aria-label="Início">
        W<span className="font-rune">.m</span>
      </a>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => audio.play("click")}
            className="group relative font-display text-xs uppercase tracking-[0.2em] text-ink-soft transition hover:text-gold-deep"
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <AudioControls />
    </header>
  );
}
