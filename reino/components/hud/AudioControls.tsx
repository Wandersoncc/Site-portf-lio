"use client";

import { useEffect, useState } from "react";
import { useReino } from "@/lib/store";
import { audio } from "@/lib/audio";

/** Controle de som sempre visível (canto superior direito do nav). */
export function AudioControls() {
  const { soundOn, volume, setSoundOn, setVolume, entered } = useReino();
  const [open, setOpen] = useState(false);

  // sincroniza Howler com o estado/preferência
  useEffect(() => {
    audio.mute(!soundOn);
    if (soundOn && entered) audio.startAmbient(volume);
  }, [soundOn, entered, volume]);

  const toggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (next && entered) audio.startAmbient(volume);
    audio.play("click");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={toggle}
        aria-label={soundOn ? "Desativar som" : "Ativar som"}
        aria-pressed={soundOn}
        className="grid h-9 w-9 place-items-center rounded-md border border-gold/40 bg-white/60 text-ink-soft transition hover:border-gold hover:text-gold-deep"
      >
        {soundOn ? "🔊" : "🔇"}
      </button>

      {soundOn && open && (
        <div className="absolute right-0 top-11 w-40 rounded-lg border border-gold/30 bg-white/90 p-3 shadow-frame backdrop-blur">
          <label className="mb-1 block font-body text-xs text-ink-soft">Volume</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-gold"
            aria-label="Volume da trilha"
          />
        </div>
      )}
    </div>
  );
}
