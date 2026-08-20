// @ts-check
import fs from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// `lastmod` de verdade só existe para o blog, onde a data está no frontmatter.
// Carimbar a data do build no site inteiro é ruído: o buscador aprende que a
// data não quer dizer nada e passa a ignorá-la.
const PASTA_BLOG = "./src/content/blog";
const datas = new Map(
  fs.readdirSync(PASTA_BLOG).map((arquivo) => [
    `/blog/${arquivo.replace(/\.md$/, "")}/`,
    fs.readFileSync(`${PASTA_BLOG}/${arquivo}`, "utf8").match(/^date:\s*"?([\d-]+)/m)?.[1],
  ]),
);

export default defineConfig({
  site: "https://monnif.com",
  // O compressor come o espaço entre um texto e a tag em linha que vem na
  // linha de baixo: "as contas do mês, a\n<a>fatura</a>" virava "afatura" em
  // oito páginas. Escrever `{" "}` em cada ponto resolveria o sintoma e
  // deixaria a armadilha armada para o próximo parágrafo escrito assim.
  // Custa ~0,4 KB por página depois do gzip.
  compressHTML: false,
  integrations: [
    sitemap({
      serialize(item) {
        const rota = new URL(item.url).pathname;
        const data = datas.get(rota);
        if (data) item.lastmod = new Date(data).toISOString();
        // Profundidade como peso: home, depois os hubs, depois as folhas.
        item.priority = rota === "/" ? 1 : rota.split("/").length <= 3 ? 0.8 : 0.6;
        item.changefreq = rota === "/" || rota.startsWith("/blog") ? "weekly" : "monthly";
        return item;
      },
    }),
  ],
});
