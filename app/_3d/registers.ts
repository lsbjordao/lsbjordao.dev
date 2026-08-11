/**
 * Os dois modos de ver a mesma geometria: prancha (traço de nanquim sobre
 * papel) e lâmina (campo escuro de microscopia). O registro é função da
 * posição do scroll, não do ato — a câmera atravessa seção papel com a
 * geometria do ato em quadro, e ali ela precisa virar traço.
 *
 * Blending não entra aqui de propósito: é propriedade de material e não
 * interpola, então trocá-lo no meio da travessia daria um pop. Os materiais
 * têm blending fixo e o que interpola é cor e alpha. `haloAlpha` chega a zero
 * no papel exatamente para que o blending aditivo do halo deixe de importar lá.
 *
 * Os tetos de alpha não são gosto: o fundo escuro é opaco e fica *abaixo* do
 * canvas, então o brilho pinta direto atrás do texto branco, sem nada
 * amortecendo. A 0,5/0,55 o branco cai para 3,05:1 e reprova em AA; a 0,30 dá
 * 4,88:1 no pior caso, que é cobertura total no pico. `registers.test.ts`
 * guarda esses números — mexer nos alphas quebra o teste, e é para quebrar.
 */
export type Register = "prancha" | "lamina";

export type RegisterUniforms = {
  stroke: [number, number, number];
  strokeAlpha: number;
  halo: [number, number, number];
  haloAlpha: number;
};

/** --ink #10251b */
const INK: [number, number, number] = [0x10 / 255, 0x25 / 255, 0x1b / 255];
/** --acid #d9ff63 */
const ACID: [number, number, number] = [0xd9 / 255, 0xff / 255, 0x63 / 255];
/** --coral #ff7657 */
const CORAL: [number, number, number] = [0xff / 255, 0x76 / 255, 0x57 / 255];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerp3 = (
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

export function mixRegister(t: number): RegisterUniforms {
  const k = clamp01(t);
  return {
    stroke: lerp3(INK, ACID, k),
    strokeAlpha: lerp(0.14, 0.3, k),
    halo: lerp3(CORAL, CORAL, k),
    haloAlpha: lerp(0, 0.3, k),
  };
}
