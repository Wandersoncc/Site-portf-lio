"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Folhas/sementes ao vento, bem sutis, sobre o fundo claro. */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; sway: number; hue: string };
    let motes: Mote[] = [];
    const palette = ["255,233,168", "255,255,255", "170,210,140", "210,225,245"];

    const spawn = (): Mote => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: Math.random() * 0.4 + 0.1,
      a: Math.random() * 0.4 + 0.15,
      sway: Math.random() * 2 + 1,
      hue: palette[Math.floor(Math.random() * palette.length)],
    });

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      motes = Array.from({ length: Math.min(44, Math.floor(w / 34)) }, spawn);
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y += m.vy;
        m.x += m.vx + Math.sin(m.y * 0.01) * m.sway * 0.2;
        if (m.y > h + 10) { m.y = -10; m.x = Math.random() * w; }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${m.hue},${m.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${m.hue},0.7)`;
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
