/**
 * Gera uma imagem de compartilhamento (1200×630) para cada página.
 *
 * O satori desenha o texto como caminho vetorial, então o resultado não
 * depende de nenhuma fonte instalada na máquina que rodar o build — o que
 * importa porque quem builda de verdade é o runner do GitHub.
 *
 * Roda antes do `astro build` e escreve em public/og/. O Base.astro monta o
 * nome do arquivo a partir da URL, com a mesma regra do `nomeDe()` daqui.
 */
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { RECURSOS } from "../src/data/recursos.ts";

const RAIZ = new URL("..", import.meta.url).pathname;
const SAIDA = path.join(RAIZ, "public/og");

const fontes = [
  { name: "Inter", weight: 400, style: "normal", data: fs.readFileSync(path.join(RAIZ, "scripts/fontes/inter-400.ttf")) },
  { name: "Inter", weight: 800, style: "normal", data: fs.readFileSync(path.join(RAIZ, "scripts/fontes/inter-800.ttf")) },
];

/** Mesma regra do Base.astro: "/recursos/orcamento/" vira "recursos-orcamento". */
export function nomeDe(caminho) {
  const limpo = caminho.replace(/^\/|\/$/g, "");
  return limpo === "" ? "home" : limpo.replace(/\//g, "-");
}

/** Lê o frontmatter de um .md sem trazer um parser de YAML para cá. */
function frontmatter(arquivo) {
  const texto = fs.readFileSync(arquivo, "utf8");
  const bloco = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!bloco) return {};
  const dados = {};
  for (const linha of bloco[1].split("\n")) {
    const par = linha.match(/^(\w+):\s*(.*)$/);
    if (par) dados[par[1]] = par[2].replace(/^["']|["']$/g, "").trim();
  }
  return dados;
}

function markdowns(pasta, prefixo) {
  const saida = [];
  for (const entrada of fs.readdirSync(pasta, { withFileTypes: true })) {
    const cheio = path.join(pasta, entrada.name);
    if (entrada.isDirectory()) saida.push(...markdowns(cheio, `${prefixo}${entrada.name}/`));
    else if (entrada.name.endsWith(".md")) {
      const { title } = frontmatter(cheio);
      if (title) saida.push({ caminho: `${prefixo}${entrada.name.replace(/\.md$/, "")}/`, titulo: title });
    }
  }
  return saida;
}

const paginas = [
  { caminho: "/", titulo: "Saiba quanto sobra. Antes do mês acabar.", etiqueta: "O dinheiro da casa num lugar só" },
  { caminho: "/recursos/", titulo: "Tudo que o dinheiro da casa precisa", etiqueta: "Recursos" },
  { caminho: "/docs/", titulo: "Como usar o Monnif", etiqueta: "Passo a passo" },
  { caminho: "/blog/", titulo: "Dinheiro explicado sem enrolação", etiqueta: "Blog" },
  { caminho: "/manifesto/", titulo: "No que a Monnif acredita", etiqueta: "Nossa história" },
  { caminho: "/seguranca/", titulo: "Dinheiro é assunto sério. Tratamos assim.", etiqueta: "Seus dados" },
  { caminho: "/marca/", titulo: "A marca Monnif", etiqueta: "Kit de marca" },
  { caminho: "/privacidade/", titulo: "Política de Privacidade", etiqueta: "Legal" },
  { caminho: "/termos/", titulo: "Termos de Uso", etiqueta: "Legal" },
  ...RECURSOS.map((r) => ({ caminho: `/recursos/${r.slug}/`, titulo: r.chamada, etiqueta: r.titulo })),
  ...markdowns(path.join(RAIZ, "src/content/blog"), "/blog/").map((p) => ({ ...p, etiqueta: "Blog" })),
  ...markdowns(path.join(RAIZ, "src/content/docs"), "/docs/").map((p) => ({ ...p, etiqueta: "Como usar" })),
];

const cartao = ({ titulo, etiqueta }) => ({
  type: "div",
  props: {
    style: {
      width: "1200px",
      height: "630px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      backgroundColor: "#0b0714",
      backgroundImage:
        "radial-gradient(1000px 620px at 8% -12%, #4c1d95 0%, transparent 62%)," +
        "radial-gradient(880px 560px at 106% 118%, #86198f 0%, transparent 58%)",
      fontFamily: "Inter",
      color: "#f6f2ff",
    },
    children: [
      {
        type: "div",
        props: {
          style: { display: "flex", alignItems: "center", gap: "16px" },
          children: [
            {
              type: "div",
              props: {
                style: {
                  width: "44px", height: "44px", borderRadius: "13px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backgroundImage: "linear-gradient(120deg, #7f22fe, #d926c4)",
                  fontSize: "26px", fontWeight: 800, color: "#fff",
                },
                children: "M",
              },
            },
            {
              type: "div",
              props: { style: { fontSize: "30px", fontWeight: 800, letterSpacing: "-0.03em" }, children: "Monnif" },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: { display: "flex", flexDirection: "column", gap: "22px" },
          children: [
            {
              type: "div",
              props: {
                style: {
                  fontSize: "22px", fontWeight: 800, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "#c8a6ff",
                },
                children: etiqueta,
              },
            },
            {
              type: "div",
              props: {
                style: {
                  // O tamanho cai conforme o título cresce para não estourar
                  // a caixa nas páginas de documentação, que têm nome longo.
                  fontSize: titulo.length > 58 ? "56px" : titulo.length > 34 ? "68px" : "80px",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                  maxWidth: "1000px",
                },
                children: titulo,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: { display: "flex", fontSize: "24px", color: "#a99bc4" },
          children: "monnif.com · grátis, sem anúncio e sem venda de dados",
        },
      },
    ],
  },
});

fs.mkdirSync(SAIDA, { recursive: true });

for (const pagina of paginas) {
  const svg = await satori(cartao(pagina), { width: 1200, height: 630, fonts: fontes });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(SAIDA, `${nomeDe(pagina.caminho)}.png`));
}

console.log(`og: ${paginas.length} imagens em public/og/`);
