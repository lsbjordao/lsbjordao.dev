import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveAct, resolveRegister } from "./progress.ts";

const janelas = [
  { id: "branch" as const, top: 0, height: 1000 },
  { id: "key" as const, top: 2000, height: 1000 },
];

test("acha o ato que contém o centro da viewport", () => {
  assert.equal(resolveAct(janelas, 500)?.id, "branch");
  assert.equal(resolveAct(janelas, 2500)?.id, "key");
});

test("progresso vai de 0 a 1 dentro do ato", () => {
  assert.equal(resolveAct(janelas, 0)?.progress, 0);
  assert.equal(resolveAct(janelas, 500)?.progress, 0.5);
  assert.equal(resolveAct(janelas, 1000)?.progress, 1);
});

test("entre atos devolve null — é travessia, não ato", () => {
  assert.equal(resolveAct(janelas, 1500), null);
});

test("lista vazia não explode", () => {
  assert.equal(resolveAct([], 500), null);
});

const secoes = [
  { top: 0, height: 1000, register: "lamina" as const },
  { top: 1000, height: 1000, register: "prancha" as const },
];

test("registro é 1 no miolo de seção escura e 0 no miolo de seção papel", () => {
  assert.equal(resolveRegister(secoes, 300, 100), 1);
  assert.equal(resolveRegister(secoes, 1500, 100), 0);
});

test("registro cruza suave na borda, sem pop", () => {
  const meio = resolveRegister(secoes, 1000, 200);
  assert.ok(meio > 0.3 && meio < 0.7, `borda não misturou: ${meio}`);
});

test("registro nunca sai de [0, 1]", () => {
  for (let y = -500; y < 2500; y += 17) {
    const v = resolveRegister(secoes, y, 200);
    assert.ok(v >= 0 && v <= 1, `fora de faixa em y=${y}: ${v}`);
  }
});
