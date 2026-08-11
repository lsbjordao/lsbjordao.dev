/**
 * O teto de peso da cena é decisão de produto, não estética: esta é uma landing
 * de recolocação, e três dependências foram mantidas por anos de propósito.
 * Este script transforma o teto em número, para não virar promessa.
 *
 * O teto é 135 KB, e o número saiu de medição e não de estimativa. Duas
 * medidas, feitas em 2026-08-11 com three 0.185:
 *
 *   cena vazia, só o renderer .............. 130,4 KB gzip
 *   + toda a superfície dos cinco atos ..... 132,1 KB gzip
 *
 * Isto é, os atos custam ~1,7 KB somados: o peso é quase todo custo fixo do
 * `WebGLRenderer`, que referencia o `ShaderLib` inteiro por nome num mapa e
 * portanto não tree-shake. Cortar atos não reduziria nada — a única forma de
 * descer de verdade seria trocar o three por um renderer WebGL2 próprio, o que
 * é viável (a cena só usa linhas, pontos e quads instanciados com shader
 * próprio, sem luz nem sombra) e caberia em ~10 KB. Não foi feito porque
 * three.js foi um pedido explícito.
 *
 * Se este número subir muito acima de 132, alguém importou algo grande sem
 * perceber — é para isso que o teto serve.
 */
import { gzipSync } from "node:zlib";
import { readdir, readFile } from "node:fs/promises";

const TETO = 135 * 1024;
const dir = "dist/_next/static/chunks";

const arquivos = await readdir(dir).catch(() => {
  console.error(`Não achei ${dir}. Rode \`npm run build\` primeiro.`);
  process.exit(1);
});

const medidos = await Promise.all(
  arquivos
    .filter((nome) => nome.endsWith(".js"))
    .map(async (nome) => {
      const bruto = await readFile(`${dir}/${nome}`);
      // O chunk da cena é o que contém three.js. Achar por conteúdo é mais
      // robusto que por nome: o hash muda a cada build.
      const three = bruto.includes("WebGLRenderer") || bruto.includes("THREE.WebGL");
      return { nome, gzip: gzipSync(bruto).length, three };
    }),
);

const cena = medidos.filter((m) => m.three);
if (cena.length === 0) {
  console.error("Nenhum chunk com three.js encontrado — o dynamic import quebrou?");
  process.exit(1);
}

const total = cena.reduce((soma, m) => soma + m.gzip, 0);
for (const m of cena) {
  console.log(`  ${m.nome}  ${(m.gzip / 1024).toFixed(1)} KB gzip`);
}
console.log(
  `\ncena: ${(total / 1024).toFixed(1)} KB gzip · teto ${(TETO / 1024).toFixed(0)} KB`,
);

if (total > TETO) {
  console.error(`\nESTOUROU em ${((total - TETO) / 1024).toFixed(1)} KB.`);
  process.exit(1);
}
