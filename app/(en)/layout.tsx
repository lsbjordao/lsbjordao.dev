import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "../globals.css";
import { buildJsonLd, buildMetadata } from "../_lib/metadata";
import { Analytics } from "../_components/Analytics";

export const metadata: Metadata = buildMetadata("en");

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd("en")) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
