/**
 * Hash puro: mesmos números de entrada sempre produzem a mesma saída, sem
 * estado compartilhado entre chamadas — ao contrário de um gerador sequencial,
 * não se desalinha se o React invocar o render mais de uma vez.
 *
 * Vive aqui, e não no componente, porque a folha em SVG e a geometria em 3D
 * precisam ser a mesma planta. Mudar esta função muda as duas.
 */
export function pseudoRandom(...parts: number[]) {
  let h = 0x9e3779b9;
  for (const part of parts) {
    h = Math.imul(h ^ part, 2654435761);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822519);
  h ^= h >>> 13;
  return (h >>> 0) / 0xffffffff;
}
