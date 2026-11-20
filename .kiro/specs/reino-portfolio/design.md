# Design — "O Reino" (Portfólio-Experiência)

## 1. Stack e arquitetura

- **Next.js 14+ (App Router) + TypeScript (strict)** — SSG/ISR; páginas pré-renderizadas.
- **Tailwind CSS** — tema estendido com tokens do reino (cores, fontes, sombras).
- **Framer Motion** — transições de "viagem", entradas de seção, micro-interações.
  (GSAP só se uma animação específica exigir timeline complexa; evitar duplicar libs.)
- **Howler.js** — trilhas por lugar, crossfade, SFX, volume/mute persistido.
- **Three.js / React Three Fiber** — OPCIONAL, isolado e lazy, só num elemento de destaque.
- **Zustand** (store leve) para estado global: som (on/off, volume), lugar atual, lugares
  visitados, conquista, easter egg. Persistência via middleware `persist` (localStorage).

### Estrutura de pastas
```
reino/
├─ app/
│  ├─ layout.tsx            # fontes, metadata/OG, providers
│  ├─ page.tsx              # orquestra Portões → Mapa → Seções (SPA-like)
│  ├─ simples/page.tsx      # "versão simples/lista" acessível (conteúdo linear)
│  └─ globals.css           # Tailwind + variáveis do tema
├─ components/
│  ├─ gate/GateScreen.tsx           # Portões do Reino (entrada)
│  ├─ map/KingdomMap.tsx            # mapa SVG + parallax + pontos
│  ├─ map/MapPoint.tsx              # ponto de interesse (hover/focus)
│  ├─ places/Tavern.tsx             # Sobre (diálogo RPG + typewriter)
│  ├─ places/Grimoire.tsx           # Habilidades (árvore/inventário)
│  ├─ places/QuestBoard.tsx         # Projetos (missões)
│  ├─ places/Forge.tsx              # Formação (linha do tempo)
│  ├─ places/Raven.tsx              # Contato (corvo + formulário)
│  ├─ ui/ScrollPanel.tsx            # moldura de pergaminho/madeira reutilizável
│  ├─ ui/DialogueBox.tsx            # caixa de diálogo com typewriter
│  ├─ ui/Button.tsx, Tooltip.tsx, Frame.tsx
│  ├─ hud/AudioControls.tsx         # mudo/volume (sempre visível)
│  ├─ hud/ExplorationMeter.tsx      # "X de 5 locais" + conquista
│  ├─ hud/CustomCursor.tsx
│  ├─ fx/Particles.tsx              # canvas: sementes/vaga-lumes/folhas
│  ├─ fx/SkyLayer.tsx               # céu/iluminação por lugar (dia/noite)
│  └─ a11y/ReducedMotionGate.tsx    # alterna animações conforme preferência
├─ lib/
│  ├─ audio.ts              # wrapper Howler (load lazy, crossfade, sfx)
│  ├─ store.ts              # Zustand (som, progresso, easter egg)
│  ├─ useTypewriter.ts
│  └─ useReducedMotion.ts
├─ data/
│  └─ content.ts           # ÚNICO arquivo de conteúdo (tipado)
├─ public/
│  ├─ audio/               # placeholders (ver README)
│  ├─ og/                  # imagem Open Graph original
│  └─ textures/            # texturas livres (pergaminho/madeira) ou SVG inline
└─ README.md
```

## 2. Modelo de conteúdo (`data/content.ts`)

```ts
export interface Project {
  id: string; title: string; description: string;
  status: 'concluida' | 'em-andamento' | 'lenda';
  rewards: string[];                 // tecnologias ("recompensas")
  demoUrl?: string; repoUrl?: string;
}
export interface Skill { name: string; level: 1|2|3|4|5; note?: string; }
export interface SkillGroup { category: string; icon: string; skills: Skill[]; }
export interface TimelineItem { year: string; title: string; place: string; detail: string; }
export interface Content {
  hero: { name: string; course: string; institution: string; tagline: string };
  about: string[];                   // parágrafos do diálogo da Taverna
  skills: SkillGroup[];
  projects: Project[];
  timeline: TimelineItem[];
  contact: { email: string; github: string; linkedin: string };
  // textos de exemplo marcados com prefixo "⚑ EDITÁVEL:" quando placeholder
}
export const content: Content = { /* placeholders no tom medieval, editáveis */ };
```

## 3. Fluxo de navegação (máquina de estados)

```
            Iniciar Jornada
 [PORTÕES] ─────────────────▶ [MAPA] ◀───────── voltar (Esc / botão)
                                │  ▲
             ativar ponto ──────┘  └────── ao concluir leitura
                                │
          ┌──────────┬──────────┼──────────┬──────────┐
       [TAVERNA] [GRIMÓRIO] [QUADRO]    [FORJA]    [CORVO]
```

- Estado `stage`: `'gate' | 'map' | 'tavern' | 'grimoire' | 'quests' | 'forge' | 'raven'`.
- Transição MAPA→lugar: a câmera faz **pan/zoom** em direção ao ponto; o lugar surge por cima.
  Com `prefers-reduced-motion`: fade simples.
- Cada entrada em lugar novo registra `visited.add(place)`; ao completar 5/5 dispara a conquista.
- Esc e um botão "Voltar ao mapa" sempre disponíveis; foco é movido ao conteúdo ao entrar.

## 4. Direção de arte

### Paleta (tokens Tailwind)
| Token          | Hex       | Uso                                   |
|----------------|-----------|---------------------------------------|
| `meadow`       | `#7cc576` | verde pradaria                        |
| `meadow-deep`  | `#4f9e5b` | verde sombra                          |
| `sky`          | `#bcd9ef` | azul-celeste                          |
| `dawn`         | `#ffd9a0` | dourado amanhecer                     |
| `gold`         | `#e3a43a` | dourado envelhecido (destaques)       |
| `parchment`    | `#f3e7cf` | pergaminho (painéis/UI)               |
| `wood`         | `#6b4a2b` | madeira (molduras)                    |
| `ink`          | `#2f4552` | texto sobre claro                     |
| `night`        | `#1b2a3a` | céu/texto em modo noturno (Grimório)  |

- Cada lugar tem um "humor" de céu: Taverna (fim de tarde dourado), Grimório (noite azul,
  vaga-lumes), Quadro (meio-dia claro), Forja (brasa quente), Corvo (crepúsculo roxo).

### Tipografia (Google Fonts)
- **Display/títulos**: Cinzel Decorative (principal) + Uncial Antiqua (acentos élficos).
- **Texto longo**: EB Garamond (serifada legível).
- `next/font` para auto-host e performance; `display: swap`.

### UI "pergaminho, madeira e metal"
- `ScrollPanel`/`Frame`: molduras SVG ornamentadas (cantos de filigrana), fundo de pergaminho
  (textura SVG/CSS), cantoneiras de metal. Sombra suave e borda dourada.

### Ilustrações
- Mapa e pontos em **SVG** (camadas para parallax: céu, montanhas, colinas, floresta, primeiro
  plano). Partículas e céu em **canvas** (leve). Sem imagens rasterizadas pesadas.

## 5. Mapa do Reino (detalhe)

- SVG viewBox grande; 4–5 camadas com `data-depth` para parallax (mouse/scroll/deviceorientation).
- Pontos de interesse posicionados em coordenadas do viewBox; cada um é um `<button>` acessível
  com rótulo, estado `visited`, animação de brilho/runa no hover/focus.
- "Trilha" pontilhada ligando os pontos (reforça a ideia de jornada).
- Easter egg: um item escondido (ex.: uma pequena gema/cogumelo) em local improvável, com
  `aria-label` discreto; ao achar, dispara recompensa visual + registro em store.
- Mobile: pan por arraste; pontos com alvo ≥ 44px; parallax por `deviceorientation` (opcional,
  com permissão) ou desativado.

## 6. Sistema de áudio (`lib/audio.ts`)

- Singleton que inicializa Howler **somente após "Iniciar Jornada"**.
- Mapa `placeTrack: Record<stage, src>`; troca de lugar faz `fade(current→0)` + `fade(next→vol)`
  (crossfade ~800ms).
- SFX curtos (clique, folhear, vento, "whoosh" de viagem) tocados sob demanda.
- Estado de som/volume no store, persistido; respeita escolha "sem som" dos Portões.
- Degradação: se o arquivo não existir (404), captura erro e segue sem áudio; controles seguem
  visíveis (tooltip: "trilha não instalada — veja o README").

## 7. Acessibilidade

- `ReducedMotionGate` lê `prefers-reduced-motion` e um toggle manual; desliga parallax,
  partículas e pan/zoom, trocando por fades.
- Rota `/simples`: todo o conteúdo em HTML linear semântico (headings, listas, links), sem
  canvas/áudio, ideal para leitor de tela e para quem quer "só o conteúdo". Link visível
  ("Ver versão simples") nos Portões e no rodapé.
- Foco: trap leve dentro de cada lugar, Esc volta ao mapa, foco inicial no título do lugar.
- `aria-live="polite"` para: fim do typewriter, "Local descoberto (X de 5)", conquista, status
  do formulário.

## 8. Performance

- `next/dynamic` com `ssr:false` para componentes pesados (mapa interativo, partículas, R3F).
- Áudio e texturas sob lazy-load; `next/font`; imagens OG otimizadas.
- Tela de carregamento temática enquanto o bundle do mapa chega.
- Evitar re-render: seletores Zustand finos; memoização de camadas do mapa.

## 9. SEO/social
- `metadata` no `layout.tsx`: title, description, OpenGraph (imagem `public/og/reino-og.png`
  original), Twitter card, `themeColor`, `lang="pt-BR"`.

## 10. Testes/validação (leve)
- Build de produção sem erros de tipo/lint.
- Checagem manual: teclado, reduced-motion, mobile (DevTools), Lighthouse.
- (Opcional) 1–2 testes de unidade para `useTypewriter` e `audio` (mock Howler).

## 11. Riscos e mitigação
- **Áudio livre de direitos**: entregue como placeholder + instruções (não bloqueia o build).
- **Peso do mapa SVG**: manter camadas simples; parallax por transform (GPU), não por layout.
- **R3F pode pesar**: opcional e isolado; se Lighthouse cair, fica de fora.
