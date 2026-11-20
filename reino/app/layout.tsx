import type { Metadata, Viewport } from "next";
import { Cinzel_Decorative, Uncial_Antiqua, EB_Garamond } from "next/font/google";
import "./globals.css";
import { content } from "@/data/content";

const display = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});
const rune = Uncial_Antiqua({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rune",
  display: "swap",
});
const body = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reino.exemplo.com"), // ⚑ troque pela URL final do deploy
  title: `${content.hero.name} · O Reino`,
  description: `Portfólio-aventura de ${content.hero.name}, ${content.hero.course}. Explore um reino de fantasia medieval e descubra projetos, habilidades e a jornada do herói.`,
  keywords: ["portfólio", "ciência da computação", "fantasia medieval", "desenvolvedor", content.hero.name],
  openGraph: {
    title: `${content.hero.name} · O Reino`,
    description: "Um portfólio-experiência: explore um reino de fantasia e descubra a jornada do herói.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og/reino-og.png", width: 1200, height: 630, alt: "O Reino — portfólio de fantasia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.hero.name} · O Reino`,
    description: "Explore um reino de fantasia e descubra a jornada do herói.",
    images: ["/og/reino-og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#7cc576",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${rune.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
