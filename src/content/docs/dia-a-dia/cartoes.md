---
title: Cartões e faturas
description: Fechamento, vencimento, melhor dia de compra, limite e a fatura como uma linha só.
order: 4
print: cartoes
peca: "paga a fatura do Nubank"
---

Cartão de crédito é a parte que mais confunde num controle financeiro, porque **a data da compra e a data do pagamento são diferentes**. O Monnif resolve isso pedindo dois números e cuidando do resto.

## Cadastrar

**Novo cartão** pede:

- **Nome** — como você chama o cartão.
- **Dia de fechamento** — quando a fatura fecha.
- **Dia de vencimento** — quando ela vence.
- **Limite** — opcional, usado para a barra de uso.
- **Carteira de pagamento** — de onde sai o dinheiro quando a fatura for paga.

## O ciclo, na prática

Com fechamento no dia 3 e vencimento no dia 10: uma compra feita no dia 2 entra na fatura que vence neste mês; uma compra no dia 4 já cai na fatura do mês seguinte. Você não faz essa conta — o Monnif encaixa a compra no ciclo certo pela data.

A tela ainda mostra o **melhor dia de compra**: o dia logo após o fechamento, quando o prazo até o pagamento é o maior possível.

## Limite

A barra mostra quanto do limite está comprometido. Verde enquanto sobra, vermelha quando o total das faturas em aberto passa do limite — incluindo as parcelas futuras já contratadas, que também ocupam limite.

## A fatura na lista de despesas

Em [Despesas](/docs/dia-a-dia/despesas/), as compras do cartão não aparecem soltas: viram uma linha **Fatura**, com o total do ciclo e o vencimento da fatura. Clicando, ela expande e lista as compras. Pagar a fatura é um clique nessa linha — e o valor sai da carteira de pagamento configurada.

Isso importa para o orçamento e para o fluxo de caixa: **a fatura conta no mês em que é paga**, como no mundo real, enquanto cada compra continua contando na categoria dela.

## Parcelas

Uma compra em 10x aparece como *1 de 10*, *2 de 10*, cada uma na fatura do seu ciclo. O total do mês nunca leva o valor cheio da compra.

## Bom saber

- A tela lista as **próximas faturas** de cada cartão, com data e valor.
- Uma fatura paga por engano pode ser reaberta pelo menu de três pontos.
