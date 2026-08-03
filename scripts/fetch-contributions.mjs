/**
 * Captura o calendário de contribuições do GitHub e congela o resultado em
 * `data/contributions.ts`.
 *
 * O site é export estático, então este script NÃO roda no `build`: a build
 * precisa ser reprodutível sem rede e sem token. Rode `npm run contributions`
 * quando quiser atualizar os números e versione o arquivo gerado.
 *
 * Duas fontes possíveis, e a diferença entre elas é grande:
 *
 *   authenticated  API GraphQL como `viewer`. Inclui contribuições em
 *                  repositórios privados — é o número que você vê logado no
 *                  seu próprio perfil. Exige token com escopo `read:user`.
 *
 *   public         Endpoint HTML público do perfil. Só enxerga atividade
 *                  pública; em 2023 isso é 427 contra 1.130 reais. Fallback
 *                  explícito, nunca silencioso: passe `--public`.
 *
 * A fonte usada fica gravada em `contributions.source` para que a página possa
 * declarar o que está mostrando.
 */

import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const run = promisify(execFile);

const FIRST_YEAR = 2023;
const USER = "lsbjordao";
const OUTPUT = new URL("../data/contributions.ts", import.meta.url);

const wantsPublic = process.argv.includes("--public");

/** Escopos do token ativo do `gh`, lidos do header que a própria API devolve. */
async function tokenScopes() {
  const { stdout } = await run("gh", ["api", "-i", "user"], {
    maxBuffer: 1024 * 1024 * 8,
  });
  const header = stdout.match(/^x-oauth-scopes:\s*(.*)$/im);
  if (!header) return [];
  return header[1]
    .split(",")
    .map((scope) => scope.trim())
    .filter(Boolean);
}

async function graphql(query, variables) {
  const args = ["api", "graphql", "-f", `query=${query}`];
  for (const [key, value] of Object.entries(variables)) {
    args.push("-f", `${key}=${value}`);
  }
  const { stdout } = await run("gh", args, { maxBuffer: 1024 * 1024 * 32 });
  const payload = JSON.parse(stdout);
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }
  return payload.data;
}

const CALENDAR_QUERY = `
  query($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
            }
          }
        }
      }
    }
  }
`;

/** Um ano pela API autenticada, já no formato interno `{date, count, weekday}`. */
async function fetchYearAuthenticated(year) {
  const data = await graphql(CALENDAR_QUERY, {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  });
  const calendar = data.viewer.contributionsCollection.contributionCalendar;
  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      weekday: day.weekday,
    })),
  );
  return { days, reported: calendar.totalContributions };
}

/**
 * Um ano pelo HTML público. O calendário vem como uma tabela em que cada `<td>`
 * carrega a data e o nível, e a contagem real mora no `<tool-tip>` associado
 * pelo `id` da célula — daí o casamento em duas etapas.
 */
async function fetchYearPublic(year) {
  const response = await fetch(
    `https://github.com/users/${USER}/contributions?from=${year}-01-01&to=${year}-12-31`,
    { headers: { "user-agent": "lsbjordao.dev contributions script" } },
  );
  if (!response.ok) {
    throw new Error(`GitHub respondeu ${response.status} para ${year}`);
  }
  const html = await response.text();

  const tooltips = new Map(
    [...html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)].map(
      (match) => [match[1], match[2].trim()],
    ),
  );

  const days = [
    ...html.matchAll(
      /<td\b(?=[^>]*class="ContributionCalendar-day")[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"/g,
    ),
  ].map(([, date, id]) => {
    const label = tooltips.get(id) ?? "";
    const count = /No contributions/i.test(label)
      ? 0
      : Number.parseInt(label.replace(/,/g, ""), 10) || 0;
    return { date, count, weekday: new Date(`${date}T00:00:00Z`).getUTCDay() };
  });

  const header = html.match(/<h2[^>]*>\s*([\d,]+)\s*\n?\s*contribution/);
  return {
    days,
    reported: header ? Number.parseInt(header[1].replace(/,/g, ""), 10) : null,
  };
}

/**
 * Agrupa os dias nas colunas do calendário. Cada semana é um array de sete
 * posições indexadas por dia da semana (domingo = 0); as bordas do ano ficam
 * `null` para que as faixas de anos diferentes continuem alinhadas na grade.
 */
function toWeeks(days) {
  const weeks = [];
  let current = new Array(7).fill(null);
  let started = false;

  for (const day of days) {
    if (started && day.weekday === 0) {
      weeks.push(current);
      current = new Array(7).fill(null);
    }
    current[day.weekday] = { date: day.date, count: day.count };
    started = true;
  }
  if (started) weeks.push(current);
  return weeks;
}

function summarise(year, days, reported) {
  const counts = days.map((day) => day.count);
  const total = counts.reduce((sum, count) => sum + count, 0);

  if (reported !== null && reported !== total) {
    console.warn(
      `  aviso: ${year} soma ${total} dias mas o GitHub declara ${reported}`,
    );
  }

  return {
    year,
    total,
    activeDays: counts.filter((count) => count > 0).length,
    maxDay: counts.length ? Math.max(...counts) : 0,
    weeks: toWeeks(days),
  };
}

function serialise(payload) {
  const years = payload.years
    .map((year) => {
      const weeks = year.weeks
        .map(
          (week) =>
            `      [${week
              .map((day) => (day ? `["${day.date}",${day.count}]` : "null"))
              .join(",")}],`,
        )
        .join("\n");
      return [
        "  {",
        `    year: ${year.year},`,
        `    total: ${year.total},`,
        `    activeDays: ${year.activeDays},`,
        `    maxDay: ${year.maxDay},`,
        "    weeks: [",
        weeks,
        "    ],",
        "  },",
      ].join("\n");
    })
    .join("\n");

  return `/**
 * Contribuições no GitHub de ${payload.years[0].year} até ${payload.years.at(-1).year}.
 *
 * ARQUIVO GERADO — não edite à mão. Rode \`npm run contributions\`.
 *
 * Cada dia é uma tupla \`[data, contagem]\` para manter o arquivo pequeno; as
 * semanas têm sempre sete posições (domingo → sábado) e as bordas do ano vêm
 * como \`null\`, de modo que as faixas de anos diferentes fiquem alinhadas.
 *
 * A escala de cor NÃO vive aqui: o componente deriva os níveis a partir das
 * contagens cruas, com limiares comuns a todos os anos. O GitHub calcula os
 * níveis ano a ano, o que faria um ano fraco parecer tão intenso quanto um ano
 * forte quando as faixas são comparadas lado a lado.
 */

/** \`[data ISO, contribuições]\`. \`null\` = dia fora do ano. */
export type ContributionDay = [string, number] | null;

export type ContributionYear = {
  year: number;
  total: number;
  activeDays: number;
  maxDay: number;
  weeks: ContributionDay[][];
};

export type ContributionSource = "authenticated" | "public";

export const contributions: {
  /** Instante da captura, ISO 8601. */
  generatedAt: string;
  /**
   * \`authenticated\`: inclui repositórios privados — é o número do perfil logado.
   * \`public\`: só atividade pública, bem abaixo do real.
   */
  source: ContributionSource;
  handle: string;
  years: ContributionYear[];
} = {
  generatedAt: "${payload.generatedAt}",
  source: "${payload.source}",
  handle: "${payload.handle}",
  years: [
${years}
  ],
};

export const contributionsTotal = contributions.years.reduce(
  (total, year) => total + year.total,
  0,
);

export const contributionsActiveDays = contributions.years.reduce(
  (total, year) => total + year.activeDays,
  0,
);

export const contributionsPeakDay = contributions.years.reduce(
  (peak, year) => Math.max(peak, year.maxDay),
  0,
);
`;
}

async function main() {
  const currentYear = new Date().getUTCFullYear();
  const years = [];
  for (let year = FIRST_YEAR; year <= currentYear; year += 1) years.push(year);

  let source = "authenticated";

  if (wantsPublic) {
    source = "public";
    console.log("Fonte: HTML público (--public). Repositórios privados ficam de fora.");
  } else {
    const scopes = await tokenScopes();
    if (!scopes.includes("read:user")) {
      console.error(
        [
          "O token do gh não tem o escopo `read:user`.",
          "",
          `Sem ele o GitHub omite as contribuições privadas: 2023 volta 427 em vez de 1.130.`,
          "",
          "Para capturar os números reais:",
          "",
          "  gh auth refresh -s read:user",
          "",
          "Ou, para gravar deliberadamente só o que é público:",
          "",
          "  npm run contributions -- --public",
          "",
          `Escopos atuais: ${scopes.join(", ") || "nenhum"}`,
        ].join("\n"),
      );
      process.exitCode = 1;
      return;
    }
    console.log("Fonte: API GraphQL autenticada (inclui repositórios privados).");
  }

  const collected = [];
  for (const year of years) {
    const { days, reported } =
      source === "public"
        ? await fetchYearPublic(year)
        : await fetchYearAuthenticated(year);
    const summary = summarise(year, days, reported);
    collected.push(summary);
    console.log(
      `  ${year}: ${summary.total} contribuições · ${summary.activeDays} dias ativos · pico ${summary.maxDay}`,
    );
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source,
    handle: USER,
    years: collected,
  };

  await writeFile(OUTPUT, serialise(payload), "utf8");
  console.log(`\nGravado em data/contributions.ts`);
}

await main();
