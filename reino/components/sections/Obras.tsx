"use client";

import { motion } from "framer-motion";
import { content, type Project } from "@/data/content";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

const STATUS_LABEL: Record<Project["status"], string> = {
  concluida: "Crônica Concluída",
  "em-andamento": "Em Escrita",
  lenda: "Lenda",
};

function Crisis({ p, i }: { p: Project; i: number }) {
  return (
    <article className="mx-auto mb-28 max-w-3xl">
      {/* ilustração em moldura */}
      <motion.div
        className="overflow-hidden rounded-sm border border-gold/40 p-1 shadow-frame"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={p.image}
          alt={`Ilustração da obra ${p.title}`}
          className="h-[46vh] w-full rounded-sm object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* cabeçalho: numeral + subtítulo + título */}
      <div className="mt-6 flex items-baseline gap-4">
        <span className="font-display text-4xl text-gold/70">{p.roman}</span>
        <span className="font-display text-xs uppercase tracking-[0.25em] text-ink-soft">{p.subtitle}</span>
      </div>
      <h3 className="mt-1 font-display text-4xl text-gold-deep drop-shadow-sm">{p.title}</h3>

      {/* cartela de pergaminho com selo de cera */}
      <motion.div
        className="parchment-tex relative mt-5 rounded-md border border-parchment-edge p-7 shadow-parchment"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="absolute -top-3 right-8 grid h-10 w-10 place-items-center rounded-full text-xs text-white shadow-md"
          style={{ background: "radial-gradient(circle at 38% 34%, #e35b5b, #a01f1f 65%, #701515)" }}
          aria-hidden="true"
          title={STATUS_LABEL[p.status]}
        >
          ✶
        </span>
        <p className="font-body text-lg italic leading-relaxed text-ink">{p.description}</p>

        <div className="mt-5 border-t border-ink/15 pt-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {p.rewards.map((r) => (
              <span key={r} className="font-display text-xs uppercase tracking-[0.2em] text-gold-deep">
                {r}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ações */}
      <div className="mt-5 flex items-center gap-6">
        {p.demoUrl && (
          <a href={p.demoUrl} className="font-display text-sm uppercase tracking-[0.2em] text-gold-deep underline-offset-4 hover:underline">
            Ler a Crônica
          </a>
        )}
        {p.repoUrl && (
          <a href={p.repoUrl} className="font-display text-sm uppercase tracking-[0.2em] text-ink-soft underline-offset-4 hover:text-gold-deep hover:underline">
            O Pergaminho
          </a>
        )}
      </div>
    </article>
  );
}

export function Obras() {
  return (
    <section id="obras" className="relative px-5 py-24 md:px-8">
      <div className="mb-16 text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-ink-soft">Codex · Obras Selecionadas</p>
        <h2 className="mt-2 font-display text-5xl text-gold drop-shadow-sm">Três Mundos</h2>
        <div className="mt-4">
          <OrnamentDivider />
        </div>
      </div>

      {content.projects.map((p, i) => (
        <Crisis key={p.id} p={p} i={i} />
      ))}
    </section>
  );
}
