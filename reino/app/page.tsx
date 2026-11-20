"use client";

import { GateScreen } from "@/components/gate/GateScreen";
import { Nav } from "@/components/Nav";
import { Particles } from "@/components/fx/Particles";
import { Hero } from "@/components/sections/Hero";
import { Obras } from "@/components/sections/Obras";
import { Vale } from "@/components/sections/Vale";
import { Oficio } from "@/components/sections/Oficio";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <GateScreen />
      <Particles />
      <Nav />
      <main>
        <Hero />
        <Obras />
        <Vale />
        <Oficio />
      </main>
      <Footer />
    </>
  );
}
