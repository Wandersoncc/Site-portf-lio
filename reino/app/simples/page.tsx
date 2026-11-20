import type { Metadata } from "next";
import { content } from "@/data/content";

export const metadata: Metadata = {
  title: `${content.hero.name} · Versão simples`,
  description: "Versão acessível, em lista, do portfólio.",
};

/** Versão simples/acessível: conteúdo linear, sem canvas/áudio/animações. */
export default function Simples() {
  const { hero, about, skills, projects, timeline, contact } = content;
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 font-body text-ink">
      <a href="/" className="font-display text-sm text-gold-deep underline">← Entrar no Reino (versão completa)</a>

      <header className="mt-6">
        <h1 className="font-display text-4xl text-gold-deep">{hero.name}</h1>
        <p className="mt-1 italic">{hero.course} · {hero.institution}</p>
        <p className="mt-1">{hero.tagline}</p>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-gold-deep">Sobre</h2>
        {about.map((p, i) => <p key={i} className="mt-2">{p}</p>)}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-gold-deep">Habilidades</h2>
        {skills.map((g) => (
          <div key={g.category} className="mt-3">
            <h3 className="font-display text-lg">{g.icon} {g.category}</h3>
            <ul className="ml-5 list-disc">
              {g.skills.map((s) => (
                <li key={s.name}>{s.name} — nível {s.level}/5{s.note ? ` · ${s.note}` : ""}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-gold-deep">Projetos</h2>
        {projects.map((p) => (
          <article key={p.id} className="mt-4">
            <h3 className="font-display text-lg">{p.title} <span className="text-sm text-ink-soft">({p.subtitle})</span></h3>
            <p>{p.description}</p>
            <p className="text-sm text-ink-soft">Tecnologias: {p.rewards.join(", ")}</p>
            <p className="text-sm">
              {p.demoUrl && <a className="text-gold-deep underline" href={p.demoUrl}>Demo</a>}
              {p.demoUrl && p.repoUrl && " · "}
              {p.repoUrl && <a className="text-gold-deep underline" href={p.repoUrl}>Repositório</a>}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-gold-deep">Jornada</h2>
        <ul className="ml-5 list-disc">
          {timeline.map((t, i) => (
            <li key={i}><strong>{t.year}</strong> — {t.title} ({t.place}): {t.detail}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 mb-16">
        <h2 className="font-display text-2xl text-gold-deep">Contato</h2>
        <ul className="ml-5 list-disc">
          <li>E-mail: <a className="text-gold-deep underline" href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li>GitHub: <a className="text-gold-deep underline" href={contact.github}>{contact.github}</a></li>
          <li>LinkedIn: <a className="text-gold-deep underline" href={contact.linkedin}>{contact.linkedin}</a></li>
        </ul>
      </section>
    </main>
  );
}
