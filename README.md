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
data/
  site.ts          dados independentes de idioma: links, imagens, stack, ids
  copy/pt.ts       todo o texto em português (fonte da verdade da forma)
  copy/en.ts       tradução; precisa satisfazer `Copy = typeof pt`
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

O build gera `dist/` com export estático (`/index.html` e `/en.html`) mais o
Worker de hosting.
