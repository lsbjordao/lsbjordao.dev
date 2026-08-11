import { test } from "node:test";
import assert from "node:assert/strict";
import { mixRegister } from "./registers.ts";

test("nas pontas entrega os registros puros", () => {
  const prancha = mixRegister(0);
  const lamina = mixRegister(1);
  // Prancha é traço de tinta: escuro e discreto.
  assert.ok(prancha.strokeAlpha <= 0.18, `alpha alto no papel: ${prancha.strokeAlpha}`);
  assert.ok(prancha.stroke[0] < 0.2 && prancha.stroke[1] < 0.3);
  // Halo não contribui no papel — é o que torna o blending aditivo irrelevante lá.
  assert.equal(prancha.haloAlpha, 0);
  // Lâmina é brilho, mas contido: o teto vem do contraste, não do gosto.
  assert.ok(lamina.strokeAlpha >= 0.25);
  assert.ok(lamina.haloAlpha >= 0.25);
});

test("clampa fora de [0, 1]", () => {
  assert.deepEqual(mixRegister(-3), mixRegister(0));
  assert.deepEqual(mixRegister(4), mixRegister(1));
});

test("é monotônico e contínuo no alpha do traço", () => {
  let anterior = mixRegister(0).strokeAlpha;
  for (let i = 1; i <= 20; i += 1) {
    const atual = mixRegister(i / 20).strokeAlpha;
    assert.ok(atual >= anterior, `caiu em t=${i / 20}`);
    assert.ok(atual - anterior < 0.1, `salto grande em t=${i / 20}`);
    anterior = atual;
  }
});

/** Luminância relativa WCAG, de um sRGB já em 0..1. */
const luminancia = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contraste = (a: [number, number, number], b: [number, number, number]) => {
  const la = luminancia(a);
  const lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const sobre = (
  fundo: [number, number, number],
  frente: [number, number, number],
  alpha: number,
): [number, number, number] => [
  fundo[0] * (1 - alpha) + frente[0] * alpha,
  fundo[1] * (1 - alpha) + frente[1] * alpha,
  fundo[2] * (1 - alpha) + frente[2] * alpha,
];

const PAPER: [number, number, number] = [0xf1 / 255, 0xef / 255, 0xe7 / 255];
const INK_TEXT: [number, number, number] = [0x10 / 255, 0x25 / 255, 0x1b / 255];
const WHITE_TEXT: [number, number, number] = [0xfb / 255, 0xfa / 255, 0xf5 / 255];

test("no papel, o traço no pior caso não tira o texto do AA", () => {
  // O critério que importa não é "o papel não escurece" — uma linha visível
  // *tem* que escurecer o que cobre, senão não é linha. O que importa é que o
  // texto, que pinta acima do canvas, continue legível sobre o pior fundo local.
  const { stroke, strokeAlpha } = mixRegister(0);
  const pior = sobre(PAPER, stroke, strokeAlpha);
  const razao = contraste(INK_TEXT, pior);
  assert.ok(razao >= 4.5, `corpo abaixo do AA sobre o traço: ${razao.toFixed(2)}:1`);
});

test("no escuro, o brilho no pior caso não tira o texto branco do AA", () => {
  // O fundo escuro é opaco e fica *abaixo* do canvas, então o brilho pinta
  // direto atrás do texto — não há camada translúcida amortecendo. Este é o
  // pior caso possível: cobertura total, no alpha de pico dos dois materiais.
  const { stroke, strokeAlpha, halo, haloAlpha } = mixRegister(1);
  const pior = sobre(sobre(INK_TEXT, stroke, strokeAlpha), halo, haloAlpha);
  const razao = contraste(WHITE_TEXT, pior);
  assert.ok(razao >= 4.5, `branco abaixo do AA sobre o brilho: ${razao.toFixed(2)}:1`);
});

test("o registro escuro não desperdiça a margem que tem", () => {
  // Contraparte do teste acima: se sobrar margem grande, o brilho está mais
  // tímido do que precisa ser, e a cena fica invisível de graça.
  const { stroke, strokeAlpha, halo, haloAlpha } = mixRegister(1);
  const pior = sobre(sobre(INK_TEXT, stroke, strokeAlpha), halo, haloAlpha);
  assert.ok(
    contraste(WHITE_TEXT, pior) < 7,
    "há margem de contraste sobrando: o brilho pode subir",
  );
});
