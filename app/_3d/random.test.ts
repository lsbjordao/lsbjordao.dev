import { test } from "node:test";
import assert from "node:assert/strict";
import { pseudoRandom } from "./random.ts";

test("é determinístico: mesma entrada, mesma saída", () => {
  assert.equal(pseudoRandom(1, 2, 3), pseudoRandom(1, 2, 3));
});

test("não guarda estado entre chamadas", () => {
  const a = pseudoRandom(7);
  pseudoRandom(99);
  pseudoRandom(1000);
  assert.equal(pseudoRandom(7), a);
});

test("fica em [0, 1)", () => {
  for (let i = 0; i < 500; i += 1) {
    const v = pseudoRandom(i, i * 31, -i);
    assert.ok(v >= 0 && v < 1, `fora de faixa em i=${i}: ${v}`);
  }
});

test("entradas diferentes se separam", () => {
  const vistos = new Set<number>();
  for (let i = 0; i < 200; i += 1) vistos.add(pseudoRandom(i));
  assert.ok(vistos.size > 190, `colidiu demais: ${vistos.size}/200`);
});

test("preserva os valores que o Frond já desenha", () => {
  // Congela a saída atual: mexer no hash mudaria a arte já publicada.
  assert.equal(pseudoRandom(0, 0, -1).toFixed(12), "0.681573446999");
});
