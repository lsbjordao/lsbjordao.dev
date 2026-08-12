# Botão de compartilhar funcional no telefone (seção 05)

## Contexto
O botão de compartilhar que existe hoje é o do app dentro do iframe (`Share.share()` do React Native → Web Share API), que no desktop geralmente não faz nada. Fazer aquela chamada abrir redes sociais exigiria editar/rebuildar o app RN no repo irmão. Em vez disso, vou adicionar um **botão de compartilhar funcional direto no telefone** (PhoneEmulator) — confiável em qualquer navegador, sem depender de `navigator.share`.

## URL compartilhada
`https://lsbjordao.dev/#mobile` (PT) / `https://lsbjordao.dev/en/#mobile` (EN), montada a partir de `profile.site` (`data/site.ts`). Codificada (encodeURIComponent) para os links de cada rede.

## 1) Novo `app/_components/ShareButton.tsx` (client)
- **Gatilho:** FAB (botão circular com ícone de share) dentro da tela do telefone, canto superior-esquerdo (zona de status), `z-index` 3 (abaixo do overlay “desligado”).
- **Popover:** via **React portal p/ `document.body`** (evita o clipping do `overflow:hidden` da tela), ancorado abaixo do FAB. Fecha ao clicar fora e pressionar Esc.
- **Redes principais** (abrem em nova aba, `rel="noopener noreferrer"`):
  - X — `twitter.com/intent/tweet?url=…&text=…`
  - Facebook — `facebook.com/sharer/sharer.php?u=…`
  - LinkedIn — `linkedin.com/sharing/share-offsite/?url=…`
  - WhatsApp — `wa.me/?text=…`
  - Telegram — `t.me/share/url?url=…&text=…`
- **Copiar link** (`navigator.clipboard`, com feedback “Link copiado!”) e **share nativo** (`navigator.share`, só se disponível) como bônus.
- Ícones: SVGs inline simples (padrão do repo). Acessível: `aria-label`, `aria-expanded`, focus-visible, Esc.

## 2) `PhoneEmulator.tsx`
- Recebe `shareUrl: string` e `share` (textos) como props novas.
- Renderiza `<ShareButton url={shareUrl} labels={share} />` dentro de `.phone-emulator__screen`.

## 3) `MobileMvp.tsx`
- Importa `profile` de `@/data/site`; monta `shareUrl = \`${profile.site}${lang === "en" ? "/en" : ""}/#mobile\``.
- Passa `shareUrl` e `c.share` ao `<PhoneEmulator>`.

## 4) Copy (`data/copy/pt.ts` + `en.ts`)
Novo bloco `mobileMvp.share`: `trigger`, `triggerTitle`, `title`, `text` (legenda do post), `copy`, `copied`, `native`, e `networks` (nomes das redes). PT e EN espelhados.

## 5) CSS (`globals.css`)
- `.phone-emulator__share-fab` (canto sup.-esq. da tela, circular, glass escuro igual ao HUD, hover/focus).
- `.phone-share__popover` (portal em body): card escuro translúcido arredondado, grid/lista de redes + copiar link, animação de entrada; responsivo (cabe no mobile). Estado `.is-open`/`.is-copied`.

## Validação
- `tsc --noEmit` e `next build` (limpos).
- Renderização do botão/popover e dos links confirmada (alvo dos links e URL correto).
- Observação: clique end-to-end no navegador em-app (IAB) pode ser limitado pelo mesmo throttling/overlay de dev da sessão anterior; o teste real deve ser feito no navegador normal com `npm run dev`.

## Fora de escopo
O botão de share **dentro do app do iframe** (RN) segue usando a API nativa (funciona em dispositivos móveis). Se quiser que eu rebuildar o app RN para ele também abrir as redes no desktop, faço numa rodada separada (envolve o repo irmão + re-sync).

## Arquivos
- **Novo:** `app/_components/ShareButton.tsx`
- **Edita:** `app/_components/PhoneEmulator.tsx`, `app/_components/MobileMvp.tsx`, `app/globals.css`, `data/copy/pt.ts`, `data/copy/en.ts`