import type { Metadata } from "next";
import { profile, type Lang } from "@/data/site";
import { copy } from "@/data/copy";

const paths: Record<Lang, string> = { pt: "/", en: "/en" };

export function buildMetadata(lang: Lang): Metadata {
  const c = copy[lang];

  return {
    metadataBase: new URL(profile.site),
    title: c.meta.title,
    description: c.meta.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: profile.site }],
    creator: profile.name,
    keywords: [
      profile.name,
      "Lucas Jordão",
      "engenharia de dados",
      "data engineer",
      "full stack developer",
      "React Native",
      "Expo",
      "mobile development",
      "Next.js",
      "NestJS",
      "GraphQL",
      "REST API",
      "Backstage",
      "developer portal",
      "engenharia de requisitos",
      "Sphinx-Needs",
      "Apache Airflow",
      "dbt",
      "PostGIS",
      "geoprocessamento",
      "geospatial",
      "MapBiomas",
      "IUCN",
      "biodiversity informatics",
      "taxonomia computacional",
      "TypeTaxonScript",
      "CNCFlora",
      "Rio de Janeiro",
    ],
    alternates: {
      canonical: paths[lang],
      languages: {
        "pt-BR": paths.pt,
        en: paths.en,
        "x-default": paths.pt,
      },
    },
    openGraph: {
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      type: "profile",
      locale: c.meta.locale.replace("-", "_"),
      url: paths[lang],
      siteName: profile.name,
      images: [
        {
          url: "/images/mimosa-osmarii-1440.webp",
          width: 1440,
          height: 960,
          alt: c.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      images: ["/images/mimosa-osmarii-1440.webp"],
    },
    robots: { index: true, follow: true },
  };
}

export function buildJsonLd(lang: Lang) {
  const c = copy[lang];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.shortName,
    url: profile.site,
    jobTitle: c.meta.jobTitle,
    description: c.meta.description,
    email: undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    sameAs: [profile.linkedin, profile.github, profile.lattes, profile.blog],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Museu Nacional, Universidade Federal do Rio de Janeiro" },
      { "@type": "CollegeOrUniversity", name: "Jardim Botânico do Rio de Janeiro (JBRJ)" },
      { "@type": "CollegeOrUniversity", name: "Universidade Santa Úrsula" },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "Doctorate",
        name: "PhD in Botany",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Jardim Botânico do Rio de Janeiro (JBRJ)",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "Master's degree",
        name: "MSc in Biological Sciences (Botany)",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Museu Nacional, Universidade Federal do Rio de Janeiro",
        },
      },
    ],
    knowsLanguage: [
      { "@type": "Language", name: "Portuguese" },
      { "@type": "Language", name: "English" },
    ],
    knowsAbout: [
      "Data engineering",
      "ETL",
      "Apache Airflow",
      "dbt",
      "TypeScript",
      "React Native",
      "Expo",
      "Mobile application development",
      "Next.js",
      "NestJS",
      "GraphQL",
      "REST APIs",
      "Backstage",
      "Internal developer platforms",
      "Requirements engineering",
      "PostgreSQL",
      "PostGIS",
      "Geospatial analysis",
      "Remote sensing",
      "MapBiomas",
      "IUCN Red List assessment",
      "Biodiversity informatics",
      "Plant taxonomy",
      "Phylogenetics",
      "Open science",
    ],
    seeks: {
      "@type": "Demand",
      name: c.contact.looking[0].value,
      availabilityStarts: "2026-07-29",
    },
  };
}
