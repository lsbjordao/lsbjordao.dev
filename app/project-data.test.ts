import { test } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../data/site.ts";

test("publica Markdown 4 Quarto como projeto de ciência aberta", () => {
  const project = projects.find((item) => item.id === "markdown4Quarto");

  assert.ok(project);
  assert.equal(project.number, "12");
  assert.equal(project.category, "openScience");
  assert.equal(
    project.href,
    "https://marketplace.visualstudio.com/items?itemName=lsbjordao.markdown-4-quarto",
  );
  assert.equal(project.image, "/images/markdown-4-quarto.webp");
  assert.deepEqual(project.tags, ["VS Code", "Quarto", "Markdown", "BibTeX / CSL"]);
});
