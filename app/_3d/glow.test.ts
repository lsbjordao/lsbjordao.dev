import { test } from "node:test";
import assert from "node:assert/strict";
import { haloPixels } from "./glow.ts";

const SIZE = 64;
const alphaEm = (px: Uint8ClampedArray, x: number, y: number) => px[(y * SIZE + x) * 4 + 3];

test("tem o tamanho RGBA certo", () => {
  assert.equal(haloPixels(SIZE).length, SIZE * SIZE * 4);
});

test("é branco em todo canal de cor — a cor vem do material", () => {
  const px = haloPixels(SIZE);
  for (let i = 0; i < px.length; i += 4) {
    assert.equal(px[i], 255);
    assert.equal(px[i + 1], 255);
    assert.equal(px[i + 2], 255);
  }
});

test("opaco no centro e transparente na borda", () => {
  const px = haloPixels(SIZE);
  // Em tamanho par nenhum pixel cai no centro geométrico — o mais central fica
  // meio pixel fora dele e por isso não chega a 255.
  assert.ok(alphaEm(px, SIZE / 2, SIZE / 2) > 230);
  assert.equal(alphaEm(px, 0, 0), 0);
  assert.equal(alphaEm(px, SIZE - 1, SIZE - 1), 0);
});

test("alpha cai monotonicamente do centro para fora", () => {
  const px = haloPixels(SIZE);
  const c = SIZE / 2;
  let anterior = alphaEm(px, c, c);
  for (let d = 1; d < c; d += 1) {
    const atual = alphaEm(px, c + d, c);
    assert.ok(atual <= anterior, `subiu em d=${d}`);
    anterior = atual;
  }
});

test("é radialmente simétrico", () => {
  const px = haloPixels(SIZE);
  const c = SIZE / 2;
  // O eixo de simetria de uma textura par cai *entre* os pixels c-1 e c, então
  // o espelho de `c + d` é `c - 1 - d`. Comparar com `c - d` acusaria uma
  // assimetria que não existe.
  for (const d of [1, 5, 10, 20]) {
    assert.equal(alphaEm(px, c + d, c), alphaEm(px, c - 1 - d, c), `eixo x, d=${d}`);
    assert.equal(alphaEm(px, c, c + d), alphaEm(px, c + d, c), `x vs y, d=${d}`);
  }
});
