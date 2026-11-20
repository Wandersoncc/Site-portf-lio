"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Options {
  speed?: number; // ms por caractere
  startDelay?: number;
  enabled?: boolean; // se false, revela tudo de imediato (ex.: reduced-motion)
}

/**
 * Efeito de digitação. Retorna o texto parcial, se terminou, e uma função
 * para "pular" e revelar tudo.
 */
export function useTypewriter(full: string, { speed = 28, startDelay = 150, enabled = true }: Options = {}) {
  const [shown, setShown] = useState(enabled ? "" : full);
  const [done, setDone] = useState(!enabled);
  const idx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const skip = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    idx.current = full.length;
    setShown(full);
    setDone(true);
  }, [full]);

  useEffect(() => {
    if (!enabled) {
      setShown(full);
      setDone(true);
      return;
    }
    idx.current = 0;
    setShown("");
    setDone(false);

    const step = () => {
      idx.current += 1;
      setShown(full.slice(0, idx.current));
      if (idx.current >= full.length) {
        setDone(true);
        return;
      }
      timer.current = setTimeout(step, speed);
    };
    timer.current = setTimeout(step, startDelay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [full, speed, startDelay, enabled]);

  return { shown, done, skip };
}
