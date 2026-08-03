import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { AUTORA } from "../data/autoria";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  return rss({
    title: "Blog da Monnif",
    description:
      "Textos sobre orçamento, cartão de crédito, reserva de emergência e dinheiro a dois — e guias de como cada parte do Monnif funciona.",
    site: context.site!,
    // <author> do RSS exige e-mail; quem carrega só o nome é o dc:creator.
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    customData: "<language>pt-BR</language>",
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((p) => ({
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.date,
        categories: [p.data.tag],
        link: `/blog/${p.id}/`,
        customData: `<dc:creator><![CDATA[${AUTORA.nome}]]></dc:creator>`,
      })),
  });
}
