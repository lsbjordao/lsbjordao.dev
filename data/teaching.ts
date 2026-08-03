export type TeachingId =
  | "legislacaoFlora"
  | "filoinformatica"
  | "politicaEspecies"
  | "cf88"
  | "pnb"
  | "riscoExtincao"
  | "direitoAmbiental"
  | "chaveInterativa";

/**
 * Material didático publicado como livros Quarto — mais a chave interativa, que
 * é ferramenta e não apostila.
 *
 * `chapters` conta apenas os capítulos de conteúdo: fora ficam prefácios,
 * acrônimos, referências e os títulos de parte que só agrupam. É esse número
 * que define a espessura da lombada na estante, então precisa medir a mesma
 * coisa em todos os volumes.
 */
export const teaching: Array<{
  id: TeachingId;
  number: string;
  href: string;
  chapters: number;
  kind: "book" | "interactive";
  accent: string;
  /** Marca no pé da lombada fechada. */
  mark: string;
  /** Tinta legível sobre `accent` — o coral e o ácido pedem texto escuro. */
  ink: string;
}> = [
  {
    id: "legislacaoFlora",
    number: "01",
    href: "https://lsbjordao.github.io/Legislacao-aplicada-a-protecao-da-flora/",
    chapters: 23,
    kind: "book",
    accent: "#10251b",
    mark: "23",
    ink: "var(--paper)",
  },
  {
    id: "filoinformatica",
    number: "02",
    href: "https://lsbjordao.github.io/Introducao-a-Filoinformatica/",
    chapters: 15,
    kind: "book",
    accent: "#2f6b4a",
    mark: "15",
    ink: "var(--paper)",
  },
  {
    id: "politicaEspecies",
    number: "03",
    href: "https://lsbjordao.github.io/politica-publica-especies-ameacadas/",
    chapters: 9,
    kind: "book",
    accent: "#1a3326",
    mark: "09",
    ink: "var(--paper)",
  },
  {
    id: "cf88",
    number: "04",
    href: "https://lsbjordao.github.io/CF88/",
    chapters: 9,
    kind: "book",
    accent: "#07130d",
    mark: "09",
    ink: "var(--paper)",
  },
  {
    id: "pnb",
    number: "05",
    href: "https://lsbjordao.github.io/PNB/",
    chapters: 7,
    kind: "book",
    accent: "#24503a",
    mark: "07",
    ink: "var(--paper)",
  },
  {
    id: "riscoExtincao",
    number: "06",
    href: "https://lsbjordao.github.io/Avaliacao-risco-extincao-IUCN/",
    chapters: 6,
    kind: "book",
    accent: "#8f3a26",
    mark: "06",
    ink: "var(--paper)",
  },
  {
    id: "direitoAmbiental",
    number: "07",
    href: "https://lsbjordao.github.io/Introducao-Direito-Ambiental/",
    chapters: 5,
    kind: "book",
    accent: "#ff7657",
    mark: "05",
    ink: "var(--ink)",
  },
  {
    id: "chaveInterativa",
    number: "08",
    href: "https://lsbjordao.github.io/Chave-de-identificacao-interativa/",
    chapters: 0,
    kind: "interactive",
    accent: "#d9ff63",
    mark: "APP",
    ink: "var(--ink)",
  },
];

export const teachingChapterTotal = teaching.reduce(
  (total, item) => total + item.chapters,
  0,
);

const bookChapters = teaching
  .filter((item) => item.kind === "book")
  .map((item) => item.chapters);

const minChapters = Math.min(...bookChapters);
const maxChapters = Math.max(...bookChapters);

/** Extremos da lombada fechada, em rem. */
const MIN_SPINE = 4;
const MAX_SPINE = 10;

/**
 * Espessura da lombada, proporcional ao número de capítulos: o volume maior é
 * o livro mais grosso, como numa estante de verdade. A chave interativa não tem
 * capítulos, então fica num meio-termo fixo.
 */
export function spineWidth(item: { chapters: number; kind: "book" | "interactive" }) {
  if (item.kind === "interactive") return "4.8rem";
  const ratio = (item.chapters - minChapters) / (maxChapters - minChapters);
  return `${(MIN_SPINE + ratio * (MAX_SPINE - MIN_SPINE)).toFixed(2)}rem`;
}
