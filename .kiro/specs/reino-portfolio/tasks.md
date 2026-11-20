# Tarefas — "O Reino" (Portfólio-Experiência)

Ordem de implementação: base e tema → entrada → áudio → mapa → seções → imersão →
acessibilidade → polimento. Cada tarefa é pequena e verificável. Marcações `(R#)` referem-se
aos requisitos.

## Fase 0 — Fundação
- [ ] 0.1 Criar app Next.js (App Router, TS strict) em `reino/`; configurar Tailwind. (RNF5)
- [ ] 0.2 Instalar deps: framer-motion, howler + @types/howler, zustand. (RNF5)
- [ ] 0.3 Definir tema no `tailwind.config` (cores do reino) e `globals.css`. (Design §4)
- [ ] 0.4 Configurar `next/font` (Cinzel Decorative, Uncial Antiqua, EB Garamond). (Design §4)
- [ ] 0.5 `metadata`/OpenGraph no `layout.tsx` + placeholder de imagem OG. (RNF4)

## Fase 1 — Conteúdo e estado
- [ ] 1.1 Criar `data/content.ts` tipado com placeholders editáveis no tom medieval. (R10)
- [ ] 1.2 Criar `lib/store.ts` (Zustand + persist): som/volume, stage, visited, achievement,
      easterEggFound. (R2.6, R8.4, R9.6)
- [ ] 1.3 Hooks `useReducedMotion` e `useTypewriter`. (RNF2, R3.1)

## Fase 2 — Tela de entrada (Portões do Reino)
- [ ] 2.1 `GateScreen`: ilustração SVG atmosférica, título medieval, nome do herói. (R1.1)
- [ ] 2.2 Escolha "com som / sem som" + botão "Iniciar Jornada"; persistir escolha. (R1.2, R1.3, R1.5)
- [ ] 2.3 Transição "abertura dos portões" → mapa; fade se reduced-motion. (R1.6, R1.7)
- [ ] 2.4 Link visível "Ver versão simples". (RNF2)

## Fase 3 — Sistema de áudio
- [ ] 3.1 `lib/audio.ts`: wrapper Howler, init após "Iniciar Jornada", lazy-load. (R8.1, R8.7)
- [ ] 3.2 Trilha por lugar + crossfade na troca de stage. (R8.2)
- [ ] 3.3 `AudioControls` (mudo/volume) sempre visível; persistência. (R8.3, R8.4)
- [ ] 3.4 SFX de UI (clique/folhear/vento/whoosh) com gate de som. (R8.5)
- [ ] 3.5 Degradação graciosa se arquivo ausente (404 → sem erro). (R8.6)
- [ ] 3.6 Placeholders em `public/audio/` + seção no README (fontes livres + atribuição). (RNF6)

## Fase 4 — Mapa do Reino
- [ ] 4.1 `KingdomMap`: SVG em camadas (céu, montanhas, colinas, floresta, frente). (R2.1)
- [ ] 4.2 Parallax por mouse/scroll (transform/GPU); desliga em reduced-motion. (R2.2, R2.7)
- [ ] 4.3 `MapPoint` acessível (button, label, hover/focus com brilho/runa). (R2.3)
- [ ] 4.4 Trilha pontilhada ligando pontos; marca de "visitado". (R2.6)
- [ ] 4.5 Transição de "viagem" mapa→lugar (pan/zoom) + retorno (Esc/botão). (R2.4, R2.5)
- [ ] 4.6 Adaptação mobile (pan por toque, alvos ≥44px). (RNF1)

## Fase 5 — Lugares (seções)
- [ ] 5.1 `ui/ScrollPanel`/`Frame` (moldura pergaminho/madeira/metal) reutilizável. (Design §4)
- [ ] 5.2 `Tavern` (Sobre): `DialogueBox` com typewriter + "pular". (R3)
- [ ] 5.3 `Grimoire` (Habilidades): árvore/inventário com tooltip de detalhe. (R4)
- [ ] 5.4 `QuestBoard` (Projetos): missões com status, recompensas e links condicionais. (R5)
- [ ] 5.5 `Forge` (Formação): linha do tempo da jornada. (R6)
- [ ] 5.6 `Raven` (Contato): links + formulário validado + animação do corvo + confirmação. (R7)

## Fase 6 — Imersão
- [ ] 6.1 `fx/Particles` (sementes/vaga-lumes/folhas) por lugar; desliga em reduced-motion. (R9.1, RNF2)
- [ ] 6.2 `fx/SkyLayer` (humor de céu/dia-noite por lugar). (R9.2)
- [ ] 6.3 `CustomCursor` + efeitos de hover (brilho/runas). (R9.3)
- [ ] 6.4 `ExplorationMeter` ("X de 5") + conquista ao completar; persistir. (R9.4, R9.6)
- [ ] 6.5 Easter egg escondido no mapa + recompensa visual. (R9.5)

## Fase 7 — Acessibilidade
- [ ] 7.1 Navegação por teclado completa; foco visível; Esc→mapa; foco ao entrar. (RNF2)
- [ ] 7.2 `aria-live` para typewriter/descoberta/conquista/form. (RNF2)
- [ ] 7.3 Rota `/simples` (conteúdo linear semântico, sem canvas/áudio). (RNF2)
- [ ] 7.4 Auditar contraste AA e `prefers-reduced-motion` em todos os efeitos. (RNF2)

## Fase 8 — Performance, SEO e polimento
- [ ] 8.1 `next/dynamic` (ssr:false) para mapa/partículas/R3F; tela de carregamento temática. (RNF3)
- [ ] 8.2 Lazy-load de áudio/texturas; checar bundle. (RNF3)
- [ ] 8.3 (Opcional) elemento de destaque R3F isolado — só se não derrubar o Lighthouse. (Stack)
- [ ] 8.4 Auditoria Lighthouse e ajustes até as metas. (RNF3)
- [ ] 8.5 README: editar conteúdo, trocar música (fontes livres + licença), deploy Vercel. (RNF5, RNF6)
- [ ] 8.6 Revisão final: tipos/lint/build limpos; teste manual desktop+mobile+teclado.

## Marcos de verificação
- **M1** (fim F2): Portões → mapa funciona, com/sem som, reduced-motion ok.
- **M2** (fim F4): mapa navegável com viagem às 5 seções (conteúdo stub).
- **M3** (fim F5): todas as seções com conteúdo real do `content.ts`.
- **M4** (fim F6/7): imersão + acessibilidade completas.
- **M5** (fim F8): performance/SEO/README; pronto para deploy na Vercel.
```
