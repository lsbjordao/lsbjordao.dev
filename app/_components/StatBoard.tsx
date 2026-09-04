"use client";

/**
 * Os números grandes do topo — e a gaveta que os sustenta.
 *
 * Doze números valem pouco sozinhos: "08 artigos" é alegação até alguém poder
 * ler quais. Os números com `drawer` viram botão e abrem a lista que comprova
 * o número.
 *
 * A gaveta é injetada na grade logo depois do último número da **mesma
 * fileira**, ocupando as doze colunas. Assim ela abre colada ao cartão que a
 * chamou, com uma seta apontando para ele, em vez de aparecer no fim de tudo.
 * Como o painel é filho da própria grade, o ponteiro que desce do número para
 * a lista nunca sai da região — e os links da lista ficam clicáveis, que era o
 * defeito de manter a gaveta fora dela.
 *
 * Interação: passar o cursor pré-visualiza, clicar fixa. Só o que não foi
 * fixado some quando o ponteiro deixa a grade.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  examBoards,
  peerReview,
  publicationsByRole,
  supervisions,
} from "@/data/academia";
import { npmPackages, type Lang, type StatDrawerId } from "@/data/site";
import { copy as allCopy } from "@/data/copy";
import CommercialServices from "./CommercialServices";

type OpenDrawer = { id: StatDrawerId; pinned: boolean };

const drawerPanelId = "stat-drawer-panel";

/** Espelha os breakpoints de `.stats` em globals.css. */
const WIDE_COLUMNS = 4;
const NARROW_COLUMNS = 2;
const NARROW_QUERY = "(max-width: 820px)";

function Arrow() {
  return (
    <svg aria-hidden="true" className="icon icon--diagonal" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function StatBoard({ lang }: { lang: Lang }) {
  const c = allCopy[lang];
  const d = c.drawers;

  const [open, setOpen] = useState<OpenDrawer | null>(null);

  // O servidor não conhece a largura da janela: renderiza em quatro colunas, que
  // é o desktop, e a hidratação corrige no celular.
  const [columns, setColumns] = useState(WIDE_COLUMNS);

  useEffect(() => {
    const query = window.matchMedia(NARROW_QUERY);
    const sync = () => setColumns(query.matches ? NARROW_COLUMNS : WIDE_COLUMNS);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const preview = useCallback((id: StatDrawerId) => {
    setOpen((current) => (current?.pinned ? current : { id, pinned: false }));
  }, []);

  const toggle = useCallback((id: StatDrawerId) => {
    setOpen((current) =>
      current?.id === id && current.pinned ? null : { id, pinned: true },
    );
  }, []);

  const dismissPreview = useCallback(() => {
    setOpen((current) => (current?.pinned ? current : null));
  }, []);

  const close = useCallback(() => setOpen(null), []);

  const active = open?.id;

  const placement = useMemo(() => {
    if (!active) return null;
    const index = c.stats.findIndex((stat) => stat.drawer === active);
    if (index === -1) return null;

    const column = index % columns;
    const lastOfRow = Math.min(
      Math.floor(index / columns) * columns + columns - 1,
      c.stats.length - 1,
    );

    return {
      /** Índice depois do qual o painel entra na grade. */
      after: lastOfRow,
      /** Centro do cartão ativo, para a seta apontar para ele. */
      arrow: `${((column + 0.5) / columns) * 100}%`,
    };
  }, [active, c.stats, columns]);

  const panel = active && (
    <div
      className="stat-drawer"
      id={drawerPanelId}
      role="region"
      aria-label={d[active].title}
      style={{ "--drawer-arrow": placement?.arrow } as React.CSSProperties}
      key="drawer"
    >
      <header className="stat-drawer__head">
        <h2>{d[active].title}</h2>
        <p>{d[active].note}</p>
        <button
          type="button"
          className="stat-drawer__close"
          onClick={close}
          aria-label={d.close}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <StatDrawerBody id={active} lang={lang} />
    </div>
  );

  return (
    <>
      <section className="stats-board" aria-label={c.a11y.statsRegion}>
        <div className="stats" onPointerLeave={dismissPreview}>
          {c.stats.map((stat, index) => {
            const cell = !stat.drawer ? (
              <article className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ) : (
              <button
                type="button"
                className={
                  active === stat.drawer ? "stat stat--drawer is-open" : "stat stat--drawer"
                }
                key={stat.label}
                aria-expanded={active === stat.drawer}
                aria-controls={active === stat.drawer ? drawerPanelId : undefined}
                onClick={() => toggle(stat.drawer!)}
                onFocus={() => preview(stat.drawer!)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") preview(stat.drawer!);
                }}
              >
                <strong>{stat.value}</strong>
                <span>
                  {stat.label}
                  <em className="stat__hint">
                    <span className="stat__chevron" aria-hidden="true" />
                    {active === stat.drawer && open?.pinned ? d.close : d.open}
                  </em>
                </span>
              </button>
            );

            if (placement?.after === index) return [cell, panel];
            return cell;
          })}
        </div>
      </section>
      <CommercialServices lang={lang} />
    </>
  );
}

function StatDrawerBody({ id, lang }: { id: StatDrawerId; lang: Lang }) {
  const c = allCopy[lang];
  const d = c.drawers;

  if (id === "packages") {
    return (
      <ul className="drawer-list drawer-list--packages">
        {npmPackages.map((item) => (
          <li key={item.id}>
            <a href={item.href} target="_blank" rel="noreferrer">
              <span className="drawer-list__title">
                <code>{item.name}</code>
                <small>v{item.version}</small>
              </span>
              <span className="drawer-list__body">{c.packages[item.id]}</span>
              <Arrow />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (id === "firstAuthor" || id === "coAuthor") {
    const role = id === "firstAuthor" ? "first" : "co";
    return (
      <ol className="drawer-list drawer-list--papers">
        {publicationsByRole(role).map((paper) => {
          const inner = (
            <>
              <span className="drawer-list__year">
                {paper.year}
                {paper.forthcoming && (
                  <em className="drawer-list__flag">{d.forthcoming}</em>
                )}
              </span>
              <span className="drawer-list__title">{paper.title}</span>
              <span className="drawer-list__body">
                <i>{paper.journal}</i>
                <small>{paper.reference}</small>
              </span>
              {paper.doi && <Arrow />}
            </>
          );

          return (
            <li key={paper.title}>
              {paper.doi ? (
                <a href={paper.doi} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <span className="drawer-list__static">{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    );
  }

  if (id === "examBoards") {
    return (
      <ol className="drawer-list drawer-list--boards">
        {examBoards.map((board) => (
          <li key={board.title}>
            <span className="drawer-list__static">
              <span className="drawer-list__year">{board.year}</span>
              <span className="drawer-list__title">{board.title}</span>
              <span className="drawer-list__body">
                <i>{d.levels[board.level]}</i>
                <small>{board.institution}</small>
              </span>
            </span>
          </li>
        ))}
      </ol>
    );
  }

  if (id === "supervision") {
    return (
      <ol className="drawer-list drawer-list--boards">
        {supervisions.map((item) => (
          <li key={item.title}>
            <span className="drawer-list__static">
              <span className="drawer-list__year">{item.year}</span>
              <span className="drawer-list__title">{item.title}</span>
              <span className="drawer-list__body">
                <i>{d.levels.undergraduate}</i>
                <small>{item.institution}</small>
              </span>
            </span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="drawer-journals">
      {peerReview.map((item) => (
        <li key={item.journal}>
          <strong>{item.journal}</strong>
          <small>{item.year}</small>
        </li>
      ))}
    </ul>
  );
}
