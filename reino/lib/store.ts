"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Stage } from "@/data/content";

type Place = Exclude<Stage, "gate" | "map">;

interface ReinoState {
  // navegação
  stage: Stage;
  setStage: (s: Stage) => void;

  // áudio (persistido)
  soundOn: boolean;
  volume: number; // 0..1
  setSoundOn: (v: boolean) => void;
  setVolume: (v: number) => void;

  // progresso de exploração (persistido)
  visited: Place[];
  visit: (p: Place) => void;
  achievement: boolean; // visitou todos os 5
  easterEggFound: boolean;
  findEasterEgg: () => void;

  // controle do onboarding dos portões
  entered: boolean;
  enter: () => void;
}

const ALL_PLACES: Place[] = ["tavern", "grimoire", "quests", "forge", "raven"];

export const useReino = create<ReinoState>()(
  persist(
    (set, get) => ({
      stage: "gate",
      setStage: (s) => set({ stage: s }),

      soundOn: true,
      volume: 0.6,
      setSoundOn: (v) => set({ soundOn: v }),
      setVolume: (v) => set({ volume: Math.min(1, Math.max(0, v)) }),

      visited: [],
      visit: (p) => {
        const cur = get().visited;
        if (cur.includes(p)) return;
        const next = [...cur, p];
        set({
          visited: next,
          achievement: ALL_PLACES.every((pl) => next.includes(pl)),
        });
      },
      achievement: false,
      easterEggFound: false,
      findEasterEgg: () => set({ easterEggFound: true }),

      entered: false,
      enter: () => set({ entered: true }),
    }),
    {
      name: "reino-save",
      // só persistimos preferências e progresso — não a stage atual
      partialize: (s) => ({
        soundOn: s.soundOn,
        volume: s.volume,
        visited: s.visited,
        achievement: s.achievement,
        easterEggFound: s.easterEggFound,
      }),
    }
  )
);

export const TOTAL_PLACES = ALL_PLACES.length;
