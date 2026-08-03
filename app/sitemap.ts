import type { MetadataRoute } from "next";
import { profile } from "@/data/site";

/** As duas rotas são estáticas e indexáveis; o sitemap declara o par hreflang. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = {
    "pt-BR": `${profile.site}/`,
    en: `${profile.site}/en`,
  };

  return [
    {
      url: `${profile.site}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${profile.site}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages },
    },
  ];
}
