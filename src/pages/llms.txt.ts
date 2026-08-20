import { getCollection } from "astro:content";
import { RECURSOS } from "../data/recursos";
import { SECOES } from "../content/docs/secoes";
import { SITE } from "../data/seo";

/**
 * /llms.txt — o índice que os buscadores com IA leem antes de sair rastreando
 * o site inteiro (llmstxt.org). É o mesmo conteúdo do menu, só que em markdown
 * e num arquivo só, então nasce das mesmas listas das páginas.
 */
export async function GET() {
  const docs = await getCollection("docs");
  const blog = (await getCollection("blog")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const linha = (titulo: string, caminho: string, resumo: string) =>
    `- [${titulo}](${SITE}${caminho}): ${resumo}`;

  const secoes = SECOES.map((s) => {
    const itens = docs
      .filter((p) => p.id.startsWith(`${s.slug}/`))
      .sort((a, b) => a.data.order - b.data.order)
      .map((p) => linha(p.data.title, `/docs/${p.id}/`, p.data.description));
    return `### ${s.titulo}\n\n${itens.join("\n")}`;
  });

  const texto = `# Monnif

> App grátis de finanças pessoais e familiares, em português: as contas do mês, o cartão de crédito, o orçamento por categoria e o saldo dos próximos dias num lugar só — com um assistente de IA que faz o lançamento quando você escreve ou fala o que aconteceu, dentro do app ou pelo WhatsApp.

O assistente atende no WhatsApp: a pessoa vincula o número uma vez, de dentro do app, e passa a lançar gastos por mensagem, por áudio ou mandando a foto do cupom, sem abrir o app. O que entra por lá aparece na conta na hora. Excluir lançamento, convidar pessoas e ajustar saldo continuam sendo feitos só dentro do app.

O Monnif não se conecta ao banco e nunca pede a senha bancária: quem quiser evitar digitação importa o extrato (.ofx ou .csv) baixado no site do próprio banco. A conta é compartilhada com a família por padrão, cada pessoa com o próprio acesso. Roda no navegador do celular e do computador, sem loja de aplicativos. É grátis para criar a conta e usar, sem anúncio e sem venda de dados.

- Site: ${SITE}
- App: https://app.monnif.com
- Contato: contato@monnif.com

## Recursos

${RECURSOS.map((r) => linha(r.titulo, `/recursos/${r.slug}/`, r.resumo)).join("\n")}

## Documentação

${secoes.join("\n\n")}

## Blog

${blog.map((p) => linha(p.data.title, `/blog/${p.id}/`, p.data.description)).join("\n")}

## Institucional

${[
  linha("Nossa história", "/manifesto/", "Por que o Monnif existe e o que ele se recusa a fazer"),
  linha("Indique e ganhe", "/indique/", "Programa de embaixadores: cupom com desconto para quem usa, comissão recorrente para quem indica e repasse por PIX"),
  linha("Segurança", "/seguranca/", "Como os dados são guardados e o que a equipe não consegue ver"),
  linha("Privacidade", "/privacidade/", "Quais dados são coletados, para quê e os direitos da LGPD"),
  linha("Termos de uso", "/termos/", "As regras de uso do serviço"),
  linha("Marca", "/marca/", "Símbolo, cores e regras de uso da marca"),
].join("\n")}
`;

  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
