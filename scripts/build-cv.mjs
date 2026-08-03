/**
 * Renderiza `scripts/cv/curriculo.html` em `public/cv/lucas-jordao-cv.pdf`.
 *
 * O Chrome headless é o motor porque já entende o CSS do currículo — a folha
 * usa as mesmas fontes variáveis e a mesma paleta do site, e qualquer outro
 * conversor exigiria manter um segundo estilo em paralelo.
 *
 * Uso: node scripts/build-cv.mjs [--keep-open]
 *
 * O PDF fica versionado no repositório: o site é um export estático servido
 * pelo Cloudflare Pages, que não roda este script no deploy. Depois de editar
 * o HTML, rode isto e faça commit do PDF junto.
 */

import { spawn, spawnSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createConnection } from "node:net";
import http from "node:http";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const source = join(projectRoot, "scripts", "cv", "curriculo.html");
const target = join(projectRoot, "public", "cv", "lucas-jordao-cv.pdf");
const port = 9422;

const candidates = [
  "google-chrome",
  "google-chrome-stable",
  "chromium",
  "chromium-browser",
];

function findChrome() {
  return candidates.find(
    (binary) => spawnSync("which", [binary], { stdio: "ignore" }).status === 0,
  );
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fetchJson(path) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: "127.0.0.1", port, path }, (response) => {
        let body = "";
        response.on("data", (chunk) => (body += chunk));
        response.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

/**
 * Fala CDP direto no socket, sem dependência externa. O handshake é fixo e a
 * moldura de frame só precisa cobrir texto curto — as respostas grandes (o PDF
 * em base64) chegam fragmentadas e são remontadas abaixo.
 */
function connectDevTools(wsUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(wsUrl);
    const socket = createConnection(
      { host: url.hostname, port: Number(url.port) },
      () => {
        const key = Buffer.from(Math.random().toString(36)).toString("base64");
        socket.write(
          `GET ${url.pathname} HTTP/1.1\r\n` +
            `Host: ${url.host}\r\n` +
            "Upgrade: websocket\r\nConnection: Upgrade\r\n" +
            `Sec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`,
        );
      },
    );

    let handshaken = false;
    let buffer = Buffer.alloc(0);
    let id = 0;
    const pending = new Map();
    let fragments = [];
    let fragmentOpcode = 0;

    const deliver = (text) => {
      const message = JSON.parse(text);
      if (message.id && pending.has(message.id)) {
        pending.get(message.id)(message.result);
        pending.delete(message.id);
      }
    };

    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);

      if (!handshaken) {
        const end = buffer.indexOf("\r\n\r\n");
        if (end === -1) return;
        handshaken = true;
        buffer = buffer.subarray(end + 4);
        resolve({ send, close: () => socket.end() });
      }

      while (buffer.length >= 2) {
        const fin = (buffer[0] & 0x80) !== 0;
        const opcode = buffer[0] & 0x0f;
        let length = buffer[1] & 0x7f;
        let offset = 2;

        if (length === 126) {
          if (buffer.length < 4) return;
          length = buffer.readUInt16BE(2);
          offset = 4;
        } else if (length === 127) {
          if (buffer.length < 10) return;
          length = Number(buffer.readBigUInt64BE(2));
          offset = 10;
        }

        if (buffer.length < offset + length) return;
        const payload = buffer.subarray(offset, offset + length);
        buffer = buffer.subarray(offset + length);

        if (opcode === 0x8) {
          socket.end();
          return;
        }

        if (opcode === 0x0) {
          fragments.push(payload);
        } else {
          fragments = [payload];
          fragmentOpcode = opcode;
        }

        if (fin && (fragmentOpcode === 0x1 || fragmentOpcode === 0x0)) {
          deliver(Buffer.concat(fragments).toString("utf8"));
          fragments = [];
        }
      }
    });

    socket.on("error", reject);

    function send(method, params = {}) {
      return new Promise((res) => {
        const messageId = ++id;
        pending.set(messageId, res);
        const payload = Buffer.from(
          JSON.stringify({ id: messageId, method, params }),
          "utf8",
        );
        const header = [];
        header.push(0x81);

        const mask = Buffer.from([0, 0, 0, 0]);
        if (payload.length < 126) header.push(0x80 | payload.length);
        else if (payload.length < 65536) {
          header.push(0x80 | 126, payload.length >> 8, payload.length & 0xff);
        } else {
          header.push(0x80 | 127, 0, 0, 0, 0);
          header.push(
            (payload.length >> 24) & 0xff,
            (payload.length >> 16) & 0xff,
            (payload.length >> 8) & 0xff,
            payload.length & 0xff,
          );
        }
        socket.write(Buffer.concat([Buffer.from(header), mask, payload]));
      });
    }
  });
}

async function main() {
  if (!existsSync(source)) throw new Error(`fonte não encontrada: ${source}`);

  const chromeBinary = findChrome();
  if (!chromeBinary) {
    throw new Error(
      "Chrome não encontrado. Instale o google-chrome ou o chromium para gerar o PDF.",
    );
  }

  const profile = join(projectRoot, "dist", ".cv-chrome-profile");
  await mkdir(profile, { recursive: true });

  const chrome = spawn(
    chromeBinary,
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "--disable-gpu",
      "--no-sandbox",
      "--allow-file-access-from-files",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    let page;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      try {
        const targets = await fetchJson("/json/list");
        page = targets.find((target) => target.type === "page");
        if (page) break;
      } catch {
        /* o DevTools ainda não subiu */
      }
      await wait(250);
    }
    if (!page) throw new Error("não consegui falar com o Chrome headless");

    const client = await connectDevTools(page.webSocketDebuggerUrl);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Page.navigate", { url: pathToFileURL(source).href });
    await wait(1800);

    // As fontes variáveis carregam por @font-face; sem esperar por elas o PDF
    // sai com métrica de fallback e o conteúdo estoura a página.
    await client.send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => true)",
      awaitPromise: true,
    });
    await wait(400);

    const { data } = await client.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    });

    await mkdir(join(projectRoot, "public", "cv"), { recursive: true });
    await writeFile(target, Buffer.from(data, "base64"));

    const pdf = await readFile(target);
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(
      `PDF gerado: ${target} · ${(pdf.length / 1024).toFixed(0)} kB · ${pages} página(s)`,
    );
    if (pages !== 1) {
      console.warn(
        `AVISO: o currículo saiu com ${pages} páginas. Corte conteúdo em scripts/cv/curriculo.html.`,
      );
      process.exitCode = 1;
    }

    client.close();
  } finally {
    chrome.kill();
    // O Chrome ainda esvazia o perfil por um instante depois do SIGTERM; sem a
    // pausa o rm esbarra em arquivos recém-criados e derruba o script já com o
    // PDF pronto no disco.
    await wait(500);
    await rm(profile, { recursive: true, force: true, maxRetries: 5 }).catch(
      () => {},
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
