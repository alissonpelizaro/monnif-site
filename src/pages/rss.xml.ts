import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  return rss({
    title: "Blog da Monnif",
    description:
      "Textos sobre orçamento, cartão de crédito, reserva de emergência e dinheiro a dois — e guias de como cada parte do Monnif funciona.",
    site: context.site!,
    customData: "<language>pt-BR</language>",
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((p) => ({
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.date,
        categories: [p.data.tag],
        link: `/blog/${p.id}/`,
      })),
  });
}
