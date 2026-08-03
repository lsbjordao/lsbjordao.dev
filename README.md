# lsbjordao.dev

Portfólio de Lucas Sá Barreto Jordão — engenharia de dados, desenvolvimento
full stack, geoprocessamento e taxonomia computacional. A página é uma landing
de recolocação profissional: o objetivo dela é que quem contrata entenda o
perfil, encontre a evidência e chegue ao contato.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` (português) e `http://localhost:3000/en` (inglês).

## Estrutura

```text
app/
  (pt)/            rota /      — layout com <html lang="pt-BR">
  (en)/en/         rota /en    — layout com <html lang="en">
  _components/     Portfolio.tsx, a página inteira, recebe `lang`
  _lib/metadata.ts metadata e JSON-LD por idioma
  robots.ts        /robots.txt
  sitemap.ts       /sitemap.xml com o par hreflang
data/
  site.ts          dados independentes de idioma: links, imagens, stack, ids
  academia.ts      publicações, bancas, orientações e pareceres (citações)
  teaching.ts      apostilas da estante e a largura das lombadas
  copy/pt.ts       todo o texto em português (fonte da verdade da forma)
  copy/en.ts       tradução; precisa satisfazer `Copy = typeof pt`
scripts/
  image-sizes.json larguras e qualidade — fonte única
  image-loader.ts  loader do next/image
  generate-images.mjs gera as variantes em public/_img/
  cv/cv-base.css   fontes, paleta e componentes dos quatro currículos
  cv/curriculo.html currículo de uma página, em A4
  cv/curriculo-detalhado.html currículo de duas páginas
  build-cv.mjs     renderiza os currículos em public/cv/ com o Chrome headless
```

Português e inglês são **rotas estáticas separadas**, não uma troca em
JavaScript: cada uma tem `<title>`, `description`, `canonical` e `hreflang`
próprios, então as duas são indexáveis.

### Adicionar conteúdo

Um projeto novo precisa de três coisas: uma entrada em `projects`
(`data/site.ts`) com imagem, link e tags; o texto em `data/copy/pt.ts` e
`data/copy/en.ts` sob a mesma chave; e a imagem em `public/images/`. Se a chave
faltar em `en.ts`, o `typecheck` acusa — é essa a proteção contra tradução
esquecida.

### Números grandes e suas gavetas

Os doze números do topo vivem em `stats`, em `data/copy`. Quem tem `drawer`
vira botão e abre, embaixo da grade inteira, a lista que comprova o número —
as listas estão em `data/academia.ts`, fora do `copy` porque citação é nome
próprio e não se traduz. Passar o cursor pré-visualiza, clicar fixa.

Os DOIs foram conferidos um a um no Crossref. Item sem registro achado fica
sem link e renderiza como texto: identificador inventado é pior que ausente.

### Currículos em PDF

`npm run cv` renderiza as quatro edições com o Chrome headless, usando as mesmas
fontes variáveis e a mesma paleta do site:

| Fonte | Saída | Páginas |
| --- | --- | --- |
| `scripts/cv/curriculo.html` | `public/cv/lucas-jordao-cv.pdf` | 1 |
| `scripts/cv/curriculum.html` | `public/cv/lucas-jordao-cv-en.pdf` | 1 |
| `scripts/cv/curriculo-detalhado.html` | `public/cv/lucas-jordao-cv-detalhado.pdf` | 2 |
| `scripts/cv/curriculum-detailed.html` | `public/cv/lucas-jordao-cv-detailed.pdf` | 2 |

São três degraus de profundidade, não três versões do mesmo documento: a folha
única é o anexo de uma mensagem fria; a detalhada é o que se manda quando já há
conversa e alguém quer ver os sistemas, a docência e a produção; e o Lattes é o
exaustivo, que nenhuma das duas tenta ser.

O CSS é dividido por responsabilidade. `cv-base.css` traz fontes, paleta e todos
os componentes, e é carregado pelos quatro documentos — mexer nele muda os
quatro PDFs. Depois vem a folha da geometria: `cv.css` (uma página) ou
`cv-detalhado.css` (duas). Tamanho de fonte fica na base quando é a identidade do
componente e é sobrescrito na geometria quando a folha aperta.

Cada edição declara quantas páginas deve ter, e o script confere a saída contra
essa declaração. Na edição detalhada as duas folhas são explícitas no HTML —
dois `.sheet` de 297mm — em vez de quebra automática, que moveria a dobra a cada
edição do texto. O que transborda é cortado pelo `overflow: hidden` e some **sem
virar página nova**: depois de mexer no texto, olhe o PDF, não só a contagem.

Os botões de download do site entregam a folha no idioma da página: `profile.cv`
e `profile.cvDetailed` em `data/site.ts` são mapas por idioma, e o `/en` não
deveria devolver um PDF em português.

Os PDFs são versionados: o deploy é um export estático e não roda este script.
Depois de editar um HTML (ou um CSS, que afeta mais de um), rode `npm run cv` e
faça commit dos PDFs junto. O Lattes completo continua em
`public/cv/lucas-jordao-curriculo-lattes.pdf`, só em português — é documento
oficial do CNPq e não tem versão vertida.

### Imagens responsivas

O export estático não tem otimizador em runtime. Em vez de desligar a
otimização — o que deixa todas as imagens sem `srcset` e faz um celular baixar
o arquivo de 1900px —, `scripts/generate-images.mjs` gera as variantes por
largura em `public/_img/` e `scripts/image-loader.ts` monta o caminho delas
para o `next/image`.

O script roda sozinho no `predev` e no `prebuild`; `npm run images` força uma
passada. Ele processa apenas as imagens **citadas literalmente** em `app/` e
`data/`, reaproveita variantes mais novas que a fonte e apaga as órfãs. SVG
passa direto, sem variante.

As larguras vivem em `scripts/image-sizes.json` e alimentam ao mesmo tempo o
`deviceSizes`/`imageSizes` do `next.config.ts` e o gerador — pedir uma largura
sem variante correspondente vira 404, então os dois lados precisam da mesma
lista. `public/_img/` é gerado e não entra no Git.

### Chave de determinação

A seção `#contratar` é uma chave dicotômica: o visitante percorre couplets
(`key` em `data/site.ts`) até chegar a uma das quatro trilhas (`tracks`). As
perguntas e os textos das trilhas ficam em `copy/*.ts` sob `key`.

### Estudo de caso CNCFlora

As descrições em `copy.case.systems` diferenciam explicitamente:

- software e integrações desenvolvidos por Lucas;
- ferramentas públicas empregadas nas interfaces;
- protótipos construídos mas não adotados;
- soluções que efetivamente fizeram parte da operação.

O bloco `Minha contribuição` fica sempre visível — é o registro de autoria, não
um detalhe opcional.

## Verificação

```bash
npm run typecheck
npm run build
```

O build gera `dist/` com export estático (`/index.html`, `/en.html`, `/404.html`,
`/robots.txt`, `/sitemap.xml`) e as variantes em `/_img/`.

Vale conferir que nenhuma URL de imagem ficou pendurada — o loader aponta para
arquivos gerados, então uma largura sem variante seria 404 silencioso:

```bash
python3 - <<'PY'
import re, os
faltando = []
for page in ("dist/index.html", "dist/en.html"):
    html = open(page, encoding="utf8").read()
    urls = {e.strip().split(" ")[0]
            for m in re.finditer(r'srcset="([^"]+)"', html, re.I)
            for e in m.group(1).split(",")}
    urls |= set(re.findall(r'<img[^>]*\ssrc="(/[^"]+)"', html))
    faltando += [u for u in urls if not os.path.exists("dist" + u)]
print(f"{len(faltando)} imagens faltando")
PY
```

## Deploy

O site vive em `https://lsbjordao.dev` — o **apex** é o endereço canônico, e é
ele que está em `profile.site` (`data/site.ts`), de onde saem `metadataBase`,
os `canonical`, o `sitemap.xml` e o par `hreflang`. Mudar o host não deveria
mudar esse valor.

Hospedagem: **Cloudflare Pages**, ligado a este repositório. Como a saída é
export estático, não há runtime — o Pages só serve arquivos.

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | `22`, pinado em `.nvmrc` |

O apex funciona porque o DNS não aceita `CNAME` na raiz e a Cloudflare resolve
isso com CNAME flattening — não há IP fixo para manter.

O `www` **não** é um domínio customizado do projeto: `_redirects` do Pages não
faz redirect a nível de domínio, então o `www → apex` é uma Redirect Rule na
zona (`Rules → Redirect Rules`), com `www.lsbjordao.dev/*` → `lsbjordao.dev/$1`,
301, preservando query string.

`npm run build:openai` existe só para o deploy antigo na plataforma da OpenAI —
ele acrescenta `dist/server/index.js` e `dist/.openai/hosting.json`, que o
Cloudflare Pages ignora. O build normal não gera nenhum dos dois.

### Analytics e consentimento

Google Analytics 4, com o measurement ID em `analyticsId` (`data/site.ts`);
esvaziar essa string desliga o script. O componente é
`app/_components/Analytics.tsx`, incluído pelos **dois** layouts — se só o de
português tivesse, `/en` ficaria sem medição.

O gtag entra com `afterInteractive`, fora do caminho crítico da primeira
renderização. Como as rotas são estáticas e separadas, cada uma dispara o
próprio `page_view` no carregamento; não há navegação client-side entre elas
para instrumentar.

**Não há banner de consentimento, por decisão deliberada (2026-08-03).** O GA4
grava cookie de identificação, o que sob GDPR exigiria consentimento prévio de
visitantes da UE e sob a LGPD uma base legal explícita. A escolha foi aceitar
essa irregularidade formal em troca de não colocar um banner na primeira
impressão de uma landing de recolocação. Se o cálculo mudar, as saídas são
Consent Mode v2 com `analytics_storage: denied` por padrão, ou trocar o GA por
um analytics sem cookies — o Cloudflare Web Analytics dispensa banner por
design e já está disponível na conta que hospeda o site.
