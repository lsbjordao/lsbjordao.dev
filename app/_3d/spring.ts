/**
 * Mola criticamente amortecida, integração semi-implícita.
 *
 * A câmera não segue o scroll direto porque jitter de trackpad sacudiria o
 * quadro, e não usa mola subamortecida porque overshoot em travelling de
 * câmera dá náusea. Amortecimento crítico é o único regime que converge rápido
 * e não passa do ponto.
 *
 * `dt` é clampado: uma aba que volta do background entrega um delta enorme, e
 * integração explícita com dt grande divergiria.
 */
const DT_MAX = 1 / 20;

export function stepSpring(
  current: number,
  velocity: number,
  target: number,
  omega: number,
  dt: number,
): { value: number; velocity: number } {
  const h = Math.min(dt, DT_MAX);
  // Semi-implícito: v primeiro, x com o v já atualizado. Estável para h*omega
  // moderado, ao contrário do Euler explícito.
  const denom = 1 + 2 * omega * h + omega * omega * h * h;
  const nextVelocity = (velocity + omega * omega * h * (target - current)) / denom;
  const nextValue = current + h * nextVelocity;
  return { value: nextValue, velocity: nextVelocity };
}
