/**
 * Os links que levam para o app.
 *
 * Existe para carimbar `utm_source=site` em toda saída daqui. Sem isso o app
 * não distingue quem veio do site de quem digitou o endereço, e o painel de
 * origens conta os dois como "direto" — a única coisa que ele não sabe medir.
 *
 * A marcação é lida na primeira visita e guardada lá; ela não volta para cá.
 *
 * **Não use estas funções em JSON-LD.** Lá o endereço é identidade, e o
 * buscador precisa ver o mesmo `https://app.monnif.com` que vê em todo lugar.
 */
const APP = "https://app.monnif.com";

/**
 * `medium` diz qual botão foi clicado, não em qual página ele estava — a
 * página já vem no relatório. Serve para saber se o rodapé converte.
 */
export function appUrl(caminho: "/" | "/signup", medium: string) {
  const query = new URLSearchParams({ utm_source: "site", utm_medium: medium });
  return `${APP}${caminho === "/" ? "" : caminho}?${query}`;
}

/** Os dois destinos de sempre, para quem não precisa escolher o `medium`. */
export const ENTRAR = (medium: string) => appUrl("/", medium);
export const CRIAR_CONTA = (medium: string) => appUrl("/signup", medium);

/**
 * As lojas.
 *
 * Sem `utm_source` aqui de propósito: o clique sai para a Google e para a
 * Apple, não para `app.monnif.com`, e a marcação morreria no caminho — quem
 * conta esse clique é o painel de cada loja. (A Play aceita `referrer`, mas
 * só chega ao app quem lê a Install Referrer API; enquanto ninguém lê, é
 * parâmetro enfeitando o link.)
 */
export const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.monnif.app";
export const APP_STORE = "https://apps.apple.com/br/app/monnif-controle-financeiro/id6805985510";
