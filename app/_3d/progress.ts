import type { Register } from "./registers";

export type ActId = "branch" | "key" | "trichome" | "territory" | "clade";

/** Não se chama `Window`: sombrearia o global do DOM, que o diretor usa. */
export type ActWindow = { id: ActId; top: number; height: number };

export type SectionWindow = { top: number; height: number; register: Register };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * O ato ativo é o que contém o centro da viewport. Fora de qualquer janela a
 * resposta é `null`: é travessia, e o diretor mantém em quadro a geometria do
 * ato anterior, retintada. Devolver o ato mais próximo daria um salto de
 * câmera no meio da seção papel.
 */
export function resolveAct(
  windows: ActWindow[],
  center: number,
): { id: ActId; progress: number } | null {
  for (const w of windows) {
    if (center < w.top || center > w.top + w.height) continue;
    return { id: w.id, progress: w.height > 0 ? clamp01((center - w.top) / w.height) : 0 };
  }
  return null;
}

/**
 * Quanto de lâmina, de 0 a 1. `band` é a largura da zona de mistura em volta
 * da fronteira entre seções, em pixels de documento: sem ela o registro
 * trocaria de golpe e o traço piscaria de tinta para ácido.
 */
export function resolveRegister(
  sections: SectionWindow[],
  center: number,
  band: number,
): number {
  if (sections.length === 0) return 0;

  const alvo = (y: number) => {
    for (const s of sections) {
      if (y < s.top || y > s.top + s.height) continue;
      return s.register === "lamina" ? 1 : 0;
    }
    // Acima da primeira ou abaixo da última seção: usa a mais próxima.
    const first = sections[0];
    const last = sections[sections.length - 1];
    const near = y < first.top ? first : last;
    return near.register === "lamina" ? 1 : 0;
  };

  if (band <= 0) return alvo(center);

  // Média de amostras dentro da banda: dá uma rampa contínua na fronteira sem
  // precisar saber de que lado dela estamos.
  const passos = 4;
  let soma = 0;
  for (let i = 0; i <= passos; i += 1) {
    soma += alvo(center - band / 2 + (band * i) / passos);
  }
  return clamp01(soma / (passos + 1));
}
