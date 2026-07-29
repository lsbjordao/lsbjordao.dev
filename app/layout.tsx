import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lsbjordao.github.io/"),
  title: "Lucas S.B. Jordão — Botânica em escala de sistemas",
  description:
    "Taxonomista, cientista e desenvolvedor. Infraestrutura digital para biodiversidade, conservação e ciência aberta.",
  keywords: [
    "Lucas Sá Barreto Jordão",
    "botânica",
    "taxonomia",
    "conservação",
    "CNCFlora",
    "TypeTaxonScript",
    "ciência de dados",
  ],
  openGraph: {
    title: "Lucas S.B. Jordão — Portfólio",
    description:
      "Da espécie ao sistema: botânica, conservação e infraestrutura digital para biodiversidade.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Sá Barreto Jordão",
  url: "https://lsbjordao.github.io/",
  jobTitle: "Taxonomista e desenvolvedor de software para biodiversidade",
  sameAs: [
    "https://github.com/lsbjordao",
    "https://lattes.cnpq.br/6445788694639027",
  ],
  knowsAbout: [
    "Botânica",
    "Taxonomia",
    "Sistemática filogenética",
    "Conservação da biodiversidade",
    "Ciência de dados",
    "Engenharia de software",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
