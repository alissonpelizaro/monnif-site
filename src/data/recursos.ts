/**
 * Os oito recursos que ganham página própria. A mesma lista alimenta o
 * mega-menu, o rodapé, o hub /recursos/ e as páginas de cada um.
 *
 * Regra da escrita daqui: quem lê é uma pessoa procurando um app para
 * organizar o dinheiro da casa, não alguém que trabalha com tecnologia.
 * Nada de sigla, nome de formato ou detalhe de como o app foi construído.
 */

export interface Recurso {
  slug: string;
  /** Nome curto, do jeito que aparece no menu. */
  titulo: string;
  /** Uma linha para o menu e para os cards. */
  resumo: string;
  /** Título da página. */
  chamada: string;
  /** Parágrafo de abertura da página. */
  lead: string;
  /** Print real do app, em src/assets/docs. Sem isto, entra a conversa de exemplo. */
  print?: string;
  icone: string;
  /** Os três a cinco pontos que a página desenvolve. */
  pontos: { titulo: string; texto: string }[];
  /** Perguntas que aparecem no fim da página. */
  duvidas: { pergunta: string; resposta: string }[];
  /** Onde aprender a usar, na documentação. */
  docs: { href: string; label: string };
}

export const RECURSOS: Recurso[] = [
  {
    slug: "assistente",
    titulo: "Assistente",
    resumo: "Escreva ou fale, e ele faz o lançamento por você",
    chamada: "Diga o que aconteceu. Ele anota.",
    lead: "Em vez de abrir formulário e preencher campo por campo, escreva como você contaria para alguém: “paguei o mercado, 240 no cartão”. Pronto, está lançado.",
    icone: `<path d="M12 3l1.9 4.6 4.6 1.9-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1-2.1-.9 2.1-.9z"/>`,
    pontos: [
      {
        titulo: "Ele resolve, não dá conselho",
        texto:
          "Lança a despesa, marca a conta como paga, quita a fatura do cartão, define o limite de uma categoria, agenda um compromisso. É a mesma coisa que você faria nas telas, só que dita numa frase.",
      },
      {
        titulo: "Responde com número",
        texto:
          "“Quanto ainda posso gastar com mercado esse mês?”, “quanto sobra até o dia 30?”, “quem gastou mais em julho?”. A resposta vem com o valor, não com uma explicação genérica sobre economia doméstica.",
      },
      {
        titulo: "Dá para falar em vez de digitar",
        texto:
          "Segure o microfone e fale. O que você falou vira texto no campo de mensagem — você lê, corrige se ele entendeu errado, e só então envia. Nada entra na sua conta sem passar pelos seus olhos.",
      },
      {
        titulo: "Tudo que ele faz fica visível",
        texto:
          "Cada lançamento dele aparece na lista como qualquer outro, e você apaga ou edita do jeito de sempre. Se errar a categoria, é um toque para arrumar.",
      },
    ],
    duvidas: [
      {
        pergunta: "Ele mexe em coisa que eu não pedi?",
        resposta:
          "Não. Ele só faz o que você pediu, e o que fez fica na tela para você conferir. Se ficar em dúvida sobre o que você quis dizer, ele pergunta antes.",
      },
      {
        pergunta: "Ele vê o dinheiro de outras pessoas?",
        resposta:
          "Ele enxerga exatamente o que você enxerga: as contas de que você participa, e nada além disso. Suas conversas com ele não são lidas pelas outras pessoas da conta.",
      },
      {
        pergunta: "Posso usar o app sem ele?",
        resposta:
          "Pode. Tudo o que ele faz também está nas telas. O assistente é um atalho, não um caminho obrigatório.",
      },
    ],
    docs: { href: "/docs/assistente/assistente/", label: "Como pedir as coisas ao assistente" },
  },

  {
    slug: "cartao-de-credito",
    titulo: "Cartão de crédito",
    resumo: "A fatura fechada certa, com as parcelas nos meses certos",
    chamada: "A fatura para de ser surpresa.",
    lead: "Você cadastra o dia em que o cartão fecha e o dia em que vence. A partir daí cada compra cai na fatura certa sozinha — inclusive as parceladas, que aparecem uma por mês.",
    print: "cartoes",
    icone: `<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>`,
    pontos: [
      {
        titulo: "Cada compra na fatura certa",
        texto:
          "Comprou depois do fechamento? Vai para a fatura do mês seguinte, como acontece de verdade. Você não precisa lembrar disso nem fazer a conta na cabeça.",
      },
      {
        titulo: "Parcela aparece mês a mês",
        texto:
          "Lançou uma compra em 10 vezes uma única vez e pronto: os próximos dez meses já nascem sabendo dela. Cada parcela mostra em qual delas você está.",
      },
      {
        titulo: "A fatura vira uma conta só",
        texto:
          "Na lista de despesas ela aparece como uma linha, com o valor total e a data de vencimento. Se quiser ver o que tem dentro, é um toque.",
      },
      {
        titulo: "Quanto do limite já foi",
        texto:
          "Uma barra mostra quanto do limite está usado. É o aviso que costuma faltar quando a fatura ainda parece longe.",
      },
    ],
    duvidas: [
      {
        pergunta: "Tenho mais de um cartão. Dá para usar todos?",
        resposta: "Dá, quantos você tiver. Cada um com o seu dia de fechamento, de vencimento e o seu limite.",
      },
      {
        pergunta: "Como eu pago a fatura?",
        resposta:
          "Um toque em pagar, e a fatura inteira é quitada de uma vez. Também dá para pedir ao assistente: “paga a fatura do cartão”.",
      },
      {
        pergunta: "A fatura entra no meu orçamento do mês?",
        resposta:
          "Cada compra entra na categoria dela, então o orçamento continua fazendo sentido. A fatura não vira um bolo indistinto de “cartão”.",
      },
    ],
    docs: { href: "/docs/dia-a-dia/cartoes/", label: "Como cadastrar e usar seus cartões" },
  },

  {
    slug: "orcamento",
    titulo: "Orçamento",
    resumo: "Um limite por categoria e quanto ainda cabe neste mês",
    chamada: "Saiba quanto ainda cabe, antes de gastar.",
    lead: "Você diz quanto pretende gastar por mês com mercado, transporte, lazer. O Monnif mostra quanto já foi e quanto ainda sobra — enquanto o mês ainda dá para mudar.",
    print: "orcamento",
    icone: `<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/>`,
    pontos: [
      {
        titulo: "Verde, amarelo, vermelho",
        texto:
          "Cada categoria tem uma barra que muda de cor conforme você se aproxima do limite. Dá para entender o mês inteiro numa olhada, sem ler número nenhum.",
      },
      {
        titulo: "As que estão apertadas sobem",
        texto:
          "As categorias perto de estourar aparecem em destaque na tela inicial. Você não precisa procurar pelo problema — ele se apresenta.",
      },
      {
        titulo: "Só onde você quiser",
        texto:
          "Não é obrigatório colocar limite em tudo. Categoria sem limite simplesmente não é cobrada. Duas ou três costumam resolver mais do que quinze.",
      },
      {
        titulo: "Cada mês é um mês",
        texto:
          "Dezembro não precisa ter o mesmo limite de fevereiro. Você ajusta quando a vida muda, e os meses anteriores ficam como estavam.",
      },
    ],
    duvidas: [
      {
        pergunta: "Como eu descubro um limite realista?",
        resposta:
          "Olhando o que você já gasta. Os relatórios mostram a média dos últimos meses por categoria — um limite pouco abaixo dessa média costuma funcionar; muito abaixo, não.",
      },
      {
        pergunta: "E se eu estourar?",
        resposta:
          "Nada trava. A barra fica vermelha e você fica sabendo. O Monnif avisa, não impede.",
      },
      {
        pergunta: "As compras no cartão contam?",
        resposta: "Contam, cada uma na categoria dela, no mês em que foram feitas.",
      },
    ],
    docs: { href: "/docs/planejamento/orcamento/", label: "Como definir seus limites" },
  },

  {
    slug: "saldo-dos-proximos-dias",
    titulo: "Saldo dos próximos dias",
    resumo: "Em que dia a conta aperta, com semanas de antecedência",
    chamada: "Descubra hoje o aperto que vem no dia 22.",
    lead: "O Monnif pega o que você tem agora, soma o que ainda entra e desconta o que ainda vence. O resultado é uma linha: o seu saldo, dia a dia, pelas próximas semanas.",
    print: "dashboard",
    icone: `<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>`,
    pontos: [
      {
        titulo: "O dia do aperto em destaque",
        texto:
          "Se em algum dia o dinheiro não cobre as contas, essa data aparece marcada. Descobrir isso com três semanas de antecedência é o que dá tempo de resolver sem juros.",
      },
      {
        titulo: "Conta com o que ainda não aconteceu",
        texto:
          "Contas em aberto, faturas de cartão, salário previsto, recebimentos combinados. É o retrato do que vem, não do que já passou.",
      },
      {
        titulo: "Tudo junto",
        texto:
          "Conta corrente, dinheiro guardado, cartões — na mesma linha. Saber que sobram R$ 900 na conta não ajuda se a fatura de R$ 1.400 vence antes do salário.",
      },
    ],
    duvidas: [
      {
        pergunta: "Preciso conectar minha conta do banco?",
        resposta:
          "Não. Você informa quanto tem hoje e ajusta quando quiser. O Monnif nunca pede a senha do seu banco.",
      },
      {
        pergunta: "E se eu esquecer de lançar alguma coisa?",
        resposta:
          "A linha fica otimista demais, como qualquer previsão a que falta informação. Por isso vale lançar as contas fixas uma vez como recorrentes: elas passam a aparecer sozinhas todo mês.",
      },
    ],
    docs: { href: "/docs/dia-a-dia/dashboard/", label: "Entendendo a tela inicial" },
  },

  {
    slug: "agenda-e-lembretes",
    titulo: "Agenda e lembretes",
    resumo: "Avisos de vencimento e compromissos com hora marcada",
    chamada: "O Monnif lembra por você.",
    lead: "Conta que vence, reunião com o contador, dia de renegociar o financiamento. Marque a hora e escolha com quanta antecedência quer ser avisado — o aviso chega no celular.",
    print: "compromissos",
    icone: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,
    pontos: [
      {
        titulo: "Aviso antes do vencimento",
        texto:
          "O celular avisa três dias antes de cada conta vencer. É o intervalo que ainda dá para fazer alguma coisa a respeito.",
      },
      {
        titulo: "Compromisso com hora e importância",
        texto:
          "Cada compromisso tem horário, um nível de importância e a antecedência do lembrete — 15 minutos, uma hora, um dia antes. Você escolhe.",
      },
      {
        titulo: "Chame quem precisa estar junto",
        texto:
          "Convide outras pessoas da conta e todas recebem o mesmo lembrete, na mesma hora.",
      },
      {
        titulo: "Um resumo por e-mail",
        texto:
          "No começo do mês chega um resumo do mês anterior, para quem prefere ler no e-mail a abrir o app. Dá para desligar.",
      },
    ],
    duvidas: [
      {
        pergunta: "Vou receber notificação demais?",
        resposta:
          "Você escolhe o que quer receber, e pode desligar tudo. Sem permissão de notificação no celular, nada é enviado.",
      },
      {
        pergunta: "Meus compromissos ficam visíveis para a família?",
        resposta:
          "Só para quem você convidar. Numa conta compartilhada, os seus compromissos continuam sendo seus.",
      },
    ],
    docs: { href: "/docs/planejamento/compromissos/", label: "Como marcar compromissos" },
  },

  {
    slug: "importar-extrato",
    titulo: "Importar do banco",
    resumo: "Traga meses de histórico sem digitar lançamento por lançamento",
    chamada: "Meses de histórico em cinco minutos.",
    lead: "Baixe o extrato no site do seu banco e mande o arquivo para o Monnif. Ele lê tudo, mostra o que entendeu e só grava depois que você confere.",
    print: "importar",
    icone: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>`,
    pontos: [
      {
        titulo: "Você confere antes de gravar",
        texto:
          "Cada linha aparece com data, valor, descrição e a categoria que o Monnif sugeriu. Você corrige o que quiser e tira o que não deveria entrar. Nada existe antes de você confirmar.",
      },
      {
        titulo: "Não duplica o que você já anotou",
        texto:
          "Se o aluguel já estava lançado e aparece no extrato, o Monnif entende que é a mesma conta e marca como paga, em vez de criar uma segunda.",
      },
      {
        titulo: "Arrependeu? Desfaz",
        texto:
          "Mandou o arquivo errado, ou o mês errado? Um botão desfaz a importação inteira de uma vez, como se não tivesse acontecido.",
      },
      {
        titulo: "Da segunda vez é mais rápido",
        texto:
          "O Monnif vai aprendendo onde cada gasto costuma ir. Depois de algumas correções suas, o extrato já chega quase todo separado — e o que levava cinco minutos passa a levar trinta segundos.",
      },
    ],
    duvidas: [
      {
        pergunta: "Que arquivo eu preciso baixar?",
        resposta:
          "O extrato que o seu banco disponibiliza para download — normalmente em “extrato”, “exportar” ou “baixar”. Quase todo banco brasileiro oferece um formato que o Monnif entende.",
      },
      {
        pergunta: "Preciso dar a senha do meu banco?",
        resposta:
          "Nunca. O Monnif não se conecta ao seu banco. Você baixa o arquivo logado no site do banco, como sempre, e envia. A sua senha não chega até nós porque ela nunca sai de lá.",
      },
      {
        pergunta: "Dá para importar a fatura do cartão também?",
        resposta: "Dá, do mesmo jeito.",
      },
    ],
    docs: { href: "/docs/dados/importar/", label: "Passo a passo da importação" },
  },

  {
    slug: "familia",
    titulo: "Contas em família",
    resumo: "Todo mundo da casa vendo o mesmo número, sem dividir senha",
    chamada: "O dinheiro da casa é de mais de uma pessoa.",
    lead: "Cada pessoa entra com o seu próprio acesso e enxerga as mesmas contas, os mesmos cartões e o mesmo orçamento. Ninguém precisa emprestar senha nem virar o responsável pela planilha.",
    print: "usuarios",
    icone: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`,
    pontos: [
      {
        titulo: "Convite por link",
        texto:
          "Você manda o convite, a pessoa cria o acesso dela e pronto. A partir dali as duas veem a mesma coisa, atualizada na hora.",
      },
      {
        titulo: "Quem pode ver e quem pode mexer",
        texto:
          "Dá para convidar alguém só para acompanhar, sem poder alterar nada. Útil para incluir quem quer estar por dentro sem mexer nos lançamentos.",
      },
      {
        titulo: "Mais de uma conta na mesma pessoa",
        texto:
          "A conta da casa, a sua pessoal, a da empresa. Você troca entre elas a qualquer momento e cada uma tem seu próprio dinheiro, suas categorias e seu orçamento.",
      },
      {
        titulo: "Dá para ver quem lançou o quê",
        texto:
          "Não como fiscalização, mas para acabar com a dúvida de quem pagou o mercado. Cada lançamento guarda quem o fez.",
      },
    ],
    duvidas: [
      {
        pergunta: "A outra pessoa vê a minha conta pessoal?",
        resposta:
          "Não. Ela só enxerga a conta para a qual foi convidada. As suas outras contas continuam só suas.",
      },
      {
        pergunta: "Dá para tirar alguém depois?",
        resposta: "Dá, a qualquer momento. O acesso da pessoa termina na hora.",
      },
      {
        pergunta: "Tem limite de pessoas?",
        resposta: "Não. Casal, família inteira, sócios — quantas pessoas fizerem sentido.",
      },
    ],
    docs: { href: "/docs/conta/usuarios/", label: "Como convidar pessoas" },
  },

  {
    slug: "no-celular",
    titulo: "No celular",
    resumo: "Instala na tela inicial e abre como qualquer outro app",
    chamada: "Na tela inicial, sem passar por loja.",
    lead: "O Monnif abre no navegador do computador e do celular. Se quiser, ele fica na tela inicial com ícone próprio e abre em tela cheia, igual a qualquer app instalado.",
    print: "mobile-dashboard",
    icone: `<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/>`,
    pontos: [
      {
        titulo: "Nada para baixar",
        texto:
          "Sem loja de aplicativos, sem espera, sem atualização para instalar. Você abre o site, escolhe adicionar à tela inicial, e ele passa a estar lá.",
      },
      {
        titulo: "Lançar leva segundos",
        texto:
          "Um toque no botão de mais, a categoria, o valor, pronto. É o suficiente para registrar o café antes de guardar o celular.",
      },
      {
        titulo: "O mesmo lugar no computador",
        texto:
          "Você lança no celular na fila do mercado e vê no computador à noite. É a mesma conta, atualizada sozinha.",
      },
      {
        titulo: "Do seu jeito",
        texto:
          "Claro ou escuro, e uma cor de destaque à sua escolha que tinge o app inteiro. Pequeno, mas é o que faz parecer seu.",
      },
    ],
    duvidas: [
      {
        pergunta: "Funciona em iPhone e em Android?",
        resposta: "Nos dois, e também em qualquer computador. É o mesmo app, com a mesma conta.",
      },
      {
        pergunta: "Ocupa espaço no celular?",
        resposta: "Quase nada — bem menos do que um app baixado da loja.",
      },
    ],
    docs: { href: "/docs/comecar/instalar-no-celular/", label: "Como instalar no celular" },
  },
];

/** Os recursos que não têm página própria, mas aparecem na lista do hub. */
export const OUTROS = [
  { titulo: "Metas", texto: "Um alvo, um prazo e quanto já foi guardado.", href: "/docs/planejamento/metas/" },
  { titulo: "Relatórios", texto: "Para onde o dinheiro foi, mês a mês e por categoria.", href: "/docs/planejamento/relatorios/" },
  { titulo: "Assinaturas", texto: "As cobranças que se repetem todo mês, e quanto somam por ano.", href: "/docs/planejamento/assinaturas/" },
  { titulo: "Contas fixas", texto: "Aluguel, escola, mensalidade: cadastre uma vez e aparecem todo mês.", href: "/docs/dia-a-dia/despesas/" },
  { titulo: "Onde o dinheiro está", texto: "Conta corrente, poupança, dinheiro vivo — cada lugar com seu saldo.", href: "/docs/dia-a-dia/carteiras/" },
  { titulo: "Categorias suas", texto: "Use as que já vêm prontas ou crie as suas, com cor e ícone.", href: "/docs/dados/categorias/" },
  { titulo: "Histórico", texto: "Tudo que aconteceu na conta, e quem fez cada coisa.", href: "/docs/dados/historico/" },
  { titulo: "Separação automática", texto: "O Monnif aprende em que categoria cada gasto costuma cair.", href: "/docs/dados/automacao/" },
];
