/**
 * Gera as variantes por largura que `scripts/image-loader.ts` referencia.
 *
 * Só processa imagens citadas no código — o acervo bruto em
 * `public/images/photos/` não é referenciado por nada e ficaria semanas
 * gerando variantes de fotos que a página nunca mostra.
 */

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = join(projectRoot, "public");
const outputDir = join(publicDir, "_img");
const sourceDirs = ["app", "data"];
const sourceExtensions = new Set([".ts", ".tsx"]);
const raster = /\.(avif|jpe?g|png|webp)$/i;
const referencePattern = /\/images\/[\w./-]+\.(?:avif|jpe?g|png|webp)/gi;
const concurrency = 8;

const config = JSON.parse(
  await readFile(join(projectRoot, "scripts", "image-sizes.json"), "utf8"),
);
const widths = [...new Set([...config.deviceSizes, ...config.imageSizes])].sort(
  (a, b) => a - b,
);

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** Caminhos `/images/...` citados literalmente no código-fonte. */
async function collectReferences() {
  const found = new Set();

  for (const directory of sourceDirs) {
    const base = join(projectRoot, directory);
    if (!existsSync(base)) continue;

    for await (const path of walk(base)) {
      if (!sourceExtensions.has(path.slice(path.lastIndexOf(".")))) continue;
      const source = await readFile(path, "utf8");
      for (const match of source.matchAll(referencePattern)) found.add(match[0]);
    }
  }

  return [...found].sort();
}

async function isStale(sourcePath, targetPath) {
  if (!existsSync(targetPath)) return true;
  const [source, target] = await Promise.all([stat(sourcePath), stat(targetPath)]);
  return source.mtimeMs > target.mtimeMs;
}

async function run(jobs) {
  let cursor = 0;
  let written = 0;

  const workers = Array.from({ length: concurrency }, async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      await mkdir(dirname(job.target), { recursive: true });
      await sharp(job.source)
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: config.quality })
        .toFile(job.target);
      written += 1;
    }
  });

  await Promise.all(workers);
  return written;
}

/** Remove variantes de imagens renomeadas ou removidas do código. */
async function prune(expected) {
  if (!existsSync(outputDir)) return 0;
  let removed = 0;

  for await (const path of walk(outputDir)) {
    if (expected.has(path)) continue;
    await rm(path);
    removed += 1;
  }

  return removed;
}

const references = await collectReferences();
const jobs = [];
const expected = new Set();
const missing = [];

for (const reference of references) {
  const source = join(publicDir, reference);
  if (!existsSync(source)) {
    missing.push(reference);
    continue;
  }

  const stem = reference.slice("/images/".length).replace(raster, "");
  for (const width of widths) {
    const target = join(outputDir, `${stem}-${width}.webp`);
    expected.add(target);
    if (await isStale(source, target)) jobs.push({ source, target, width });
  }
}

const written = await run(jobs);
const removed = await prune(expected);

console.log(
  `Imagens: ${references.length - missing.length} fontes × ${widths.length} larguras — ` +
    `${written} geradas, ${expected.size - written} reaproveitadas, ${removed} obsoletas removidas.`,
);

if (missing.length) {
  console.warn(
    `Referências sem arquivo em public/ (${missing.length}):\n  ${missing.join("\n  ")}`,
  );
  process.exitCode = 1;
}
