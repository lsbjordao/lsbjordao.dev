import type { Lang } from "../site";
import { pt, type Copy } from "./pt";
import { en } from "./en";

export type { Copy };

const commercialPt: Copy = {
  ...pt,
  meta: {
    ...pt.meta,
    title: "Lucas Jordão — Software, Dados e Geotecnologia",
    description:
      "Engenharia de software, dados e soluções geoespaciais para problemas complexos, com experiência em biodiversidade, ciência e sistemas orientados a dados.",
    ogTitle: "Lucas Jordão — Botânica em escala de sistemas",
    ogDescription:
      "Software, dados e soluções geoespaciais na interseção entre tecnologia, ciência e problemas complexos.",
    jobTitle: "Engenheiro de software e dados · Geotecnologia e biodiversidade",
  },
  nav: {
    ...pt.nav,
    contratar: "Especialidades",
    metodo: "Método",
    contato: "Trabalhe comigo",
    mobileAvailability: "Projetos · consultorias · oportunidades",
    status: "Projetos · consultorias · oportunidades",
    brandTagline: "Software · dados · ciência\nGeotecnologia · biodiversidade",
  },
  hero: {
    ...pt.hero,
    eyebrow: "Software · engenharia de dados · geotecnologia · ciência aplicada",
    intro:
      "Sou Lucas S.B. Jordão, mestre e doutor em Botânica e engenheiro de software e dados. Transformo conhecimento complexo, dados e processos em sistemas utilizáveis — da descoberta do problema à implementação, com especial experiência em biodiversidade, ciência e informação geoespacial.",
    primaryCta: "Conversar sobre um projeto",
    secondaryCta: "Conhecer meu trabalho",
    availability: {
      ...pt.hero.availability,
      label: "Atuação",
      value: "Disponível para projetos, consultorias e oportunidades",
      modalityLabel: "Formato",
      modality: "Projetos por escopo · remoto, híbrido ou Rio de Janeiro",
      startLabel: "Contratação",
      start: "Prestação de serviços via LSB Jordão",
    },
  },
  key: {
    ...pt.key,
    eyebrow: "Onde minha atuação resolve o seu problema",
    intro:
      "Um taxonomista identifica um espécime desconhecido percorrendo uma chave dicotômica. Aqui, a mesma lógica ajuda a localizar a combinação de competências mais adequada ao seu problema — dados, aplicações, geoespacial ou conhecimento científico estruturado.",
    hireLabel: "Conversar sobre esse problema",
  },
  contact: {
    ...pt.contact,
    eyebrow: "Projetos · consultorias · oportunidades profissionais",
    heading: {
      line1: "Um problema complexo",
      emphasis: "pode virar um sistema utilizável.",
    },
    intro:
      "Se sua organização precisa transformar dados, conhecimento especializado ou processos complexos em software, infraestrutura de dados ou solução geoespacial, posso atuar da descoberta à implementação. Projetos e consultorias são contratados pela LSB Jordão; para assuntos pessoais ou profissionais, mantenho também meu canal pessoal.",
    primaryCta: "Conversar sobre um projeto",
    cardLabel: "Formas de trabalhar comigo",
    looking: [
      { label: "Projetos", value: "Software · dados · geotecnologia · sistemas científicos" },
      { label: "Consultoria", value: "Descoberta · requisitos · arquitetura · prototipação" },
      { label: "Domínios", value: "Biodiversidade · ciência · território · workflows complexos" },
      { label: "Oportunidades", value: "Engenharia de software · dados · geoespacial · pesquisa aplicada" },
    ],
  },
};

const commercialEn: Copy = {
  ...en,
  meta: {
    ...en.meta,
    title: "Lucas Jordão — Software, Data & Geospatial",
    description:
      "Software engineering, data and geospatial solutions for complex problems, with experience in biodiversity, science and data-oriented systems.",
    ogTitle: "Lucas Jordão — Botany at systems scale",
    ogDescription:
      "Software, data and geospatial solutions at the intersection of technology, science and complex problems.",
    jobTitle: "Software and data engineer · Geospatial and biodiversity",
  },
  nav: {
    ...en.nav,
    contratar: "Expertise",
    metodo: "Method",
    contato: "Work with me",
    mobileAvailability: "Projects · consulting · opportunities",
    status: "Projects · consulting · opportunities",
    brandTagline: "Software · data · science\nGeospatial · biodiversity",
  },
  hero: {
    ...en.hero,
    eyebrow: "Software · data engineering · geospatial · applied science",
    intro:
      "I'm Lucas S.B. Jordão, MSc and PhD in Botany and a software and data engineer. I turn complex knowledge, data and processes into usable systems — from problem discovery to implementation, with particular experience in biodiversity, science and geospatial information.",
    primaryCta: "Discuss a project",
    secondaryCta: "Explore my work",
    availability: {
      ...en.hero.availability,
      label: "Work",
      value: "Available for projects, consulting and opportunities",
      modalityLabel: "Format",
      modality: "Scoped projects · remote, hybrid or Rio de Janeiro",
      startLabel: "Engagement",
      start: "Professional services through LSB Jordão",
    },
  },
  key: {
    ...en.key,
    eyebrow: "Where my work fits your problem",
    intro:
      "A taxonomist identifies an unknown specimen by moving through a dichotomous key. Here, the same logic helps locate the combination of capabilities that best fits your problem — data, applications, geospatial work or structured scientific knowledge.",
    hireLabel: "Discuss this problem",
  },
  contact: {
    ...en.contact,
    eyebrow: "Projects · consulting · professional opportunities",
    heading: {
      line1: "A complex problem",
      emphasis: "can become a usable system.",
    },
    intro:
      "If your organisation needs to turn data, specialised knowledge or complex processes into software, data infrastructure or a geospatial solution, I can work from discovery through implementation. Projects and consulting are contracted through LSB Jordão; I also keep a separate personal/professional contact channel.",
    primaryCta: "Discuss a project",
    cardLabel: "Ways to work with me",
    looking: [
      { label: "Projects", value: "Software · data · geospatial · scientific systems" },
      { label: "Consulting", value: "Discovery · requirements · architecture · prototyping" },
      { label: "Domains", value: "Biodiversity · science · territory · complex workflows" },
      { label: "Opportunities", value: "Software engineering · data · geospatial · applied research" },
    ],
  },
};

export const copy: Record<Lang, Copy> = { pt: commercialPt, en: commercialEn };
