# lsbjordao.dev

Portfólio de Lucas Sá Barreto Jordão — botânica, conservação e infraestrutura
digital para biodiversidade.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Conteúdo

Os projetos, marcos da trajetória, métricas e publicações ficam centralizados em
[`data/portfolio.ts`](./data/portfolio.ts). Para adicionar um projeto, inclua um
novo objeto no array `projects` e coloque a respectiva imagem em
`public/images/`.

O estudo de caso do CNCFlora está no array `cncSystems`. As descrições
diferenciam explicitamente:

- software e integrações desenvolvidos por Lucas;
- ferramentas públicas empregadas nas interfaces;
- protótipos construídos mas não adotados;
- soluções que efetivamente fizeram parte da operação.

## Verificação

```bash
npm run typecheck
npm run build
```
