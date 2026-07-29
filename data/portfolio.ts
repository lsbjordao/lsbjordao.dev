export type ProjectCategory =
  | "Conservação"
  | "Taxonomia"
  | "Software"
  | "Ciência aberta";

export type PortfolioProject = {
  title: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  category: ProjectCategory;
  tags: string[];
  href: string;
  number: string;
};

export const stats = [
  { value: "20+", label: "anos entre espécimes e sistemas" },
  { value: "6", label: "espécies novas descritas" },
  { value: "53", label: "repositórios públicos" },
  { value: "01", label: "menção honrosa MapBiomas" },
];

export const cncSystems = [
  {
    number: "01",
    title: "Orquestrar",
    name: "Bull–ProFlora",
    status: "ETL em operação",
    image: "/images/bull-proflora.webp",
    imageAlt:
      "Painel de filas do Bull-ProFlora exibindo tarefas de processamento",
    summary:
      "Projetei e implementei o ETL que conectou o ProFlora a filas assíncronas, tornando processamentos pesados controláveis, repetíveis e auditáveis.",
    contribution:
      "A camada de processamento e suas integrações foram minha entrega. A interface administrativa mostrada é o Bull Board, painel público e genérico do ecossistema Bull.",
    tags: ["BullMQ", "Redis", "ETL", "APIs", "logs"],
  },
  {
    number: "02",
    title: "Analisar",
    name: "Avalia–CNCFlora",
    status: "Aplicação interna",
    image: "/images/avalia-cncflora.webp",
    imageAlt:
      "Interface do Avalia-CNCFlora com mapas e indicadores para avaliação de espécies",
    summary:
      "Desenvolvi um ambiente para reunir dados taxonômicos, análises geoespaciais, gráficos e textos de apoio à avaliação segundo os critérios da IUCN.",
    contribution:
      "Atuei da arquitetura à interface, integrando MapBiomas, métricas de AOO e EOO, tendências de uso do solo e a redação estruturada das justificativas.",
    tags: ["Next.js", "NestJS", "PostGIS", "MapBiomas", "IUCN"],
  },
  {
    number: "03",
    title: "Coordenar",
    name: "CoAC Acompanhamento",
    status: "Protótipo não adotado",
    image: "/images/coac-app.webp",
    imageAlt:
      "Interface do protótipo CoAC Acompanhamento para gestão de avaliações",
    summary:
      "Concebi e construí uma aplicação para tornar visíveis etapas, responsáveis, pendências e progresso de centenas de avaliações em tempo real.",
    contribution:
      "A aplicação não foi implantada institucionalmente. O fluxo efetivamente usado permaneceu em uma planilha que configurei com Apps Script, APIs, mensageria e registros operacionais.",
    tags: ["workflow", "Apps Script", "Google APIs", "mensageria"],
  },
];

export const projects: PortfolioProject[] = [
  {
    number: "01",
    title: "TypeTaxonScript",
    kicker: "Taxonomia como código",
    description:
      "Framework publicado para transformar descrições biológicas em dados tipados, validáveis, versionáveis e colaborativos.",
    image: "/images/type-taxon-script.webp",
    imageAlt:
      "Documentação visual da estrutura de dados do TypeTaxonScript",
    category: "Taxonomia",
    tags: ["TypeScript", "JSON", "DDD", "open source"],
    href: "https://github.com/lsbjordao/TypeTaxonScript",
  },
  {
    number: "02",
    title: "TTS–Mimosa",
    kicker: "Conhecimento explorável",
    description:
      "Uma prova de conceito que conecta caracteres morfológicos, imagens e fontes em uma interface taxonômica navegável.",
    image: "/images/tts-mimosa.webp",
    imageAlt:
      "Aplicação TTS-Mimosa exibindo caracteres morfológicos estruturados",
    category: "Software",
    tags: ["Next.js", "MongoDB", "TypeScript"],
    href: "https://lsbjordao.github.io/TTS-Mimosa-App/",
  },
  {
    number: "03",
    title: "LULC × Leguminosae",
    kicker: "Conservação orientada por dados",
    description:
      "Séries históricas de cobertura e uso do solo convertidas em evidências quantitativas para avaliações do risco de extinção.",
    image: "/images/lulc-leguminosae.webp",
    imageAlt:
      "Gráficos de cobertura natural e uso alternativo do solo para Leguminosae",
    category: "Conservação",
    tags: ["MapBiomas", "R", "geoprocessamento", "IUCN"],
    href: "https://lsbjordao.github.io/LULC-MapBiomas-Leguminosae/",
  },
  {
    number: "04",
    title: "FFB Cronologia",
    kicker: "Mudanças taxonômicas no tempo",
    description:
      "Aplicação que compara versões da Flora e Funga do Brasil e revela a história de cada nome científico.",
    image: "/images/ffb-cronologia.webp",
    imageAlt:
      "Marca da aplicação Flora e Funga do Brasil Cronologia",
    category: "Software",
    tags: ["Python", "dados abertos", "taxonomia"],
    href: "https://lsbjordao-ffb-cronologia.hf.space/",
  },
  {
    number: "05",
    title: "Quarto Scientific Writing",
    kicker: "Escrita científica assistida",
    description:
      "Extensão com diagnósticos em tempo real de estilo, estrutura, legibilidade e consistência para manuscritos científicos.",
    image: "/images/quarto-writing.webp",
    imageAlt: "Identidade visual do projeto Quarto Scientific Writing",
    category: "Ciência aberta",
    tags: ["Quarto", "JavaScript", "UX", "open source"],
    href: "https://github.com/lsbjordao/quarto-scientific-writing",
  },
  {
    number: "06",
    title: "Quarto Focus Mode",
    kicker: "Leitura sem ruído",
    description:
      "Modo de foco, apresentação por seções, navegação por teclado e progresso inteligente para sites e livros Quarto.",
    image: "/images/quarto-focus.webp",
    imageAlt: "Identidade visual da extensão Quarto Focus Mode",
    category: "Ciência aberta",
    tags: ["Quarto", "design de interação", "JavaScript"],
    href: "https://github.com/lsbjordao/quarto-focus-mode",
  },
];

export const timeline = [
  {
    year: "2004",
    title: "O primeiro espécime",
    text: "Começo a estudar Mimosa na Escola Nacional de Botânica Tropical. O gênero se torna o fio condutor de toda a trajetória.",
  },
  {
    year: "2012—14",
    title: "Taxonomia em profundidade",
    text: "Mestrado no Museu Nacional/UFRJ: herbários, expedições, descrição morfológica e a primeira espécie nova.",
  },
  {
    year: "2015—19",
    title: "Da morfologia à filogenia",
    text: "Doutorado no JBRJ, intercâmbio no NYBG e estágio no Cenargen/EMBRAPA. DNA, biogeografia e seis loci em diálogo.",
  },
  {
    year: "2020—26",
    title: "Conservação em escala",
    text: "No CNCFlora, transformo regras, dados e rotinas de avaliação em pipelines, interfaces e fluxos operacionais.",
  },
  {
    year: "2024—",
    title: "Infraestrutura para o conhecimento",
    text: "TypeTaxonScript, aplicações abertas e uma agenda de pesquisa onde botânica e engenharia de software são uma só prática.",
  },
];

export const posts = [
  {
    date: "14 JUL 2026",
    title: "Flora e Funga do Brasil — Cronologia",
    category: "Produto digital",
    href: "https://lsbjordao.github.io/posts/FFB-cronologia/",
  },
  {
    date: "15 JUN 2026",
    title: "Improving Scientific Writing in Quarto with Real-Time Feedback",
    category: "Open source",
    href: "https://lsbjordao.github.io/posts/Quarto-scientific-writing/",
  },
  {
    date: "14 MAR 2024",
    title:
      "TypeTaxonScript: enhancing data structures in biological systematics",
    category: "Artigo científico",
    href: "https://doi.org/10.1093/biomethods/bpae017",
  },
  {
    date: "01 AGO 2022",
    title: "MapBiomas e a avaliação do risco de extinção da flora brasileira",
    category: "Política pública",
    href: "https://lsbjordao.github.io/posts/Premio-MapBiomas/",
  },
];
