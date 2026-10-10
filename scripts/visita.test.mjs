/**
 * Checagem do beacon de visitas (`src/components/Visita.astro`).
 *
 * O script roda no navegador de quem visita, sem tela e sem erro visível: se a
 * atribuição sair errada ninguém descobre olhando o site — só meses depois,
 * num relatório que sempre pareceu plausível. Estes casos prendem as três
 * decisões que o número depende: quando a origem é gravada, quando é
 * sobrescrita, e o que conta como visita nova.
 *
 * Roda com `node scripts/visita.test.mjs`. Sem framework de propósito: o
 * arquivo testado é um IIFE de trinta linhas que só precisa de globais falsos.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const fonte = readFileSync(new URL("../src/components/Visita.astro", import.meta.url), "utf8");
const corpo = fonte.match(/<script is:inline[^>]*>([\s\S]*?)<\/script>/)[1];

// O `define:vars` do Astro vira uma const antes do IIFE; aqui isso é manual.
const executar = new Function(
  "ENDPOINT",
  "location",
  "document",
  "sessionStorage",
  "fetch",
  corpo,
);

/**
 * Abre uma página e devolve o que foi enviado (ou `null`, se nada saiu).
 * `links` são os `<a>` para o app: o script reescreve o `href` deles no lugar.
 */
function visitar({ url = "https://monnif.com/", referrer = "", sessao, links = [] }) {
  const { pathname, search, hostname } = new URL(url);
  let enviado = null;

  executar(
    "https://app.monnif.com/api/site/visits",
    { hostname, pathname, search },
    { referrer, querySelectorAll: () => links },
    {
      getItem: (k) => (k in sessao ? sessao[k] : null),
      setItem: (k, v) => {
        sessao[k] = v;
      },
    },
    (_url, init) => {
      enviado = JSON.parse(init.body);
      return { catch: () => {} };
    },
  );

  return enviado;
}

/** Uma aba recém-aberta: `sessionStorage` vazio. */
const abaNova = () => ({});

// -------------------------------------------------------------- entrada

{
  const enviado = visitar({ sessao: abaNova() });
  assert.equal(enviado.source, "direct", "sem referrer e sem marcação é acesso direto");
  assert.equal(enviado.first, true);
}

{
  const enviado = visitar({ referrer: "https://www.google.com/search?q=monnif", sessao: abaNova() });
  assert.equal(enviado.source, "google.com", "o `www.` sai e a busca vira o host");
}

{
  const enviado = visitar({ referrer: "https://monnif.com/blog/", sessao: abaNova() });
  assert.equal(enviado.source, "direct", "o próprio site não trouxe ninguém");
}

// ------------------------------------------------------ primeiro toque

{
  const sessao = abaNova();
  visitar({ referrer: "https://instagram.com/monnif", sessao });
  const segunda = visitar({ url: "https://monnif.com/blog/", referrer: "https://monnif.com/", sessao });

  assert.equal(segunda.source, "instagram.com", "a origem da entrada vale para a sessão inteira");
  assert.equal(segunda.first, false, "página seguinte não é visita nova");
  assert.equal(segunda.path, "/blog/");
}

// ----------------------------------------------------- campanha na URL

{
  const enviado = visitar({ url: "https://monnif.com/?utm_source=instagram&utm_medium=bio&utm_campaign=lancamento", sessao: abaNova() });
  assert.deepEqual(
    { source: enviado.source, medium: enviado.medium, campaign: enviado.campaign },
    { source: "instagram", medium: "bio", campaign: "lancamento" },
  );
}

{
  const enviado = visitar({ url: "https://monnif.com/?ref=CUPOM10", sessao: abaNova() });
  assert.deepEqual(
    { source: enviado.source, medium: enviado.medium, campaign: enviado.campaign },
    { source: "indicacao", medium: "cupom", campaign: "CUPOM10" },
    "o link de embaixador é um canal, e o cupom é a peça",
  );
}

// É o caso que motivou a mudança: quem já conhece o produto, abre pelo
// favorito e *na mesma aba* clica no anúncio. Antes o `utm_` era descartado e
// a campanha não levava crédito nenhum.
{
  const sessao = abaNova();
  const antes = visitar({ sessao });
  const depois = visitar({ url: "https://monnif.com/?utm_source=instagram&utm_campaign=remarketing", sessao });

  assert.equal(antes.source, "direct");
  assert.equal(depois.source, "instagram", "marcação de campanha sobrescreve o primeiro toque");
  assert.equal(depois.first, true, "entrada por campanha é sessão nova para atribuição");
}

// A trava que evita o efeito colateral do caso acima.
{
  const sessao = abaNova();
  const url = "https://monnif.com/?utm_source=instagram&utm_campaign=lancamento";
  visitar({ url, sessao });
  const recarga = visitar({ url, sessao });

  assert.equal(recarga.first, false, "F5 na mesma URL de campanha não inventa visita");
}

// Navegação interna nunca carrega `utm_`, então sobrescrever não reabre o
// problema que o primeiro toque resolve.
{
  const sessao = abaNova();
  visitar({ url: "https://monnif.com/?utm_source=instagram", sessao });
  const interna = visitar({ url: "https://monnif.com/blog/", referrer: "https://monnif.com/", sessao });

  assert.equal(interna.source, "instagram", "a campanha sobrevive à navegação interna");
  assert.equal(interna.first, false);
}

// ------------------------------------------------- origem no clique para o app

/** Um botão "Criar conta" como sai do build. */
const botao = () => ({ href: "https://app.monnif.com/signup?utm_source=site&utm_medium=home" });
const query = (link) => Object.fromEntries(new URL(link.href).searchParams);

// O caso que motivou: quem vinha do ChatGPT chegava no app como `site`.
{
  const link = botao();
  visitar({ url: "https://monnif.com/?utm_source=chatgpt.com", sessao: abaNova(), links: [link] });
  assert.deepEqual(query(link), { utm_source: "chatgpt.com", utm_medium: "home" }, "o canal real troca o `site`, o botão fica");
}

{
  const sessao = abaNova();
  visitar({ referrer: "https://www.google.com/", sessao });
  const link = botao();
  visitar({ url: "https://monnif.com/precos/", referrer: "https://monnif.com/", sessao, links: [link] });
  assert.equal(query(link).utm_source, "google.com", "a origem da entrada chega no clique da terceira página");
}

{
  const link = botao();
  visitar({ url: "https://monnif.com/?utm_source=instagram&utm_campaign=lancamento", sessao: abaNova(), links: [link] });
  assert.equal(query(link).utm_campaign, "lancamento", "a peça da campanha vai junto");
}

{
  const link = botao();
  visitar({ sessao: abaNova(), links: [link] });
  assert.equal(query(link).utm_source, "site", "origem desconhecida deixa o `site` do build");
}

// ------------------------------------------------------------- ambiente

{
  const enviado = visitar({ url: "http://localhost:4321/", sessao: abaNova() });
  assert.equal(enviado, null, "dev não soma no relatório de produção");
}

console.log("visita: ok");
