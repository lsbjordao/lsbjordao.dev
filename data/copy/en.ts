import type { Copy } from "./pt";

export const en: Copy = {
  meta: {
    locale: "en-US",
    htmlLang: "en",
    title:
      "Lucas S.B. Jordão — Data engineering, full stack and geospatial for biodiversity",
    description:
      "PhD and MSc in Botany. Six years building the infrastructure behind Brazil's plant extinction-risk assessments: Airflow and dbt pipelines, Next.js/NestJS applications with REST and GraphQL APIs, and geospatial analysis with PostGIS and MapBiomas. Available for new roles.",
    ogTitle: "Lucas S.B. Jordão — Botany at systems scale",
    ogDescription:
      "PhD in Botany and engineer. Pipelines, applications and geospatial analysis for biodiversity and conservation.",
    jobTitle: "Data engineer and full stack developer for biodiversity",
    switchTo: "View in Portuguese",
    switchLabel: "Language",
  },

  a11y: {
    skipToContent: "Skip to content",
    brand: "LJ — Lucas Jordão, home",
    mainNav: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    heroImage: "Mimosa osmarii, a species described by Lucas S.B. Jordão et al.",
    statsRegion: "Career highlights",
    filterProjects: "Filter projects",
    filterStatus: (count: number, filter: string) =>
      `${count} project${count === 1 ? "" : "s"} in ${filter}`,
    technologies: "Technologies and skills",
    techList: "Technologies and methods used",
    keyRegion: "Professional determination key",
    relatedLinks: (title: string) => `Links related to the ${title} project`,
    switchView: "Switch the Tracking Panel view",
    workflowArchitecture: "Architecture of the work",
  },

  nav: {
    contratar: "Skills",
    cncflora: "Flora Conservation",
    projetos: "Projects",
    aulas: "Courses",
    trajetoria: "Career",
    notas: "Writing",
    blog: "Blog",
    mobileLocation: "Rio de Janeiro · Brazil",
    mobileAvailability: "Available for new roles",
    status: "Available for new roles",
    statusHref: "#contato",
    brandTagline: "Data science and engineering · Full stack · Botany",
  },

  hero: {
    eyebrow: "Data engineering · Full stack · Geospatial · Data science · Botany",
    headline: { line1: "Botany", line2: "at the scale of", line3: "systems." },
    intro:
      "I'm Lucas S.B. Jordão, MSc and PhD in Botany. I spent twenty years learning how knowledge about plants is produced, and six building the infrastructure that turns it into decisions — pipelines, applications and geospatial analysis for Brazil's plant extinction-risk assessments.",
    primaryCta: "Get in touch",
    secondaryCta: "Find my profile in the key",
    availability: {
      label: "Status",
      value: "Available for new roles",
      modalityLabel: "Setup",
      modality: "Remote, hybrid or Rio de Janeiro",
      startLabel: "Availability",
      start: "Immediate start",
    },
    specimen: {
      kicker: "NEW SPECIES / TAXONOMY",
      name: "Mimosa osmarii",
      credit: "described by L.Jordão et al.",
      action: "Read the species description",
    },
    coordinate: { line1: "MIMOSA", line2: "TAXONOMIC DESCRIPTION" },
    imageAlt: "Branch of Mimosa osmarii with leaves and a pink inflorescence",
    footer: {
      location: "Rio de Janeiro · Brazil",
      scroll: "Scroll to explore",
      since: "Since 2004",
    },
  },

  stats: [
    { value: "06", label: "years shipping production systems" },
    { value: "03", label: "institutional systems in operation" },
    { value: "53", label: "public repositories" },
    { value: "06", label: "packages published on npm", drawer: "packages" },
    { value: "588", label: "assessments published on the IUCN Red List" },
    { value: "06", label: "new species described" },
    { value: "08", label: "published papers as first author", drawer: "firstAuthor" },
    { value: "06", label: "published papers as co-author", drawer: "coAuthor" },
    { value: "01", label: "published book chapter" },
    { value: "08", label: "examination boards served on", drawer: "examBoards" },
    {
      value: "01",
      label: "undergraduate thesis supervised",
      drawer: "supervision",
    },
    { value: "07", label: "scientific journals peer-reviewed", drawer: "peerReview" },
  ],

  drawers: {
    open: "See the list",
    close: "Close the list",
    hint: "click or hover",
    forthcoming: "In press",
    packages: {
      title: "Packages published on npm",
      note: "@lsbjordao scope · installable with npm i",
    },
    firstAuthor: {
      title: "Papers as first author",
      note: "Reverse chronological order · source: Lattes CV",
    },
    coAuthor: {
      title: "Papers as co-author",
      note: "Reverse chronological order · source: Lattes CV",
    },
    examBoards: {
      title: "Examination boards",
      note: "Works examined · candidate names stay on the Lattes CV",
    },
    supervision: {
      title: "Completed supervision",
      note: "Undergraduate final thesis",
    },
    peerReview: {
      title: "Ad hoc peer review",
      note: "Journals I have reviewed for",
    },
    levels: {
      phd: "PhD qualifying exam",
      msc: "MSc qualifying exam",
      undergraduate: "Undergraduate thesis",
    },
  },

  packages: {
    tts: "A framework that turns biological descriptions into typed, validatable data.",
    iucnValidator:
      "Validates, reconciles and normalises IUCN Red List criteria declarations (A–E) against the evidence supplied, with multilingual reports.",
    genbank: "An NCBI GenBank E-utilities client for Node.js.",
    ffb: "Flora and Funga of Brazil SDK: families, genera, species and taxa.",
    ibge: "A client for the IBGE localities APIs, from states down to subdistricts.",
    mapbiomasAlerta: "Programmatic access to MapBiomas Alerta deforestation alerts.",
  },

  manifesto: {
    index: "00 / POINT OF VIEW",
    lead: "Biodiversity does not fit in a spreadsheet.",
    statement: {
      before: "It needs systems that understand ",
      emphasis: "names, places, evidence and time",
      after: " — and turn them into decisions that can be explained.",
    },
    aside:
      "My practice cuts across herbaria, code and public policy. I don't translate science into technology: I design both together.",
  },

  key: {
    index: "01 / DETERMINATION KEY",
    eyebrow: "Where I fit in your team",
    heading: { before: "Four profiles,", emphasis: "one person." },
    intro:
      "A taxonomist identifies an unknown specimen by working through a dichotomous key: pairs of alternatives that narrow down to a name. This profile is deliberately broad. Work through the key to reach the part of it that solves your problem.",
    startLabel: "Start here",
    restart: "Restart the key",
    emptyHint: "Choose 1a or 1b to determine",
    resultLabel: "Determination",
    stackLabel: "Stack",
    evidenceLabel: "Evidence on this page",
    hireLabel: "Talk to me about this role",
    seeAll: "See all four tracks",
    couplets: {
      "1": {
        question: "The knowledge you need…",
        leads: [
          {
            text: "…already exists as data, but never reaches the people deciding.",
            hint: "scattered databases, spreadsheets, systems that don't talk",
          },
          {
            text: "…doesn't exist as data yet: it lives in prose, on paper, or in experts' heads.",
            hint: "descriptions, reports, literature, tacit knowledge",
          },
        ],
      },
      "2": {
        question: "And the bottleneck is…",
        leads: [
          {
            text: "…volume: heavy processes that must run on their own, repeatably and auditably.",
            hint: "thousands of records, nightly jobs, traceability",
          },
          {
            text: "…the screen: people need to see, compare and record the decision.",
            hint: "internal interfaces, dashboards, workflow",
          },
        ],
      },
      "3": {
        question: "And what's missing is…",
        leads: [
          {
            text: "…where: distribution, habitat loss and trends over time.",
            hint: "time series, remote sensing, spatial indicators",
          },
          {
            text: "…what: characters, names, provenance and the evidence behind each claim.",
            hint: "domain modelling, vocabularies, FAIR data",
          },
        ],
      },
    },
    tracks: {
      data: {
        name: "Data engineering",
        tagline: "Pipelines that run without you watching.",
        body: "I designed and implemented the ETL that connected ProFlora to asynchronous queues, and led the full migration of CNCFlora's legacy holdings — orchestrating extraction and loading with Apache Airflow and modelling the transformations with dbt. Processing that used to be manual became repeatable, observable and auditable.",
        evidence: [
          { label: "Bull–ProFlora ETL, in operation", href: "#cncflora" },
          { label: "Legacy migration with Airflow + dbt", href: "#cncflora" },
        ],
      },
      fullstack: {
        name: "Full stack development",
        tagline: "The application where the decision happens.",
        body: "I worked from architecture to interface on Avalia–CNCFlora, the internal environment that brings together taxonomic data, geospatial analysis, charts and the structured writing of assessment rationales. Next.js and NestJS over PostgreSQL/PostGIS, exposing the data through REST and GraphQL APIs, with MapBiomas integration and GitLab CI/CD.",
        evidence: [
          { label: "Avalia–CNCFlora, internal application", href: "#cncflora" },
          { label: "TTS–Mimosa App, public proof of concept", href: "#projetos" },
        ],
      },
      geo: {
        name: "Geospatial & conservation",
        tagline: "Measuring where the loss is happening.",
        body: "I built geospatial processing routines and land-use/land-cover analyses that made IUCN Red List criterion B parameters more objective and reproducible: regression over MapBiomas time series to estimate continuing decline in AOO, EOO and habitat, plus a variable-buffer method to semi-automate counting locations.",
        evidence: [
          { label: "MapBiomas Award, honourable mention", href: "#mapbiomas" },
          { label: "LULC × Leguminosae, public analysis", href: "#projetos" },
        ],
      },
      research: {
        name: "Computational taxonomy",
        tagline: "Descriptions become typed data.",
        body: "I conceived and published TypeTaxonScript, a framework that represents morphological characters as typed, validatable, versionable data. It is the bridge between domain modelling and scientific knowledge — and the basis of a research agenda where botany and software engineering are a single practice.",
        evidence: [
          { label: "TypeTaxonScript, Biology Methods and Protocols", href: "#projetos" },
          { label: "Publications and technical notes", href: "#notas" },
        ],
      },
    },
  },

  research: {
    index: "FEATURED PUBLICATION / 2020",
    eyebrow: "Taxonomy · Comparative morphology",
    heading: { line1: "A shared language", emphasis: "for trichomes." },
    lead: "Before morphology could be structured as data, the language used to describe form had to be organised first.",
    body: {
      before: "In ",
      cite: "Trichomes in Mimosa",
      after:
        ", together with Marli Pires Morim and José Fernando A. Baumgratz, I proposed a characterisation of the genus's trichomes and a standardised terminology to make their taxonomic use more consistent and comparable.",
    },
    citation: { journal: "FLORA · VOLUME 272", article: "ARTICLE 151702" },
    cta: "Read the paper",
    imageAlt:
      "Comparative plate showing different trichome types in the genus Mimosa",
    plate: {
      title: "MORPHOLOGICAL PLATE / MIMOSA",
      subtitle: "diversity of forms and terms",
    },
  },

  case: {
    index: "02 / CASE STUDY",
    eyebrow: "CNCFlora · 2020—2026",
    heading: { line1: "Infrastructure for", line2: "", emphasis: "assessing a flora." },
    abstract:
      "Assessing extinction risk means coordinating fragmented evidence, spatial analysis and a lot of people. At CNCFlora/JBRJ I turned that process into an architecture of data, queues and interfaces. I gathered and documented the requirements with Sphinx-Needs, keeping traceability between need and implementation, and built the team's service catalog in Backstage.",
    scope: {
      label: "My scope",
      value:
        "Architecture · requirements engineering · full stack development · ETL · automation · geoprocessing · CI/CD · service catalog · observability",
    },
    map: {
      label: "Architecture of the work",
      sublabel: "from raw data to decision",
      nodes: [
        {
          kicker: "COORDINATE",
          name: "Workflow",
          detail: "stages · roles · audit trail",
        },
        {
          kicker: "PROCESS",
          name: "Bull–ProFlora",
          detail: "ETL · queues · logs",
        },
        {
          kicker: "INTERPRET",
          name: "Avalia–CNCFlora",
          detail: "maps · metrics · text",
        },
        {
          kicker: "PUBLISH",
          name: "Open data and new methods",
          detail: "web pages · applicability · scientific papers",
        },
      ],
    },
    contributionLabel: "My contribution",
    publicPortalCta: "Explore the public data",
    viewSwitch: { app: "Application", operation: "Real operation" },
    gallery: {
      label: (name: string) => `${name} images`,
      previous: "Previous image",
      next: "Next image",
      goTo: (current: number, total: number) => `Show image ${current} of ${total}`,
    },
    systems: {
      tracking: {
        role: "Coordinate",
        name: "Tracking Panel",
        status: "Prototype not adopted",
        operationStatus: "Spreadsheet operation",
        summary:
          "I designed and built an application to make stages, owners, blockers and progress visible across hundreds of assessments in real time.",
        contribution:
          "The application was never rolled out institutionally. The workflow actually used stayed in a spreadsheet I configured with Apps Script, APIs, messaging and operational logs — and which carried the operation through to the end of the period.",
        imageAlt:
          "Interface of the Tracking Panel prototype for managing assessments",
        altImageAlt:
          "Collaborative spreadsheet used to track the assessment workflow",
      },
      bull: {
        role: "Orchestrate",
        name: "Bull–ProFlora",
        status: "ETL in operation",
        summary:
          "I designed and implemented the ETL that connected ProFlora to asynchronous queues, making heavy processing controllable, repeatable and auditable.",
        contribution:
          "The processing layer and its integrations were my delivery. The admin interface shown is Bull Board, the generic public dashboard from the Bull ecosystem.",
        imageAlt: "Bull-ProFlora queue dashboard showing processing jobs",
        galleryImageAlts: [
          "Bull-ProFlora dashboard with an overview of processing queues",
          "Bull-ProFlora dashboard with data and progress for a MapBiomas job",
        ],
      },
      avalia: {
        role: "Analyse",
        name: "Avalia–CNCFlora",
        status: "Internal application",
        summary:
          "I built an environment that brings together taxonomic data, geospatial analysis, charts and supporting text for assessments under IUCN criteria.",
        contribution:
          "I worked from architecture to interface: modelled the data in PostgreSQL/PostGIS, built the NestJS back end exposing REST and GraphQL APIs, developed the Next.js front end, implemented CI/CD pipelines in GitLab, and integrated MapBiomas, AOO and EOO metrics, land-use trends and the structured writing of assessment rationales.",
        imageAlt:
          "Avalia-CNCFlora interface with maps and indicators for species assessment",
        galleryImageAlts: [
          "Avalia-CNCFlora interface with a map, occurrences and geospatial indicators",
          "Avalia-CNCFlora interface with a land-use and land-cover transition diagram",
          "Avalia-CNCFlora interface with a chart and estimators for extent-of-occurrence trends",
          "Avalia-CNCFlora interface with a chart of burned area by land cover and use",
          "Avalia-CNCFlora interface with the Criterion B form and assessment rationale",
        ],
      },
      legacy: {
        role: "Recover",
        name: "Legacy data rescue",
        status: "Migration completed",
        summary:
          "I planned and executed the rescue of the legacy system's data, migrating the historical holdings into the ProFlora architecture.",
        contribution:
          "I ran every stage of the migration: orchestrated extraction and loading with Apache Airflow, modelled and validated the transformations with dbt, and delivered the recovered legacy into the new database. That data now powers CNCFlora's public portal.",
        imageAlt:
          "Legacy data migration flow into ProFlora using Apache Airflow and dbt",
        diagram: {
          sourceKicker: "LEGACY SYSTEM",
          sourceName: "Historical holdings",
          orchestration: "ORCHESTRATION",
          transformation: "TRANSFORMATION",
          target: "ProFlora",
          targetNote: "recovered data",
        },
      },
    },
    award: {
      badge: "Recognition · 2022",
      edition: "4TH EDITION · MAPBIOMAS AWARD",
      honour: "HONOURABLE MENTION",
      eyebrow: "Highlight · Applications in Public Policy",
      title: "MapBiomas and extinction-risk assessment of the Brazilian flora",
      lead: "Work developed at CNCFlora/JBRJ to make extinction-risk assessment under IUCN Red List criterion B more objective, reproducible and operational.",
      methods: [
        {
          label: "01 / CONTINUING DECLINE",
          text: "Linear regression over land-use and land-cover time series to estimate increasing or decreasing trends in AOO, EOO and habitat.",
        },
        {
          label: "02 / LOCATIONS",
          text: "A variable-buffer method to cluster nearby occurrences and semi-automate the count of threat situations.",
        },
        {
          label: "03 / RATIONALE STANDARDISATION",
          text: "I proposed a structured architecture for the rationale, organising the assessment justification so it consistently meets the requirements of the criteria.",
        },
      ],
      primaryCta: "Open the full submission",
      secondaryCta: "Read the context on the blog",
      imageAlt:
        "Honourable Mention for Lucas Sá Barreto Jordão at the 4th MapBiomas Award, Applications in Public Policy category",
    },
  },

  work: {
    index: "03 / SELECTED WORK",
    heading: { line1: "Projects that keep", line2: "knowledge ", emphasis: "in circulation." },
    intro:
      "Software, data and publications built so scientific knowledge can be queried, tested and reused. Everything below is public and verifiable.",
    filters: {
      all: "All",
      conservation: "Conservation",
      taxonomy: "Taxonomy",
      software: "Software",
      openScience: "Open science",
    },
    openProject: "Open project",
    projects: {
      tts: {
        title: "TypeTaxonScript",
        kicker: "Taxonomy as code",
        description:
          "A published framework that turns biological descriptions into typed, validatable, versionable and collaborative data — with its own scholar record on Google Patents.",
        imageAlt: "Visual documentation of the TypeTaxonScript data structure",
      },
      ttsMimosa: {
        title: "TTS–Mimosa",
        kicker: "Explorable knowledge",
        description:
          "A proof of concept connecting morphological characters, images and sources in a navigable taxonomic interface.",
        imageAlt: "TTS-Mimosa application showing structured morphological characters",
      },
      ttsMimosaDocs: {
        title: "TTS–Mimosa Docs",
        kicker: "Taxonomic characters as software",
        description:
          "Typed documentation of Mimosa characters, organised into navigable modules and maintained with software engineering tooling.",
        imageAlt: "TTS-Mimosa documentation showing taxonomic character modules",
      },
      lulc: {
        title: "LULC × Leguminosae",
        kicker: "Data-driven conservation",
        description:
          "Land-cover and land-use time series converted into quantitative evidence for extinction-risk assessments.",
        imageAlt:
          "Charts of natural cover and alternative land use for Leguminosae",
      },
      ffb: {
        title: "FFB Chronology",
        kicker: "History, ranking and accepted names",
        description:
          "A general-purpose application that compares 394 versions of the Flora e Funga do Brasil, surfaces taxonomic changes, builds filterable rankings and resolves accepted names in batch with fuzzy search.",
        imageAlt: "Per-version ranking in the Flora e Funga do Brasil Chronology app",
      },
      curva: {
        title: "Curva",
        kicker: "Mathematics in the browser",
        description:
          "A graphing calculator written from scratch, with no maths library at all: its own expression parser, step-by-step symbolic differentiation, numerical integration and limits, curve fitting with residuals and SSE, statistics and analytic geometry. It grew out of my Data Science degree.",
        imageAlt:
          "Curva graphing calculator showing compound waves, their derivatives and the maths keypad",
      },
      quartoWriting: {
        title: "Quarto Scientific Writing",
        kicker: "Assisted scientific writing",
        description:
          "An extension with real-time diagnostics for style, structure, readability and consistency in scientific manuscripts.",
        imageAlt: "Visual identity of the Quarto Scientific Writing project",
      },
      quartoFocus: {
        title: "Quarto Focus Mode",
        kicker: "Reading without noise",
        description:
          "Focus mode, section-by-section presentation, keyboard navigation and smart progress for Quarto sites and books.",
        imageAlt: "Visual identity of the Quarto Focus Mode extension",
      },
      quartoConditional: {
        title: "Quarto Conditional Vars",
        kicker: "One document, many versions",
        description:
          "An extension that renders conditional content from project variables, with composable rules and compatibility across Quarto engines.",
        imageAlt: "Visual identity of the Quarto Conditional Vars extension",
      },
      quartoCiteThis: {
        title: "Quarto cite-this",
        kicker: "How to cite, in one click",
        description:
          "An extension that adds an accessible \"how to cite\" control to Quarto books and websites, copying the citation as CSL-formatted text or BibTeX. Citations are built at render time, with no browser library, and work with embedded resources or with JavaScript off.",
        imageAlt: "Visual identity of the Quarto cite-this extension",
      },
    },
    relatedLinkLabels: {
      scholar: "Scholar record",
      CN107861721A: "CN107861721A",
      US20260127206A1: "US20260127206A1",
      ranking: "Ranking",
      batch: "Batch name lookup",
      curvaRepo: "Source on GitHub",
    },
    relatedLabels: {
      patents: "Google Patents",
      ffbApp: "Explore the app",
      curvaCode: "Open source",
    },
  },

  patents: {
    meta: "REC–01 / INTERDISCIPLINARY INFRASTRUCTURE",
    verified: "VERIFIED",
    eyebrow: "Google Patents",
    heading: {
      before: "TypeTaxonScript on the semantic map of ",
      emphasis: "software engineering.",
    },
    summary: {
      before: "The paper has its own scholar record and was linked by the automated ",
      italic: "Similar Documents",
      after:
        " section to three patent documents I was able to verify — two currently listed and one preserved in the search index.",
    },
    cta: "Open the scholar record",
    detailsLabel: "See the verified listing",
    detailsNote: "This is not a patent, nor a prior-art citation",
    statusLabels: { current: "Current", historical: "Search index" },
    mentionTitles: {
      CN107861721A:
        "Reverse graphical intelligence programming method and apparatus, equipment and storage medium",
      US20260127206A1:
        "Application generation system based on ingested documents using integrated programmatic and specialized guided and constrained artificial intelligence",
    },
    mentionNotes: {
      CN107861721A: "TypeTaxonScript currently appears under Similar Documents.",
      US20260127206A1: "TypeTaxonScript currently appears under Similar Documents.",
    },
  },

  teaching: {
    index: "04 / TEACHING",

    practice: {
      eyebrow: "Teaching · from primary school to graduate courses",
      heading: { line1: "Teaching is the oldest", emphasis: "part of my practice." },
      intro:
        "I started as a mycology teaching assistant in 2007 and never stopped. I taught science in primary school and environmental education at a teaching nursery, and today I run graduate courses and staff training on phyloinformatics, environmental law and extinction risk assessment. It is the same practice as the rest of this page: making methods and evidence usable by other people.",
      countLabel: "selected classes, courses and modules",
      listNote: {
        text: "A selection, not the full record — the complete list is on the",
        link: "Lattes CV",
      },
      credential: {
        label: "Qualification",
        value:
          "Licentiate in Biological Sciences (2009) · BSc (2007) · Universidade Santa Úrsula",
      },
      kinds: {
        course: "Course · module",
        position: "Teaching post",
      },
      hoursLabel: "contact hours",
      roles: {
        cncflora: {
          title: "Staff training in extinction risk assessment",
          place: "CNCFlora / JBRJ · Rio de Janeiro",
        },
        ufms: {
          title:
            "Threatened Species: from public policy to extinction risk assessment",
          place: "Universidade Federal de Mato Grosso do Sul · remote",
        },
        enbtGuest: {
          title:
            "Phylogeny, biogeography and diversification of Mimosa ser. Paucifoliatae — guest lecturer on EB004, Introduction to Phylogenetic Systematics",
          place: "Escola Nacional de Botânica Tropical / JBRJ",
        },
        enbtPhylo: {
          title: "Special Topics: Introduction to Phyloinformatics (EB02935)",
          place: "Escola Nacional de Botânica Tropical / JBRJ",
        },
        bioforense: {
          title:
            "Forensic botany, general botany and law applied to flora protection — preparatory course for forensic examiners",
          place: "Curso Bioforense · Rio de Janeiro",
        },
        hortoEscola: {
          title: "Environmental education teacher",
          place: "Horto Escola Artesanal · São Pedro da Aldeia, RJ",
        },
        seeduc: {
          title: "Teacher II · basic education",
          place: "Rio de Janeiro State Department of Education",
        },
        laranjeiras: {
          title: "Science teacher · lower secondary school",
          place: "Sociedade Educacional Laranjeiras · Rio de Janeiro",
        },
        usu: {
          title: "Mycology teaching assistant",
          place: "Universidade Santa Úrsula · Rio de Janeiro",
        },
      },
    },

    eyebrow: "Open-access courses and handbooks",
    heading: { line1: "A shelf for", emphasis: "teaching in public." },
    intro:
      "Course books written in Quarto and published openly: environmental law, extinction risk assessment, public policy and phyloinformatics. Each spine is as thick as the book has chapters.",
    itemLabel: "COURSE",
    toolEyebrow: "TOOL",
    openBook: "Open handbook",
    openTool: "Open tool",
    tally: (volumes: number, chapters: number) =>
      `${String(volumes).padStart(2, "0")} volumes · ${chapters} chapters · open access`,
    items: {
      legislacaoFlora: {
        title: "Law applied to the protection of Brazilian flora and vegetation",
        volume: "23 chapters",
        topics: [
          "Atlantic Forest Biome Act",
          "Forest Act and public forest management",
          "Crimes and offences against flora",
        ],
      },
      filoinformatica: {
        title: "Introduction to Phyloinformatics",
        volume: "15 chapters",
        topics: [
          "Sequence assembly and alignment",
          "Evolution models and phylogenetic analysis",
          "Phylogenetics in R",
        ],
      },
      politicaEspecies: {
        title: "Public Policy for the Protection of Threatened Species",
        volume: "9 chapters",
        topics: [
          "PRONABIO, CONABIO and Pró-Espécies",
          "Official national lists of threatened species",
          "CNCFlora/JBRJ and CITES",
        ],
      },
      cf88: {
        title: "Brazilian Federal Constitution of 1988",
        volume: "9 titles",
        topics: [
          "Fundamental principles",
          "Organisation of the State and its Powers",
          "Economic and social order",
        ],
      },
      pnb: {
        title: "National Biodiversity Policy",
        volume: "7 components",
        topics: [
          "Biodiversity knowledge and conservation",
          "Sustainable use and benefit sharing",
          "Legal and institutional capacity",
        ],
      },
      riscoExtincao: {
        title: "Species Extinction Risk Assessment",
        volume: "6 chapters",
        topics: ["The IUCN Red List", "Data quality", "Categories and criteria"],
      },
      direitoAmbiental: {
        title: "Introduction to Environmental Law",
        volume: "5 chapters",
        topics: [
          "The Brazilian legal system",
          "Constitutional environmental law",
          "National Environment Policy",
        ],
      },
      chaveInterativa: {
        title: "Biological Identification Key",
        volume: "Interactive application",
        topics: [
          "Dichotomous key viewer",
          "Step-by-step identification mode",
          "JSON structure editor",
        ],
      },
    },
  },

  technology: {
    index: "05 / TECHNOLOGY",
    eyebrow: "From scientific writing to infrastructure",
    heading: { line1: "Technologies that run through", emphasis: "the work." },
    countLabel: "technologies & methods",
    intro:
      "A toolkit built on real problems: scientific applications, data engineering, reproducible publishing and infrastructure.",
    itemsLabel: "items",
    groups: {
      languages: "Languages & interfaces",
      dataPipelines: "Data & pipelines",
      knowledge: "Knowledge & semantics",
      infrastructure: "Infrastructure & cloud",
      publishing: "Publishing & methods",
    },
    skills: {
      eyebrow: "What I do with them",
      heading: { before: "Tools are the means.", emphasis: "Skills are the work." },
      intro:
        "The list above says what I work with. This one says what I solve — grouped by problem domain.",
      countLabel: "skills",
      groups: {
        dataEngineering: {
          title: "Data engineering",
          items: [
            "Automated ETL and ELT",
            "Pipeline orchestration",
            "Messaging and asynchronous queues",
            "Transformation modelling and testing",
            "Data-intensive applications",
            "Data contracts and versioning",
            "Legacy data migration",
          ],
        },
        fullstack: {
          title: "Full stack development",
          items: [
            "End-to-end web applications",
            "REST and GraphQL APIs with NestJS",
            "Componentisation in React and Svelte",
            "Schema modelling and migration",
            "Authentication, authorisation and audit trails",
            "Static rendering, SSR and performance",
            "Automated testing and code review",
          ],
        },
        extraction: {
          title: "Extraction & integration",
          items: [
            "Data extraction with regex",
            "Web scraping and PDF scraping",
            "Text mining",
            "REST and GraphQL APIs",
            "Integration of heterogeneous sources",
            "FAIR data and biodiversity vocabularies",
          ],
        },
        modelling: {
          title: "Modelling & databases",
          items: [
            "Relational databases and analytical SQL",
            "Document-oriented NoSQL",
            "Graph-oriented NoSQL",
            "Vector search and embeddings",
            "Ontologies, RDF and SPARQL",
            "Business domain modelling",
            "Design patterns",
          ],
        },
        platform: {
          title: "Platform & infrastructure",
          items: [
            "Microservice architecture",
            "Platform engineering",
            "CI/CD and DevOps practices",
            "IaaS and public cloud",
            "Containers and reproducible environments",
            "Git, branching flows and review",
            "Observability and service catalogue",
          ],
        },
        geo: {
          title: "Geospatial & conservation",
          items: [
            "Spatial databases and queries with PostGIS",
            "Land-cover and land-use time series",
            "Remote sensing with Google Earth Engine",
            "AOO, EOO and habitat-loss metrics",
            "IUCN Red List criteria",
            "Landscape ecology and ecological corridors",
            "Scenario modelling with CA-Markov",
          ],
        },
        analysis: {
          title: "Analysis & decision",
          items: [
            "Reproducible indicators and reporting",
            "Financial data analysis",
            "Web analytics with Google Analytics",
            "Applied statistics and regression",
            "Analytical dashboards and BI",
            "Data storytelling",
            "CRISP-DM and KDD",
          ],
        },
        product: {
          title: "Product & process",
          items: [
            "Lean Inception",
            "Product Backlog Building",
            "Scrum, Kanban and agile practices",
            "Requirements engineering and elicitation",
            "Domain storytelling",
            "Reproducible documentation and publishing",
            "Digital accessibility (eMAG and WCAG)",
          ],
        },
      },
    },
  },

  phenology: {
    index: "06 / PHENOLOGY",
    eyebrow: "Working rhythm, 2023—2026",
    heading: { line1: "Phenology of a", emphasis: "living repository." },
    intro:
      "Phenology is the study of a plant's cycles of activity across the year: when it flushes, when it flowers, when it rests. The same instrument reads four years of commits.",
    scaleNote:
      "The scale is shared across all four years — GitHub normalises each year on its own, which would make a slow year look as intense as a strong one.",
    months: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    inProgress: "in progress",
    legend: { less: "Less", more: "More", peak: "Bloom: the most intense 5% of days" },
    tooltip: {
      none: "No contributions",
      count: (count: number) =>
        `${count.toLocaleString("en-US")} contribution${count === 1 ? "" : "s"}`,
    },
    stats: {
      total: "Contributions in the period",
      activeDays: "Days with activity",
      peak: "Peak in a single day",
      span: "Period observed",
    },
    scopes: {
      authenticated: "private repositories included",
      public: "public activity only",
    },
    source: ({
      handle,
      scope,
      capturedAt,
    }: {
      handle: string;
      scope: string;
      capturedAt: string;
    }) =>
      `Source: GitHub contributions API · ${handle} · ${scope} · captured ${capturedAt}`,
    a11y: {
      yearSummary: ({
        year,
        total,
        activeDays,
        maxDay,
      }: {
        year: number;
        total: number;
        activeDays: number;
        maxDay: number;
      }) =>
        `${year}: ${total.toLocaleString("en-US")} contributions across ${activeDays} active days, peaking at ${maxDay} in a single day.`,
      tableCaption: "GitHub contributions by month, 2023 to 2026",
      yearColumn: "Year",
    },
  },

  trajectory: {
    index: "07 / CAREER",
    heading: { line1: "From the specimen", line2: "to the ", emphasis: "infrastructure." },
    intro:
      "Before the pipelines came the trails, benches and collections. That is where I learned to observe rigorously, preserve context and turn scattered evidence into knowledge other people can use.",
    statement: {
      field: { before: "I learned in the ", emphasis: "field." },
      lab: { before: "I learned in the ", emphasis: "laboratory." },
      herbaria: { before: "I learned in the ", emphasis: "herbarium." },
      communication: { before: "Teach.", emphasis: "Exchange." },
    },
    carousel: {
      label: "Visual archive of my scientific career",
      archiveLabel: "Career archive · Botany",
      previous: "View previous photo",
      next: "View next photo",
      pause: "Pause automatic rotation",
      play: "Resume automatic rotation",
      pagination: "Choose a photo from the archive",
      counter: (current: number, total: number) =>
        `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
      goTo: (current: number, total: number) => `View photo ${current} of ${total}`,
    },
    experiences: {
      field: {
        kicker: "Fieldwork · botanical practice",
        title: "Knowledge with its feet on the ground",
        place: "Botanical expeditions · Brazil",
        text: "Collecting means deciding under real conditions: observing, documenting, preserving context and returning with reliable evidence. That field discipline still guides how I design data and systems.",
      },
      lab: {
        kicker: "Laboratory · molecular biology",
        title: "From morphology to DNA",
        place: "Cenargen / EMBRAPA · Brasília, Brazil",
        text: "During my PhD, I worked in the Cenargen/EMBRAPA laboratory, bringing together molecular data, phylogenetics, biogeography and the evolutionary history of plants I already knew from the field.",
      },
      herbaria: {
        kicker: "Herbaria · scientific collections",
        title: "Physical collections, accessible knowledge",
        place: "Museu Nacional / UFRJ · NYBG",
        text: "I worked with botanical collections throughout my training. In 2016, I spent a year at the New York Botanical Garden, digitising specimens and helping turn physical holdings into accessible data.",
      },
      communication: {
        kicker: "Teaching · science communication",
        title: "Knowledge in circulation",
        place: "CNCFlora · scientific conferences",
        text: "Courses and talks are part of the same practice: making methods, systems and evidence understandable to the people who need to use them.",
      },
    },
    frames: {
      "field-canopy": {
        caption: "Reading the plant before recording the data",
        alt: "Lucas Jordão examining a plant amid dense vegetation",
      },
      "field-search": {
        caption: "Looking for characters where they actually occur",
        alt: "Lucas Jordão searching for and examining plants amid dense vegetation",
      },
      "field-cerrado": {
        caption: "Searching for and documenting specimens in the field",
        alt: "Lucas Jordão in a Cerrado landscape during fieldwork",
      },
      "field-railway": {
        caption: "Reaching the places where records do not yet exist",
        alt: "Lucas Jordão walking beside a railway during a botanical expedition",
      },
      "field-collecting": {
        caption: "Collecting, comparing and deciding under real conditions",
        alt: "Lucas Jordão and a colleague examining plant material on an expedition",
      },
      "field-specimen": {
        caption: "Responsible collecting and well-documented material",
        alt: "Lucas Jordão recording and packing plant material in the field",
      },
      "field-landscape": {
        caption: "The scale of the landscape is part of the data too",
        alt: "Lucas Jordão observing vegetation in an open landscape during fieldwork",
      },
      "field-team": {
        caption: "Botany is teamwork too",
        alt: "Lucas Jordão working with a team during a botanical expedition",
      },
      "field-tree": {
        caption: "Every measurement preserves part of the context",
        alt: "Lucas Jordão observing a tree during a botanical expedition",
      },
      "field-measure": {
        caption: "Measure, record, make comparable",
        alt: "Lucas Jordão measuring a tree trunk during fieldwork",
      },
      "field-forest": {
        caption: "Between the forest and the scientific record",
        alt: "Lucas Jordão walking through dense vegetation during fieldwork",
      },
      "cenargen-bench": {
        caption: "Molecular biology applied to plant systematics",
        alt: "Lucas Jordão in the Cenargen EMBRAPA laboratory in Brasília",
      },
      "cenargen-lab": {
        caption: "From specimen to molecular evidence",
        alt: "Lucas Jordão working at a bench in the Cenargen EMBRAPA laboratory",
      },
      "masters-herbarium": {
        caption: "Comparing specimens during my master's",
        alt: "Lucas Jordão examining botanical material in a herbarium during his master's",
      },
      "nybg-digitization": {
        caption: "One year digitising specimens at NYBG · 2016",
        alt: "Record of Lucas Jordão's exchange at the New York Botanical Garden in 2016",
      },
      "ilc8-talk": {
        caption: "Talk at the 8th International Legume Conference · 2023",
        alt: "Lucas Jordão giving a talk on stage at the 8th International Legume Conference",
      },
      "ilc8-talk-wide": {
        caption: "Science communication at the 8th International Legume Conference · 2023",
        alt: "Wide view of the stage during Lucas Jordão's talk at the 8th International Legume Conference",
      },
      "cnb74-talk": {
        caption:
          "New tools and automated approaches for extinction risk assessment: analysing land-cover and land-use dynamics · 74th National Botany Congress · 2024",
        alt: "Lucas Jordão giving a talk on automated tools for extinction risk assessment at the 74th National Botany Congress",
      },
      "cnb74-lulc": {
        caption:
          "Land-cover and land-use change: the evidence behind criterion B · 74th National Botany Congress · 2024",
        alt: "Lucas Jordão presenting a land-cover and land-use change map of the Federal District at the 74th National Botany Congress, University of Brasília",
      },
      "cncflora-training": {
        caption: "Training course at CNCFlora · 2026",
        alt: "Lucas Jordão delivering a training session to the CNCFlora team in a classroom",
      },
    },
    courses: {
      label: "Continuing education",
      note: (count: number, hours: number) =>
        `${count} courses · ${hours}h recorded on the Lattes CV`,
      items: {
        emagAuthor: {
          title: "eMAG accessibility for content authors",
          place: "National School of Public Administration (ENAP)",
        },
        emagDev: {
          title: "eMAG accessibility for developers",
          place: "National School of Public Administration (ENAP)",
        },
        susData: {
          title: "Data analysis for research in the Brazilian public health system",
          place: "Oswaldo Cruz Foundation (FIOCRUZ)",
        },
        itGovernance: {
          title: "IT governance in the context of digital transformation",
          place: "National School of Public Administration (ENAP)",
        },
        spatialPriority: {
          title: "Spatial prioritisation for conservation",
          place: "Rio de Janeiro Botanical Garden Research Institute",
        },
        landscapeEcology: {
          title: "Landscape ecology and ecological corridor modelling",
          place: "University of Brasília (UnB)",
        },
        earthEngine: {
          title: "Satellite image analysis with Google Earth Engine",
          place: "Solved — Geoinformation Solutions",
        },
        lawPhilosophy: {
          title: "Philosophy of Law",
          place: "Institute for the Reform of State–Business Relations (IREE)",
        },
        economics: {
          title: "Economics for thinking about Brazil",
          place: "Institute for the Reform of State–Business Relations (IREE)",
        },
        educationSociety: {
          title: "Education, environment and society",
          place: "Rio de Janeiro Botanical Garden Research Institute",
        },
        sem: {
          title: "Scanning electron microscopy",
          place: "Rio de Janeiro Botanical Garden Research Institute",
        },
        environmentalBasics: {
          title: "Environmental fundamentals",
          place: "Academia do Concurso · Rio de Janeiro",
        },
        astronomy: {
          title: "History of astronomy",
          place: "Rio de Janeiro City Planetarium Foundation",
        },
        greenLeadership: {
          title: "Green leadership training",
          place: "Fundação Verde Herbert Daniel",
        },
      },
    },
    timelineLabel: "Timeline",
    timelineSpan: "2004 — now",
    items: {
      start: {
        title: "The first specimen",
        text: "I start studying Mimosa at the National School of Tropical Botany. The genus becomes the thread running through everything that follows.",
      },
      masters: {
        title: "Taxonomy in depth",
        text: "Master's at Museu Nacional/UFRJ: working with herbarium collections, expeditions, morphological description and the first new species.",
      },
      phd: {
        title: "From morphology to phylogeny",
        text: "PhD at JBRJ. In 2016, I spend a year at NYBG digitising specimens; at Cenargen/EMBRAPA, I work with DNA and phylogenetics. Biogeography and six loci in conversation — and my first lines of R.",
      },
      cncflora: {
        title: "Conservation at scale",
        text: "Analyst at CNCFlora/JBRJ's Red List unit. I turn assessment rules, data and routines into pipelines, applications and operational workflows.",
      },
      dataScience: {
        title: "Formalising the engineering",
        text: "A second degree, in Data Science, at Universidade Estácio de Sá, to give name and method to what was already daily practice: modelling, statistics and data engineering. Expected completion in July 2027.",
      },
      now: {
        title: "Looking for the next team",
        text: "I close the CNCFlora chapter with systems in operation, legacy data recovered and methods published. I'm looking for a team where domain, data and product are the same conversation.",
      },
    },
  },

  notes: {
    index: "08 / WRITING & PUBLICATIONS",
    heading: { line1: "Thinking in", emphasis: "public form." },
    cta: "Visit the blog",
    items: {
      ffb: {
        date: "14 JUL 2026",
        title: "Flora e Funga do Brasil — Chronology",
        category: "Digital product",
      },
      quartoWriting: {
        date: "15 JUN 2026",
        title: "Improving Scientific Writing in Quarto with Real-Time Feedback",
        category: "Open source",
      },
      tts: {
        date: "14 MAR 2024",
        title:
          "TypeTaxonScript: enhancing data structures in biological systematics",
        category: "Scientific paper",
      },
      mapbiomas: {
        date: "01 AUG 2022",
        title: "MapBiomas and extinction-risk assessment of the Brazilian flora",
        category: "Public policy",
      },
    },
  },

  contact: {
    index: "09 / CONTACT",
    eyebrow: "Next chapter",
    heading: {
      line1: "Science and public management need",
      emphasis: "living, integrated infrastructure.",
    },
    intro:
      "I'm available for new roles and interested in teams where biodiversity, data and digital product have to work as one thing. I reply on LinkedIn within one business day.",
    cardLabel: "What I'm looking for",
    looking: [
      { label: "Roles", value: "Data engineering · Full stack · Geospatial · Applied research" },
      {
        label: "Education",
        value:
          "PhD and MSc in Botany · BSc in Data Science at Estácio, completing July 2027",
      },
      { label: "Setup", value: "Remote, hybrid or on-site in Rio de Janeiro" },
      { label: "Availability", value: "Immediate" },
      { label: "Languages", value: "Portuguese (native) · English (technical reading and writing)" },
    ],
    primaryCta: "Message me on LinkedIn",
    lattesCta: "View Lattes CV",
    cvCta: "Download CV (1 page)",
    links: { github: "GitHub", lattes: "Lattes CV", blog: "Blog" },
    linkNote: {
      github: "53 public repositories",
      lattes: "Full academic record",
      blog: "Technical notes and papers",
    },
  },

  footer: {
    tagline: "Botany at systems scale.",
    copyright: "Content and career © 2026",
    built: "Built in Rio de Janeiro.",
    backToTop: "Back to top",
  },
};
