import { test } from "node:test";
import assert from "node:assert/strict";
import { stepSpring } from "./spring.ts";

const correr = (alvo: number, passos: number, dt = 1 / 60, omega = 6) => {
  let s = { value: 0, velocity: 0 };
  const trilha = [s.value];
  for (let i = 0; i < passos; i += 1) {
    s = stepSpring(s.value, s.velocity, alvo, omega, dt);
    trilha.push(s.value);
  }
  return trilha;
};

test("converge para o alvo", () => {
  const trilha = correr(10, 240);
  assert.ok(Math.abs(trilha[trilha.length - 1] - 10) < 0.01);
});

test("nunca passa do alvo — sem overshoot", () => {
  for (const v of correr(10, 240)) {
    assert.ok(v <= 10.0001, `passou do alvo: ${v}`);
  }
});

test("é monotônico ao subir", () => {
  const trilha = correr(10, 240);
  for (let i = 1; i < trilha.length; i += 1) {
    assert.ok(trilha[i] >= trilha[i - 1] - 1e-9, `recuou no passo ${i}`);
  }
});

test("parado no alvo continua parado", () => {
  const s = stepSpring(5, 0, 5, 6, 1 / 60);
  assert.equal(s.value, 5);
  assert.equal(s.velocity, 0);
});

test("dt grande não explode — frame perdido não estoura a cena", () => {
  const s = stepSpring(0, 0, 10, 6, 2);
  assert.ok(Number.isFinite(s.value) && s.value <= 10.0001, `instável: ${s.value}`);
});
