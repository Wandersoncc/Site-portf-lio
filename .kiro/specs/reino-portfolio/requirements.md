# Requisitos — "O Reino" (Portfólio-Experiência)

## Visão geral

Um portfólio de estudante de Ciência da Computação construído como uma **experiência de
exploração de um mundo de fantasia medieval**. O portfólio é um "reino"; cada seção é um
"lugar" visitável através de um **mapa interativo**. A inspiração estética vem de Mondstadt
(Genshin Impact), Zelda (BotW/TotK) e O Senhor dos Anéis — **apenas atmosfera e estética**.
Nenhum asset, nome, personagem, mapa ou música dessas franquias é copiado; tudo é original
(SVG/CSS/canvas) ou de bancos livres de direitos, com atribuição.

## Glossário de "lugares" → seções reais

| Lugar no reino      | Seção do portfólio            |
|---------------------|-------------------------------|
| Portões do Reino    | Tela de entrada / intro       |
| Mapa do Reino       | Navegação principal (hub)     |
| Taverna             | Sobre mim                     |
| Grimório/Biblioteca | Habilidades e tecnologias     |
| Quadro de Missões   | Projetos                      |
| Forja/Academia      | Formação e experiência        |
| Corvo Mensageiro    | Contato                       |

---

## Requisitos funcionais

As histórias usam o formato: *Como [papel], quero [ação], para [benefício]*, com critérios
de aceitação em EARS (WHEN/IF… THE SYSTEM SHALL…).

### R1 — Tela de entrada ("Portões do Reino")
*Como visitante, quero uma tela de abertura imersiva, para sentir que estou entrando num mundo.*

1. WHEN o site carrega THE SYSTEM SHALL exibir uma tela cheia com ilustração atmosférica
   (SVG/canvas), o título em fonte medieval e o subtítulo com o nome do herói.
2. THE SYSTEM SHALL exibir um botão primário "Iniciar Jornada".
3. THE SYSTEM SHALL oferecer a escolha "com som" ou "sem som" antes de entrar.
4. WHEN o visitante clica em "Iniciar Jornada" THE SYSTEM SHALL, e somente então, iniciar a
   reprodução de áudio (respeitando a política de autoplay dos navegadores).
5. WHEN a escolha de som é feita THE SYSTEM SHALL persisti-la em localStorage.
6. WHEN o visitante entra THE SYSTEM SHALL executar uma transição de "abertura dos portões"
   até o Mapa do Reino.
7. IF `prefers-reduced-motion` estiver ativo THE SYSTEM SHALL reduzir/omitir a animação de
   transição e ir direto ao mapa.

### R2 — Mapa do Reino (navegação principal)
*Como visitante, quero navegar por um mapa ilustrado, para escolher que lugar explorar.*

1. THE SYSTEM SHALL renderizar um mapa ilustrado com no mínimo 5 pontos de interesse, um por
   seção (Taverna, Grimório, Quadro de Missões, Forja, Corvo).
2. THE SYSTEM SHALL aplicar parallax em camadas de fundo do mapa ao mover o mouse/rolar/inclinar.
3. WHEN o visitante passa o mouse/foca um ponto THE SYSTEM SHALL destacá-lo (brilho, runa,
   rótulo com o nome do lugar).
4. WHEN o visitante ativa um ponto (clique/Enter/toque) THE SYSTEM SHALL transicionar para a
   seção correspondente com sensação de "viajar" (pan/zoom suave da câmera).
5. WHEN o visitante está numa seção THE SYSTEM SHALL oferecer um retorno claro ao mapa.
6. THE SYSTEM SHALL marcar visualmente no mapa os lugares já visitados.
7. IF `prefers-reduced-motion` estiver ativo THE SYSTEM SHALL substituir pan/zoom por
   transições simples (fade) e desativar o parallax.

### R3 — Taverna (Sobre mim)
1. THE SYSTEM SHALL apresentar a biografia em uma **caixa de diálogo estilo RPG** com efeito
   de digitação (typewriter).
2. WHEN o texto está sendo digitado AND o visitante interage THE SYSTEM SHALL permitir
   "pular" e revelar o texto completo de imediato.
3. THE SYSTEM SHALL ler o conteúdo (nome, curso, resumo) do arquivo único de dados.

### R4 — Grimório/Biblioteca (Habilidades)
1. THE SYSTEM SHALL exibir as habilidades como uma **árvore de habilidades / inventário**
   (itens agrupados por categoria).
2. WHEN o visitante passa o mouse/foca um item THE SYSTEM SHALL mostrar detalhe (nome, nível,
   descrição curta).
3. THE SYSTEM SHALL ler as habilidades do arquivo de dados.

### R5 — Quadro de Missões (Projetos)
1. THE SYSTEM SHALL exibir cada projeto como uma "missão" com título, descrição, **status**
   (ex.: Concluída/Em andamento), tecnologias como "recompensas" e links de demo/repositório.
2. WHEN um projeto não tiver demo ou repo THE SYSTEM SHALL ocultar o link ausente sem quebrar
   o layout.
3. THE SYSTEM SHALL ler os projetos do arquivo de dados.

### R6 — Forja/Academia (Formação e experiência)
1. THE SYSTEM SHALL exibir formação/experiência como uma **linha do tempo** em formato de
   jornada (etapas ordenadas).
2. THE SYSTEM SHALL ler os itens do arquivo de dados.

### R7 — Corvo Mensageiro (Contato)
1. THE SYSTEM SHALL exibir meios de contato (e-mail, GitHub, LinkedIn) a partir do arquivo de dados.
2. THE SYSTEM SHALL oferecer um formulário com validação (nome, e-mail, mensagem).
3. WHEN o formulário é enviado com dados válidos THE SYSTEM SHALL animar um corvo levando a
   mensagem e exibir confirmação temática.
4. IF algum campo é inválido THE SYSTEM SHALL indicar o erro de forma acessível (aria-live).
5. NOTE: o envio é client-side/simulado por padrão; o README documenta como plugar um backend
   (ex.: Formspree/route handler).

### R8 — Sistema de áudio
1. THE SYSTEM SHALL gerenciar o áudio com Howler.js.
2. THE SYSTEM SHALL manter uma trilha ambiente por lugar, com **crossfade suave** na troca.
3. THE SYSTEM SHALL exibir controles sempre acessíveis: mudo/ativar e volume.
4. WHEN o visitante altera som/volume THE SYSTEM SHALL persistir em localStorage e restaurar
   na próxima visita.
5. THE SYSTEM SHALL tocar efeitos sonoros sutis (clique de UI, folhear, vento) quando o som
   estiver ativo.
6. IF nenhum arquivo de áudio estiver presente THE SYSTEM SHALL degradar graciosamente (sem erros)
   e manter os controles visíveis.
7. THE SYSTEM SHALL carregar o áudio de forma preguiçosa (lazy), somente após "Iniciar Jornada".

### R9 — Detalhes de imersão
1. THE SYSTEM SHALL exibir partículas ambientes (sementes ao vento, vaga-lumes ou folhas),
   coerentes com o lugar.
2. THE SYSTEM SHALL variar o céu/iluminação conforme o lugar (sensação de ciclo dia/noite).
3. THE SYSTEM SHALL usar cursor customizado e efeitos de hover (brilho/runas).
4. THE SYSTEM SHALL manter uma barra/medidor de exploração ("descobriu X de 5 locais") e
   conceder uma **conquista** ao visitar todos.
5. THE SYSTEM SHALL esconder um **easter egg** no mapa (item secreto) com uma recompensa visual.
6. THE SYSTEM SHALL persistir o progresso de exploração em localStorage.

### R10 — Conteúdo editável
1. THE SYSTEM SHALL concentrar todo o conteúdo (textos, projetos, skills, links, nome, curso)
   em `/data/content.ts`, tipado.
2. IF um campo de conteúdo estiver vazio THE SYSTEM SHALL usar texto de exemplo no tom medieval,
   claramente marcado como editável.

---

## Requisitos não funcionais

### RNF1 — Responsividade
- Funcional e agradável em celular; o mapa adapta-se ao toque (tap nos pontos, gesto de pan),
  com alvos de toque ≥ 44px.

### RNF2 — Acessibilidade (meta: WCAG 2.1 AA no essencial)
- Navegação completa por teclado (foco visível, ordem lógica, Esc para voltar ao mapa).
- Contraste de texto adequado (AA).
- Respeitar `prefers-reduced-motion`: reduzir/omitir animações, parallax e partículas.
- Oferecer uma **"versão simples/lista"** do conteúdo (rota/alternância) amigável a leitores
  de tela, com todo o conteúdo em HTML semântico linear.
- `aria-live` para mensagens dinâmicas (typewriter concluído, envio de contato, conquista).

### RNF3 — Performance
- Lazy loading de assets pesados e de áudio; code-splitting por seção.
- Tela de carregamento temática.
- Meta Lighthouse: Performance ≥ 85, Acessibilidade ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (desktop).
- Qualquer uso de Three.js/R3F fica isolado e sob lazy-load, sem travar a interface.

### RNF4 — SEO e social
- Metatags e Open Graph/Twitter Card com tema medieval (título, descrição, imagem OG original).
- HTML semântico, `lang`, títulos hierárquicos.

### RNF5 — Qualidade de código
- Next.js (App Router) + TypeScript estrito + Tailwind.
- Componentização clara, comentários onde há lógica não óbvia.
- README com: como editar o conteúdo, como trocar a música (e onde baixar faixas livres),
  e como fazer deploy na Vercel.

### RNF6 — Licenciamento de áudio
- Nenhuma faixa protegida. Arquivos em `/public/audio/` entram como **placeholders**; o README
  lista fontes livres (Pixabay Music, Free Music Archive, Incompetech) e a atribuição exigida.

---

## Fora de escopo (nesta versão)
- Backend/persistência server-side do formulário (apenas documentado).
- CMS para o conteúdo (o arquivo de dados cumpre esse papel).
- Multi-idioma (estrutura pode permitir, mas só PT-BR é entregue).

## Decisões a confirmar na aprovação
1. **Localização do app Next.js**: nova subpasta `reino/` no mesmo repositório, ou substituir
   o conteúdo atual na raiz? (Recomendo subpasta para preservar o histórico HTML atual.)
2. **Three.js/R3F**: incluir um elemento de destaque (ex.: céu/partículas em 3D) ou manter tudo
   em canvas 2D/SVG para máxima performance? (Recomendo começar sem 3D e adicionar como
   aprimoramento opcional no fim.)
