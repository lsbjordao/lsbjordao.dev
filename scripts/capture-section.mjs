import { writeFile } from "node:fs/promises";

const [selector = "#top", output = "/tmp/portfolio-section.png", width = "1440", height = "1100"] =
  process.argv.slice(2);

const pages = await fetch("http://127.0.0.1:9222/json/list").then((response) =>
  response.json(),
);
const page = pages.find((entry) => entry.type === "page");

if (!page?.webSocketDebuggerUrl) {
  throw new Error("No debuggable Chrome page found");
}

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let sequence = 0;

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: Number(width),
  height: Number(height),
  deviceScaleFactor: 1,
  mobile: Number(width) < 600,
});
await send("Page.navigate", { url: "http://localhost:4173/" });
await new Promise((resolve) => setTimeout(resolve, 1800));
await send("Runtime.evaluate", {
  expression: `document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: "start" })`,
});
await new Promise((resolve) => setTimeout(resolve, 1000));
const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
});
await writeFile(output, Buffer.from(screenshot.data, "base64"));
socket.close();
