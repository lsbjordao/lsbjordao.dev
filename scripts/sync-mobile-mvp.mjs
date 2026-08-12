import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(projectRoot, "../React-native-app-mvp/dist");
const target = path.join(projectRoot, "public/mobile-mvp");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

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

// Git e alguns hosts ignoram qualquer diretório chamado `node_modules`, mesmo
// quando ele contém assets estáticos já compilados. Expo preserva esse nome no
// caminho das fontes; achatá-las evita que desapareçam durante a publicação.
const bundledModules = path.join(target, "assets/node_modules");
const fontsDirectory = path.join(target, "fonts");
const fontFiles = (await listFiles(bundledModules)).filter((file) => file.endsWith(".ttf"));
const fontReplacements = [];

await mkdir(fontsDirectory, { recursive: true });
for (const fontFile of fontFiles) {
  const fileName = path.basename(fontFile);
  const bundledPath = `/${path.relative(target, fontFile).split(path.sep).join("/")}`;
  const publicPath = `/mobile-mvp/fonts/${fileName}`;
  await cp(fontFile, path.join(fontsDirectory, fileName));
  fontReplacements.push([bundledPath, publicPath]);
}
await rm(bundledModules, { recursive: true, force: true });

const bundleDirectory = path.join(target, "_expo/static/js/web");
const bundleNames = await readdir(bundleDirectory);

for (const bundleName of bundleNames.filter((name) => name.endsWith(".js"))) {
  const bundlePath = path.join(bundleDirectory, bundleName);
  let bundle = await readFile(bundlePath, "utf8");
  for (const [bundledPath, publicPath] of fontReplacements) {
    bundle = bundle.replaceAll(`"${bundledPath}"`, `"${publicPath}"`);
  }
  await writeFile(bundlePath, bundle.replaceAll('"/assets/', '"/mobile-mvp/assets/'));
}

console.log(`Mobile MVP synchronized from ${source} to ${target}`);
