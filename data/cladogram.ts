/**
 * Cladograma da trajetória — a estrutura, sem os rótulos.
 *
 * A leitura é a de uma filogenia: um tronco (botânica), ramos que se separam
 * (docência, coleções) e um evento de reticulação em 2020, quando as linhagens
 * de sistemática e de curadoria digital se fundem numa só descendente (dados).
 * Por isso o nó de 2020 é um losango, e não um círculo: dois ancestrais, um
 * descendente.
 *
 * Aqui só moram anos, faixas e topologia. Todo texto vive em `data/copy`, para
 * o diagrama existir nas duas línguas sem duplicar geometria.
 */

export type CladogramLaneId = "teaching" | "botany" | "collections" | "data";

export type CladogramNodeId =
  | "biology"
  | "internship"
  | "bachelor"
  | "masters"
  | "phd"
  | "teacher"
  | "seeduc"
  | "reflora"
  | "nybg"
  | "redList"
  | "itAnalyst"
  | "now"
  | "dataScience";

/** Faixa horizontal de cada linhagem, em unidades do viewBox. */
export const cladogramLanes: Array<{ id: CladogramLaneId; y: number }> = [
  { id: "teaching", y: 96 },
  { id: "botany", y: 210 },
  { id: "collections", y: 320 },
  { id: "data", y: 430 },
];

/** Faixa auxiliar, sem rótulo: a graduação em curso pendurada na linhagem de dados. */
export const CLADOGRAM_SUB_LANE = 492;

export const cladogramYears = { start: 2003, end: 2027 } as const;

export const cladogramTicks = [2003, 2007, 2011, 2015, 2019, 2023, 2026];

export type CladogramNode = {
  id: CladogramNodeId;
  year: number;
  /** `"sub"` = faixa auxiliar. */
  lane: CladogramLaneId | "sub";
  /** `-1` põe o rótulo acima da faixa; `1`, abaixo. */
  side: -1 | 1;
  /** Nó do presente: preenchido com a cor de destaque. */
  current?: boolean;
  /** Nó de fusão: desenhado como losango. */
  reticulation?: boolean;
};

export const cladogramNodes: CladogramNode[] = [
  { id: "biology", year: 2003, lane: "botany", side: -1 },
  { id: "internship", year: 2004, lane: "botany", side: 1 },
  { id: "bachelor", year: 2007, lane: "botany", side: -1 },
  { id: "masters", year: 2014, lane: "botany", side: -1 },
  { id: "phd", year: 2019, lane: "botany", side: -1 },
  { id: "teacher", year: 2010, lane: "teaching", side: -1 },
  { id: "seeduc", year: 2016, lane: "teaching", side: 1 },
  { id: "reflora", year: 2011, lane: "collections", side: 1 },
  { id: "nybg", year: 2016, lane: "collections", side: 1 },
  { id: "redList", year: 2020, lane: "data", side: 1, reticulation: true },
  { id: "itAnalyst", year: 2024, lane: "data", side: 1 },
  { id: "now", year: 2026, lane: "data", side: 1, current: true },
  { id: "dataScience", year: 2025, lane: "sub", side: 1 },
];
