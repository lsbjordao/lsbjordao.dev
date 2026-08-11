/**
 * Fotograma — folha bipinada de *Mimosa*, gerada.
 *
 * O desenho é o de um fotograma: a silhueta da folha prensada contra o fundo,
 * desfocada, sem contorno duro. Não ilustra nada em particular; é o grupo em
 * que o trabalho taxonômico aconteceu, aparecendo como textura.
 *
 * A geração é pseudoaleatória mas determinística — mesma entrada, mesmo
 * ângulo, não importa quantas vezes o componente é invocado. Isso importa
 * duas vezes: o SVG do servidor bate com o do cliente (sem erro de
 * hidratação, mesmo com o duplo-render do Strict Mode), e a arte não "pisca"
 * diferente a cada visita.
 */

import { pseudoRandom } from "../_3d/random";

const VIEW_W = 900;
const VIEW_H = 700;

/** Comprimento da ráquis e número de pinas de uma folha. */
const RAQUIS = 300;
const PINNAE = 9;

type FrondSpec = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  opacity: number;
  blur: "soft" | "softer";
};

/** Três folhas em profundidades diferentes: a da frente nítida, as outras ao fundo. */
const FRONDS: FrondSpec[] = [
  { x: 120, y: 540, rotate: -46, scale: 1.3, opacity: 0.8, blur: "soft" },
  { x: 430, y: 640, rotate: -74, scale: 1.05, opacity: 0.45, blur: "softer" },
  { x: 30, y: 330, rotate: -18, scale: 0.8, opacity: 0.3, blur: "softer" },
];

function Leaf({ spec, leafIndex }: { spec: FrondSpec; leafIndex: number }) {
  const pinnae = [];

  for (let p = 0; p < PINNAE; p += 1) {
    const t = 0.1 + (p / (PINNAE - 1)) * 0.88;
    const px = t * RAQUIS;
    const py = -RAQUIS * 0.05 * (4 * t * (1 - t)) - RAQUIS * 0.02 * t * t;
    // Pinas mais longas no meio da ráquis, como na folha real.
    const length = 56 + 60 * Math.sin(Math.PI * t);

    for (const side of [-1, 1]) {
      const angle = side * (52 + pseudoRandom(leafIndex, p, side) * 12);
      const leaflets = Math.round(length / 6.4);
      pinnae.push(
        <g
          key={`${p}:${side}`}
          transform={`translate(${px.toFixed(1)},${py.toFixed(1)}) rotate(${angle.toFixed(1)})`}
        >
          <rect x={0} y={-0.7} width={Number(length.toFixed(1))} height={1.4} />
          {Array.from({ length: leaflets }, (_, index) => {
            const f = index + 1;
            const fx = (f / leaflets) * length;
            const ry = 1.5 + 1.5 * Math.sin(Math.PI * (f / leaflets));
            return [-1, 1].map((mirror) => {
              const cy = mirror * (ry + 1.3);
              return (
                <ellipse
                  key={`${f}:${mirror}`}
                  cx={Number(fx.toFixed(1))}
                  cy={Number(cy.toFixed(1))}
                  rx={3.3}
                  ry={Number(ry.toFixed(1))}
                  transform={`rotate(${mirror * 22} ${fx.toFixed(1)} ${cy.toFixed(1)})`}
                />
              );
            });
          })}
        </g>,
      );
    }
  }

  return (
    <g
      transform={`translate(${spec.x},${spec.y}) rotate(${spec.rotate}) scale(${spec.scale})`}
      fill="currentColor"
      opacity={spec.opacity}
      filter={`url(#frond-${spec.blur})`}
    >
      <path
        d={`M0,0 Q${RAQUIS * 0.5},${-RAQUIS * 0.05} ${RAQUIS},${-RAQUIS * 0.02}`}
        stroke="currentColor"
        strokeWidth={2.4}
        fill="none"
      />
      {pinnae}
    </g>
  );
}

export default function Frond({ className = "frond" }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
      <defs>
        <filter id="frond-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        <filter id="frond-softer" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>
      {FRONDS.map((spec, index) => (
        <Leaf key={index} spec={spec} leafIndex={index} />
      ))}
    </svg>
  );
}
