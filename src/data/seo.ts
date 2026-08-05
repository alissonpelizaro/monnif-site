/**
 * Peças de JSON-LD que aparecem em mais de uma página.
 *
 * A Organization e o WebSite vivem no Base.astro com `@id` fixo; tudo que
 * precisa de um editor ou de um site "pai" aponta para esses ids em vez de
 * repetir o objeto inteiro — é assim que o Google junta as peças de páginas
 * diferentes na mesma entidade.
 */

export const SITE = "https://monnif.com";

/**
 * Perfis oficiais da marca, na ordem em que valem como prova. É o `sameAs` da
 * Organization: o que diz ao buscador que este site e este perfil são a mesma
 * Monnif, e não outra coisa de nome parecido. Só entra perfil que existe.
 */
export const INSTAGRAM = "https://www.instagram.com/monnif.br/";

export const PERFIS = [INSTAGRAM];

export const ID_ORG = `${SITE}/#organizacao`;
export const ID_SITE = `${SITE}/#site`;

/** Referência curta para o editor dos conteúdos. */
export const EDITORA = { "@id": ID_ORG };

export const absoluta = (caminho: string) => new URL(caminho, SITE).href;

/**
 * Corta a descrição no fim da última frase que couber. Acima de ~160 caracteres
 * o buscador corta sozinho, e ele corta no meio da palavra.
 */
export function resumir(texto: string, limite = 158) {
  if (texto.length <= limite) return texto;
  const corte = texto.slice(0, limite);
  const frase = corte.lastIndexOf(". ");
  return frase > 60 ? corte.slice(0, frase + 1) : `${corte.replace(/\s+\S*$/, "")}…`;
}

/**
 * Trilha de migalhas. O "Início" entra sozinho, e o último item vai sem `item`
 * porque é a própria página — é o que a documentação do schema.org pede.
 */
export function migalha(itens: { nome: string; url?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE}/#migalha`,
    itemListElement: [{ nome: "Início", url: "/" }, ...itens].map((item, i, todos) => {
      if (!item.url && i < todos.length - 1) {
        throw new Error(`migalha: "${item.nome}" não é o último item, então precisa de url`);
      }
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.nome,
        ...(item.url ? { item: absoluta(item.url) } : {}),
      };
    }),
  };
}

/** Lista de links de um hub (blog, docs, recursos) para o buscador ver a coleção inteira. */
export function lista(nome: string, itens: { nome: string; url: string }[]) {
  return {
    "@type": "ItemList",
    name: nome,
    numberOfItems: itens.length,
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      url: absoluta(item.url),
    })),
  };
}

/** Envelope de vários nós de uma vez. */
export const grafo = (...nos: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nos,
});
