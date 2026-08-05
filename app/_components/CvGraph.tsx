/**
 * O currículo como grafo.
 *
 * Duas leituras da mesma trajetória: uma interface de consulta textual
 * (lsbjordao.github.io/cv) e uma visualização de grafo navegável em 2D/3D
 * (lsbjordao.github.io/cv-graph). O componente é deliberadamente conceitual —
 * não é mais um card de projeto, é o argumento do resto da página aplicado
 * de volta ao próprio currículo.
 */

import { cvGraphLinks } from "@/data/site";
import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";

/** Posições em um viewBox largo (0–1000 × 0–360), para o SVG não distorcer os nós ao esticar. */
const FIELD_NODES: Array<[number, number]> = [
  [60, 90],
  [160, 230],
  [260, 60],
  [210, 330],
  [340, 270],
  [430, 140],
  [400, 355],
  [540, 240],
  [500, 50],
  [650, 100],
  [710, 220],
  [620, 340],
  [800, 290],
  [100, 280],
  [900, 110],
  [940, 320],
];

const FIELD_EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 13],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 8],
  [3, 4],
  [3, 13],
  [4, 6],
  [4, 7],
  [5, 7],
  [5, 8],
  [5, 9],
  [7, 10],
  [7, 11],
  [8, 9],
  [9, 10],
  [9, 14],
  [10, 12],
  [10, 11],
  [11, 12],
  [12, 15],
  [14, 15],
];

function Arrow() {
  return (
    <svg aria-hidden="true" className="icon icon--diagonal" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function QueryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="cv-graph__mode-glyph">
      <path
        d="M7 9h18M7 16h18M7 23h11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="cv-graph__mode-glyph">
      <path
        d="M9 9 16 16M23 10 16 16M16 16 10 26M16 16l8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="9" cy="9" r="2.4" fill="currentColor" />
      <circle cx="23" cy="10" r="2.4" fill="currentColor" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <circle cx="10" cy="26" r="2.4" fill="currentColor" />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" />
    </svg>
  );
}

export default function CvGraph({ lang }: { lang: Lang }) {
  const c = allCopy[lang].cvGraph;

  return (
    <section className="cv-graph section" id="curriculo-grafo">
      <svg
        className="cv-graph__field"
        aria-hidden="true"
        viewBox="0 0 1000 360"
        preserveAspectRatio="xMidYMid slice"
      >
        {FIELD_EDGES.map(([a, b]) => {
          const [x1, y1] = FIELD_NODES[a];
          const [x2, y2] = FIELD_NODES[b];
          return (
            <line
              key={`${a}-${b}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="cv-graph__field-edge"
            />
          );
        })}
        {FIELD_NODES.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={index % 5 === 0 ? 6 : 4}
            className={
              index % 5 === 0 ? "cv-graph__field-node cv-graph__field-node--accent" : "cv-graph__field-node"
            }
          />
        ))}
      </svg>

      <div className="section-index">{c.index}</div>

      <header className="cv-graph__header" data-reveal>
        <p className="eyebrow eyebrow--acid">{c.eyebrow}</p>
        <h2>
          {c.heading.line1}
          <br />
          <em>{c.heading.emphasis}</em>
        </h2>
        <p className="cv-graph__lead">{c.lead}</p>
      </header>

      <div className="cv-graph__link" aria-hidden="true">
        <span className="cv-graph__node" />
        <span className="cv-graph__link-line" />
        <span className="cv-graph__link-label">{c.linkLabel}</span>
        <span className="cv-graph__link-line" />
        <span className="cv-graph__node" />
      </div>

      <div className="cv-graph__modes" data-reveal>
        <article className="cv-graph__mode">
          <span className="cv-graph__mode-icon">
            <QueryIcon />
          </span>
          <p className="cv-graph__mode-kicker">{c.modes.query.kicker}</p>
          <h3>{c.modes.query.title}</h3>
          <p>{c.modes.query.description}</p>
          <a
            className="button button--ink"
            href={cvGraphLinks.query}
            target="_blank"
            rel="noreferrer"
          >
            {c.modes.query.cta} <Arrow />
          </a>
        </article>

        <article className="cv-graph__mode cv-graph__mode--graph">
          <span className="cv-graph__mode-icon">
            <GraphIcon />
          </span>
          <p className="cv-graph__mode-kicker">{c.modes.graph.kicker}</p>
          <h3>{c.modes.graph.title}</h3>
          <p>{c.modes.graph.description}</p>
          <a
            className="button button--acid"
            href={cvGraphLinks.graph}
            target="_blank"
            rel="noreferrer"
          >
            {c.modes.graph.cta} <Arrow />
          </a>
        </article>
      </div>
    </section>
  );
}
