---
name: post-blog
description: Escreve e publica um post novo no blog do monnif.com (src/content/blog) pensado para ancorar o Monnif em buscas — escolhe um termo ainda não coberto, escreve na voz do blog, liga aos posts e docs existentes, valida o build e abre o PR. Use quando pedirem "post novo", "artigo para o blog", "conteúdo para SEO", "texto para ranquear em X" ou "/post-blog".
---

# Post novo no blog

O post é um `.md` em `src/content/blog/`. Todo o resto nasce dele no build — não existe
lista para atualizar à mão.

## Como o blog funciona

- **Slug = nome do arquivo.** `orcamento-familiar.md` vira `/blog/orcamento-familiar/`.
  Slug curto, sem acento, com o termo de busca.
- **Frontmatter** (schema em `src/content.config.ts`):

  ```yaml
  ---
  title: "Termo de busca: a promessa do texto"
  description: "Até ~155 caracteres. É o snippet do Google."
  date: 2026-10-09        # sem aspas; define ordem, sitemap lastmod e "leia também"
  tag: "Finanças pessoais" # ou "Guia do app" ou "Bastidores" — enum, outro valor quebra o build
  capa: "https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1600&h=900&q=70"
  ---
  ```

  `destaque: true` sobe o post para o topo da listagem — só um post deve ter, hoje é
  `anotar-gasto-pelo-whatsapp.md`. Não mexa sem pedido.
- **Gerado sozinho a partir do arquivo:** página (`src/pages/blog/[...slug].astro`, com
  JSON-LD `BlogPosting`, autora de `src/data/autoria.ts` e tempo de leitura), listagem
  `/blog/`, `rss.xml`, `llms.txt`, sitemap com `lastmod` (`astro.config.mjs`) e a imagem
  OG em `public/og/blog-<slug>.png` (`scripts/og.mjs`, roda no `pnpm build`;
  `public/og/` é gitignored, não commitar).
- **"Leia também"** são os vizinhos cronológicos — links internos no corpo são o que de
  fato costura o post ao resto do site.

## 1. Escolher o termo

O blog existe para responder de frente o que as pessoas perguntam ao Google e a assistentes
de IA ("app de gestão financeira", "orçamento familiar", "controle financeiro para casal").

1. Liste o que já existe: `head -6 src/content/blog/*.md`.
2. Confira que o termo não está coberto: `grep -rniE "<termo>" src`.
3. Prefira termo de **alta intenção** e com ligação natural a uma feature real do Monnif.
   Termo que o Monnif não resolve não vale o post.

## 2. Levantar o que o Monnif faz de verdade

Nenhuma afirmação sobre o produto sai da memória. Fontes:

- `src/content/docs/**` — comportamento de cada tela (é daqui que saem os links `/docs/...`).
- `src/pages/precos.astro`, constante `PLANOS` — o que é de qual plano. Ex.: leitura de cupom
  por foto e categoria automática **não** são do grátis; o grátis tem 2 pessoas por conta.
- `src/data/recursos.ts` — páginas `/recursos/<slug>/`.
- `src/pages/llms.txt.ts` — o resumo oficial do produto (sem conexão bancária, nunca pede
  senha do banco, grátis sem anúncio e sem venda de dados).

## 3. Escrever

Leia antes um ou dois posts longos recentes (ex.: `app-de-gestao-financeira.md`,
`renda-que-muda-todo-mes.md`) e copie o jeito, não o texto.

**Voz**
- pt-BR, "você", frases curtas e afirmativas. Sem "neste artigo vamos ver", sem "é
  importante ressaltar", sem emoji, sem lista de dicas genérica.
- Número concreto em R$ (com ponto de milhar) e tabela markdown quando há conta a fazer.
  Os exemplos fecham a conta — some antes de publicar.
- Opinião clara, com o porquê. Educação financeira de verdade, não propaganda.
- Linhas quebradas em ~95 colunas, como os outros posts.
- "Teto" é do orçamento por categoria; para limite de **plano**, escreva "limite".

**Estrutura**
1. Abertura de 2 parágrafos, com o termo de busca **em negrito** na primeira frase.
2. Seções `##` (sem `#`; o título já é o H1). Passos numerados no `##` quando o texto é
   um passo a passo.
3. `## Como isso fica no Monnif` perto do fim: parágrafos que abrem com uma frase em
   negrito, cada um apontando para a doc da feature, e 1–3 prints de
   `src/assets/docs/*.webp` com o caminho `../../assets/docs/<tela>.webp`. Reaproveite os
   alts já usados: `grep -rhoE '!\[[^]]*\]\(\.\./\.\./assets/docs/[a-z-]+\.webp\)' src/content/blog | sort -u`.
4. Fecho curto com um exercício concreto que a pessoa faz hoje — não um CTA (o `<Cta />`
   já entra sozinho no layout).

**Links (é aqui que o SEO acontece)**
- 4–8 links para outros posts (`/blog/<slug>/`), com o título ou o assunto como texto do
  link — nunca "clique aqui".
- Links para `/docs/...` na seção do Monnif; `/precos/` quando falar de plano.
- **Links recíprocos:** edite 1–3 posts antigos para apontarem para o novo, num ponto onde
  o assunto já aparece. Mudança mínima, no fim de uma frase que já existe.

**Capa**
- Foto **gratuita** do Unsplash (não Unsplash+), ainda não usada por outro post
  (`grep -h "capa:" src/content/blog/*.md`). O `curl` para unsplash.com é bloqueado;
  use WebFetch em `https://unsplash.com/s/photos/<termo>?license=free` para achar o id.
- Confirme que abre: `curl -s -o /dev/null -w "%{http_code}\n" "<url da capa>"` → `200`.
  Baixe a versão `w=800&h=450` e olhe a imagem antes de escolher.

## 4. Validar

```sh
pnpm build && pnpm test
```

E confira que todo link interno dos arquivos tocados existe no build:

```sh
for f in <arquivos .md tocados>; do
  grep -oE '\]\(/[^)#]*' "$f" | sed 's/^](//' | sort -u | while read -r u; do
    [ -f "dist${u}index.html" ] || echo "QUEBRADO em $f: $u"
  done
done
```

Olhe também `public/og/blog-<slug>.png` (título longo não pode estourar) e o tamanho da
description no `dist/blog/<slug>/index.html`.

## 5. Publicar

- Branch `feat/blog-<slug>` a partir da `main` atualizada.
- Commit em Conventional Commits, em português: `feat(blog): post sobre <assunto>`, com
  corpo dizendo qual busca o post ataca e quais posts ganharam link recíproco.
- PR com o mesmo título. Merge não publica: o deploy sai da release publicada (ver
  `README.md`), e o label `minor` vem do autolabeler pelo `feat`.
