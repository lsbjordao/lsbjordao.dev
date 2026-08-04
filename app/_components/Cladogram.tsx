/**
 * Cladograma da trajetória.
 *
 * A carreira não é uma linha: duas linhagens correm em paralelo por uma década
 * — sistemática de plantas e curadoria digital de coleções — e se fundem em
 * 2020. O desenho empresta a gramática de uma filogenia porque é a que descreve
 * isso sem mentir: ramos que se separam, e um evento de reticulação onde a
 * linha do tempo comum precisaria escolher um dos dois caminhos.
 *
 * Geometria e topologia vêm de `data/cladogram.ts`; os rótulos, de `data/copy`.
 * O componente é puro: mesma entrada, mesmo SVG — nada aqui depende do cliente.
 */

import {
  CLADOGRAM_SUB_LANE,
  cladogramLanes,
  cladogramNodes,
  cladogramTicks,
  cladogramYears,
  type CladogramLaneId,
  type CladogramNode,
} from "@/data/cladogram";
import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";

const VIEW_W = 1000;
const VIEW_H = 592;
const PAD_L = 92;
const PAD_R = 44;

const AXIS_Y = 552;

/** Avanço de um caractere na monoespaçada em 11px — usado só para empacotar rótulos. */
const CHAR_W = 6.62;
/** Altura de uma faixa de rótulo, quando dois se sobrepõem. */
const TIER_H = 13;

function x(year: number) {
  const { start, end } = cladogramYears;
  return PAD_L + ((year - start) / (end - start)) * (VIEW_W - PAD_L - PAD_R);
}

const laneY = Object.fromEntries(
  cladogramLanes.map((lane) => [lane.id, lane.y]),
) as Record<CladogramLaneId, number>;

function rowY(node: CladogramNode) {
  return node.lane === "sub" ? CLADOGRAM_SUB_LANE : laneY[node.lane];
}

/**
 * Arestas da topologia, em anos e faixas.
 *
 * `dashed` marca o que ainda está em curso (a graduação) ou o que entra na
 * fusão pela segunda linhagem — o tracejado é a convenção de reticulação.
 */
const EDGES: Array<{ x1: number; y1: number; x2: number; y2: number; dashed?: boolean }> = [
  // tronco botânico
  { x1: x(2003), y1: laneY.botany, x2: x(2019), y2: laneY.botany },
  // ramo docência
  { x1: x(2010), y1: laneY.botany, x2: x(2010), y2: laneY.teaching },
  { x1: x(2010), y1: laneY.teaching, x2: x(2016), y2: laneY.teaching },
  // ramo coleções
  { x1: x(2011), y1: laneY.botany, x2: x(2011), y2: laneY.collections },
  { x1: x(2011), y1: laneY.collections, x2: x(2020), y2: laneY.collections },
  // reticulação: as duas linhagens convergem em 2020
  { x1: x(2019), y1: laneY.botany, x2: x(2020), y2: laneY.botany },
  { x1: x(2020), y1: laneY.botany, x2: x(2020), y2: laneY.data },
  { x1: x(2020), y1: laneY.collections, x2: x(2020), y2: laneY.data, dashed: true },
  // linhagem de dados
  { x1: x(2020), y1: laneY.data, x2: x(2026), y2: laneY.data },
  // graduação em ciência de dados, em curso
  { x1: x(2025), y1: laneY.data, x2: x(2025), y2: CLADOGRAM_SUB_LANE },
  { x1: x(2025), y1: CLADOGRAM_SUB_LANE, x2: x(2027), y2: CLADOGRAM_SUB_LANE, dashed: true },
];

type PlacedNode = CladogramNode & {
  cx: number;
  cy: number;
  ty: number;
  label: string;
  anchor: "start" | "end";
};

/**
 * Empacotamento dos rótulos.
 *
 * Rótulos da mesma faixa e do mesmo lado que se sobreporiam descem um degrau,
 * em vez de disputar o mesmo pixel. Perto da borda direita o texto é ancorado à
 * direita, senão sairia do viewBox. Determinístico: a ordem de leitura do
 * diagrama não muda entre renderizações.
 */
function place(labels: Record<string, string>): PlacedNode[] {
  const placed = cladogramNodes.map((node) => {
    const label = labels[node.id] ?? node.id;
    return {
      ...node,
      label,
      cx: x(node.year),
      cy: rowY(node),
      width: `${node.year}  ${label}`.length * CHAR_W,
      ty: rowY(node),
      anchor: "start" as "start" | "end",
    };
  });

  const groups = new Map<string, typeof placed>();
  for (const node of placed) {
    const key = `${node.cy}:${node.side}`;
    const group = groups.get(key);
    if (group) group.push(node);
    else groups.set(key, [node]);
  }

  for (const group of groups.values()) {
    const tiers: number[] = [];
    for (const node of [...group].sort((a, b) => a.cx - b.cx)) {
      let x0 = node.cx - 6;
      let x1 = x0 + node.width;
      if (x1 > VIEW_W - 10) {
        node.anchor = "end";
        x1 = node.cx + 6;
        x0 = x1 - node.width;
      }
      let tier = 0;
      while (tiers[tier] != null && x0 < tiers[tier] + 12) tier += 1;
      tiers[tier] = x1;
      node.ty = node.cy + node.side * (14 + tier * TIER_H);
    }
  }

  return placed;
}

export default function Cladogram({ lang }: { lang: Lang }) {
  const c = allCopy[lang].trajectory.cladogram;
  const nodes = place(c.nodes);

  return (
    <figure className="clado" data-reveal>
      <figcaption className="clado__head">
        <p className="clado__eyebrow">{c.eyebrow}</p>
        <h3 className="clado__title">{c.title}</h3>
        <p className="clado__lede">{c.lede}</p>
      </figcaption>

      {/* Só aparece quando o diagrama não cabe na tela — ver `.clado__hint`. */}
      <p className="clado__hint" aria-hidden="true">
        {c.scrollHint}
      </p>

      <div className="clado__frame">
        <svg
          className="clado__svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={c.ariaLabel}
        >
          {cladogramLanes.map((lane) => (
            <g key={lane.id}>
              <line
                className="clado__guide"
                x1={PAD_L - 10}
                y1={lane.y}
                x2={VIEW_W - PAD_R}
                y2={lane.y}
              />
              <text className="clado__lane" x={8} y={lane.y + 4}>
                {c.lanes[lane.id]}
              </text>
            </g>
          ))}

          <line
            className="clado__edge"
            x1={PAD_L - 10}
            y1={AXIS_Y}
            x2={VIEW_W - PAD_R}
            y2={AXIS_Y}
          />
          {cladogramTicks.map((year) => (
            <g key={year}>
              <line
                className="clado__edge"
                x1={x(year)}
                y1={AXIS_Y - 5}
                x2={x(year)}
                y2={AXIS_Y + 5}
              />
              <text className="clado__year" x={x(year)} y={AXIS_Y + 20} textAnchor="middle">
                {year}
              </text>
            </g>
          ))}

          {EDGES.map((edge, index) => (
            <line
              className="clado__edge"
              key={index}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              strokeDasharray={edge.dashed ? "5 5" : undefined}
            />
          ))}

          {nodes.map((node) => (
            <g key={node.id}>
              {node.reticulation ? (
                <rect
                  className="clado__fusion"
                  x={node.cx - 6}
                  y={node.cy - 6}
                  width={12}
                  height={12}
                  transform={`rotate(45 ${node.cx} ${node.cy})`}
                />
              ) : (
                <circle
                  className={node.current ? "clado__node clado__node--now" : "clado__node"}
                  cx={node.cx}
                  cy={node.cy}
                  r={4.2}
                />
              )}
              <text
                x={node.anchor === "end" ? node.cx + 6 : node.cx - 6}
                y={node.ty}
                className="clado__label"
                textAnchor={node.anchor}
              >
                <tspan className="clado__label-year">{`${node.year}  `}</tspan>
                <tspan className={node.reticulation ? "clado__label-name--fusion" : undefined}>
                  {node.label}
                </tspan>
              </text>
            </g>
          ))}

          <text
            className="clado__reticulation"
            x={x(2020) + 12}
            y={(laneY.collections + laneY.data) / 2 + 4}
          >
            {c.reticulation}
          </text>
        </svg>
      </div>
    </figure>
  );
}
