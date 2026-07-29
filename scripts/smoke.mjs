const pages = await fetch("http://127.0.0.1:9222/json/list").then((response) =>
  response.json(),
);
const page = pages.find((entry) => entry.type === "page");

if (!page?.webSocketDebuggerUrl) {
  throw new Error("No debuggable Chrome page found");
}

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
const runtimeErrors = [];
let sequence = 0;

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") {
    runtimeErrors.push(message.params.exceptionDetails.text);
  }
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

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: "http://localhost:4173/" });
await new Promise((resolve) => setTimeout(resolve, 1500));

const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.result.value;
};

await evaluate(`new Promise(async (resolve) => {
  const steps = 12;
  for (let index = 0; index <= steps; index += 1) {
    window.scrollTo(0, (document.documentElement.scrollHeight / steps) * index);
    await new Promise((next) => setTimeout(next, 90));
  }
  window.scrollTo(0, 0);
  setTimeout(resolve, 500);
})`);

const structural = await evaluate(`(async () => {
  const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const imageChecks = await Promise.all(
    [...document.images].map(async (image) => {
      const src = image.currentSrc || image.src;
      try {
        const response = await fetch(src);
        return { src, ok: response.ok };
      } catch {
        return { src, ok: false };
      }
    })
  );
  const brokenImages = imageChecks
    .filter((image) => !image.ok)
    .map((image) => image.src);
  const unsafeExternalLinks = [...document.querySelectorAll('a[target="_blank"]')]
    .filter((link) => !link.rel.includes("noreferrer"))
    .map((link) => link.href);
  return {
    h1: document.querySelectorAll("h1").length,
    duplicateIds,
    brokenImages,
    unsafeExternalLinks,
    sections: document.querySelectorAll("section").length,
    projects: document.querySelectorAll(".project-card").length,
    projectOrder: [...document.querySelectorAll(".project-card h3")]
      .map((heading) => heading.textContent)
  };
})()`);

const details = await evaluate(`(() => {
  const details = document.querySelector(".system details");
  details.querySelector("summary").click();
  return details.open;
})()`);

const patents = await evaluate(`(() => {
  const details = document.querySelector(".patent-index details");
  details.querySelector("summary").click();
  const cardLinks = document.querySelectorAll(
    ".project-card__related a[href*='patents.google.com']"
  );
  return {
    open: details.open,
    mentions: details.querySelectorAll(".patent-mention").length,
    cardLinks: cardLinks.length,
    scholarLink: document.querySelector(".patent-index__summary a")?.href,
    statuses: [...details.querySelectorAll(".patent-mention__status")]
      .map((node) => node.textContent.trim())
  };
})()`);

const filter = await evaluate(`(() => {
  const button = [...document.querySelectorAll(".project-filter button")]
    .find((node) => node.textContent.includes("Conservação"));
  button.click();
  return new Promise((resolve) => requestAnimationFrame(() =>
    resolve({
      count: document.querySelectorAll(".project-card").length,
      title: document.querySelector(".project-card h3")?.textContent
    })
  ));
})()`);

const coac = await evaluate(`(() => {
  const button = [...document.querySelectorAll(".view-switch button")]
    .find((node) => node.textContent.includes("Operação real"));
  button.click();
  return new Promise((resolve) => requestAnimationFrame(() => {
    const system = [...document.querySelectorAll(".system")]
      .find((node) => node.querySelector("h3")?.textContent.includes("CoAC"));
    resolve(system?.querySelector("img")?.alt);
  }));
})()`);

await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
const menu = await evaluate(`(() => {
  const button = document.querySelector(".menu-toggle");
  button.click();
  return new Promise((resolve) => requestAnimationFrame(() => resolve({
      expanded: button.getAttribute("aria-expanded"),
      open: document.querySelector(".nav").classList.contains("nav--open")
    })
  ));
})()`);

const report = {
  structural,
  details,
  patents,
  filter,
  coac,
  menu,
  runtimeErrors
};
console.log(JSON.stringify(report, null, 2));

const failed =
  structural.h1 !== 1 ||
  structural.duplicateIds.length > 0 ||
  structural.brokenImages.length > 0 ||
  structural.unsafeExternalLinks.length > 0 ||
  structural.projects !== 8 ||
  structural.projectOrder[1] !== "TTS–Mimosa" ||
  structural.projectOrder[2] !== "TTS–Mimosa Docs" ||
  !details ||
  !patents.open ||
  patents.mentions !== 3 ||
  patents.cardLinks !== 4 ||
  !patents.scholarLink?.includes("4981648392507436705") ||
  patents.statuses.filter((status) => status === "Atual").length !== 2 ||
  !patents.statuses.includes("Índice histórico") ||
  filter.count !== 1 ||
  !coac?.includes("Planilha") ||
  menu.expanded !== "true" ||
  !menu.open ||
  runtimeErrors.length > 0;

socket.close();
if (failed) process.exitCode = 1;
