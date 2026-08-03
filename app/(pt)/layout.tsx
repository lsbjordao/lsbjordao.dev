import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "../globals.css";
import { buildJsonLd, buildMetadata } from "../_lib/metadata";
import { Analytics } from "../_components/Analytics";

export const metadata: Metadata = buildMetadata("pt");

export default function PortugueseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd("pt")) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
