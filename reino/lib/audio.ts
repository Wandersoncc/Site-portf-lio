"use client";

import { Howl, Howler } from "howler";

/**
 * Sistema de áudio do reino (Howler).
 * - Inicializa só após o gesto do usuário ("Iniciar Jornada").
 * - Trilha ambiente com fade in/out.
 * - SFX curtos de UI.
 * - Degrada graciosamente se o arquivo não existir (placeholders).
 *
 * Arquivos esperados em /public/audio/ (ver README):
 *   ambient.mp3  — trilha ambiente em loop
 *   click.mp3, page.mp3, chime.mp3 — efeitos (opcionais)
 */

let ambient: Howl | null = null;
let started = false;
const sfx: Record<string, Howl> = {};

function makeHowl(src: string, opts: { loop?: boolean; volume?: number } = {}): Howl | null {
  try {
    return new Howl({
      src: [src],
      html5: true,
      loop: opts.loop ?? false,
      volume: opts.volume ?? 1,
      onloaderror: () => {
        /* arquivo ausente: silêncio, sem quebrar */
      },
      onplayerror: () => {},
    });
  } catch {
    return null;
  }
}

export const audio = {
  /** Inicia a trilha ambiente (idempotente). volume 0..1 */
  startAmbient(volume: number) {
    if (started) {
      this.setVolume(volume);
      return;
    }
    started = true;
    ambient = makeHowl("/audio/ambient.mp3", { loop: true, volume: 0 });
    if (ambient) {
      ambient.play();
      ambient.fade(0, volume, 1200);
    }
  },

  setVolume(volume: number) {
    if (ambient) ambient.fade(ambient.volume(), volume, 400);
  },

  mute(muted: boolean) {
    Howler.mute(muted);
  },

  stop() {
    if (ambient) ambient.fade(ambient.volume(), 0, 600);
  },

  /** Toca um efeito curto. Se o áudio estiver mudo (Howler.mute), nada soa. */
  play(name: "click" | "page" | "chime", volume = 0.4) {
    if (!started) return; // só após iniciar a jornada
    if (!sfx[name]) {
      const h = makeHowl(`/audio/${name}.mp3`, { volume });
      if (h) sfx[name] = h;
    }
    sfx[name]?.play();
  },

  get isStarted() {
    return started;
  },
};
