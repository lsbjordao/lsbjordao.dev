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
import { profile, teachingRoles, type Lang } from "@/data/site";

export default function Teaching({ lang }: { lang: Lang }) {
  const c = allCopy[lang].teaching;
  const p = c.practice;

  return (
    <section className="teaching section" id="aulas">
      <div className="section-index">{c.index}</div>

      {/* A docência vem antes da estante: as apostilas são o rastro do que
          foi ensinado, não o contrário. */}
      <div className="docencia">
        <header className="docencia__header" data-reveal>
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2>
              {p.heading.line1}
              <br />
              <em>{p.heading.emphasis}</em>
            </h2>
          </div>
          <div className="docencia__intro">
            <span className="docencia__count">
              <strong>{String(teachingRoles.length).padStart(2, "0")}</strong>
              {p.countLabel}
            </span>
            <p>{p.intro}</p>
            <p className="docencia__credential">
              <span>{p.credential.label}</span>
              {p.credential.value}
            </p>
          </div>
        </header>

        <ol className="docencia__list" data-reveal>
          {teachingRoles.map((role) => {
            const roleCopy = p.roles[role.id];
            return (
              <li className={`docencia-role docencia-role--${role.kind}`} key={role.id}>
                <time>{role.years}</time>
                <div>
                  <span className="docencia-role__kind">
                    {p.kinds[role.kind]}
                    {role.hours && (
                      <em>
                        {role.hours} {p.hoursLabel}
                      </em>
                    )}
                  </span>
                  <h3>{roleCopy.title}</h3>
                  <small>{roleCopy.place}</small>
                </div>
              </li>
            );
          })}
        </ol>

        {/* O número e a lista são um recorte. Sem dizer isso, nove entradas
            leem como "foi só isso" — e não foi. */}
        <p className="docencia__note" data-reveal>
          {p.listNote.text}{" "}
          <a href={profile.lattes} target="_blank" rel="noreferrer">
            {p.listNote.link}
          </a>
          .
        </p>
      </div>

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
