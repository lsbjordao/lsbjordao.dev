import Script from "next/script";
import { analyticsId } from "@/data/site";

/**
 * Google Analytics 4. `afterInteractive` carrega o gtag depois da hidratação —
 * a medição não entra no caminho crítico da primeira renderização.
 *
 * As duas rotas são estáticas e separadas (`/` e `/en`), então cada uma dispara
 * o próprio page_view no carregamento; não há navegação de client-side entre
 * elas para instrumentar.
 */
export function Analytics() {
  if (!analyticsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}');`}
      </Script>
    </>
  );
}
