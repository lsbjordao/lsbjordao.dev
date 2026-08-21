/**
 * Dados independentes de idioma: links, imagens, ícones e identificadores.
 * Todo texto visível vive em `data/copy/pt.ts` e `data/copy/en.ts`, indexado
 * pelos mesmos `id` declarados aqui.
 */

export type Lang = "pt" | "en";

export const languages: Array<{ code: Lang; href: string; label: string; full: string }> = [
  { code: "pt", href: "/", label: "PT", full: "Português" },
  { code: "en", href: "/en", label: "EN", full: "English" },
];

export const profile = {
  name: "Lucas Sá Barreto Jordão",
  shortName: "Lucas S.B. Jordão",
  initials: "LJ",
  /**
   * Perfil do LinkedIn. O slug tem acento; a forma percent-encoded é a que
   * funciona em qualquer cliente de e-mail e leitor de feed.
   */
  linkedin: "https://www.linkedin.com/in/lucas-jord%C3%A3o-0349b616",
  linkedinHandle: "lucas-jordão-0349b616",
  github: "https://github.com/lsbjordao",
  githubHandle: "@lsbjordao",
  lattes: "https://lattes.cnpq.br/6445788694639027",
  lattesId: "6445788694639027",
  blog: "https://lsbjordao.github.io/",
  /**
   * Currículo de uma página, gerado por `npm run cv` a partir de
   * `scripts/cv/curriculo.html` (PT) e `curriculum.html` (EN). O botão de
   * download entrega a folha no idioma da página: quem chega pelo /en está
   * lendo em inglês e não deveria receber um PDF em português.
   */
  cv: {
    pt: "/cv/lucas-jordao-cv.pdf",
    en: "/cv/lucas-jordao-cv-en.pdf",
  } satisfies Record<Lang, string>,
  /**
   * Currículo detalhado, de duas páginas, do mesmo build. Convive com o de uma
   * página em vez de substituí-lo porque servem a momentos diferentes: a folha
   * única é o que se anexa a uma mensagem fria no LinkedIn, e esta é o que se
   * manda quando já existe uma conversa e alguém quer ver o detalhe técnico
   * dos sistemas, da docência e da produção.
   *
   * O Lattes completo continua em `/cv/lucas-jordao-curriculo-lattes.pdf`,
   * único em português — é documento oficial do CNPq, não tem versão vertida —
   * e é o terceiro degrau: o exaustivo, que nenhuma das duas folhas tenta ser.
   */
  cvDetailed: {
    pt: "/cv/lucas-jordao-cv-detalhado.pdf",
    en: "/cv/lucas-jordao-cv-detailed.pdf",
  } satisfies Record<Lang, string>,
  lattesPdf: "/cv/lucas-jordao-curriculo-lattes.pdf",
  site: "https://lsbjordao.dev",
};

/** Measurement ID do Google Analytics 4. Vazio desliga o script. */
export const analyticsId = "G-5XDBLWWPVD";

export const heroImage = {
  base: "/images/mimosa-osmarii",
  widths: [480, 640, 960, 1440],
  doi: "https://doi.org/10.11646/phytotaxa.312.2.6",
};

export const trichomeImage = {
  base: "/images/trichomes",
  widths: [480, 640, 960, 1440],
  doi: "https://doi.org/10.1016/j.flora.2020.151702",
};

/** Trilhas de atuação — os quatro terminais da chave de determinação. */
export type TrackId = "data" | "fullstack" | "geo" | "research";

export const tracks: Array<{
  id: TrackId;
  code: string;
  stack: string[];
  /** Âncoras nesta página que comprovam a trilha. */
  evidence: Array<{ href: string; external?: boolean }>;
}> = [
  {
    id: "data",
    code: "ENG–DAT",
    stack: [
      "Apache Airflow",
      "dbt",
      "BullMQ / Redis",
      "PostgreSQL",
      "DuckDB",
      "Python",
      "SQL",
      "GitLab CI/CD",
      "Docker",
    ],
    evidence: [{ href: "#cncflora" }, { href: "#projetos" }],
  },
  {
    id: "fullstack",
    code: "ENG–APP",
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "NestJS",
      "Node.js",
      "GraphQL",
      "REST",
      "PostgreSQL/PostGIS",
      "MongoDB",
      "Supabase Auth",
      "JWT",
      "Resend / SMTP",
      "Backstage",
      "Sphinx-Needs",
      "Docker",
    ],
    evidence: [{ href: "#cncflora" }, { href: "#projetos" }],
  },
  {
    id: "geo",
    code: "GEO–CON",
    stack: [
      "PostGIS",
      "MapBiomas",
      "Google Earth Engine",
      "R",
      "Python",
      "séries LULC",
      "critérios IUCN",
    ],
    evidence: [{ href: "#mapbiomas" }, { href: "#cncflora" }],
  },
  {
    id: "research",
    code: "SCI–TAX",
    stack: [
      "TypeScript",
      "modelagem de domínio",
      "Quarto",
      "LaTeX",
      "R",
      "filogenética",
      "FAIR / ciência aberta",
    ],
    evidence: [{ href: "#projetos" }],
  },
];

/**
 * Chave dicotômica de determinação. Cada couplet oferece duas escolhas; cada
 * escolha aponta para outro couplet (`goTo`) ou para uma trilha (`track`).
 */
export type CoupletId = "1" | "2" | "3";

export const key: Array<{
  id: CoupletId;
  leads: Array<{ mark: string; goTo?: CoupletId; track?: TrackId }>;
}> = [
  {
    id: "1",
    leads: [
      { mark: "1a", goTo: "2" },
      { mark: "1b", goTo: "3" },
    ],
  },
  {
    id: "2",
    leads: [
      { mark: "2a", track: "data" },
      { mark: "2b", track: "fullstack" },
    ],
  },
  {
    id: "3",
    leads: [
      { mark: "3a", track: "geo" },
      { mark: "3b", track: "research" },
    ],
  },
];

export type ProjectCategoryId =
  | "conservation"
  | "taxonomy"
  | "software"
  | "openScience";

export type ProjectId =
  | "tts"
  | "ttsMimosa"
  | "ttsMimosaDocs"
  | "lulc"
  | "lulcHabitat"
  | "ffb"
  | "curva"
  | "quartoWriting"
  | "quartoFocus"
  | "quartoConditional"
  | "quartoCiteThis";

/** Rótulo do bloco de links secundários de um card. */
export type RelatedLabelId = "patents" | "ffbApp" | "curvaCode";

export const projects: Array<{
  id: ProjectId;
  number: string;
  image: string;
  href: string;
  category: ProjectCategoryId;
  tags: string[];
  /** Controla imagens que precisam preservar mais do enquadramento original. */
  fit?: "contain" | "reduced";
  relatedLabelId?: RelatedLabelId;
  relatedLinks?: Array<{
    id: string;
    href: string;
    status?: "current" | "historical";
  }>;
}> = [
  {
    id: "tts",
    number: "01",
    image: "/images/type-taxon-script.webp",
    href: "https://github.com/lsbjordao/TypeTaxonScript",
    category: "taxonomy",
    tags: ["TypeScript", "JSON", "DDD", "Google Patents"],
    relatedLinks: [
      {
        id: "scholar",
        href: "https://patents.google.com/scholar/4981648392507436705",
        status: "current",
      },
      {
        id: "CN107861721A",
        href: "https://patents.google.com/patent/CN107861721A/en",
        status: "current",
      },
      {
        id: "US20260127206A1",
        href: "https://patents.google.com/patent/US20260127206A1/en",
        status: "current",
      },
    ],
  },
  {
    id: "ttsMimosa",
    number: "02",
    image: "/images/tts-mimosa.webp",
    href: "https://lsbjordao.github.io/TTS-Mimosa-App/",
    category: "software",
    tags: ["Next.js", "MongoDB", "TypeScript"],
    fit: "reduced",
  },
  {
    id: "ttsMimosaDocs",
    number: "03",
    image: "/images/tts-mimosa-docs.webp",
    href: "https://lsbjordao.github.io/TTS-Mimosa/",
    category: "taxonomy",
    tags: ["TypeScript", "TypeDoc", "TSDoc", "domain modelling"],
  },
  {
    id: "lulc",
    number: "04",
    image: "/images/lulc-leguminosae.webp",
    href: "https://lsbjordao.github.io/LULC-MapBiomas-Leguminosae/",
    category: "conservation",
    tags: ["MapBiomas", "R", "PostGIS", "IUCN"],
    fit: "contain",
  },
  {
    id: "lulcHabitat",
    number: "05",
    image: "/images/lulc-habitat-auth.webp",
    href: "https://lulc-habitat.lsbjordao.dev",
    category: "software",
    tags: ["Supabase Auth", "JWT", "Resend", "SMTP"],
    fit: "contain",
  },
  {
    id: "ffb",
    number: "06",
    image: "/images/ffb-cronologia.webp",
    href: "https://lsbjordao-ffb-cronologia.hf.space/#/ranking",
    category: "software",
    tags: ["394 versions", "fuzzy search", "DuckDB", "open data"],
    relatedLabelId: "ffbApp",
    relatedLinks: [
      {
        id: "ranking",
        href: "https://lsbjordao-ffb-cronologia.hf.space/#/ranking",
        status: "current",
      },
      {
        id: "batch",
        href: "https://lsbjordao-ffb-cronologia.hf.space/#/lote",
        status: "current",
      },
    ],
  },
  {
    id: "curva",
    number: "07",
    image: "/images/curva-calculadora.webp",
    href: "https://lsbjordao.github.io/Calculadora-Curva/",
    category: "software",
    tags: ["JavaScript", "Canvas", "regressão", "cálculo numérico"],
    relatedLabelId: "curvaCode",
    relatedLinks: [
      {
        id: "curvaRepo",
        href: "https://github.com/lsbjordao/Calculadora-Curva",
        status: "current",
      },
    ],
  },
  {
    id: "quartoWriting",
    number: "08",
    image: "/images/quarto-writing.webp",
    href: "https://github.com/lsbjordao/quarto-scientific-writing",
    category: "openScience",
    tags: ["Quarto", "JavaScript", "UX", "open source"],
    fit: "contain",
  },
  {
    id: "quartoFocus",
    number: "09",
    image: "/images/quarto-focus.webp",
    href: "https://github.com/lsbjordao/quarto-focus-mode",
    category: "openScience",
    tags: ["Quarto", "interaction design", "JavaScript"],
    fit: "contain",
  },
  {
    id: "quartoConditional",
    number: "10",
    image: "/images/quarto-conditional-vars.webp",
    href: "https://lsbjordao.github.io/quarto-conditional-vars/",
    category: "openScience",
    tags: ["Quarto", "Lua", "YAML", "open source"],
    fit: "contain",
  },
  {
    id: "quartoCiteThis",
    number: "11",
    image: "/images/quarto-cite-this.webp",
    href: "https://lsbjordao.github.io/quarto-cite-this/",
    category: "openScience",
    tags: ["Quarto", "Lua", "CSL", "BibTeX"],
    fit: "contain",
  },
];

export const lulcHabitatShowcase = {
  screens: [
    {
      id: "auth",
      image: "/images/lulc-habitat-auth.webp",
      devMode: false,
    },
    {
      id: "dashboard",
      image: "/images/lulc-habitat-1.webp",
      devMode: true,
    },
    {
      id: "annotation",
      image: "/images/lulc-habitat-2.webp",
      devMode: true,
    },
  ],
} as const;

export type SystemId = "tracking" | "bull" | "avalia" | "legacy";

export const cncSystems: Array<{
  id: SystemId;
  number: string;
  image: string;
  altImage?: string;
  /** Slides adicionais exibidos depois da imagem principal. */
  gallery?: string[];
  tags: string[];
}> = [
  {
    id: "tracking",
    number: "01",
    image: "/images/coac-app.webp",
    altImage: "/images/coac-sheets.webp",
    tags: ["workflow", "Apps Script", "Google APIs", "messaging"],
  },
  {
    id: "bull",
    number: "02",
    image: "/images/bull-proflora.webp",
    gallery: ["/images/bull-proflora2.webp"],
    tags: ["BullMQ", "Redis", "ETL", "APIs", "logs"],
  },
  {
    id: "avalia",
    number: "03",
    image: "/images/avalia-cncflora.webp",
    gallery: [
      "/images/avalia-cncflora2.webp",
      "/images/avalia-cncflora3.webp",
      "/images/avalia-cncflora4.webp",
      "/images/avalia-cncflora5.webp",
    ],
    tags: [
      "Next.js",
      "NestJS",
      "GraphQL",
      "PostGIS",
      "GitLab CI/CD",
      "MapBiomas",
      "IUCN",
    ],
  },
  {
    id: "legacy",
    number: "04",
    image: "/images/apache-airflow.svg",
    tags: ["Apache Airflow", "dbt", "ETL", "data migration", "ProFlora"],
  },
];

export const googlePatents = {
  verifiedAt: { pt: "29 JUL 2026", en: "29 JUL 2026" },
  scholarRecord: "https://patents.google.com/scholar/4981648392507436705",
  mentions: [
    {
      publication: "CN107861721A",
      publicationDate: { pt: "30 MAR 2018", en: "30 MAR 2018" },
      status: "current" as const,
      href: "https://patents.google.com/patent/CN107861721A/en",
    },
    {
      publication: "US20260127206A1",
      publicationDate: { pt: "07 MAI 2026", en: "07 MAY 2026" },
      status: "current" as const,
      href: "https://patents.google.com/patent/US20260127206A1/en",
    },
  ],
};

export type TechnologyGroupId =
  | "languages"
  | "dataPipelines"
  | "knowledge"
  | "infrastructure"
  | "publishing";

export const technologyGroups: Array<{
  id: TechnologyGroupId;
  items: Array<{ name: string; icon?: string; mark?: string; monochrome?: boolean }>;
}> = [
  {
    id: "languages",
    items: [
      { name: "JavaScript", icon: "/images/tech/javascript.svg" },
      { name: "TypeScript", icon: "/images/tech/typescript.svg" },
      { name: "Python", icon: "/images/tech/python.svg" },
      { name: "R", icon: "/images/tech/r.svg" },
      { name: "Node.js", icon: "/images/tech/nodejs.svg" },
      { name: "React", icon: "/images/tech/react.svg" },
      { name: "React Native", icon: "/images/tech/reactnative.svg" },
      { name: "Expo", icon: "/images/tech/expo.svg", monochrome: true },
      { name: "Svelte", icon: "/images/tech/svelte.svg" },
      { name: "Next.js", icon: "/images/tech/nextdotjs.svg", monochrome: true },
      { name: "Nextra", icon: "/images/tech/nextra.svg", monochrome: true },
      { name: "Vite", icon: "/images/tech/vite.svg" },
      { name: "GraphQL", icon: "/images/tech/graphql.svg", monochrome: true },
      { name: "Astro", icon: "/images/tech/astro.svg", monochrome: true },
      { name: "Three.js", icon: "/images/tech/threedotjs.svg", monochrome: true },
      { name: "GSAP", icon: "/images/tech/greensock.svg", monochrome: true },
      { name: "WebGL", icon: "/images/tech/webgl.svg", monochrome: true },
      { name: "RegEx", mark: ".*" },
    ],
  },
  {
    id: "dataPipelines",
    items: [
      { name: "dbt", icon: "/images/tech/dbt.svg", monochrome: true },
      { name: "MongoDB", icon: "/images/tech/mongodb.svg" },
      { name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
      { name: "Apache Parquet", icon: "/images/tech/apacheparquet.svg" },
      { name: "DuckDB", icon: "/images/tech/duckdb.svg", monochrome: true },
      { name: "Trino", icon: "/images/tech/trino.svg", monochrome: true },
      { name: "Redis", icon: "/images/tech/redis.svg" },
      {
        name: "Apache Superset",
        icon: "/images/tech/apachesuperset.svg",
        monochrome: true,
      },
      { name: "Apache Airflow", icon: "/images/tech/apacheairflow.svg" },
      { name: "Apache Kafka", icon: "/images/tech/apachekafka.svg", monochrome: true },
      { name: "RabbitMQ", icon: "/images/tech/rabbitmq.svg", monochrome: true },
      { name: "NumPy", icon: "/images/tech/numpy.svg" },
      { name: "Pandas", icon: "/images/tech/pandas.svg" },
      { name: "Jupyter", icon: "/images/tech/jupyter.svg" },
      {
        name: "Google Earth Engine",
        icon: "/images/tech/googleearthengine.svg",
        monochrome: true,
      },
    ],
  },
  {
    id: "knowledge",
    items: [
      { name: "Protégé", icon: "/images/tech/protege.svg", monochrome: true },
      {
        name: "Apache Jena Fuseki",
        icon: "/images/tech/apachejena.svg",
        monochrome: true,
      },
      { name: "Neo4j", icon: "/images/tech/neo4j.svg", monochrome: true },
      { name: "Obsidian", icon: "/images/tech/obsidian.svg", monochrome: true },
      { name: "OWL / RDF / SPARQL", mark: "◎" },
    ],
  },
  {
    id: "infrastructure",
    items: [
      { name: "Linux", icon: "/images/tech/linux.svg" },
      { name: "Debian", icon: "/images/tech/debian.svg" },
      { name: "Fedora", icon: "/images/tech/fedora.svg" },
      { name: "Docker", icon: "/images/tech/docker.svg" },
      { name: "Git", icon: "/images/tech/git.svg" },
      { name: "Backstage", icon: "/images/tech/backstage.svg", monochrome: true },
      { name: "Google Cloud", icon: "/images/tech/googlecloud.svg", monochrome: true },
      { name: "AWS", icon: "/images/tech/amazonwebservices.svg", monochrome: true },
      { name: "Azure", icon: "/images/tech/microsoftazure.svg", monochrome: true },
      { name: "Supabase Auth", icon: "/images/tech/supabase.svg" },
      { name: "JWT", icon: "/images/tech/jsonwebtokens.svg", monochrome: true },
      { name: "Resend", icon: "/images/tech/resend.svg", monochrome: true },
      { name: "SMTP", icon: "/images/tech/smtp.svg", monochrome: true },
    ],
  },
  {
    id: "publishing",
    items: [
      /* O SVG do LaTeX é preto sólido: sem `monochrome` ele some contra o fundo
         escuro desta seção. O invert(1) o devolve em branco. */
      { name: "LaTeX", icon: "/images/tech/latex.svg", monochrome: true },
      { name: "Quarto", icon: "/images/tech/quarto.svg", monochrome: true },
      { name: "Sphinx", icon: "/images/tech/sphinx.svg", monochrome: true },
      { name: "Sphinx-Needs", icon: "/images/tech/sphinx.svg", monochrome: true },
      { name: "Reveal.js", icon: "/images/tech/revealdotjs.svg", monochrome: true },
      { name: "CRISP-DM", mark: "◇" },
      { name: "KDD", mark: "K" },
      { name: "Scrum", icon: "/images/tech/scrumalliance.svg", monochrome: true },
      { name: "Agile", mark: "↗" },
      { name: "GIMP", icon: "/images/tech/gimp.svg", monochrome: true },
    ],
  },
];

export const technologyCount = technologyGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);

/**
 * Competências agrupadas por domínio. As ferramentas acima dizem *com o quê* eu
 * trabalho; estes grupos dizem *o que eu sei fazer* — que é o que uma vaga
 * costuma perguntar. Os textos ficam em `data/copy`, indexados por `id`.
 */
export type SkillGroupId =
  | "dataEngineering"
  | "fullstack"
  | "extraction"
  | "modelling"
  | "platform"
  | "geo"
  | "analysis"
  | "product";

/** Oito grupos, em duas fileiras de quatro. Os códigos rimam com os das
    trilhas da chave de determinação — é o mesmo repertório, destrinchado. */
export const skillGroups: Array<{ id: SkillGroupId; code: string }> = [
  { id: "dataEngineering", code: "ENG–DAT" },
  { id: "fullstack", code: "ENG–APP" },
  { id: "extraction", code: "EXT–INT" },
  { id: "modelling", code: "MOD–SEM" },
  { id: "platform", code: "PLT–OPS" },
  { id: "geo", code: "GEO–CON" },
  { id: "analysis", code: "ANA–DEC" },
  { id: "product", code: "SOL–ENG" },
];

export type PackageId =
  | "tts"
  | "iucnValidator"
  | "genbank"
  | "ffb"
  | "ibge"
  | "mapbiomasAlerta";

/** Pacotes publicados no npm sob o escopo `@lsbjordao`. */
export const npmPackages: Array<{
  id: PackageId;
  name: string;
  version: string;
  href: string;
}> = [
  {
    id: "tts",
    name: "@lsbjordao/type-taxon-script",
    version: "1.1.19",
    href: "https://www.npmjs.com/package/@lsbjordao/type-taxon-script",
  },
  {
    id: "iucnValidator",
    name: "@lsbjordao/iucn-red-list-criteria-validator.js",
    version: "0.1.0",
    href: "https://www.npmjs.com/package/@lsbjordao/iucn-red-list-criteria-validator.js",
  },
  {
    id: "genbank",
    name: "@lsbjordao/genbank-js",
    version: "1.0.2",
    href: "https://www.npmjs.com/package/@lsbjordao/genbank-js",
  },
  {
    id: "ffb",
    name: "@lsbjordao/ffb-js",
    version: "0.0.13",
    href: "https://www.npmjs.com/package/@lsbjordao/ffb-js",
  },
  {
    id: "ibge",
    name: "@lsbjordao/ibge-js",
    version: "0.0.10",
    href: "https://www.npmjs.com/package/@lsbjordao/ibge-js",
  },
  {
    id: "mapbiomasAlerta",
    name: "@lsbjordao/mapbiomas-alerta.js",
    version: "0.0.8",
    href: "https://www.npmjs.com/package/@lsbjordao/mapbiomas-alerta.js",
  },
];

/** Gavetas abertas a partir dos números grandes do topo da página. */
export type StatDrawerId =
  | "packages"
  | "firstAuthor"
  | "coAuthor"
  | "examBoards"
  | "supervision"
  | "peerReview";

export type Stat = { value: string; label: string; drawer?: StatDrawerId };

export type TeachingRoleId =
  | "cncflora"
  | "ufms"
  | "enbtGuest"
  | "enbtPhylo"
  | "bioforense"
  | "hortoEscola"
  | "seeduc"
  | "laranjeiras"
  | "usu";

/**
 * Docência, do ensino fundamental à pós-graduação. `kind` separa o que é
 * disciplina/curso do que é vínculo de professor — a estante de apostilas
 * logo abaixo já mostra o material produzido para várias delas.
 */
export const teachingRoles: Array<{
  id: TeachingRoleId;
  years: string;
  kind: "course" | "position";
  /** Carga horária registrada no Lattes, quando há. */
  hours?: string;
}> = [
  { id: "cncflora", years: "2026", kind: "course" },
  { id: "ufms", years: "2025", kind: "course", hours: "30h" },
  { id: "enbtGuest", years: "2023", kind: "course", hours: "4h" },
  { id: "enbtPhylo", years: "2022", kind: "course", hours: "60h" },
  { id: "bioforense", years: "2019", kind: "course" },
  { id: "hortoEscola", years: "2014—15", kind: "position" },
  { id: "seeduc", years: "2013—16", kind: "position" },
  { id: "laranjeiras", years: "2010—12", kind: "position" },
  { id: "usu", years: "2007", kind: "course", hours: "60h" },
];

export type ExperienceChapterId = "field" | "lab" | "herbaria" | "communication";

export type ExperiencePhotoId =
  | "field-canopy"
  | "field-search"
  | "field-cerrado"
  | "field-railway"
  | "field-collecting"
  | "field-specimen"
  | "field-landscape"
  | "field-team"
  | "field-tree"
  | "field-measure"
  | "field-forest"
  | "cenargen-bench"
  | "cenargen-lab"
  | "masters-herbarium"
  | "nybg-digitization"
  | "ilc8-talk"
  | "ilc8-talk-wide"
  | "cnb74-talk"
  | "cnb74-lulc"
  | "cncflora-training";

/**
 * Arquivo visual da trajetória científica. As imagens publicadas aqui são
 * derivações WebP leves; os registros originais continuam preservados em
 * `public/images/photos`.
 */
export const experiencePhotos: Array<{
  id: ExperiencePhotoId;
  chapter: ExperienceChapterId;
  image: string;
  fit?: "contain";
  zoom?: "medium";
  position?: string;
}> = [
  {
    id: "field-canopy",
    chapter: "field",
    image: "/images/photos/portfolio/field-canopy.webp",
    fit: "contain",
    zoom: "medium",
  },
  {
    id: "field-search",
    chapter: "field",
    image: "/images/photos/portfolio/field-search.webp",
    position: "48% center",
  },
  {
    id: "field-cerrado",
    chapter: "field",
    image: "/images/photos/portfolio/field-cerrado.webp",
    position: "68% center",
  },
  {
    id: "field-railway",
    chapter: "field",
    image: "/images/photos/portfolio/field-railway.webp",
    fit: "contain",
    zoom: "medium",
  },
  {
    id: "field-collecting",
    chapter: "field",
    image: "/images/photos/portfolio/field-collecting.webp",
    position: "55% center",
  },
  {
    id: "field-specimen",
    chapter: "field",
    image: "/images/photos/portfolio/field-specimen.webp",
    position: "50% center",
  },
  {
    id: "field-landscape",
    chapter: "field",
    image: "/images/photos/portfolio/field-landscape.webp",
    position: "48% center",
  },
  {
    id: "field-team",
    chapter: "field",
    image: "/images/photos/portfolio/field-team.webp",
    position: "48% center",
  },
  {
    id: "field-tree",
    chapter: "field",
    image: "/images/photos/portfolio/field-tree.webp",
    position: "52% center",
  },
  {
    id: "field-measure",
    chapter: "field",
    image: "/images/photos/portfolio/field-measure.webp",
    position: "46% center",
  },
  {
    id: "field-forest",
    chapter: "field",
    image: "/images/photos/portfolio/field-forest.webp",
    position: "35% center",
  },
  {
    id: "cenargen-bench",
    chapter: "lab",
    image: "/images/photos/portfolio/cenargen-bench.webp",
    fit: "contain",
  },
  {
    id: "cenargen-lab",
    chapter: "lab",
    image: "/images/photos/portfolio/cenargen-lab.webp",
    fit: "contain",
  },
  {
    id: "masters-herbarium",
    chapter: "herbaria",
    image: "/images/photos/portfolio/masters-herbarium.webp",
    position: "center",
  },
  {
    id: "nybg-digitization",
    chapter: "herbaria",
    image: "/images/photos/portfolio/nybg-digitization.webp",
    fit: "contain",
  },
  {
    id: "ilc8-talk",
    chapter: "communication",
    image: "/images/photos/portfolio/ilc8-talk-2023.webp",
    fit: "contain",
  },
  {
    id: "ilc8-talk-wide",
    chapter: "communication",
    image: "/images/photos/portfolio/ilc8-talk-wide-2023.webp",
    fit: "contain",
  },
  {
    id: "cnb74-talk",
    chapter: "communication",
    image: "/images/photos/portfolio/cnb74-talk-2024.webp",
    fit: "contain",
  },
  {
    id: "cnb74-lulc",
    chapter: "communication",
    image: "/images/photos/portfolio/cnb74-lulc-2024.webp",
    fit: "contain",
  },
  {
    id: "cncflora-training",
    chapter: "communication",
    image: "/images/photos/portfolio/cncflora-training-2026.webp",
    fit: "contain",
  },
];

export type CourseId =
  | "emagAuthor"
  | "emagDev"
  | "susData"
  | "itGovernance"
  | "spatialPriority"
  | "landscapeEcology"
  | "earthEngine"
  | "lawPhilosophy"
  | "economics"
  | "educationSociety"
  | "sem"
  | "environmentalBasics"
  | "astronomy"
  | "greenLeadership";

/**
 * Formação complementar declarada no Lattes. Fecha a trajetória porque conta a
 * mesma história por outro ângulo: a virada para dados e infraestrutura tem
 * lastro em curso feito, não só em projeto entregue.
 */
export const courses: Array<{ id: CourseId; year: string; hours?: string }> = [
  { id: "emagAuthor", year: "2026", hours: "20h" },
  { id: "emagDev", year: "2026", hours: "30h" },
  { id: "susData", year: "2025—26", hours: "50h" },
  { id: "itGovernance", year: "2025", hours: "20h" },
  { id: "spatialPriority", year: "2024" },
  { id: "landscapeEcology", year: "2023", hours: "15h" },
  { id: "earthEngine", year: "2022", hours: "40h" },
  { id: "lawPhilosophy", year: "2020", hours: "18h" },
  { id: "economics", year: "2020", hours: "30h" },
  { id: "educationSociety", year: "2014", hours: "40h" },
  { id: "sem", year: "2013", hours: "75h" },
  { id: "environmentalBasics", year: "2011", hours: "360h" },
  { id: "astronomy", year: "2010", hours: "8h" },
  { id: "greenLeadership", year: "2009", hours: "64h" },
];

export const courseHoursTotal = courses.reduce(
  (total, course) => total + (course.hours ? Number.parseInt(course.hours, 10) : 0),
  0,
);

export type TimelineId =
  | "start"
  | "masters"
  | "phd"
  | "cncflora"
  | "dataScience"
  | "now";

export const timeline: Array<{ id: TimelineId; year: string }> = [
  { id: "start", year: "2004" },
  { id: "masters", year: "2012—14" },
  { id: "phd", year: "2015—19" },
  { id: "cncflora", year: "2020—26" },
  { id: "dataScience", year: "2025—27" },
  { id: "now", year: "2026" },
];

export const mapbiomasAward = {
  image: "/images/mapbiomas-award.jpg",
  pdf: "https://brasil.mapbiomas.org/wp-content/uploads/sites/4/2023/08/MencaoHonrosa_CategoriaDestaqueAplicacoesEmPoliticasPublicas_LucasSBJordao.pdf",
  post: "https://lsbjordao.github.io/posts/Premio-MapBiomas/",
};

export const publicPortal = "https://cncflora.jbrj.gov.br/";

/** Os dois projetos que apresentam o mesmo currículo como interface de consulta e como grafo interativo. */
export const cvGraphLinks = {
  query: "https://lsbjordao.github.io/cv",
  graph: "https://lsbjordao.github.io/cv-graph/",
};
