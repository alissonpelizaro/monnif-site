import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Posição dentro da seção. A seção sai do nome da pasta. */
    order: z.number(),
    /** Nome do arquivo em src/assets/docs, sem a extensão. */
    print: z.string().optional(),
    /** O que pedir ao assistente para fazer o mesmo sem abrir a tela. */
    peca: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Um assunto só por post — vira a etiqueta na listagem. */
    tag: z.enum(["Finanças pessoais", "Guia do app", "Bastidores"]),
    /** Sobe o post para o topo da listagem, em destaque. */
    destaque: z.boolean().default(false),
  }),
});

export const collections = { docs, blog };
