"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

/** Ofício (sobre) + Contato (o corvo mensageiro). */
export function Oficio() {
  const { contact } = content;
  return (
    <>
      <section id="oficio" className="relative px-6 py-28 text-center">
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-ink-soft">Do Ofício</p>
          <h2 className="mt-3 font-display text-4xl text-gold drop-shadow-sm md:text-5xl">
            Construo interfaces como quem ilumina páginas
          </h2>
          <div className="mt-5">
            <OrnamentDivider />
          </div>
          <div className="mt-6 space-y-4 font-body text-lg leading-relaxed text-ink">
            {content.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contato" className="relative px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-deep">Envie um Corvo</p>
          <div className="mx-auto mt-10 max-w-sm space-y-8">
            <ContactLine label="Correspondência" value={contact.email} href={`mailto:${contact.email}`} />
            <ContactLine label="GitHub" value={shortUrl(contact.github)} href={contact.github} />
            <ContactLine label="LinkedIn" value={shortUrl(contact.linkedin)} href={contact.linkedin} />
          </div>
        </motion.div>
      </section>
    </>
  );
}

function ContactLine({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-[0.25em] text-ink-soft">{label}</p>
      <a href={href} className="mt-1 inline-block font-display text-xl text-gold-deep transition hover:text-gold">
        {value}
      </a>
      <div className="mx-auto mt-2 h-px w-10 bg-gold/50" />
    </div>
  );
}

function shortUrl(u: string) {
  return u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "").replace("github.com/", "@").replace("linkedin.com/in/", "in/");
}
