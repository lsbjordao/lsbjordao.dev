"use client";

/**
 * Material didático — os livros de curso como uma estante de lombadas em pé.
 *
 * A espessura de cada lombada vem do número de capítulos (veja `spineWidth`),
 * então a estante se lê como acervo antes de se ler como texto. A expansão é
 * puro CSS (`:hover` e `:focus-visible`), o que a mantém navegável por teclado
 * sem estado nenhum aqui dentro.
 */

import type { CSSProperties } from "react";
import { spineWidth, teaching, teachingChapterTotal } from "@/data/teaching";
import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";

export default function Teaching({ lang }: { lang: Lang }) {
  const c = allCopy[lang].teaching;

  return (
    <section className="teaching section" id="aulas">
      <div className="section-index">{c.index}</div>

      <header className="teaching__header" data-reveal>
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2>
            {c.heading.line1}
            <br />
            <em>{c.heading.emphasis}</em>
          </h2>
        </div>
        <p className="teaching__intro">{c.intro}</p>
      </header>

      <div className="shelf" data-reveal>
        {teaching.map((item) => {
          const itemCopy = c.items[item.id];
          const isTool = item.kind === "interactive";

          return (
            <a
              className="spine"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              key={item.id}
              style={
                {
                  "--accent": item.accent,
                  "--accent-ink": item.ink,
                  "--spine-width": spineWidth(item),
                } as CSSProperties
              }
            >
              {/* A lombada fechada é decoração: o texto acessível mora no painel
                  aberto, que existe no DOM o tempo todo. */}
              <span className="spine__vertical" aria-hidden="true">
                <span className="spine__num">{item.number}</span>
                <span className="spine__title-v">{itemCopy.title}</span>
                <span className="spine__mark">{item.mark}</span>
              </span>

              <span className="spine__open">
                <span className="spine__eyebrow">
                  {isTool ? c.toolEyebrow : `${c.itemLabel} ${item.number}`}
                  <i aria-hidden="true"> · </i>
                  {itemCopy.volume}
                </span>
                <span className="spine__title">{itemCopy.title}</span>
                <ul className="spine__topics">
                  {itemCopy.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <span className="spine__cta">
                  {isTool ? c.openTool : c.openBook}
                  <i aria-hidden="true">↗</i>
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <p className="shelf__tally" data-reveal>
        {c.tally(teaching.length, teachingChapterTotal)}
      </p>
    </section>
  );
}
