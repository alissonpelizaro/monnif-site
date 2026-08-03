---
title: Despesas
description: Lançar, filtrar, marcar como paga, parcelar e repetir — a tela onde o mês é construído.
order: 2
print: despesas
peca: "paguei o mercado agora, 240 reais"
---

A tela de Despesas lista tudo que sai no mês selecionado. É onde você passa mais tempo.

## Lançar

**Nova despesa** abre o formulário. Os campos que importam:

- **Descrição e valor** — o mínimo obrigatório.
- **Vencimento** — a data em que a conta vence, não a data em que você pagou.
- **Carteira ou cartão** — de onde o dinheiro sai. Escolhendo um cartão, o campo de vencimento vira **data da compra** e a despesa entra na fatura do ciclo correspondente.
- **Categoria** — se você já lançou algo parecido antes, ela vem preenchida por [regra automática](/docs/dados/automacao/).
- **Anexo** — comprovante ou nota fiscal, opcional.
- **Repetição** — mensal, semanal, anual, com ou sem data de término.

## Marcar como paga

O círculo à esquerda de cada linha alterna entre pago e em aberto. Um clique, sem diálogo. O total no topo se reajusta na hora, separado em **Em aberto** e **Pago**.

## Filtrar

A barra de filtros combina:

- navegação por **mês**, com as setas;
- **busca** por descrição;
- **Todas / Em aberto / Pagas**;
- **categoria**.

## Recorrências e parcelas

Lançamentos que se repetem trazem um ícone de setas ao lado da descrição. Ao editar um deles, o Monnif pergunta se a mudança vale **só para esta** ou **para esta e as futuras** — parcelas passadas não são reescritas.

Uma compra parcelada no cartão aparece como *3 de 10* no mês correspondente, cada parcela caindo na fatura do seu ciclo.

## A linha da fatura

Compras de cartão não aparecem soltas na lista. Elas se agrupam numa linha **Fatura Nubank**, com o total e a contagem de compras. Clicando, a linha expande e mostra o que a compõe. Detalhes em [Cartões e faturas](/docs/dia-a-dia/cartoes/).

## Bom saber

- O menu de três pontos de cada linha traz editar, duplicar e excluir.
- Excluir um lançamento recorrente também pergunta o alcance: só este ou os futuros.
