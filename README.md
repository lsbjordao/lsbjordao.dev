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
  copy/pt.ts       todo o texto em português (fonte da verdade da forma)
  copy/en.ts       tradução; precisa satisfazer `Copy = typeof pt`
scripts/
  image-sizes.json larguras e qualidade — fonte única
  image-loader.ts  loader do next/image
  generate-images.mjs gera as variantes em public/_img/
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

O build gera `dist/` com export estático (`/index.html`, `/en.html`,
`/robots.txt`, `/sitemap.xml`), as variantes em `/_img/` e o Worker de hosting.

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
