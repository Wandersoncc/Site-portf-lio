/**
 * ════════════════════════════════════════════════════════════════
 *  CONTEÚDO DO REINO — edite TUDO por aqui.
 *  Troque os textos marcados com "⚑ EDITÁVEL" pelos seus dados reais.
 *  Nenhum componente precisa ser alterado para mudar o conteúdo.
 * ════════════════════════════════════════════════════════════════
 */

export type Stage = "gate" | "map" | "tavern" | "grimoire" | "quests" | "forge" | "raven";

export type ProjectStatus = "concluida" | "em-andamento" | "lenda";

export interface Project {
  id: string;
  roman: string; // numeral romano exibido (I, II, III...)
  subtitle: string; // ex.: "ATLAS INTERATIVO · MMXXV"
  title: string;
  description: string;
  status: ProjectStatus;
  rewards: string[]; // tecnologias exibidas como "recompensas"
  image: string; // caminho da ilustração (/art/...)
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1 = aprendiz … 5 = mestre
  note?: string;
}

export interface SkillGroup {
  category: string;
  icon: string; // emoji/glyph representando a categoria
  skills: Skill[];
}

export interface TimelineItem {
  year: string;
  title: string;
  place: string;
  detail: string;
}

export interface Content {
  hero: { name: string; course: string; institution: string; tagline: string };
  about: string[]; // parágrafos do diálogo da Taverna
  skills: SkillGroup[];
  projects: Project[];
  timeline: TimelineItem[];
  contact: { email: string; github: string; linkedin: string };
}

export const content: Content = {
  hero: {
    // ⚑ EDITÁVEL
    name: "[SEU NOME]",
    course: "Ciência da Computação",
    institution: "[SUA INSTITUIÇÃO]",
    tagline: "Aprendiz de feiticeiro dos algoritmos, viajante das terras do código.",
  },

  // ⚑ EDITÁVEL — fala do herói na Taverna (cada item é um "balão" de diálogo)
  about: [
    "Saudações, viajante. Senta-te junto ao fogo e ouve a minha história.",
    "Sou um aprendiz das artes da Computação, forjando feitiços em linguagens antigas e modernas.",
    "Movo-me pela curiosidade: entender como as máquinas pensam e dobrar a lógica à minha vontade.",
    "⚑ EDITÁVEL: troca este texto pelo teu resumo pessoal, em 2–3 frases.",
  ],

  // ⚑ EDITÁVEL
  skills: [
    {
      category: "Linguagens Arcanas",
      icon: "📜",
      skills: [
        { name: "JavaScript / TypeScript", level: 4, note: "Feitiços do navegador e do servidor." },
        { name: "Python", level: 4, note: "Encantamentos de dados e automação." },
        { name: "Java", level: 3, note: "Runas da orientação a objetos." },
        { name: "C / C++", level: 2, note: "Magia de baixo nível." },
      ],
    },
    {
      category: "Grimórios & Ferramentas",
      icon: "🛠️",
      skills: [
        { name: "React / Next.js", level: 4 },
        { name: "Node.js", level: 3 },
        { name: "Git & GitHub", level: 4 },
        { name: "SQL / Bancos de Dados", level: 3 },
      ],
    },
    {
      category: "Saberes Fundamentais",
      icon: "🔮",
      skills: [
        { name: "Algoritmos & Estruturas de Dados", level: 4 },
        { name: "Lógica & Matemática Discreta", level: 3 },
        { name: "Depuração (a arte negra)", level: 5, note: "Caçador de bugs incansável." },
      ],
    },
  ],

  // ⚑ EDITÁVEL — cada projeto é uma "crônica" (obra), com sua ilustração
  projects: [
    {
      id: "p1",
      roman: "I",
      subtitle: "ATLAS INTERATIVO · MMXXV",
      title: "A Floresta Verdejante",
      description:
        "⚑ EDITÁVEL: um atlas vivo de florestas imaginadas. Descreve aqui a tua obra — o problema, a ideia e a magia que a move.",
      status: "concluida",
      rewards: ["React", "TypeScript", "Canvas", "Motion"],
      image: "/art/forest.jpg",
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: "p2",
      roman: "II",
      subtitle: "CIDADELA EDITORIAL · MMXXV",
      title: "A Cidadela de Aldorion",
      description:
        "⚑ EDITÁVEL: portal narrativo para uma cidadela fictícia — crônicas, linhagens e mapas do vale, em tipografia editorial cinematográfica.",
      status: "em-andamento",
      rewards: ["React", "TanStack", "Tailwind", "SSR"],
      image: "/art/castle.jpg",
      repoUrl: "#",
    },
    {
      id: "p3",
      roman: "III",
      subtitle: "GRIMÓRIO VIVO · MMXXV",
      title: "O Códice Iluminado",
      description:
        "⚑ EDITÁVEL: uma aplicação full-stack em forma de manuscrito iluminado. Descreve a stack e os desafios vencidos sob a luz de vela.",
      status: "lenda",
      rewards: ["Node", "Banco de Dados", "API"],
      image: "/art/valley.jpg",
      demoUrl: "#",
      repoUrl: "#",
    },
  ],

  // ⚑ EDITÁVEL — formação e experiência (etapas da jornada)
  timeline: [
    { year: "—", title: "O Chamado", place: "O Início", detail: "Primeiros passos nas artes do código." },
    { year: "—", title: "A Academia", place: "Universidade", detail: "⚑ EDITÁVEL: teu curso e ano de início." },
    { year: "—", title: "A Primeira Missão", place: "Experiência", detail: "⚑ EDITÁVEL: estágio, projeto ou trabalho." },
    { year: "Agora", title: "A Busca Continua", place: "Presente", detail: "Em busca da maestria e de novas missões." },
  ],

  // ⚑ EDITÁVEL
  contact: {
    email: "voce@exemplo.com",
    github: "https://github.com/seu-usuario",
    linkedin: "https://linkedin.com/in/seu-usuario",
  },
};

/** Metadados dos "lugares" do reino (usados pelo mapa e pelo áudio). */
export const places: Record<
  Exclude<Stage, "gate" | "map">,
  { label: string; sub: string; icon: string; x: number; y: number }
> = {
  // x/y em porcentagem do mapa (0–100)
  tavern: { label: "A Taverna", sub: "Sobre o herói", icon: "🍺", x: 24, y: 62 },
  grimoire: { label: "O Grimório", sub: "Habilidades", icon: "📖", x: 48, y: 40 },
  quests: { label: "Quadro de Missões", sub: "Projetos", icon: "📜", x: 72, y: 56 },
  forge: { label: "A Forja", sub: "Jornada", icon: "🔨", x: 60, y: 76 },
  raven: { label: "O Corvo Mensageiro", sub: "Contato", icon: "🐦‍⬛", x: 84, y: 30 },
};
