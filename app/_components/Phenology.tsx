"use client";

/**
 * Fenologia — o calendário de contribuições do GitHub lido como um gráfico
 * fenológico: uma faixa por ano, intensidade por dia, eventos de pico marcados
 * como floradas.
 *
 * Os dados vêm congelados de `data/contributions.ts` (veja
 * `scripts/fetch-contributions.mjs`). Aqui só mora a apresentação.
 */

import { useMemo, useState } from "react";
import {
  contributions,
  contributionsActiveDays,
  contributionsPeakDay,
  contributionsTotal,
  type ContributionDay,
} from "@/data/contributions";
import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";

const WEEKDAYS = 7;

/**
 * Limiares da escala de cor, comuns a TODOS os anos.
 *
 * O GitHub normaliza os níveis ano a ano, o que serve para olhar um ano de
 * cada vez e mente quando as faixas são empilhadas: um ano fraco ganharia a
 * mesma saturação de um ano forte. Aqui os quantis saem do conjunto inteiro de
 * dias ativos do período, então a comparação vertical é honesta.
 *
 * O último corte fica no percentil 95: os dias de pico são raros o bastante
 * para funcionarem como eventos pontuais na faixa, não como textura de fundo.
 */
const QUANTILES = [0.5, 0.8, 0.95];

function quantile(sorted: number[], p: number) {
  if (sorted.length === 0) return 0;
  return sorted[Math.floor((sorted.length - 1) * p)];
}

/** `0` = sem atividade; `1`–`4` = intensidade crescente. */
function levelOf(count: number, thresholds: number[]) {
  if (count <= 0) return 0;
  let level = 1;
  for (const threshold of thresholds) {
    if (count > threshold) level += 1;
  }
  return Math.min(level, 4);
}

/**
 * Posição das marcas de mês, em colunas de semana.
 *
 * Cada ano começa num dia da semana diferente, então a coluna em que um mês
 * cai varia em até uma posição entre os anos. A média entre os anos mantém o
 * eixo único legível — a alternativa seria repetir um eixo por faixa, que
 * polui uma grade de quatro linhas.
 */
function monthColumns(years: typeof contributions.years) {
  const sums = new Array(12).fill(0);
  const counts = new Array(12).fill(0);

  for (const year of years) {
    const seen = new Set<number>();
    year.weeks.forEach((week, columnIndex) => {
      for (const day of week) {
        if (!day) continue;
        const month = Number(day[0].slice(5, 7)) - 1;
        if (seen.has(month)) continue;
        seen.add(month);
        sums[month] += columnIndex;
        counts[month] += 1;
      }
    });
  }

  return sums.map((sum, month) =>
    counts[month] ? Math.round(sum / counts[month]) : 0,
  );
}

type Hovered = {
  year: number;
  date: string;
  count: number;
  column: number;
  row: number;
} | null;

export default function Phenology({ lang }: { lang: Lang }) {
  const c = allCopy[lang].phenology;
  const locale = allCopy[lang].meta.locale;

  const { thresholds, columns, monthTicks } = useMemo(() => {
    const active: number[] = [];
    for (const year of contributions.years) {
      for (const week of year.weeks) {
        for (const day of week) {
          if (day && day[1] > 0) active.push(day[1]);
        }
      }
    }
    active.sort((a, b) => a - b);

    return {
      thresholds: QUANTILES.map((p) => quantile(active, p)),
      columns: Math.max(...contributions.years.map((year) => year.weeks.length)),
      monthTicks: monthColumns(contributions.years),
    };
  }, []);

  const [hovered, setHovered] = useState<Hovered>(null);

  const dayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );

  const capturedAt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
        .format(new Date(contributions.generatedAt))
        .toUpperCase(),
    [locale],
  );

  const firstYear = contributions.years[0].year;
  const lastYear = contributions.years[contributions.years.length - 1].year;

  return (
    <section className="phenology section" id="fenologia">
      <div className="section-index">{c.index}</div>

      <header className="phenology__header" data-reveal>
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2>
            {c.heading.line1}
            <br />
            <em>{c.heading.emphasis}</em>
          </h2>
        </div>
        <div className="phenology__intro">
          <p>{c.intro}</p>
          <p className="phenology__note">{c.scaleNote}</p>
        </div>
      </header>

      <div className="phenology__chart" data-reveal>
        <div className="phenology__scroll">
          <div
            className="phenology__grid"
            style={
              {
                "--phenology-columns": columns,
                "--phenology-rows": WEEKDAYS,
              } as React.CSSProperties
            }
          >
            <div className="phenology__months" aria-hidden="true">
              {c.months.map((month, index) => (
                <span
                  key={month}
                  style={{ gridColumnStart: monthTicks[index] + 1 }}
                >
                  {month}
                </span>
              ))}
            </div>

            {contributions.years.map((year) => (
              <div
                className="phenology__band"
                key={year.year}
                tabIndex={0}
                role="group"
                aria-label={c.a11y.yearSummary({
                  year: year.year,
                  total: year.total,
                  activeDays: year.activeDays,
                  maxDay: year.maxDay,
                })}
              >
                <span className="phenology__year" aria-hidden="true">
                  {year.year}
                </span>

                <div className="phenology__cells" aria-hidden="true">
                  {year.weeks.map((week, columnIndex) =>
                    week.map((day: ContributionDay, rowIndex) => {
                      if (!day) return null;
                      const [date, count] = day;
                      const level = levelOf(count, thresholds);
                      return (
                        <i
                          key={date}
                          className="phenology__cell"
                          data-level={level}
                          style={{
                            gridColumnStart: columnIndex + 1,
                            gridRowStart: rowIndex + 1,
                          }}
                          onMouseEnter={() =>
                            setHovered({
                              year: year.year,
                              date,
                              count,
                              column: columnIndex,
                              row: rowIndex,
                            })
                          }
                          onMouseLeave={() => setHovered(null)}
                        />
                      );
                    }),
                  )}
                </div>

                <span className="phenology__total" aria-hidden="true">
                  <strong>{year.total.toLocaleString(locale)}</strong>
                  {year.year === lastYear ? <small>{c.inProgress}</small> : null}
                </span>

                {/* O tooltip vive dentro da faixa: assim a posição sai direto de
                    coluna e linha da célula, sem medir nada em JavaScript. */}
                {hovered?.year === year.year ? (
                  <div
                    className="phenology__tooltip"
                    style={
                      {
                        "--tooltip-column": hovered.column,
                        "--tooltip-row": hovered.row,
                      } as React.CSSProperties
                    }
                    role="status"
                  >
                    <strong>
                      {hovered.count === 0
                        ? c.tooltip.none
                        : c.tooltip.count(hovered.count)}
                    </strong>
                    <span>
                      {dayFormatter.format(new Date(`${hovered.date}T00:00:00Z`))}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="phenology__legend" aria-hidden="true">
          <span>{c.legend.less}</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i className="phenology__cell" data-level={level} key={level} />
          ))}
          <span>{c.legend.more}</span>
          <span className="phenology__legend-peak">{c.legend.peak}</span>
        </div>
      </div>

      <dl className="phenology__stats" data-reveal>
        <div>
          <dt>{c.stats.total}</dt>
          <dd>{contributionsTotal.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt>{c.stats.activeDays}</dt>
          <dd>{contributionsActiveDays.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt>{c.stats.peak}</dt>
          <dd>{contributionsPeakDay.toLocaleString(locale)}</dd>
        </div>
        <div>
          <dt>{c.stats.span}</dt>
          <dd>
            {firstYear}—{String(lastYear).slice(2)}
          </dd>
        </div>
      </dl>

      <p className="phenology__source" data-reveal>
        {c.source({
          handle: contributions.handle,
          scope: c.scopes[contributions.source],
          capturedAt,
        })}
      </p>

      {/* A grade tem mais de mil células: torná-las focáveis daria mil paradas
          de tabulação. O foco para em cada faixa de ano, que anuncia o próprio
          resumo, e a tabela abaixo entrega os agregados mensais a quem lê por
          leitor de tela. */}
      <table className="visually-hidden">
        <caption>{c.a11y.tableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">{c.a11y.yearColumn}</th>
            {c.months.map((month) => (
              <th scope="col" key={month}>
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contributions.years.map((year) => {
            const monthly = new Array(12).fill(0);
            for (const week of year.weeks) {
              for (const day of week) {
                if (!day) continue;
                monthly[Number(day[0].slice(5, 7)) - 1] += day[1];
              }
            }
            return (
              <tr key={year.year}>
                <th scope="row">{year.year}</th>
                {monthly.map((total, index) => (
                  <td key={`${year.year}-${c.months[index]}`}>{total}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
