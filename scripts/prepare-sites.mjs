import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const distDir = join(projectRoot, "dist");

mkdirSync(join(distDir, "server"), { recursive: true });
mkdirSync(join(distDir, ".openai"), { recursive: true });

cpSync(
  join(projectRoot, "sites", "server", "index.js"),
  join(distDir, "server", "index.js"),
);
cpSync(
  join(projectRoot, ".openai", "hosting.json"),
  join(distDir, ".openai", "hosting.json"),
);

console.log("Saída de produção preparada em dist/ com assets e Worker.");
