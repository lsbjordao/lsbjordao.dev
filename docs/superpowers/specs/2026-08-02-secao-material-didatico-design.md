# Seção "Material didático" — estante de lombadas

**Data:** 2026-08-02
**Status:** aprovado

## Objetivo

Adicionar ao portfólio uma seção que reúna os 8 sites de aula publicados em
`lsbjordao.github.io`, com um estilo de apresentação deliberadamente distinto dos
cards de "Trabalho selecionado" (que são conduzidos por imagem).

## Conteúdo

| # | Título | Fonte | Volume |
|---|--------|-------|--------|
| 01 | Legislação aplicada à proteção da flora e vegetações brasileiras | `Legislacao-aplicada-a-protecao-da-flora` | 32 capítulos |
| 02 | Introdução à Filoinformática | `Introducao-a-Filoinformatica` | 16 capítulos |
| 03 | Política Pública de Tutela e Proteção das Espécies Ameaçadas | `politica-publica-especies-ameacadas` | 11 capítulos |
| 04 | Constituição Federal de 1988 | `CF88` | 10 títulos |
| 05 | Avaliação do Risco de Extinção de Espécies | `Avaliacao-risco-extincao-IUCN` | 8 capítulos |
| 06 | Política Nacional da Biodiversidade | `PNB` | 7 componentes |
| 07 | Introdução ao Direito Ambiental | `Introducao-Direito-Ambiental` | 7 capítulos |
| 08 | Chave de Identificação Biológica | `Chave-de-identificacao-interativa` | ferramenta interativa |

Os sete primeiros são livros Quarto. O oitavo é um app (visualizador, modo
interativo e editor JSON) e não tem capítulos.

## Forma

Uma estante horizontal de lombadas em pé. Decisões validadas com o usuário em
mockup interativo:

- **Espessura proporcional ao número de capítulos.** Legislação (32) é a lombada
  mais grossa, Direito Ambiental (7) a mais fina. O dado vira forma: dá para ler
  o acervo antes de ler o texto. A Chave usa largura fixa por não ter capítulos.
- **Expansão no hover e no foco.** A lombada é um `<a>` que cresce em largura via
  `:hover` e `:focus-visible`, revelando título completo, três tópicos do sumário
  real e o CTA. Sem JavaScript — navegável por teclado.
- **Chave marcada como interativa.** Recebe `--acid`, selo próprio e rótulo
  "ferramenta" em vez de contagem de capítulos.
- **Fundo `--paper-warm`.** Terceiro tom, distinguindo a seção de Projetos
  (`--paper`, antes) e Tecnologias (escura, depois).
- **Cores:** sete tons derivados de `--ink` / `--ink-soft` / `--coral` mais
  `--acid` para a Chave.

**Responsivo:** abaixo de 820px a estante vira coluna. Cada livro passa a ser uma
linha larga permanentemente expandida, com a faixa de cor virando borda lateral —
sem depender de hover no toque.

## Arquitetura

- `data/teaching.ts` — os 8 itens: `id`, `number`, `href`, `chapters`,
  `kind: "book" | "interactive"`, `accent`, `onDark`.
- `data/copy/pt.ts` e `data/copy/en.ts` — bloco `teaching` com `index`,
  `eyebrow`, `heading`, `intro`, rótulos e `items[id]` (`title`, `volume`,
  `topics[]`).
- `app/_components/Teaching.tsx` — client component novo, no molde de
  `Phenology.tsx`. Fica fora de `Portfolio.tsx`, que já tem ~1500 linhas e não
  deve crescer mais; `Portfolio` apenas o instancia.
- `app/globals.css` — bloco `.shelf` / `.spine` autocontido.

## Integração

- A seção entra depois de `#projetos`, com âncora `#aulas` e índice
  `04 / MATERIAL DIDÁTICO`.
- Renumeração das seções seguintes em pt e en: Tecnologias `05`, Fenologia `06`,
  Trajetória `07`, Notas `08`, Contato `09`.
- Novo item no menu principal.

## Verificação

`npm run build` sem erros, e inspeção da página rodando: expansão no hover,
navegação por Tab, e o layout em coluna abaixo de 820px.
