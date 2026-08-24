# monnif-site

Site do [Monnif](https://app.monnif.com) — publicado em `monnif.com`.

## Rodar

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # gera dist/
pnpm preview  # serve o dist/
```

## Como está montado

Astro estático, sem framework de UI. Os tokens de cor em `src/styles/global.css`
são os mesmos do app: os neutros derivam do matiz de `--primary` via
`oklch(from ...)`, então trocar `--primary` retinge o site inteiro.

```
public/          CNAME, imagens e tudo que é servido cru
src/pages/       uma rota por arquivo
src/styles/      global.css (tokens + componentes)
```

## Deploy

Merge na `main` **não** publica. O que publica é **release publicada**:

1. Merge na `main` → o *Release Drafter* (`.github/workflows/release-drafter.yml`)
   monta/atualiza um rascunho de release com os PRs desde a última.
2. O bump vem do label do PR — `major`, `minor` ou `patch`. O autolabeler
   deduz pelo Conventional Commit do título/branch; dá pra trocar na mão.
3. Publicar o rascunho em *Releases* dispara `.github/workflows/deploy.yml`,
   que builda e publica no GitHub Pages (e avisa o IndexNow). O
   `workflow_dispatch` continua ali para publicar fora do fluxo.

O domínio depende de `public/CNAME` estar no build — sem ele o `monnif.com` cai.
