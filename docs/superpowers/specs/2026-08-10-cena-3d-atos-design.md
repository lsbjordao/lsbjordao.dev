# Cena 3D em atos — desenho

Data: 2026-08-10

## Objetivo

Dar à landing de recolocação a sensação de "design vivo" de
<https://mengto.github.io/kage/> sem custar o que a página é: um instrumento para
que quem contrata entenda o perfil, encontre a evidência e chegue ao contato.

A referência é uma peça narrativa — cinco capítulos, noventa minutos. Esta página
é uma landing. Por isso o 3D aqui não é ambientação: ele **ilustra a tese da
página**. A manchete diz "Botânica em escala de sistemas"; a cena é uma escada de
escalas sobre um único assunto.

## Conceito

Um espécime, cinco ampliações. O scroll não passeia por uma paisagem — ele muda a
ampliação e o referencial sobre o mesmo objeto. Os atos estão ligados por relação
real, não por adjacência inventada:

```text
ramo de M. osmarii ──zoom na face do folíolo──▶ tricoma      (#tricomas)
       │
       ├──a espécie é um terminal──▶ cladograma              (#linhagem)
       │                                  │
       │                                  └──os registros deste clado──▶ território (#cncflora)
       │
       └──a chave que chega até ela──▶ ramo binário          (#contratar)
```

Cada transição é uma frase verdadeira. É o que autoriza o 3D a existir numa
página que argumenta rigor.

### Prancha ↔ lâmina

A geometria tem dois registros, escolhidos pelo ato e não pelo CSS:

- **prancha** — traço de tinta sobre papel, como ilustração botânica que ganhou
  volume. Conversa direta com o SVG determinístico do `Frond.tsx` que já existe.
- **lâmina** — campo escuro de microscopia: material emissivo, blending aditivo,
  partículas em suspensão.

Taxonomista vê os dois. Usar os dois preserva integralmente a alternância
papel/tinta que é hoje o ritmo da página.

O registro **não é propriedade do ato** — é função de onde o scroll está. Todos
os cinco atos ficam em seção escura; o que fica em seção papel são as
**travessias entre eles**:

```text
#top        escuro   ato I    lâmina
#manifesto  papel             prancha    ← travessia
#contratar  escuro   ato II   lâmina
#tricomas   papel             prancha, com o ato III recortado no painel escuro
#cncflora   escuro   ato IV   lâmina
#projetos   papel             prancha    ← travessia
#linhagem   escuro   ato V    lâmina
#trajetoria papel             prancha    ← travessia
```

Durante a travessia a geometria do ato **não desaparece**: a câmera está entre
duas estações e o mesmo objeto é retintado para traço de tinta sobre o papel. É aí
que "a mesma estrutura, dois modos de ver" acontece de fato, e é o que dá
continuidade ao scroll em vez de piscar ligado/desligado.

Cada seção declara seu registro no DOM, com `data-register="lamina" | "prancha"`.
O diretor lê os valores uma vez no mount e escolhe pelo que ocupa o centro da
viewport. Explícito e barato — nada de inspecionar estilo computado.

## Decisões tomadas

| Decisão | Escolha | Alternativas descartadas |
| --- | --- | --- |
| Escopo | Canvas persistente, atos por seção | Só hero; acentos isolados; takeover total |
| Registro | Prancha ↔ lâmina | Página toda escura; 3D só nas seções escuras |
| Organização | Um espécime, cinco ampliações | Trilho por paisagem (modelo Kage); atos com crossfade |
| Orçamento | Progressivo, teto de 120 KB gzip | Desktop-only; sem teto com post-processing |
| Pontos do Ato IV | Sem pontos, mas o ato aceita coordenadas de `data/` | Pontos reais agora; pontos rotulados como esquemáticos |
| `.hero__orbit` | Fica | Remover em favor dos anéis 3D |

As duas últimas foram tomadas por default, na ausência de resposta, e são
reversíveis: a primeira é acrescentar um arquivo de dados, a segunda é apagar uma
regra de CSS.

## Camadas

### O problema

Um canvas fixo atrás da página não funciona ingenuamente neste CSS. `.section` é
transparente e herda o `paper` do `body`, mas `.section--dark` pinta
`var(--ink)` opaco e `.hero` pinta `var(--ink-deep)`. Como ambos são
`position: relative` com `z-index: auto`, eles pintam **depois** de um canvas em
`z-index: 0` e o cobrem. Fundo e texto vivem no mesmo elemento: não há `z-index`
que separe os dois.

### A saída

Os fundos escuros ficam levemente translúcidos.

```text
body (paper, ground)                    já existe, não muda
  └ canvas   fixed · inset 0 · z-index 0 · pointer-events none · aria-hidden
  └ .site-header  z-index 40            já existe, fica acima
  └ main
      .hero            background: rgba(7, 19, 13, .88)    era var(--ink-deep)
      .section         transparente                        não muda
      .section--dark   background: rgba(16, 37, 27, .88)   era var(--ink)
      .research-feature__media  rgba(16, 37, 27, .88)      era var(--ink)
```

Uma regra nova, para o canvas, e três fundos ajustados de opaco para 88% —
nenhuma mudança estrutural. Os `z-index` internos das
seções (1 a 4) não competem com o canvas: as seções têm `z-index: auto`, e a
ordem do DOM resolve — canvas primeiro, seções depois, texto sempre em cima.

Dois efeitos colaterais, ambos desejáveis. Em seção escura a camada de 88% de
tinta fica **entre** o brilho e o texto, então o contraste do texto branco está
garantido por construção e o brilho lê como vindo de dentro do escuro — que é o
que campo escuro parece. Em seção papel o canvas pinta sobre o papel com alpha
reto e o texto pinta por cima. As bordas entre seções continuam duras.

### Sem `mix-blend-mode`

Um elemento só tem um blend mode, e trocar por seção seria impossível num canvas
único. O registro é decidido no **material**, por uniform, e a composição é
sempre alpha reto. O problema desaparece em vez de ser contornado.

## Módulos

Nada disso entra em `Portfolio.tsx`, que já tem 1558 linhas.

```text
app/_components/Stage.tsx   client; canvas + barra de escala; dynamic import do diretor
app/_3d/types.ts            Act, ActContext, ActId, Register
app/_3d/director.ts         scroll → ato → estação → câmera; único rAF da cena
app/_3d/registers.ts        paleta e uniforms dos dois registros
app/_3d/signal.ts           store de módulo: estado da chave, sem passar por React
app/_3d/random.ts           pseudoRandom, extraído de Frond.tsx e compartilhado
app/_3d/glow.ts             sprite de halo gerado em canvas 2D, nada baixado
app/_3d/acts/branch.ts      ato I   — ramo de M. osmarii
app/_3d/acts/key.ts         ato II  — chave que se bifurca
app/_3d/acts/trichome.ts    ato III — tricoma
app/_3d/acts/territory.ts   ato IV  — território
app/_3d/acts/clade.ts       ato V   — cladograma
data/brasil-outline.ts      contorno simplificado do IBGE (~500 pontos)
data/occurrences.ts         array de coordenadas; vazio por ora
```

### A interface

```ts
type Act = {
  id: ActId;
  /** Âncora no DOM que define o ato ativo e o progresso. */
  anchor: string;
  /** null = tela cheia; um elemento = recorta no rect dele via setScissor. */
  frame?: () => Element | null;
  /** Geometria em caixa unitária. Chamado uma vez, fora do rAF. */
  build(ctx: ActContext): Object3D;
  /** progress 0→1 dentro do ato; t em segundos desde o mount. */
  update(t: number, progress: number): void;
  /** Estação da câmera, em coordenadas do ato. */
  station(progress: number): { position: Vector3; target: Vector3 };
  /** Legenda da barra de escala, por idioma. */
  scale: Record<Lang, string>;
  dispose(): void;
};
```

O diretor não sabe o que é um tricoma. Um ato não sabe onde está no scroll. A
única coisa que atravessa a fronteira é `progress`.

### Normalização de escala

µm e 1000 km no mesmo espaço-mundo estouram a precisão do z-buffer. Cada ato é
construído numa caixa unitária e colocado na sua própria estação; a escala é
comunicada por **tipografia** — a barra de escala — e não por unidades de mundo.
É encanamento que ninguém vê e sem o qual nada funciona.

## Os atos

### Ato I — Ramo · `#top` · lâmina · tela cheia

Folha bipinada de *Mimosa* gerada pelo **mesmo hash determinístico** do
`Frond.tsx`. Não uma reimplementação: `pseudoRandom` sai para `app/_3d/random.ts`
e o SVG passa a importar de lá, de modo que o traço 2D e a geometria 3D são o
mesmo gerador em duas projeções.

- ráquis e pinas: `LineSegments`
- folíolos: `InstancedMesh` de um quad, ~970 instâncias (3 folhas × 9 pinas × 2
  lados × ~18 folíolos)
- pólen: `Points`

**Tigmonastia.** *Mimosa* é a planta sensitiva: fecha os folíolos ao toque. O
ângulo de dobra é atributo por instância, dirigido pela distância ao raio do
ponteiro. Passar o mouse fecha a folha e ela reabre devagar. Custa um atributo e
três linhas de vertex shader, e é a única interação da página que é ao mesmo
tempo bonita e taxonomicamente correta. Desligada em toque, onde não há ponteiro.

A foto de *M. osmarii* **fica**: é evidência com DOI, e evidência não se troca
por abstração. O 3D é a camada entre a foto e o texto.

### Ato II — Chave · `#contratar` · lâmina · tela cheia · dirigido por clique

A chave dicotômica em `key` (`data/site.ts`) já é uma árvore binária; em 3D ela é
uma. ~15 nós, ~14 arestas. A cada couplet respondido o ramo escolhido acende e
avança, o irmão recua e escurece, e a câmera desce até a trilha terminal. Único
ato que não obedece ao scroll.

O estado `path` vive no `Portfolio.tsx` e o diretor vive num módulo importado
dinamicamente. A ponte é `app/_3d/signal.ts`, um store de módulo que o
`Portfolio` escreve e o diretor lê no rAF. Não é context nem prop drilling: um
`setState` a cada frame reconciliaria a página inteira, que é exatamente o erro
que o `ScrollProgress.tsx` já evita de propósito.

Os botões da chave já existem e já funcionam. O 3D reage a eles; não os
substitui.

### Ato III — Tricoma · `#tricomas` · lâmina · recortado

`.research-feature` é claro (`--paper-warm`) com um painel escuro dentro
(`.research-feature__media`). Este ato não é tela cheia: é recortado no rect do
painel via `setScissor` + `setScissorTest`.

Tricoma glandular como geometria de revolução (perfil × 24 segmentos radiais),
cabeça multicelular, epiderme como grade de linhas ao fundo. Profundidade de
campo **falsa** — tamanho de ponto e alpha por distância, sem passe de DOF.

### Ato IV — Território · `#cncflora` · lâmina · tela cheia

Contorno do Brasil em `LineSegments`, de um GeoJSON simplificado do IBGE (~500
pontos, ~5 KB, dado real e público). Relevo insinuado por grade deformada.
Câmera em órbita descendente.

**Sem pontos de ocorrência.** O README estabelece que "identificador inventado é
pior que ausente", e o mesmo vale para coordenada. Espalhar pontos bonitos e
falsos sobre um mapa numa página que argumenta rigor seria contradizê-la. O ato
lê `data/occurrences.ts` — hoje um array vazio — então passar a exibir dado real
é acrescentar coordenadas ao arquivo, sem tocar em código.

### Ato V — Cladograma · `#linhagem` · lâmina, atmosférico · tela cheia

Topologia de `data/cladogram.ts`, incluindo o nó de reticulação de 2020. Ramos em
profundidade, deriva lenta, **opacidade baixa por contrato**.

Cladograma em 3D costuma ficar mais bonito e menos legível. Aqui o 3D é fundo: a
leitura da topologia continua sendo o `Cladogram.tsx`, que já é correto e
legível. O `Frond` que já está nessa seção fica onde está.

## Registros

Nenhuma cor nova entra na paleta.

| | prancha (papel) | lâmina (escuro) |
| --- | --- | --- |
| traço | `--ink` α 0.10–0.18 | `--acid` / `--coral` α 0.35–0.6 |
| blending | normal, alpha reto | aditivo |
| pontos | tinta, α 0.12 | sprite com halo |
| teto | cobertura mantém papel ≥ `#e8e6de` | camada de 88% de tinta garante branco ≥ 7:1 |

O brilho não vem de `UnrealBloomPass`. Vem de blending aditivo mais um sprite de
halo gerado em canvas 2D em runtime — nada baixado. É o que mantém o bundle no
teto.

Como o registro é do scroll e não do ato, **todo ato tem de ficar bom nos dois**:
o mesmo material recebe o registro por uniform e interpola entre as duas colunas
da tabela. Um ato que só funcione em campo escuro é um ato quebrado, porque a
câmera vai atravessar seção papel com ele em quadro. Isso é critério de aceite de
cada ato, não polimento posterior.

## Câmera

Uma `PerspectiveCamera`, fov 38. Posição e alvo perseguem `station(progress)` do
ato ativo com mola criticamente amortecida, sem overshoot, para que jitter de
scroll não sacuda o quadro.

`progress` sai de `IntersectionObserver` nas âncoras — o mesmo mecanismo que o
`data-reveal` já usa em `Portfolio.tsx` — e é **lido dentro do rAF**, nunca no
handler de scroll. Um único rAF na página inteira para a cena.

## Barra de escala

Elemento fixo em mono, herdando a tipografia do `.hero__coordinate`. Na ordem da
página: `5 cm` (ramo), sem valor (chave), `200 µm` (tricoma), `1000 km`
(território), sem valor (cladograma) — os dois "sem valor" são os atos cuja
estrutura é abstrata e não tem escala métrica; ali a barra some em vez de mostrar
um travessão. Durante as travessias em papel ela também some, porque a escala é
do ato e não da transição. Vem de `data/copy` nas duas línguas, porque `µm` não
traduz mas o rótulo "escala" traduz.

É a peça que transforma a sequência de atos em argumento em vez de galeria — do
mesmo jeito que prancha de herbário tem barra de escala.

## Carregamento e degradação

`Stage.tsx` renderiza só o shell: canvas vazio e barra de escala. O diretor entra
por `await import("../_3d/director")` dentro de `requestIdleCallback` (fallback
`setTimeout`), depois do first paint. Com `output: "export"` o `import()`
dinâmico vira chunk separado em `dist/_next/static/chunks/`; não há runtime
envolvido.

`three` entra como dependência real, com `@types/three`, importado por named
imports para que o webpack faça tree-shaking do ESM. Sem `EffectComposer`.

| condição | comportamento |
| --- | --- |
| WebGL2 indisponível ou contexto falha | canvas removido do DOM; página idêntica à de hoje |
| `prefers-reduced-motion: reduce` | monta, desenha **um** frame por ato, câmera não interpola, sem rAF contínuo |
| `< 820px` | DPR ≤ 1, partículas ÷ 4, tigmonastia desligada |
| aba oculta | rAF pausado em `visibilitychange` |
| `webglcontextlost` | não recria; esconde o canvas |
| `connection.saveData` | o chunk não é baixado |

## Acessibilidade

O canvas é `aria-hidden="true"` e `pointer-events: none`: fora da ordem de
tabulação, invisível para leitor de tela, nunca captura toque.

O que autoriza isso é uma regra de conteúdo: **nada existe só no canvas**. Tudo
que o 3D mostra já está em texto, SVG ou foto. Sem WebGL não se perde informação
— perde-se atmosfera.

A barra de escala, ao contrário, é conteúdo: vive em `data/copy` nas duas
línguas e não é `aria-hidden`.

## Verificação

A ferramenta visual já existe no repo: `scripts/capture-section.mjs` dirige o
Chrome por CDP na porta 9222 e captura seção por seção.

| # | verificação | critério |
| --- | --- | --- |
| 1 | `npm run typecheck` | passa |
| 2 | `npm run build` | passa; chunk 3D isolado em `dist/_next/static/chunks/` |
| 3 | peso do chunk 3D | ≤ 120 KB gzip |
| 4 | diff de `dist/index.html` | só o canvas vazio e a barra de escala |
| 5 | frame budget | ≤ 6 ms desktop, ≤ 12 ms com throttle 4× |
| 6 | contraste texto/fundo com brilho no pico | AA: ≥ 4.5:1 corpo, ≥ 3:1 título grande |
| 7 | sem WebGL | página idêntica à de hoje |
| 8 | `prefers-reduced-motion` | rAF não roda em loop |
| 9 | `/en` | barra de escala em inglês; `npm run typecheck` cobre chave faltante |

Cada critério dá um número ou um diff. Nenhum é "ficou bom".

## Fora de escopo

- Reordenar seções para obter uma escada de escala monotônica. A ordem do
  conteúdo é argumento de contratação e não se subordina ao 3D.
- Escurecer as seções papel.
- Substituir o `Cladogram.tsx` 2D, a foto do hero ou o `Frond.tsx`.
- Post-processing (bloom, DOF, sombras).
- Atos em `#projetos`, `#tecnologias`, `#trajetoria`, `#contato`.
- Banner de consentimento e qualquer mudança em analytics.
