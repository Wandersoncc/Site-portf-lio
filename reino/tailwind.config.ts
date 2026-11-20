import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // paleta do reino (pradaria / amanhecer / pergaminho)
        meadow: { DEFAULT: "#7cc576", deep: "#4f9e5b", shade: "#3c7a46" },
        sky: { DEFAULT: "#bcd9ef", soft: "#d7ecf8", deep: "#8ab6d8" },
        dawn: "#ffd9a0",
        gold: { DEFAULT: "#e3a43a", deep: "#c6862a", light: "#ffe9a8" },
        parchment: { DEFAULT: "#f3e7cf", dark: "#e4d2ad", edge: "#cdb88a" },
        wood: { DEFAULT: "#6b4a2b", deep: "#4a3119", light: "#8a6239" },
        ink: { DEFAULT: "#2f4552", soft: "#5c7382" },
        night: { DEFAULT: "#1b2a3a", deep: "#0f1a28" },
        ember: "#d4541e",
        rune: "#9fe3c0",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],   // Cinzel Decorative
        rune: ["var(--font-rune)", "serif"],          // Uncial Antiqua
        body: ["var(--font-body)", "Georgia", "serif"], // EB Garamond
      },
      boxShadow: {
        frame: "0 14px 40px rgba(60,90,110,.25), inset 0 0 0 1px rgba(227,164,58,.3)",
        glow: "0 0 24px rgba(227,164,58,.5)",
        parchment: "0 10px 30px rgba(74,49,25,.25), inset 0 2px 10px rgba(255,255,255,.4)",
      },
      backgroundImage: {
        "dawn-sky":
          "radial-gradient(120% 80% at 85% 8%, rgba(255,243,196,.9) 0%, transparent 42%), radial-gradient(90% 60% at 20% 0%, rgba(246,184,198,.5) 0%, transparent 45%), linear-gradient(180deg,#ffe7c2 0%,#ffd7cf 14%,#f8c6d2 26%,#d9c6e4 40%,#bcd4ec 55%,#bfe3e6 72%,#cdeedd 86%,#e7f6e4 100%)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer: { "0%": { transform: "translateX(-60px)" }, "100%": { transform: "translateX(600px)" } },
        glowPulse: {
          "0%,100%": { filter: "drop-shadow(0 0 6px rgba(227,164,58,.4))" },
          "50%": { filter: "drop-shadow(0 0 20px rgba(227,164,58,.85))" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        glowPulse: "glowPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
