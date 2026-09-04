import type { Lang } from "@/data/site";
import { company } from "@/data/company";
import styles from "./CommercialServices.module.css";

const content = {
  pt: {
    index: "01 / COMO POSSO AJUDAR",
    eyebrow: "Projetos · consultoria · implementação",
    heading: "Conhecimento complexo, transformado em sistemas utilizáveis.",
    intro:
      "Atuo da descoberta à implementação em problemas que atravessam software, dados, geotecnologia e conhecimento de domínio. A tecnologia entra depois que o problema, as restrições e a evidência estão claros.",
    services: [
      {
        code: "01",
        title: "Descoberta e engenharia de produto",
        text: "Transformo problemas pouco definidos em requisitos, alternativas técnicas, protótipos e escopos de implementação defensáveis.",
        items: ["Requisitos e processos", "Desenho de solução", "Prototipação", "Arquitetura inicial e MVP"],
      },
      {
        code: "02",
        title: "Engenharia de dados",
        text: "Estruturo fluxos para transformar dados dispersos ou manuais em informação integrada, rastreável e utilizável.",
        items: ["ETL e ELT", "Pipelines e integrações", "Migração e modelagem", "Qualidade e rastreabilidade"],
      },
      {
        code: "03",
        title: "Aplicações e sistemas web",
        text: "Desenvolvo aplicações orientadas a dados, APIs, sistemas internos e ferramentas para processos que hoje dependem de soluções improvisadas ou manuais.",
        items: ["Aplicações web", "APIs e backends", "Dashboards e bancos de dados", "Modernização de sistemas"],
      },
      {
        code: "04",
        title: "Geotecnologia, ciência e biodiversidade",
        text: "Construo soluções para problemas que exigem software, dados espaciais, biodiversidade e entendimento do domínio científico ao mesmo tempo.",
        items: ["Processamento geoespacial", "Aplicações com mapas", "Dados científicos", "Automação de workflows científicos"],
      },
    ],
    principle: "A primeira entrega não é código.",
    principleStrong: "É redução de incerteza.",
    cta: "Conversar sobre um projeto",
    commercialLabel: "Prestação de serviços",
    commercialText: "Projetos e consultorias são contratados por meio da minha microempresa.",
    commercialEmailLabel: "Projetos e consultorias",
    personalEmailLabel: "Contato pessoal/profissional",
  },
  en: {
    index: "01 / HOW I CAN HELP",
    eyebrow: "Projects · consulting · implementation",
    heading: "Complex knowledge, turned into usable systems.",
    intro:
      "I work from discovery to implementation on problems that cross software, data, geospatial technology and domain knowledge. Technology comes after the problem, constraints and evidence are clear.",
    services: [
      {
        code: "01",
        title: "Discovery and product engineering",
        text: "I turn loosely defined problems into requirements, technical alternatives, prototypes and defensible implementation scopes.",
        items: ["Requirements and processes", "Solution design", "Prototyping", "Initial architecture and MVP"],
      },
      {
        code: "02",
        title: "Data engineering",
        text: "I build flows that turn scattered or manual data into integrated, traceable and usable information.",
        items: ["ETL and ELT", "Pipelines and integrations", "Migration and modelling", "Data quality and traceability"],
      },
      {
        code: "03",
        title: "Web applications and systems",
        text: "I develop data-oriented applications, APIs, internal systems and tools for processes that currently depend on improvised or manual solutions.",
        items: ["Web applications", "APIs and backends", "Dashboards and databases", "System modernisation"],
      },
      {
        code: "04",
        title: "Geospatial, science and biodiversity",
        text: "I build solutions for problems that require software, spatial data, biodiversity and scientific domain knowledge at the same time.",
        items: ["Geospatial processing", "Map-based applications", "Scientific data", "Scientific workflow automation"],
      },
    ],
    principle: "The first deliverable is not code.",
    principleStrong: "It is reduced uncertainty.",
    cta: "Discuss a project",
    commercialLabel: "Professional services",
    commercialText: "Projects and consulting engagements are contracted through my company.",
    commercialEmailLabel: "Projects and consulting",
    personalEmailLabel: "Personal/professional contact",
  },
} as const;

export default function CommercialServices({ lang }: { lang: Lang }) {
  const c = content[lang];

  return (
    <section className={styles.section} id="servicos" aria-labelledby="services-heading">
      <div className={styles.topline}>
        <span>{c.index}</span>
        <span>{c.eyebrow}</span>
      </div>

      <header className={styles.header}>
        <h2 id="services-heading">{c.heading}</h2>
        <p>{c.intro}</p>
      </header>

      <div className={styles.grid}>
        {c.services.map((service) => (
          <article className={styles.card} key={service.code}>
            <span className={styles.code}>{service.code}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.principle}>
        <p>
          {c.principle} <strong>{c.principleStrong}</strong>
        </p>
        <a href="#contato">{c.cta} <span aria-hidden="true">→</span></a>
      </div>

      <aside className={styles.commercial} aria-label={c.commercialLabel}>
        <div className={styles.commercialIdentity}>
          <span className={styles.commercialKicker}>{c.commercialLabel}</span>
          <p><strong>{company.tradeName}</strong> · {c.commercialText}</p>
        </div>
        <div className={styles.commercialContacts}>
          <a href={`mailto:${company.commercialEmail}`}>
            <span>{c.commercialEmailLabel}</span>
            <strong>{company.commercialEmail}</strong>
          </a>
          <a href={`mailto:${company.personalEmail}`}>
            <span>{c.personalEmailLabel}</span>
            <strong>{company.personalEmail}</strong>
          </a>
        </div>
      </aside>
    </section>
  );
}
