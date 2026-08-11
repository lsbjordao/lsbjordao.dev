import type { Stat } from "../site";

export const pt = {
  meta: {
    locale: "pt-BR",
    htmlLang: "pt-BR",
    title:
      "Lucas S.B. Jordão — Engenharia de dados, full stack e geoespacial para biodiversidade",
    description:
      "Doutor e mestre em Botânica. Seis anos construindo a infraestrutura de avaliação de risco de extinção da flora brasileira: pipelines com Airflow e dbt, aplicações Next.js/NestJS com APIs REST e GraphQL, e análise geoespacial com PostGIS e MapBiomas. Disponível para novas oportunidades.",
    ogTitle: "Lucas S.B. Jordão — Botânica em escala de sistemas",
    ogDescription:
      "Doutor em Botânica e engenheiro. Pipelines, aplicações e análise geoespacial para biodiversidade e conservação.",
    jobTitle: "Engenheiro de dados e desenvolvedor full stack para biodiversidade",
    switchTo: "Ver em inglês",
    switchLabel: "Idioma",
  },

  /**
   * Barra de escala da cena 3D. É ela que faz a sequência de atos ser argumento
   * e não galeria — prancha de herbário tem barra de escala.
   *
   * String vazia é ato de estrutura abstrata: a chave e o cladograma não têm
   * escala métrica, e ali a barra some em vez de mostrar um travessão que não
   * quer dizer nada. Unidade do SI não se traduz; só o rótulo traduz.
   */
  stage: {
    label: "Escala",
    scale: {
      branch: "",
      key: "",
      trichome: "200 µm",
      territory: "1000 km",
      clade: "",
    },
  },

  a11y: {
    skipToContent: "Pular para o conteúdo",
    brand: "LJ — Lucas Jordão, início",
    mainNav: "Principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    heroImage:
      "Mimosa osmarii, espécie descrita por Lucas S.B. Jordão et al.",
    statsRegion: "Destaques da trajetória",
    filterProjects: "Filtrar projetos",
    filterStatus: (count: number, filter: string) =>
      `${count} projeto${count === 1 ? "" : "s"} em ${filter}`,
    technologies: "Tecnologias e competências",
    techList: "Tecnologias e métodos utilizados",
    keyRegion: "Chave de determinação profissional",
    relatedLinks: (title: string) => `Links relacionados ao projeto ${title}`,
    switchView: "Alternar visão do Painel de Acompanhamento",
    workflowArchitecture: "Arquitetura do trabalho",
  },

  nav: {
    contratar: "Habilidades",
    cncflora: "Conservação da Flora",
    projetos: "Projetos",
    aulas: "Aulas",
    trajetoria: "Trajetória",
    cv: "CV",
    contato: "Contato",
    blog: "Blog",
    mobileLocation: "Rio de Janeiro · Brasil",
    mobileAvailability: "Disponível para propostas",
    status: "Disponível para propostas",
    statusHref: "#contato",
    /** Competência agregadora e domínios em duas linhas; as competências de
        negócio e produto ficam no eyebrow para as mensagens se complementarem. */
    brandTagline:
      "Engenharia de soluções tecnológicas\nDados · software · biodiversidade",
  },

  hero: {
    eyebrow: "Analista de negócios · Descoberta e engenharia de produto · Conservação da biodiversidade",
    headline: { line1: "Botânica", line2: "em escala de", line3: "sistemas." },
    intro:
      "Sou Lucas S.B. Jordão, mestre e doutor em Botânica. Passei vinte anos aprendendo como o conhecimento sobre plantas é produzido e seis construindo a infraestrutura que o transforma em decisão — pipelines, aplicações e análise geoespacial para a avaliação do risco de extinção da flora brasileira.",
    primaryCta: "Falar comigo",
    secondaryCta: "Achar meu perfil na chave",
    availability: {
      label: "Situação",
      value: "Disponível para novas oportunidades",
      modalityLabel: "Modalidade",
      modality: "Remoto, híbrido ou Rio de Janeiro",
      startLabel: "Disponibilidade",
      start: "Início imediato",
    },
    specimen: {
      kicker: "ESPÉCIE NOVA / TAXONOMIA",
      name: "Mimosa osmarii",
      credit: "descrita por L.Jordão et al.",
      action: "Ler descrição da espécie",
    },
    coordinate: { line1: "MIMOSA", line2: "DESCRIÇÃO TAXONÔMICA" },
    imageAlt: "Ramo de Mimosa osmarii com folhas e inflorescência rosada",
    footer: {
      location: "Rio de Janeiro · Brasil",
      scroll: "Role para descobrir",
      since: "Desde 2004",
    },
  },

  /* Doze números em três fileiras de quatro. Os que têm `drawer` abrem a lista
     que os sustenta — número sozinho é alegação, número com lista é evidência. */
  stats: [
    { value: "06", label: "anos construindo sistemas em produção" },
    { value: "03", label: "sistemas institucionais em operação" },
    { value: "53", label: "repositórios públicos" },
    { value: "06", label: "pacotes publicados no npm", drawer: "packages" },
    { value: "588", label: "avaliações publicadas na Lista Vermelha da IUCN" },
    { value: "06", label: "espécies novas descritas" },
    {
      value: "08",
      label: "artigos publicados como primeiro autor",
      drawer: "firstAuthor",
    },
    { value: "06", label: "artigos publicados como coautor", drawer: "coAuthor" },
    { value: "01", label: "capítulo de livro publicado" },
    {
      value: "08",
      label: "participações em bancas examinadoras",
      drawer: "examBoards",
    },
    {
      value: "01",
      label: "orientação de trabalho de conclusão de graduação",
      drawer: "supervision",
    },
    {
      value: "07",
      label: "periódicos científicos revisados",
      drawer: "peerReview",
    },
  ] as Stat[],

  /** Rótulos das gavetas dos números grandes. */
  drawers: {
    open: "Ver lista",
    close: "Fechar lista",
    hint: "clique ou passe o cursor",
    forthcoming: "No prelo",
    packages: {
      title: "Pacotes publicados no npm",
      note: "Escopo @lsbjordao · instaláveis com npm i",
    },
    firstAuthor: {
      title: "Artigos como primeiro autor",
      note: "Ordem cronológica inversa · fonte: Currículo Lattes",
    },
    coAuthor: {
      title: "Artigos como coautor",
      note: "Ordem cronológica inversa · fonte: Currículo Lattes",
    },
    examBoards: {
      title: "Bancas examinadoras",
      note: "Trabalhos examinados · os nomes dos candidatos ficam no Lattes",
    },
    supervision: {
      title: "Orientação concluída",
      note: "Trabalho de conclusão de curso de graduação",
    },
    peerReview: {
      title: "Pareceres ad hoc",
      note: "Periódicos para os quais emiti parecer",
    },
    levels: {
      phd: "Qualificação de doutorado",
      msc: "Qualificação de mestrado",
      undergraduate: "TCC de graduação",
    },
  },

  packages: {
    tts: "Framework que transforma descrições biológicas em dados tipados e validáveis.",
    iucnValidator:
      "Valida, reconcilia e normaliza declarações de critérios (A–E) da Lista Vermelha da IUCN contra a evidência apresentada, com relatórios multilíngues.",
    genbank: "Cliente das E-utilities do NCBI GenBank para Node.js.",
    ffb: "SDK da Flora e Funga do Brasil: famílias, gêneros, espécies e táxons.",
    ibge: "Cliente das APIs de localidades do IBGE, de UFs a subdistritos.",
    mapbiomasAlerta: "Acesso programático aos alertas do MapBiomas Alerta.",
  },

  manifesto: {
    index: "00 / PONTO DE VISTA",
    lead: "A biodiversidade não cabe em uma planilha.",
    statement: {
      before: "Ela exige sistemas que entendam ",
      emphasis: "nomes, lugares, evidências e tempo",
      after: " — e os transformem em decisões que possam ser explicadas.",
    },
    aside:
      "Minha prática atravessa herbários, código e políticas públicas. Não traduzo ciência para tecnologia: desenho as duas juntas.",
  },

  key: {
    index: "01 / CHAVE DE DETERMINAÇÃO",
    eyebrow: "Onde eu entro no seu time",
    heading: { before: "Quatro perfis,", emphasis: "uma pessoa." },
    intro:
      "Um taxonomista identifica um espécime desconhecido percorrendo uma chave dicotômica: pares de alternativas que estreitam até chegar a um nome. Este perfil é largo de propósito. Percorra a chave para chegar à parte dele que resolve o seu problema.",
    startLabel: "Comece aqui",
    restart: "Recomeçar a chave",
    emptyHint: "Escolha 1a ou 1b para determinar",
    resultLabel: "Determinação",
    stackLabel: "Stack",
    evidenceLabel: "Evidência nesta página",
    hireLabel: "Conversar sobre essa vaga",
    seeAll: "Ver as quatro trilhas",
    couplets: {
      "1": {
        question: "O conhecimento de que você precisa…",
        leads: [
          {
            text: "…já existe como dado, mas não chega a quem decide.",
            hint: "bases dispersas, planilhas, sistemas que não conversam",
          },
          {
            text: "…ainda não existe como dado: está em texto corrido, em papel ou na cabeça de especialistas.",
            hint: "descrições, laudos, literatura, conhecimento tácito",
          },
        ],
      },
      "2": {
        question: "E o gargalo é…",
        leads: [
          {
            text: "…de volume: processos pesados que precisam rodar sozinhos, repetíveis e auditáveis.",
            hint: "milhares de registros, rotinas noturnas, rastreabilidade",
          },
          {
            text: "…de tela: pessoas precisam ver, comparar e registrar a decisão.",
            hint: "interfaces internas, painéis, fluxo de trabalho",
          },
        ],
      },
      "3": {
        question: "E o que falta saber é…",
        leads: [
          {
            text: "…onde: distribuição, perda de habitat e tendência ao longo do tempo.",
            hint: "séries históricas, sensoriamento remoto, indicadores espaciais",
          },
          {
            text: "…o quê: caracteres, nomes, procedência e a evidência por trás de cada afirmação.",
            hint: "modelagem de domínio, vocabulários, dados FAIR",
          },
        ],
      },
    },
    tracks: {
      data: {
        name: "Engenharia de dados",
        tagline: "Pipelines que rodam sem você olhando.",
        body: "Projetei e implementei o ETL que conectou o ProFlora a filas assíncronas e conduzi a migração completa do acervo legado do CNCFlora, orquestrando extração e carga com Apache Airflow e modelando as transformações com dbt. Processamentos que antes eram manuais passaram a ser repetíveis, monitoráveis e auditáveis.",
        evidence: [
          { label: "ETL Bull–ProFlora, em operação", href: "#cncflora" },
          { label: "Migração do acervo legado com Airflow + dbt", href: "#cncflora" },
        ],
      },
      fullstack: {
        name: "Desenvolvimento full stack",
        tagline: "A aplicação onde a decisão acontece.",
        body: "Atuei da arquitetura à interface do Avalia–CNCFlora, ambiente interno que reúne dados taxonômicos, análises geoespaciais, gráficos e a redação estruturada das justificativas de avaliação. Next.js e NestJS sobre PostgreSQL/PostGIS, expondo os dados por APIs REST e GraphQL, com integração ao MapBiomas e CI/CD em GitLab.",
        evidence: [
          { label: "Avalia–CNCFlora, aplicação interna", href: "#cncflora" },
          { label: "TTS–Mimosa App, prova de conceito pública", href: "#projetos" },
        ],
      },
      geo: {
        name: "Geoespacial & conservação",
        tagline: "Medir onde a perda está acontecendo.",
        body: "Desenvolvi rotinas de processamento geoespacial e análise de uso e cobertura da terra que tornaram os parâmetros do critério B da Lista Vermelha da IUCN mais objetivos e reprodutíveis: regressão sobre séries históricas do MapBiomas para estimar declínio contínuo em AOO, EOO e habitat, e um método de buffer variável para semiautomatizar a contagem de locations.",
        evidence: [
          { label: "Menção honrosa no Prêmio MapBiomas", href: "#mapbiomas" },
          { label: "LULC × Leguminosae, análise pública", href: "#projetos" },
        ],
      },
      research: {
        name: "Taxonomia computacional",
        tagline: "Descrição vira dado tipado.",
        body: "Concebi e publiquei o TypeTaxonScript, um framework que representa caracteres morfológicos como dados tipados, validáveis e versionáveis. É a ponte entre modelagem de domínio e conhecimento científico — e a base de uma agenda de pesquisa em que botânica e engenharia de software são uma prática só.",
        evidence: [{ label: "TypeTaxonScript, Biology Methods and Protocols", href: "#projetos" }],
      },
    },
  },

  research: {
    index: "PUBLICAÇÃO EM DESTAQUE / 2020",
    eyebrow: "Taxonomia · Morfologia comparada",
    heading: { line1: "Uma linguagem comum", emphasis: "para os tricomas." },
    lead: "Antes de estruturar morfologia como dados, foi preciso organizar a própria linguagem usada para descrever as formas.",
    body: {
      before: "No artigo ",
      cite: "Trichomes in Mimosa",
      after:
        ", propus com Marli Pires Morim e José Fernando A. Baumgratz uma caracterização dos tricomas do gênero e uma padronização terminológica para tornar seu uso taxonômico mais consistente e comparável.",
    },
    citation: { journal: "FLORA · VOLUME 272", article: "ARTICLE 151702" },
    cta: "Ler o artigo",
    imageAlt:
      "Prancha comparativa com diferentes tipos de tricomas do gênero Mimosa",
    plate: {
      title: "PRANCHA MORFOLÓGICA / MIMOSA",
      subtitle: "diversidade de formas e termos",
    },
  },

  case: {
    index: "02 / ESTUDO DE CASO",
    eyebrow: "CNCFlora · 2020—2026",
    heading: { line1: "Uma infraestrutura", line2: "para ", emphasis: "avaliar a flora." },
    abstract:
      "Avaliar o risco de extinção é coordenar evidências fragmentadas, análises espaciais e muitas pessoas. No CNCFlora/JBRJ, converti esse processo em uma arquitetura de dados, filas e interfaces. Levantei e documentei os requisitos com Sphinx-Needs, mantendo rastreabilidade entre necessidade e implementação, e criei o catálogo de serviços da equipe em Backstage.",
    scope: {
      label: "Meu escopo",
      value:
        "Arquitetura · engenharia de requisitos · desenvolvimento full stack · ETL · automação · geoprocessamento · CI/CD · catálogo de serviços · observabilidade",
    },
    map: {
      label: "Arquitetura do trabalho",
      sublabel: "do dado bruto à decisão",
      nodes: [
        {
          kicker: "COORDENAR",
          name: "Fluxo de trabalho",
          detail: "etapas · papéis · auditoria",
        },
        {
          kicker: "PROCESSAR",
          name: "Bull–ProFlora",
          detail: "ETL · filas · logs",
        },
        {
          kicker: "INTERPRETAR",
          name: "Avalia–CNCFlora",
          detail: "mapas · métricas · texto",
        },
        {
          kicker: "PUBLICAR",
          name: "Dados abertos e métodos inovadores",
          detail: "páginas web · aplicabilidade · artigos científicos",
        },
      ],
    },
    contributionLabel: "Minha contribuição",
    publicPortalCta: "Explorar dados públicos",
    viewSwitch: { app: "Aplicação", operation: "Operação real" },
    gallery: {
      label: (name: string) => `Imagens do ${name}`,
      previous: "Imagem anterior",
      next: "Próxima imagem",
      goTo: (current: number, total: number) => `Mostrar imagem ${current} de ${total}`,
    },
    systems: {
      tracking: {
        role: "Coordenar",
        name: "Painel de Acompanhamento",
        status: "Protótipo não adotado",
        operationStatus: "Operação em planilha",
        summary:
          "Concebi e construí uma aplicação para tornar visíveis etapas, responsáveis, pendências e progresso de centenas de avaliações em tempo real.",
        contribution:
          "A aplicação não foi implantada institucionalmente. O fluxo efetivamente usado permaneceu em uma planilha que configurei com Apps Script, APIs, mensageria e registros operacionais — e que sustentou a operação até o fim do período.",
        imageAlt:
          "Interface do protótipo Painel de Acompanhamento para gestão de avaliações",
        altImageAlt:
          "Planilha colaborativa usada para acompanhar o fluxo das avaliações",
      },
      bull: {
        role: "Orquestrar",
        name: "Bull–ProFlora",
        status: "ETL em operação",
        summary:
          "Projetei e implementei o ETL que conectou o ProFlora a filas assíncronas, tornando processamentos pesados controláveis, repetíveis e auditáveis.",
        contribution:
          "A camada de processamento e suas integrações foram minha entrega. A interface administrativa mostrada é o Bull Board, painel público e genérico do ecossistema Bull.",
        imageAlt:
          "Painel de filas do Bull-ProFlora exibindo tarefas de processamento",
        galleryImageAlts: [
          "Painel do Bull-ProFlora com visão geral das filas de processamento",
          "Painel do Bull-ProFlora com dados e progresso de uma tarefa do MapBiomas",
        ],
      },
      avalia: {
        role: "Analisar",
        name: "Avalia–CNCFlora",
        status: "Aplicação interna",
        summary:
          "Desenvolvi um ambiente para reunir dados taxonômicos, análises geoespaciais, gráficos e textos de apoio à avaliação segundo os critérios da IUCN.",
        contribution:
          "Atuei da arquitetura à interface: modelei os dados em PostgreSQL/PostGIS, construí back-end em NestJS expondo APIs REST e GraphQL, desenvolvi o front-end em Next.js, implementei os pipelines de CI/CD em GitLab e integrei MapBiomas, métricas de AOO e EOO, tendências de uso do solo e a redação estruturada das justificativas.",
        imageAlt:
          "Interface do Avalia-CNCFlora com mapas e indicadores para avaliação de espécies",
        galleryImageAlts: [
          "Interface do Avalia-CNCFlora com mapa, ocorrências e indicadores geoespaciais",
          "Interface do Avalia-CNCFlora com diagrama de transições de uso e cobertura do solo",
          "Interface do Avalia-CNCFlora com gráfico e estimadores de tendência da extensão de ocorrência",
          "Interface do Avalia-CNCFlora com gráfico de área queimada por cobertura e uso do solo",
          "Interface do Avalia-CNCFlora com formulário do critério B e justificativa da avaliação",
        ],
      },
      legacy: {
        role: "Resgatar",
        name: "Resgate de dados legados",
        status: "Migração concluída",
        summary:
          "Planejei e executei o resgate dos dados do sistema legado, migrando o acervo histórico para a arquitetura do ProFlora.",
        contribution:
          "Conduzi todas as etapas da migração: orquestrei extração e carga com Apache Airflow, modelei e validei as transformações com dbt e disponibilizei o legado recuperado na nova base. Esses dados hoje alimentam o portal público do CNCFlora.",
        imageAlt:
          "Fluxo de migração dos dados legados para o ProFlora com Apache Airflow e dbt",
        diagram: {
          sourceKicker: "SISTEMA LEGADO",
          sourceName: "Acervo histórico",
          orchestration: "ORQUESTRAÇÃO",
          transformation: "TRANSFORMAÇÃO",
          target: "ProFlora",
          targetNote: "dados recuperados",
        },
      },
    },
    award: {
      badge: "Reconhecimento · 2022",
      edition: "4ª EDIÇÃO · PRÊMIO MAPBIOMAS",
      honour: "MENÇÃO HONROSA",
      eyebrow: "Destaque · Aplicações em Políticas Públicas",
      title:
        "O MapBiomas e a avaliação do risco de extinção da flora brasileira",
      lead: "Trabalho desenvolvido no contexto do CNCFlora/JBRJ para tornar a avaliação de risco de extinção pelo critério B da Lista Vermelha da IUCN mais objetiva, reprodutível e operacional.",
      methods: [
        {
          label: "01 / DECLÍNIO CONTÍNUO",
          text: "Regressão linear aplicada à série histórica de uso e cobertura do solo para estimar tendências de acréscimo ou decréscimo em AOO, EOO e habitat.",
        },
        {
          label: "02 / LOCATIONS",
          text: "Método de buffer variável para aglutinar ocorrências próximas e semiautomatizar a contagem de situações de ameaça.",
        },
        {
          label: "03 / PADRONIZAÇÃO DO RATIONALE",
          text: "Propus uma arquitetura estruturada para o rationale, organizando o texto de justificativa da avaliação de modo a atender de forma consistente aos requisitos dos critérios.",
        },
      ],
      primaryCta: "Abrir trabalho completo",
      secondaryCta: "Ler contexto no blog",
      imageAlt:
        "Menção Honrosa para Lucas Sá Barreto Jordão na 4ª edição do Prêmio MapBiomas, categoria Aplicações em Políticas Públicas",
    },
  },

  lulcHabitat: {
    index: "02.1 / MENÇÃO ESPECIAL",
    eyebrow: "LULC Habitat · aplicação colaborativa",
    heading: {
      line1: "Um sistema pronto para",
      emphasis: "evoluir em colaboração.",
    },
    status: "DESENVOLVIDO · EM STAND-BY",
    lead:
      "O aplicativo está funcional e publicado. Está em stand-by porque sua próxima etapa deve ser construída junto aos colaboradores que irão usá-lo, incorporando o fluxo real de validação e governança dos dados.",
    devNote:
      "As telas de painel e marcação preservam o badge DEV MODE do ambiente em que foram registradas.",
    features: [
      {
        number: "01",
        title: "Atualização em tempo real",
        text: "Canais do Supabase Realtime sobre WebSocket sincronizam marcações, status, divergências e atribuições entre sessões abertas.",
      },
      {
        number: "02",
        title: "Preenchimento pelo teclado",
        text: "Um modo dedicado permite navegar por classes e campos com setas, Enter, espaço e atalhos, agilizando a marcação sem depender do mouse.",
      },
      {
        number: "03",
        title: "Revisão por pares",
        text: "Marcações podem ser verificadas e revisadas por colaboradores, criando um caminho explícito para convergir ao melhor dado com autoria e histórico.",
      },
      {
        number: "04",
        title: "Conflitos sem perda de dados",
        text: "Uma divergência vira uma proposta comentada; o dado vigente permanece preservado até o colaborador responsável aceitar ou rejeitar a mudança.",
      },
    ],
    screens: {
      auth: {
        title: "Autenticação e recuperação de acesso",
        alt: "Tela de autenticação do LULC Habitat com login, cadastro e recuperação de senha",
      },
      dashboard: {
        title: "Painel colaborativo e auditável",
        alt: "Painel do LULC Habitat em modo de desenvolvimento com progresso, atribuições e resultados por colaborador",
      },
      annotation: {
        title: "Marcação e revisão de habitat",
        alt: "Tela do LULC Habitat em modo de desenvolvimento para marcar e revisar classes MapBiomas por espécie",
      },
    },
    devMode: "DEV MODE",
  },

  work: {
    index: "03 / TRABALHO SELECIONADO",
    heading: { line1: "Projetos que fazem", line2: "o conhecimento ", emphasis: "circular." },
    intro:
      "Software, dados e publicações concebidos para que conhecimento científico possa ser consultado, testado e reutilizado. Tudo abaixo é público e verificável.",
    filters: {
      all: "Todos",
      conservation: "Conservação",
      taxonomy: "Taxonomia",
      software: "Software",
      openScience: "Ciência aberta",
    },
    openProject: "Abrir projeto",
    projects: {
      tts: {
        title: "TypeTaxonScript",
        kicker: "Taxonomia como código",
        description:
          "Framework publicado para transformar descrições biológicas em dados tipados, validáveis, versionáveis e colaborativos — com registro acadêmico no Google Patents.",
        imageAlt: "Documentação visual da estrutura de dados do TypeTaxonScript",
      },
      ttsMimosa: {
        title: "TTS–Mimosa",
        kicker: "Conhecimento explorável",
        description:
          "Uma prova de conceito que conecta caracteres morfológicos, imagens e fontes em uma interface taxonômica navegável.",
        imageAlt: "Aplicação TTS-Mimosa exibindo caracteres morfológicos estruturados",
      },
      ttsMimosaDocs: {
        title: "TTS–Mimosa Docs",
        kicker: "Caracteres taxonômicos como software",
        description:
          "Documentação tipada dos caracteres de Mimosa, organizada em módulos navegáveis e mantida com tecnologias de engenharia de software.",
        imageAlt: "Documentação TTS-Mimosa exibindo módulos de caracteres taxonômicos",
      },
      lulc: {
        title: "LULC × Leguminosae",
        kicker: "Conservação orientada por dados",
        description:
          "Séries históricas de cobertura e uso do solo convertidas em evidências quantitativas para avaliações do risco de extinção.",
        imageAlt:
          "Gráficos de cobertura natural e uso alternativo do solo para Leguminosae",
      },
      lulcHabitat: {
        title: "LULC Habitat",
        kicker: "Acesso colaborativo seguro",
        description:
          "Aplicação web colaborativa com login, verificação e autorização de usuários, sessões baseadas em JWT, recuperação de senha e e-mails transacionais automatizados com Supabase Auth, Resend e SMTP.",
        imageAlt: "Identidade visual do projeto LULC Habitat",
      },
      ffb: {
        title: "FFB Cronologia",
        kicker: "Histórico, ranking e nomes aceitos",
        description:
          "Aplicação de utilidade geral que compara 394 versões da Flora e Funga do Brasil, revela mudanças taxonômicas, cria rankings filtráveis e localiza nomes aceitos em lote com busca flexível.",
        imageAlt:
          "Ranking por versão da aplicação Flora e Funga do Brasil Cronologia",
      },
      curva: {
        title: "Curva",
        kicker: "Matemática no navegador",
        description:
          "Calculadora gráfica escrita do zero, sem nenhuma biblioteca de matemática: parser de expressões próprio, derivada simbólica passo a passo, integração e limites numéricos, ajuste de curvas com resíduos e SSE, estatística e geometria analítica. Nasceu da graduação em Ciência de Dados.",
        imageAlt:
          "Calculadora gráfica Curva exibindo ondas compostas, suas derivadas e o teclado matemático",
      },
      quartoWriting: {
        title: "Quarto Scientific Writing",
        kicker: "Escrita científica assistida",
        description:
          "Extensão com diagnósticos em tempo real de estilo, estrutura, legibilidade e consistência para manuscritos científicos.",
        imageAlt: "Identidade visual do projeto Quarto Scientific Writing",
      },
      quartoFocus: {
        title: "Quarto Focus Mode",
        kicker: "Leitura sem ruído",
        description:
          "Modo de foco, apresentação por seções, navegação por teclado e progresso inteligente para sites e livros Quarto.",
        imageAlt: "Identidade visual da extensão Quarto Focus Mode",
      },
      quartoConditional: {
        title: "Quarto Conditional Vars",
        kicker: "Um documento, múltiplas versões",
        description:
          "Extensão que renderiza conteúdo condicional a partir de variáveis do projeto, com regras combináveis e compatibilidade entre engines Quarto.",
        imageAlt: "Identidade visual da extensão Quarto Conditional Vars",
      },
      quartoCiteThis: {
        title: "Quarto cite-this",
        kicker: "Como citar, em um clique",
        description:
          "Extensão que adiciona um controle acessível de \"como citar\" a livros e sites Quarto, com cópia em texto por estilo CSL ou em BibTeX. As citações são montadas na renderização, sem biblioteca no navegador, e funcionam com recursos embutidos ou sem JavaScript.",
        imageAlt: "Identidade visual da extensão Quarto cite-this",
      },
    },
    relatedLinkLabels: {
      scholar: "Registro acadêmico",
      CN107861721A: "CN107861721A",
      US20260127206A1: "US20260127206A1",
      ranking: "Ranking",
      batch: "Busca de nomes em lote",
      curvaRepo: "Código no GitHub",
    },
    relatedLabels: {
      patents: "Google Patents",
      ffbApp: "Explorar aplicação",
      curvaCode: "Código aberto",
    },
  },

  patents: {
    meta: "REC–01 / INFRAESTRUTURA INTERDISCIPLINAR",
    verified: "VERIFICADO",
    eyebrow: "Google Patents",
    heading: {
      before: "TypeTaxonScript no mapa semântico da ",
      emphasis: "engenharia de software.",
    },
    summary: {
      before: "O artigo possui registro acadêmico próprio e foi associado pela seção automatizada ",
      italic: "Similar Documents",
      after:
        " a três documentos de patente que pude verificar — duas ocorrências atuais e uma preservada no índice de busca.",
    },
    cta: "Abrir registro acadêmico",
    detailsLabel: "Ver listagem verificada",
    detailsNote: "Não equivale a patente ou citação de anterioridade",
    statusLabels: { current: "Atual", historical: "Índice histórico" },
    mentionTitles: {
      CN107861721A:
        "Reverse graphical intelligence programming method and apparatus, equipment and storage medium",
      US20260127206A1:
        "Application generation system based on ingested documents using integrated programmatic and specialized guided and constrained artificial intelligence",
    },
    mentionNotes: {
      CN107861721A: "TypeTaxonScript aparece hoje em Similar Documents.",
      US20260127206A1: "TypeTaxonScript aparece hoje em Similar Documents.",
    },
  },

  teaching: {
    index: "04 / DOCÊNCIA",

    /* Dar aula é a parte mais antiga da minha trajetória e a que menos aparece
       num portfólio de engenharia — por isso vem antes da estante de apostilas. */
    practice: {
      eyebrow: "Ensino · do fundamental à pós-graduação",
      heading: { line1: "Ensinar é a forma mais", emphasis: "antiga do meu trabalho." },
      intro:
        "Comecei como monitor de micologia em 2007 e nunca parei. Dei aula de Ciências no ensino fundamental, de educação ambiental em horto escola, e hoje ministro disciplinas e treinamentos de pós-graduação sobre filoinformática, legislação ambiental e avaliação de risco de extinção. É a mesma prática do resto desta página: tornar método e evidência utilizáveis por outras pessoas.",
      countLabel: "turmas, cursos e disciplinas em destaque",
      listNote: {
        text: "Uma seleção, não a relação completa — o registro integral está no",
        link: "Currículo Lattes",
      },
      credential: {
        label: "Habilitação",
        value:
          "Licenciado em Ciências Biológicas (2009) · bacharel (2007) · Universidade Santa Úrsula",
      },
      kinds: {
        course: "Curso · disciplina",
        position: "Vínculo docente",
      },
      hoursLabel: "carga horária",
      roles: {
        cncflora: {
          title: "Treinamento da equipe em avaliação de risco de extinção",
          place: "CNCFlora / JBRJ · Rio de Janeiro",
        },
        ufms: {
          title:
            "Espécies Ameaçadas: da política pública à avaliação do risco de extinção",
          place: "Universidade Federal de Mato Grosso do Sul · remoto",
        },
        enbtGuest: {
          title:
            "Filogenia, biogeografia e diversificação de Mimosa ser. Paucifoliatae — professor convidado na disciplina EB004, Introdução à Sistemática Filogenética",
          place: "Escola Nacional de Botânica Tropical / JBRJ",
        },
        enbtPhylo: {
          title: "Tópicos Especiais: Introdução à Filoinformática (EB02935)",
          place: "Escola Nacional de Botânica Tropical / JBRJ",
        },
        bioforense: {
          title:
            "Botânica forense, botânica básica e legislação aplicada à proteção da flora — preparatório para perito criminal",
          place: "Curso Bioforense · Rio de Janeiro",
        },
        hortoEscola: {
          title: "Professor de educação ambiental",
          place: "Horto Escola Artesanal · São Pedro da Aldeia, RJ",
        },
        seeduc: {
          title: "Docente II · educação básica",
          place: "Secretaria de Educação do Estado do Rio de Janeiro",
        },
        laranjeiras: {
          title: "Professor de Ciências · 2º ciclo do ensino fundamental",
          place: "Sociedade Educacional Laranjeiras · Rio de Janeiro",
        },
        usu: {
          title: "Monitoria em Micologia",
          place: "Universidade Santa Úrsula · Rio de Janeiro",
        },
      },
    },

    eyebrow: "Cursos e apostilas de acesso aberto",
    heading: { line1: "Uma estante para", emphasis: "ensinar em público." },
    intro:
      "Livros de curso escritos em Quarto e publicados abertos: legislação ambiental, avaliação de risco de extinção, política pública e filoinformática. A espessura de cada lombada acompanha o número de capítulos.",
    itemLabel: "AULA",
    toolEyebrow: "FERRAMENTA",
    openBook: "Abrir apostila",
    openTool: "Abrir ferramenta",
    tally: (volumes: number, chapters: number) =>
      `${String(volumes).padStart(2, "0")} volumes · ${chapters} capítulos · acesso aberto`,
    items: {
      legislacaoFlora: {
        title: "Legislação aplicada à proteção da flora e vegetações brasileiras",
        volume: "23 capítulos",
        topics: [
          "Lei do Bioma Mata Atlântica",
          "Lei Florestal e gestão de florestas públicas",
          "Crimes e infrações contra a flora",
        ],
      },
      filoinformatica: {
        title: "Introdução à Filoinformática",
        volume: "15 capítulos",
        topics: [
          "Montagem e alinhamento de sequências",
          "Modelos de evolução e análise filogenética",
          "Filogenia no R",
        ],
      },
      politicaEspecies: {
        title: "Política Pública de Tutela e Proteção das Espécies Ameaçadas",
        volume: "9 capítulos",
        topics: [
          "PRONABIO, CONABIO e Pró-Espécies",
          "Listas nacionais oficiais de espécies ameaçadas",
          "CNCFlora/JBRJ e CITES",
        ],
      },
      cf88: {
        title: "Constituição Federal de 1988",
        volume: "9 títulos",
        topics: [
          "Dos princípios fundamentais",
          "Da organização do Estado e dos Poderes",
          "Da ordem econômica e da ordem social",
        ],
      },
      pnb: {
        title: "Política Nacional da Biodiversidade",
        volume: "7 componentes",
        topics: [
          "Conhecimento e conservação da biodiversidade",
          "Utilização sustentável e repartição de benefícios",
          "Fortalecimento jurídico e institucional",
        ],
      },
      riscoExtincao: {
        title: "Avaliação do Risco de Extinção de Espécies",
        volume: "6 capítulos",
        topics: [
          "Lista Vermelha da IUCN",
          "Qualidade dos dados",
          "Categorias e critérios",
        ],
      },
      direitoAmbiental: {
        title: "Introdução ao Direito Ambiental",
        volume: "5 capítulos",
        topics: [
          "Ordenamento jurídico brasileiro",
          "Direito ambiental constitucional",
          "Política Nacional do Meio Ambiente",
        ],
      },
      chaveInterativa: {
        title: "Chave de Identificação Biológica",
        volume: "Aplicação interativa",
        topics: [
          "Visualizador de chaves dicotômicas",
          "Modo de identificação passo a passo",
          "Editor JSON da estrutura",
        ],
      },
    },
  },

  technology: {
    index: "05 / TECNOLOGIAS",
    eyebrow: "Da escrita científica à infraestrutura",
    heading: { line1: "Tecnologias que atravessam", emphasis: "o trabalho." },
    countLabel: "tecnologias & métodos",
    intro:
      "Um repertório construído em problemas reais: aplicações científicas, engenharia de dados, publicação reprodutível e infraestrutura.",
    itemsLabel: "itens",
    groups: {
      languages: "Linguagens & interfaces",
      dataPipelines: "Dados & pipelines",
      knowledge: "Conhecimento & semântica",
      infrastructure: "Infraestrutura, cloud & acesso",
      publishing: "Publicação & métodos",
    },
    skills: {
      eyebrow: "O que eu sei fazer com elas",
      heading: { before: "Ferramenta é meio.", emphasis: "Habilidade é o trabalho." },
      intro:
        "A lista acima diz com o que eu trabalho. Esta diz o que eu resolvo — agrupado por domínio de problema.",
      countLabel: "competências",
      groups: {
        dataEngineering: {
          title: "Engenharia de dados",
          items: [
            "ETL e ELT automatizados",
            "Orquestração de pipelines",
            "Mensageria e filas assíncronas",
            "Modelagem e teste de transformações",
            "Aplicações de uso intensivo de dados",
            "Contratos de dados e versionamento",
            "Migração de acervos legados",
          ],
        },
        fullstack: {
          title: "Desenvolvimento full stack",
          items: [
            "Aplicações web de ponta a ponta",
            "Aplicações mobile com React Native e Expo",
            "APIs REST e GraphQL com NestJS",
            "Componentização em React e Svelte",
            "Modelagem e evolução de esquema",
            "Segurança de aplicações web — autenticação e autorização, JWT, sessões, recuperação de senha e e-mails transacionais com Supabase Auth e Resend (LULC-Habitat)",
            "Renderização estática, SSR e performance",
            "Testes automatizados e revisão de código",
          ],
        },
        extraction: {
          title: "Extração & integração",
          items: [
            "Extração de dados com regex",
            "Web scraping e PDF scraping",
            "Mineração de texto",
            "APIs REST e GraphQL",
            "Integração de fontes heterogêneas",
            "Dados FAIR e vocabulários de biodiversidade",
          ],
        },
        modelling: {
          title: "Modelagem & bancos de dados",
          items: [
            "Bancos relacionais e SQL analítico",
            "NoSQL orientado a documentos",
            "NoSQL orientado a grafos",
            "Busca vetorial e embeddings",
            "Ontologias, RDF e SPARQL",
            "Modelagem de domínio de negócio",
            "Padrões de projeto",
          ],
        },
        platform: {
          title: "Plataforma & infraestrutura",
          items: [
            "Arquitetura em microsserviços",
            "Engenharia de plataforma",
            "CI/CD e práticas DevOps",
            "IaaS e nuvem pública",
            "Contêineres e ambientes reprodutíveis",
            "Git, fluxos de branch e revisão",
            "Observabilidade e catálogo de serviços",
          ],
        },
        geo: {
          title: "Geoespacial & conservação",
          items: [
            "Banco e consultas espaciais com PostGIS",
            "Séries históricas de uso e cobertura do solo",
            "Sensoriamento remoto no Google Earth Engine",
            "Métricas de AOO, EOO e perda de habitat",
            "Critérios da Lista Vermelha da IUCN",
            "Ecologia de paisagens e corredores ecológicos",
            "Modelagem de cenários com CA-Markov",
          ],
        },
        analysis: {
          title: "Análise & decisão",
          items: [
            "Indicadores e relatórios reprodutíveis",
            "Análise de dados financeiros",
            "Analítica de visitação com Google Analytics",
            "Estatística aplicada e regressão",
            "Painéis analíticos e BI",
            "Storytelling de dados",
            "CRISP-DM e KDD",
          ],
        },
        product: {
          title: "Engenharia de soluções tecnológicas",
          items: [
            "Análise de negócio",
            "Descoberta de produto",
            "Engenharia de requisitos",
            "Arquitetura de soluções",
            "Transformação digital",
            "Consultoria em tecnologia",
            "Desenvolvimento ágil de software",
            "Desenvolvimento full stack",
          ],
        },
      },
    },
  },

  phenology: {
    index: "06 / FENOLOGIA",
    eyebrow: "Ritmo de trabalho, 2023—2026",
    heading: { line1: "Fenologia de um", emphasis: "repositório vivo." },
    intro:
      "Fenologia é o estudo dos ciclos de atividade de uma planta ao longo do ano: quando brota, quando floresce, quando descansa. O mesmo instrumento serve para ler quatro anos de commits.",
    scaleNote:
      "A escala é comum aos quatro anos — o GitHub normaliza cada ano em separado, o que faria um ano fraco parecer tão intenso quanto um ano forte.",
    months: [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ],
    inProgress: "em curso",
    legend: { less: "Menos", more: "Mais", peak: "Floradas: 5% dos dias mais intensos" },
    tooltip: {
      none: "Sem contribuições",
      count: (count: number) =>
        `${count.toLocaleString("pt-BR")} contribuiç${count === 1 ? "ão" : "ões"}`,
    },
    stats: {
      total: "Contribuições no período",
      activeDays: "Dias em atividade",
      peak: "Pico em um único dia",
      span: "Período observado",
    },
    /** Escolhido por `contributions.source`, para o rodapé nunca prometer mais
        do que a captura realmente enxergou. */
    scopes: {
      authenticated: "inclui repositórios privados",
      public: "apenas atividade pública",
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
      `Fonte: API de contribuições do GitHub · ${handle} · ${scope} · capturado em ${capturedAt}`,
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
        `${year}: ${total.toLocaleString("pt-BR")} contribuições em ${activeDays} dias de atividade, com pico de ${maxDay} em um único dia.`,
      tableCaption: "Contribuições no GitHub por mês, de 2023 a 2026",
      yearColumn: "Ano",
    },
  },

  trajectory: {
    index: "07 / TRAJETÓRIA",
    heading: { line1: "Do espécime", line2: "à ", emphasis: "infraestrutura." },
    intro:
      "Antes dos pipelines, vieram as trilhas, as bancadas e as coleções. Foi ali que aprendi a observar com rigor, registrar contexto e transformar evidência dispersa em conhecimento que outras pessoas conseguem usar.",
    cladogram: {
      eyebrow: "Linhagem",
      title: "A carreira é reticulada, não linear",
      lede: "Duas linhagens correm em paralelo por uma década — a sistemática de plantas e a curadoria digital de coleções — e se fundem em 2020, quando avaliar risco de extinção passou a exigir taxonomia e engenharia de dados ao mesmo tempo.",
      scrollHint: "Arraste o diagrama para o lado para ver até 2026.",
      reticulation: "reticulação",
      ariaLabel:
        "Cladograma da trajetória profissional de 2003 a 2026, mostrando as linhagens de docência, botânica, coleções e dados, com um evento de reticulação em 2020.",
      lanes: {
        teaching: "DOCÊNCIA",
        botany: "BOTÂNICA",
        collections: "COLEÇÕES",
        data: "DADOS",
      },
      nodes: {
        biology: "Ciências Biológicas · USU",
        internship: "Estágio · JBRJ",
        bachelor: "Bacharelado",
        masters: "Mestrado · UFRJ/Museu Nacional",
        phd: "Doutorado + pós-doc · JBRJ",
        teacher: "Professor de Ciências",
        seeduc: "SEEDUC/RJ · Horto Escola",
        reflora: "REFLORA · Herbário RB",
        nybg: "NYBG · digitalização",
        redList: "Analista da Lista Vermelha",
        itAnalyst: "Analista de TI",
        now: "hoje",
        dataScience: "Ciência de Dados · UNESA",
      },
    },
    statement: {
      field: { before: "Aprendi no ", emphasis: "campo." },
      lab: { before: "Aprendi no ", emphasis: "laboratório." },
      herbaria: { before: "Aprendi no ", emphasis: "herbário." },
      communication: { before: "Ensinar.", emphasis: "Dialogar." },
    },
    carousel: {
      label: "Arquivo visual da trajetória científica",
      archiveLabel: "Arquivo de trajetória · Botânica",
      previous: "Ver foto anterior",
      next: "Ver próxima foto",
      pause: "Pausar rotação automática",
      play: "Retomar rotação automática",
      pagination: "Escolher uma foto do arquivo",
      counter: (current: number, total: number) =>
        `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
      goTo: (current: number, total: number) => `Ver foto ${current} de ${total}`,
    },
    experiences: {
      field: {
        kicker: "Campo · prática botânica",
        title: "Conhecimento com os pés no chão",
        place: "Expedições botânicas · Brasil",
        text: "Coletar é decidir em condições reais: observar, documentar, preservar contexto e voltar com evidência confiável. Essa disciplina de campo continua orientando a forma como projeto dados e sistemas.",
      },
      lab: {
        kicker: "Laboratório · biologia molecular",
        title: "Da morfologia ao DNA",
        place: "Cenargen / EMBRAPA · Brasília, DF",
        text: "Durante o doutorado, trabalhei no laboratório do Cenargen/EMBRAPA, aproximando dados moleculares, filogenia, biogeografia e a história evolutiva das plantas que eu conhecia no campo.",
      },
      herbaria: {
        kicker: "Herbários · coleções científicas",
        title: "Acervos físicos, conhecimento acessível",
        place: "Museu Nacional / UFRJ · NYBG",
        text: "Trabalhei com coleções botânicas ao longo da formação. Em 2016, passei um ano em intercâmbio no New York Botanical Garden, digitalizando espécimes e ajudando a transformar acervos físicos em dados acessíveis.",
      },
      communication: {
        kicker: "Ensino · comunicação científica",
        title: "Conhecimento que circula",
        place: "CNCFlora · congressos científicos",
        text: "Cursos e palestras fazem parte da mesma prática: tornar métodos, sistemas e evidências compreensíveis para quem precisa usá-los.",
      },
    },
    frames: {
      "field-canopy": {
        caption: "Ler a planta antes de registrar o dado",
        alt: "Lucas Jordão examinando uma planta em meio à vegetação",
      },
      "field-search": {
        caption: "Procurar caracteres onde eles realmente ocorrem",
        alt: "Lucas Jordão procurando e examinando plantas em meio à vegetação",
      },
      "field-cerrado": {
        caption: "Busca e documentação de espécimes em campo",
        alt: "Lucas Jordão em uma paisagem de Cerrado durante trabalho de campo",
      },
      "field-railway": {
        caption: "Chegar onde os registros ainda não existem",
        alt: "Lucas Jordão caminhando junto a uma ferrovia durante uma expedição botânica",
      },
      "field-collecting": {
        caption: "Coleta, comparação e decisão em condições reais",
        alt: "Lucas Jordão e uma colega examinando material vegetal durante uma expedição",
      },
      "field-specimen": {
        caption: "Coleta responsável e material bem documentado",
        alt: "Lucas Jordão registrando e acondicionando material vegetal em campo",
      },
      "field-landscape": {
        caption: "A escala da paisagem também faz parte do dado",
        alt: "Lucas Jordão observando a vegetação em uma paisagem aberta durante trabalho de campo",
      },
      "field-team": {
        caption: "Botânica também é trabalho de equipe",
        alt: "Lucas Jordão trabalhando com uma equipe durante uma expedição botânica",
      },
      "field-tree": {
        caption: "Cada medida preserva uma parte do contexto",
        alt: "Lucas Jordão observando uma árvore durante uma expedição botânica",
      },
      "field-measure": {
        caption: "Medir, registrar, tornar comparável",
        alt: "Lucas Jordão medindo o tronco de uma árvore durante trabalho de campo",
      },
      "field-forest": {
        caption: "Entre a floresta e o registro científico",
        alt: "Lucas Jordão caminhando entre a vegetação densa em trabalho de campo",
      },
      "cenargen-bench": {
        caption: "Biologia molecular aplicada à sistemática vegetal",
        alt: "Lucas Jordão no laboratório do Cenargen da EMBRAPA em Brasília",
      },
      "cenargen-lab": {
        caption: "Do espécime à evidência molecular",
        alt: "Lucas Jordão trabalhando em uma bancada do laboratório do Cenargen da EMBRAPA",
      },
      "masters-herbarium": {
        caption: "Comparação de espécimes durante o mestrado",
        alt: "Lucas Jordão examinando material botânico em um herbário durante o mestrado",
      },
      "nybg-digitization": {
        caption: "Um ano digitalizando espécimes no NYBG · 2016",
        alt: "Registro do intercâmbio de Lucas Jordão no New York Botanical Garden em 2016",
      },
      "ilc8-talk": {
        caption: "Palestra no 8º Congresso Internacional de Leguminosas · 2023",
        alt: "Lucas Jordão apresentando uma palestra no palco do 8º Congresso Internacional de Leguminosas",
      },
      "ilc8-talk-wide": {
        caption: "Comunicação científica no 8º Congresso Internacional de Leguminosas · 2023",
        alt: "Vista ampla do palco durante a palestra de Lucas Jordão no 8º Congresso Internacional de Leguminosas",
      },
      "cnb74-talk": {
        caption:
          "Novas ferramentas e abordagens automatizadas para avaliação do risco de extinção: analisando a dinâmica da cobertura e uso do solo · 74º Congresso Nacional de Botânica · 2024",
        alt: "Lucas Jordão apresentando uma palestra sobre ferramentas automatizadas para avaliação do risco de extinção no 74º Congresso Nacional de Botânica",
      },
      "cnb74-lulc": {
        caption:
          "Evolução da cobertura e do uso do solo: a evidência que sustenta o critério B · 74º Congresso Nacional de Botânica · 2024",
        alt: "Lucas Jordão apresentando um mapa de evolução da cobertura e uso do solo do Distrito Federal no 74º Congresso Nacional de Botânica, na Universidade de Brasília",
      },
      "cncflora-training": {
        caption: "Curso de treinamento no CNCFlora · 2026",
        alt: "Lucas Jordão ministrando um treinamento para a equipe do CNCFlora em uma sala de aula",
      },
    },
    courses: {
      label: "Formação complementar",
      note: (count: number, hours: number) =>
        `${count} cursos · ${hours}h registradas no Lattes`,
      items: {
        emagAuthor: {
          title: "eMAG Conteudista",
          place: "Escola Nacional de Administração Pública (ENAP)",
        },
        emagDev: {
          title: "eMAG Desenvolvedor",
          place: "Escola Nacional de Administração Pública (ENAP)",
        },
        susData: {
          title: "Análise de dados para pesquisa no SUS",
          place: "Fundação Oswaldo Cruz (FIOCRUZ)",
        },
        itGovernance: {
          title: "Governança de TIC no contexto da transformação digital",
          place: "Escola Nacional de Administração Pública (ENAP)",
        },
        spatialPriority: {
          title: "Priorização espacial para conservação",
          place: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
        },
        landscapeEcology: {
          title: "Ecologia de paisagens e modelagem de corredores ecológicos",
          place: "Universidade de Brasília (UnB)",
        },
        earthEngine: {
          title: "Análise de imagens orbitais no Google Earth Engine",
          place: "Solved — Soluções em Geoinformação",
        },
        lawPhilosophy: {
          title: "Filosofia do Direito",
          place: "Instituto para Reforma das Relações entre Estado e Empresa (IREE)",
        },
        economics: {
          title: "Economia para pensar o Brasil",
          place: "Instituto para Reforma das Relações entre Estado e Empresa (IREE)",
        },
        educationSociety: {
          title: "Educação, ambiente e sociedade",
          place: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
        },
        sem: {
          title: "Microscopia eletrônica de varredura",
          place: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
        },
        environmentalBasics: {
          title: "Básico ambiental",
          place: "Academia do Concurso · Rio de Janeiro",
        },
        astronomy: {
          title: "História da astronomia",
          place: "Fundação Planetário da Cidade do Rio de Janeiro",
        },
        greenLeadership: {
          title: "Formação de lideranças verdes",
          place: "Fundação Verde Herbert Daniel",
        },
      },
    },
    timelineLabel: "Linha do tempo",
    timelineSpan: "2004 — agora",
    items: {
      start: {
        title: "O primeiro espécime",
        text: "Começo a estudar Mimosa na Escola Nacional de Botânica Tropical. O gênero se torna o fio condutor de toda a trajetória.",
      },
      masters: {
        title: "Taxonomia em profundidade",
        text: "Mestrado no Museu Nacional/UFRJ: trabalho com coleções em herbários, expedições, descrição morfológica e a primeira espécie nova.",
      },
      phd: {
        title: "Da morfologia à filogenia",
        text: "Doutorado no JBRJ. Em 2016, passo um ano no NYBG digitalizando espécimes; no Cenargen/EMBRAPA, trabalho com DNA e filogenia. Biogeografia e seis loci em diálogo — e a primeira programação em R.",
      },
      cncflora: {
        title: "Conservação em escala",
        text: "Analista no Núcleo Lista Vermelha do CNCFlora/JBRJ. Transformo regras, dados e rotinas de avaliação em pipelines, aplicações e fluxos operacionais.",
      },
      dataScience: {
        title: "Formalizando a engenharia",
        text: "Segunda graduação, em Ciência de Dados, na Universidade Estácio de Sá, para dar nome e método ao que já era prática diária: modelagem, estatística e engenharia de dados. Conclusão prevista para julho de 2027.",
      },
      now: {
        title: "Procurando o próximo time",
        text: "Encerro o ciclo no CNCFlora com sistemas em operação, dados legados resgatados e métodos publicados. Procuro uma equipe onde domínio, dados e produto sejam a mesma conversa.",
      },
    },
  },

  cvGraph: {
    index: "08 / CURRÍCULO EM GRAFO",
    eyebrow: "Duas lentes, o mesmo grafo",
    heading: { line1: "O currículo", emphasis: "além da árvore." },
    lead: "Um currículo costuma organizar a trajetória profissional como uma árvore: formação, experiências, habilidades e produções distribuídas em categorias. Mas uma vida profissional é muito mais interligada. Projetos conectam tecnologias, métodos, pessoas, instituições e competências. Ao representar essas relações como um grafo, conhecimentos antes implícitos tornam-se visíveis, revelando novas formas de explorar, compreender e descobrir uma trajetória.",
    linkLabel: "mesma base de conhecimento",
    modes: {
      query: {
        kicker: "Interface 01 · consulta",
        title: "Currículo consultável",
        description:
          "Uma interface textual para perguntar pelo currículo como quem pergunta a uma pessoa: por projeto, tecnologia, período ou competência.",
        cta: "Consultar o currículo",
      },
      graph: {
        kicker: "Interface 02 · grafo",
        title: "Currículo em rede",
        description:
          "A mesma informação como um grafo interativo, navegável em 2D e 3D — nós e conexões em vez de categorias fechadas.",
        cta: "Explorar o grafo",
      },
    },
  },

  contact: {
    index: "09 / CONTATO",
    eyebrow: "Próximo capítulo",
    heading: {
      line1: "A ciência e a gestão precisam de",
      emphasis: "infraestruturas vivas e integradas.",
    },
    intro:
      "Estou disponível para novas oportunidades e interessado em times onde biodiversidade, dados e produto digital precisam funcionar como uma coisa só. Respondo pelo LinkedIn em até um dia útil.",
    cardLabel: "O que estou procurando",
    looking: [
      { label: "Funções", value: "Engenharia de dados · Full stack · Geoespacial · Pesquisa aplicada" },
      {
        label: "Formação",
        value:
          "Doutorado e mestrado em Botânica · graduação em Ciência de Dados na Estácio, conclusão em julho de 2027",
      },
      { label: "Modalidade", value: "Remoto, híbrido ou presencial no Rio de Janeiro" },
      { label: "Disponibilidade", value: "Imediata" },
      { label: "Idiomas", value: "Português (nativo) · Inglês (leitura e escrita técnica)" },
    ],
    primaryCta: "Falar comigo no LinkedIn",
    lattesCta: "Ver Currículo Lattes",
    cvCta: "Baixar currículo (1 página)",
    cvDetailedCta: "Baixar currículo detalhado (2 páginas)",
    links: { github: "GitHub", lattes: "Currículo Lattes", blog: "Blog" },
    linkNote: {
      github: "53 repositórios públicos",
      lattes: "Trajetória acadêmica completa",
      blog: "Notas técnicas e artigos",
    },
  },

  footer: {
    tagline: "Botânica em escala de sistemas.",
    copyright: "Conteúdo e trajetória © 2026",
    built: "Construído no Rio de Janeiro.",
    backToTop: "Voltar ao início",
  },
};

/** O português é a fonte da verdade da forma; `en.ts` precisa satisfazer este tipo. */
export type Copy = typeof pt;
