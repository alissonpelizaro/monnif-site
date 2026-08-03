---
title: "Como pedir as coisas ao assistente (e o que ele não faz)"
description: "Sem sintaxe, sem comando, sem palavra mágica. O que muda é a quantidade de contexto que você dá numa frase só."
date: 2026-06-05
tag: "Guia do app"
---

O [assistente do Monnif](/docs/assistente/assistente/) não devolve conselho sobre
economia doméstica. Ele **executa**: cria a despesa, marca como paga, quita a fatura,
define o teto do orçamento, agenda o compromisso.

Isso muda o que vale a pena pedir — e o que vale a pena escrever na frase.

## Não existe sintaxe

Escreva em português normal, do jeito que você falaria com alguém:

> paguei o mercado agora, 240 reais no cartão do Nubank

> quanto ainda tenho pra gastar em alimentação esse mês?

> marca reunião com o contador quinta às 14h30

> abre meus cartões

Não há comando, prefixo nem palavra mágica. Se ficar ambíguo, ele pergunta em vez de
adivinhar.

## O que aumenta a chance de acertar de primeira

**Valor, onde e quando, na mesma frase.** "240 no cartão do Nubank hoje" resolve numa
mensagem o que "gastei 240" resolveria em três, com duas perguntas de volta.

**O nome como está no app.** Se a carteira se chama "Conta corrente", pedir "na conta
corrente" acerta direto. "No banco" pode virar pergunta.

**Uma tarefa por mensagem.** Ele dá conta de pedidos compostos, mas quando algo dá
errado numa mensagem com quatro ações, é mais chato de descobrir qual.

## Ele mostra o que fez

Quando o assistente usa uma ferramenta, aparece uma etiqueta na conversa dizendo qual —
`criar_lancamento`, `listar_orcamentos`. Você vê a ação, não só o texto da resposta.

E toda ação dele vira um lançamento normal na tela, entra no
[Histórico](/docs/dados/historico/) e sai do jeito de sempre: editar ou excluir na
lista. Não há estado escondido nem "desfazer do assistente" separado.

## Falar em vez de digitar

O botão de microfone grava até 30 segundos, transcreve e **escreve o texto no campo de
mensagem** — não envia direto.

O passo extra é deliberado. Reconhecimento de voz erra número, e num app de finanças
"cento e oitenta" virando "cento e oito" é a diferença entre um lançamento certo e um
errado que você só descobre no fim do mês. Você lê, corrige e manda.

Voz funciona bem para lançamento rápido ("anota aí: gasolina, cento e oitenta reais,
hoje"). Para perguntas longas ou cheias de números, digitar sai na frente.

## O que ele não alcança

O assistente chama **as mesmas funções que as telas chamam**, autenticado como você e
limitado pelo mesmo papel. Se você é Membro de uma conta, ele é Membro daquela conta.
Ele não enxerga contas de que você não participa, e não existe ação que ele consiga
fazer e você não.

Ou seja: ele não é um atalho para permissão. É um atalho para formulário.

## Onde ele erra

Interpretação de linguagem natural erra — pedido ambíguo mal entendido, categoria
errada, cálculo certo sobre premissa equivocada. É o motivo de toda ação ser visível e
reversível.

Confira o que foi feito antes de tomar decisão com base nisso. E o óbvio que precisa
estar escrito: as respostas **não são aconselhamento financeiro**.

Os limites completos — inclusive o que sai da sua conta para o provedor do modelo —
estão em [Limites e privacidade](/docs/assistente/limites/). E se você preferir não
usar, o app inteiro funciona sem ele: nenhuma tela depende do assistente.
