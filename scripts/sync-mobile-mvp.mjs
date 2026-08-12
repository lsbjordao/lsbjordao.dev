import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(projectRoot, "../React-native-app-mvp/dist");
const target = path.join(projectRoot, "public/mobile-mvp");

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

const indexPath = path.join(target, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
await writeFile(
  indexPath,
  indexHtml
    .replace('<html lang="en">', '<html lang="pt-BR">')
    .replaceAll('href="/', 'href="/mobile-mvp/')
    .replaceAll('src="/', 'src="/mobile-mvp/'),
);

const bundleDirectory = path.join(target, "_expo/static/js/web");
const bundleNames = await readdir(bundleDirectory);

for (const bundleName of bundleNames.filter((name) => name.endsWith(".js"))) {
  const bundlePath = path.join(bundleDirectory, bundleName);
  const bundle = await readFile(bundlePath, "utf8");
  await writeFile(bundlePath, bundle.replaceAll('"/assets/', '"/mobile-mvp/assets/'));
}

console.log(`Mobile MVP synchronized from ${source} to ${target}`);
