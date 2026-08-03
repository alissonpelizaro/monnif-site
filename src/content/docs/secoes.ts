/** Ordem e rótulo das seções da documentação. A chave é o nome da pasta. */
export const SECOES = [
  { slug: "comecar", titulo: "Comece por aqui" },
  { slug: "dia-a-dia", titulo: "No dia a dia" },
  { slug: "planejamento", titulo: "Planejamento" },
  { slug: "dados", titulo: "Seus dados" },
  { slug: "conta", titulo: "Conta e pessoas" },
  { slug: "assistente", titulo: "Assistente com IA" },
] as const;

export type SecaoSlug = (typeof SECOES)[number]["slug"];
